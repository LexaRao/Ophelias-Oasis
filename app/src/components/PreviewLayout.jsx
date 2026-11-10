import { Link, NavLink, Outlet } from "react-router-dom";
import { guestPages, staffPages } from "../previewPages";
import { useDemo } from "../demo/DemoContext";

export default function PreviewLayout({ kind }) {
  const { reset } = useDemo();
  const pages = kind === "guest" ? guestPages : staffPages;
  return (
    <div className="preview-layout">
      <aside className="sidebar">
        <p className="eyebrow">Ophelia’s Oasis</p>
        <h2>{kind === "guest" ? "Your stay" : "Hotel workspace"}</h2>
        <nav aria-label={`${kind} pages`}>
          {pages.map((page) => (
            <NavLink key={page.slug} end to={`/preview/${kind}/${page.slug}`}>
              {page.title}
            </NavLink>
          ))}
        </nav>
        <Link
          className="switch-view"
          to={`/preview/${kind === "guest" ? "staff" : "guest"}`}
        >
          Switch to {kind === "guest" ? "staff" : "guest"} ↗
        </Link>
      </aside>
      <div className="preview-content">
        <div className="demo-bar">
          <span>
            <span className="status-dot" /> Demo · Sample data, saved in this
            tab
          </span>
          <button className="text-button" onClick={reset}>
            Reset demo
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
