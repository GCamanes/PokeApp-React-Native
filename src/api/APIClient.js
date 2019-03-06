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
            .then(responseJSON => responseJSON)
            .catch();
    }
}
