
export default class PokemonUtils {

    static getPokemonIndex(apiUrl, splitPattern, url) {
        const start = apiUrl.length + splitPattern.length
        const end = url.length - 1
        return url.substring(start, end)
    }

    static cleanEvolutionChainFirstGenOnly(chains) {
        if (chains.length === 0) {
            return chains
        } else {
            var newChains = []
            chains.map((item) => {
                var newChain = item.filter(index => index <= 151)

                if (newChain.length === item.length) {
                    newChains.push(newChain)
                } else {
                    if (chains.length === 1 && newChain.length > 1) {
                        newChains.push(newChain)
                    }
                }
            })
            return newChains
        }
    }
}
