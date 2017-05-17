'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules,DeviceEventEmitter} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import MomentumTracker from '../../../utility/momentumTracker'
import Fixture from '../../../utility/fixture'
import LiveBox from '../../../global/liveBox'
import loader from '../../../../themes/loader-position'
import _fetch from '../../../utility/fetch'

class Momentum extends Component {

    constructor(props) {
         super(props)
    }
    measurePage(page,event) {
        // if (__DEV__)console.log('momentum')
        const { x, y, width, height, } = event.nativeEvent.layout
        // if (__DEV__)console.log('page',page)
        // if (__DEV__)console.log('x',x)
        // if (__DEV__)console.log('y',y)
        // if (__DEV__)console.log('width',width)
        // if (__DEV__)console.log('height',height)
        let h=y+530>styleVar.deviceHeight-345?y+530:styleVar.deviceHeight-345
        this.props.setHeight(h,'momentum')
        
    }
    iconPress = () =>{
        DeviceEventEmitter.emit('matchCenter', 'moment');
    }
    render() {
        return (
                <View style={styles.wrapper}>
                    <LiveBox data={Object.assign({feededData:true,hasTitle:true,title:this.props.detail.title},this.props.data)} />
                    <View style={styles.container}>
                        <View style={styles.subjectWrapper}>
                            <View style={styles.subWrapper}>
                                <View style={styles.scoreSign} />
                                <Text style={styles.subjectText}> SCORE ADVANTAGE</Text>
                            </View>
                            <View style={styles.iconWrapper}>
                                <ButtonFeedback onPress={this.iconPress} >
                                    <Icon name='ios-information-circle-outline' style={styles.icon} />
                                </ButtonFeedback>
                            </View>
                        </View>
                        <View style={styles.subjectWrapper}>
                            <View style={styles.subWrapper}>
                                    <View style={{height:50,width:50,borderWidth:1,borderColor:'rgb(216,217,218)',}}>
                                        <Image resizeMode='contain'  source={require('../../../../../contents/my-lions/squadLogo.png')} style={{width:40,height:40,margin:5}}/>
                                    </View>
                                    <View style={{height:50,width:100,backgroundColor:'rgb(175,0,30)',justifyContent:'center'}}>
                                        <Text style={{fontSize:18,lineHeight:20,fontFamily:styleVar.fontCondensed,textAlign:'center'}}>RUN OF PLAY</Text>
                                    </View>
                            </View>
                            <View style={styles.subWrapper}>
                                    <View style={{height:50,width:100,backgroundColor:'rgb(0,0,0)',justifyContent:'center'}}>
                                        <Text style={{fontSize:18,lineHeight:20,fontFamily:styleVar.fontCondensed,textAlign:'center'}}>RUN OF PLAY</Text>
                                    </View>
                                    <View style={{height:50,width:50,borderWidth:1,borderColor:'rgb(216,217,218)'}}>
                                        <Image resizeMode='contain' source={{uri: this.props.data.opposition_image}}  style={{width:40,height:40,margin:5}}/>
                                    </View>
                            </View>
                        </View>
                        <View style={{borderTopWidth:1,borderColor:'rgb(216,217,218)'}}>
                            {
                                this.props.data.momentum.map((value,index)=>{
                                    return (
                                        <View key={index} >
                                            {value!==null?
                                                <MomentumTracker data={value} isHost={false}/>
                                                :
                                                null
                                            }
                                        </View>
                                        )
                                    })
                            }
                            
                            <View onLayout={this.measurePage.bind(this,'momentum')} />
                        </View>
                    </View>
                </View>
        )
    }
}

export default connect(null, null)(Momentum)