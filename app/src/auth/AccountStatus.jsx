import { useAuth } from "./AuthContext";

export default function AccountStatus() {
  const { error } = useAuth();
  return (
    <div className="page">
      {error ? (
        <div className="card card-body narrow">
          <p role="alert">{error}</p>
          <button onClick={() => window.location.reload()}>Try again</button>
        </div>
      ) : (
        <p role="status">Loading your account…</p>
      )}
    </div>
  );
}
