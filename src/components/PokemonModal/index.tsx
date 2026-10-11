import { useEffect, useRef } from "react";
import type { Pokemon } from "../../types/pokemon";
import { displayName } from "../../utils/formatters";
import PokemonCard from "../PokemonCard";
import "./styles.css";

type PokemonModalProps = {
  pokemon: Pokemon;
  onClose: () => void;
};

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={`Carta de ${displayName(pokemon.name)}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Fechar carta"
        >
          ×
        </button>
        <PokemonCard pokemon={pokemon} onOpen={() => undefined} />
        <p className="modal-tip">Pressione Esc ou clique fora para fechar.</p>
      </div>
    </div>
  );
}