import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import { weightImg, heightImg } from '../images';

export class PokemonBodyView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.pokemonBodyView}>
                <Image
                    style={{
                        width: this.props.deviceWidth / 8,
                        height: this.props.deviceWidth / 8
                    }}
                    source={weightImg}
                />
                <Text style={styles.bodyText}>{this.props.weight}</Text>
                <Image
                    style={{
                        marginStart: 15,
                        width: this.props.deviceWidth / 8,
                        height: this.props.deviceWidth / 8
                    }}
                    source={heightImg}
                />
                <Text style={styles.bodyText}>{this.props.height}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pokemonBodyView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodyText: {
        fontSize: 25,
        marginStart: 10,
        color: 'black'
    },
});