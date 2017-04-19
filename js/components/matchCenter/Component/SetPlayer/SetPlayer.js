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

class SetPlayer extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <View style={{marginTop:50,paddingTop:10,marginHorizontal:10,borderRadius:5,backgroundColor:'rgb(255,255,255)',  flex: 1,}}>
        <ScrollableTabView
          locked={true}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
          tabBarActiveTextColor={'black'}
        >
          <View style={styles.itemContainer} tabLabel='KICKS' >
            <StadiumFigure />
            <View style={{width:styleVar.deviceWidth-200-30}}>
              <Scoreboard isWithProportion={true}/>
              <Scoreboard isWithProportion={true} isDown={true}/>
            </View>
          </View>
          <View style={styles.itemContainer} tabLabel='SCRUMS' >
            <StadiumFigure />
            <View style={{width:styleVar.deviceWidth-200-30}}>
              <Scoreboard />
              <Scoreboard isDown={true}/>
            </View>
          </View>
          <View style={styles.itemContainer} tabLabel='LINEOUTS' >
            <StadiumFigure />
            <View style={{width:styleVar.deviceWidth-200-30}}>
              <Scoreboard />
              <Scoreboard isDown={true}/>
            </View>
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}

export default SetPlayer