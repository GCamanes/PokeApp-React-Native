import APIClient from '../api/APIClient';

export const POKEMONS_LOADED = 'POKEMONS_LOADED';
export const LOAD_POKEMONS = 'LOAD_POKEMONS';

export function pokemonsLoaded(data) {
    return {
        type: POKEMONS_LOADED,
        pokemons: data,
    };
}

export function loadPokemons() {
    return (dispatch) => {
        dispatch({ type: LOAD_POKEMONS });
        return APIClient.getPokemonList()
            .then(data => {
                var promises = [];

                data.map((item) => {
                    promises.push(APIClient.getPokemonDetailWithUrl(item.url));
                })

                Promise.all(promises).then((dataWithDetail) => {
                    dispatch(pokemonsLoaded(dataWithDetail))
                });
            })
            .catch();
    };
}