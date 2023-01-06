export const fetchPokemons = async (amount) => {
  const pokemons = [];

  for (let i = 1; i <= amount; i++) {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(pokemonUrl);
    const pokemon = await response.json();
    const id = pokemon.id;
    const cardName = pokemon.name;
    const imgUrl = pokemon.sprites.front_default;
    pokemons.push({ id, cardName, imgUrl });
  }

  return pokemons;
};
