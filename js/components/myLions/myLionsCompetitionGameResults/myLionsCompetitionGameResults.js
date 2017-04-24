
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushNewRoute,popToRoute } from '../../../actions/route'
import { Image, Text, View, ScrollView, ListView, ActivityIndicator ,DeviceEventEmitter} from 'react-native'
import { Container, Icon } from 'native-base'
import theme from '../../../themes/base-theme'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LoginRequire from '../../global/loginRequire'
import LionsHeader from '../../global/lionsHeader'
import EYSFooter from '../../global/eySponsoredFooter'
import LionsFooter from '../../global/lionsFooter'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import { strToUpper } from '../../utility/helper'
import { actionsApi } from '../../utility/urlStorage'
import { getAccessToken} from '../../utility/asyncStorageServices'

import Versus from '../components/versus'
import SummaryCardWrapper from '../components/summaryCardWrapper'
import SquadModal from '../../global/squadModal'
import shapes from '../../../themes/shapes'
import loader from '../../../themes/loader-position'
import styles from './styles'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import { service } from '../../utility/services'
import { drillDown ,shareReplace} from '../../../actions/content'
import Data from '../../../../contents/unions/data'
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'
import TeamModel from  '../../../modes/Team'
import {convertTeamToShow} from '../components/teamToShow'
import { setTeamToShow } from '../../../actions/squad'


const locStyle = styleSheetCreate({
    result: {
        backgroundColor: styleVar.colorText,
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 10,
        android: {
            paddingBottom: 20
        }
    },
    resultDrawBg: {
        backgroundColor: 'rgb(208,7,41)'
    },
    resultWonBg: {
        backgroundColor: 'rgb(9, 127, 64)'
    },
    resultWonBgFailure: {
        backgroundColor: 'rgb(38, 38, 38)'
    },
    resultText: {
        color: '#FFF',
        fontSize: 36,
        lineHeight: 36,
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        ios: {
            marginBottom: -7
        }
    },
    backRound:{
        backgroundColor: 'rgb(38,38,38)',
    },
    summary: {
        paddingVertical: 20
    },
    summaryGuther: {
        paddingHorizontal: 20
    },
    summaryRow: {
        //backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 1,
        flex:1
    },
    summaryRowBorder: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgb(128, 127, 131)'
    },
    summaryCol: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1/2
    },
    summaryColRight: {
        borderRightWidth: 1,
        borderColor: 'rgb(128, 127, 131)',
    },

    summaryCircle: {
        width: styleVar.deviceWidth*0.187,
        height: styleVar.deviceWidth*0.187,
        borderRadius: styleVar.deviceWidth*0.0935,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginHorizontal: 15,
        backgroundColor: 'rgb(255, 230, 0)',
    },
    summaryCircleText: {
        color: 'rgb(95, 96, 98)',
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
    summaryTitle: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        color: '#FFF',
        marginTop: 10,
        textAlign:'center'
    },

    summaryTextWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -12,
        flex:3
    },
    summaryText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 21,
        lineHeight: 21,
        color: '#FFF',
        marginTop: 10
    },
    summaryValue: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 44,
        lineHeight: 44,
        color: 'rgb(255, 230, 0)',
        marginTop: 10,
        android: {
            marginBottom: 8
        },
        flex:2,
        textAlign:'center',

    },
    summaryTextSmall: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 18,
        lineHeight: 18,
        color: '#FFF',
        marginTop: 20,
        textAlign: 'center',
    },
    summaryValue2: {
        marginBottom: -5,
        backgroundColor: 'transparent',
        android: {
            marginBottom: 8
        }
    },

    summaryShare:{
        backgroundColor: 'rgb(255, 230, 0)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 24,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
    },
    summaryShareText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        color: 'rgb(95,96,98)',
        paddingTop: 7,
        android: {
            paddingTop: 0
        }
    },
    summaryShareIcon:{
        marginLeft: 5,
        width: 34,
        color: 'rgb(95,96,98)',
        fontSize: 26,
        marginTop: -1,
        android: {
            marginTop: -4
        }
    },
    borderTop: {
        borderColor: styleVar.colorGrey2,
        borderTopWidth: 1,
        paddingTop: 40,
        paddingBottom: 15
    },
    sideCol:{
        flex:2,
        alignItems:'center'
    },
    centerCol:{
        flex:3
    }
})

const Summary = ({data,shareView}) => (
    <View style={locStyle.summary}>
        <View style={locStyle.summaryGuther}>
            <View style={[locStyle.summaryRow, {marginBottom: 20}]}>
                <View style={locStyle.sideCol}>
                    <View style={locStyle.summaryCircle}>
                        <Text style={locStyle.summaryCircleText}>{ data.ai.score || 0 }</Text>
                    </View>
                </View>
                <View style={locStyle.centerCol}>
                    <Text style={locStyle.summaryTitle}>SCORE</Text>
                </View>
                <View style={locStyle.sideCol}>
                    <View style={locStyle.summaryCircle}>
                        <Text style={locStyle.summaryCircleText}>{ data.me.score || 0 }</Text>
                    </View>
                </View>
            </View>
            
            <View style={locStyle.summaryRow}>
                <Text style={locStyle.summaryValue}>{ data.ai.tries || 0 }</Text>
                <View style={locStyle.summaryTextWrapper}>
                    <Text style={locStyle.summaryText}>TRIES</Text>
                </View>
                <Text style={locStyle.summaryValue}>{ data.me.tries || 0 }</Text>
            </View>

            <View style={locStyle.summaryRow}>
                <Text style={locStyle.summaryValue}>{ data.ai.conversions || 0 }</Text>
                <View style={locStyle.summaryTextWrapper}>
                    <Text style={locStyle.summaryText}>CONVERSIONS</Text>
                </View>
                <Text style={locStyle.summaryValue}>{ data.me.conversions || 0 }</Text>
            </View>

            <View style={locStyle.summaryRow}>
                <Text style={locStyle.summaryValue}>{ data.ai.penalties || 0 }</Text>
                <View style={locStyle.summaryTextWrapper}>
                    <Text style={locStyle.summaryText}>PENALTIES</Text>
                </View>
                <Text style={locStyle.summaryValue}>{ data.me.penalties || 0 }</Text>
            </View>

            <View style={locStyle.summaryRow}>
                <Text style={locStyle.summaryValue}>{ data.ai.dropped_goals || 0 }</Text>
                <View style={locStyle.summaryTextWrapper}>
                    <Text style={locStyle.summaryText}>DROP GOALS</Text>
                </View>
                <Text style={locStyle.summaryValue}>{ data.me.dropped_goals || 0 }</Text>
            </View>
        </View>

        <View style={[locStyle.summaryRow, locStyle.summaryRowBorder]}>
            <View style={[locStyle.summaryCol, locStyle.summaryColRight]}>
                <Text style={locStyle.summaryTextSmall}>COMPETITION POINTS</Text>
                <Text style={[locStyle.summaryValue, locStyle.summaryValue2]}>{ data.competition_points || 0 }</Text>
            </View>
            <View style={locStyle.summaryCol}>
                <Text style={locStyle.summaryTextSmall}>BONUS POINTS</Text>
                <Text style={[locStyle.summaryValue, locStyle.summaryValue2]}>{ data.bonus_points || 0 }</Text>
            </View>
        </View>

        <View style={locStyle.summaryGuther}>
            <View style={locStyle.summaryRow2}>
                <ButtonFeedback
                    rounded label='Share'
                    onPress={shareView}
                    style={[styles.button, locStyle.summaryShare]}>
                        <Text style={locStyle.summaryShareText}>SHARE</Text>
                        <Icon name='md-share-alt' style={locStyle.summaryShareIcon} />
                </ButtonFeedback>
            </View>
        </View>
    </View>
)


class MyLionsCompetitionGameResults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            resultInfo: [],
            modalResults: false,
            drillDownItem: this.props.drillDownItem,
            isPop:false
        }
        this.uniondata = Data
    }
    goShare = () => {
        //if (__DEV__)console.log(this.state.rating)
        let data = {
            gameData:this.state.drillDownItem,
            userData:this.props.userProfile,
            teamDatafeed: this.props.teamToShow,
            resultInfo:this.state.resultInfo,
        }
        this.props.drillDownItemShare(data, 'myLionsShareGameResult', false, true)
    }
    popToRoute = () => {
        DeviceEventEmitter.emit('_getList', this.state.drillDownItem.round_id);
        this.setState({
         isPop:true
        })
        this.props.popToRoute('myLionsCompetitionGameListing')
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        back={true}
                        isOnResultPage={true}
                        title='MY LIONS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    
                    <View style={styles.pageTitle}>
                        <Text style={styles.pageTitleText}>RESULTS</Text>
                        <ButtonFeedback 
                            style={styles.pageTitleBtnIconRight} 
                            onPress={() => { this.setState({modalResults: true}) }}>
                            <Icon name='ios-information-circle-outline' style={styles.pageTitleBtnIcon} />
                        </ButtonFeedback>
                    </View>

                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                    {
                        this.state.isLoaded?
                            <View>
                            {
                                strToUpper(this.state.resultInfo.is_draw)==='TRUE'?
                                    <View style={[locStyle.result, locStyle.resultDrawBg]}>
                                        <Text style={locStyle.resultText} >
                                            {strToUpper(this.state.resultInfo.message)}
                                        </Text>
                                    </View>
                                    :
                                    <View>
                                        {
                                            strToUpper(this.state.resultInfo.is_won)==='TRUE'?
                                                <View style={[locStyle.result, locStyle.resultWonBg]}>
                                                    <Text style={locStyle.resultText} >
                                                        {strToUpper(this.state.resultInfo.message.substring(0,this.state.resultInfo.message.indexOf('!')+1))}
                                                    </Text>
                                                    <Text style={locStyle.resultText} >
                                                        {strToUpper(this.state.resultInfo.message.substring(this.state.resultInfo.message.indexOf('!')+1))}
                                                    </Text>
                                                </View>
                                            :
                                                <View style={[locStyle.result,locStyle.resultWonBgFailure]}>
                                                    <Text style={locStyle.resultText} >
                                                        {strToUpper(this.state.resultInfo.message.substring(0,this.state.resultInfo.message.indexOf(',')+1))}
                                                    </Text>
                                                    <Text style={locStyle.resultText} >
                                                        {strToUpper(this.state.resultInfo.message.substring(this.state.resultInfo.message.indexOf(',')+1))}
                                                    </Text>
                                                </View>
                                        }
                                    </View>
                            }
                                <Versus gameData={this.state.drillDownItem} userData={this.props.userProfile} />
                                
                                <View style={styles.guther}>
                                    <SummaryCardWrapper>
                                        <Summary data={this.state.resultInfo} shareView={this.goShare}/>
                                    </SummaryCardWrapper>
                                </View>
                                <View style={[styles.guther, locStyle.borderTop]}>
                                    <ButtonFeedback
                                      rounded
                                      style={[styles.roundButton, {marginBottom: 30},,locStyle.backRound]}
                                      onPress={this.popToRoute}>
                                        <Image resizeMode='contain' source={require('../../../../contents/my-lions/squadLogo.png')}
                                               style={styles.roundButtonImage}>
                                        </Image>
                                        <Text style={styles.roundButtonLabel}>
                                            BACK TO ROUND
                                        </Text>
                                    </ButtonFeedback>
                                    <ButtonFeedback 
                                        rounded 
                                        style={[styles.roundButton, {marginBottom: 30}]}
                                        onPress={() => this.props.popToRoute('myLionsCompetitionCentre')}>
                                        <Icon name='md-analytics' style={styles.roundButtonIcon} />
                                        <Text style={styles.roundButtonLabel}>
                                            COMPETITION CENTRE
                                        </Text>
                                    </ButtonFeedback>
                                </View>
                            </View>
                        :
                            <ActivityIndicator style={loader.centered} size='large' />
                    }
                        <LionsFooter isLoaded={true} />
                    </ScrollView>

                    <SquadModal 
                        modalVisible={this.state.modalResults}
                        callbackParent={() => {}}>
                            <View style={[styles.modalContent]}>
                                <Text style={styles.modalContentTitleText}>RESULTS</Text>
                                <Text style={styles.modalContentText}>The EY analytics engine will take into account your selections and the random factors you have been given to determine the outcome of the match. You can share the result of the match with your friends on social media, or return to the competition centre and prepare for the next match.</Text>
                            </View>
                    </SquadModal>

                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
                </View>
            </Container>
        )
    }

    componentDidMount() {
        if (__DEV__)console.log('!!!!!!MyLionsCompetitionGameResults componentDidMount')
        this.setState({isLoaded:false},()=>{
            if (this.state.drillDownItem&&this.state.drillDownItem.isLiveResult) {
                this.setState({isLoaded: true, resultInfo: this.state.drillDownItem})
            }
            else {
                getAccessToken().then(token=>{
                    let {userProfile} = this.props
                    this.getInfo(token,userProfile)
                })
            }
        })
    }
    componentWillUnmount() {

            setTimeout(() => DeviceEventEmitter.emit('_getList', this.state.drillDownItem.round_id), 600)
        


    }

    getInfo(token,userProfile){
        // console.warn('this.state.drillDownItem',this.state.drillDownItem)
        let optionsInfo = {
            url: actionsApi.eyc3GetHistoricalGameResult,
            data:
             {
                access_token: token,
                id:userProfile.userId,
                first_name:userProfile.firstName,
                last_name:userProfile.lastName,
                round_id:this.state.drillDownItem.round_id,
                game_id:this.state.drillDownItem.game
             },
            onAxiosStart: null,
            onAxiosEnd: null,
            method: 'post',
            channel: 'EYC3',
            isQsStringify:false,
            onSuccess: (res) => {
                if(res.data) {
                    if (__DEV__)console.log('res.data',res.data)
                    this.setState({isLoaded: true, resultInfo: res.data})
                    getSoticFullPlayerList().then((catchedFullPlayerList) => {                        
                        if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                            if (__DEV__)console.log('true')
                            let showTeamFeed=convertTeamToShow(TeamModel.fromJS(res.data.team),catchedFullPlayerList,this.uniondata)
                            this.props.setTeamToShow(showTeamFeed.toJS())
                        }
                    }).catch((error) => {
                                this._showError(error) 
                    })
                }
            },
            onError: ()=>{
                this.setState({isLoaded:true})
            },
            onAuthorization: () => {
                this._signInRequired()
            },
            isRequiredToken: true
        }
        service(optionsInfo)        
    }
}

function bindAction(dispatch) {
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        popToRoute: (route)=>dispatch(popToRoute(route)),
        drillDownItemShare:(data, route, isSub, isPushNewRoute)=>dispatch(shareReplace(data, route, isSub, isPushNewRoute)),
        setTeamToShow:(team)=>dispatch(setTeamToShow(team)),
    }
}

export default connect((state) => {
    return {
        drillDownItem: state.content.drillDownItem,
        isAccessGranted: state.token.isAccessGranted,
        userProfile: state.squad.userProfile,
        netWork: state.network,
        tactics: state.tactics.tacticsData,
        teamToShow: state.squad.teamToShow,
    }
},  bindAction)(MyLionsCompetitionGameResults)