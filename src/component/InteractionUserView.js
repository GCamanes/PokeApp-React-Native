import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import {
    starShinyImg, starNotShinyImg,
    rotatePhotoImg,
} from '../images';

import { Dimensions } from 'react-native'
let deviceWidth = Dimensions.get('window').width

export class InteractionUserView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.interactionUserView}>
                <TouchableOpacity onPress={() => this.props.onPressShinyButton()}>
                    <Image
                        style={styles.interactionUserImg}
                        source={(this.props.shiny) ? starShinyImg : starNotShinyImg}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onPressRotateButton()}>
                    <Image
                        style={styles.interactionUserImg}
                        source={rotatePhotoImg}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    interactionUserView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    interactionUserImg: {
        width: deviceWidth / 8,
        height: deviceWidth / 8,
        marginStart: deviceWidth / 8,
        marginEnd: deviceWidth / 8,
    }
});