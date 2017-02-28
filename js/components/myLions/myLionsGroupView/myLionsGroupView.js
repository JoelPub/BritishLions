

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
import ImagePlaceholder from '../../utility/imagePlaceholder'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImageCircle from '../../utility/imageCircle'
import { getGroupInfo } from '../../utility/apiasyncstorageservice/eyc3GroupsActions'
import { replaceRoute, pushNewRoute } from '../../../actions/route'
import EYSFooter from '../../global/eySponsoredFooter'

import HeaderTitleWithModal from '../components/HeaderTitleWithModal'
import GrayContainer from '../../global/GrayContainer'
import ExpertRank from  '../../global/ExpertRank'
import RankList from  '../../global/RankingList'

import defaultData from './defaultData'

import { drillDown } from '../../../actions/content'
import { globalNav } from '../../../appNavigator'
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
class MyLionsGroupView extends Component {

  constructor (props) {
    super(props)
    this._scrollView = ScrollView
    this.isUnMounted = false
    this.state = {
      data:defaultData
    }
  }

  _showError(error) {
    Alert.alert(
      'An error occured',
      error,
      [{text: 'Dismiss'}]
    )
  }
  /*get Data*/
  fetchData = () => {
    let opt = {
      url:'',
      query: {
        aceess_token: '',
        id: '',
        group_id: ''
      }
    }
    this.setState({
      isLoaded: true,
    })
    getGroupInfo().then((json)=>{
      if (this.isUnMounted) return // return nothing if the component is already unmounted
      this.setState({
        data:json,
        isLoaded: false,
      })
    }).catch(
    )
  }
  render() {
    let {data} = this.state
    let {userProfile} = this.props
    return (
      <Container theme={theme}>
        <View style={styles.container}>
          <LionsHeader
            back={true}
            title='MY LIONS'
            contentLoaded={true}
            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true })}} />
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
            <HeaderTitleWithModal title={'GROUP NAME'}/>
            <GrayContainer >
              <ExpertRank data={userProfile}  />
              <RankList data={data} title={'GROUP LADDER'} />
            </GrayContainer>
            <View style={styles.groupAction}>
              <ButtonWithIcon  iconName  = {'md-star'} title = {'INVITE CODE'} style={styles.grayBackgroundColor}/>
              <ButtonWithIcon  iconName  = {'md-exit'} title = {'LEAVE GROUP'} style={styles.grayBackgroundColor}/>
            </View>
            <LionsFooter isLoaded={true} />
          </ScrollView>
          <LoginRequire/>
          <EYSFooter mySquadBtn={true}/>
        </View>
      </Container>
    )
  }
  componentDidMount() {
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
  return {
    route: state.route,
    userProfile:state.squad.userProfile
  }
}, bindAction)(MyLionsGroupView)
