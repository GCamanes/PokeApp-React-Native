export const pokeballImg = require('./pokeball.png');

export const weightImg = require('./weight-icon.png');
export const heightImg = require('./height-icon.png');
export const rightArrowImg = require('./right-arrow-icon.png');
export const leftArrowImg = require('./left-arrow-icon.png');
export const starNotShinyImg = require('./star-not-shiny-icon.png');
export const rotateImg = require('./rotate-icon.png');

// 196 h 520 w
export const typeImg = {
    bug: require('./type-bug.png'),
    dark: require('./type-dark.png'),
    dragon: require('./type-dragon.png'),
    electric: require('./type-electric.png'),
    fairy: require('./type-fairy.png'),
    fighting: require('./type-fighting.png'),
    fire: require('./type-fire.png'),
    flying: require('./type-flying.png'),
    ghost: require('./type-ghost.png'),
    grass: require('./type-grass.png'),
    ground: require('./type-ground.png'),
    ice: require('./type-ice.png'),
    normal: require('./type-normal.png'),
    poison: require('./type-poison.png'),
    psychic: require('./type-psychic.png'),
    rock: require('./type-rock.png'),
    steel: require('./type-steel.png'),
    water: require('./type-water.png'),
}

export const getTypeImg = (type) => {
    switch(type) {
        case 'bug': {
            return typeImg.bug
        }
        case 'dark': {
            return typeImg.dark
        }
        case 'dragon': {
            return typeImg.dragon
        }
        case 'electric': {
            return typeImg.electric
        }
        case 'fairy': {
            return typeImg.fairy
        }
        case 'fighting': {
            return typeImg.fighting
        }
        case 'fire': {
            return typeImg.fire
        }
        case 'flying': {
            return typeImg.flying
        }
        case 'ghost': {
            return typeImg.ghost
        }
        case 'grass': {
            return typeImg.grass
        }
        case 'ground': {
            return typeImg.ground
        }
        case 'ice': {
            return typeImg.ice
        }
        case 'poison': {
            return typeImg.poison
        }
        case 'psychic': {
            return typeImg.psychic
        }
        case 'rock': {
            return typeImg.rock
        }
        case 'steel': {
            return typeImg.steel
        }
        case 'water': {
            return typeImg.water
        }
        default: {
            return typeImg.normal
        }
    }
}