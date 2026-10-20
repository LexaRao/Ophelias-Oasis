import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

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
          "The signup request was processed, but the profile could not be saved. Check your email for confirmation, then contact the team before retrying.",
        );
        return;
      }
      navigate("/reservation");
    } catch {
      setMessage(
        "Unable to complete signup. Check your email for confirmation before trying again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="page">
      <p className="eyebrow">Account access</p>
      <h1>Create an account</h1>
      <p>
        Create a guest account using the team’s existing Supabase signup flow.
      </p>
      <p className="purpose-note">
        This is the existing signup form. Account setup will be refined later.
      </p>
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
        <button disabled={busy}>
          {busy ? "Creating account…" : "Sign Up"}
        </button>
        <p role="alert">{message}</p>
        <p>
          To explore without creating an account, use{" "}
          <Link to="/preview/guest">Guest Preview</Link>.
        </p>
        <Link to="/logIn">Already have an account? Log in</Link>
      </form>
    </div>
  );
}
