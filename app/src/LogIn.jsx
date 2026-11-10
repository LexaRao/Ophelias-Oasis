import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function handleLogIn(event) {
    event.preventDefault();
    if (!supabase) {
      setMessage(
        "Supabase is not configured locally. The guest and staff previews still work without an account.",
      );
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (response.error) {
        setMessage(response.error.message);
        return;
      }
      navigate("/reservation");
    } catch {
      setMessage("Unable to connect. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="page">
      <p className="eyebrow">Account access</p>
      <h1>Log in</h1>
      {!supabase && (
        <p className="demo-notice">
          Live login is offline. Explore with a demo account.
        </p>
      )}
      <form className="card auth-form" onSubmit={handleLogIn}>
        <label>
          Email
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button disabled={busy || !supabase}>
          {busy ? "Logging in…" : "Log in"}
        </button>
        <p role="alert">{message}</p>
        <div className="button-row">
          <Link className="button secondary" to="/preview/guest">
            Guest demo
          </Link>
          <Link className="button secondary" to="/preview/staff">
            Staff demo
          </Link>
        </div>
        <Link to="/signUp">Create an account</Link>
      </form>
    </div>
  );
}
