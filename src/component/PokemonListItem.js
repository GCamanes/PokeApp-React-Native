import React from 'react';
import { StyleSheet, Platform, Text, View, TouchableHighlight, Image, Alert } from 'react-native';
import { apiUrl } from '../api/APIClient';

export class PokemonListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uri: '',
            number: ''
        }

        this.getUriImg = this.getUriImg.bind(this)
        this.getNumber = this.getNumber.bind(this)
    }

    getUriImg() {
        const start = apiUrl.length
        const startNUmber = apiUrl.length + 'pokemon/'.length
        const end = this.props.url.length - 1
        return this.props.url.substring(start, end)
    }

    getNumber() {
        const start = apiUrl.length + 'pokemon/'.length
        const end = this.props.url.length - 1
        return this.props.url.substring(start, end)
    }

    componentWillMount() {
        this.setState({
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/'+this.getUriImg()+'.png',
            number: this.getNumber()
        })
    }

    render() {
        return (
            <TouchableHighlight onPress={() => Alert.alert(this.props.url)}>
                <View style={styles.pokemonItemView}>
                    <Text style={styles.pokemonNumber}>{this.state.number} </Text>
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
    pokemonNumber: {
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