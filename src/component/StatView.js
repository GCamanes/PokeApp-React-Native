import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

import { StatPartView } from './StatPartView'

import { Dimensions } from 'react-native'
let deviceWidth = Dimensions.get('window').width
const percentWidth = 0.9
const statNameWidth = (deviceWidth * percentWidth) * 0.25;
const statStatWidth = ((deviceWidth * percentWidth) * 0.75) * 0.08;

export class StatView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                ...styles.statView
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
        width: deviceWidth * percentWidth,
        height: deviceWidth * 0.1,
    },
    statName: {
        fontSize: Platform.OS === 'ios' ? 15 : 18,
        fontWeight: 'bold',
        color: 'black'
    },
    statValueView: {
        backgroundColor: 'orange',
        margin: 1
    }
});