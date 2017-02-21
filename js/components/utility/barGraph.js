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
    fullBarR: {
        height:8,
        backgroundColor:'rgb(239,239,240)',
    },
    scoreBar: {
        height:8,
        backgroundColor:'rgb(255,230,0)',
        borderRadius:4,
        marginTop:-8
    },
    scoreBarR: {
        height:8,
        backgroundColor:styleVar.brandPrimary,
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
    },
    scoreTextR: {
        fontFamily: styleVar.fontCondensed,
        fontSize:44,
        color:styleVar.brandPrimary,
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
        let fullBarStyle = this.props.isRed ? styles.fullBarR : styles.fullBar
        let scoreBar = this.props.isRed ?  styles.scoreBarR :styles.scoreBar
        let scoreText = this.props.isRed ? styles.scoreTextR : styles.scoreText
        return (
                <View style={styles.barWrapper}>
                    <View style={styles.progressView}>
                        <View style={[fullBarStyle,{width:this.props.fullWidth}]}></View>
                        <View style={[scoreBar,{width:this.props.fullWidth*this.props.score/100}]}></View>
                    </View>
                    <Text style={scoreText}>{this.props.score}</Text>
                </View>
                )
    }
}
