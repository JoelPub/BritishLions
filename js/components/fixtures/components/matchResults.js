'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import ButtonFeedback from '../../utility/buttonFeedback'

const locStyle = styleSheetCreate({ 
    matchResults: {
        backgroundColor: 'transparent',
        marginTop: 20 // please remove this
    },
    matchResultTitle: {
        backgroundColor: styleVar.colorGrey,
        marginBottom: 20,
        
    },
    matchResultTitleText: {
        alignSelf: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: styleVar.colorScarlet,
        backgroundColor: 'transparent',
        textAlign:'center',
        marginTop: 15,
        android: {
            marginTop: 15,
            marginBottom: 10
        }
    },
    matchResultRow: {
        backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 1
    },
    
    centerCol: {
         width: 90
    },
    matchResultCircle: {
        width: styleVar.deviceWidth*0.187,
        height: styleVar.deviceWidth*0.187,
        borderRadius: styleVar.deviceWidth*0.0935,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: styleVar.colorScarlet,
    },
    matchResultCircleText: {
        color: '#FFF',
        backgroundColor:'transparent',
        fontSize: 36,
        lineHeight: 36,
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        marginTop: 4,
        android: {
            marginTop: -6
        }
    },
    matchResultCircleTitle: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 30,
        lineHeight: 30,
        color: styleVar.colorText,
        textAlign:'center'
    },
    matchResultLabelWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
        padding: 0,
        marginTop: 10,
        width: 150
    },
    matchResultLabel: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 21,
        lineHeight: 21,
        color: styleVar.colorText
    },
    matchResultValue: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 30,
        lineHeight: 30,
        color: styleVar.colorScarlet,
        marginTop: 10,
        android: {
            marginBottom: 8
        },
        textAlign:'center',
        backgroundColor: 'violet'
    }
})

export default class MatchResults extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={locStyle.matchResults}>
                <View style={locStyle.matchResultTitle}>
                    <Text style={locStyle.matchResultTitleText}>
                        MATCH RESULTS
                    </Text>
                </View>
                <View style={[locStyle.matchResultRow, {marginBottom: 10}]}>
                    <View style={locStyle.sideCol}>
                        <View style={locStyle.matchResultCircle}>
                            <Text style={locStyle.matchResultCircleText}>{ 13}</Text>
                        </View>
                    </View>
                    <View style={locStyle.centerCol}>   
                        <Text style={locStyle.matchResultCircleTitle}>SCORE</Text>
                    </View>
                    <View style={locStyle.sideCol}>
                        <View style={locStyle.matchResultCircle}>
                            <Text style={locStyle.matchResultCircleText}>{ 21 }</Text>
                        </View>
                    </View>
                </View>
                
                <View style={locStyle.matchResultRow}>
                    <Text style={locStyle.matchResultValue}>{ 2 }</Text>
                    <View style={locStyle.matchResultLabelWrapper}>
                        <Text style={locStyle.matchResultLabel}>TRIES</Text>
                    </View>
                    <Text style={locStyle.matchResultValue}>{ 2 }</Text>
                </View>

                <View style={locStyle.matchResultRow}>
                    <Text style={locStyle.matchResultValue}>{ 2 }</Text>
                    <View style={locStyle.matchResultLabelWrapper}>
                        <Text style={locStyle.matchResultLabel}>CONVERSIONS</Text>
                    </View>
                    <Text style={locStyle.matchResultValue}>{ 1 }</Text>
                </View>

                <View style={locStyle.matchResultRow}>
                    <Text style={locStyle.matchResultValue}>{ 3 }</Text>
                    <View style={locStyle.matchResultLabelWrapper}>
                        <Text style={locStyle.matchResultLabel}>PENALTIES</Text>
                    </View>
                    <Text style={locStyle.matchResultValue}>{ 2 }</Text>
                </View>

                <View style={locStyle.matchResultRow}>
                    <Text style={locStyle.matchResultValue}>{ 3 }</Text>
                    <View style={locStyle.matchResultLabelWrapper}>
                        <Text style={locStyle.matchResultLabel}>DROP GOALS</Text>
                    </View>
                    <Text style={locStyle.matchResultValue}>{ 1 }</Text>
                </View>
            </View>
        )
    }
}
