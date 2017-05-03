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
import LiveBox from '../../../global/liveBox'
import loader from '../../../../themes/loader-position'
import _fetch from '../../../utility/fetch'

class Momentum extends Component {

    constructor(props) {
         super(props)
         // this.state = {
         //      h:styleVar.deviceHeight-270,
              // data:this.props.momentumData,
              // isLoaded:false,
              // isChanged:false
         // }
    }
    // componentWillReceiveProps(nextProps) {
    //     if (__DEV__)console.log('momentum componentWillReceiveProps nextProps.momentumData',nextProps.momentumData)
    //     if (__DEV__)console.log('momentum componentWillReceiveProps this.props.momentumData',this.props.momentumData)
    //     if(nextProps.momentumData.team_momentum) {
        
        //     this.props.setHeight(this.state.h,'momentum')
            
        //     this.setState({isLoaded:false,isChanged:true},()=>{
        //         setTimeout(()=>{
        //             _fetch({url:'https://api.myjson.com/bins/xfpd5'}).then((json)=>{
        //               // if(__DEV__)console.log('json',json)
                        
        //               this.setState({isChanged:true},()=>{
        //                 this.setState({data:this.processMomentumData(json.momentum),isLoaded:true})
        //               })
        //             }).catch((error)=>{
        //             })
        //         },2000)
        //     })
        //     setTimeout(()=>{
        //         _fetch({url:'https://api.myjson.com/bins/9zfuh'}).then((json)=>{
        //           if(__DEV__)console.log('json',json)
        //           this.setState({isChanged:true,data:this.processMomentumData(json.momentum)})
        //         }).catch((error)=>{
        //         })
        //     },5000) 
    //     }
    // }
    // processMomentumData(data){
    //     // if(__DEV__)console.log('processMomentumData')
    //     let result=[]
    //     for(let i=0;i<this.fullTime;i=i+10){
    //         let momentum={score_advantage:[],team_momentum:[],isFirst:false,isLast:false,timeMark:0}
    //         // if(__DEV__)console.log('momentum',momentum)
    //         if(data.team_momentum.findIndex(x=>{
    //             return parseInt(x.time)>i&&parseInt(x.time)<=i+10
    //         })>-1) {
    //             momentum.team_momentum=data.team_momentum.filter(x=>{
    //                 return parseInt(x.time)>i&&parseInt(x.time)<=i+10
    //             })
    //             momentum.score_advantage=data.score_advantage.filter(x=>{
    //                 return parseInt(x.time)===i||parseInt(x.time)===i+10
    //             })
    //             if (i===0) momentum.isFirst=true
    //             if(data.team_momentum.findIndex(x=>{return parseInt(x.time)>i+10&&parseInt(x.time)<=i+20})===-1) momentum.isLast=true
    //             momentum.timeMark=i+10
    //             result.push(momentum)

    //         }
    //         else {
    //             result.push(null)
    //         }
    //     }

    //     // if(__DEV__)console.log('result',result)
    //     return result.reverse()

    // }
    measurePage(page,event) {
        // if (__DEV__)console.log('momentum')
        const { x, y, width, height, } = event.nativeEvent.layout
        // if (__DEV__)console.log('page',page)
        // if (__DEV__)console.log('x',x)
        // if (__DEV__)console.log('y',y)
        // if (__DEV__)console.log('width',width)
        // if (__DEV__)console.log('height',height)
        let h=y+180>styleVar.deviceHeight-345?y+180:styleVar.deviceHeight-345
        this.props.setHeight(h,'momentum')
        // this.setState({h},()=>{
            // if(this.state.isChanged&&this.props.isActive) {
                // this.props.setHeight(this.state.h,'momentum')
                // this.setState({isChanged:false})
            // }
        // })
        
    }
    // componentDidMount(){

    //     this.props.setHeight(this.state.h,'momentum')

    // }
    
    render() {
        return (
                <View style={{marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                    <LiveBox data={{}} />
                    <View style={{paddingVertical:10,borderColor:'rgb(216, 217, 218)',minHeight:styleVar.deviceHeight-270}}>
                        <View style={{flexDirection:'row',paddingLeft:20,alignItems:'center',marginBottom:20}}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <View style={{height:16,width:16,borderRadius:8,backgroundColor:'rgb(9,127,64)',marginTop:5}} />
                                <Text style={{fontFamily: styleVar.fontCondensed,color:'rgb(132,136,139)',marginHorizontal:10}}> SCORE ADVANTAGE</Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <View style={{height:14,width:28,backgroundColor:styleVar.colorScarlet,marginTop:5}} />
                                <Text style={{fontFamily: styleVar.fontCondensed,color:'rgb(132,136,139)',marginHorizontal:10}}> TEAM MOMENTUM </Text>
                                <ButtonFeedback >
                                    <Icon name='ios-information-circle-outline' style={{color: styleVar.colorScarlet,fontSize: 22,lineHeight: 22}} />
                                </ButtonFeedback>
                            </View>
                        </View>
                        <View >
                            {
                                this.props.momentumData.map((value,index)=>{
                                    return (
                                        <View key={index} >
                                            {value!==null?
                                                <MomentumTracker data={value} isHost={false}/>
                                                :
                                                null
                                            }
                                        </View>
                                        )
                                    })
                            }
                            
                            <View onLayout={this.measurePage.bind(this,'momentum')} />
                        </View>
                    </View>
                </View>
        )
    }
}

export default connect(null, null)(Momentum)