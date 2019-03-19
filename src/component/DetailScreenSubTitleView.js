import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Dimensions } from 'react-native'
let deviceWidth = Dimensions.get('window').width

export class DetailScreenSubTitleView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.titleView}>
                <View style={styles.lineView}></View>
                <View style={styles.titleSubView}>
                    <Image style={styles.titleImg}
                            source={this.props.titleImg} />
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
                <View style={{ ...styles.lineView, width: deviceWidth * 0.8 }}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 10,
        width: deviceWidth
    },
    lineView: {
        height: 3,
        backgroundColor: 'black',
        marginTop: 3,
        width: deviceWidth * 0.9
    },
    titleSubView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth
    },
    titleImg: {
        width: deviceWidth / 8,
        height: deviceWidth / 8
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginStart: 20,
        color: 'black'
    },
});