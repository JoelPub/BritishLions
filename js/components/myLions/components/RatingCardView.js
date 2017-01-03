
'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
  Platform,
  ScrollView,
  Image
} from 'react-native'

import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import Swiper from 'react-native-swiper'

import styles from '../styles'
import styleVar from '../../../themes/variable'

import ButtonFeedback from '../../utility/buttonFeedback'
import BarGraph from '../../utility/barGraph'
import BarSlider from '../../utility/barSlider'
import SquadModal from '../../global/squadModal'

export default class RatingView extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <ButtonFeedback style={styles.scoreCardNoBottomW}  onPress={this.props.changeMode}>
        <View>
          <View ref='scorecard' style={styles.fullCard}>
            <View style={styles.expertRatingWrapper}>
              <Text style={styles.ratingTitle}>OVERALL RATING</Text>
              <View style={styles.ratingScore}>
                <Text style={styles.ratingScorePoint}>350</Text>
              </View>
            </View>
            <View style={styles.barGraphWrapper}>
              <Text style={styles.barGraphText}>COHESION</Text>
              <BarGraph score={86} fullWidth={styleVar.deviceWidth-150} />
            </View>
            <View style={styles.barSliderWrapper}>
              <View style={styles.barSliderTextWrapper}>
                <Text style={styles.barSliderText}>ATTACK</Text>
                <Text style={styles.barSliderText}>DEFENCE</Text>
              </View>
              <BarSlider score={30} fullWidth={styleVar.deviceWidth-100} />
            </View>
            <View style={styles.scoreCardFooter}>
              <Image source={require('../../../../images/footer/eyLogo.png')} style={styles.scoreCardFooterImg}></Image>
            </View>
          </View>
        </View>
      </ButtonFeedback>
    )
  }
}
RatingView.propTypes = {
  changeMode: PropTypes.func.isRequired,
}
