import Logo from "../Logo";
import "./styles.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Logo />
      <p>Dados fornecidos pela PokéAPI. Projeto criado para fãs de Pokémon.</p>
      <span>© {new Date().getFullYear()} Natalvides Neto</span>
    </footer>
  );
}