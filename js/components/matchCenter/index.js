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
import { service } from '../utility/services'
import _fetch from '../utility/fetch'


class MatchCenter extends Component {

    constructor(props) {
        super(props)
        this._carousel=null
        this.subjects=['MATCH SUMMARY','MOMENTUM','SET PLAYS', 'MAN OF THE MATCH','ONFIRE']
        this.state = {
          index:this.props.drillDownItem.page ? this.props.drillDownItem.page: 0 ,
          swiperHeight:0,
          isLoaded:false,
          modalInfo:false,
          statusArray: [true,false,false,false,false],
          momentumData:null
        }
        this.subscription= null
        this.timer  = null
        this.statusArray=[false,false,false,false,false]
        this.fullTime=80

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
    processMomentumData(data){
        // if(__DEV__)console.log('processMomentumData')
        let result=[]
        for(let i=0;i<this.fullTime;i=i+10){
            let momentum={score_advantage:[],team_momentum:[],isFirst:false,isLast:false,timeMark:0}
            // if(__DEV__)console.log('momentum',momentum)
            if(data.team_momentum.findIndex(x=>{
                return parseInt(x.time)>i&&parseInt(x.time)<=i+10
            })>-1) {
                momentum.team_momentum=data.team_momentum.filter(x=>{
                    return parseInt(x.time)>i&&parseInt(x.time)<=i+10
                })
                momentum.score_advantage=data.score_advantage.filter(x=>{
                    return parseInt(x.time)===i||parseInt(x.time)===i+10
                })
                if (i===0) momentum.isFirst=true
                if(data.team_momentum.findIndex(x=>{return parseInt(x.time)>i+10&&parseInt(x.time)<=i+20})===-1) momentum.isLast=true
                momentum.timeMark=i+10
                result.push(momentum)

            }
            else {
                result.push(null)
            }
        }

        // if(__DEV__)console.log('result',result)
        return result.reverse()

    }
    callApi = () => {
      if(this.state.index===0){
        if (__DEV__)console.log('call match summary Api')
        setTimeout(()=>{
          this.statusArray.fill(false)
          this.statusArray[0]=true
          this.setState({
            statusArray: this.statusArray
          })
        },6000)
      }
      if(this.state.index===1){
        if (__DEV__)console.log('call momentum Api')

          let optionsInfo = {
            url: 'http://bilprod-r4dummyapi.azurewebsites.net/getGameMomentum',
            data: {id:1},
            onAxiosStart: null,
            onAxiosEnd: null,
            method: 'post',
            onSuccess: (res) => {
                // if (__DEV__)console.log('res',res)
                if(res.data) {
                    if (__DEV__)console.log('res.data',res.data)
                        this.statusArray.fill(false)
                        this.statusArray[1]=true
                        let tmp=this.processMomentumData(res.data.momentum)
                        if(__DEV__)console.log('tmp',tmp)
                        this.setState({
                          statusArray: this.statusArray,
                          momentumData:tmp
                        })
                }
            },
            onError: ()=>{
            },
            isRequiredToken: false,
            channel: 'EYC3',
            isQsStringify:false
          }
        if(!this.statusArray[1]) {
          service(optionsInfo) 
        }
        else {
           _fetch({url:'https://api.myjson.com/bins/9zfuh'}).then((json)=>{
                  if(__DEV__)console.log('json',json)
                  let tmp=this.processMomentumData(json.momentum)
                  if(__DEV__)console.log('tmp',tmp)
                  this.setState({
                    statusArray: this.statusArray,
                    momentumData:tmp
                  })
                })
        }

        // setTimeout(()=>{
        //   this.statusArray=[0,0,0,0,0]
        //   this.statusArray[1]=1
        //   this.setState({
        //     statusArray: this.statusArray
        //   })
        // },6000)

      }
      if(this.state.index===2){
        if (__DEV__)console.log('call  set Play  Api')
        setTimeout(()=>{
          this.statusArray.fill(false)
          this.statusArray[2]=true
          this.setState({
            statusArray: this.statusArray
          })
        },6000)

      }
      if(this.state.index===3){
        if (__DEV__)console.log('call man of the match Api')
        setTimeout(()=>{
          this.statusArray.fill(false)
          this.statusArray[3]=true
          this.setState({
            statusArray: this.statusArray
          })
        },6000)
      }
      if(this.state.index===4){
        if (__DEV__)console.log('call man of the match Api')
        setTimeout(()=>{
          this.statusArray.fill(false)
          this.statusArray[4]=true
          this.setState({
            statusArray: this.statusArray
          })
        },6000)
      }
    }
    componentDidMount() {
        if(__DEV__)console.log('this.state.isLoaded',this.state.isLoaded)
        setTimeout(()=>{this.setState({isLoaded:true})},1000)
        this.subscription = DeviceEventEmitter.addListener('matchCenter',this.updateMadal);
        this.timer = setInterval(this.callApi,10000)
    }
    componentWillUnmount() {
      this.isUnMounted = true
      this.subscription.remove();
    }
    swiperScrollEnd = (e, state, context) => {
      this.setState({index:state.index},()=>{        
        this.timer&&clearTimeout(this.timer)
        this.callApi()
        this.timer = setInterval(this.callApi,10000)
      })
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
                                statusArray[0]? <MatchSummary isActive={this.state.index===0} setHeight={this._setHeight.bind(this)} />
                                  : <View style={{height:styleVar.deviceHeight-270,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[0]&&this.state.index===0&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
                              }
                              {
                                statusArray[1] ? <Momentum  setHeight={this._setHeight.bind(this)} momentumData={this.state.momentumData}/>
                                  : <View style={{height:styleVar.deviceHeight-270,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[1]&&this.state.index===1&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
                              }
                              {
                                statusArray[2]? <SetPlayer  isActive={this.state.index===2} setHeight={this._setHeight.bind(this)}
                                                                 set_plays={SetPlayerDefaultData}/>
                                  : <View style={{height:styleVar.deviceHeight-270,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[2]&&this.state.index===2&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
                              }
                              {
                                statusArray[3]? <ManOfTheMatch isActive={this.state.index===3} setHeight={this._setHeight.bind(this)}/>

                                  : <View style={{height:styleVar.deviceHeight-270,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[3]&&this.state.index===3&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
                              }
                              {
                                statusArray[4]? <OnFire  isActive={this.state.index===4} setHeight={this._setHeight.bind(this)}/>
                                  : <View style={{height:styleVar.deviceHeight-270,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[4]&&this.state.index===4&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
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

