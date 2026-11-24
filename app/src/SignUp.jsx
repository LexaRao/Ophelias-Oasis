import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useAuth } from "./auth/AuthContext";
import AuthContinue from "./auth/AuthContinue";
import AccountStatus from "./auth/AccountStatus";
import { authLink } from "./auth/destinations";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [search] = useSearchParams();
  const next = search.get("next");

  async function handleSignUp(event) {
    event.preventDefault();
    if (!supabase) {
      setMessage(
        "Supabase is not configured locally. Use the preview links to explore without an account.",
      );
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const response = await supabase.auth.signUp({ email, password });
      if (response.error) {
        setMessage(response.error.message);
        return;
      }
      if (!response.data.user) {
        setMessage("Could not retrieve the new user.");
        return;
      }
      const profileResponse = await supabase.from("profiles").insert({
        id: response.data.user.id,
        first_name: firstName,
        last_name: lastName,
      });
      if (profileResponse.error) {
        setMessage(
          "Your account was created, but your details could not be saved. Please contact the team before trying again.",
        );
        return;
      }
      navigate(authLink("/auth/continue", next), { replace: true });
    } catch {
      setMessage(
        "Unable to complete signup. Please try logging in before creating the account again.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (!busy && !message && user) return <AuthContinue />;
  if (!busy && loading) return <AccountStatus />;
  return (
    <div className="page">
      <p className="eyebrow">Account access</p>
      <h1>Create an account</h1>
      {!supabase && (
        <p className="demo-notice">
          Account creation is offline. You can still explore the guest demo.
        </p>
      )}
      <form className="card auth-form" onSubmit={handleSignUp}>
        <label>
          Email
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label>
          First name
          <input
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <label>
          Last name
          <input
            autoComplete="family-name"
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <button disabled={busy || !supabase}>
          {busy ? "Creating account…" : "Sign Up"}
        </button>
        <p role="alert">{message}</p>
        <p>
          <Link to="/preview/guest">Explore the guest demo ↗</Link>
        </p>
        <Link to={authLink("/logIn", next)}>
          Already have an account? Log in
        </Link>
      </form>
    </div>
  );
}
