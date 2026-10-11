import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../../services/api";
import { getPokemon, getPokemonList } from "../../services/pokemon";
import PokemonCard from "../../components/PokemonCard";
import PokemonModal from "../../components/PokemonModal";
import type { Pokemon } from "../../types/pokemon";
import "./styles.css";

type PokedexProps = {
  pokemons: Pokemon[];
  setPokemons: (value: Pokemon[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string;
  setError: (value: string) => void;
  searchMode: boolean;
  setSearchMode: (value: boolean) => void;
  onClearSearch: () => void;
};

export default function Pokedex({
  pokemons,
  setPokemons,
  loading,
  setLoading,
  error,
  setError,
  searchMode,
  setSearchMode,
  onClearSearch,
}: PokedexProps) {
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  async function getPage(nextOffset: number, append = false) {
    append ? setLoadingMore(true) : setLoading(true);
    setError("");
    try {
      const list = await getPokemonList(nextOffset);
      const details = await Promise.all(
        list.results.map((item) => getPokemon(item.name)),
      );
      setPokemons(append ? [...pokemons, ...details] : details);
      setOffset(nextOffset);
      setSearchMode(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Erro inesperado.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    if (pokemons.length === 0) void getPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="pokedex" className="pokedex-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow dark">DESCUBRA SUA EQUIPE</span>
          <h2>Pokédex</h2>
          <p>Clique no nome ou na imagem para abrir a carta completa.</p>
        </div>
        {searchMode && (
          <button className="clear-button" type="button" onClick={onClearSearch}>
            Limpar pesquisa
          </button>
        )}
      </div>
      {error && (
        <div className="error-message" role="alert">
          <strong>Ops!</strong> {error}
          {searchMode && (
            <button type="button" onClick={onClearSearch}>
              Ver todos
            </button>
          )}
        </div>
      )}
      <div className="card-grid" aria-live="polite" aria-busy={loading}>
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div className="card-skeleton" key={index} />
            ))
          : pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onOpen={setSelected}
              />
            ))}
      </div>
      {!loading && !searchMode && !error && (
        <button
          className="load-more"
          type="button"
          disabled={loadingMore}
          onClick={() => void getPage(offset + PAGE_SIZE, true)}
        >
          {loadingMore ? "Carregando..." : "Carregar mais Pokémon"}
          <span aria-hidden="true">↓</span>
        </button>
      )}
      {selected && (
        <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}