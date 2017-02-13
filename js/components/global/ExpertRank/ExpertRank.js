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
  container:{
    flex: 1,
    width: null,
    height: 195,
    backgroundColor: 'rgb(95,96,98)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(128, 127, 131)',
    borderRadius:5,
  },
  profileContainer:{
    width: null,
    height: 100,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
  profileNameView: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgb(255,255,255)',

  },
  profileNameText: {
    fontFamily: styleVar.fontGeorgia,
    fontSize:36,
    color:'rgb(255,255,255)',
    paddingLeft: 20,
    paddingTop: 20
  }


})

const Profile = () => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileNameView}>
        <Text style={styles.profileNameText}>KE</Text>
      </View>
    </View>
  )
}

class ExpertRank extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <View style={[styles.container]} >
        <Profile />
      </View>
    )
  }
}
export default ExpertRank

