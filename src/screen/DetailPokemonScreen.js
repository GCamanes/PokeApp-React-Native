import React from 'react';
import {
    Platform, StyleSheet, Text, View, Button,
    Animated, Image, Easing, Alert, TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native'
import { loadPokemonDetail } from '../store/pokemon.action';

import {
    pokeballImg, getTypeImg, weightImg, heightImg,
    rightArrowImg, leftArrowImg, starNotShinyImg, rotateImg
} from '../images';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

export class DetailPokemonScreen extends React.Component {

    static navigationOptions = {
        title: 'Pokemon details'
    }

    constructor(props) {
        super(props);

        this.spinValue = new Animated.Value(0)

        this.state = {
            front: true,
            shiny: false,
            pokemon: {}
        }

        this.onPressShinyButton = this.onPressShinyButton.bind(this)
        this.onPressRotateButton = this.onPressRotateButton.bind(this)
        this.handleUpdatePokemonIndex = this.handleUpdatePokemonIndex.bind(this)
        this.goToTop = this.goToTop.bind(this)
    }

    onPressShinyButton() {
        this.setState({
            shiny: !this.state.shiny
        })
    }

    onPressRotateButton() {
        this.setState({
            front: !this.state.front
        })
    }

    handleUpdatePokemonIndex = (index) => {
        this.goToTop()
        this.setState({
            pokemon: this.props.pokemons[index - 1],
            evolutionChains: this.props.evolutionChains[index - 1],
            front: true,
            shiny: false,
        })
    }

    goToTop = () => {
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.setState({
            pokemon: this.props.pokemons[navigation.getParam('index', {}) - 1],
            evolutionChains: this.props.evolutionChains[navigation.getParam('index', {}) - 1]
        })
    }

    render() {

        return (
            <View style={styles.mainView}>

                <ScrollView style={styles.scrollview} ref={(c) => {this.scroll = c}}>
                    <View style={styles.pokemonShowCaseView}>
                        <View style={styles.pokemonNavigateView}>
                            {
                                (this.state.pokemon.index > 1) &&
                                <TouchableOpacity onPress={() => this.handleUpdatePokemonIndex(this.state.pokemon.index - 1)}>
                                    <Image style={styles.arrowImg}
                                        source={leftArrowImg}
                                    />
                                </TouchableOpacity>
                            }
                        </View>
                        <Image style={styles.pokemonImg}
                            source={
                                (this.props.connectivity === 'online') ?
                                    (this.state.front) ?
                                        (this.state.shiny) ?
                                            { uri: this.state.pokemon.front_shiny }
                                            :
                                            { uri: this.state.pokemon.front_default }
                                        :
                                        (this.state.shiny) ?
                                            { uri: this.state.pokemon.back_shiny }
                                            :
                                            { uri: this.state.pokemon.back_default }
                                    :
                                    pokeballImg
                            }
                        />
                        <View style={styles.pokemonNavigateView}>
                            {
                                (this.state.pokemon.index < 151) &&
                                <TouchableOpacity onPress={() => this.handleUpdatePokemonIndex(this.state.pokemon.index + 1)}>
                                    <Image style={styles.arrowImg}
                                        source={rightArrowImg}
                                    />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => this.onPressShinyButton()}>
                        <Image style={{ height: 100, width: 100 }}
                            source={starNotShinyImg}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPressRotateButton()}>
                        <Image style={{ height: 100, width: 100 }}
                            source={rotateImg}
                        />
                    </TouchableOpacity>

                    <View style={styles.pokemonNameIndexView}>
                        <Text style={styles.pokemonNameText}>
                            #{this.state.pokemon.index_3Digits} -- {this.state.pokemon.name.toUpperCase()}
                        </Text>
                    </View>

                    <View style={styles.pokemonTypeView}>
                        <Image style={styles.typeImg} source={getTypeImg(this.state.pokemon.type1)} />
                        {this.state.pokemon.type2 !== 'none' &&
                            <Image style={styles.typeImg} source={getTypeImg(this.state.pokemon.type2)} />
                        }
                    </View>

                    <View style={styles.pokemonBodyView}>
                        <Image style={styles.bodyImg} source={weightImg} />
                        <Text style={styles.pokemonNameText}>{this.state.pokemon.weight}</Text>
                        <Image style={styles.bodyImg} source={heightImg} />
                        <Text style={styles.pokemonNameText}>{this.state.pokemon.height}</Text>
                    </View>

                    <View style={styles.evolutionsView}>
                        {
                            this.state.evolutionChains.map((item, indexChain) =>
                                <View style={styles.evolutionView} key={this.state.pokemon.name + "_evo_" + indexChain}>
                                    {
                                        item.map((indexEvo, index) =>
                                            <View style={styles.evolutionViewPart} key={this.state.pokemon.name + "_evo_" + indexChain + "_" + indexEvo}>
                                                {index > 0 && <Image style={styles.evolutionArrowImg} source={rightArrowImg} />}
                                                <TouchableOpacity onPress={() => this.handleUpdatePokemonIndex(indexEvo)}>
                                                    <Image style={styles.pokemonEvolutionImg}
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

                    <Text style={styles.pokemonNameText}>{this.state.pokemon.base_speed}</Text>
                    <Text style={styles.pokemonNameText}>{this.state.pokemon.base_special_defense}</Text>
                    <Text style={styles.pokemonNameText}>{this.state.pokemon.base_special_attack}</Text>
                    <Text style={styles.pokemonNameText}>{this.state.pokemon.base_defense}</Text>
                    <Text style={styles.pokemonNameText}>{this.state.pokemon.base_attack}</Text>
                    <Text style={styles.pokemonNameText}>{this.state.pokemon.base_hp}</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainView: {
        backgroundColor: '#F5FCFF'
    },

    scrollview: {
        width: deviceWidth,
        backgroundColor: '#F5FCFF',
    },

    pokemonShowCaseView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pokemonImg: {
        width: deviceWidth / 3,
        height: deviceWidth / 3,
        marginStart: 20,
        marginEnd: 20
    },
    pokemonNavigateView: {
        width: deviceWidth / 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowImg: {
        height: 50,
        width: 50
    },
    pokemonNameText: {
        fontSize: 25,
        margin: 5,
        color: 'black'
    },

    pokemonNameIndexView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pokemonTypeView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeImg: {
        width: deviceWidth / 3,
        height: 196 * ((deviceWidth / 3) / 520),
        margin: 15
    },
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
        margin: 5
    },
    evolutionViewPart: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pokemonEvolutionImg: {
        width: deviceWidth / 4,
        height: deviceWidth / 4,
        margin: 5,
    },
    evolutionArrowImg: {
        width: deviceWidth / 20,
        height: deviceWidth / 20
    },

});

DetailPokemonScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,

    connectivity: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
    connectivity: state.connect.connectivity,
    pokemons: state.pokemon.pokemons,
    evolutionChains: state.pokemon.evolutionChains,
});
const mapDispatchToProps = dispatch => ({

});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailPokemonScreen);