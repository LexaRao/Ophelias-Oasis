import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AccountStatus from "./AccountStatus";
import { accountDestination, authLink } from "./destinations";

export default function AuthContinue() {
  const { user, isStaff, loading, error } = useAuth();
  const [search] = useSearchParams();
  const next = search.get("next");
  if (loading || error) return <AccountStatus />;
  if (!user) return <Navigate to={authLink("/logIn", next)} replace />;
  return <Navigate to={accountDestination(isStaff, next)} replace />;
}
