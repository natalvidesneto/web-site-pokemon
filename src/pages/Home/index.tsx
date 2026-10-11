import { useEffect, useState } from "react";
import { FEATURED_ID } from "../../services/api";
import { getPokemon } from "../../services/pokemon";
import { imageOf } from "../../utils/formatters";
import type { Pokemon } from "../../types/pokemon";
import PokemonModal from "../../components/PokemonModal";
import SearchIcon from "../../components/SearchIcon";
import type { FormEvent } from "react";
import "./styles.css";

type HomeProps = {
  query: string;
  setQuery: (value: string) => void;
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
};

export default function Home({ query, setQuery, onSearch }: HomeProps) {
  const [pikachu, setPikachu] = useState<Pokemon | null>(null);
  const [selected, setSelected] = useState<Pokemon | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    getPokemon(FEATURED_ID, controller.signal)
      .then(setPikachu)
      .catch((caught) => {
        if (caught instanceof Error && caught.name !== "AbortError") {
          console.error(caught);
        }
      });
    return () => controller.abort();
  }, []);

  return (
    <section id="inicio" className="hero">
      <div className="hero-copy">
        <span className="eyebrow">EXPLORE O MUNDO POKÉMON</span>
        <h1>
          Encontre. Conheça.
          <br />
          <em>Colecione.</em>
        </h1>
        <p>
          Sua jornada começa aqui. Pesquise por nome ou número e descubra cada
          Pokémon em cartas inspiradas nos clássicos.
        </p>
        <form className="hero-search" onSubmit={onSearch}>
          <SearchIcon />
          <label className="sr-only" htmlFor="hero-search">
            Nome ou número do Pokémon
          </label>
          <input
            id="hero-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex.: Pikachu ou 25"
          />
          <button type="submit">Pesquisar</button>
        </form>
        <div className="popular-searches">
          <span>Populares:</span>
          {["Pikachu", "Charizard", "Eevee"].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                setQuery(name);
                document.getElementById("hero-search")?.focus();
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div className="hero-visual">
        <span className="hero-word" aria-hidden="true">
          PIKACHU
        </span>
        <span className="hero-circle" aria-hidden="true" />
        {pikachu ? (
          <button
            type="button"
            className="hero-pokemon"
            onClick={() => setSelected(pikachu)}
            aria-label="Abrir carta de Pikachu"
          >
            <img src={imageOf(pikachu)} alt="Pikachu" />
          </button>
        ) : (
          <div className="hero-placeholder" />
        )}
        <span className="floating-tag">#025 · ELÉTRICO</span>
      </div>
      {selected && (
        <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}