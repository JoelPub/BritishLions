'use strict'

import React, { Component } from 'react'
import { View,Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import DottedLine from './dottedLine'
import { strToLower } from './helper'
const w=styleVar.deviceWidth*0.5
const headerHeight=styleVar.deviceWidth*0.08
const gridHeight=styleVar.deviceWidth*0.1
const styles = styleSheetCreate({
    headerWrapper: {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center',
        borderTopWidth:1,
        borderColor:'rgb(216,217,218)',
        ios: {
            paddingTop:5
        }
    },
    headerText: {
        fontFamily: styleVar.fontCondensed,
        color:'rgb(38,38,38)',
        fontSize:18
    },
    nodeText: {
        fontFamily: styleVar.fontCondensed,
        color:'rgb(255,255,255)',
        fontSize:18,
        ios: {
            marginTop:5
        }
    }
})

export default class MomentumTracker extends Component {
	constructor(props){
		super(props)
	}
    
    render() {
        let {data,config}=this.props
        let {isFirst,timeMark,score_advantage,team_momentum,finished,integrity}=data
        let {isHost,radius,dotLen,dotWidth}=config
        let cVal=score_advantage&&score_advantage.length&&score_advantage.length>1&&score_advantage[score_advantage.length-1].value?parseInt(score_advantage[score_advantage.length-1].value)*w/50:0
        let cLeft=(cVal===0)?w:strToLower(score_advantage[score_advantage.length-1].advantage_team)===(isHost?'bil':'opposition')?w-cVal:w+cVal
        let fVal=score_advantage&&score_advantage.length&&score_advantage.length>0&&score_advantage[0].value?parseInt(score_advantage[0].value)*w/50:0
        let fLeft=(fVal===0)?w:strToLower(score_advantage[0].advantage_team)===(isHost?'bil':'opposition')?w-fVal:w+fVal
        let innerHeight=gridHeight*(team_momentum.length||0)
        let outerHeight=finished?innerHeight+headerHeight:innerHeight
        console.log('data',data)
        return (
                
                <View style={{height:outerHeight}}>                    
                    {
                        finished&&
                        <View style={[{height:headerHeight},styles.headerWrapper]}>
                            <Text style={styles.headerText}>{timeMark+10}MIN</Text>
                            <Text style={styles.headerText}>{timeMark+10}MIN</Text>
                        </View>
                    }
                    {
                        team_momentum&&team_momentum.map((val,index)=>{
                            return(
                                <View key={index} style={{flex:1,flexDirection:'row'}}>
                                    <View style={{height:gridHeight,left:0,backgroundColor:isHost?'rgb(175,0,30)':'rgb(0,0,0)',width:strToLower(val.advantage_team)===(isHost?'bil':'oppositon')?w*(50+parseInt(val.value))/50:w*(50-parseInt(val.value))/50,borderBottomWidth:1,borderColor:'rgb(255,255,255)',position:'absolute',justifyContent:'center'}}>
                                        <Text style={[styles.nodeText,{textAlign:'left',marginLeft:10,}]}>{val.time}</Text>
                                    </View>
                                    <View style={{height:gridHeight,right:0,backgroundColor:isHost?'rgb(0,0,0)':'rgb(175,0,30)',width:strToLower(val.advantage_team)===(isHost?'oppositon':'bil')?w*(50+parseInt(val.value))/50:w*(50-parseInt(val.value))/50,borderBottomWidth:1,borderColor:'rgb(255,255,255)',position:'absolute',justifyContent:'center'}}>
                                        <Text style={[styles.nodeText,{textAlign:'right',marginRight:10,}]}>{val.time}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                    {
                        integrity&&<View style={{top:radius-headerHeight,left:cLeft-radius,width:2*radius,height:2*radius,borderRadius:radius,backgroundColor:'rgb(9,127,64)',position:'absolute',}}/>
                    }
                    {
                        integrity&&<View style={isFirst&&{top:outerHeight-radius,left:fLeft-radius,width:2*radius,height:2*radius,borderRadius:radius,backgroundColor:'rgb(9,127,64)',position:'absolute'}}/>
                    }
                    {
                        integrity&&<DottedLine radius={radius} cLeft={cLeft-radius}  fLeft={fLeft-radius} isFirst={isFirst}  h={innerHeight} headerHeight={headerHeight} dotLen={dotLen} dotWidth={dotWidth}/>
                    }
                        
                        
                        
                    
                </View>
        )
    }
}
