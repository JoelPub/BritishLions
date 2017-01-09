'use strict'

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

const styles = styleSheetCreate({
    barWrapper: {
        flexDirection:'row',
        flex:1
    },
    progressView: {
        flex: 4,
        marginTop: 5,
        android: {
          marginTop: 10,
        }

    },
    fullBar: {
        height:8,
        backgroundColor:'rgb(128,128,128)',
    },
    scoreBar: {
        height:8,
        backgroundColor:'rgb(255,230,0)',
        borderRadius:4,
        marginTop:-8
    },
    scoreText: {
        fontFamily: styleVar.fontCondensed,
        fontSize:44,
        color:'rgb(255,230,0)',
        marginTop: -8,
        android: {
            marginTop: -15
        }

    }
})

export default class BarGraph extends Component {
	constructor(props){
		super(props)
	}
    
    render() {
        return (
                <View style={styles.barWrapper}>
                    <View style={styles.progressView}>
                        <View style={[styles.fullBar,{width:this.props.fullWidth}]}></View>
                        <View style={[styles.scoreBar,{width:this.props.fullWidth*this.props.score/100}]}></View>
                    </View>
                    <Text style={styles.scoreText}>{this.props.score}</Text>
                </View>
                )
    }
}
