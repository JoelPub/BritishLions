

'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ActivityIndicator,Alert,DeviceEventEmitter} from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import Swiper from 'react-native-swiper'

import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import styleVar from '../../themes/variable'
import loader from '../../themes/loader-position'

import LoginRequire from '../global/loginRequire'
import LionsHeader from '../global/lionsHeader'
import LionsFooter from '../global/lionsFooter'
import GrayContainer from '../global/GrayContainer'
import ExpertRank from  '../global/ExpertRank'
import RankList from  '../global/RankingList'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import { replaceRoute, pushNewRoute } from '../../actions/route'
import EYSFooter from '../global/eySponsoredFooter'
import {getUserFullName} from  '../utility/asyncStorageServices'
import { getAccessToken} from '../utility/asyncStorageServices'
import {actionsApi} from  '../utility/urlStorage'
import { service } from '../utility/services'

import { drillDown } from '../../actions/content'
import { globalNav } from '../../appNavigator'






const  ShareButton = ({onPress}) => {
  return (
    <ButtonFeedback
      rounded label='Share'
      style={[styles.button,styles.scoreCardShare]} onPress={onPress}>
      <Text  style={styles.scoreCardShareText}>SHARE</Text>
      <Icon name='md-share-alt' style={styles.scoreCardShareIcon} />
    </ButtonFeedback>
  )
}

class CoachsBox extends Component {
  constructor (props) {
    super(props)
    this._scrollView = ScrollView
    this.isUnMounted = false
    this.state = {
      isLoaded: false,
      isNetwork: true,
    }
    this.subscription = null
  }
  _showError(error) {
    if(!this.state.isNetwork) return

    if(error === 'Please make sure that you\'re connected to the network.') {
      this.setState({
        isNetwork: false
      })
    }
    if(error !== ''){
      Alert.alert(
        'An error occured',
        error,
        [{text: 'Dismiss'}]
      )
    }
  }
  /*get Data*/
  fetchData = (aceess_token,userID) => {

  }
  /*call  api */


  render() {

    return (
      <Container theme={theme}>
        <View style={styles.container} >
          <LionsHeader
            back={true}
            title='MY LIONS'
            contentLoaded={true}
            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true })}} />
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>



            <LionsFooter isLoaded={true} />
          </ScrollView>

          <EYSFooter mySquadBtn={true}/>

          />
        </View>
      </Container>
    )
  }

  componentDidMount() {
    let {userProfile} = this.props
    getAccessToken().then(token=>{
      console.log(token)
      this.fetchData(token,userProfile.userID)
    })
  }
  componentWillUnmount() {
    this.isUnMounted = true
  }
}
function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),
    replaceRoute:(route)=>dispatch(replaceRoute(route)),
    pushNewRoute: (route)=>dispatch(pushNewRoute(route)),
  }
}
export default connect((state) => {
  return {
    route: state.route,
    userProfile:state.squad.userProfile,
    netWork: state.network,
  }
}, bindAction)(CoachsBox)
CoachsBox.defaultProps = {

}
