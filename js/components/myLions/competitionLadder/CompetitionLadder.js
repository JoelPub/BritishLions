

'use strict'

import React, { Component } from 'react'
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
import GrayContainer from '../../global/GrayContainer'
import ExpertRank from  '../../global/ExpertRank'
import RankList from  '../../global/RankingList'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImageCircle from '../../utility/imageCircle'
import { replaceRoute, pushNewRoute } from '../../../actions/route'
import EYSFooter from '../../global/eySponsoredFooter'
import {getUserFullName} from  '../../utility/asyncStorageServices'

import { drillDown } from '../../../actions/content'
import { globalNav } from '../../../appNavigator'

import HeaderTitleWithModal from '../components/HeaderTitleWithModal'
import PlayerScore from '../../global/playerScore'

import DataModel from './defaultData'
const ButtonWithIcon = (props) => {
  let {iconName,title,style,onPress} = props
  let styleMore = style ? style : null
  return (
    <ButtonFeedback rounded style={[styles.button,styles.btnFavourites,styleMore]} >
      <Icon name={iconName} style={styles.btnFavouritesIcon} />
      <Text style={styles.btnFavouritesLabel}>
        {title}
      </Text>
    </ButtonFeedback>
  )
}
const  ShareButton = () => {
  return (
    <ButtonFeedback
      rounded label='Share'
      disabled = {true}
      style={[styles.button,styles.scoreCardShare]}>
      <Text  style={styles.scoreCardShareText}>SHARE</Text>
      <Icon name='md-share-alt' style={styles.scoreCardShareIcon} />
    </ButtonFeedback>
  )
}
const MyPride = (props) => {
  let { groupNameOnPress,createGroupOnPress,JoinGroupOnPress,data} =props
  return (
    <View style={styles.prideContainer}>
      <View style={styles.prideTitleView}>
        <Text style={styles.prideTitleText}>MY PRIDE</Text>
      </View>
      <GroupAction />
      <GroupNameList onPress={groupNameOnPress} data={data} />
    </View>
  )
}
const GroupAction = () => {
  return (
    <View style={styles.groupActionView}>
      <ButtonWithIcon  iconName  = {'md-star'} title = {'CREATE GROUP'} style={styles.grayBackgroundColor}/>
      <ButtonWithIcon  iconName  = {'md-star'} title = {'JOIN GROUP'} style={styles.grayBackgroundColor}/>
    </View>
  )
}
class GroupName extends Component {
  btnClick = () => {
    this.props.onPress(this.props.data)
  }
  render() {
    let {data} = this.props
    return (
      <ButtonFeedback style={styles.groupName} onPress={this.btnClick}>
        <Text style={styles.groupNameText}>{data.name}</Text>
        <Icon name='md-star' style={styles.playIcon} />
      </ButtonFeedback>
    )
  }
}
const GroupNameList = ({data,onPress}) => {
  return (
    <View style={styles.groupList}>
      {
        data.my_groups.map((item,index)=>{
          return(
            <GroupName onPress ={onPress} key={index} data={item} />
          )
        })
      }
    </View>
  )
}
const CompetitionCenter = () => {
  return (
    <View style={styles.CompetitionCenterView}>
      <ButtonWithIcon  iconName  = {'md-star'} title = {'COMPETITION CENTRE'} />
    </View>
  )
}

class CompetitionLadder extends Component {
  constructor (props) {
    super(props)
    this._scrollView = ScrollView
    this.isUnMounted = false
    this.state = {
      data: DataModel
    }
  }
  /*router logic*/
  groupNameOnPress = (data) => {
    console.log('**********')
    console.log(data)
   this.props.drillDown('data','myLionsGroupView')
  }

  render() {
   let { data } = this.state
    return (
      <Container theme={theme}>
        <View style={styles.container}>
          <LionsHeader
            back={true}
            title='MY LIONS'
            contentLoaded={true}
            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true })}} />
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
            <HeaderTitleWithModal title={'COMPETITION LADDER'}/>
            <GrayContainer >
              <ExpertRank data={data}/>
              <RankList data={data} />
              <ShareButton />
            </GrayContainer>
            <MyPride  data= {data} groupNameOnPress={this.groupNameOnPress}/>
            <CompetitionCenter />
          <LionsFooter isLoaded={true} />
          </ScrollView>
          <LoginRequire/>
          <EYSFooter mySquadBtn={true}/>
        </View>
      </Container>
    )
  }
  componentDidMount() {
    console.log(DataModel)
    getUserFullName
  }

  componentWillUnmount() {
    this.isUnMounted = true
  }
}

function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),
    replaceRoute:(route)=>dispatch(replaceRoute(route)),
  }
}
export default connect((state) => {
  console.log(state)
  return {
    route: state.route,
  }
}, bindAction)(CompetitionLadder)
CompetitionLadder.defaultProps = {

}
