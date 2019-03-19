import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { getTypeImg, typeHeightImg, typeWidthImg } from '../images';

import { Dimensions } from 'react-native'
let deviceWidth = Dimensions.get('window').width

export class PokemonTypeView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.pokemonTypeView}>
                <Image
                    style={styles.typeImg}
                    source={getTypeImg(this.props.type1)}
                />
                {this.props.type2 !== 'none' &&
                    <Image
                        style={styles.typeImg}
                        source={getTypeImg(this.props.type2)}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pokemonTypeView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeImg: {
        margin: 15,
        width: deviceWidth / 3,
        height: typeHeightImg * ((deviceWidth / 3) / typeWidthImg),
    },
});