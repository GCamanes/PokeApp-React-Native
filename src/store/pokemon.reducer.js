import {
    POKEMONS_LOADED, LOAD_POKEMONS,
    POKEMON_DETAIL_LOADED, LOAD_POKEMON_DETAIL,
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
            pokemonsWithIndex = action.pokemons.map((item, index) => {
                return {
                    index: PokemonUtils.getPokemonIndex(item.url),
                    ...item
                }
            })
            return {
                ...state,
                pokemons: pokemonsWithIndex,
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

        case POKEMON_DETAIL_LOADED: {
            console.log(action.pokemonDetail.sprites.front_default)
            return {
                ...state,
                pokemonDetail: action.pokemonDetail,
                pokemonDetailLoading: false,
                pokemonDetailLoaded: true,
            };
        }
        case LOAD_POKEMON_DETAIL: {
            return {
                ...state,
                pokemonDetailLoading: true,
                pokemonDetailLoaded: false,
            };
        }

        default:
            return state;
    }
}