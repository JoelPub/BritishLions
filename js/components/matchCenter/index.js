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
import { service } from '../utility/services'
import _fetch from '../utility/fetch'
import  { actions  as apiActions } from '../utility/matchApiManger/matchApiManger'
import { setMatchMan, getMatchMan } from '../utility/asyncStorageServices'

class MatchCenter extends Component {

    constructor(props) {
        super(props)
        this._carousel=null
        this.subjects=['MATCH SUMMARY','MOMENTUM','SET PLAYS','ON FIRE', 'MAN OF THE MATCH']
        this.state = {
          index:this.props.drillDownItem&&this.props.drillDownItem.page ? this.props.drillDownItem.page: 0 ,
          swiperHeight:styleVar.deviceHeight-270,
          isLoaded:false,
          modalInfo:false,
          statusArray: [false,false,false,false,false],
          momentumData:{},
          summaryData:[],
          setPlayerData: [],
          onFireData:null,
          subPage:1
        }
        this.subscription= null
        this.timer  = null
        this.statusArray=[false,false,false,false,false]

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
    _setSubPage(n,playerid) {
      if(__DEV__)console.log('_setSubPage',n)
      if(__DEV__)console.log('_setSubPage',playerid)
        this.setState({subPage:n},()=>{
          setMatchMan(playerid)
        })
    }
    processSummaryData(type,json){
      let result=[]
      if(type==='init'||type==='refresh') {        
        json.map((value,index)=>{
          result.push({seq:index+1,time:value.gameTime,description:value.eventString})
        })
      }
      if (type==='refresh'&&this.state.summaryData.length>0) {
        this.state.summaryData.map((value,index)=>{
          result.push({seq:json.length+index+1,time:value.time,description:value.description})
        })
      }
      if (type==='extend') {
          _fetch({url:'https://api.myjson.com/bins/q1z31'}).then((res)=>{
            if(__DEV__)console.log('res',res)
                if(res) {
                  let tmp=this.state.summaryData
                  res.map((value,index)=>{
                    tmp.push({seq:tmp.length+1,time:value.gameTime,description:value.eventString})
                  })
                  if(__DEV__)console.log('tmp',tmp)
                  this.setState({
                    summaryData:tmp
                  })
                }

          })
      }
      return result
    }
    callApi = () => {
      if(this.state.index===0){
        if (__DEV__)console.log('call match summary Api')
        let optionData={}
        let type='init'
        if(!this.statusArray[0]) {
          optionData={id:1}
        }
        else {
          optionData={id:1,"sequenceId" : 20}
          type='refresh'
        }
        apiActions.getTimeLineLiveSummary(optionData,(json)=>{
            if(json.data) {
                  if (__DEV__)console.log('json.data',json.data)
                      this.statusArray.fill(false)
                      this.statusArray[0]=true
                      let tmp=this.processSummaryData(type,json.data)
                      if(__DEV__)console.log('tmp',tmp)
                      this.setState({
                        statusArray: this.statusArray,
                        summaryData:tmp
                      })
              }
        },(error)=>{
        })
      }
      if(this.state.index===1){
        if (__DEV__)console.log('call momentum Api')
        apiActions.getGameMomentum((data)=>{
                    this.statusArray.fill(false)
                    this.statusArray[1]=true
                    this.setState({
                      statusArray: this.statusArray,
                      momentumData:data
                    })
        },(error)=>{
        })
      }
      if(this.state.index===2){
        if (__DEV__)console.log('call  set Play  Api')
        if (__DEV__)console.log(apiActions)
        apiActions.getGameSetPlays('1',(json)=>{
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
        if (__DEV__)console.log('on fire Api')
        apiActions.getGameOnFire('1',(json)=>{
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
        if (__DEV__)console.log('call man of the match Api')
        setTimeout(()=>{
          this.statusArray.fill(false)
          this.statusArray[4]=true
          this.setState({
            statusArray: this.statusArray
          })
        },2000)
      }
    }
    componentDidMount() {
        if(__DEV__)console.log('this.state.isLoaded',this.state.isLoaded)
        setTimeout(()=>{this.setState({isLoaded:true},()=>{
          this.subscription = DeviceEventEmitter.addListener('matchCenter',this.updateMadal)
            this.callApi()
            if(this.state.index!==4) this.timer = setInterval(this.callApi,30000)
        })},500)
        
    }
    componentWillUnmount() {
      this.subscription.remove();
      this.timer&&clearTimeout(this.timer)
    }
    swiperScrollEnd = (e, state, context) => {
      this.setState({index:state.index},()=>{
        this.timer&&clearTimeout(this.timer)
        this.callApi()
        if(this.state.index!==4) this.timer = setInterval(this.callApi,10000)
      })
    }
    render() {
      let { statusArray ,setPlayerData,onFireData} = this.state
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
                                statusArray[0]? <MatchSummary setHeight={this._setHeight.bind(this)} summaryData={this.state.summaryData} setEndReached={this.processSummaryData.bind(this)}/>
                                  : <View style={{height:this.state.swiperHeight,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[0]&&this.state.index===0&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
                              }
                              {
                                statusArray[1] ? <Momentum  setHeight={this._setHeight.bind(this)} data={this.state.momentumData}/>
                                  : <View style={{height:this.state.swiperHeight,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[1]&&this.state.index===1&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
                              }
                              {
                                statusArray[2]? <SetPlayer  isActive={this.state.index===2} setHeight={this._setHeight.bind(this)}
                                                                 set_plays={setPlayerData.set_plays}/>
                                  : <View style={{height:styleVar.deviceHeight-270,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[2]&&this.state.index===2&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
                              }
                              {
                                statusArray[3]? <OnFire  isActive={this.state.index===3}
                                                         setHeight={this._setHeight.bind(this)}
                                                         on_fire={onFireData.on_fire}
                                />
                                  : <View style={{height:this.state.swiperHeight,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[3]&&this.state.index===3&&
                                        <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                                      }
                                    </View>
                              }
                              {
                                statusArray[4]? <ManOfTheMatch setHeight={this._setHeight.bind(this)} subPage={this.state.subPage} setSubPage={this._setSubPage.bind(this)}/>

                                  : <View style={{height:this.state.swiperHeight,marginTop:50,backgroundColor:'rgb(255,255,255)'}}>
                                      {
                                        !statusArray[4]&&this.state.index===4&&
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
                  <SquadModal
                    modalVisible={this.state.modalInfo}
                    callbackParent={this.iconPress}>
                    <ScrollView style={[styles.modalContent]}>
                      {
                        this.state.index === 1 &&
                          <View>  
                              <Text style={styles.modalContentTitleText}>MORE INFORMATION</Text>
                              <Text style={styles.modalContentText}>The graph shows the two features for both teams. The left side will belong to the Lions, the right will be their opposition:</Text>
                              <Text style={styles.modalContentText}>The Red bars indicate the score difference between the two teams.</Text>
                              <Text style={styles.modalContentText}>The Yellow line indicates which team has the run of play based on features such as Territory, Possession, Metres made, Attacking plays in the opposition half.</Text>
                          </View>
                      }
                      {   
                        this.state.index === 2 &&
                          <View>
                              <Text style={styles.modalContentTitleText}>MORE INFORMATION</Text>
                              <Text style={styles.modalContentText}>These screens will update every 2-5 minutes to indicate where various plays take place around the pitch.</Text>
                              <Text style={styles.modalContentText}>Kicks: Indicates where Conversions and Penalties were taken, and if they were successful.</Text>
                              <Text style={styles.modalContentText}>Scrums: Displays where each team’s scrums have taken place on the pitch and if they were won.</Text>
                              <Text style={styles.modalContentText}>Lineouts: Displays where each team’s lineouts have taken place on the pitch and if they were won.</Text>
                          </View>
                        
                      }
                      {
                        this.state.index === 3 &&
                          <View>
                              <Text style={styles.modalContentTitleText}>MORE INFORMATION</Text>
                              <Text style={styles.modalContentText}>These screens will be updated at half time and full time to show which British & Irish Lions are performing above their career averages based on key match statistics.</Text>
                          </View>
                      }
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

