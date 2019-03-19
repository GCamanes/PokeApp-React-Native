import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { StatPartView } from './StatPartView'

const stat_values = []
const stat_colors = []

const percentWidth = 0.9

export class StatView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const statNameWidth = (this.props.deviceWidth * percentWidth) * 0.25;
        const statStatWidth = ((this.props.deviceWidth * percentWidth) * 0.75) * 0.08;

        return (
            <View style={{
                ...styles.statView,
                width: this.props.deviceWidth * percentWidth,
                height: this.props.deviceWidth * 0.1,
            }}>
                <Text style={{
                    ...styles.statName,
                    width: statNameWidth,
                }}>
                    {this.props.statName}
                </Text>

                <StatPartView
                    width={statStatWidth}
                    statValue={this.props.statValue}
                    minValue={0}
                />

                <StatPartView
                    width={statStatWidth}
                    statValue={this.props.statValue}
                    minValue={20}
                />

                <StatPartView
                    width={statStatWidth}
                    statValue={this.props.statValue}
                    minValue={40}
                />

                <StatPartView
                    width={statStatWidth}
                    statValue={this.props.statValue}
                    minValue={60}
                />

                <StatPartView
                    width={statStatWidth}
                    statValue={this.props.statValue}
                    minValue={80}
                />

                <StatPartView
                    width={statStatWidth}
                    statValue={this.props.statValue}
                    minValue={100}
                />
                <StatPartView
                    width={statStatWidth}
                    statValue={this.props.statValue}
                    minValue={120}
                />

                <StatPartView
                    width={statStatWidth}
                    statValue={this.props.statValue}
                    minValue={140}
                />

                <StatPartView
                    width={statStatWidth}
                    statValue={this.props.statValue}
                    minValue={160}
                />

                <StatPartView
                    width={statStatWidth}
                    statValue={this.props.statValue}
                    minValue={180}
                />
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    statValueView: {
        backgroundColor: 'orange',
        margin: 1
    }
});