'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import ButtonFeedback from '../../utility/buttonFeedback'
import Countdown from '../../global/countdown'
import PickYourXV from './pickYourXV'
import GamedayTeam from './gamedayTeam'

const borderColor = 'rgb(216, 217, 218)'
const locStyle = styleSheetCreate({ 
    titleBarLink: {
        backgroundColor: styleVar.colorGrey,
        height: 45,
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        borderTopColor: borderColor,
        borderTopWidth: 1,
        paddingRight: 20,
        paddingLeft: 20,
        justifyContent: 'center',
    },
    titleBarLinkText: {
        color: 'rgb(175,0,30)',
        fontSize: 18,
        lineHeight: 18,
        fontFamily: styleVar.fontCondensed,
        textAlign: 'center',
        paddingTop: 9,
        android: {
            paddingTop: 0
        }
    },
    icon:{
        color: 'rgb(175,0,30)',
        fontSize: styleVar.textFontSize,
        android: {
            paddingRight: 5
        }
    },
    pageText: {
        color: styleVar.colorText,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        fontFamily: styleVar.fontGeorgia,
        margin: 20
    }
})

export default class PreGame extends Component {
    constructor(props){
        super(props)
    }

    render() {
        console.log('roy:', this.props)
        return (
            <View>
                <Countdown endDate={`${this.props.data.date} ${this.props.data.time}`}/> 
                <View style={locStyle.titleBarLink}>
                    <ButtonFeedback onPress={this.props.pressAddCalendar}>
                        <Text style={locStyle.titleBarLinkText}>
                            <Icon name='md-calendar' style={locStyle.icon} /> ADD TO CALENDAR
                        </Text>
                    </ButtonFeedback>
                </View>
                <Text style={locStyle.pageText}>{this.props.data.description}</Text>
                
                <PickYourXV onPress={this.props.onPress}/>
                <GamedayTeam />
            </View>
        )
    }
}
