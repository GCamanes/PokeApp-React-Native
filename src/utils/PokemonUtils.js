import { apiUrl, pokeImgUrlPart, pokeImgFileExtension } from '../api/APIClient';

export default class PokemonUtils {
    static getUriImg(url) {
        const start = apiUrl.length
        const end = url.length - 1
        return pokeImgUrlPart+url.substring(start, end)+pokeImgFileExtension
    }

    static getUriImgBack(url) {
        const start = apiUrl.length
        const end = url.length - 1
        return pokeImgUrlPart+url.substring(start, end)+pokeImgFileExtension
    }
    
    static getPokemonIndex(url) {
        const start = apiUrl.length + 'pokemon/'.length
        const end = url.length - 1
        return url.substring(start, end)
    }
}
