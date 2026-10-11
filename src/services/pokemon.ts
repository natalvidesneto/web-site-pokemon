import { API, PAGE_SIZE } from "./api";
import type { Pokemon, PokemonListResponse } from "../types/pokemon";

export async function getPokemon(value: string | number, signal?: AbortSignal) {
  const response = await fetch(`${API}/pokemon/${value}`, { signal });
  if (!response.ok) {
    throw new Error("Pokémon não encontrado. Confira o nome ou número.");
  }
  return (await response.json()) as Pokemon;
}

export async function getPokemonList(offset = 0, signal?: AbortSignal) {
  const response = await fetch(
    `${API}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`,
    { signal },
  );
  if (!response.ok) throw new Error("Não foi possível abrir a Pokédex.");
  return (await response.json()) as PokemonListResponse;
}