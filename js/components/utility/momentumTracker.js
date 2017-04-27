'use strict'

import React, { Component } from 'react'
import { View,Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import DottedLine from './dottedLine'
import { strToLower } from './helper'
const styles = styleSheetCreate({
    trackerWrapper: {
        height:styleVar.deviceWidth*0.267,
        flexDirection:'row',
        marginHorizontal:styleVar.deviceWidth*0.02
    },
    column:{
        height:12,
        backgroundColor:styleVar.colorScarlet,
        marginVertical:4,
        position:'absolute'
    }
})

export default class MomentumTracker extends Component {
	constructor(props){
		super(props)
	}
    
    render() {
        let {data,isHost}=this.props
        let isFirst=data.isFirst
        let isLast=data.isLast
        let timeMark=data.timeMark
        let line={radius:8}
        let cLeft=styleVar.deviceWidth*0.48+data.score_advantage[data.score_advantage.length-1].value*(strToLower(data.score_advantage[data.score_advantage.length-1].advantage_team)===(isHost?'bil':'opposition')?-1:1)
        let fLeft=isFirst?styleVar.deviceWidth*0.48:styleVar.deviceWidth*0.48+data.score_advantage[0].value*(strToLower(data.score_advantage[0].advantage_team)===(isHost?'bil':'opposition')?-1:1)

        return (
                <View style={[styles.trackerWrapper,{paddingTop:isLast?line.radius:0,paddingBottom:isFirst?line.radius:0,height:isLast||isFirst?100+line.radius:100}]}>
                    <View style={{flex:8,borderTopWidth:1,borderRightWidth:1,borderColor:'rgb(216, 217, 218)'}}>
                        {
                            data.team_momentum&&data.team_momentum.map((val,index)=>{

                                return(
                                    <View key={index}>
                                    {
                                        strToLower(val.advantage_team)===(isHost?'bil':'opposition')?
                                            <View style={[styles.column,{width:val.value,top:100-10*(parseInt(val.time)+10-timeMark),right:0,}]} />
                                            :
                                            null
                                    }                                   
                                    </View>
                                    )
                            })
                        }
                        <Text style={{fontFamily:styleVar.fontCondensed,color:'rgb(216,217,218)',position:'absolute',bottom:0,left:5}}>{timeMark}</Text>
                    </View>
                    <View style={{flex:1}}>
                        {
                            data.team_momentum&&data.team_momentum.map((val,index)=>{

                                return(
                                    <View key={index} style={{position:'absolute',top:100-10*(parseInt(val.time)+10-timeMark)}}>
                                        <Text style={{fontFamily: styleVar.fontCondensed,color:'rgb(0,0,0)',height:20}}> {val.time} </Text>
                                    </View>
                                    )
                            })
                        }
                    </View>
                    <View style={{flex:8,borderTopWidth:1,borderRightWidth:1,borderColor:'rgb(216, 217, 218)'}}>
                        {
                            data.team_momentum&&data.team_momentum.map((val,index)=>{

                                return(
                                    <View key={index}>
                                    {
                                         strToLower(val.advantage_team)===(isHost?'opposition':'bil')?
                                            <View style={[styles.column,{width:val.value,top:100-10*(parseInt(val.time)+10-timeMark),left:0,}]} />
                                            :
                                            null
                                    }                                   
                                    </View>
                                    )
                            })
                        }
                        <Text style={{fontFamily:styleVar.fontCondensed,color:'rgb(216,217,218)',position:'absolute',bottom:0,right:5}}>{timeMark}</Text>
                    </View>

                    <View style={{top:0,left:cLeft,width:2*line.radius,height:isLast?2*line.radius:line.radius,borderTopLeftRadius:isLast?line.radius:0,borderTopRightRadius:isLast?line.radius:0,borderBottomLeftRadius:line.radius,borderBottomRightRadius:line.radius,backgroundColor:'rgb(9,127,64)',position:'absolute',}}/>
                    <View style={{top:100,left:fLeft,width:2*line.radius,height:isFirst?2*line.radius:line.radius,borderTopLeftRadius:line.radius,borderTopRightRadius:line.radius,borderBottomLeftRadius:isFirst?line.radius:0,borderBottomRightRadius:isFirst?line.radius:0,backgroundColor:'rgb(9,127,64)',position:'absolute'}}/>
                    <DottedLine radius={line.radius} cLeft={cLeft}  fLeft={fLeft} isFirst={isFirst}/>
                                   
                </View>
        )
    }
}
