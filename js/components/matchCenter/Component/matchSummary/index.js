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

class MatchSummary extends Component {

    constructor(props) {
         super(props)
         this.state = {
              h:0
         }
         this.data = [
          {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ', circleColor: '#009688',lineColor:'#009688'},
          {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
          {time: '12:00', title: 'Lunch'},
          {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688'},
          {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'},
          {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'},
          {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'},
          {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'},
          {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'},
          {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'}
        ]
    }
    measurePage(page,event) {
        console.log('measurePage')
        const { x, y, width, height, } = event.nativeEvent.layout
        console.log('page',page)
        console.log('x',x)
        console.log('y',y)
        console.log('width',width)
        console.log('height',height)
        this.setState({h:y+100},()=>{
            if(this.props.isActive) this.props.setHeight(this.state.h)
        })
        
    }
    componentWillReceiveProps(nextProps) {
        console.log('match Summary componentWillReceiveProps nextProps.isActive',nextProps.isActive)
        console.log('match Summary componentWillReceiveProps this.props.isActive',this.props.isActive)
        if(nextProps.isActive&&!this.props.isActive) this.props.setHeight(this.state.h)
    }
    render() {
        return (
                <ScrollView style={{flex: 1,marginTop:50,marginHorizontal:10}} scrollEnabled={false}>
                    <View style={{borderTopLeftRadius:5,borderTopRightRadius:5,backgroundColor:'rgb(255,255,255)',paddingTop:50}}>
                      <LiveBox data={{}} />
                    </View>
                    <Timeline 
                      style={{flex: 1,paddingHorizontal:10,backgroundColor:'rgb(255,255,255)',borderBottomLeftRadius:5,borderBottomRightRadius:5}}
                      data={this.data}
                      circleSize={20}
                      circleColor='rgb(45,156,219)'
                      lineColor='rgb(45,156,219)'
                      timeContainerStyle={{minWidth:52, marginTop: 0}}
                      timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                      descriptionStyle={{color:'gray'}}
                      options={{
                        style:{paddingTop:5},
                        scrollEnabled:false
                      }}
                    />
                    <View onLayout={this.measurePage.bind(this,'matchSummary')} />
              </ScrollView>
        )
    }
}

export default connect(null, null)(MatchSummary)