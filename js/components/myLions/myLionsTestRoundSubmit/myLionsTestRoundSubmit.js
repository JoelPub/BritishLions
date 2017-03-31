
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushNewRoute } from '../../../actions/route'
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
          <Text style={styles.headerText}>The fans pick XV will be published via  social media before the first test.</Text>
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
    }
    goShare = () => {
        //console.log(this.state.rating)
        let data = {
            teamDatafeed: this.props.teamToShow,
        }
        this.props.drillDownItemShare(data, 'myLionsShareTestRound', false, true)
    }

    render() {
        let { indivPos, forwards, backs } =this.props.teamToShow
        let players=[]
        indivPos.concat(forwards).concat(backs).map((value,index)=>{
          if (value.info!==null&&value.info.name&&players.indexOf(value.info.name)===-1) players.push(value.info.name) 
        })
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

                            <View style={styles.listContainer}>

                                <RankingTable title={'TEAM'}  array={players} />
                          
                                <View style={styles.jobBoxContainer}>
                                {
                                  indivPos.map((item,i)=>{
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
                        </View>
                            
                            
                        <View style={[styles.guther, styles.borderTop]}>
                            <ButtonFeedback 
                                rounded 
                                style={[styles.roundButton, {marginBottom: 30}]}
                                onPress={() => this.props.pushNewRoute('myLionsCompetitionCentre')}>
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
}

function bindAction(dispatch) {
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        drillDownItemShare:(data, route, isSub, isPushNewRoute)=>dispatch(shareReplace(data, route, isSub, isPushNewRoute)),
    }
}

export default connect((state) => {
    return {
        teamToShow: state.squad.teamToShow,
    }
},  bindAction)(MyLionsTestRoundSubmit)