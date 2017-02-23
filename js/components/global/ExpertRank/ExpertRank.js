'use strict'

import React, { Component, Children, PropTypes } from 'react'
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
    flexDirection:'row',
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },

  profileNameView: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgb(255,255,255)',
    marginLeft:25,
    marginTop: 20,
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 15,
    android: {
      paddingTop: 6
    }
  },
  profileRankCircleView: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft:25,
    marginTop: 5,
    backgroundColor:'rgb(71,72,73)',
    alignItems:'center',
    paddingTop: 15,
    android: {
      paddingTop: 18
    }
  },
  profileRankTextTitle: {
    color:'rgb(255,255,255)',
    fontFamily: styleVar.fontCondensed,
    fontSize:18,
    lineHeight:18,
    backgroundColor:'transparent',
  },
  profileSubTextTitle: {
    color:'rgb(255,230,0)',
    fontFamily: styleVar.fontCondensed,
    fontSize:18,
    lineHeight:18,
    backgroundColor:'transparent'
  },
  profileNameText: {
    color:'rgb(255,255,255)',
    fontFamily: styleVar.fontCondensed,
    fontSize:36,
    lineHeight:36,
    backgroundColor:'transparent'
  },
  profileTitleView: {
    marginLeft:25,
    marginTop: 35,
  },
  profileTitleText: {
    color:'rgb(255,230,0)',
    fontFamily: styleVar.fontCondensed,
    fontSize:21,
    lineHeight:21,
  },
  profileSubTitleText: {
    color:'rgb(255,255,255)',
    fontFamily: styleVar.fontCondensed,
    fontSize:21,
    lineHeight:21,
  },
  rolesContainer:{
    flexDirection:'row',
    marginLeft:25,
    marginTop: 18,
  },
  rolesTextBox: {
    width:25,
  }

})
const  Circle = ({data}) => {
  return (
    <View style={styles.profileNameView}>
      <Text style={styles.profileNameText}>{data.selector_rating}</Text>
    </View>
  )
}
const  CircleRank = ({data}) => {
  return (
    <View style={styles.profileRankCircleView}>
      <Text style={styles.profileRankTextTitle}>RANK</Text>
      <Text style={styles.profileSubTextTitle}>{data.rank}</Text>
    </View>
  )
}
const  TitleSubTitle = () => {
  return (
    <View style={styles.profileTitleView}>
      <Text style={styles.profileTitleText}>KENNETH ERICKSON</Text>
      <Text style={styles.profileSubTitleText}>EXPERT SELECTOR</Text>
    </View>
  )
}
const  Roles = ({data}) => {
  return (
    <View style={styles.rolesContainer}>
      <View style={styles.rolesTextBox}>
        <Text style={styles.profileRankTextTitle}>W</Text>
        <Text style={styles.profileSubTextTitle}>{data.w}</Text>
      </View>
      <View style={styles.rolesTextBox}>
        <Text style={styles.profileRankTextTitle}>L</Text>
        <Text style={styles.profileSubTextTitle}>{data.l}</Text>
      </View>
      <View style={styles.rolesTextBox}>
        <Text style={styles.profileRankTextTitle}>D</Text>
        <Text style={styles.profileSubTextTitle}>{data.d}</Text>
      </View>
      <View style={styles.rolesTextBox}>
        <Text style={styles.profileRankTextTitle}>F</Text>
        <Text style={styles.profileSubTextTitle}>{data.f}</Text>
      </View>
      <View style={styles.rolesTextBox}>
        <Text style={styles.profileRankTextTitle}>A</Text>
        <Text style={styles.profileSubTextTitle}>{data.a}</Text>
      </View>
      <View style={styles.rolesTextBox}>
        <Text style={styles.profileRankTextTitle}>BP</Text>
        <Text style={styles.profileSubTextTitle}>{data.bp}</Text>
      </View>
      <View style={styles.rolesTextBox}>
        <Text style={styles.profileRankTextTitle}>PTS</Text>
        <Text style={styles.profileSubTextTitle}>{data.pts}</Text>
      </View>
    </View>
  )
}
const Profile = ({data}) => {
  return (
    <View style={styles.profileContainer}>
      <Circle data={data} />
      <TitleSubTitle data={data} />
    </View>
  )
}
const RankView = ({data}) => {
  return (
    <View style={styles.profileContainer}>
      <CircleRank data={data}/>
      <Roles data={data} />
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
    let {data} =this.props
    return (
      <View style={[styles.container]} >
        <Profile data={data}/>
        <RankView data={data}/>
      </View>
    )
  }
}
export default ExpertRank

ExpertRank.propTypes = {
  data: PropTypes.object
}
