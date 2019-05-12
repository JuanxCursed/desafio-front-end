import {Pokedex} from 'pokeapi-js-wrapper';

const pokedex = new Pokedex({
    protocol: 'https',
    cache: true,
});

export default pokedex;
