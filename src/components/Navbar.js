function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#222",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Parameswar Portfolio</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <a href="#hero" style={linkStyle}>
          Home
        </a>

        <a href="#skills" style={linkStyle}>
          Skills
        </a>

        <a href="#projects" style={linkStyle}>
          Projects
        </a>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
};

export default Navbar;