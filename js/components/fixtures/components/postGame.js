'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import ButtonFeedback from '../../utility/buttonFeedback'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import TabBar from  './tabBar'

const locStyle = styleSheetCreate({ 
    matchResults: {
        backgroundColor: 'transparent'
    },
    matchResultTitle: {
        backgroundColor: styleVar.colorText,
        paddingTop: 20,
        paddingBottom: 6,
    },
    matchResultTitleText: {
         alignSelf: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: '#FFF',
        backgroundColor: 'transparent',
        textAlign:'center',
        android: {
            paddingBottom: 5
        }
    },
    matchResultGuther: {
        paddingVertical: 25,
        paddingHorizontal: 20
    },
    matchResultRow: {
        //backgroundColor: 'green',
        width: 260,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 1
    },
    centerCol: {
         width: 110,
         //backgroundColor: 'pink'
    },
    sideCol: {
        //backgroundColor: 'violet',
        flex: 1,
        alignItems: 'center'
    },
    matchResultCircle: {
        width: 70,
        height: 70,
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: styleVar.colorScarlet,
    },
    matchResultCircleText: {
        color: '#FFF',
        backgroundColor:'transparent',
        fontSize: 28,
        lineHeight: 28,
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        marginTop: 4,
        android: {
            marginTop: -6
        }
    },
    matchResultCircleTitle: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: styleVar.colorText,
        textAlign:'center',
        marginTop: 15,
        android: {
            marginTop: 6
        }
    },
    matchResultLabelWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'pink',
        padding: 0,
        marginTop: 6,
        width: 120,
        android: {
            marginTop: 0
        }
    },
    matchResultLabel: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 21,
        lineHeight: 21,
        color: styleVar.colorText,
        marginTop: 2,
        android: {
            marginTop: 0
        }
    },
    matchResultValue: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 30,
        lineHeight: 30,
        color: styleVar.colorScarlet,
        marginTop: 10,
        flex: 1,
        textAlign:'center',
        //backgroundColor: 'violet',
        android: {
            marginBottom: 8
        },
    },


    summaryWrapper: {
        paddingVertical: 25,
        paddingHorizontal: 20,
        backgroundColor: styleVar.colorGrey,
        borderBottomWidth: 1,
        borderBottomColor: styleVar.colorGrey2,
        borderTopWidth: 1,
        borderTopColor: styleVar.colorGrey2,
    },
    summaryContent: {
        marginTop: 30
    },
    tabBarUnderlineStyle:{
        backgroundColor: '#FFF'
    },
    logo: {
        flex: 1,
        alignItems: 'center'
    },
    logoIcon: {
        width: 30,
        backgroundColor: 'transparent',
        marginTop: -5,
        android: {
            marginTop: 0
        }
    },

    guther: {
        padding: 20
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
    roundButtonLabel: {
        backgroundColor: 'transparent',
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop:5,
        marginLeft: 7,
        color: '#FFF',
        android: {
            paddingTop: 2,
        }
    },
    roundButtonIcon: {
        marginBottom: 5,
        color: 'rgb(255,204,40)',
        fontSize: 24,
        android:{
            marginTop: 4,
        }
    },
})


const Summary = () => (
    <View style={locStyle.summaryContent}>
        <View style={[locStyle.matchResultRow, {marginBottom: 20}]}>
             <View style={locStyle.logo}>
                <Image resizeMode='contain' source={require('../../../../contents/my-lions/squadLogo.png')}
                                        style={locStyle.logoIcon}/> 
            </View>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}> </Text>
            </View>
            <View style={locStyle.logo}>
                <Image resizeMode='contain' source={require('../../../../contents/my-lions/squadLogo.png')}
                                    style={locStyle.logoIcon}/>
            </View>
        </View>
        <View style={locStyle.matchResultRow}>
            <Text style={locStyle.matchResultValue}>{ 12 }%</Text>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}>POSSESSION</Text>
            </View>
            <Text style={locStyle.matchResultValue}>{ 20 }%</Text>
        </View>

        <View style={locStyle.matchResultRow}>
            <Text style={locStyle.matchResultValue}>{ 10 }</Text>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}>BREAKS</Text>
            </View>
            <Text style={locStyle.matchResultValue}>{ 10 }</Text>
        </View>

        <View style={locStyle.matchResultRow}>
            <Text style={locStyle.matchResultValue}>00</Text>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}>METRES</Text>
            </View>
            <Text style={locStyle.matchResultValue}>00</Text>
        </View>

        <View style={locStyle.matchResultRow}>
            <Text style={locStyle.matchResultValue}>{ 1 }</Text>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}>SCRUMS WON</Text>
            </View>
            <Text style={locStyle.matchResultValue}>{ 1 }</Text>
        </View>

        <View style={locStyle.matchResultRow}>
            <Text style={locStyle.matchResultValue}>{ 2 }</Text>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}>LINE-OUTS WON</Text>
            </View>
            <Text style={locStyle.matchResultValue}>{ 2 }</Text>
        </View>

        <View style={locStyle.matchResultRow}>
            <Text style={locStyle.matchResultValue}>%</Text>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}>PEN/CON.</Text>
            </View>
            <Text style={locStyle.matchResultValue}>%</Text>
        </View>
    </View>
)

export default class PostGame extends Component {
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
                <View style={locStyle.matchResultGuther}>
                    <View style={[locStyle.matchResultRow, {marginBottom: 15}]}>
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

                <View style={locStyle.summaryWrapper}>
                    <ScrollableTabView
                        locked={true}
                        tabBarUnderlineStyle={locStyle.tabBarUnderlineStyle}
                        initialPage={0}
                        renderTabBar={() => <TabBar />}
                        tabBarActiveTextColor={'black'}
                    >
                        <View tabLabel='SUMMARY'>
                            <Summary />
                        </View>
                        <View tabLabel='GAME-DAY TEAM'>
                            <Summary />
                        </View>
                    </ScrollableTabView>
                </View>

                <View style={locStyle.guther}>
                        <ButtonFeedback 
                            rounded 
                            style={[locStyle.roundButton]}>
                            <Icon name='md-analytics' style={locStyle.roundButtonIcon} />
                            <Text ellipsizeMode='tail' numberOfLines={1} style={locStyle.roundButtonLabel} >
                                MATCH CENTRE RESULTS
                            </Text>
                        </ButtonFeedback>
                </View>
            </View>
        )
    }
}
