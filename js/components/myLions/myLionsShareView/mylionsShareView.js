

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
import { replaceRoute, pushNewRoute } from '../../../actions/route'
import EYSFooter from '../../global/eySponsoredFooter'
import logo from '../../../../images/logos/british-and-irish-lions.png'
import BarSlider from '../../utility/barSlider'
import BarGraph from '../../utility/barGraph'



import { drillDown } from '../../../actions/content'
import { globalNav } from '../../../appNavigator'

const ShareHeaderView = ({detail}) => (
  <View style={styles.viewShareHeader}>
    <Image style={styles.viewHeaderImage} source={logo} />
  </View>
)
class MyLionsShareView extends Component {

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
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
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
              <BarSlider score={this.props.data.rating.attack_defence_rating} isRed={true} fullWidth={styleVar.deviceWidth-100} />
            </View>
          </ScrollView>
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
  console.log(state)
  return {
    route: state.route,
    data: state.content.drillDownItemShare
  }
}, bindAction)(MyLionsShareView)
MyLionsShareView.propTypes = {
  data: PropTypes.any,
}
