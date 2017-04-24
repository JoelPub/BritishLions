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


import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Scoreboard from './Components/Scoreboard'
import SetPlayerTabBar from  './Components/SetPlayerTabBar'


const  IconHeader = ({onPress}) => {
  return (
    <View style={{flexDirection:'row-reverse'}} >
      <ButtonFeedback style={{width:30}} >
        <Icon name='ios-information-circle-outline' style={{color: styleVar.colorScarlet,fontSize: 22,lineHeight: 22}} />
      </ButtonFeedback>
    </View>
  )
}

class SetPlayer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      h:0
    }
  }
  componentWillReceiveProps(nextProps) {
    if (__DEV__)console.log('momentum componentWillReceiveProps nextProps.isActive',nextProps.isActive)
    if (__DEV__)console.log('momentum componentWillReceiveProps this.props.isActive',this.props.isActive)
    if(nextProps.isActive&&!this.props.isActive) this.props.setHeight(this.state.h)
  }
  measurePage(page,event) {
    if (__DEV__)console.log('setPlayer')
    const { x, y, width, height, } = event.nativeEvent.layout
    if (__DEV__)console.log('page',page)
    if (__DEV__)console.log('x',x)
    if (__DEV__)console.log('y',y)
    if (__DEV__)console.log('width',width)
    if (__DEV__)console.log('height',height)
    this.setState({h:y-110})
  }
  render() {

    return (
      <View style={{marginTop:50,paddingTop:10,marginHorizontal:10,borderRadius:5,backgroundColor:'rgb(255,255,255)',  flex: 1,}}
      >
        <ScrollableTabView
          locked={true}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          initialPage={0}
          renderTabBar={() => <SetPlayerTabBar />}
          tabBarActiveTextColor={'black'}
        >
         <View tabLabel='KICKS'>
           <IconHeader />
           <View style={styles.itemContainer}  >
             <StadiumFigure />
             <View style={styles.rightContainer}>
               <Scoreboard isWithProportion={true}/>
               <Scoreboard isWithProportion={true} isDown={true}/>
             </View>
           </View>
         </View>
         <View tabLabel='SCRUMS'>
           <IconHeader />
            <View style={styles.itemContainer}  >
              <StadiumFigure />
              <View style={styles.rightContainer}>
                <Scoreboard />
                <Scoreboard isDown={true}/>
              </View>
            </View>
         </View>
          <View tabLabel='LINEOUTS'>
            <IconHeader />
            <View style={styles.itemContainer}  >
              <StadiumFigure />
              <View style={styles.rightContainer}>
                <Scoreboard />
                <Scoreboard isDown={true}/>
              </View>
            </View>
          </View>
        </ScrollableTabView>
        <View onLayout={this.measurePage.bind(this,'setPlayer')} />
      </View>
    )
  }
}

export default SetPlayer