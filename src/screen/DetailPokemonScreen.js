import React from 'react';
import { Platform, StyleSheet, Text, View, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native'
import PokemonUtils  from '../utils/PokemonUtils';
import { loadPokemonDetail } from '../store/pokemon.action';

let deviceWidth = Dimensions.get('window').width

export class DetailPokemonScreen extends React.Component {

    static navigationOptions = {
        title: 'Pokemon details'
    }

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            name: 'no name',
            front_default: "https://image.flaticon.com/icons/png/128/190/190420.png",
        }
    }

    componentWillMount() {
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
                        })
                    }
                });
        } else {
            Alert.alert('Error in data loading', 'No internet connection');
        }
    }

    render() {
        return (
            <ScrollView style={styles.scrollview}>
                <View style={styles.pokemonFirstView}>
                    <Image style={styles.pokemonImg}
                        source = {{ uri: this.state.front_default }}    
                    />
                    <Text style={styles.pokemonNameText}>{this.state.name.toUpperCase()}</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollview: {
        flexDirection: 'column',
        width: deviceWidth
    },
    pokemonFirstView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pokemonImg: {
        width: 150,
        height: 150
    },
    pokemonNameText: {
        fontSize: 25,
        margin: 5,
        color: 'black'
    }
});

DetailPokemonScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,

    connectivity: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
    connectivity: state.connect.connectivity,
    pokemonDetail: state.pokemon.pokemonDetail,
    pokemonError: state.pokemon.pokemonError,
});
const mapDispatchToProps = dispatch => ({
    loadPokemonDetail: (index) => dispatch(loadPokemonDetail(index)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailPokemonScreen);