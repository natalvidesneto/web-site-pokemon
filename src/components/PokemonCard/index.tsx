import type { Pokemon } from "../../types/pokemon";
import { displayName, imageOf, statOf } from "../../utils/formatters";
import { typeLabels, typeSymbols } from "../../utils/constants";
import "./styles.css";

type PokemonCardProps = {
  pokemon: Pokemon;
  onOpen: (pokemon: Pokemon) => void;
};

export default function PokemonCard({ pokemon, onOpen }: PokemonCardProps) {
  const type = pokemon.types[0]?.type.name ?? "normal";
  const typeLabel = typeLabels[type] ?? displayName(type);

  return (
    <article className={`pokemon-card type-${type}`}>
      <div className="card-inner">
        <header className="card-heading">
          <span className="card-stage">BÁSICO</span>
          <button
            className="card-name"
            type="button"
            onClick={() => onOpen(pokemon)}
            aria-label={`Ver detalhes de ${displayName(pokemon.name)}`}
          >
            {displayName(pokemon.name)}
          </button>
          <span className="card-hp">
            <small>HP</small> {statOf(pokemon, "hp")}
            <i aria-hidden="true">{typeSymbols[type] ?? "○"}</i>
          </span>
        </header>
        <button
          className="card-art"
          type="button"
          onClick={() => onOpen(pokemon)}
          aria-label={`Abrir carta de ${displayName(pokemon.name)}`}
        >
          <span className="card-number">
            #{String(pokemon.id).padStart(3, "0")}
          </span>
          <span className="art-orbit" aria-hidden="true" />
          <img src={imageOf(pokemon)} alt="" loading="lazy" />
          <span className="open-hint">Ver carta</span>
        </button>
        <div className="card-meta">
          <span>{typeLabel}</span>
          <span>
            {pokemon.height / 10} m · {pokemon.weight / 10} kg
          </span>
        </div>
        <div className="card-move">
          <span className="move-energy" aria-hidden="true">
            {typeSymbols[type] ?? "○"}
          </span>
          <div>
            <strong>Impacto elemental</strong>
            <p>A força deste Pokémon cresce com sua energia natural.</p>
          </div>
          <b>{statOf(pokemon, "attack")}</b>
        </div>
        <footer className="card-footer">
          <span>DEF {statOf(pokemon, "defense")}</span>
          <span>VEL {statOf(pokemon, "speed")}</span>
          <span>EXP {pokemon.base_experience ?? "—"}</span>
        </footer>
      </div>
    </article>
  );
}