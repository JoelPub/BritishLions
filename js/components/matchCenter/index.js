'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity,
  ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import Swiper from 'react-native-swiper'
import theme from '../../themes/base-theme'
import styles from './styles'
import styleVar from '../../themes/variable'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import MatchSummary from './Component/matchSummary'
import Momentum from './Component/momentum'
import StadiumFigure from './Component/StadiumFigure'
import SetPlayer from './Component/SetPlayer'
import ManOfTheMatch from './Component/manOfTheMatch'
import Team from './Component/team'
import OnFire from './Component/OnFire'
import loader from '../../themes/loader-position'
import { service } from '../utility/services'
import _fetch from '../utility/fetch'
import  { actions  as apiActions } from '../utility/matchApiManger/matchApiManger'
import { setMatchMan, getMatchMan } from '../utility/asyncStorageServices'
import { strToLower } from '../utility/helper'

class MatchCenter extends Component {

    constructor(props) {
        super(props)
        this._carousel=null
        this.subjects=['MATCH SUMMARY','RUN OF PLAY','SET PLAYS','TOP LIONS', 'MAN OF THE MATCH','GAME DAY TEAM']
        this.state = {
          detail:this.props.drillDownItem,
          index:this.props.drillDownItem&&this.props.drillDownItem.page ? this.props.drillDownItem.page: 0 ,
          swiperHeight:styleVar.deviceHeight-270,
          isLoaded:false,
          statusArray: [false,false,false,false,false,false],
          momentumData:{},
          summaryData:{timeline:[]},
          setPlayerData: [],
          onFireData:{onFire:null},
          subPage:'landing',
          scrollEnabled:true
        }
        this._scrollView = ScrollView
        this.timer  = null
        this.statusArray=[false,false,false,false,false,false]

    }
    _setHeight(h,source) {
        if (__DEV__)console.log(source,'_setHeight',h)
        this.setState({swiperHeight:h},()=>{this._scrollView.scrollTo({ y: 0, animated: true })})
    }
    _setSubPage(page) {
      if(__DEV__)console.log('_setSubPage',page)      
      this.setState({subPage:page})
    }
    pullHistorySummary(){
        let optionData={}
        let type='extend'
        if(__DEV__)console.log('pullHistorySummary')
        if(this.state.summaryData.timeline&&this.state.summaryData.timeline.length>0) {
          optionData={id:this.state.detail.id,"sequenceId" : this.state.summaryData.timeline[this.state.summaryData.timeline.length-1].seq}
        }
        else {
          optionData={id:this.state.detail.id}
        }
        
        apiActions.getTimeLineLiveSummary(optionData,type,this.state.summaryData,(timelineData)=>{
                      if (__DEV__)console.log('extend timelineData',timelineData)
                      this.statusArray.fill(false)
                      this.statusArray[0]=true
                      let summaryData=this.state.summaryData
                      summaryData.timeline=timelineData
                      this.setState({
                        statusArray: this.statusArray,
                        summaryData:summaryData
                      })
        },(error)=>{
        })
    }

    callApi = () => {
      if (__DEV__)console.log('gameID',this.state.detail.id)

      if(this.state.index===0){
        this.setState({swiperHeight:styleVar.deviceHeight-120})
        if (__DEV__)console.log('@@@call match summary Api',this.state.summaryData)
        let optionData={}
        let type='init'
        // if(!this.statusArray[0]) {
        optionData={id:this.state.detail.id}
        // }
        // else {
        //   optionData={id:this.state.detail.id,"sequenceId" : this.state.summaryData.timeline[this.state.summaryData.timeline.length-1].seq}
        //   type='refresh'
        // }
        apiActions.getTimeLineLiveSummary(optionData,type,this.state.summaryData,(timelineData)=>{
                      if (__DEV__)console.log('init timelineData',timelineData)
                      this.statusArray.fill(false)
                      this.statusArray[0]=true
                      apiActions.getGameMomentum('time',this.state.detail.id,(data)=>{                               
                          this.setState({
                            statusArray: this.statusArray,
                            summaryData:Object.assign(data,this.state.detail,{timeline:timelineData})
                          },()=>{
                            if(__DEV__)console.log('data.is_full_time',data.is_full_time)
                            if(strToLower(data.is_full_time)==='true') this.timer&&clearTimeout(this.timer)
                          })     
                      },(error)=>{
                      })
        },(error)=>{
        })
      }
      if(this.state.index===1){
        if (__DEV__)console.log('call momentum Api')
        apiActions.getGameMomentum('momentum',this.state.detail.id,(data)=>{
                    this.statusArray.fill(false)
                    this.statusArray[1]=true
                    this.setState({
                      statusArray: this.statusArray,
                      momentumData:Object.assign(data,this.state.detail)
                    },()=>{
                            if(__DEV__)console.log('data.is_full_time',data.is_full_time)
                            if(strToLower(data.is_full_time)==='true') this.timer&&clearTimeout(this.timer)
                          }
                        )
        },(error)=>{
        })
      }
      if(this.state.index===2){
        if (__DEV__)console.log('@@@call  set Play  Api')
        if (__DEV__)console.log(apiActions)
        apiActions.getGameSetPlays(this.state.detail.id,(json)=>{
            this.statusArray.fill(false)
            this.statusArray[2]=true
            this.setState({
              setPlayerData:json.data,
              statusArray: this.statusArray
            })
        },(error)=>{
        })
      }
      if(this.state.index===3){
        if (__DEV__)console.log('@@@on fire Api')
        apiActions.getGameOnFire(this.state.detail.id,(json)=>{
          this.statusArray.fill(false)
          this.statusArray[3]=true
          this.setState({
            onFireData:json.data,
            statusArray: this.statusArray
          })
        },(error)=>{

        })

      }
      if(this.state.index===4){
        if (__DEV__)console.log('@@@call man of the match Api')
        setTimeout(()=>{
          if (this.state.detail.post!==null) {
            this.setState({subPage:'final'},()=>{              
              this.statusArray.fill(false)
              this.statusArray[4]=true
              this.setState({
                statusArray: this.statusArray
              })
            })
          }
          else {
            getMatchMan().then((data)=>{
              let player=JSON.parse(data)
              if(__DEV__)console.log('index getMatchMan player',player)
              let subPage=this.state.subPage
              if(__DEV__)console.log('subPage',subPage)
              if(Array.isArray(player)&&(player.findIndex(v=>v.id===this.state.detail.id&&v.current!==null)>-1)) {
                subPage='post'
              }
              else {
                subPage='landing'
              }
              if(__DEV__)console.log('subPage',subPage)
              this.setState({subPage:subPage},()=>{              
                  this.statusArray.fill(false)
                  this.statusArray[4]=true
                  this.setState({
                    statusArray: this.statusArray
                  })
                })

            })
          }
        },2000)
      }
      if(this.state.index===5){
        if (__DEV__)console.log('@@@call team Api')
        setTimeout(()=>{
              this.statusArray.fill(false)
              this.statusArray[5]=true
              this.setState({
                statusArray: this.statusArray
              })
        },2000)
      }
    }
    componentDidMount() {
        if(__DEV__)console.log('@@@matchCenter componentDidMount this.state.detail',this.state.detail)
        setTimeout(()=>{this.setState({isLoaded:true},()=>{
            this.callApi()
            if(this.state.index<4&&this.state.detail.live!==null) this.timer = setInterval(this.callApi,120000)
        })},500)
        
    }
    componentWillUnmount() {
      if(__DEV__)console.log('@@@matchCenter componentWillUnmount')
      this.timer&&clearTimeout(this.timer)
    }
    swiperScrollEnd = (e, state, context) => {
      if(__DEV__)console.log('@@@matchCenter swiperScrollEnd')
      this.timer&&clearTimeout(this.timer)
      this.statusArray.fill(false)
      this.setState({index:state.index,statusArray: this.statusArray,scrollEnabled:false},()=>{
        let i=this.state.index
        setTimeout(()=>{
          if(__DEV__)console.log('@@@i',i)
          if(__DEV__)console.log('@@@this.state.index',this.state.index)
          if(i===this.state.index) {
            this.setState({
              momentumData:{},
              summaryData:{timeline:[]},
              setPlayerData: [],
              onFireData:{onFire:null},
              scrollEnabled:true
            },()=>{
              this.callApi()
              if(this.state.index<4&&this.state.detail.live!==null) this.timer = setInterval(this.callApi,120000)              
            })
          }
          else {
            this.timer&&clearTimeout(this.timer)
          }
        },1000)
        
      })
    }
    render() {
      let { statusArray ,setPlayerData,onFireData} = this.state
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader 
                        back={true} 
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
                                onMomentumScrollEnd={this.swiperScrollEnd}
                                scrollEnabled={this.state.scrollEnabled}>
                              {
                                statusArray[0]? <MatchSummary detail={this.state.detail} setHeight={this._setHeight.bind(this)} summaryData={this.state.summaryData} setEndReached={this.pullHistorySummary.bind(this)}/>
                                  : <View style={{height:this.state.swiperHeight,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[0]&&this.state.index===0?
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                        :
                                        null
                                      }
                                    </View>
                              }
                              {
                                statusArray[1] ? <Momentum detail={this.state.detail}  setHeight={this._setHeight.bind(this)} data={this.state.momentumData}/>
                                  : <View style={{height:this.state.swiperHeight,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[1]&&this.state.index===1&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
                              }
                              {
                                statusArray[2]? <SetPlayer  detail={this.state.detail} isActive={this.state.index===2} setHeight={this._setHeight.bind(this)}
                                                                 set_plays={setPlayerData.set_plays} />
                                  : <View style={{height:styleVar.deviceHeight-270,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[2]&&this.state.index===2?
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                        :
                                        null
                                      }
                                    </View>
                              }
                              {
                                statusArray[3]? <OnFire  detail={this.state.detail} isActive={this.state.index===3}
                                                         setHeight={this._setHeight.bind(this)}
                                                         on_fire={onFireData.on_fire} 
                                />
                                  : <View style={{height:this.state.swiperHeight,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[3]&&this.state.index===3?
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                        :
                                        null
                                      }
                                    </View>
                              }
                              {
                                statusArray[4]? <ManOfTheMatch detail={this.state.detail} setHeight={this._setHeight.bind(this)} subPage={this.state.subPage} setSubPage={this._setSubPage.bind(this)}/>

                                  : <View style={{height:this.state.swiperHeight,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[4]&&this.state.index===4?
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                        :
                                        null
                                      }
                                    </View>
                              }
                              {
                                statusArray[5]? <Team detail={this.state.detail} setHeight={this._setHeight.bind(this)}/>

                                  : <View style={{height:this.state.swiperHeight,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[5]&&this.state.index===5?
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                        :
                                        null
                                      }
                                    </View>
                              }

                            </Swiper>
                        :
                            <ActivityIndicator style={loader.centered} size='large' />}
                            {

                                !statusArray[0]&&<LionsFooter isLoaded={true}  />
                            }
                    </ScrollView>
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
  if(__DEV__)console.log(state.content.drillDownItem)
  return {
    drillDownItem: state.content.drillDownItem,
    netWork: state.network
  }
}, bindAction)(MatchCenter)

