import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import styles from "./Home.module.css";

const BASE = "https://pokeapi.co/api/v2/pokemon";

interface PokemonType {
  type: { name: string };
}

interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

interface Pokemon {
  id: number;
  name: string;
  sprites: { other: { home: { front_default: string } } };
  types: PokemonType[];
  stats: PokemonStat[];
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const findStat = (name: string) =>
    pokemon.stats.find((s) => s.stat.name === name)?.base_stat ?? 0;

  return (
    <article className={styles.card}>
      <img
        src={pokemon.sprites.other.home.front_default}
        alt={`Sprite do Pokémon ${pokemon.name}`}
        className={styles.image}
        loading="lazy"
      />
      <h2 className={styles.pokemonName}>
        #{String(pokemon.id).padStart(3, "0")} — {pokemon.name}
      </h2>
      <ul className={styles.infoList}>
        <li>
          <strong>Tipo:</strong>{" "}
          {pokemon.types.map((t) => t.type.name).join(", ")}
        </li>
        <li>
          <strong>Ataque:</strong> {findStat("attack")}
        </li>
        <li>
          <strong>Defesa:</strong> {findStat("defense")}
        </li>
        <li>
          <strong>Velocidade:</strong> {findStat("speed")}
        </li>
      </ul>
    </article>
  );
}

export function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPokemon() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${BASE}/1`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: Pokémon não encontrado`);
        }

        const data: Pokemon = await response.json();
        setPokemon(data);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
    return () => controller.abort();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Seja Bem-vindo!</h1>
          <p className={styles.subtitle}>
            Conheça o mundo Pokémon e explore sua Pokédex completa.
          </p>
        </section>

        <section className={styles.featured} aria-labelledby="featured-title">
          <h2 id="featured-title" className={styles.sectionTitle}>
            Pokémon em destaque
          </h2>

          {loading && <p className={styles.feedback}>Carregando...</p>}

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          {pokemon && !loading && !error && (
            <PokemonCard pokemon={pokemon} />
          )}

          <div className={styles.actions}>
            <Link to="/Pokedex" className={styles.button}>
              Ver Pokédex completa
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}