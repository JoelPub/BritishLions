'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from '../utility/buttonFeedback'

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
        width: 50,
        height: 50,
        backgroundColor: styleVar.colorScarlet,
        borderRadius: 50,
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
   
    time: {
        backgroundColor: '#FFF',
        width: 90,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40
    },
    timeInverse: {
        borderWidth: 1,
        borderColor: styleVar.colorGrey2,
        marginHorizontal: 15
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
    logo: {

    },
    logoIcon: {
        width: 40,
        height: 40,
        backgroundColor: 'transparent'
    },
})

export default class LiveBox extends Component {
    constructor(props){
        super(props)

        this.state = {
            inverse: true
        }
    }

    render() {
       
        let inverse = this.props.inverse || false
        let styleLiveBox = inverse? [locStyle.liveBox] : [locStyle.liveBox, locStyle.liveBoxInverse]
        let styleTime = inverse? [locStyle.time] : [locStyle.time, locStyle.timeInverse]
        let styleCircle = inverse? [locStyle.circle] : [locStyle.circle, locStyle.circleInverse]

        return (
            <View style={styleLiveBox}>
                {
                    !inverse &&
                        <View style={locStyle.logo}>
                            <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                                style={locStyle.logoIcon}/>
                        </View>
                }
                <View style={styleCircle}>
                    <Text style={locStyle.circleText}>15</Text>
                </View>
                <View style={styleTime}>
                    <Text style={locStyle.timeText}>00:00</Text>
                </View>
                <View style={styleCircle}>
                    <Text style={locStyle.circleText}>47</Text>
                </View>
                {
                    !inverse &&
                        <View style={locStyle.logo}>
                            <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                                style={locStyle.logoIcon}/>
                        </View>
                }
            </View>
        )
    }
}
