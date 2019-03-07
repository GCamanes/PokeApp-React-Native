import React from 'react';
import {
    Platform, StyleSheet, Text, View, Button,
    Animated, Image, Easing, Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native'
import PokemonUtils from '../utils/PokemonUtils';
import { loadPokemonDetail } from '../store/pokemon.action';

import { pokeballImg } from '../images';

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
            index: 0,
            name: '...',
            front_default: '',
            front_shiny: '',
            back_default: '',
            back_shiny: '',
            front: true,
            shiny: false,
        }

        this.onPressShinyButton = this.onPressShinyButton.bind(this)
        this.onPressRotateButton = this.onPressRotateButton.bind(this)
    }

    spin() {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }

    componentDidMount() {
        this.spin()

        const { navigation } = this.props;

        if (this.props.connectivity === 'online') {
            this.props.loadPokemonDetail(navigation.getParam('index', 132))
                .then(() => {
                    if (this.props.pokemonError !== undefined) {
                        Alert.alert('Error PokeApi', 'Api not working')
                    } else {
                        this.setState({
                            index: this.props.pokemonDetail.id,
                            name: this.props.pokemonDetail.name,
                            front_default: this.props.pokemonDetail.sprites.front_default,
                            front_shiny: this.props.pokemonDetail.sprites.front_shiny,
                            back_default: this.props.pokemonDetail.sprites.back_default,
                            back_shiny: this.props.pokemonDetail.sprites.back_shiny,
                        })
                    }
                });
        } else {
            Alert.alert('Error in data loading', 'No internet connection');
            this.props.navigation.navigate('List', {});
        }
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

    render() {

        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View>
                {
                    (this.props.pokemonDetailLoading) ?
                        < View style={styles.container} >
                            <Animated.Image
                                style={{
                                    ...styles.pokeballImg,
                                    transform: [{ rotate: spin }]
                                }}
                                source={pokeballImg}
                            />
                        </View >
                    :
                        <ScrollView style={styles.scrollview}>
                            <View style={styles.pokemonFirstView}>
                                <View style={styles.pokemonButtonView}>
                                    <Button style={styles.pokemonButton}
                                        onPress={() => {
                                            this.onPressShinyButton()
                                        }}
                                        title={(this.state.shiny) ? 'Default' : 'Shiny' }
                                    />
                                </View>
                                <Image style={styles.pokemonImg}
                                    source={(this.state.front_default.length === 0) ?
                                        pokeballImg
                                    :
                                        (this.state.front) ?
                                            (this.state.shiny) ?
                                                { uri: this.state.front_shiny }
                                                :
                                                { uri: this.state.front_default }
                                            :
                                            (this.state.shiny) ?
                                                { uri: this.state.back_shiny }
                                                :
                                                { uri: this.state.back_default }
                                    }
                                />
                                <View style={styles.pokemonButtonView}>
                                    <Button
                                        onPress={() => {
                                            this.onPressRotateButton()
                                        }}
                                        title='Rotate'
                                    />
                                </View>
                            </View>
                            <Text style={styles.pokemonNameText}>{this.state.name.toUpperCase()}</Text>
                        </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollview: {
        width: deviceWidth,
    },
    pokemonFirstView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pokemonImg: {
        width: deviceWidth/3,
        height: deviceWidth/3,
        marginStart: 20,
        marginEnd: 20
    },
    pokemonButtonView: {
        flex: 1,
        marginStart: Platform.OS === 'ios' ? 5 : 20,
        marginEnd: Platform.OS === 'ios' ? 5 : 20
    },
    pokemonNameText: {
        fontSize: 25,
        margin: 5,
        color: 'black'
    },
    container: {
        marginTop: deviceHeight / 3,
        alignItems: 'center'
    },
    pokeballImg: {
        width: deviceWidth / 4,
        height: deviceWidth / 4
    },
});

DetailPokemonScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,

    connectivity: PropTypes.string.isRequired,
    pokemonDetailLoading: PropTypes.bool.isRequired,
    pokemonDetailLoaded: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
    connectivity: state.connect.connectivity,
    pokemonDetail: state.pokemon.pokemonDetail,
    pokemonDetailError: state.pokemon.pokemonError,
    pokemonDetailLoading: state.pokemon.pokemonsLoading,
    pokemonDetailLoaded: state.pokemon.pokemonsLoaded,
});
const mapDispatchToProps = dispatch => ({
    loadPokemonDetail: (index) => dispatch(loadPokemonDetail(index)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailPokemonScreen);