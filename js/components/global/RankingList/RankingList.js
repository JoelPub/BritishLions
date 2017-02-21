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

const styles = styleSheetCreate({
  container:{
    flex: 1,
    width: null,
    height: 195,
    backgroundColor: 'rgb(95,96,98)'
  },
  titleView:{
    flex: 1,
    width: null,
    height: null,
  },
  titleText:{
    color:'rgb(255,255,255)',
    fontFamily: styleVar.fontCondensed,
    backgroundColor: 'transparent',
    fontSize:28,
    height: 59,
    textAlign:'center',
    paddingTop: 25,
  },
  contentView:{
    marginTop: 25,
    marginLeft:25
  },
  subTitleView:{
    flexDirection:'row',
  },
  subContentView:{
    flexDirection:'row',
  },
  subTitleText:{
    color:'rgb(255,255,255)',
    fontFamily: styleVar.fontCondensed,
    fontSize:18,
    lineHeight:18,
    backgroundColor:'transparent',
  },
  IDText:{
    marginLeft:0
  },
  LText:{
    width:25
  },
  rankTextView:{
    marginLeft:18,
    width:34
  },
  WText:{
    marginLeft:30,
    width:25
  },
})
const  Header = () => {
  return (

      <View style={styles.subTitleView}>
        <View style={styles.IDText}>
          <Text style={[styles.subTitleText]}>ID</Text>
        </View>
        <View style={styles.rankTextView}>
          <Text style={[styles.subTitleText]}>RANK</Text>
        </View>
        <View style={styles.WText}>
          <Text style={[styles.subTitleText]}>W</Text>
        </View>
        <View style={styles.LText}>
          <Text style={styles.subTitleText}>L</Text>
        </View>
        <View style={styles.LText}>
          <Text style={styles.subTitleText}>D</Text>
        </View>
        <View style={styles.LText}>
          <Text style={styles.subTitleText}>F</Text>
        </View>
        <View style={styles.LText}>
          <Text style={styles.subTitleText}>A</Text>
        </View>
        <View style={styles.LText}>
          <Text style={styles.subTitleText}>BP</Text>
        </View>
        <View style={styles.LText}>
          <Text style={styles.subTitleText}>PTS</Text>
        </View>
      </View>

  )
}
const  Content = () => {
  return (
    <View style={styles.subContentView}>
      <View style={styles.IDText}>
        <Text style={[styles.subTitleText]}>JP</Text>
      </View>
      <View style={styles.rankTextView}>
        <Text style={[styles.subTitleText]}>1</Text>
      </View>
      <View style={styles.WText}>
        <Text style={[styles.subTitleText]}>22</Text>
      </View>
      <View style={styles.LText}>
        <Text style={styles.subTitleText}>12</Text>
      </View>
      <View style={styles.LText}>
        <Text style={styles.subTitleText}>45</Text>
      </View>
      <View style={styles.LText}>
        <Text style={styles.subTitleText}>18</Text>
      </View>
      <View style={styles.LText}>
        <Text style={styles.subTitleText}>62</Text>
      </View>
      <View style={styles.LText}>
        <Text style={styles.subTitleText}>78</Text>
      </View>
      <View style={styles.LText}>
        <Text style={styles.subTitleText}>1235</Text>
      </View>
    </View>
  )
}

class RankingList extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <View style={[styles.scoreCard]} >
          <View style={styles.titleView}>
            <Text style={styles.titleText} >GLOBAL TOP5</Text>
          </View>
        <View style={styles.contentView}>
            <Header />
            <Content />
        </View>
      </View>
    )
  }
}
export default RankingList