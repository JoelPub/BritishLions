'use strict'

import React, { Component, Children } from 'react'
import {Image, View, Text, ActivityIndicator, ScrollView} from 'react-native'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import ButtonFeedback from '../../utility/buttonFeedback'
import styleVar from '../../../themes/variable'
import BarGraph from '../../utility/barGraph'
import BarSlider from '../../utility/barSlider'
import loader from '../../../themes/loader-position'
import Share from 'react-native-share'
import RNViewShot from 'react-native-view-shot'
import PushNotification from 'react-native-push-notification'
import SquadModal from '../squadModal'

const styles = styleSheetCreate({
  scoreCard:{
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'rgb(216,217,218)',
    padding:20,
    paddingTop:25
  },
  semiCard:{
    marginBottom:10,
    backgroundColor:'rgb(95,96,98)',
    borderRadius:5,
  },
  semiCardFooter:{
    flexDirection: 'row',
    alignItems:'flex-end',
    justifyContent:'flex-end',
    backgroundColor:'rgb(128,128,128)',
    height:50,
    paddingBottom:9,
    paddingRight:11,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
  },
  semiCardFooterText:{
    fontFamily: styleVar.fontGeorgia,
    fontSize:13,
    marginRight:5,
    color:'rgb(255,255,255)',
  },
})

export default class GrayContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <View style={[styles.scoreCard]} >
        <View style={styles.semiCard}>
          {this.props.children}
          <View style={styles.semiCardFooter}>
            <Text style={styles.semiCardFooterText}> Analytics Sponsored by </Text>
            <Image source={require('../../../../images/footer/eyLogo.png')}></Image>
          </View>
        </View>
      </View>
    )
  }

}
