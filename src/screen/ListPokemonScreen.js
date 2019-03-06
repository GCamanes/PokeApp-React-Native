import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import {
    View, TouchableHighlight, FlatList, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPokemons } from '../store/pokemon.action';
import { PokemonListItem } from '../component/PokemonListItem'

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
                            Alert.alert('Error PokeApi', 'Api not working')
                        }
                    });
            } else {
                Alert.alert('Error in data loading', 'No internet connection')
            }
        });
    }

    onPressItem = (item) => {
        this.props.navigation.navigate('Detail', {
            index: item.index,
        });
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.pokemons}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <TouchableHighlight onPress={() => this.onPressItem(item)}>
                            <PokemonListItem index={item.index} name={item.name} url={item.url} />
                        </TouchableHighlight>
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
            index: PropTypes.string.isRequired,
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