import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(supabase ? undefined : null);
  const [sessionError, setSessionError] = useState("");
  const [membership, setMembership] = useState(null);
  const user = session?.user ?? null;
  const userId = user?.id;

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    let receivedEvent = false;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      receivedEvent = true;
      if (active) {
        setSession(nextSession);
        if (!nextSession) setMembership(null);
        setSessionError("");
      }
    });

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!active || receivedEvent) return;
        setSession(data.session);
        if (error)
          setSessionError(
            "Unable to restore your session. Please log in again.",
          );
      })
      .catch(() => {
        if (!active || receivedEvent) return;
        setSession(null);
        setSessionError("Unable to restore your session. Please log in again.");
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    // Query outside the auth callback so session updates can finish first.
    async function loadMembership() {
      try {
        const { data, error } = await supabase
          .from("staff_members")
          .select("user_id")
          .eq("user_id", userId)
          .maybeSingle();
        if (error) throw error;
        if (active)
          setMembership({ userId, isStaff: Boolean(data), error: "" });
      } catch {
        if (active) {
          setMembership({
            userId,
            isStaff: false,
            error: "Unable to check account access. Please try again.",
          });
        }
      }
    }
    loadMembership();
    return () => {
      active = false;
    };
  }, [userId]);

  async function signOut() {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) throw error;
    setSession(null);
    setMembership(null);
  }

  const accountReady = membership?.userId === userId;
  const value = {
    user,
    isStaff: Boolean(user && accountReady && membership.isStaff),
    loading: session === undefined || Boolean(user && !accountReady),
    error: sessionError || (user && accountReady ? membership.error : ""),
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
