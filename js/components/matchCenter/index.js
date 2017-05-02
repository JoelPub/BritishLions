'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity,
  ActivityIndicator, ScrollView,NativeModules,DeviceEventEmitter} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import Swiper from 'react-native-swiper'
import theme from '../../themes/base-theme'
import styles from './styles'
import styleVar from '../../themes/variable'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import SquadModal from '../global/squadModal'
import MatchSummary from './Component/matchSummary'
import Momentum from './Component/momentum'
import StadiumFigure from './Component/StadiumFigure'
import SetPlayer from './Component/SetPlayer'
import ManOfTheMatch from './Component/manOfTheMatch'
import OnFire from './Component/OnFire'
import loader from '../../themes/loader-position'
import  SetPlayerDefaultData from './Component/SetPlayer/DefaultData'



class MatchCenter extends Component {

    constructor(props) {
        super(props)
        this._carousel=null
        this.subjects=['MATCH SUMMARY','MOMENTUM','SET PLAYS', 'MAN OF THE MATCH']
        this.state = {
          index:this.props.drillDownItem.page ? this.props.drillDownItem.page: 0 ,
          swiperHeight:0,
          isLoaded:false,
          modalInfo:false,
          statusArray: [1,0,0,0,0]
        }
        this.subscription= null
        this.timer  = null

    }
    iconPress = () => {
    this.setState({modalInfo: !this.state.modalInfo})
    }
    _setHeight(h,source) {
        if (__DEV__)console.log(source,'_setHeight',h)
        this.setState({swiperHeight:h},()=>{this._scrollView.scrollTo({ y: 0, animated: true })})
    }
    updateMadal = () =>{
      this.setState({
        modalInfo: !this.state.modalInfo
      })
    }
    callApi = () => {
      if(this.state.index===0){
        if (__DEV__)console.log('call match summary Api')
        setTimeout(()=>{
          this.state.statusArray[0]=1
          this.setState({
            statusArray: this.state.statusArray
          })
        },6000)
      }
      if(this.state.index===1){
        if (__DEV__)console.log('call momentum Api')
        setTimeout(()=>{
          this.state.statusArray[1]=1
          this.setState({
            statusArray: this.state.statusArray
          })
        },6000)

      }
      if(this.state.index===2){
        if (__DEV__)console.log('call  set Play  Api')
        setTimeout(()=>{
          this.state.statusArray[2]=1
          this.setState({
            statusArray: this.state.statusArray
          })
        },6000)
      }
      if(this.state.index===3){
        if (__DEV__)console.log('call man of the match Api')
        setTimeout(()=>{
          this.state.statusArray[3]=1
          this.setState({
            statusArray: this.state.statusArray
          })
        },6000)
      }
      if(this.state.index===4){
        if (__DEV__)console.log('call man of the match Api')
        setTimeout(()=>{
          this.state.statusArray[4]=1
          this.setState({
            statusArray: this.state.statusArray
          })
        },6000)
      }
    }
    componentDidMount() {
        if(__DEV__)console.log('this.state.isLoaded',this.state.isLoaded)
        setTimeout(()=>{this.setState({isLoaded:true})},1000)
      this.subscription = DeviceEventEmitter.addListener('matchCenter',this.updateMadal);
      this.timer = setInterval(this.callApi,6000)
    }
    componentWillUnmount() {
      this.isUnMounted = true
      this.subscription.remove();
    }
    swiperScrollEnd = (e, state, context) => {
      this.setState({index:state.index})
      this.timer&&clearTimeout(this.timer)
      this.callApi()
      this.timer = setInterval(this.callApi,6000)
    }
    render() {
      let { statusArray } = this.state
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader 
                        back={false} 
                        title={this.subjects[this.state.index]}
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }} scrollEnabled={this.state.index!==0} style={{backgroundColor:'rgb(0,0,0)'}}>
                    {
                        this.state.isLoaded?
                            <Swiper
                                ref='swiper'
                                height={this.state.swiperHeight}
                                loop={false}
                                index={this.state.index}
                                dotColor='rgba(255,255,255,0.3)'
                                activeDotColor='rgb(255,255,255)'
                                paginationStyle={{top:-1*(this.state.swiperHeight-75),position:'absolute'}}
                                onMomentumScrollEnd={this.swiperScrollEnd}>
                              {
                                statusArray[0]!==0 ? <MatchSummary isActive={this.state.index===0} setHeight={this._setHeight.bind(this)} />
                                  : <View />
                              }
                              {
                                statusArray[1]!==0 ? <Momentum  isActive={this.state.index===1} setHeight={this._setHeight.bind(this)}/>
                                  : <View />
                              }
                              {
                                statusArray[2]!==0 ? <SetPlayer  isActive={this.state.index===2} setHeight={this._setHeight.bind(this)}
                                                                 set_plays={SetPlayerDefaultData}/>
                                  : <View />
                              }
                              {
                                statusArray[3]!==0 ? <ManOfTheMatch isActive={this.state.index===3} setHeight={this._setHeight.bind(this)}/>

                                  : <View />
                              }
                              {
                                statusArray[4]!==0 ? <OnFire  isActive={this.state.index===4} setHeight={this._setHeight.bind(this)}/>
                                  : <View />
                              }

                            </Swiper>
                        :
                            <ActivityIndicator style={loader.centered} size='large' />}
                        <LionsFooter isLoaded={true}  />
                    </ScrollView>
                  <SquadModal
                    modalVisible={this.state.modalInfo}
                    callbackParent={this.iconPress}>
                    <ScrollView style={[styles.modalContent]}>
                      <Text style={styles.modalContentTitleText}>MORE INFORMATION</Text>
                      <Text style={styles.modalContentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus sapien ut turpis pretium, tempus dictum ante tincidunt. Proin scelerisque felis tortor. Phasellus blandit velit sem.</Text>
                      <Text style={styles.modalContentText}>Nulla ex neque, mattis sed posuere vel, porttitor id lacus. Nam mauris arcu, commodo et iaculis eu, tristique nec nisi. Aliquam fermentum ligula magna, non rhoncus lorem pulvinar vel.</Text>
                      <Text style={styles.modalContentText}>Suspendisse placerat nulla a sagittis tincidunt.
                        Sed vehicula velit quis placerat dictum. Mauris enim eros, maximus vitae aliquet ac, lacinia eget sapien. Pellentesque iaculis elit imperdiet posuere gravida. Aliquam ut eleifend est. Curabitur eu eros erat. Proin scelerisque felis nec velit pellentesque, vitae sollicitudin justo dapibus. </Text>
                    </ScrollView>
                  </SquadModal>
                    <EYSFooter />
                </View>
            </Container>
        )
    }
}
function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),

  }
}

export default connect((state) => {
  console.log(state.content.drillDownItem)
  return {
    drillDownItem: state.content.drillDownItem,
    netWork: state.network
  }
}, bindAction)(MatchCenter)

