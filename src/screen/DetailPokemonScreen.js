import React from 'react';
import {
    StyleSheet, Text, View,
    Animated,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native'

import {
    dnaImg, identityImg, statImg
} from '../images';

import { mainBackgroundColor } from '../colors'

import { DetailScreenSubTitleView } from '../component/DetailScreenSubTitleView'
import PokemonShowCaseView from '../component/PokemonShowCaseView'
import EvolutionChainsView from '../component/EvolutionChainsView'
import { PokemonTypeView } from '../component/PokemonTypeView'
import { PokemonBodyView } from '../component/PokemonBodyView'
import { InteractionUserView } from '../component/InteractionUserView'
import { PokemonStatView } from '../component/PokemonStatView'

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

export class DetailPokemonScreen extends React.Component {

    static navigationOptions = {
        title: 'Pokemon detail'
    }

    constructor(props) {
        super(props);

        this.spinValue = new Animated.Value(0)

        this.state = {
            front: true,
            shiny: false,
            pokemon: {},
            evolutionChains:[]
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
                    <PokemonShowCaseView
                        pokemon={this.state.pokemon}
                        deviceWidth={deviceWidth}
                        shiny={this.state.shiny}
                        front={this.state.front}
                        handleUpdatePokemonIndex={this.handleUpdatePokemonIndex}
                    />

                    <InteractionUserView
                        deviceWidth={deviceWidth}
                        shiny={this.state.shiny}
                        onPressShinyButton={this.onPressShinyButton}
                        onPressRotateButton={this.onPressRotateButton}
                    />

                    <DetailScreenSubTitleView
                        deviceWidth={deviceWidth}
                        title={'#'+this.state.pokemon.index_3Digits+'  '+this.state.pokemon.name.toUpperCase()}
                        titleImg={identityImg}
                    />

                    <PokemonTypeView
                        deviceWidth={deviceWidth}
                        type1={this.state.pokemon.type1}
                        type2={this.state.pokemon.type2}
                    />
                    <PokemonBodyView
                        deviceWidth={deviceWidth}
                        weight={this.state.pokemon.weight}
                        height={this.state.pokemon.height}
                    />

                    {
                        (this.state.evolutionChains.length > 0) &&
                            <DetailScreenSubTitleView 
                                deviceWidth={deviceWidth}
                                title='Evolution chain'
                                titleImg={dnaImg}
                            />
                    }

                    <EvolutionChainsView
                        pokemon={this.state.pokemon}
                        evolutionChains={this.state.evolutionChains}
                        deviceWidth={deviceWidth}
                        handleUpdatePokemonIndex={this.handleUpdatePokemonIndex}
                    />

                    <DetailScreenSubTitleView 
                        deviceWidth={deviceWidth}
                        title='Base stats'
                        titleImg={statImg}
                    />

                    <PokemonStatView
                        pokemon={this.state.pokemon}
                        deviceWidth={deviceWidth}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainView: {
        backgroundColor: mainBackgroundColor
    },

    scrollview: {
        width: deviceWidth,
        backgroundColor: mainBackgroundColor,
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