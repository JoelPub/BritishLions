'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import StadiumFigure from '../StadiumFigure'

class SetPlayer extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <View style={{marginTop:50,paddingTop:50,marginHorizontal:10,borderRadius:5,backgroundColor:'rgb(255,255,255)',  flex: 1,}}>
        <StadiumFigure />

      </View>
    )
  }
}

export default SetPlayer