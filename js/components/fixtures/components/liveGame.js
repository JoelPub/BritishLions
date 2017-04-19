'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import ButtonFeedback from '../../utility/buttonFeedback'

const locStyle = styleSheetCreate({ 
    liveBox: {
        backgroundColor: 'transparent'
    },
    liveBoxGuther: {
        padding: 20,
        paddingBottom: 0
    },
    liveBoxTitle: {
        backgroundColor: 'transparent',
    },
    liveBoxTitleText: {
        alignSelf: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: styleVar.colorScarlet,
        backgroundColor: 'transparent',
        textAlign:'center'
    },
    liveBoxDesc: {
        marginBottom: 10,
        fontFamily: styleVar.fontCondensed,
        fontSize: 18,
        lineHeight: 18,
        textAlign: 'center',
        color: styleVar.colorText,
    },

    roundButtonBG: {
        backgroundColor: styleVar.colorGrey,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    roundButton: {
        height: 50,
        backgroundColor: styleVar.colorScarlet,
        flexDirection:'row',
        marginTop: 0,
        marginBottom: 0,
        paddingTop:5,
        android:{
            paddingTop: 0,
        }
    },
    roundButtonIcon: {
        marginBottom: 5,
        color: 'rgb(255,204,40)',
        fontSize:24,
        android:{
            marginBottom: 1,
        }
    },
    roundButtonLabel: {
        backgroundColor: 'transparent',
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop:5,
        marginLeft: 5,
        color: '#FFF'
    },
})

export default class LiveBox extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={locStyle.liveBox}>
                <View style={locStyle.liveBoxGuther}>
                    <View style={locStyle.liveBoxTitle}>
                        <Text style={locStyle.liveBoxTitleText}>
                            GAME NOW LIVE
                        </Text>
                    </View>
                    <Text style={locStyle.liveBoxDesc}>
                        Visit the British & Irish Lions Coach's Box for live match coverage and statistics.
                    </Text> 
                </View>
                <View style={locStyle.roundButtonBG}>
                    <ButtonFeedback 
                        rounded 
                        style={[locStyle.roundButton]}>
                        <Icon name='md-analytics' style={locStyle.roundButtonIcon} />
                        <Text ellipsizeMode='tail' numberOfLines={1} style={locStyle.roundButtonLabel} >
                            COACH'S BOX
                        </Text>
                    </ButtonFeedback>
                </View>
            </View>
        )
    }
}
