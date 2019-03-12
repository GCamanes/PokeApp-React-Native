import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { getTypeImg } from '../images';

export class PokemonTypeView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.pokemonTypeView}>
                <Image
                    style={{
                        ...styles.typeImg,
                        width: this.props.deviceWidth / 3,
                        height: 196 * ((this.props.deviceWidth / 3) / 520),
                    }}
                    source={getTypeImg(this.props.type1)}
                />
                {this.props.type2 !== 'none' &&
                    <Image
                        style={{
                            ...styles.typeImg,
                            width: this.props.deviceWidth / 3,
                            height: 196 * ((this.props.deviceWidth / 3) / 520),
                        }}
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
        margin: 15
    },
});