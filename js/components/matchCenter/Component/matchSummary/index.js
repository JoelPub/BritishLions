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
        this.props.setHeight(y,'match summary')
        
    }
    _renderCircle(rowData,sectionID,rowID) {
      return (
        <View style={styles.timeWrapper}>
        <Text style={styles.timeText}>{rowData.time}</Text>
        </View>)
    }
    _onEndReached(){
      console.log('end reached')
      this.props.setEndReached()
    }
    render() {
        return (
                <ScrollView style={styles.scroll} scrollEnabled={false}>
                    <LiveBox data={Object.assign({feededData:true,hasTitle:true,title:this.props.detail.title},this.props.summaryData)}/>
                    <View style={styles.timelineWrapper} >                    
                          <Timeline
                            data={this.props.summaryData.timeline}
                            lineColor='rgb(216,217,218)'
                            timeContainerStyle={{position:'absolute'}}
                            timeStyle={{width:0,height:0}}
                            descriptionStyle={styles.descripton}
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