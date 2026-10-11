import { useState } from "react";
import Logo from "../Logo";
import "./styles.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-content">
        <Logo />
        <button
          className={`menu-button${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Principal">
          <a href="#inicio" onClick={() => setMenuOpen(false)}>
            Início
          </a>
          <a href="#pokedex" onClick={() => setMenuOpen(false)}>
            Pokédex
          </a>
          <span className="nav-count">#001 — #1025</span>
        </nav>
      </div>
    </header>
  );
}