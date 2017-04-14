'use strict'

import React, { Component } from 'react'
import { View } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

const styles = styleSheetCreate({
    loader: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 500,
        flex: 1,
        width: styleVar.deviceWidth,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        marginTop: -50
    }
})

export default class DottedLine extends Component {
	constructor(props){
		super(props)
	}
    
    render() {
        let cLeft=100
        let cTop=0
        let fLeft=50
        let fTop=100
        let w=Math.sqrt(Math.pow(cLeft-fLeft,2)+Math.pow(cTop-fTop,2))
        console.log('w',w)
        let t=(cTop+fTop)/2
        let l=(cLeft+fLeft)/2-w/2
        console.log('t',t)
        console.log('l',l)
        let r=360*Math.atan(50/100)/(2*Math.PI)+90+'deg'
        console.log('r',r)
        return (
                <View style={{height:4,width:w,position:'absolute',backgroundColor:'transparent',top:t,left:l,transform:[{rotateZ:r}]}}>
                    <View style={{height:2,width:5,backgroundColor:'yellow',position:'absolute',left:0}} />
                    <View style={{height:2,width:5,backgroundColor:'yellow',position:'absolute',left:10}} />
                    <View style={{height:2,width:5,backgroundColor:'yellow',position:'absolute',left:20}} />
                    <View style={{height:2,width:5,backgroundColor:'yellow',position:'absolute',left:30}} />
                    <View style={{height:2,width:5,backgroundColor:'yellow',position:'absolute',left:40}} />
                    <View style={{height:2,width:5,backgroundColor:'yellow',position:'absolute',left:50}} />
                    <View style={{height:2,width:5,backgroundColor:'yellow',position:'absolute',left:60}} />
                    <View style={{height:2,width:5,backgroundColor:'yellow',position:'absolute',left:70}} />
                    <View style={{height:2,width:5,backgroundColor:'yellow',position:'absolute',left:80}} />
                    <View style={{height:2,width:5,backgroundColor:'yellow',position:'absolute',left:90}} />
                </View>
        )
    }
}
