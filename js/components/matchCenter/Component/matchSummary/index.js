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
                    <LiveBox data={Object.assign({feededData:true,hasTitle:true},this.props.summaryData)}/>
                    <View style={styles.timelineWrapper} >                    
                          <Timeline
                            data={this.props.summaryData.timeline}
                            lineColor='rgb(216,217,218)'
                            timeContainerStyle={{minWidth: 6}}
                            timeStyle={{width:0, height:0}}
                            descriptionStyle={styles.descripton}
                            separator={false}
                            options={{
                              style:{paddingTop:25, marginLeft: 0},
                              scrollEnabled: true,
                              enableEmptySections: true,
                              onEndReached:this._onEndReached.bind(this),
                              onEndReachedThreshold: 15
                            }}
                            renderCircle={this._renderCircle}
                          />            
                    </View>
              </ScrollView>
        )
    }
}

export default connect(null, null)(MatchSummary)