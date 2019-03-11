import APIClient from '../api/APIClient';

export const POKEMONS_LOADED = 'POKEMONS_LOADED';
export const LOAD_EVOLUTION_CHAINS = 'LOAD_EVOLUTION_CHAINS';
export const LOAD_POKEMONS = 'LOAD_POKEMONS';

export function pokemonsLoaded(data) {
    return {
        type: POKEMONS_LOADED,
        evolutionChains: data,
    };
}

function loadEvolutionChains(data) {
    return (dispatch) => {
        dispatch({
            type: LOAD_EVOLUTION_CHAINS,
            pokemons: data,
        });

        var promisesChain = [];

        data.map((item) => {
            promisesChain.push(
                APIClient.getPokemonEvolutionChain(item)
            );
        })

        Promise.all(promisesChain)
        .then((data) => {
            dispatch(pokemonsLoaded(data))
        });
    };
}

export function loadPokemons() {
    return (dispatch) => {
        dispatch({ type: LOAD_POKEMONS });
        return APIClient.getPokemonList()
            .then(data => {
                var promisesDetail = [];

                data.map((item) => {
                    promisesDetail.push(
                        APIClient.getPokemonDetail(item.url)
                    );
                })

                Promise.all(promisesDetail)
                    .then((data) => {
                        dispatch(loadEvolutionChains(data))
                    });
            })
            .catch();
    };
}