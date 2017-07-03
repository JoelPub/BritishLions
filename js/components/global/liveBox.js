'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from '../utility/buttonFeedback'
import  { actions  as apiActions } from '../utility/matchApiManger/matchApiManger'
import Timer from './timer'
import { strToLower } from '../utility/helper'

let containerWidth = styleVar.deviceWidth

const locStyle = styleSheetCreate({
    liveBox: {
        flexDirection: 'row',
        paddingVertical: 9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: styleVar.colorText,
    },
    liveBoxInverse: {
        backgroundColor: '#FFF'
    },
    circle: {
        width: styleVar.deviceWidth*0.13,
        height: styleVar.deviceWidth*0.13,
        backgroundColor: styleVar.colorScarlet,
        borderRadius: styleVar.deviceWidth*0.13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleInverse: {
        marginHorizontal: 9
    },
    circleText: {
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
        color: 'rgb(255, 255, 255)',
        fontSize: 28,
        lineHeight: 28,
        textAlign: 'center',
        marginTop: 13,
        android: {
            marginTop: 5
        }
    },
    logoIcon: {
        width: styleVar.deviceWidth*0.1,
        height: styleVar.deviceWidth*0.1,
        backgroundColor: 'transparent'
    },
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

export default class LiveBox extends Component {
    constructor(props){
        super(props)

        this.state = {
            inverse: true,
            game_time:null,
            bil_score:null,
            op_score:null,
            is_full_time:'false',
            is_parse_time:false,
            previous_time:0
        }
        this.seq=0
    }
    callApi = () => {
        if (__DEV__)console.log('call livebox Api(self extract)')
        apiActions.getGameMomentum(this.seq,'time',this.props.data.id,(data)=>{
                    if(__DEV__)console.log('this.state.previous_time1',this.state.previous_time)
                      this.seq++
                    this.setState({
                      game_time: data.game_time,
                      bil_score: data.statics&&data.statics.bil&&data.statics.bil.score,
                      op_score: data.statics&&data.statics.opposition&&data.statics.opposition.score,
                      is_full_time: data.is_full_time,
                      is_parse_time : data.is_ticking === 'false',
                      previous_time : data.game_time
                    },()=>{
                            console.log('this.state.previous_time2',this.state.previous_time)
                            console.log('this.state.game_time',this.state.game_time)
                            console.log('this.state.is_parse_time',this.state.is_parse_time)
                            console.log('this.state.bil_score',this.state.bil_score)
                            console.log('this.state.is_full_time',this.state.is_full_time)
                            if(strToLower(data.is_full_time==='true')) this.timer&&clearTimeout(this.timer)
                          }
                      )
        },(error)=>{
        })
    }
    componentDidMount() {
        //if (__DEV__)
        console.log('livebox componentDidMount',this.props.data)
        if(this.props.data&&!this.props.data.feededData) {
            this.callApi()
            this.timer = setInterval(this.callApi,5000)

        }
        else {
            this.setState({
                      game_time: this.props.data.game_time,
                      bil_score: this.props.data.statics&&this.props.data.statics.bil&&this.props.data.statics.bil.score,
                      op_score: this.props.data.statics&&this.props.data.statics.opposition&&this.props.data.statics.opposition.score,
                      is_full_time: this.props.data.is_full_time,
                      is_parse_time : this.props.data.is_ticking === 'false',
                      previous_time : this.props.data.game_time
                    })
        }
    }
    componentWillReceiveProps(nextProps,nextState) {
        if (__DEV__)console.log('!!!liveBox componentWillReceiveProps')
        // if (__DEV__)console.log('this.props.data',this.props.data)
        if (__DEV__)console.log('nextProps.data.feededData',nextProps.data.feededData)
        if (__DEV__)console.log('nextProps.data.game_time',nextProps.data.game_time)
        if (__DEV__)console.log('nextProps.data.statics',nextProps.data.statics)
        if (__DEV__)console.log('nextProps.data.is_full_time',nextProps.data.is_full_time)
        if(nextProps.data.feededData) {
        if (__DEV__)console.log('update')
            this.setState({
                      game_time: nextProps.data.game_time,
                      bil_score: nextProps.data.statics&&nextProps.data.statics.bil&&nextProps.data.statics.bil.score,
                      op_score: nextProps.data.statics&&nextProps.data.statics.opposition&&nextProps.data.statics.opposition.score,
                      is_full_time: nextProps.data.is_full_time,
                      is_parse_time : nextProps.data.is_ticking === 'false',
                      previous_time : nextProps.data.game_time
                    })
        }
    }
    componentWillUnmount() {
      this.timer&&clearTimeout(this.timer)
    }
    render() {

        let inverse = this.props.inverse || false
        let styleLiveBox = inverse? [locStyle.liveBox] : [locStyle.liveBox, locStyle.liveBoxInverse]
        let styleCircle = inverse? [locStyle.circle] : [locStyle.circle, locStyle.circleInverse]
        let {game_time,bil_score,op_score} = this.state
        // if (__DEV__)console.logconsole.log('this.props.data.opposition_image',this.props.data.opposition_image)
        return (
            <View>
            {
                (game_time!==undefined&&bil_score!==undefined&&op_score!==undefined)&&
                <View style={styleLiveBox}>
                    <View style={{flex:3,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                        {
                            !inverse &&
                                <View style={locStyle.logo}>
                                    <Image resizeMode='contain' source={{uri: this.props.data.opposition_image}}
                                                        style={locStyle.logoIcon}/>
                                </View>
                        }
                        <View style={styleCircle}>
                            <Text style={locStyle.circleText}>{this.state.op_score}</Text>
                        </View>
                    </View>
                    <View style={{flex:2,alignItems:'center'}}>
                    {
                        (this.props.data.live===null||this.state.is_parse_time ===true||strToLower(this.state.is_full_time)==='true')?
                        <View style={locStyle.time}>
                            <Text style={locStyle.timeText}>{this.state.game_time}</Text>
                        </View>
                        :
                        <Timer game_time={this.state.game_time} />
                    }
                    </View>
                    <View style={{flex:3,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                        <View style={styleCircle}>
                            <Text style={locStyle.circleText}>{this.state.bil_score}</Text>
                        </View>
                        {
                            !inverse &&
                                <View style={locStyle.logo}>
                                    <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                                        style={locStyle.logoIcon}/>
                                </View>
                        }
                    </View>
                </View>
            }

                {
                    this.props.data&&this.props.data.hasTitle&&
                    <View style={{height:styleVar.deviceWidth*0.13,backgroundColor:'rgb(0,0,0)',justifyContent:'center'}}>
                        <Text style={{color:'rgb(255,255,255)',fontFamily: styleVar.fontGeorgia,fontSize:14,lineHeight:16,textAlign:'center'}}>
                            {this.props.data.title}
                        </Text>
                    </View>
                }
            </View>
        )
    }
}
