import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/" onClick={closeMenu}>
            MeuApp
          </Link>
        </div>

        {/* Botão Hambúrguer (visível apenas no mobile) */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Overlay (fecha o menu ao clicar fora) */}
        <div
          className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : ""}`}
          onClick={closeMenu}
        />

        {/* Menu de Navegação */}
        <ul
          className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ""}`}
        >
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink} onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/sobre" className={styles.navLink} onClick={closeMenu}>
              Sobre
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/contato" className={styles.navLink} onClick={closeMenu}>
              Contato
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}