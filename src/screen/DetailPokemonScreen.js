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
            front: true,
            shiny: false,
            pokemon: {}
        }

        this.onPressShinyButton = this.onPressShinyButton.bind(this)
        this.onPressRotateButton = this.onPressRotateButton.bind(this)
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

    componentWillMount() {
        const { navigation } = this.props;
        this.setState({
            pokemon: navigation.getParam('pokemon', {})
        })
    }

    render() {

        return (
            <View style={{backgroundColor: '#F5FCFF'}}>
                
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
                            source={
                                (this.props.connectivity === 'online')?
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
                        <View style={styles.pokemonButtonView}>
                            <Button
                                onPress={() => {
                                    this.onPressRotateButton()
                                }}
                                title='Rotate'
                            />
                        </View>
                    </View>

                    <View>
                        <View style={styles.pokemonNameIndexView}>
                            <Text style={styles.pokemonNameText}>
                                {this.state.pokemon.index_3Digits} -- {this.state.pokemon.name.toUpperCase()}
                            </Text>
                        </View>

                        <View style={styles.pokemonTypeView}>
                            <Image style={styles.typeImg} source={getTypeImg(this.state.pokemontype1)}/>
                            {this.state.pokemon.type2 !== 'none' &&
                                <Image style={styles.typeImg} source={getTypeImg(this.state.pokemon.type2)}/>
                            }
                        </View>
                        
                        <View style={styles.pokemonWeightView}>
                            <Image style={styles.weightImg} source={weigthImg}/>
                            <Text style={styles.pokemonNameText}>{this.state.pokemon.weight}</Text>
                        </View>
                        
                        

                        <View style={{flex:1, height: 5, backgroundColor: 'gray'}}/>

                        <Text style={styles.pokemonNameText}>{this.state.pokemon.base_speed}</Text>
                        <Text style={styles.pokemonNameText}>{this.state.pokemon.base_special_defense}</Text>
                        <Text style={styles.pokemonNameText}>{this.state.pokemon.base_special_attack}</Text>
                        <Text style={styles.pokemonNameText}>{this.state.pokemon.base_defense}</Text>
                        <Text style={styles.pokemonNameText}>{this.state.pokemon.base_attack}</Text>
                        <Text style={styles.pokemonNameText}>{this.state.pokemon.base_hp}</Text>
                    </View>
                </ScrollView>
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
});

DetailPokemonScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,

    connectivity: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
    connectivity: state.connect.connectivity,
});
const mapDispatchToProps = dispatch => ({

});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailPokemonScreen);