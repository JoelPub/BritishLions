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

class MatchSummary extends Component {

    constructor(props) {
         super(props)
         this.data = [
          {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ', circleColor: '#009688',lineColor:'#009688'},
          {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
          {time: '12:00', title: 'Lunch'},
          {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688'},
          {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'}
        ]
    }
    
    render() {
        return (
            <View style={{flex: 1,marginTop:50,paddingTop:50,marginHorizontal:10,borderRadius:5,backgroundColor:'rgb(255,255,255)'}}>
                <Timeline 
                  style={{flex: 1,margin:10,}}
                  data={this.data}
                  circleSize={20}
                  circleColor='rgb(45,156,219)'
                  lineColor='rgb(45,156,219)'
                  timeContainerStyle={{minWidth:52, marginTop: 0}}
                  timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                  descriptionStyle={{color:'gray'}}
                  options={{
                    style:{paddingTop:5}
                  }}
                />
              </View>
        )
    }
}

export default connect(null, null)(MatchSummary)