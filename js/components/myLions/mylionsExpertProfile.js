

'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView} from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import Swiper from 'react-native-swiper'

import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import styleVar from '../../themes/variable'

import LionsHeader from '../global/lionsHeader'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import { replaceRoute, pushNewRoute } from '../../actions/route'
import RatingCardView from './components/RatingCardView'
import ExpertCard from './components/ExpertCard'

import imageJameshaskel from '../../../contents/my-lions/players/jameshaskell.png'

import { drillDown } from '../../actions/content'
import { globalNav } from '../../appNavigator'


const PosTitle = ({squadData,title}) => (
  <View style={styles.posTitle}>
    <Text style={styles.posTitleLeft}>{title}</Text>
    <Text style={styles.posTitleRight}>
      {squadData.backs.filter((value)=>value!==null).length} / 16
    </Text>
  </View>
)
const ExpertsHeaderView = () => (
  <LinearGradient colors={['#AF001E', '#820417']} style={styles.viewExpertHeader}>
    <Image style={styles.viewExpertHeaderImage} source={imageJameshaskel} />
    <View style={styles.headerPlayerDetails}>
      <Text style={styles.viewExpertProfileName}>JAMES HASKELL</Text>
    </View>
    <View style={styles.headerPlayerDetails}>
      <Text style={styles.viewExpertProfileDescription}>Lorem ipsum dolor sit amet, consectetur.</Text>
    </View>
  </LinearGradient>
)
class MyLionsExpertProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      jobTitle: ['CAPTAIN','KICKER','WILDCARD'],
      squadData:{
        indivPos:[{position:'captain',id:123},{position:'kicker',id:null},{position:'wildcard',id:123}],
        forwards:[123,123,123,123,123,123,123,313,3123,31,13,12,312,31,321,312],
        backs:[123,123,123,123,123,123,21,21,312,312,31,3123,31,321,31,312],
      }
    };
  }
  _mapJSON(data, colMax = 2) {
    let i = 0
    let k = 0
    let newData = []
    let items = []
    let length = data.length

    for( i = 0; i <data.length; (i += colMax)) {
      for( k = 0; k < colMax; k++ ) {
        if(data[i + k]!==undefined)
          items.push(data[i + k])
      }

      newData.push(items)
      items = []
    }
    return newData
  }
  ratingViewClick = () => {
    console.log('icon被点击')
  }
  changeMode = () => {
    console.log('ratingView被点击')
  }

  render() {
    let {jobTitle, squadData} = this.state
    return (
      <Container theme={theme}>
        <View style={styles.container}>
          <LionsHeader back={true} title='MY LIONS' />
          <ScrollView>
            <ExpertsHeaderView />
            <RatingCardView onPress={this.ratingViewClick} changeMode={this.changeMode}/>
            <View style={styles.individaulPositionRow}>
              {
                jobTitle.map((item,index)=>{
                  return (
                    <ExpertCard data={item} key={index} hasTitle={true}/>
                  )
                })
              }
            </View>
            <PosTitle squadData={squadData} title={'FORWARDS'} />
            <Swiper
              ref='swiper'
              height={220}
              loop={false}
              dotColor='rgba(255,255,255,0.3)'
              activeDotColor='rgb(239,239,244)'>
              {
                this._mapJSON(squadData.forwards,3).map((rowData,index)=>{
                  return (
                    <View style={styles.posSwiperRow} key={index}>
                      {
                        rowData.map((expert,i)=>{
                          return( <ExpertCard data={expert} key={i}/>)
                        })
                      }
                    </View>
                  )
                })
              }
            </Swiper>
            <PosTitle squadData={squadData} title={'BACKS'} />
            <Swiper
              ref='swiper'
              height={220}
              loop={false}
              dotColor='rgba(255,255,255,0.3)'
              activeDotColor='rgb(239,239,244)'>
              {
                this._mapJSON(squadData.backs,3).map((rowData,index)=>{
                  return (
                    <View style={styles.posSwiperRow} key={index}>
                      {
                        rowData.map((expert,i)=>{
                          return( <ExpertCard data={expert} key={i}/>)
                        })
                      }
                    </View>
                  )
                })
              }
            </Swiper>
            <LionsFooter isLoaded={true} />
          </ScrollView>
        </View>
      </Container>
    )
  }
}

function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),
    replaceRoute:(route)=>dispatch(replaceRoute(route)),
  }
}

export default connect((state) => {
  return {
    route: state.route,
  }
}, bindAction)(MyLionsExpertProfile)
