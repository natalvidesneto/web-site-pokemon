import type { Pokemon } from "../types/pokemon";

export function imageOf(pokemon: Pokemon) {
  return (
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default ??
    ""
  );
}

export function statOf(pokemon: Pokemon, name: string) {
  return pokemon.stats.find((item) => item.stat.name === name)?.base_stat ?? 0;
}

export function displayName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}