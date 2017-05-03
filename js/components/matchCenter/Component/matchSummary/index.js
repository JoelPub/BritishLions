'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import Timeline from 'react-native-timeline-listview'
import LiveBox from '../../../global/liveBox'
import _fetch from '../../../utility/fetch'
import loader from '../../../../themes/loader-position'

class MatchSummary extends Component {

    constructor(props) {
         super(props)
    }
    measurePage(page,event) {
        // if (__DEV__)console.log('measurePage')
        const { x, y, width, height, } = event.nativeEvent.layout
        // if (__DEV__)console.log('page',page)
        // if (__DEV__)console.log('x',x)
        // if (__DEV__)console.log('y',y)
        // if (__DEV__)console.log('width',width)
        // if (__DEV__)console.log('height',height)
        this.props.setHeight(y+50,'match summary')
        
    }
    _renderCircle(rowData,sectionID,rowID) {
      return (
        <View style={{width:50,height:50,backgroundColor:'rgb(255,255,255)',position:'absolute',left:0,borderWidth:1,borderColor:'rgb(216,217,218)',borderRadius:25,justifyContent:'center'}}>
        <Text style={{fontSize:17,fontFamily:styleVar.fontCondensed,color:'rgb(175,0,30)',textAlign: 'center'}}>{rowData.time}</Text>
        </View>)
    }
    _onEndReached(){
      console.log('end reached')
      this.props.setEndReached('extend')
    }
    render() {
        return (
                <ScrollView style={{marginTop:50}} scrollEnabled={false}>
                    <View style={{backgroundColor:'rgb(255,255,255)',paddingTop:5}}>
                      <LiveBox data={{}} />
                    </View>
                    <View style={{height:styleVar.deviceHeight-470,paddingHorizontal:10,backgroundColor:'rgb(255,255,255)'}} >                    
                          <Timeline
                            data={this.props.summaryData}
                            lineColor='rgb(216,217,218)'
                            timeContainerStyle={{position:'absolute'}}
                            timeStyle={{width:0,height:0}}
                            descriptionStyle={{color:'rgb(38,38,38)',fontSize:14,lineHeight:16,fontFamily:styleVar.fontGeorgia,marginLeft:20}}
                            separator={false}
                            options={{
                              style:{paddingTop:5},
                              scrollEnabled:true,
                              enableEmptySections:true,
                              onEndReached:this._onEndReached.bind(this),
                              onEndReachedThreshold:30
                            }}
                            renderCircle={this._renderCircle}
                          />            
                    </View>
                    <View onLayout={this.measurePage.bind(this,'matchSummary')} />

              </ScrollView>
        )
    }
}

export default connect(null, null)(MatchSummary)