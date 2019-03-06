import {
    POKEMONS_LOADED, LOAD_POKEMONS,
} from './pokemon.action';

export const initialState = {
    loading: false,
    loaded: false,
    pokemons: [],
    pokemonsError: undefined,
};

export function pokemonReducer(state = initialState, action) {
    switch (action.type) {
        case POKEMONS_LOADED: {
            return {
                ...state,
                pokemons: action.pokemons,
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
        default:
            return state;
    }
}