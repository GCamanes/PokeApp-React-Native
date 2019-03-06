import APIClient from '../api/APIClient';

export const POKEMONS_LOADED = 'POKEMONS_LOADED';
export const LOAD_POKEMONS = 'LOAD_POKEMONS';

export const POKEMON_DETAIL_LOADED = 'POKEMON_DETAIL_LOADED';
export const LOAD_POKEMON_DETAIL = 'LOAD_POKEMON_DETAIL';

export function pokemonsLoaded(data) {
    return {
        type: POKEMONS_LOADED,
        pokemons: data.results,
    };
}

export function loadPokemons() {
    return (dispatch) => {
        dispatch({ type: LOAD_POKEMONS });
        return APIClient.getPokemonList()
            .then(data => dispatch(pokemonsLoaded(data)))
            .catch();
    };
}

export function pokemonDetailLoaded(data) {
    return {
        type: POKEMON_DETAIL_LOADED,
        pokemonDetail: data,
    };
}

export function loadPokemonDetail(index) {
    return (dispatch) => {
        dispatch({ type: LOAD_POKEMON_DETAIL });
        return APIClient.getPokemonDetail(index)
            .then(data => dispatch(pokemonDetailLoaded(data)))
            .catch();
    };
}