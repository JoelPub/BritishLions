'use strict'

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import { Icon} from 'native-base'

const styles = styleSheetCreate({
    barWrapper:{
        paddingHorizontal:25,
        backgroundColor:'transparent'
    },
    fullBar:{
        height:8,
        backgroundColor:'rgb(128,128,128)',
        borderRadius:4,
        marginTop:16,
        paddingHorizontal:25,
    },
    fullBarR:{
        height:8,
        backgroundColor:'rgb(239,239,240)',
        borderRadius:4,
        marginTop:16,
        paddingHorizontal:25,
    },
    scoreBar:{
        fontSize:32,
        color:'rgb(255,230,0)',
        marginTop:-18
    },
    scoreBarR:{
        fontSize:32,
        color:styleVar.brandPrimary,
        marginTop:-18
    }

})

export default class BarSlider extends Component {
	constructor(props){
		super(props)
	}
    
    render() {
         let scoreBar = this.props.isRed ? styles.scoreBarR : styles.scoreBar
        return (
            <View style={styles.barWrapper}>
                <View style={[styles.fullBar,{width:this.props.fullWidth}]} />
                <Icon name='md-disc' style={[scoreBar,{paddingLeft:this.props.fullWidth*this.props.score/100}]}/>
            </View>
            )
    }
}
