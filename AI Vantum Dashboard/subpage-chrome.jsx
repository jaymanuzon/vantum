/* Shared chrome for Spectrum subpages. Pass `active` to highlight nav. */
const { Sidebar } = window;

function SubHeader({ title, sub, breadcrumb }) {
  return (
    <header className="subpage__header">
      {breadcrumb && (
        <div className="subpage__crumb">
          <a href="AIVC Family Dashboard.html">AIVC Spectrum</a>
          <span> · </span>
          <span>{breadcrumb}</span>
        </div>
      )}
      <h1 className="subpage__title">{title}</h1>
      {sub && <p className="subpage__sub">{sub}</p>}
    </header>
  );
}

function SubpageShell({ active, title, sub, breadcrumb, children }) {
  return (
    <div className="shell">
      <Sidebar active={active} />
      <main className="main">
        <SubHeader title={title} sub={sub} breadcrumb={breadcrumb} />
        <div className="subpage__body">{children}</div>
      </main>
    </div>
  );
}

Object.assign(window, { SubpageShell, SubHeader });
