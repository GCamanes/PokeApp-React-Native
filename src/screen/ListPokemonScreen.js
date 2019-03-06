import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import {
    View, StyleSheet, TouchableOpacity, FlatList, Text, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPokemons } from '../store/pokemon.action';
import { PokemonListItem} from '../component/PokemonListItem'

class ListPokemonScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Pokemon list',
    });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                this.props.loadPokemons()
                .then(() => {
                    if (this.props.pokemonsError !== undefined) {
                        Alert.alert('Erreur PokeApi', 'Api inaccessible');
                    }
                });
            } else {
                Alert.alert('Problème lors du chargement des données', 'Pas de connexion internet');
            }
        });
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.pokemons}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <PokemonListItem name={item.name} url={item.url}/>
                    )}
                />
            </View>
        )
    }
}

ListPokemonScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,

    connectivity: PropTypes.string.isRequired,

    pokemons: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    pokemonsError: PropTypes.string,
};
const mapStateToProps = state => ({
    connectivity: state.connect.connectivity,

    pokemons: state.pokemon.pokemons,
    pokemonsError: state.pokemon.pokemonsError,
});
const mapDispatchToProps = dispatch => ({
    loadPokemons: () => dispatch(loadPokemons()),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListPokemonScreen);