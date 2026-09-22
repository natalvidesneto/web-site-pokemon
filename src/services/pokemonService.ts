import type { Pokemon, PokemonListItem } from "../utils/types/pokemon";

const API_BASE = "https://pokeapi.co/api/v2";

/** Busca um Pokémon por ID ou nome. */
export async function buscarPokemon(idOrName: string | number): Promise<Pokemon> {
  const resposta = await fetch(`${API_BASE}/pokemon/${idOrName}`);

  if (!resposta.ok) {
    throw new Error(`Pokémon "${idOrName}" não encontrado.`);
  }

  return (await resposta.json()) as Pokemon;
}

/** Busca uma lista paginada de pokémons. */
export async function listarPokemons(
  limit = 20,
  offset = 0
): Promise<{ results: PokemonListItem[]; count: number }> {
  const resposta = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);

  if (!resposta.ok) {
    throw new Error("Erro ao carregar lista de pokémons.");
  }

  return await resposta.json();
}

/** Formata "#001" */
export function formatarId(id: number): string {
  return `#${id.toString().padStart(3, "0")}`;
}

/** Cores por tipo (usado nos cards) */
export const CORES_TIPO: Record<string, string> = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  normal: "#A8A878",
};