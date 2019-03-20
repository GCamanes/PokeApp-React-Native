import React from 'react';
import { StyleSheet, Platform, Text, View, Image, Alert, Dimensions } from 'react-native';

import { mainBackgroundColor } from '../colors'

let deviceWidth = Dimensions.get('window').width

export class PokemonListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.pokemonItemView}>
                <Image
                    style={styles.pokemonImg}
                    source={{ uri: this.props.pokemon.front_default }}
                    resizeMode="cover"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pokemonItemView: {
        backgroundColor: mainBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth * 0.25,
        height: deviceWidth * 0.25,
    },
    pokemonImg: {
        margin: 1,
        width: deviceWidth * 0.24,
        height: deviceWidth * 0.24,
        backgroundColor: '#e1e4e8'
    },
});