import { Navigate, Outlet, useLocation } from "react-router-dom";
import { liveBackend } from "../supabaseClient";
import { useAuth } from "./AuthContext";
import AccountStatus from "./AccountStatus";
import { authLink } from "./destinations";

export default function ProtectedRoute({ role, allowDemo = false }) {
  const { user, isStaff, loading, error } = useAuth();
  const location = useLocation();
  if (allowDemo && !liveBackend) return <Outlet />;
  if (loading || error) return <AccountStatus />;
  if (!user) {
    const next =
      location.pathname === "/payment"
        ? "/reservation"
        : location.pathname + location.search;
    return <Navigate to={authLink("/logIn", next)} replace />;
  }
  if (role === "staff" && !isStaff) return <Navigate to="/guest" replace />;
  if (role === "guest" && isStaff) return <Navigate to="/staff" replace />;
  return <Outlet />;
}
