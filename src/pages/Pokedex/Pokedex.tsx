import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";
import { buscarPokemon, listarPokemons } from "../../services/pokemonService";
import type { Pokemon } from "../../utils/types/pokemon";
import styles from "./Pokedex.module.css";
import { Footer } from "../../components/Footer/Footer";

const PAGE_SIZE = 20;

export function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [modoBusca, setModoBusca] = useState(false);

  /** Carrega lista paginada */
  const carregarLista = useCallback(async (novoOffset: number) => {
    setLoading(true);
    setErro(null);
    try {
      const { results } = await listarPokemons(PAGE_SIZE, novoOffset);
      const detalhes = await Promise.all(
        results.map((p) => buscarPokemon(p.name))
      );
      setPokemons((prev) =>
        novoOffset === 0 ? detalhes : [...prev, ...detalhes]
      );
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // carrega a primeira página ao montar
  useEffect(() => {
    // Adia a chamada para o próximo tick, evitando setState síncrono no efeito
    const id = setTimeout(() => {
      carregarLista(0);
    }, 0);

    return () => clearTimeout(id);
  }, [carregarLista]);

  /** Busca específica (nome ou ID) */
  async function handleBuscar() {
    const termo = busca.trim().toLowerCase();
    if (!termo) {
      setModoBusca(false);
      setOffset(0);
      carregarLista(0);
      return;
    }

    setLoading(true);
    setErro(null);
    try {
      const p = await buscarPokemon(termo);
      setPokemons([p]);
      setModoBusca(true);
    } catch (e) {
      setPokemons([]);
      setErro((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function handleCarregarMais() {
    const novoOffset = offset + PAGE_SIZE;
    setOffset(novoOffset);
    carregarLista(novoOffset);
  }

  function limparBusca() {
    setBusca("");
    setModoBusca(false);
    setOffset(0);
    carregarLista(0);
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <form
          className={styles.searchPokemon}
          onSubmit={(e) => {
            e.preventDefault();
            handleBuscar();
          }}
        >
          <input
            type="text"
            name="searchPokemon"
            id="searchPokemon"
            autoFocus
            placeholder="Nome ou ID do Pokémon"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button id="search" type="submit" disabled={loading}>
            {loading ? "..." : "Pesquisar"}
          </button>
          {modoBusca && (
            <button
              type="button"
              className={styles.limpar}
              onClick={limparBusca}
            >
              Limpar
            </button>
          )}
        </form>

        {erro && <p className={styles.erro}>⚠️ {erro}</p>}

        <section className={styles.letterPokemons}>
          {pokemons.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}

          {/* Skeleton */}
          {loading &&
            Array.from({ length: modoBusca ? 1 : 8 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
        </section>

        {!modoBusca && !loading && (
          <div className={styles.maisWrapper}>
            <button onClick={handleCarregarMais} className={styles.mais}>
              Carregar mais
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}