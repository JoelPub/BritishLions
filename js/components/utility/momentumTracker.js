'use strict'

import React, { Component } from 'react'
import { View,Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import DottedLine from './dottedLine'

const styles = styleSheetCreate({
    trackerWrapper: {
        height:100,
        flexDirection:'row'
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
        let {timestamp,leftWindow,rightWindow,line,isFirst,isLast,timeMark}=this.props

        return (
                <View style={[styles.trackerWrapper,{paddingTop:isFirst?line.radius:0,paddingBottom:isLast?line.radius:0,height:isFirst||isLast?100+line.radius:100}]}>
                    <View style={{flex:8,borderTopWidth:1,borderRightWidth:1,borderColor:'rgb(216, 217, 218)'}}>
                        {
                            leftWindow.map((value,index)=>{
                                return(
                                    <View key={index} style={[styles.column,{width:value.width,top:value.top,right:0,}]} />
                                    )
                            })
                        }
                        <Text style={{fontFamily:styleVar.fontCondensed,color:'rgb(216,217,218)',position:'absolute',bottom:0,left:5}}>{timeMark}</Text>
                    </View>
                    <View style={{flex:1}}>
                        {
                            timestamp.map((value,index)=>{
                                return (
                                <Text key={index} style={{fontFamily: styleVar.fontCondensed,color:'rgb(0,0,0)',height:20}}> {value} </Text>
                                )
                            })
                        }
                    </View>
                    <View style={{flex:8,borderTopWidth:1,borderLeftWidth:1,borderColor:'rgb(216, 217, 218)'}}>
                        {
                            rightWindow.map((value,index)=>{
                                return(
                                    <View key={index} style={[styles.column,{width:value.width,top:value.top,left:0,}]} />
                                    )
                            })
                        }
                        <Text style={{fontFamily:styleVar.fontCondensed,color:'rgb(216,217,218)',position:'absolute',bottom:0,right:5}}>{timeMark}</Text>
                    </View>
                    <View style={{width:2*line.radius,height:isFirst?2*line.radius:line.radius,borderTopLeftRadius:isFirst?line.radius:0,borderTopRightRadius:isFirst?line.radius:0,borderBottomLeftRadius:line.radius,borderBottomRightRadius:line.radius,backgroundColor:'green',position:'absolute',top:0,left:line.cLeft}}/>
                    <View style={{width:2*line.radius,height:isLast?2*line.radius:line.radius,borderTopLeftRadius:line.radius,borderTopRightRadius:line.radius,borderBottomLeftRadius:isLast?line.radius:0,borderBottomRightRadius:isLast?line.radius:0,backgroundColor:'green',position:'absolute',top:isFirst?100:100-line.radius,left:line.fLeft}}/>
                    <DottedLine radius={line.radius} cLeft={line.cLeft}  fLeft={line.fLeft} isFirst={isFirst}/>
                </View>
        )
    }
}
