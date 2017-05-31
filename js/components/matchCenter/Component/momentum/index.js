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
import SquadModal from '../../../global/squadModal'

class Momentum extends Component {

    constructor(props) {
         super(props)
         this.state={
            modalInfo:false,
            config:{
                isHost:false,
                sRadius:0,
                dotWidth:2,
                dotLen:4  
            }
            
        }
    }
    measurePage(page,event) {
        // if (__DEV__)console.log('momentum')
        const { x, y, width, height, } = event.nativeEvent.layout
        // if (__DEV__)console.log('page',page)
        // if (__DEV__)console.log('x',x)
        // if (__DEV__)console.log('y',y)
        // if (__DEV__)console.log('width',width)
        // if (__DEV__)console.log('height',height)
        let h=y+330>styleVar.deviceHeight-345?y+330:styleVar.deviceHeight-345
        this.props.setHeight(h,'momentum')
        
    }
    iconPress = () =>{
        this.setState({modalInfo: !this.state.modalInfo,modalAble:false},()=>{
            setTimeout(()=>this.setState({modalAble:true}),500)
          })
    }    
    componentWillReceiveProps(nextProps,nextState) {
        if (__DEV__)console.log('!!!momentum componentWillReceiveProps')
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
                        <View style={[styles.subjectWrapper,styles.topLine]}>
                            <View style={styles.subWrapper}>
                                    <View style={styles.logoWrapper}>
                                        <Image resizeMode='contain'  source={this.state.config.isHost?require('../../../../../contents/my-lions/squadLogo.png'):{uri: this.props.data.opposition_image}} style={styles.logoImg}/>
                                    </View>
                                    <View style={[styles.textWrapper,this.state.config.isHost?styles.redBgc:styles.blackBgc]}>
                                        <Text style={styles.logoText}>RUN OF PLAY</Text>
                                    </View>
                            </View>
                            <View style={styles.subWrapper}>
                                    <View style={[styles.textWrapper,this.state.config.isHost?styles.blackBgc:styles.redBgc]}>
                                        <Text style={styles.logoText}>RUN OF PLAY</Text>
                                    </View>
                                    <View style={styles.logoWrapper}>
                                        <Image resizeMode='contain' source={this.state.config.isHost?{uri: this.props.data.opposition_image}:require('../../../../../contents/my-lions/squadLogo.png')}  style={styles.logoImg}/>
                                    </View>
                            </View>
                        </View>
                        <View style={styles.momentumWrapper}>
                            {
                                Array.isArray(this.props.data.momentum)&&this.props.data.momentum.map((value,index)=>{
                                    return (
                                        <View key={index} >
                                            {value!==null?
                                                <MomentumTracker data={value} config={this.state.config}/>
                                                :
                                                null
                                            }
                                        </View>
                                        )
                                    })
                            }
                            
                            <View style={styles.bottomLine} onLayout={this.measurePage.bind(this,'momentum')} />
                        </View>
                    </View>
                  <SquadModal
                    modalVisible={this.state.modalInfo}
                    callbackParent={this.iconPress}>
                    <ScrollView style={[styles.modalContent]}>
                          <View>
                              <Text style={styles.modalContentTitleText}>MORE INFORMATION</Text>
                              <Text style={styles.modalContentText}>Run of Play is a calculation based on territory, possession, metres gained and attacking plays in the opposition’s half. If a row has more red, the Lions are considered to have the Run of Play for that time period. The yellow line indicates the score difference between the two teams.</Text>
                          </View>
                    </ScrollView>
                  </SquadModal>
                </View>
        )
    }
}

export default connect(null, null)(Momentum)