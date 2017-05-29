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
        let {isHost,sRadius,dotLen,dotWidth}=config
        let innerHeight=gridHeight*(team_momentum.length||0)
        let outerHeight=finished?isFirst?innerHeight+2*headerHeight:innerHeight+headerHeight:isFirst?innerHeight+headerHeight:innerHeight
        let radius=0
        let cSVal=score_advantage&&score_advantage.length&&score_advantage.length>0&&score_advantage[0].value?parseInt(score_advantage[0].value)*w/50:0
        let cSLeft=(cSVal===0)?w:strToLower(score_advantage[0].advantage_team)===(isHost?'bil':'opposition')?w+cSVal:w-cSVal
        let fSVal=score_advantage&&score_advantage.length&&score_advantage.length>1&&score_advantage[score_advantage.length-1].value?parseInt(score_advantage[score_advantage.length-1].value)*w/50:0
        let fSLeft=(fSVal===0)?w:strToLower(score_advantage[score_advantage.length-1].advantage_team)===(isHost?'bil':'opposition')?w+fSVal:w-fSVal
        let cVal=0
        let cLeft=0
        let fVal=0
        let fLeft=0
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
                                    <View style={{height:gridHeight,left:0,backgroundColor:isHost?'rgb(175,0,30)':'rgb(0,0,0)',width:strToLower(val.advantage_team)===(isHost?'bil':'opposition')?w*(50+parseInt(val.value))/50:w*(50-parseInt(val.value))/50,borderBottomWidth:1,borderColor:'rgb(255,255,255)',position:'absolute',justifyContent:'center'}}>
                                        <Text style={[styles.nodeText,{textAlign:'left',marginLeft:10,}]}>{isHost?val.bilScore:val.oppositionScore}</Text>
                                    </View>
                                    <View style={{height:gridHeight,right:0,backgroundColor:isHost?'rgb(0,0,0)':'rgb(175,0,30)',width:strToLower(val.advantage_team)===(isHost?'opposition':'bil')?w*(50+parseInt(val.value))/50:w*(50-parseInt(val.value))/50,borderBottomWidth:1,borderColor:'rgb(255,255,255)',position:'absolute',justifyContent:'center'}}>
                                        <Text style={[styles.nodeText,{textAlign:'right',marginRight:10,}]}>{isHost?val.oppositionScore:val.bilScore}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                    {
                        score_advantage&&score_advantage.map((val,index)=>{
                            cVal=score_advantage&&score_advantage.length&&score_advantage.length>1&&score_advantage[index].value?parseInt(score_advantage[index].value)*w/50:0
                            cLeft=(cVal===0)?w:strToLower(score_advantage[index].advantage_team)===(isHost?'bil':'opposition')?w+cVal:w-cVal
                            fVal=index+1<score_advantage.length?score_advantage&&score_advantage.length&&score_advantage.length>1&&score_advantage[index+1].value?parseInt(score_advantage[index+1].value)*w/50:0:0
                            fLeft=index+1<score_advantage.length?(fVal===0)?w:strToLower(score_advantage[index+1].advantage_team)===(isHost?'bil':'opposition')?w+fVal:w-fVal:w
        
                            return(
                                <DottedLine key={index} index={index} radius={radius} sRadius={sRadius} cLeft={cLeft-sRadius}  fLeft={fLeft-sRadius} isFirst={isFirst}  h={(integrity&&index===0)?gridHeight+headerHeight:gridHeight} gridHeight={gridHeight} headerHeight={headerHeight} dotLen={dotLen} dotWidth={dotWidth} num={score_advantage.length||0} integrity={integrity}/>
                            )
                        })
                    }
                    {
                        integrity&&<View style={{top:headerHeight/2-sRadius,left:cSLeft-sRadius,width:2*sRadius,height:2*sRadius,borderRadius:sRadius,backgroundColor:'rgb(9,127,64)',position:'absolute',}}/>
                    }
                    {
                        integrity&&isFirst&&<View style={{top:outerHeight-headerHeight,left:fSLeft-sRadius,width:2*sRadius,height:2*sRadius,borderRadius:sRadius,backgroundColor:'rgb(9,127,64)',position:'absolute'}}/>
                    }
                    {
                        finished&&
                            <View style={{width:6,left:w-3,height:headerHeight+1,top:-1,position:'absolute',backgroundColor:'rgb(0,0,0)'}}/>
                    }
                    {
                        isFirst&&
                        <View>
                            <View style={[{height:headerHeight},styles.headerWrapper]}>
                                <Text style={styles.headerText}>{timeMark}MIN</Text>
                                <Text style={styles.headerText}>{timeMark}MIN</Text>
                            </View>
                            <View style={{width:6,left:w-3,height:headerHeight,top:0,position:'absolute',backgroundColor:'rgb(0,0,0)'}}/>
                        </View>

                    }    
                        
                        
                    
                </View>
        )
    }
}
