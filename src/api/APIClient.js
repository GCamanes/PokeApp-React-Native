export const apiUrl = "https://pokeapi.co/api/v2/"
export const pokeImgUrlPart = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/'
export const pokeImgFileExtension = '.png'

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

    static getPokemonDetail(index) {
        return fetch(apiUrl + 'pokemon/' + index + '/',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            })
            .then(response => response.json())
            .then(responseJSON => responseJSON)
            .catch();
    }

    static getPokemonDetailWithUrl(url) {
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
                }
            })
            .catch();
    }
}
