// Shared shell for unfinished pages, with room for the team's future layout.
export default function TemplatePage({
  title,
  description,
  placeholder,
  children,
}) {
  return (
    <section className="page">
      <header className="page-intro">
       
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      <div className="placeholder">
        <h2>{placeholder}</h2>
        <p>Layout and details to be planned by the team.</p>
      </div>

      {children}
    </section>
  );
}
