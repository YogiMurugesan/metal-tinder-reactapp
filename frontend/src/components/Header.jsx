function Header({ title, back, action }) {
  return (
    <header className="topbar">
      {back ? (
        <button className="icon-button" onClick={back} aria-label="Go back">←</button>
      ) : (
        <div className="brand-mark">M</div>
      )}
      <h1>{title}</h1>
      {action || <span className="header-space" />}
    </header>
  );
}

export default Header;
