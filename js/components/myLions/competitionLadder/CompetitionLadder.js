

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
import ImagePlaceholder from '../../utility/imagePlaceholder'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImageCircle from '../../utility/imageCircle'
import { replaceRoute, pushNewRoute } from '../../../actions/route'
import EYSFooter from '../../global/eySponsoredFooter'


import { drillDown } from '../../../actions/content'
import { globalNav } from '../../../appNavigator'

import HeaderTitleWithModal from '../components/HeaderTitleWithModal'
import PlayerScore from '../../global/playerScore'

class CompetitionLadder extends Component {

  constructor (props) {
    super(props)
    this._scrollView = ScrollView
    this.isUnMounted = false
    this.state = {

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
  }

  componentWillUnmount() {
    this.isUnMounted = true
  }

  render() {
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
              <ExpertRank />

            </GrayContainer>
            <LionsFooter isLoaded={true} />
          </ScrollView>
          <LoginRequire/>
          <EYSFooter mySquadBtn={true}/>
        </View>
      </Container>
    )
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
  }
}, bindAction)(CompetitionLadder)