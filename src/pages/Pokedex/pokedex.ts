interface Pokemon {
    id: number
    name: string;
}

const Base = `https://pokeapi.co/api/v2/pokemon/ditto`;

async function buscar(): Promise<Pokemon>{
    const response = await fetch(Base);
    const nome = (await response.json()) as Pokemon;
    return nome
}

const pokemon = await buscar();

console.log(pokemon.name);