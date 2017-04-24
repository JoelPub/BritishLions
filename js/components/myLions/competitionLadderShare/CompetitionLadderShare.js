


'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ActivityIndicator,Alert} from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import Swiper from 'react-native-swiper'

import theme from '../../../themes/base-theme'
import styles from './styles'
import shapes from '../../../themes/shapes'
import styleVar from '../../../themes/variable'
import loader from '../../../themes/loader-position'

import LoginRequire from '../../global/loginRequire'
import LionsHeader from '../../global/lionsHeader'
import LionsFooter from '../../global/lionsFooter'
import GrayContainer from '../../global/GrayContainer'
import ExpertRank from  '../../global/ExpertRank'
import RankList from  '../../global/SharerRankList'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImageCircle from '../../utility/imageCircle'
import { alertBox } from '../../utility/alertBox'
import { replaceRoute, pushNewRoute,popRoute } from '../../../actions/route'
import EYSFooter from '../../global/eySponsoredFooter'
import {getUserFullName} from  '../../utility/asyncStorageServices'
import { getAccessToken} from '../../utility/asyncStorageServices'
import {actionsApi} from  '../../utility/urlStorage'
import { service } from '../../utility/services'

import {createGroup,joinGroup,leaveGroup} from  '../../utility/apiasyncstorageservice/eyc3GroupsActions'
import { drillDown } from '../../../actions/content'
import { globalNav } from '../../../appNavigator'
import logo from '../../../../images/logos/british-and-irish-lions.png'

import Share from 'react-native-share'
import RNViewShot from 'react-native-view-shot'


import CreateWithModal from '../createGroup'
import JoinModal from '../joinGroup'
import PlayerScore from '../../global/playerScore'
import fetch from '../../utility/fetch'
import { shareTextWithTitle } from '../../utility/socialShare'
import { setPrivateLeagues} from '../../../actions/squad'

import DataModel from '../competitionLadder/defaultData'

const ShareHeaderView = ({detail}) => (
  <View style={styles.viewShareHeader}>
    <Image resizeMode='contain' style={styles.viewHeaderImage} source={logo} />
  </View>
)
class CompetitionLadderShare extends Component {
  constructor (props) {
    super(props)
    this._scrollView = ScrollView
    this.isUnMounted = false
    this.state = {
      isLoaded: false,
      data: DataModel,
    }
  }
  callback = () => {
    this.setState({
      isSubmitting:false
    })
    this.backNav()
  }
  backNav = () => {
    this.props.popRoute()
  }
  shareSnapshot = (context,callback) => {
    let {userProfile} = this.props
    let rank = userProfile.rank ? userProfile.rank : ''
    this.setState({
      isSubmitting:true
    })
    setTimeout(()=>{
      RNViewShot.takeSnapshot(this.refs['scorecard'] ,{
          format:'png',
          quality: 1,
          result: 'base64'
        })
        .then(
          res => Share.open({
            title:"LionsNZ2017",
            message:"I’m ranked " + rank + "th on the global leaderboard. Download the Official Lions App to get involved! #LionsNZ2017",
            subject:'LionsNZ2017',
            url: `data:image/png;base64,${res}`
          }).then((info)=>{
            callback()
          }).catch((errorMessage)=>{
            // if (__DEV__)console.log("error message: " + error)
            if(errorMessage !== 'undefined' && errorMessage.error !== 'undefined' && errorMessage.error !== 'User did not share'){
              alertBox(
                '',
                'Image is not shared',
                'Dismiss'
              )
            }
            callback()
          })
        )
    })
  }

  render() {
    let { data ,isCreating, createType, isJoining, joinType ,modalData } = this.state
    let {userProfile,drillDownItem} = this.props
    return (
      <Container theme={theme}>
        <View style={styles.container} >
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
            <GrayContainer ref='scorecard' semiCardStyle={styles.semiCardStyle}>
              <ShareHeaderView />
              <ExpertRank data={userProfile}
                          containerStyle={styles.expertContainer}
                          profileNameViewStyle={styles.profileNameView}
                          profileNameTextStyle={styles.profileNameText}
                          profileTitleTextStyle={styles.profileTitleText}
                          profileSubTitleTextStyle={styles.profileSubTitleText}

                          profileRankTextTitleStyle={styles.profileRankTextTitle}
                          profileRankCircleViewStyle={styles.profileRankCircleView}
                          profileSubTextTitleStyle={styles.profileSubTextTitle}
                          userRankStyle={styles.userRankStyle}

              />
              <RankList data={drillDownItem} />
            </GrayContainer>
          </ScrollView>
        </View>
      </Container>
    )
  }
  componentWillUnmount() {
    this.isUnMounted = true
  }
  componentDidMount() {
    setTimeout(()=>{
      this.shareSnapshot('',this.callback)
    },2000)
  }
}


function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),
    replaceRoute:(route)=>dispatch(replaceRoute(route)),
    popRoute:(route)=>dispatch(popRoute(route)),
  }
}
export default connect((state) => {
  return {
    route: state.route,
    userProfile:state.squad.userProfile,
    drillDownItem: state.content.drillDownItem
  }
}, bindAction)(CompetitionLadderShare)
CompetitionLadderShare.defaultProps = {

}
