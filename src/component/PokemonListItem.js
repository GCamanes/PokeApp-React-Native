import React from 'react';
import { StyleSheet, Platform, Text, View, Image, Alert } from 'react-native';
import PokemonUtils  from '../utils/PokemonUtils';

export class PokemonListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uri: '',
        }
    }

    componentWillMount() {
        this.setState({
            uri: PokemonUtils.getUriImg(this.props.url),
        })
    }

    navigateToPokemonDetail() {
        this.props.navigation.navigate('DetailPokemon') 
    }

    render() {
        return (
            <View style={styles.pokemonItemView}>
                <Text style={styles.pokemonIndex}>{this.props.index} </Text>
                <Image
                    style={styles.pokemonImg}
                    source={{ uri: this.state.uri }}
                />
                <Text style={styles.pokemonName}>{this.props.name.toUpperCase()}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pokemonItemView: {
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
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
        flex: 1,
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? 14 : 18,
        color: 'black'
    },
    pokemonName: {
        flex: 5,
        marginStart: 10,
        fontSize: Platform.OS === 'ios' ? 14 : 18,
        color: 'black'
    },
    pokemonImg: {
        width: Platform.OS === 'ios' ? 50 : 80,
        height: Platform.OS === 'ios' ? 50 : 80,
    }
});