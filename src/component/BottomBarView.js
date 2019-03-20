import React from 'react';
import { 
    Dimensions, StyleSheet, View, Image, TouchableOpacity 
} from 'react-native';

import { mainBackgroundColor, statColor } from '../colors'
import { pokemonBallImg, listImg } from '../images'

let deviceWidth = Dimensions.get('window').width

export class BottomBarView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.bottomBar}>
                <View style={styles.bottomBarLine} />

                <View style={styles.bottomBarContent}>
                    <TouchableOpacity onPress={() => this.props.onPressBottomBarItem('list')}>
                        <View style={{
                            ...styles.bottomBarContentItem,
                            backgroundColor: (this.props.showingListType == 'list') ? statColor : mainBackgroundColor
                        }}>
                            
                            <Image
                                style={styles.bottomBarImg}
                                source={listImg}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.onPressBottomBarItem('pokedex')}>
                        <View style={{
                            ...styles.bottomBarContentItem,
                            backgroundColor: (this.props.showingListType == 'pokedex') ? statColor : mainBackgroundColor
                        }}>
                            
                            <Image
                                style={styles.bottomBarImg}
                                source={pokemonBallImg}
                            />
                            
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bottomBar: {
        height: deviceWidth * 0.2,
        width: deviceWidth
    },
    bottomBarLine: {
        flex: 10,
        backgroundColor: statColor
    },
    bottomBarContent: {
        flex: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        backgroundColor: mainBackgroundColor,
    },
    bottomBarContentItem: {
        height: deviceWidth * 0.17,
        width: deviceWidth * 0.49,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: statColor,
        marginStart: 2,
        marginEnd: 2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    bottomBarImg: {
        width: deviceWidth * 0.15,
        height: deviceWidth * 0.15
    }
});