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
         this.state = {
              h:0,
              data:[],
              isLoaded:false
         }
         this.data = [
          {"time": "54MIN", "description": "The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. "},
          {"time": "52MIN", "description": "Badminton is a racquet sport played using racquets to hit a shuttlecock across a net."},
          {"time": "49MIN", "description": "Team sport played between two teams of eleven players with a spherical ball. "},
          {"time": "484MIN", "description": "Look out for the Best Gym & Fitness Centers around me :)"},
          {"time": "47MIN", "description": "Look out for the Best Gym & Fitness Centers around me :)"},
          {"time": "45MIN", "description": "Look out for the Best Gym & Fitness Centers around me :)"},
          {"time": "43MIN", "description": "Look out for the Best Gym & Fitness Centers around me :)"},
          {"time": "40MIN", "description": "Look out for the Best Gym & Fitness Centers around me :)"},
          {"time": "38MIN", "description": "Look out for the Best Gym & Fitness Centers around me :)"}
        ]
    }
    measurePage(page,event) {
        // if (__DEV__)console.log('measurePage')
        const { x, y, width, height, } = event.nativeEvent.layout
        // if (__DEV__)console.log('page',page)
        // if (__DEV__)console.log('x',x)
        // if (__DEV__)console.log('y',y)
        // if (__DEV__)console.log('width',width)
        // if (__DEV__)console.log('height',height)
        this.setState({h:y+50},()=>{
            if(this.props.isActive) this.props.setHeight(this.state.h,'match summary')
        })
        
    }
    componentWillReceiveProps(nextProps) {
        // if (__DEV__)console.log('match Summary componentWillReceiveProps nextProps.isActive',nextProps.isActive)
        // if (__DEV__)console.log('match Summary componentWillReceiveProps this.props.isActive',this.props.isActive)
        if(nextProps.isActive&&!this.props.isActive) this.props.setHeight(this.state.h,'match summary')
    }
    _renderCircle(rowData,sectionID,rowID) {
      return (
        <View style={{width:50,height:50,backgroundColor:'rgb(255,255,255)',position:'absolute',left:0,borderWidth:1,borderColor:'rgb(216,217,218)',borderRadius:25,justifyContent:'center'}}>
        <Text style={{fontSize:17,fontFamily:styleVar.fontCondensed,color:'rgb(175,0,30)',textAlign: 'center'}}>{rowData.time}</Text>
        </View>)
    }
    componentDidMount(){
        _fetch({url:'https://api.myjson.com/bins/uyosz'}).then((json)=>{
          // if(__DEV__)console.log('json',json)
          this.setState({data:json,isLoaded:true})

        }).catch((error)=>{
            // if (__DEV__)console.log(error)
        })

        setTimeout(()=>{
          this.setState({isLoaded:false},()=>{
            _fetch({url:'https://api.myjson.com/bins/xvxdv'}).then((json)=>{
              // if(__DEV__)console.log('json',json)
              this.setState({data:json,isLoaded:true})
            }).catch((error)=>{
                // if (__DEV__)console.log(error)
            })
          })
        },10000)
    }
    render() {
        return (
            <View>
            {
                this.props.isActive?
                <ScrollView style={{marginTop:50}} scrollEnabled={false}>
                    <View style={{backgroundColor:'rgb(255,255,255)',paddingTop:5}}>
                      <LiveBox data={{}} />
                    </View>
                    <View style={{height:styleVar.deviceHeight-470,paddingHorizontal:10,backgroundColor:'rgb(255,255,255)'}} >
                    {
                        this.state.isLoaded?
                          <Timeline
                            data={this.state.data}
                            lineColor='rgb(216,217,218)'
                            timeContainerStyle={{position:'absolute'}}
                            timeStyle={{width:0,height:0}}
                            descriptionStyle={{color:'rgb(38,38,38)',fontSize:14,lineHeight:16,fontFamily:styleVar.fontGeorgia,marginLeft:20}}
                            separator={false}
                            options={{
                              style:{paddingTop:5},
                              scrollEnabled:true,
                              enableEmptySections:true
                            }}
                            renderCircle={this._renderCircle}
                          />
                        :
                            <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                    }                    
                    </View>
                    <View onLayout={this.measurePage.bind(this,'matchSummary')} />

              </ScrollView>
                :
                null
            }
            </View>
        )
    }
}

export default connect(null, null)(MatchSummary)