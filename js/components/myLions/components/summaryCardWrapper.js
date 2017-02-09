'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'

const styles = styleSheetCreate({
    card: {
        marginBottom: 30,
        marginTop: 30,
        backgroundColor: 'rgb(95, 96, 98)',
        borderRadius: 5,
    },
    cardContent: {
         flex: 1
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'rgb(128, 128, 128)',
        height: 50,
        paddingBottom: 9,
        paddingRight: 11,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    footerText: {
        fontFamily: styleVar.fontGeorgia,
        fontSize:13,
        marginRight:5,
        color:'rgb(255, 255, 255)',
    }
})

export default class SummaryCardWrapper extends Component {
	render() {
		return (
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    {this.props.children}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}> Analytics Sponsored by </Text>
                    <Image source={require('../../../../images/footer/eyLogo.png')}></Image>
                </View>
            </View>          
		)
	}
}
