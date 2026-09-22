interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    sprites: {
        front_default: string;
    }
}





async function buscarPokemon(id: number): Promise<Pokemon> {
    const api = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const resposta = await fetch(api);

    const info: Pokemon = (await resposta.json()) as Pokemon;

    return info;
}

const pokemon = await buscarPokemon(1);

console.log(pokemon.id);
console.log(pokemon.name);
console.log(pokemon.base_experience);
console.log(pokemon.sprites.front_default);