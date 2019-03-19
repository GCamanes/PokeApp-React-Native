import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import { weightImg, heightImg } from '../images';

import { Dimensions } from 'react-native'
let deviceWidth = Dimensions.get('window').width

export class PokemonBodyView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.pokemonBodyView}>
                <Image
                    style={styles.bodyImg}
                    source={weightImg}
                />
                <Text style={styles.bodyText}>{this.props.weight/10.0} kg</Text>
                <Image
                    style={{
                        ...styles.bodyImg,
                        marginStart: 15,
                    }}
                    source={heightImg}
                />
                <Text style={styles.bodyText}>{this.props.height/10.0} m</Text>
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
    bodyImg: {
        width: deviceWidth / 8,
        height: deviceWidth / 8
    },
    bodyText: {
        fontSize: 25,
        marginStart: 10,
        color: 'black'
    },
});