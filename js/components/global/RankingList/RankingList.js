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

const styles = styleSheetCreate({
  container:{
    flex: 1,
    width: null,
    backgroundColor: 'rgb(95,96,98)'
  },
  titleView:{
    flex: 1,
    width: null,
    height: null,
    borderTopWidth: 1,
    borderTopColor: 'rgb(128, 127, 131)',
  },
  titleText:{
    color:'rgb(255,230,0)',
    fontFamily: styleVar.fontCondensed,
    backgroundColor: 'transparent',
    fontSize:28,
    height: 59,
    textAlign:'center',
    paddingTop: 25,
  },
  contentView:{
    marginTop: 25,
    marginLeft:25,
    marginBottom: 20,
  },
  subTitleView:{
    flexDirection:'row',
  },
  subContentView:{
    flexDirection:'row',
    marginTop: 7,
  },
  whiteColor:{
    color:'rgb(255,255,255)',
  },

  subTitleText:{
    color:'rgb(255,255,255)',
    fontFamily: styleVar.fontCondensed,
    fontSize:18,
    lineHeight:18,
    backgroundColor:'transparent',
    textAlign: 'center',
  },
  subContentText:{
    color:'rgb(255,230,0)',
    fontFamily: styleVar.fontCondensed,
    fontSize:18,
    lineHeight:18,
    backgroundColor:'transparent',
    textAlign: 'center',
  },
  IDText:{
    marginLeft:0,
    width:30,
    alignItems:'center',
  },
  IdTextView:{
    marginLeft:0,
    marginTop:0,
    width:30,
    height:30,
    borderRadius: 15,
    borderWidth:2,
    borderColor: 'rgb(255,255,255)',
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 8,
    android: {
      paddingTop: 3
    }
  },
  LText:{
    width:25,
    height:30,
    justifyContent:'center',
    paddingTop: 8,
    android: {
      paddingTop: 3
    }
  },
  LTextTop:{
    width:25,
    height:30,
  },
  rankTextView:{
    marginLeft:5,
    width:34
  },
  rankContentTextView:{
    marginTop:0,
    marginLeft:9,
    width:30,
    height:30,
    borderRadius: 15,
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 8,
    android: {
      paddingTop: 3
    },
    backgroundColor: 'rgb(71,72,73)'
  },
  WText:{
    marginLeft:30,
    width:25,
    height:30,
    justifyContent:'center',
    paddingTop: 8,
    android: {
      paddingTop: 3
    }
  },
  WTextTop:{
    marginLeft:30,
    width:25,
  },
  nilView:{
  paddingHorizontal:12,
    paddingBottom:20
  },
  describeText: {
    color:'rgb(255,255,255)',
    textAlign:'center',
    fontSize:16,
  },
  describeText2: {
    color:'rgb(255,255,255)',
    fontSize:16,
    marginTop:20,
    textAlign:'center',
  }
})
const  Header = ({addStyle}) => {
  return (
      <View style={styles.subTitleView}>
        <View style={styles.IDText}>
          <Text style={[styles.subTitleText]}>ID</Text>
        </View>
        <View style={styles.rankTextView}>
          <Text style={[styles.subTitleText]}>RANK</Text>
        </View>
        <View style={[styles.WTextTop,addStyle]}>
          <Text style={[styles.subTitleText]}>W</Text>
        </View>
        <View style={[styles.LTextTop,addStyle]}>
          <Text style={styles.subTitleText}>L</Text>
        </View>
        <View style={[styles.LTextTop,addStyle]}>
          <Text style={styles.subTitleText}>D</Text>
        </View>
        <View style={[styles.LTextTop,addStyle]}>
          <Text style={styles.subTitleText}>F</Text>
        </View>
        <View style={[styles.LTextTop,addStyle]}>
          <Text style={styles.subTitleText}>A</Text>
        </View>
        <View style={[styles.LTextTop,addStyle]}>
          <Text style={styles.subTitleText}>BP</Text>
        </View>
        <View style={[styles.LTextTop]}>
          <Text style={styles.subTitleText}>PTS</Text>
        </View>
      </View>

  )
}
const  Content = ({data,index,addStyle}) => {
  return (
    <View style={styles.subContentView}>
      <View style={styles.IdTextView}>
        <Text style={[styles.subContentText,styles.whiteColor]}>JP</Text>
      </View>
      <View style={styles.rankContentTextView}>
        <Text style={[styles.subContentText]}>{index+1}</Text>
      </View>
      <View style={[styles.WText,addStyle]}>
        <Text style={[styles.subContentText]}>{data.w}</Text>
      </View>
      <View style={[styles.LText,addStyle]}>
        <Text style={styles.subContentText}>{data.l}</Text>
      </View>
      <View style={[styles.LText,addStyle]}>
        <Text style={styles.subContentText}>{data.d}</Text>
      </View>
      <View style={[styles.LText,addStyle]}>
        <Text style={styles.subContentText}>{data.f}</Text>
      </View>
      <View style={[styles.LText,addStyle]}>
        <Text style={styles.subContentText}>{data.a}</Text>
      </View>
      <View style={[styles.LText,addStyle]}>
        <Text style={styles.subContentText}>{data.bp}</Text>
      </View>
      <View style={styles.LText}>
        <Text style={styles.subContentText}>{data.pts}</Text>
      </View>
    </View>
  )
}

const NilGroup = (props) => (
  <View style={styles.nilView}>
    <Text style={styles.describeText} numberOfLines={3}>You have successfully created a private league.</Text>
    <Text style={styles.describeText2} numberOfLines={3}>Your league table will be generated within the next 24 hours.</Text>
  </View>
)
class RankingList extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    let { data , title} = this.props
    let arr = []
    if(data.top_five) arr = data.top_five
    if(data.top_twenty) arr = data.top_twenty
    let rolesTextBox = {width : 25}
    if(styleVar.deviceWidth<=320){
      rolesTextBox ={
        width: 18
      }
    }
    return (
      <View style={[styles.container]} >
          <View style={styles.titleView}>
            <Text style={styles.titleText} >{title}</Text>
          </View>

        {
          arr.length===0 ? <NilGroup/> :
            <View style={styles.contentView}>
             <Header addStyle={rolesTextBox}/>
              {
                arr.map((item, index)=> {
                  return (
                    <Content key={index} data={item} index={index} addStyle={rolesTextBox}/>
                  )
                })
              }
          </View>
        }
      </View>
    )
  }
}
export default RankingList
RankingList.propTypes = {
  data: PropTypes.object,
  title:PropTypes.string,
}
RankingList.defaultProps = {
  title:'GLOBAL TOP 5',
}