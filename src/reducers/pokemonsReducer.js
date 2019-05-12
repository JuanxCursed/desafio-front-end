import {
    CAPTURE_POKEMON,
    FETCH_POKEMON,
    FETCH_POKEMONS,
    MY_POKEDEX,
    RELEASE_POKEMON,
    SEARCH_TERM_UPDATED
} from "../actions/types";

const INITIAL_STATE = {
    catched: [],
    pokemons: [],
    selected: null,
    term: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_POKEMONS:
            return {...state, ...{pokemons: action.payload}};
        case SEARCH_TERM_UPDATED:
            return {...state, ...{term: action.payload}};
        case FETCH_POKEMON:
            return {...state, ...{selected: action.payload}};
        case MY_POKEDEX:
        case CAPTURE_POKEMON:
        case RELEASE_POKEMON:
            return {...state, ...{catched: action.payload}};
        default:
            return state;
    }
};
