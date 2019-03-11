import {
    POKEMONS_LOADED, LOAD_EVOLUTION_CHAINS, LOAD_POKEMONS,
} from './pokemon.action';

import PokemonUtils  from '../utils/PokemonUtils';

export const initialState = {
    pokemonsLoading: false,
    pokemonsLoaded: false,
    pokemonDetailLoading: false,
    pokemonDetailLoaded: false,
    pokemons: [],
    evolutionChains: [],
    pokemonDetail: {},
    pokemonsError: undefined,
    pokemonDetailError: undefined
};

export function pokemonReducer(state = initialState, action) {
    switch (action.type) {
        case POKEMONS_LOADED: {
            return {
                ...state,
                evolutionChains: action.evolutionChains,
                pokemonsLoading: false,
                pokemonsLoaded: true,
            };
        }
        case LOAD_EVOLUTION_CHAINS: {
            return {
                ...state,
                pokemons: action.pokemons,
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