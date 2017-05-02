'use strict'

import React, { Component } from 'react'
import { View,Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import DottedLine from './dottedLine'
import { strToLower } from './helper'
const w=styleVar.deviceWidth*0.48
const h=styleVar.deviceWidth*0.267
const radius=6
const styles = styleSheetCreate({
    trackerWrapper: {
        height:h,
        flexDirection:'row',
        marginHorizontal:styleVar.deviceWidth*0.02,
    },
    column:{
        height:(h-2*radius)*0.2*0.8,
        backgroundColor:styleVar.colorScarlet,
        marginVertical:(h-2*radius)*0.2*0.1,
        position:'absolute'
    }
})

export default class MomentumTracker extends Component {
	constructor(props){
		super(props)
	}
    
    render() {
        let {data,isHost}=this.props
        let {isFirst,isLast,timeMark,score_advantage}=data
        let cLeft=w+score_advantage[score_advantage.length-1].value*(strToLower(score_advantage[score_advantage.length-1].advantage_team)===(isHost?'bil':'opposition')?-1:1)
        let fLeft=isFirst?w:w+score_advantage[0].value*(strToLower(score_advantage[0].advantage_team)===(isHost?'bil':'opposition')?-1:1)

        return (
                <View style={[styles.trackerWrapper,{paddingTop:isLast?radius:0,paddingBottom:isFirst?radius:0,height:isLast&&isFirst?h+2*radius:(isLast||isFirst)?h+radius:h}]}>
                    <View style={[{flex:8,borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderColor:'rgb(216, 217, 218)',paddingVertical:radius},isFirst&&{borderBottomWidth:2}]}>
                        {
                            data.team_momentum&&data.team_momentum.map((val,index)=>{

                                return(
                                    <View key={index}>
                                    {
                                        strToLower(val.advantage_team)===(isHost?'bil':'opposition')?
                                            <View style={[styles.column,{width:val.value,top:(h-2*radius)-(parseInt(val.time)+10-timeMark)*(h-2*radius)/10,right:0,}]} />
                                            :
                                            null
                                    }                                   
                                    </View>
                                    )
                            })
                        }
                        <Text style={{fontFamily:styleVar.fontCondensed,color:'rgb(132,136,139)',fontSize:12,position:'absolute',bottom:0,left:5,backgroundColor:'transparent'}}>{timeMark}</Text>
                    </View>
                    <View style={[{flex:1,borderTopWidth:1,borderColor:'rgb(216, 217, 218)'},isFirst&&{borderBottomWidth:2}]}>
                        {
                            data.team_momentum&&data.team_momentum.map((val,index)=>{

                                return(
                                    <View key={index} style={{ height:(h-2*radius)*0.2*0.8,marginVertical:(h-2*radius)*0.2*0.1,position:'absolute',top:(h-radius)-(parseInt(val.time)+10-timeMark)*(h-2*radius)/10,left:w/32}}>
                                        <Text style={{fontFamily: styleVar.fontCondensed,color:'rgb(0,0,0)',height:(h-2*radius)/5,fontSize:10,textAlign:'center'}}> {val.time} </Text>
                                    </View>
                                    )
                            })
                        }
                    </View>
                    <View style={[{flex:8,borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderColor:'rgb(216, 217, 218)',paddingVertical:radius},isFirst&&{borderBottomWidth:2}]}>
                        {
                            data.team_momentum&&data.team_momentum.map((val,index)=>{

                                return(
                                    <View key={index}>
                                    {
                                         strToLower(val.advantage_team)===(isHost?'opposition':'bil')?
                                            <View style={[styles.column,{width:val.value,top:(h-2*radius)-(parseInt(val.time)+10-timeMark)*(h-2*radius)/10,left:0,}]} />
                                            :
                                            null
                                    }                                   
                                    </View>
                                    )
                            })
                        }
                        <Text style={{fontFamily:styleVar.fontCondensed,color:'rgb(132,136,139)',fontSize:12,position:'absolute',bottom:0,right:5,backgroundColor:'transparent'}}>{timeMark}</Text>
                    </View>

                    <View style={{top:0,left:isLast?cLeft-radius:cLeft,width:2*radius,height:isLast?2*radius:radius,borderTopLeftRadius:isLast?radius:0,borderTopRightRadius:isLast?radius:0,borderBottomLeftRadius:radius,borderBottomRightRadius:radius,backgroundColor:'rgb(9,127,64)',position:'absolute',}}/>
                    <View style={{top:isFirst&&isLast?h-1:isFirst?h-radius-1:h,left:isFirst?fLeft-radius:fLeft,width:2*radius,height:isFirst?2*radius:radius,borderTopLeftRadius:radius,borderTopRightRadius:radius,borderBottomLeftRadius:isFirst?radius:0,borderBottomRightRadius:isFirst?radius:0,backgroundColor:'rgb(9,127,64)',position:'absolute'}}/>
                    <DottedLine radius={radius} cLeft={isLast?cLeft-radius:cLeft}  fLeft={isFirst?fLeft-radius:fLeft} isFirst={isFirst} isLast={isLast}/>
                                   
                </View>
        )
    }
}
