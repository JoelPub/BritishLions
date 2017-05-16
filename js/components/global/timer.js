'use strict'

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

let containerWidth = styleVar.deviceWidth

const locStyle = styleSheetCreate({
    time: {
        backgroundColor: '#FFF',
        width: styleVar.deviceWidth*0.24,
        height: styleVar.deviceWidth*0.13,
        borderRadius: styleVar.deviceWidth*0.13,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: styleVar.colorGrey2
    },
    timeText: {
        color: styleVar.colorScarlet,
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
        fontSize: 24,
        lineHeight: 24,
        marginTop: 10,
        android: {
            marginTop: 3
        }
    },
})

export default class Timer extends Component {
    constructor(props){
        super(props)
        // this.state = {
        //     min:'00',
        //     sec:'00'
        // }
        // this.unMounted=false
    }
    // setTimer(type,game_time){
    //     // if (__DEV__)console.log('!!!setTimer',type,game_time)
    //     if(this.unMounted) return
    //     let min=0
    //     let sec=0
    //     if(type==='init'&&game_time!==null) {
    //         if(game_time.split(':')[0]) min=parseInt(game_time.split(':')[0])
    //         if(game_time.split(':')[1]) sec=parseInt(game_time.split(':')[1])+1
    //     }
    //     else {
    //         min=parseInt(this.state.min)
    //         sec=parseInt(this.state.sec)+1
    //     }
    //     if(sec>=60) {
    //         min=min+1
    //         sec=sec-60
    //     }
    //     // if (__DEV__)console.log('!!!min',min)
    //     // if (__DEV__)console.log('!!!sec',sec)
    //     // if (__DEV__)console.log('!!!this.state.min',this.state.min)
    //     // if (__DEV__)console.log('!!!this.state.sec',this.state.sec)
    //     this.setState({min:min<10?`0${min}`:min.toString(),sec:sec<10?`0${sec}`:sec.toString()})
    // }
    // componentWillReceiveProps(nextProps,nextState) {
    //     // if (__DEV__)console.log('!!!Timer componentWillReceiveProps')
    //     // if (__DEV__)console.log('this.props',this.props)
    //     // if (__DEV__)console.log('nextProps',nextProps)
    //     // if (__DEV__)console.log('nextState',nextState)
    //     // if (__DEV__)console.log('this.state',this.state)
    //     // if (__DEV__)console.log('this.props.game_time',this.props.game_time)
    //     // if (__DEV__)console.log('nextProps.game_time',nextProps.game_time)
    //     // if (__DEV__)console.log('this.state.min',this.state.min)
    //     // if (__DEV__)console.log('this.state.sec',this.state.sec)
    //     if(nextProps.game_time!==this.props.game_time) {
    //         this.timer&&clearTimeout(this.timer)
    //         this.setTimer('init',nextProps.game_time)
    //         setTimeout(()=>{
    //             this.timer = setInterval(this.setTimer.bind(this),1000)
    //         },1000)
    //     }
    // }
    // componentWillUnmount() {
    //     // if (__DEV__)console.log('!!!Timer componentWillUnmount')
    //     this.unMounted=true
    //     this.timer&&clearTimeout(this.timer)
    // }
    render() {
        return (
                    <View style={locStyle.time}>
                        <Text style={locStyle.timeText}>{this.props.game_time}</Text>
                    </View>
        )
    }
}
