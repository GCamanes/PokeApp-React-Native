import React from 'react';
import { StyleSheet, Platform, Text, View, Image, Alert, Dimensions } from 'react-native';
import PokemonUtils  from '../utils/PokemonUtils';

import { getTypeImg } from '../images';
import { mainBackgroundColor } from '../colors'
let deviceWidth = Dimensions.get('window').width

export class PokemonListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.pokemonItemView}>
                <Text style={styles.pokemonIndex}>#{this.props.pokemon.index_3Digits} </Text>
                <Image
                    style={styles.pokemonImg}
                    source={{ uri: this.props.pokemon.front_default}}
                />
                <Text style={styles.pokemonName}>{this.props.pokemon.name.toUpperCase()}</Text>
                <View style={styles.pokemonTypeView}>
                    <Image style={styles.typeImg} source={getTypeImg(this.props.pokemon.type1)}/>
                    {this.props.pokemon.type2 !== 'none' &&
                        <Image style={styles.typeImg} source={getTypeImg(this.props.pokemon.type2)}/>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pokemonItemView: {
        flexDirection: 'row',
        backgroundColor: mainBackgroundColor,
        alignItems: 'center',
        margin: Platform.OS === 'ios' ? 2 : 3,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: Platform.OS === 'ios' ? 1 : 3.84,
        elevation: Platform.OS === 'ios' ? 1 : 3,
        borderRadius: 5,
    },
    pokemonIndex: {
        flex: 1.5,
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? 14 : 18,
        color: 'black',
        margin: Platform.OS === 'ios' ? 2 : 3,
    },
    pokemonName: {
        flex: 5,
        marginStart: 10,
        fontSize: Platform.OS === 'ios' ? 14 : 18,
        color: 'black'
    },
    pokemonImg: {
        width: deviceWidth/7,
        height: deviceWidth/7,
    },
    pokemonTypeView: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeImg: {
        width: deviceWidth/9,
        height: 196 * ((deviceWidth/9)/520),
        margin: 2,
    },
});