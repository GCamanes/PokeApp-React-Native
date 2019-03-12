import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import {
    starShinyImg, starNotShinyImg,
    rotatePhotoImg,
} from '../images';

export class InteractionUserView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.interactionUserView}>
                <TouchableOpacity onPress={() => this.props.onPressShinyButton()}>
                    <Image
                        style={{
                            width: this.props.deviceWidth / 8,
                            height: this.props.deviceWidth / 8,
                            marginStart: this.props.deviceWidth / 8,
                            marginEnd: this.props.deviceWidth / 8,
                        }}
                        source={(this.props.shiny) ? starShinyImg : starNotShinyImg}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onPressRotateButton()}>
                    <Image
                        style={{
                            width: this.props.deviceWidth / 8,
                            height: this.props.deviceWidth / 8,
                            marginStart: this.props.deviceWidth / 8,
                            marginEnd: this.props.deviceWidth / 8,
                        }}
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
});