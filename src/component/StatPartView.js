import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { mainBackgroundColor, statColor } from '../colors'

export class StatPartView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                width: this.props.width,
                height: this.props.width,
                backgroundColor: (this.props.statValue >= this.props.minValue) ? statColor : mainBackgroundColor,
                ...styles.statPartView
            }}/>
        );
    }
}

const styles = StyleSheet.create({
    statPartView: {
        margin: 1
    }
});