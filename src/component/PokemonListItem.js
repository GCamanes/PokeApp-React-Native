import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Alert } from 'react-native';
import { apiUrl } from '../api/APIClient';

export class PokemonListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uri: ''
        }

        this.getUrlLastPart = this.getUrlLastPart.bind(this)
    }

    getUrlLastPart() {
        const start = apiUrl.length
        const end = this.props.url.length - 1
        return this.props.url.substring(start, end)
    }

    componentWillMount() {
        this.setState({
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/'+this.getUrlLastPart()+'.png'
        })
    }

    render() {
        return (
            <TouchableHighlight onPress={() => Alert.alert(this.props.url)}>
                <View style={styles.pokemonItemView}>
                    <Image
                        style={styles.pokemonImg}
                        source={{ uri: this.state.uri }}
                    />
                    <Text style={styles.pokemonName}>{this.props.name.toUpperCase()}</Text>

                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    pokemonItemView: {
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        margin: 5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        borderRadius: 5,
    },
    pokemonName: {
        flex: 1,
        marginStart: 20,
        fontSize: 18,
        color: 'black'
    },
    pokemonImg: {
        width: 80,
        height: 80,
        marginStart: 10
    }
});