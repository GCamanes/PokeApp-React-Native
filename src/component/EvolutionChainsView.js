import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { pokeballImg, rightArrowImg } from '../images';

import { Dimensions } from 'react-native'
let deviceWidth = Dimensions.get('window').width

export class EvolutionChainsView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.evolutionsView}>
                {
                    this.props.evolutionChains.map((item, indexChain) =>
                        <View style={styles.evolutionView} key={this.props.pokemon.name + "_evo_" + indexChain}>
                            {
                                item.map((indexEvo, index) =>
                                    <View 
                                        style={styles.evolutionViewPart}
                                        key={this.props.pokemon.name + "_evo_" + indexChain + "_" + indexEvo}>
                                        {
                                            index > 0 && 
                                            <Image
                                                style={styles.arrowImg}
                                                source={rightArrowImg}
                                            />
                                        }
                                        <TouchableOpacity onPress={() => this.props.handleUpdatePokemonIndex(indexEvo)}>
                                            <Image
                                                style={{
                                                    ...styles.pokemonImg,
                                                    margin: 5,
                                                }}
                                                source={
                                                    (this.props.connectivity === 'online') ?
                                                        { uri: this.props.pokemons[indexEvo - 1].front_default }
                                                        :
                                                        pokeballImg
                                                }
                                            />
                                        </TouchableOpacity>
                                    </View>)
                            }
                        </View>
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    evolutionsView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    evolutionView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    evolutionViewPart: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowImg: {
        width: deviceWidth / 20,
        height: deviceWidth / 20
    },
    pokemonImg: {
        width: deviceWidth / 4,
        height: deviceWidth / 4,
    }
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
)(EvolutionChainsView);