import {
    POKEMONS_LOADED, LOAD_POKEMONS,
    POKEMON_DETAIL_LOADED, LOAD_POKEMON_DETAIL,
} from './pokemon.action';

import PokemonUtils  from '../utils/PokemonUtils';

export const initialState = {
    loading: false,
    loaded: false,
    pokemons: [],
    pokemonDetail: {},
    pokemonsError: undefined,
    pokemonError: undefined
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
                loading: false,
                loaded: true,
            };
        }
        case LOAD_POKEMONS: {
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        }

        case POKEMON_DETAIL_LOADED: {
            console.log(action.pokemonDetail.sprites.front_default)
            return {
                ...state,
                pokemonDetail: action.pokemonDetail,
                loading: false,
                loaded: true,
            };
        }
        case LOAD_POKEMON_DETAIL: {
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        }

        default:
            return state;
    }
}