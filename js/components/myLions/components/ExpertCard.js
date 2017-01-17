
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
  _showDetail(item, route) {
      this.props.drillDown(item, route)
  }
  render () {
    let {hasTitle, data, title} = this.props
    return (
      <ButtonFeedback
       onPress={() => this._showDetail(data,'myLionsPlayerDetails')}>
      <View style={styles.indivPosition}>
        {
          hasTitle ? <View style={styles.indivPosTitle}>
            <Text style={styles.indivPosTitleText}>{title}</Text>
          </View> : null
        }

        {
            <View >
              <ImagePlaceholder
                width = {styleVar.deviceWidth / 3}
                height = {styleVar.deviceWidth / 3}>
                <Image transparent
                       resizeMode='contain'
                       source={data.image}
                       style={styles.playerImage} />
              </ImagePlaceholder>
              <View style={styles.indivPlayerNameWrapper}>
                <View style={[shapes.triangle]} />
                <View style={styles.gridBoxTitle}>
                  <Text style={styles.playerNameText} numberOfLines={1}>{data.name.toUpperCase().substring(0, data.name.lastIndexOf(" "))}</Text>
                  <Text style={styles.playerNameText} numberOfLines={1}>{data.name.toUpperCase().substring(data.name.lastIndexOf(" ")+1, data.name.length)}</Text>
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
  title: PropTypes.any,
  hasTitle: PropTypes.bool
}

