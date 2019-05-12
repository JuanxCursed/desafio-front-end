import _ from 'lodash';
import pokedex from '../apis/pokeapi';
import {
    CAPTURE_POKEMON,
    FETCH_POKEMON,
    FETCH_POKEMONS,
    MY_POKEDEX,
    RELEASE_POKEMON,
    SEARCH_TERM_UPDATED
} from "./types";

/*
* Using pageSize of 1000 since are too few records, a pagination system will be easely make with `page` variable and
* a button on page to increase or decrease the pages
* */
export const fetchPokemons = (query = null, page = 0, pageSize = 1000) => async dispatch => {
    let response;
    if (query && typeof query == 'string') {
        response = [await pokedex.getPokemonByName(query.toLowerCase())];
    } else if (query && typeof query == 'object') {
        response = [await pokedex.getPokemonByName(query.toLowerCase())];
    } else {
        response = (await pokedex.getPokemonsList({limit: pageSize, offset: pageSize * page})).results;
    }

    dispatch({
        type: FETCH_POKEMONS,
        payload: response || []
    });
};

export const searchTerm = value => async dispatch => {
    dispatch({type: SEARCH_TERM_UPDATED, payload: value});
    dispatch(fetchPokemons(value))
};

export const fetchPokemon = pokemon => async dispatch => {
    let response = await pokedex.getPokemonByName(pokemon.name);
    let {front_default} = response.sprites;
    pokemon.thumb = front_default ? front_default : '';

    let {evolution_chain} = await pokedex.getPokemonSpeciesByName(pokemon.name);
    let evolution = await pokedex.resource(evolution_chain.url);
    evolution = _.flattenDepth(await getEvolution(evolution.chain), 2);

    let id_string = "" + response.id;
    let filler = "000";
    let pokemon_id = filler.substring(0, filler.length - id_string.length) + id_string;

    let _owned = await getLocalStorage();

    let selected = {
        id: pokemon_id,
        name: pokemon.name,
        thumb: pokemon.thumb, //TODO: need to make replaceable by pic uploaded
        weight: response.weight,
        height: response.height,
        types: response.types.map(({type}) => {
            return type.name;
        }), // TODO: Ao clicar em um item da lista de tipos, mostrar todos os pokémons daquele mesmo tipo, inclusive os que ainda não estão adicionados a Pokédex
        abilities: response.abilities.map(({ability}) => {
            return ability;
        }),
        stats: response.stats.map(stat => {
            return {
                name: stat.stat.name,
                value: stat.base_stat
            };
        }),
        evolutions: evolution,
        owned: (_owned.filter(poke => poke.name === pokemon.name)).length > 0
    };

    dispatch({
        type: FETCH_POKEMON,
        payload: selected
    });
};

export const myPokedex = () => async dispatch => {
    dispatch({
        type: MY_POKEDEX,
        payload: await getLocalStorage()
    });
};

export const capturePokemon = pokemon => async dispatch => {
    let pokedex = await getLocalStorage();
    pokedex.push({name: pokemon});

    dispatch({
        type: CAPTURE_POKEMON,
        payload: await updateLocalStorage(_.uniqBy(pokedex, 'name'))
    });
    dispatch(fetchPokemon({name: pokemon}));
};

export const releasePokemon = pokemon => async dispatch => {
    let pokedex = await getLocalStorage();
    pokedex = pokedex.filter(poke => poke.name !== pokemon);

    dispatch({
        type: RELEASE_POKEMON,
        payload: await updateLocalStorage(pokedex)
    });
    dispatch(fetchPokemon({name: pokemon}));
};

/*
* Helper function to get recursivally the evolution chain
* @param evolution Start of the chain
* @return array list of evolutions with name and thumbnail
* */
const getEvolution = async (evolution) => {
    let pokemon = await pokedex.getPokemonByName(evolution.species.name);
    let {front_default} = pokemon.sprites;
    let _evolutions = [{
        name: pokemon.name,
        thumb: front_default ? front_default : ''
    }];
    if (evolution.evolves_to.length > 0) {
        _evolutions.push(await getEvolution(evolution.evolves_to[0]));
    }
    return _evolutions;
};

/*
* Helper function to update MyPokedex Pokemon's list (just to avoid code repetition and more short hand)
* @param catcheds Array of objects to save on localstorage eg: [{name: "pokemon name"},...]
* @return return the list of objects saved
* */
const updateLocalStorage = async catcheds => {
    await localStorage.setItem('myPokedex', JSON.stringify(catcheds));
    return catcheds;
};

/*
* Helper function to fetch MyPokedex Pokemon's list (just to avoid code repetition and more short hand)
* @return return the list of objects saved on localstorage if is null return a empty array
* */
const getLocalStorage = async () => {
    return await JSON.parse(localStorage.getItem('myPokedex')) || [];
};
