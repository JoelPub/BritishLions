
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushNewRoute,popToRoute } from '../../../actions/route'
import { Image, Text, View, ScrollView, ListView, ActivityIndicator, Platform } from 'react-native'
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
import { getAccessToken} from '../../utility/asyncStorageServices'
import shapes from '../../../themes/shapes'
import loader from '../../../themes/loader-position'
import styles from './styles'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import { service } from '../../utility/services'
import { drillDown ,shareReplace} from '../../../actions/content'
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'
import { actionsApi } from '../../utility/urlStorage'
import TeamModel from  '../../../modes/Team'
import {convertTeamToShow} from '../components/teamToShow'
import Data from '../../../../contents/unions/data'
import { setTeamToShow } from '../../../actions/squad'


const ShareHeaderView = ({detail}) => {
  let height = 0
  if (styleVar.deviceWidth===320){
    height= styleVar.deviceWidth*0.45 + 20
  }else {
    height= styleVar.deviceWidth*0.45
  }
  return(
    <View style={[styles.viewShareHeader,{height:height}]}>
          <Text style={styles.headerTextBold}> Thank you for submitting your team.</Text>
          <Text style={styles.headerText}>Here's my team selection for the next test!Download the Offical British & Lions app to select and submit your team.</Text>
    </View>
  )}

const  NoteName = ({title,firstName,lastName}) => (
  <View style={styles.posWrapper}>
    <View style={styles.indivPosTitle}>
      <Text style={styles.indivPosTitleText}>{title}</Text>
    </View>
    <View style={styles.posBtn}>
      <View style={styles.playerNameTextWrapper}>
        <View style={styles.titleBox}>
          <Text style={[styles.playerNameText, styles.playerFNameText]} numberOfLines={1}>{firstName}</Text>
          <Text style={styles.playerNameText} numberOfLines={1}>{lastName}</Text>
        </View>
      </View>
    </View>
  </View>
)
const RankNubText = ({num,name,colWidth}) => (
  <View style={[styles.rankNubTextContainer]}>
      <Grid>
        <Col style={{width: Platform.OS === 'android'? colWidth + 1 : colWidth}}>
          <Text style={styles.rankNumber}>{num+'. '}</Text>
        </Col>
        <Col> 
          <Text style={styles.rankPlayerName}>{name}</Text>
        </Col>
      </Grid>
  </View>
)

const  RankingTable = ({title,array}) => {
  console.log(array)
  return(
  <View>
    <View style={styles.rankTitleView}>
      <Text style={styles.indivPosTitleText}>{title}</Text>
    </View>
    <View style={styles.rankNubTextContainer}>
      <View style={styles.nubTextSupContainer}>
        {
          array.map((item,i)=>{
          if(i<8) return(<RankNubText key={i} num={i+1} name={strToUpper(item)} colWidth={13} />)
          })
        }
      </View>
      <View style={styles.nubTextSupContainer}>
        {
          array.map((item,i)=>{
            if(i>=8) return(<RankNubText key={i} num={i+1} name={strToUpper(item)} colWidth={18} />)
          })
        }
      </View>
    </View>
  </View>
)}

class MyLionsTestRoundSubmit extends Component {

    constructor(props) {
        super(props)
        this.state={
            isLoaded: false,
            drillDownItem:this.props.drillDownItem
        }
        this.uniondata = Data
    }
    goShare = () => {
        //console.log(this.state.rating)
        let data = {
            teamDatafeed: this.props.teamToShow,
        }
        this.props.drillDownItemShare(data, 'myLionsShareTestRound', false, true)
    }

    render() {
        let players=[]
        
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        back={true}
                        title='MY LIONS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    
                    

                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        <View style={styles.pageTitle}>
                            <Text style={styles.pageTitleText}>TEAM SUBMITTED</Text>
                        </View>
                        <ShareHeaderView />
                        <View style={styles.smallContainer}>

                            {
                              this.state.isLoaded?
                              <View style={styles.listContainer}>
                              {
                                 
                                  this.props.teamToShow.indivPos.concat(this.props.teamToShow.forwards).concat(this.props.teamToShow.backs).map((value,index)=>{
                                    if (value.info!==null&&value.info.name&&players.indexOf(value.info.name)===-1) players.push(value.info.name) 
                                  })
                              }

                                  <RankingTable title={'TEAM'}  array={players} />
                            
                                  <View style={styles.jobBoxContainer}>
                                  {
                                    this.props.teamToShow.indivPos.map((item,i)=>{
                                      let position = strToUpper(item.position) === 'CAPTAIN'? 'MATCH CAPTAIN' : strToUpper(item.position)
                                      let firstName = item.info!==null?item.info.name.toUpperCase().substring(0, item.info.name.lastIndexOf(" ")):''
                                      let lastName = item.info!==null?item.info.name.toUpperCase().substring(item.info.name.lastIndexOf(" ")+1, item.info.name.length):0
                                      return( <NoteName firstName={firstName} title={position} lastName={lastName} key={i}/>)
                                    })
                                  }
                                  </View>        
                                  <View style={styles.summaryGuther}>
                                          <ButtonFeedback
                                              rounded label='Share'
                                              onPress={this.goShare}
                                              style={[styles.button, styles.summaryShare]}>
                                                  <Text style={styles.summaryShareText}>SHARE</Text>
                                                  <Icon name='md-share-alt' style={styles.summaryShareIcon} />
                                          </ButtonFeedback>
                                  </View>
                                  <View style={styles.footer}>
                                      <Text style={styles.footerText}> Analytics Sponsored by </Text>
                                      <Image source={require('../../../../images/footer/eyLogo.png')}></Image>
                                  </View>
                              </View>
                              :
                              <ActivityIndicator style={loader.centered} size='large' />
                            }
                        </View>
                            
                            
                        <View style={[styles.guther, styles.borderTop]}>
                            <ButtonFeedback 
                                rounded 
                                style={[styles.roundButton, {marginBottom: 30}]}
                                onPress={() => this.props.popToRoute('myLionsCompetitionCentre')}>
                                <Icon name='md-analytics' style={styles.roundButtonIcon} />
                                <Text style={styles.roundButtonLabel}>
                                    COMPETITION CENTRE
                                </Text>
                            </ButtonFeedback>
                            <ButtonFeedback 
                                rounded 
                                style={[styles.roundButton, {marginBottom: 30}]} onPress={() => this.props.pushNewRoute('competitionLadder')}>
                                <Icon name='md-trophy' style={styles.roundButtonIcon} />
                                <Text style={styles.roundButtonLabel}>
                                    LEADERBOARD
                                </Text>
                            </ButtonFeedback>
                        </View>
                        <LionsFooter isLoaded={true} />
                    </ScrollView>

                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
                </View>
            </Container>
        )
    }
    componentDidMount() {
        this._getTeam()
    }
    _getTeam(){
        console.log('_getTeam')
        getSoticFullPlayerList().then((catchedFullPlayerList) => {                        
            if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                console.log('true')
                this.fullPlayerList=catchedFullPlayerList
                let optionsTeam = {
                    url: actionsApi.eyc3GetUserCustomizedSquad,
                    data: { "id":this.props.userProfile.userID,
                            "first_name":this.props.userProfile.firstName,
                            "last_name":this.props.userProfile.lastName,
                            "round_id":this.state.drillDownItem.round_id, 
                            "game_id": 0},
                    onAxiosStart: null,
                    onAxiosEnd: null,
                    method: 'post',
                    onSuccess: (res) => {
                        console.log('res.data',res.data)
                        if(res.data&&(typeof res.data==='object')) {
                            this.setTeam(TeamModel.fromJS(res.data))
                        }
                        else {
                            this.setTeam(TeamModel.fromJS({}))
                        }
                        
                    },
                    isRequiredToken: true,
                    channel: 'EYC3',
                    isQsStringify:false
                }
                service(optionsTeam)
            }
        }).catch((error) => {
                    this._showError(error) 
        })
    }  

    setTeam(team){
        console.log('!!!setTeam',team.toJS())
        let showTeamFeed=convertTeamToShow(team,this.fullPlayerList,this.uniondata)
        console.log('showTeamFeed',showTeamFeed.toJS())
        this.props.setTeamToShow(showTeamFeed.toJS())
        this.setState({ isLoaded: true })
        

    }
}

function bindAction(dispatch) {
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        drillDownItemShare:(data, route, isSub, isPushNewRoute)=>dispatch(shareReplace(data, route, isSub, isPushNewRoute)),
        popToRoute: (route)=>dispatch(popToRoute(route)),
        setTeamToShow:(team)=>dispatch(setTeamToShow(team)),
    }
}

export default connect((state) => {
    return {
        teamToShow: state.squad.teamToShow,
        userProfile: state.squad.userProfile,
        drillDownItem: state.content.drillDownItem,
    }
},  bindAction)(MyLionsTestRoundSubmit)