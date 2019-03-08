import {
    POKEMONS_LOADED, LOAD_POKEMONS,
} from './pokemon.action';

import PokemonUtils  from '../utils/PokemonUtils';

export const initialState = {
    pokemonsLoading: false,
    pokemonsLoaded: false,
    pokemonDetailLoading: false,
    pokemonDetailLoaded: false,
    pokemons: [],
    pokemonDetail: {},
    pokemonsError: undefined,
    pokemonDetailError: undefined
};

export function pokemonReducer(state = initialState, action) {
    switch (action.type) {
        case POKEMONS_LOADED: {
            return {
                ...state,
                pokemons: action.pokemons,
                pokemonsLoading: false,
                pokemonsLoaded: true,
            };
        }
        case LOAD_POKEMONS: {
            return {
                ...state,
                pokemonsLoading: true,
                pokemonsLoaded: false,
            };
        }
        default:
            return state;
    }
}