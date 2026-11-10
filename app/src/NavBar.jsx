import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
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
            ["/logIn", "My stay"],
          ].map(([to, label]) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
          <Link className="button" to="/reservation">
            Book a stay <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
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
