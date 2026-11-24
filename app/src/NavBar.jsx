import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import "./NavBar.css";

export default function NavBar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutBusy, setLogoutBusy] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const { user, isStaff, signOut } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() {
    setLogoutBusy(true);
    setLogoutError("");
    try {
      await signOut();
      navigate("/", { replace: true });
    } catch {
      setLogoutError("Unable to log out. Please try again.");
    } finally {
      setLogoutBusy(false);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="navbar">
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
          Ophelia’s Oasis<span>AMLET DESERT · AUSTRALIA</span>
        </Link>
        <button
          className="menu-toggle secondary"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav
          id="main-nav"
          className={menuOpen ? "main-nav open" : "main-nav"}
          aria-label="Main navigation"
          onClick={() => setMenuOpen(false)}
        >
          {[
            ["/rooms", "The rooms"],
            ["/gallery", "Gallery"],
            ["/about", "Our oasis"],
          ].map(([to, label]) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
          {!isStaff && (
            <NavLink to={user ? "/guest" : "/logIn"}>My stay</NavLink>
          )}
          <Link className="button" to={isStaff ? "/staff" : "/reservation"}>
            {isStaff ? "Staff Dashboard" : "Book a stay"}{" "}
            <span aria-hidden="true">↗</span>
          </Link>
          {user && (
            <button
              className="text-button"
              disabled={logoutBusy}
              onClick={handleLogout}
            >
              {logoutBusy ? "Logging out…" : "Log out"}
            </button>
          )}
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        {logoutError && (
          <p className="form-message" role="alert">
            {logoutError}
          </p>
        )}
        <Outlet />
      </main>
      <footer className="site-footer">
        <div>
          <Link className="brand" to="/">
            Ophelia’s Oasis
          </Link>
          <p>A little further from the everyday.</p>
        </div>
        <nav aria-label="Footer">
          <Link to="/about">Our location</Link>
          <Link to="/policies">Booking policies</Link>
          <Link to="/preview/guest">Guest demo</Link>
          <Link to="/preview/staff">Staff demo</Link>
        </nav>
        <small>
          © {new Date().getFullYear()} Ophelia’s Oasis · A school project
        </small>
      </footer>
    </>
  );
}
