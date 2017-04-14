'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import DottedLine from '../../../utility/dottedLine'

class Momentum extends Component {

    constructor(props) {
         super(props)
    }
    
    render() {
        return (
                <View style={{height:116,borderWidth:1,borderColor:'gray',paddingVertical:8,flex:1,flexDirection:'row'}}>
                    <View style={{flex:8,borderWidth:1,height:100}}>
                        <View style={{width:20,height:16,backgroundColor:'red',marginVertical:2,top:0,right:0,position:'absolute'}}/>
                        <View style={{width:140,height:16,backgroundColor:'red',marginVertical:2,top:20,right:0,position:'absolute'}}/>
                        <View style={{width:150,height:16,backgroundColor:'red',marginVertical:2,top:40,right:0,position:'absolute'}}/>
                        <View style={{width:70,height:16,backgroundColor:'red',marginVertical:2,top:60,right:0,position:'absolute'}}/>
                        <View style={{width:80,height:16,backgroundColor:'red',marginVertical:2,top:80,right:0,position:'absolute'}}/>
                    </View>
                    <View style={{flex:1,borderWidth:1,height:100}}/>
                    <View style={{flex:8,borderWidth:1,height:100}}></View>
                    <View style={{width:16,height:16,borderRadius:8,backgroundColor:'green',position:'absolute',top:0,left:100}}/>
                    <View style={{width:16,height:16,borderRadius:8,backgroundColor:'green',position:'absolute',top:100,left:50}}/>
                    <DottedLine />
                </View>
        )
    }
}

export default connect(null, null)(Momentum)