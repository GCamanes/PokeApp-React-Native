import APIClient from '../api/APIClient';

export const POKEMONS_LOADED = 'POKEMONS_LOADED';
export const LOAD_POKEMONS = 'LOAD_POKEMONS';

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