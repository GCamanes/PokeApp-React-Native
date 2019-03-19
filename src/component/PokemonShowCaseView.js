import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
    pokeballImg, rightArrowImg, leftArrowImg,
} from '../images';


export class PokemonShowCaseView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.pokemonShowCaseView}>
                <View 
                    style={{
                        ...styles.pokemonNavigateView,
                        width: this.props.deviceWidth / 3,
                    }}
                >
                    {
                        (this.props.pokemon.index > 1) &&
                        <TouchableOpacity onPress={() => this.props.handleUpdatePokemonIndex(this.props.pokemon.index - 1)}>
                            <Image style={styles.arrowImg}
                                source={leftArrowImg}
                            />
                        </TouchableOpacity>
                    }
                </View>
                <Image
                    style={{
                        ...styles.pokemonImg,
                        width: this.props.deviceWidth / 3,
                        height: this.props.deviceWidth / 3,
                    }}
                    source={
                        (this.props.connectivity === 'online') ?
                            (this.props.front) ?
                                (this.props.shiny) ?
                                    { uri: this.props.pokemon.front_shiny }
                                    :
                                    { uri: this.props.pokemon.front_default }
                                :
                                (this.props.shiny) ?
                                    { uri: this.props.pokemon.back_shiny }
                                    :
                                    { uri: this.props.pokemon.back_default }
                            :
                            pokeballImg
                    }
                />
                <View 
                    style={{
                        ...styles.pokemonNavigateView,
                        width: this.props.deviceWidth / 3,
                    }}
                >
                    {
                        (this.props.pokemon.index < 151) &&
                        <TouchableOpacity onPress={() => this.props.handleUpdatePokemonIndex(this.props.pokemon.index + 1)}>
                            <Image style={styles.arrowImg}
                                source={rightArrowImg}
                            />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pokemonShowCaseView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    pokemonNavigateView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pokemonImg: {
        marginStart: 20,
        marginEnd: 20
    },
    arrowImg: {
        height: 50,
        width: 50
    },
    pokemonNameText: {
        fontSize: 25,
        marginStart: 10,
        color: 'black'
    },
});

const mapStateToProps = state => ({
    connectivity: state.connect.connectivity,
    pokemons: state.pokemon.pokemons,
});
const mapDispatchToProps = dispatch => ({

});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PokemonShowCaseView);