import { type FormEvent, useEffect, useState } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import { getPokemon, getPokemonList } from "./services/pokemon";
import type { Pokemon } from "./types/pokemon";

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getPokemonList(0, controller.signal)
      .then((list) =>
        Promise.all(
          list.results.map((item) =>
            getPokemon(item.name, controller.signal),
          ),
        ),
      )
      .then(setPokemons)
      .catch((caught) => {
        if (caught instanceof Error && caught.name !== "AbortError") {
          setError(caught.message);
        }
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim().toLowerCase();
    if (!term) {
      setSearchMode(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      setPokemons([await getPokemon(term)]);
      setSearchMode(true);
    } catch (caught) {
      setPokemons([]);
      setSearchMode(true);
      setError(caught instanceof Error ? caught.message : "Erro inesperado.");
    } finally {
      setLoading(false);
      document
        .getElementById("pokedex")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function clearSearch() {
    setQuery("");
    setSearchMode(false);
    setError("");
    setLoading(true);
    getPokemonList(0)
      .then((list) =>
        Promise.all(list.results.map((item) => getPokemon(item.name))),
      )
      .then(setPokemons)
      .catch((caught) =>
        setError(caught instanceof Error ? caught.message : "Erro inesperado."),
      )
      .finally(() => setLoading(false));
  }

  return (
    <DefaultLayout>
      <Home query={query} setQuery={setQuery} onSearch={search} />
      <Pokedex
        pokemons={pokemons}
        setPokemons={setPokemons}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        onClearSearch={clearSearch}
      />
    </DefaultLayout>
  );
}