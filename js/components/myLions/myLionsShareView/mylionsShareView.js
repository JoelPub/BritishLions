

'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ActivityIndicator} from 'react-native'
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
import ImagePlaceholder from '../../utility/imagePlaceholder'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImageCircle from '../../utility/imageCircle'
import { replaceRoute, pushNewRoute,popToRoute ,popRoute} from '../../../actions/route'
import EYSFooter from '../../global/eySponsoredFooter'
import logo from '../../../../images/logos/british-and-irish-lions.png'
import BarSlider from '../../utility/barSlider'
import BarGraph from '../../utility/barGraph'

import Share from 'react-native-share'
import RNViewShot from 'react-native-view-shot'

import { drillDown } from '../../../actions/content'
import { globalNav } from '../../../appNavigator'

const ShareHeaderView = ({detail}) => (
  <View style={styles.viewShareHeader}>
    <Image style={styles.viewHeaderImage} source={logo} />
  </View>
)
const  NoteName = ({title,firstName,lastName}) => (
  <View style={styles.posWrapper}>
    <View style={styles.indivPosTitle}>
      <Text style={styles.indivPosTitleText}>{title}</Text>
    </View>
    <View style={styles.posBtn}>
      <View style={styles.playerNameTextWrapper}>
        <View style={styles.titleBox}>
          <Text style={styles.playerNameText} numberOfLines={1}>{firstName}</Text>
          <Text style={styles.playerNameText} numberOfLines={1}>{lastName}</Text>
        </View>
      </View>
    </View>
  </View>
)
const RankNubText = ({num,name}) => (
  <View style={styles.rankNubTextContainer}>
    <Text style={styles.rankNumber}>{num+'. '}</Text>
    <Text style={styles.rankPlayerName}>{name}</Text>
  </View>
  )
const  RankingTable = ({title,array}) => {
  console.log(array)
  return(
  <View style={styles.rankTableContainer}>
    <View style={styles.rankTitleView}>
      <Text style={styles.indivPosTitleText}>{title}</Text>
    </View>
    <View style={styles.rankNubTextContainer}>
      <View style={styles.nubTextSupContainer}>
        {
          array.map((item,i)=>{
          if(i<8) return(<RankNubText key={i} num={i+1} name={item.name} />)
          })
        }
      </View>
      <View style={styles.nubTextSupContainer}>
        {
          array.map((item,i)=>{
            if(i>=8) return(<RankNubText key={i} num={i+1} name={item.name} />)
          })
        }
      </View>
    </View>
  </View>
)}

class MyLionsShareView extends Component {

  constructor (props) {
    super(props)
    this._scrollView = ScrollView
    this.isUnMounted = false
    this.state = {
      isSubmitting: false
    }
  }

  _showError(error) {
    Alert.alert(
      'An error occured',
      error,
      [{text: 'Dismiss'}]
    )
  }


  componentDidMount() {
    setTimeout(()=>{
      this.shareSnapshot('scorecard',this.callback)
    },2000)

  }

  componentWillUnmount() {
    this.isUnMounted = true
  }
  shareSnapshot = (context,callback) => {
    this.setState({
      isSubmitting:true
    })
    setTimeout(()=>{
      RNViewShot.takeSnapshot(this._scrollView ,{
          format:'png',
          quality: 1,
          result: 'base64'
        })
        .then(
          res => Share.open({
            title:"I\'ve picked my players for the @lionsofficial squad. Download the official App to pick yours. #lionswatch",
            message:"I\'ve picked my players for the @lionsofficial squad. Download the official App to pick yours. #lionswatch",
            subject:context,
            url: `data:image/png;base64,${res}`
          }).then((info)=>{
            callback()
          }).catch((errorMessage)=>{
            // console.log("error message: " + error)
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

  callback = () => {
    this.setState({
      isSubmitting:false
    })
    this.backNav()
  }
  backNav = () => {
    this.props.popRoute()
  }
  render() {
    let { indivPos, forwards, backs } =this.props.data.squadDatafeed
    return (
      <Container theme={theme}>
        <View style={styles.container}>
          <View style={styles.smallContainer} >
              <ScrollView ref={(scrollView) => { this._scrollView = scrollView }} >
                <ShareHeaderView />
                <View>
                  {
                    parseInt(this.props.data.rating.fan_ranking) < 5?
                      <View style={styles.summaryWrapper}>
                        <Text style={styles.summaryText}>Congratulations. Your squad has earned the following rating.</Text>
                        <Text style={styles.summaryText}>Your squad score is ranked in the</Text>
                        <Text style={styles.summaryTextHighLight}>
                          TOP {this._toRating(this.props.data.rating.fan_ranking)}</Text>
                      </View>
                      :
                      <View style={styles.summaryWrapper}>
                        <Text style={styles.summaryText}>There’s room to improve your squad!</Text>
                        <Text style={styles.summaryTextHighLight}>MORE THAN 50%</Text>
                        <Text style={styles.summaryText}>of scores are higher than yours.</Text>
                      </View>
                  }
                </View>
                <View style={styles.ratingWrapper}>
                  <Text style={styles.ratingTitle}>OVERALL RATING</Text>
                  <View style={styles.ratingScore}>
                    <Text style={styles.ratingScorePoint}>{this.props.data.rating.overall_rating}</Text>
                  </View>
                </View>
                <View style={styles.barGraphWrapper}>
                  <Text style={styles.barGraphText}>COHESION</Text>
                  <BarGraph score={this.props.data.rating.cohesion_rating} isRed = {true} fullWidth={styleVar.deviceWidth-150} />
                </View>
                <View style={styles.barSliderWrapper}>
                  <View style={styles.barSliderTextWrapper}>
                    <Text style={styles.barSliderText}>ATTACK</Text>
                    <Text style={styles.barSliderText}>DEFENCE</Text>
                  </View>
                  <BarSlider score={this.props.data.rating.attack_defence_rating} isRed={true} fullWidth={styleVar.deviceWidth-90} />
                </View>
                <View style={styles.jobBoxContainer}>
                  {
                    indivPos.map((item,i)=>{
                      let position = item.position === 'WILDCARD'? 'STAR' : item.position
                      let firstName = item.info.name.toUpperCase().substring(0, item.info.name.lastIndexOf(" "))
                      let lastName = item.info.name.toUpperCase().substring(item.info.name.lastIndexOf(" ")+1, item.info.name.length)
                      return( <NoteName firstName={firstName} title={position} lastName={lastName} key={i}/>)
                    })
                  }
                </View>
                <RankingTable title={'FORWARDS'}  array={forwards} />
                <RankingTable title={'BACKS'} array={backs}  />
                <EYSFooter mySquadBtn={true}/>
              </ScrollView>
          </View>
          {this.state.isSubmitting ? <ActivityIndicator style={loader.scoreCard} size='small' /> : null }
        </View>
      </Container>
    )
  }
}

function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),
    replaceRoute:(route)=>dispatch(replaceRoute(route)),
    popRoute:(route)=>dispatch(popRoute()),
  }
}

export default connect((state) => {
  console.log(state)
  return {
    route: state.route,
    data: state.content.drillDownItemShare
  }
}, bindAction)(MyLionsShareView)
MyLionsShareView.propTypes = {
  data: PropTypes.any,
}
