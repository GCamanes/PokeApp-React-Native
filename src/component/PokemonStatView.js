import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatView } from './StatView'

export class PokemonStatView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.pokemonStatView}>
                <StatView 
                    statValue={this.props.pokemon.base_speed}
                    statName="Speed" deviceWidth={this.props.deviceWidth}
                />
                <StatView
                    statValue={this.props.pokemon.base_special_defense}
                    statName="Spe def" deviceWidth={this.props.deviceWidth}
                />
                <StatView
                    statValue={this.props.pokemon.base_special_attack}
                    statName="Spe att" deviceWidth={this.props.deviceWidth}
                />
                <StatView
                    statValue={this.props.pokemon.base_defense}
                    statName="Defense" deviceWidth={this.props.deviceWidth}
                />
                <StatView
                    statValue={this.props.pokemon.base_attack}
                    statName="Attack" deviceWidth={this.props.deviceWidth}
                />
                <StatView
                    statValue={this.props.pokemon.base_hp}
                    statName="HP" deviceWidth={this.props.deviceWidth}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pokemonStatView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
});