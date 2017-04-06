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

    borderRadius:5,
    paddingVertical:2
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
    marginTop: 1,
    backgroundColor:'rgb(71,72,73)',
    alignItems:'center',
    paddingTop: 15,
    android: {
      paddingTop: 18,
      marginTop: 2,
    }
  },
  profileRankTextTitle: {
    color:'rgb(255,255,255)',
    fontFamily: styleVar.fontCondensed,
    fontSize:18,
    lineHeight:18,
    backgroundColor:'transparent',
  },
  profileRankCircleTitleText: {
    marginTop: 2,
    android: {
      marginTop: -2
    }
  },
  profileSubTextTitle: {
    color:'rgb(255,230,0)',
    fontFamily: styleVar.fontCondensed,
    fontSize:18,
    lineHeight:18,
    backgroundColor:'transparent',
    android: {
      marginTop: 4
    }
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
    width:18,
  },
  rolesTextBoxPts: {
    width:25,
  }

})
const  Circle = ({data,profileNameViewStyle,profileNameTextStyle}) => {
  return (
    <View style={[styles.profileNameView,profileNameViewStyle]}>
      <Text style={[styles.profileNameText,profileNameTextStyle]}>{data.initName.toUpperCase()}</Text>
    </View>
  )
}
const  CircleRank = ({data,profileRankCircleViewStyle,userRankStyle}) => {
  return (
    <View style={[styles.profileRankCircleView,profileRankCircleViewStyle]}>
      <Text style={[styles.profileRankTextTitle, styles.profileRankCircleTitleText]}>RANK</Text>
      <Text style={[styles.profileSubTextTitle, userRankStyle]}>{data.rank}</Text>
    </View>
  )
}
const  TitleSubTitle = ({data,profileTitleTextStyle,profileSubTitleTextStyle}) => {
  return (
    <View style={styles.profileTitleView}>
      <Text style={[styles.profileTitleText,profileTitleTextStyle]}>{data.userName.toUpperCase()}</Text>
      <Text style={[styles.profileSubTitleText,profileSubTitleTextStyle]}>{data.selectorRating.toUpperCase()}</Text>
    </View>
  )
}
const  Roles = ({data,profileSubTextTitleStyle,profileRankTextTitleStyle}) => {
  let rolesTextBox = {width : 25}
  if(styleVar.deviceWidth<=320){
    rolesTextBox ={
      width: 18
    }
  }
  return (
    <View style={styles.rolesContainer}>
      <View style={rolesTextBox}>
        <Text style={[styles.profileRankTextTitle,profileRankTextTitleStyle]}>W</Text>
        <Text style={[styles.profileSubTextTitle,profileSubTextTitleStyle]}>{data.w}</Text>
      </View>
      <View style={rolesTextBox}>
        <Text style={[styles.profileRankTextTitle,profileRankTextTitleStyle]}>L</Text>
        <Text style={[styles.profileSubTextTitle,profileSubTextTitleStyle]}>{data.l}</Text>
      </View>
      <View style={rolesTextBox}>
        <Text style={[styles.profileRankTextTitle,profileRankTextTitleStyle]}>D</Text>
        <Text style={[styles.profileSubTextTitle,profileSubTextTitleStyle]}>{data.d}</Text>
      </View>
      <View style={rolesTextBox}>
        <Text style={[styles.profileRankTextTitle,profileRankTextTitleStyle]}>F</Text>
        <Text style={[styles.profileSubTextTitle,profileSubTextTitleStyle]}>{data.f}</Text>
      </View>
      <View style={rolesTextBox}>
        <Text style={[styles.profileRankTextTitle,profileRankTextTitleStyle]}>A</Text>
        <Text style={[styles.profileSubTextTitle,profileSubTextTitleStyle]}>{data.a}</Text>
      </View>
      <View style={rolesTextBox}>
        <Text style={[styles.profileRankTextTitle,profileRankTextTitleStyle]}>BP</Text>
        <Text style={[styles.profileSubTextTitle,profileSubTextTitleStyle]}>{data.bp}</Text>
      </View>
      <View style={styles.rolesTextBoxPts}>
        <Text style={[styles.profileRankTextTitle,profileRankTextTitleStyle]}>PTS</Text>
        <Text style={[styles.profileSubTextTitle,profileSubTextTitleStyle]}>{data.pts}</Text>
      </View>
    </View>
  )
}
const Profile = ({data,profileNameViewStyle,profileNameTextStyle,profileTitleTextStyle,profileSubTitleTextStyle}) => {
  return (
    <View style={[styles.profileContainer]}>
      <Circle data={data}
              profileNameViewStyle={profileNameViewStyle}
              profileNameTextStyle={profileNameTextStyle}
      />
      <TitleSubTitle data={data}
                     profileTitleTextStyle={profileTitleTextStyle}
                     profileSubTitleTextStyle={profileSubTitleTextStyle}
      />
    </View>
  )
}
const RankView = ({data,profileRankCircleViewStyle,profileSubTextTitleStyle,profileRankTextTitleStyle,userRankStyle}) => {
  return (
    <View style={styles.profileContainer}>
      <CircleRank data={data}
                  profileRankCircleViewStyle={profileRankCircleViewStyle}
                  profileSubTextTitleStyle={profileSubTextTitleStyle}
                  userRankStyle={userRankStyle}
      />
      <Roles data={data}
             profileSubTextTitleStyle={profileSubTextTitleStyle}
             profileRankTextTitleStyle={profileRankTextTitleStyle}
             userRankStyle={userRankStyle}
      />
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
    let {data,profileNameViewStyle,profileRankCircleViewStyle,profileRankTextTitleStyle,profileSubTextTitleStyle
      ,profileNameTextStyle,profileTitleTextStyle,
      profileSubTitleTextStyle,userRankStyle
      } =this.props
      if(data.initName === undefined)
        data.initName = ''
      if(data.userName === undefined)
        data.userName = ''
      if(data.selectorRating === undefined)
        data.selectorRating = ''
    return (
      <View style={[styles.container,this.props.containerStyle]} >
        <Profile data={data}
                 profileNameViewStyle={this.props.profileNameViewStyle}
                 profileNameTextStyle={profileNameTextStyle}
                 profileRankCircleViewStyle={profileRankCircleViewStyle}
                 profileTitleTextStyle ={profileTitleTextStyle}
                 profileSubTitleTextStyle= {profileSubTitleTextStyle}
                 userRankStyle={userRankStyle}


        />
        <RankView data={data}
                  profileRankCircleViewStyle={profileRankCircleViewStyle}
                  profileRankTextTitleStyle={profileRankTextTitleStyle}
                  profileSubTextTitleStyle={profileSubTextTitleStyle}
                  userRankStyle={userRankStyle}
        />
      </View>
    )
  }
}
export default ExpertRank

ExpertRank.propTypes = {
  data: PropTypes.object,

  containerStyle: PropTypes.any,
  profileNameViewStyle:PropTypes.any,
  profileSubTextTitleStyle: PropTypes.any,
  profileNameTextStyle: PropTypes.any,
  profileTitleTextStyle : PropTypes.any,
  profileSubTitleTextStyle : PropTypes.any,

  profileRankCircleViewStyle:PropTypes.any,
  profileRankTextTitleStyle : PropTypes.any,
  userRankStyle: PropTypes.any,
}

