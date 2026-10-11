import "./styles.css";

export default function Logo() {
  return (
    <button
      className="logo"
      type="button"
      onClick={() => document.getElementById("inicio")?.scrollIntoView()}
      aria-label="Ir para o início"
    >
      Poké<span>dex</span>
    </button>
  );
}