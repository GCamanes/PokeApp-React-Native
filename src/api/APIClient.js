import PokemonUtils from "../utils/PokemonUtils"

export const apiUrl = "https://pokeapi.co/api/v2/"

export default class APIClient {
    static getPokemonList() {
        return fetch(apiUrl + 'pokemon/?offset=0&limit=151',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            })
            .then(response => response.json())
            .then(responseJSON => responseJSON.results)
            .catch();
    }

    static getPokemonEvolutionChain(pokemon) {
        return fetch(pokemon.species_url,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
        .then(response => response.json())
        .then(responseJSON => {
            return fetch(responseJSON.evolution_chain.url, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            })
            .then(response => response.json())
            .then(responseJSON => {

                var result = []

                if (responseJSON.chain.evolves_to.length !== 0) {
                    responseJSON.chain.evolves_to.map((item) => {
                        var index1 = parseInt(PokemonUtils.getPokemonIndex(apiUrl, 'pokemon-species/', responseJSON.chain.species.url), 10)
                        var index2 = parseInt(PokemonUtils.getPokemonIndex(apiUrl, 'pokemon-species/', item.species.url), 10)
                        if (item.evolves_to.length === 0) {
                            result.push([index1, index2])
                        } else {
                            item.evolves_to.map((item2) => {
                                var index3 = parseInt(PokemonUtils.getPokemonIndex(apiUrl, 'pokemon-species/', item2.species.url), 10)
                                result.push([
                                    index1, index2, index3
                                ])
                            })
                        }
                    })
                }

                return PokemonUtils.cleanEvolutionChainFirstGenOnly(result, pokemon.index)
            })
            .catch();
        })
        .catch();
    }

    static getPokemonDetail(url) {
        return fetch(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            })
            .then(response => response.json())
            .then(responseJSON => {
                return {
                    index: responseJSON.id,
                    index_3Digits: (responseJSON.id < 10) ? '00' + responseJSON.id : (responseJSON.id < 100) ?
                        '0' + responseJSON.id : responseJSON.id,
                    name: responseJSON.name,
                    height: responseJSON.height,
                    weight: responseJSON.weight,

                    type1: (responseJSON.types.length === 2) ?
                        responseJSON.types[1].type.name : responseJSON.types[0].type.name,
                    type2: (responseJSON.types.length === 2) ?
                        responseJSON.types[0].type.name : 'none',

                    base_speed: responseJSON.stats[0].base_stat,
                    base_special_defense: responseJSON.stats[1].base_stat,
                    base_special_attack: responseJSON.stats[2].base_stat,
                    base_defense: responseJSON.stats[3].base_stat,
                    base_attack: responseJSON.stats[4].base_stat,
                    base_hp: responseJSON.stats[5].base_stat,

                    front_default: responseJSON.sprites.front_default,
                    front_shiny: responseJSON.sprites.front_shiny,
                    back_default: responseJSON.sprites.back_default,
                    back_shiny: responseJSON.sprites.back_shiny,

                    species_url: responseJSON.species.url
                }
            })
            .catch();
    }
}
