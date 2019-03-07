import React from 'react';
import {
    Platform, StyleSheet, Text, View, Button,
    Animated, Image, Easing, Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native'
import { loadPokemonDetail } from '../store/pokemon.action';

import { pokeballImg, getTypeImg, weigthImg } from '../images';

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
            type1: 'none',
            type2: 'none',
            weight: 0,
            base_speed: 0,
            base_special_defense: 0,
            base_special_attack: 0,
            base_defense: 0,
            base_attack: 0,
            base_hp: 0,

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
                            index: (this.props.pokemonDetail.id < 10) ? 
                                '00'+this.props.pokemonDetail.id : (this.props.pokemonDetail.id < 100) ? 
                                    '0'+this.props.pokemonDetail.id : this.props.pokemonDetail.id,
                            name: this.props.pokemonDetail.name,

                            type1: (this.props.pokemonDetail.types.length === 2) ?
                                this.props.pokemonDetail.types[1].type.name : this.props.pokemonDetail.types[0].type.name,
                            type2: (this.props.pokemonDetail.types.length === 2) ?
                                this.props.pokemonDetail.types[0].type.name : 'none',
                            weight: this.props.pokemonDetail.weight,
                            base_speed: this.props.pokemonDetail.stats[0].base_stat,
                            base_special_defense: this.props.pokemonDetail.stats[1].base_stat,
                            base_special_attack: this.props.pokemonDetail.stats[2].base_stat,
                            base_defense: this.props.pokemonDetail.stats[3].base_stat,
                            base_attack: this.props.pokemonDetail.stats[4].base_stat,
                            base_hp: this.props.pokemonDetail.stats[5].base_stat,

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
            <View style={{backgroundColor: '#F5FCFF'}}>
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
                            <View style={styles.pokemonShowCaseView}>
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
                            {
                                (this.state.index !== 0) ? 
                                <View>
                                    <View style={styles.pokemonNameIndexView}>
                                        <Text style={styles.pokemonNameText}>
                                            #{this.state.index} -- {this.state.name.toUpperCase()}
                                        </Text>
                                    </View>

                                    <View style={styles.pokemonTypeView}>
                                        <Image style={styles.typeImg} source={getTypeImg(this.state.type1)}/>
                                        {this.state.type2 !== 'none' &&
                                            <Image style={styles.typeImg} source={getTypeImg(this.state.type2)}/>
                                        }
                                    </View>
                                    
                                    <View style={styles.pokemonWeightView}>
                                        <Image style={styles.weightImg} source={weigthImg}/>
                                        <Text style={styles.pokemonNameText}>{this.state.weight}</Text>
                                    </View>
                                    
                                    

                                    <View style={{flex:1, height: 5, backgroundColor: 'gray'}}/>

                                    <Text style={styles.pokemonNameText}>{this.state.base_speed}</Text>
                                    <Text style={styles.pokemonNameText}>{this.state.base_special_defense}</Text>
                                    <Text style={styles.pokemonNameText}>{this.state.base_special_attack}</Text>
                                    <Text style={styles.pokemonNameText}>{this.state.base_defense}</Text>
                                    <Text style={styles.pokemonNameText}>{this.state.base_attack}</Text>
                                    <Text style={styles.pokemonNameText}>{this.state.base_hp}</Text>
                                </View>
                                :
                                < View style={styles.container2} >
                                    <Animated.Image
                                        style={{
                                            ...styles.pokeballImg,
                                            transform: [{ rotate: spin }]
                                        }}
                                        source={pokeballImg}
                                    />
                                </View >
                            }
                            
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

    pokemonShowCaseView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
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
        width: deviceWidth/3,
        height: 196 * ((deviceWidth/3)/520),
        margin: 15
    },
    pokemonWeightView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    weightImg: {
        width: deviceWidth/6,
        height: deviceWidth/6
    },

    container: {
        marginTop: deviceHeight / 3,
        alignItems: 'center'
    },
    container2: {
        marginTop: deviceHeight / 4,
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