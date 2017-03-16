
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushNewRoute } from '../../../actions/route'
import { Image, Text, View, ScrollView, ListView, ActivityIndicator } from 'react-native'
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
    resultWonBg: {
        backgroundColor: 'rgb(9, 127, 64)'
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
        marginBottom: 1
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
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginHorizontal: 15,
        backgroundColor: 'rgb(255, 230, 0)',
    },
    summaryCircleText: {
        color: 'rgb(95, 96, 98)',
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
        marginTop: 10
    },

    summaryTextWrapper: {
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -12
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
        }
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
    }
})

const Summary = ({data,shareView}) => (
    <View style={locStyle.summary}>
        <View style={locStyle.summaryGuther}>
            <View style={[locStyle.summaryRow, {marginBottom: 20}]}>
                <View style={locStyle.summaryCircle}>
                    <Text style={locStyle.summaryCircleText}>{ data.ai.score || 'N/A' }</Text>
                </View> 
                <View>
                    <Text style={locStyle.summaryTitle}>SCORE</Text>
                </View> 
                <View style={locStyle.summaryCircle}>
                    <Text style={locStyle.summaryCircleText}>{ data.me.score || 'N/A' }</Text>
                </View> 
            </View>
            
            <View style={locStyle.summaryRow}>
                <Text style={locStyle.summaryValue}>{ data.ai.tries || 'N/A' }</Text>
                <View style={locStyle.summaryTextWrapper}>
                    <Text style={locStyle.summaryText}>TRIES</Text>
                </View>
                <Text style={locStyle.summaryValue}>{ data.me.tries || 'N/A' }</Text>
            </View>

            <View style={locStyle.summaryRow}>
                <Text style={locStyle.summaryValue}>{ data.ai.conversions || 'N/A' }</Text>
                <View style={locStyle.summaryTextWrapper}>
                    <Text style={locStyle.summaryText}>CONVERSIONS</Text>
                </View>
                <Text style={locStyle.summaryValue}>{ data.me.conversions || 'N/A' }</Text>
            </View>

            <View style={locStyle.summaryRow}>
                <Text style={locStyle.summaryValue}>{ data.ai.penalties || 'N/A' }</Text>
                <View style={locStyle.summaryTextWrapper}>
                    <Text style={locStyle.summaryText}>PENALTIES</Text>
                </View>
                <Text style={locStyle.summaryValue}>{ data.me.penalties || 'N/A' }</Text>
            </View>
        </View>

        <View style={[locStyle.summaryRow, locStyle.summaryRowBorder]}>
            <View style={[locStyle.summaryCol, locStyle.summaryColRight]}>
                <Text style={locStyle.summaryTextSmall}>COMPETITION POINTS</Text>
                <Text style={[locStyle.summaryValue, locStyle.summaryValue2]}>{ data.competition_points || 'N/A' }</Text>
            </View>
            <View style={locStyle.summaryCol}>
                <Text style={locStyle.summaryTextSmall}>BONUS POINTS</Text>
                <Text style={[locStyle.summaryValue, locStyle.summaryValue2]}>{ data.bonus_points || 'N/A' }</Text>
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
        this.isUnMounted = false
        this.state = {
            isLoaded: false,
            resultInfo: [],
            modalResults: false,
            drillDownItem: this.props.drillDownItem,
        }
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }
    goShare = () => {
        //console.log(this.state.rating)
        let data = {
            gameData:this.state.drillDownItem,
            userData:this.props.userProfile,
            teamDatafeed: this.props.teamToShow,
            resultInfo:this.state.resultInfo,
        }
        this.props.drillDownItemShare(data, 'myLionsShareGameResult', false, true)
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        back={true}
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
                                    this.state.resultInfo.is_won?
                                        <View style={[locStyle.result, locStyle.resultWonBg]}>
                                            <Text style={locStyle.resultText}>
                                                {strToUpper(this.state.resultInfo.message)}
                                            </Text>
                                        </View>
                                    :
                                        <View style={[locStyle.result]}>
                                            <Text style={locStyle.resultText}>
                                                {strToUpper(this.state.resultInfo.message)}
                                            </Text>
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
                                      onPress={() => this.props.pushNewRoute('myLionsOfficialSquad')}>
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
                                        onPress={() => this.props.pushNewRoute('myLionsCompetitionCentre')}>
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
                                <Text style={styles.modalContentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in elit quam. Etiam ullamcorper neque eu lorem elementum, a sagittis sem ullamcorper. Suspendisse ut dui diam.</Text>
                            </View>
                    </SquadModal>

                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
                </View>
            </Container>
        )
    }

    componentWillMount() {
        this.setState({isLoaded:false},()=>{
            getAccessToken().then(token=>{
                this.getInfo(token)
            })
        })
    }

    getInfo(token){
        console.log('getInfo')
        let optionsInfo = {
            url: actionsApi.eyc3GetHistoricalGameResult,
            data:
             {
                access_token: token,
                id : this.props.userProfile.userID,
                round_id:1,
                game_id:3
             },
            onAxiosStart: null,
            onAxiosEnd: null,
            method: 'post',
            channel: 'EYC3',
            isQsStringify:false,
            onSuccess: (res) => {
                if(res.data) {
                    console.log('res.data',res.data)
                    this.setState({isLoaded: true, resultInfo: res.data})
                }

                console.log(this.state.resultInfo)
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
        drillDownItemShare:(data, route, isSub, isPushNewRoute)=>dispatch(shareReplace(data, route, isSub, isPushNewRoute)),
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