import { NavLink, Outlet } from "react-router-dom";
import { guestPages, staffPages } from "../previewPages";

export default function PreviewLayout({ kind }) {
  const pages = kind === "guest" ? guestPages : staffPages;

  return (
    <div className="preview-layout">
      <aside className="sidebar">
        <h2>{kind === "guest" ? "Guest" : "Staff"} preview</h2>
        <p>No account needed</p>

        <nav aria-label={`${kind} pages`}>
          {pages.map((page) => (
            <NavLink
              key={page.slug}
              end
              to={`/preview/${kind}${page.slug ? `/${page.slug}` : ""}`}
            >
              {page.title}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="preview-content">
        <p className="preview-note">
          Rough template only. These pages do not load or save account data.
        </p>
        <Outlet />
      </div>
    </div>
  );
}
