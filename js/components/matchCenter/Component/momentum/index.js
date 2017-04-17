'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import MomentumTracker from '../../../utility/momentumTracker'
import Fixture from '../../../utility/fixture'

class Momentum extends Component {

    constructor(props) {
         super(props)
    }
    
    render() {
        let data=[
                    {
                        line:{cLeft:100,fLeft:50,radius:8},
                        timestamp:['02','04','06','08','10'],
                        leftWindow:[{top:0,width:20},{top:20,width:140},{top:40,width:150},{top:80,width:80},],
                        rightWindow:[{top:60,width:70}],
                        timeMark:'10'
                    },
                    {
                        line:{cLeft:50,fLeft:150,radius:8},
                        timestamp:['12','14','16','18','20'],
                        leftWindow:[{top:0,width:40},{top:20,width:50},],
                        rightWindow:[{top:40,width:150},{top:60,width:70},{top:80,width:80}],
                        timeMark:'20'
                    },
                    {
                        line:{cLeft:150,fLeft:80,radius:8},
                        timestamp:['22','24','26','28','30'],
                        leftWindow:[{top:20,width:140},],
                        rightWindow:[{top:0,width:20},{top:40,width:150},{top:60,width:70},{top:80,width:80}],
                        timeMark:'30'
                    },
                ]
        return (
            <View style={{marginTop:50,marginHorizontal:10,borderRadius:5}}>
                <View style={{paddingVertical:10,borderWidth:1,borderColor:'rgb(216, 217, 218)',margin:5}}>
                    <View style={{flexDirection:'row',paddingLeft:20,alignItems:'center',marginBottom:20}}>
                        <View style={{height:16,width:16,borderRadius:8,backgroundColor:'green',marginTop:5}} />
                        <Text style={{fontFamily: styleVar.fontCondensed,color:'rgb(0,0,0)',marginHorizontal:10}}> SCORE ADVANTAGE</Text>
                        <View style={{height:10,width:50,backgroundColor:styleVar.colorScarlet,marginTop:5}} />
                        <Text style={{fontFamily: styleVar.fontCondensed,color:'rgb(0,0,0)',marginHorizontal:10}}> TEAM MOMENTUM </Text>
                        <ButtonFeedback >
                            <Icon name='ios-information-circle-outline' style={{color: styleVar.colorScarlet,fontSize: 22,lineHeight: 22}} />
                        </ButtonFeedback>
                    </View>

                {
                    data.map((value,index)=>{
                        return (
                            <MomentumTracker key={index} timestamp={value.timestamp} leftWindow={value.leftWindow} rightWindow={value.rightWindow} line={value.line} isFirst={index===0} isLast={index===data.length-1} timeMark={value.timeMark}/>
                            )
                        })
                }
                </View>
            </View>
        )
    }
}

export default connect(null, null)(Momentum)