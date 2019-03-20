import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import {
    View, TouchableOpacity, FlatList, Alert,
    Dimensions, StyleSheet,
    Animated, Image, Easing,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPokemons } from '../store/pokemon.action';
import { PokemonListItem } from '../component/PokemonListItem';
import { BottomBarView } from '../component/BottomBarView';
import { pokeballImg } from '../images';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

class ListPokemonScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Pokemon list',
    });

    constructor(props) {
        super(props);

        this.spinValue = new Animated.Value(0)

        this.state = {
            showingListType: "list",
        }

        this.onPressBottomBarItem = this.onPressBottomBarItem.bind(this)
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

    onPressItem = (item) => {
        this.props.navigation.navigate('Detail', {
            index: item.index,
        });
    }

    onPressBottomBarItem(typeList) {
        if (this.state.showingListType != typeList) {
            this.setState({
                showingListType: typeList
            })
        }
    }

    componentDidMount() {

        this.spin()

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

    render() {

        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View style={{justifyContent:'center', alignItems:'center'}}>
                {
                    (this.props.pokemonsLoading) ?
                        <View style={styles.container}>
                            <Animated.Image
                                style={{
                                    ...styles.pokeballImg,
                                    transform: [{ rotate: spin }]
                                }}
                                source={pokeballImg}
                            />
                        </View>
                        :
                        <View>
                            <FlatList
                                data={this.props.pokemons}
                                numColumns={2}
                                keyExtractor={item => item.name}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => this.onPressItem(item)}>
                                        <PokemonListItem pokemon={item}/>
                                    </TouchableOpacity>
                                )}
                            />
                            <BottomBarView showingListType={this.state.showingListType} onPressBottomBarItem={this.onPressBottomBarItem}/>
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: deviceHeight/3,
        alignItems: 'center'
    },
    pokeballImg: {
        width: deviceWidth / 4,
        height: deviceWidth / 4
    },
});

ListPokemonScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,

    connectivity: PropTypes.string.isRequired,

    pokemons: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    pokemonsError: PropTypes.string,
    pokemonsLoading: PropTypes.bool.isRequired,
    pokemonsLoaded: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
    connectivity: state.connect.connectivity,

    pokemons: state.pokemon.pokemons,
    pokemonsError: state.pokemon.pokemonsError,
    pokemonsLoading: state.pokemon.pokemonsLoading,
    pokemonsLoaded: state.pokemon.pokemonsLoaded,
});
const mapDispatchToProps = dispatch => ({
    loadPokemons: () => dispatch(loadPokemons()),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListPokemonScreen);