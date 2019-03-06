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
            .then(responseJSON => responseJSON)
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
}
