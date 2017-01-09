
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

import styles from '../styles'
import styleVar from '../../../themes/variable'
import shapes from '../../../themes/shapes'

import ButtonFeedback from '../../utility/buttonFeedback'
import ImagePlaceholder from '../../utility/imagePlaceholder'

export default class ExpertCard extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    let {hasTitle, data} = this.props
    return (
      <ButtonFeedback >
      <View style={styles.indivPosition}>
        {
          hasTitle ? <View style={styles.indivPosTitle}>
            <Text style={styles.indivPosTitleText}>{data}</Text>
          </View> : null
        }

        {
            <View >
              <ImagePlaceholder
                width = {styleVar.deviceWidth / 3}
                height = {styleVar.deviceWidth / 3}>
                <Image transparent
                       resizeMode='contain'
                       source={require('../../../../contents/my-lions/players/jameshaskell.png')}
                       style={styles.playerImage} />
              </ImagePlaceholder>
              <View style={styles.indivPlayerNameWrapper}>
                <View style={[shapes.triangle]} />
                <View style={styles.gridBoxTitle}>
                  <Text style={styles.playerNameText}>JAMES</Text>
                  <Text style={styles.playerNameText}>HASKELL</Text>
                </View>
              </View>
            </View>
        }
      </View>
      </ButtonFeedback>
    )
  }
}
ExpertCard.propTypes = {
  number: PropTypes.any,
  data: PropTypes.any,
  hasTitle: PropTypes.bool
}

