import type { Pokemon } from "../../utils/types/pokemon";
import { CORES_TIPO, formatarId } from "../../services/pokemonService";
import styles from "./PokemonCard.module.css";

interface Props {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: Props) {
  const tipoPrincipal = pokemon.types[0]?.type.name ?? "normal";
  const cor = CORES_TIPO[tipoPrincipal] ?? "#A8A878";
  const imagem =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default;

  return (
    <article className={styles.card} style={{ "--cor-tipo": cor } as React.CSSProperties}>
      <header className={styles.header}>
        <span className={styles.id}>{formatarId(pokemon.id)}</span>
        <h2 className={styles.nome}>{pokemon.name}</h2>
      </header>

      <div className={styles.imagemWrapper}>
        <img src={imagem} alt={pokemon.name} loading="lazy" />
      </div>

      <div className={styles.tipos}>
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className={styles.tipo}
            style={{ background: CORES_TIPO[t.type.name] ?? "#999" }}
          >
            {t.type.name}
          </span>
        ))}
      </div>

      <footer className={styles.footer}>
        <div>
          <strong>XP</strong>
          <span>{pokemon.base_experience ?? "—"}</span>
        </div>
        <div>
          <strong>Alt.</strong>
          <span>{(pokemon.height / 10).toFixed(1)} m</span>
        </div>
        <div>
          <strong>Peso</strong>
          <span>{(pokemon.weight / 10).toFixed(1)} kg</span>
        </div>
      </footer>
    </article>
  );
}