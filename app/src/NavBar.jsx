import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="navbar">
        <Link className="brand" to="/">
          Ophelia’s Oasis
        </Link>
        <nav aria-label="Main navigation">
          <ul className="links">
            {[
              ["/", "Home"],
              ["/rooms", "Rooms"],
              ["/gallery", "Gallery"],
              ["/about", "About & Contact"],
              ["/reservation", "Reservations"],
              ["/logIn", "Log In"],
            ].map(([to, label]) => (
              <li key={to}>
                <NavLink to={to} end>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <nav className="preview-bar" aria-label="Template previews">
        <span>
          <strong>Views Template</strong>
        </span>
        <div className="button-row">
          <NavLink to="/" end>
            Public Website
          </NavLink>
          <NavLink to="/preview/guest">Guest Preview</NavLink>
          <NavLink to="/preview/staff">Staff Preview</NavLink>
        </div>
      </nav>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer>
        <span>Ophelia’s Oasis</span>
        <Link to="/policies">Booking Policies</Link>
        <Link to="/about">Contact</Link>
      </footer>
    </>
  );
}
