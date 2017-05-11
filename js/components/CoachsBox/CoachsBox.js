

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
import { styleSheetCreate } from '../../themes/lions-stylesheet'


import LoginRequire from '../global/loginRequire'
import LionsHeader from '../global/lionsHeader'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import { replaceRoute, pushNewRoute } from '../../actions/route'
import EYSFooter from '../global/eySponsoredFooter'
import {getUserFullName} from  '../utility/asyncStorageServices'
import { getAccessToken} from '../utility/asyncStorageServices'
import {actionsApi} from  '../utility/urlStorage'
import { service } from '../utility/services'

import { drillDown } from '../../actions/content'
import { globalNav } from '../../appNavigator'

import Carousel from  '../global/Carousel'

const locStyle = styleSheetCreate({
  bannerDesc: {
    paddingTop: 7
  },
  infoBox: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: styleVar.colorText,
  },
  infoBoxText: {
    marginBottom: 20,
    fontFamily: styleVar.fontGeorgia,
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    color: '#FFF',
  },
  bannerDetails: {
    backgroundColor: styleVar.colorText,
    paddingTop: 18,
    paddingBottom: 5
  },
  logoIcon: {
    width: 21,
    height: 32,
    backgroundColor: 'transparent',
    marginTop: -5,
    android: {
      marginTop: 0
    }
  },
})


const Banner = ({data}) => (
  <View style={styles.banner}>
    <ImagePlaceholder height={200}>
      <LinearGradient style={styles.fixtureImgContainer} colors={['#d9d7d8', '#FFF']}>
        <Image
          resizeMode='contain'
          style={styles.bannerImg}
          source={{uri: data.banner}} />
      </LinearGradient>
    </ImagePlaceholder>
    <View style={[styles.bannerDetails, locStyle.bannerDetails]}>
      <Text style={[styles.bannerDesc, locStyle.bannerDesc]}>{ data.stadiumlocation }</Text>
    </View>
  </View>
)

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

  /* nav to  */
  goToMatch = (page) => {
    page = page ? page : 0
    this.props.drillDown(Object.assign({page:page},this.props.details),'matchCenter');
  }
  render() {

    return (
      <Container theme={theme}>
        <View style={styles.container} >
          <LionsHeader
            title="COACH'S BOX"
            contentLoaded={true}
            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true })}} />
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
           
            <Banner data={this.props.details} />
            
            <Carousel centerClick={this.goToMatch} />
            <LionsFooter isLoaded={true} />
          </ScrollView>
          <EYSFooter mySquadBtn={true}/>
        </View>
      </Container>
    )
  }

  componentDidMount() {
    let {userProfile} = this.props
    getAccessToken().then(token=>{
      if (__DEV__)console.log(token)
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
    details: state.content.drillDownItem,
  }
}, bindAction)(CoachsBox)
CoachsBox.defaultProps = {

}
