import React from 'react';
import { StyleSheet, Platform, Text, View, Image, Alert, Dimensions } from 'react-native';
import PokemonUtils from '../utils/PokemonUtils';

import { getTypeImg } from '../images';
import { mainBackgroundColor } from '../colors'
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

export class PokemonListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.pokemonItemView}>
                <View style={styles.pokemonTextView}>
                    <Text style={styles.pokemonIndex}>#{this.props.pokemon.index_3Digits} </Text>
                    <Text style={styles.pokemonName}>{this.props.pokemon.name.toUpperCase()}</Text>
                </View>

                <View style={styles.pokemonImgView}>
                    <Image
                        style={styles.pokemonImg}
                        source={{ uri: this.props.pokemon.front_default }}
                    />
                    <View style={styles.pokemonTypeView}>
                        <Image style={styles.typeImg} source={getTypeImg(this.props.pokemon.type1)} />
                        {this.props.pokemon.type2 !== 'none' &&
                            <Image style={styles.typeImg} source={getTypeImg(this.props.pokemon.type2)} />
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pokemonItemView: {
        flexDirection: 'column',
        backgroundColor: mainBackgroundColor,
        alignItems: 'center',
        margin: Platform.OS === 'ios' ? 2 : 3,
        width: deviceWidth * 0.48,
        height: deviceHeight / 6,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: Platform.OS === 'ios' ? 1 : 3.84,
        elevation: Platform.OS === 'ios' ? 1 : 3,
        borderRadius: 5,
    },
    pokemonTextView: {
        flexDirection: 'row',
        width: deviceWidth * 0.48,
    },
    pokemonImgView: {
        flexDirection: 'row',
        width: deviceWidth * 0.48,
    },
    pokemonIndex: {
        textAlign: 'center',
        color: 'black',
        fontSize: Platform.OS === 'ios' ? 14 : 16,
        margin: Platform.OS === 'ios' ? 2 : 3,
    },
    pokemonName: {
        fontSize: Platform.OS === 'ios' ? 14 : 16,
        margin: Platform.OS === 'ios' ? 2 : 3,
        color: 'black'
    },
    pokemonImg: {
        marginStart: 15,
        width: deviceWidth / 5,
        height: deviceWidth / 5,
    },
    pokemonTypeView: {
        flex: 1,    
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeImg: {
        width: deviceWidth / 9,
        height: 196 * ((deviceWidth / 9) / 520),
        margin: 2,
    },
});