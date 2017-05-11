'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from '../utility/buttonFeedback'
import  { actions  as apiActions } from '../utility/matchApiManger/matchApiManger'
import Timer from './timer'

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
})

export default class LiveBox extends Component {
    constructor(props){
        super(props)

        this.state = {
            inverse: true,
            game_time:null,
            bil_score:null,
            op_score:null
        }
    }
    callApi = () => {
        if (__DEV__)console.log('call livebox Api')
        apiActions.getGameMomentum('time',this.props.data.id,(data)=>{
                    this.setState({
                      game_time: data.game_time,
                      bil_score: data.statics&&data.statics.bil&&data.statics.bil.score,
                      op_score: data.statics&&data.statics.opposition&&data.statics.opposition.score
                    })
        },(error)=>{
        })
    }
    componentDidMount() {
        if(this.props.data&&!this.props.data.feededData) {
            if (__DEV__)console.log('livebox componentDidMount',this.props.data)
            this.callApi()
            this.timer = setInterval(this.callApi,30000)

        }
    }
    componentWillReceiveProps(nextProps,nextState) {
        // if (__DEV__)console.log('!!!liveBox componentWillReceiveProps')
        // if (__DEV__)console.log('this.props.data',this.props.data)
        // if (__DEV__)console.log('nextProps.data',nextProps.data)
        if(nextProps.data.feededData) {
            this.setState({
                      game_time: nextProps.data.game_time,
                      bil_score: nextProps.data.statics&&nextProps.data.statics.bil&&nextProps.data.statics.bil.score,
                      op_score: nextProps.data.statics&&nextProps.data.statics.opposition&&nextProps.data.statics.opposition.score
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

        return (
            <View>
                <View style={styleLiveBox}>
                    {
                        !inverse &&
                            <View style={locStyle.logo}>
                                <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                                    style={locStyle.logoIcon}/>
                            </View>
                    }
                    <View style={styleCircle}>
                        <Text style={locStyle.circleText}>{this.state.op_score}</Text>
                    </View>
                    <Timer game_time={this.state.game_time} />
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
