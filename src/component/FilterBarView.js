import React from 'react';
import { 
    Dimensions, StyleSheet, View, Image, TouchableOpacity 
} from 'react-native';

import { mainBackgroundColor, statColor } from '../colors'

let deviceWidth = Dimensions.get('window').width

export class FilterBarView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.filterBar}>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    filterBar: {
        height: deviceWidth * 0.2,
        width: deviceWidth,
        backgroundColor: statColor
    },
});