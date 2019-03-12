import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export class DetailScreenSubTitleView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ ...styles.titleView, width: this.props.deviceWidth }}>
                <View style={{ ...styles.lineView, width: this.props.deviceWidth * 0.9 }}></View>
                <View style={{ ...styles.titleSubView, width: this.props.deviceWidth  }}>
                    <Image style={{ width: this.props.deviceWidth / 8, height: this.props.deviceWidth / 8 }}
                            source={this.props.titleImg} />
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
                <View style={{ ...styles.lineView, width: this.props.deviceWidth * 0.8 }}></View>
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
    },
    lineView: {
        height: 3,
        backgroundColor: 'black',
        marginTop: 3
    },
    titleSubView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginStart: 20,
        color: 'black'
    },
});