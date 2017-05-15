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
import OnFire from './Component/OnFire'
import loader from '../../themes/loader-position'
import { service } from '../utility/services'
import _fetch from '../utility/fetch'
import  { actions  as apiActions } from '../utility/matchApiManger/matchApiManger'
import { setMatchMan, getMatchMan } from '../utility/asyncStorageServices'

class MatchCenter extends Component {

    constructor(props) {
        super(props)
        this._carousel=null
        this.subjects=['MATCH SUMMARY','SET PLAYS','ON FIRE', 'MAN OF THE MATCH']
        this.state = {
          detail:this.props.drillDownItem,
          index:this.props.drillDownItem&&this.props.drillDownItem.page ? this.props.drillDownItem.page: 0 ,
          swiperHeight:styleVar.deviceHeight-270,
          isLoaded:false,
          statusArray: [false,false,false,false],
          momentumData:{},
          summaryData:{timeline:[]},
          setPlayerData: [],
          onFireData:null,
          subPage:'landing'
        }
        this.timer  = null
        this.statusArray=[false,false,false,false]

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
      // _fetch({url:'https://api.myjson.com/bins/q1z31'}).then((res)=>{
      //           if(__DEV__)console.log('res',res)
      //           if(res) {
      //             let tmp=this.state.summaryData
      //             res.map((value,index)=>{
      //               tmp.timeline.push({seq:tmp.timeline.length+1,time:value.gameTime,description:value.eventString})
      //             })
      //             if(__DEV__)console.log('tmp',tmp)
      //             this.setState({
      //               summaryData:tmp
      //             })
      //           }
      //     })
        let optionData={}
        let type='extend'
        // if(!this.statusArray[0]) {
        optionData={id:this.state.detail.id,"sequenceId" : this.state.summaryData.timeline[this.state.summaryData.timeline.length-1].seq}
        // }
        // else {
        //   optionData={id:this.state.detail.id,"sequenceId" : this.state.summaryData.timeline[this.state.summaryData.timeline.length-1].seq}
        //   type='refresh'
        // }
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
      if(this.state.index===0){
        this.setState({swiperHeight:styleVar.deviceHeight-120})
        if (__DEV__)console.log('call match summary Api',this.state.summaryData)
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
                          })     
                      },(error)=>{
                      })
        },(error)=>{
        })
      }
      if(this.state.index===1){
        if (__DEV__)console.log('call  set Play  Api')
        if (__DEV__)console.log(apiActions)
        apiActions.getGameSetPlays(this.state.detail.id,(json)=>{
            this.statusArray.fill(false)
            this.statusArray[1]=true
            this.setState({
              setPlayerData:json.data,
              statusArray: this.statusArray
            })
        },(error)=>{
        })
      }
      if(this.state.index===2){
        if (__DEV__)console.log('on fire Api')
        apiActions.getGameOnFire(this.state.detail.id,(json)=>{
          this.statusArray.fill(false)
          this.statusArray[2]=true
          this.setState({
            onFireData:json.data,
            statusArray: this.statusArray
          })
        },(error)=>{

        })

      }
      if(this.state.index===3){
        if (__DEV__)console.log('call man of the match Api')
        setTimeout(()=>{
          if (this.state.detail.post!==null) {
            this.setState({subPage:'final'},()=>{              
              this.statusArray.fill(false)
              this.statusArray[3]=true
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
                  this.statusArray[3]=true
                  this.setState({
                    statusArray: this.statusArray
                  })
                })

            })
          }
        },2000)
      }
    }
    componentDidMount() {
        if(__DEV__)console.log('matchCenter componentDidMount this.state.detail',this.state.detail)
        setTimeout(()=>{this.setState({isLoaded:true},()=>{
            this.callApi()
            if(this.state.index!==3) this.timer = setInterval(this.callApi,30000)
        })},500)
        
    }
    componentWillUnmount() {
      this.timer&&clearTimeout(this.timer)
    }
    swiperScrollEnd = (e, state, context) => {
      this.setState({index:state.index},()=>{
        this.timer&&clearTimeout(this.timer)
        setTimeout(()=>{
          this.callApi()
          if(this.state.index!==3) this.timer = setInterval(this.callApi,10000)
        },1000)
        
      })
    }
    render() {
      let { statusArray ,setPlayerData,onFireData,modalInfo} = this.state
      let modalAble = !modalInfo
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
                                statusArray[0]? <MatchSummary detail={this.state.detail} setHeight={this._setHeight.bind(this)} summaryData={this.state.summaryData} setEndReached={this.pullHistorySummary.bind(this)}/>
                                  : <View style={{height:this.state.swiperHeight,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[0]&&this.state.index===0&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
                              }
                              {
                                statusArray[1]? <SetPlayer  detail={this.state.detail} isActive={this.state.index===1} setHeight={this._setHeight.bind(this)}
                                                                 set_plays={setPlayerData.set_plays} modalAble={modalAble}/>
                                  : <View style={{height:styleVar.deviceHeight-270,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[1]&&this.state.index===1&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
                              }
                              {
                                statusArray[2]? <OnFire  detail={this.state.detail} isActive={this.state.index===2}
                                                         setHeight={this._setHeight.bind(this)}
                                                         on_fire={onFireData.on_fire}
                                />
                                  : <View style={{height:this.state.swiperHeight,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[2]&&this.state.index===2&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
                              }
                              {
                                statusArray[3]? <ManOfTheMatch detail={this.state.detail} setHeight={this._setHeight.bind(this)} subPage={this.state.subPage} setSubPage={this._setSubPage.bind(this)}/>

                                  : <View style={{height:this.state.swiperHeight,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[3]&&this.state.index===3&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
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
  console.log(state.content.drillDownItem)
  return {
    drillDownItem: state.content.drillDownItem,
    netWork: state.network
  }
}, bindAction)(MatchCenter)

