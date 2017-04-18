'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from '../utility/buttonFeedback'

const locStyle = styleSheetCreate({ 
    bannerDesc: {
        paddingTop: 7
    },
    infoBox: {
        padding: 20,
        backgroundColor: styleVar.colorGrey,
    },
    // 40% 30% 30%

    liveBox: {
        flexDirection: 'row',
        paddingVertical: 20,
        backgroundColor: styleVar.colorGrey,
    },
    team: {
        width: styleVar.deviceWidth * 0.30,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreWrapper: {
        width: styleVar.deviceWidth * 0.40
    },


    teamtext:{
        fontFamily: styleVar.fontCondensed,
        fontSize: 18,
        lineHeight: 18,
        textAlign: 'center',
        color: styleVar.colorText,
    },

    infoBoxText: {
        marginBottom: 10,
        fontFamily: styleVar.fontCondensed,
        fontSize: 18,
        lineHeight: 18,
        textAlign: 'center',
        color: styleVar.colorText
    },
    circleWrapper: {
        flexDirection: 'row'
    },
    circle: {
        width: styleVar.deviceWidth * 0.16,
        height: styleVar.deviceWidth * 0.16,
        backgroundColor: styleVar.colorScarlet,
        borderRadius: styleVar.deviceWidth * 0.16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
        color: 'rgb(255, 255, 255)',
        fontSize: 26,
        lineHeight: 26,
        textAlign: 'center',
        marginTop: 15,
        android: {
            marginTop: 5
        }
    },
    versus: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex: 1
    },
    versusText: {
        color: styleVar.colorText,
        fontSize: 18,
        lineHeight: 18,
        fontFamily: styleVar.fontCondensed,
        marginTop: 10,
        textAlign: 'center'
    },
    hourTime: {
        backgroundColor: styleVar.colorText,
        borderRadius: 23,
        marginTop: 15,
        paddingTop: 8,
        android: {
            paddingTop: 7,
            paddingBottom: 4
        }
    },
    hourTimeText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
        fontSize: 16,
        lineHeight: 16
    }
})

export default class LiveBox extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={locStyle.liveBox}>
                <View style={locStyle.team}>
                    <View style={locStyle.teamtextWrapper}>
                        <Text style={locStyle.teamtext}>PROVINCIAL BARBARIANS</Text>
                    </View>
                </View>
                <View style={locStyle.scoreWrapper}>
                    <View style={locStyle.circleWrapper}>
                        <View style={locStyle.circle}>
                            <Text style={locStyle.circleText}>15</Text>
                        </View>
                        <View style={locStyle.versus}>
                            <Text style={locStyle.versusText}>vs</Text>
                        </View> 
                        <View style={locStyle.circle}>
                            <Text style={locStyle.circleText}>47</Text>
                        </View>
                    </View>  
                    <View style={locStyle.hourTime}>
                        <Text style={locStyle.hourTimeText}>HT - 00:00</Text>
                    </View>
                </View>
                <View style={locStyle.team}>
                    <View style={locStyle.teamtextWrapper}>
                        <Text style={locStyle.teamtext}>BRITISH & IRISH LIONS</Text>
                    </View>
                </View>
            </View>
        )
    }
}
