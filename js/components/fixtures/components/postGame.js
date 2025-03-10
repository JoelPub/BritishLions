'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, ActivityIndicator } from 'react-native'
import { pushNewRoute } from '../../../actions/route'
import { drillDown } from '../../../actions/content'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import ButtonFeedback from '../../utility/buttonFeedback'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import TabBar from  './tabBar'
import GamedayTeam from './gamedayTeam'
import GameStatusDetailsModel from  '../../../modes/Fixtures/GameStatus'
import loader from '../../../themes/loader-position'

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
    gamedayTeamTab: {
        paddingTop: 40
    },


    summaryWrapper: {
        paddingVertical: 25,
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
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        marginTop: -5,
        android: {
            marginTop: 0
        }
    },
    logoBigIcon: {
        width: 100,
        height: 100,
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
    pageText: {
        color: styleVar.colorText,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        fontFamily: styleVar.fontGeorgia,
        margin: 20
    }
})


const Summary = ({opposition, bil, oppositionImage}) => (
    <View style={locStyle.summaryContent}>
        <View style={[locStyle.matchResultRow, {marginBottom: 20}]}>
             <View style={locStyle.logo}>
                 <Image resizeMode='contain' source={{uri: oppositionImage}} style={locStyle.logoIcon}/>
            </View>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}> </Text>
            </View>
            <View style={locStyle.logo}>
                <Image resizeMode='contain' source={require('../../../../contents/my-lions/squadLogo.png')}
                                    style={[locStyle.logoIcon, {width: 45, height: 45}]}/>
            </View>
        </View>
        <View style={locStyle.matchResultRow}>
            <Text style={locStyle.matchResultValue}>{ opposition.possession || 0  }%</Text>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}>POSSESSION</Text>
            </View>
            <Text style={locStyle.matchResultValue}>{ bil.possession || 0  }%</Text>
        </View>

        <View style={locStyle.matchResultRow}>
            <Text style={locStyle.matchResultValue}>{ opposition.breaks || 0  }</Text>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}>BREAKS</Text>
            </View>
            <Text style={locStyle.matchResultValue}>{ bil.breaks || 0  }</Text>
        </View>

        <View style={locStyle.matchResultRow}>
            <Text style={locStyle.matchResultValue}>{ opposition.metres || 0  }</Text>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}>METRES</Text>
            </View>
            <Text style={locStyle.matchResultValue}>{ bil.metres || 0  }</Text>
        </View>

        <View style={locStyle.matchResultRow}>
            <Text style={locStyle.matchResultValue}>{ opposition.scrums || 0 }</Text>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}>SCRUMS WON</Text>
            </View>
            <Text style={locStyle.matchResultValue}>{ bil.scrums || 0 }</Text>
        </View>

        <View style={locStyle.matchResultRow}>
            <Text style={locStyle.matchResultValue}>{ opposition.line_outs || 0 }</Text>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}>LINE-OUTS WON</Text>
            </View>
            <Text style={locStyle.matchResultValue}>{ bil.line_outs || 0 }</Text>
        </View>

        <View style={locStyle.matchResultRow}>
            <Text style={locStyle.matchResultValue}>{ opposition.pen_con||0 }%</Text>
            <View style={locStyle.matchResultLabelWrapper}>
                <Text style={locStyle.matchResultLabel}>PEN/CON.</Text>
            </View>
            <Text style={locStyle.matchResultValue}>{ bil.pen_con||0 }%</Text>
        </View>
    </View>
)

class PostGame extends Component {
    constructor(props){
        super(props)
        this.state={
            tabHeight:300,
            page:0,
            isLoaded:true
        }
    }

    _navigateTo(route) {
        let details = this.props.details
        if(__DEV__)console.log("*******************8")
        if(__DEV__)console.log(details)
        this.props.drillDown(details, route)
    }
    measurePage(page,event) {
        const { x, y, width, height, } = event.nativeEvent.layout
        if (__DEV__)console.log('page',page)
        if (__DEV__)console.log('x',x)
        if (__DEV__)console.log('y',y)
        if (__DEV__)console.log('width',width)
        if (__DEV__)console.log('height',height)
        if(page===this.state.page) this.setState({tabHeight:height+150})
        
    }

    render() {
        let fixture = this.props.details
        let postDetails = GameStatusDetailsModel(fixture.post)
        let details = postDetails.toJS()
        let opposition = details.statics.opposition
        let bil = details.statics.bil
        let oppositionImage = fixture.opposition_image
        if(__DEV__)console.log(oppositionImage)
        
        return (
            <View style={locStyle.matchResults}>
                {
                    details.description?
                        <Text style={locStyle.pageText}>{details.description}</Text>
                    :
                        null
                }
                <View style={locStyle.matchResultTitle}>
                    <Text style={locStyle.matchResultTitleText}>
                        MATCH RESULTS
                    </Text>
                </View>
                <View style={locStyle.matchResultGuther}>
                    <View style={[locStyle.matchResultRow, {marginBottom: 15}]}>
                        <View style={locStyle.sideCol}>
                            <Image resizeMode='contain' source={{uri: oppositionImage}} style={locStyle.logoBigIcon}/> 
                        </View>
                        <View style={locStyle.centerCol}>   
                            
                        </View>
                        <View style={locStyle.sideCol}>
                            <Image 
                                resizeMode='contain' 
                                source={require('../../../../contents/my-lions/lions-logo.png')}
                                style={[locStyle.logoBigIcon, {width: 90, height: 90}]}/>
                        </View>
                    </View>

                    <View style={[locStyle.matchResultRow, {marginBottom: 15}]}>
                        <View style={locStyle.sideCol}>
                            <View style={locStyle.matchResultCircle}>
                                <Text style={locStyle.matchResultCircleText}>{ opposition.score || 0 }</Text>
                            </View>
                        </View>
                        <View style={locStyle.centerCol}>   
                            <Text style={locStyle.matchResultCircleTitle}>SCORE</Text>
                        </View>
                        <View style={locStyle.sideCol}>
                            <View style={locStyle.matchResultCircle}>
                                <Text style={locStyle.matchResultCircleText}>{ bil.score || 0 }</Text>
                            </View>
                        </View>
                    </View>
                    <View style={locStyle.matchResultRow}>
                        <Text style={locStyle.matchResultValue}>{ opposition.tries || 0 }</Text>
                        <View style={locStyle.matchResultLabelWrapper}>
                            <Text style={locStyle.matchResultLabel}>TRIES</Text>
                        </View>
                        <Text style={locStyle.matchResultValue}>{ bil.tries || 0 }</Text>
                    </View>

                    <View style={locStyle.matchResultRow}>
                        <Text style={locStyle.matchResultValue}>{ opposition.conversions || 0 }</Text>
                        <View style={locStyle.matchResultLabelWrapper}>
                            <Text style={locStyle.matchResultLabel}>CONVERSIONS</Text>
                        </View>
                        <Text style={locStyle.matchResultValue}>{ bil.conversions || 0 }</Text>
                    </View>

                    <View style={locStyle.matchResultRow}>
                        <Text style={locStyle.matchResultValue}>{ opposition.penalties || 0 }</Text>
                        <View style={locStyle.matchResultLabelWrapper}>
                            <Text style={locStyle.matchResultLabel}>PENALTIES</Text>
                        </View>
                        <Text style={locStyle.matchResultValue}>{ bil.penalties || 0 }</Text>
                    </View>

                    <View style={locStyle.matchResultRow}>
                        <Text style={locStyle.matchResultValue}>{ opposition.dropped_goals || 0 }</Text>
                        <View style={locStyle.matchResultLabelWrapper}>
                            <Text style={locStyle.matchResultLabel}>DROP GOALS</Text>
                        </View>
                        <Text style={locStyle.matchResultValue}>{ bil.dropped_goals || 0 }</Text>
                    </View>
                </View>

                <View style={[locStyle.summaryWrapper,{height:this.state.tabHeight}]}>

                    <ScrollableTabView
                        locked={true}
                        scrollWithoutAnimation={true}
                        tabBarUnderlineStyle={locStyle.tabBarUnderlineStyle}
                        initialPage={this.state.page}
                        renderTabBar={() => <TabBar />}
                        tabBarActiveTextColor={'black'}
                        onChangeTab ={(data)=>
                                this.setState({isLoaded:false},()=>{
                                    setTimeout(()=>{                                   
                                            this.setState({page:data.i},()=>{
                                                this.setState({isLoaded:true})
                                            })
                                    },1000)                                
                                })                          
                        }
                    >
                        
                            <View tabLabel='SUMMARY' onLayout={this.measurePage.bind(this,0)}>
                            {
                                this.state.page===0&&
                                <Summary opposition={opposition} bil={bil} oppositionImage={oppositionImage}/>                                
                            }
                            </View>
                            <View tabLabel='GAME-DAY TEAM' style={locStyle.gamedayTeamTab} onLayout={this.measurePage.bind(this,1)}>
                            {
                                this.state.page===1&&
                                <GamedayTeam gameID={fixture.id} isHideTitle={true} />
                            }
                            </View>
                        
                    </ScrollableTabView>

                    
                </View>

                <View style={locStyle.guther}>
                        <ButtonFeedback 
                            rounded 
                            style={[locStyle.roundButton]}
                            onPress={() => this._navigateTo('matchCenter') }>
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


function bindActions(dispatch) {
    return {
        pushNewRoute: (route)=>dispatch(pushNewRoute(route)),
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}


export default connect(null, bindActions)(PostGame)