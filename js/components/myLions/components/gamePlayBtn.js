'use strict'

import React, { Component,PropTypes } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, Platform,DeviceEventEmitter } from 'react-native'
import { Container, Icon } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import { Grid, Col, Row } from 'react-native-easy-grid'
import styleVar from '../../../themes/variable'
import { strToUpper } from '../../utility/helper'
import ButtonFeedback from '../../utility/buttonFeedback'
import TeamModel from  '../../../modes/Team'
import { service } from '../../utility/services'
import { setUserProfile } from '../../../actions/squad'
import {convertTeamToShow,removePlayer,addPlayer} from '../components/teamToShow'
import { setTeamData } from '../../../actions/squad'
import Immutable, { Map, List,Iterable } from 'immutable'
import Data from '../../../../contents/unions/data'
import { getAssembledUrl,actionsApi } from '../../utility/urlStorage'
import { popRoute,pushNewRoute } from '../../../actions/route'
import { drillDown } from '../../../actions/content'
const styles = styleSheetCreate({    
    playBtn:{
        height: 80,
        borderRadius:40,
        paddingLeft:10,
        backgroundColor:'rgba(208,7,41,0.14)',
        alignItems:'center',
        paddingTop:25
    },
    playBtnActive:{
        backgroundColor:'rgb(9,127,64)'
    },
    textPlay:{
        fontFamily: styleVar.fontCondensed,
        fontSize: 36,
        lineHeight: 36,
        color: 'rgba(255,255,255,0.14)',
    },
    textPlayActive:{
        color: 'rgb(255,255,255)'
    }

})

class GamePlayBtn extends Component {
	constructor(props){
        super(props)
        this.getGameResultUrl='http://bilprod.azurewebsites.net/GetGameResult'
        this.submitting=false
        this.state = {
            isActive:this.props.teamStatus&&this.props.tactics!==null
    	}
    }

	render() {
    let buttonLable =  this.props.isGameOver ? 'RESULT' : 'PLAY GAME'
        return (
            <ButtonFeedback style={[styles.playBtn,this.state.isActive&&styles.playBtnActive]} disabled={!this.state.isActive||this.submitting} onPress={()=>this.playGame()}>
                    <Text style={[styles.textPlay,this.state.isActive&&styles.textPlayActive]}>
                      {buttonLable}
                    </Text>
            </ButtonFeedback>
        )
	}
    componentWillReceiveProps(nextProps) {
        if (__DEV__)console.log('this.props.connectionInfo',this.props.connectionInfo)
        
        if (__DEV__)console.log('nextProps.connectionInfo',nextProps.connectionInfo)
        if (__DEV__)console.log('nextProps.teamStatus',nextProps.teamStatus)
        if (__DEV__)console.log('nextProps.tactics',nextProps.tactics)
        if (__DEV__)console.log('this.props.teamStatus',this.props.teamStatus)
        if (__DEV__)console.log('this.props.tactics',this.props.tactics)
        if(nextProps.connectionInfo!==this.props.connectionInfo&&(nextProps.connectionInfo===null||strToUpper(nextProps.connectionInfo)==='NONE')) {
                if (__DEV__)console.log('!!!!!network lost')
                if (__DEV__)console.log('this.submitting',this.submitting)
            if(this.submitting) {
                if (__DEV__)console.log('!!!!!show network error')
               this.props._setModalVisible(true,'message','ERROR','Network error \n\n Please try again later.','GO BACK')
            }
        }
        else {
            this.setState({isActive:nextProps.teamStatus&&nextProps.tactics!==null})
        }
        
    }
  getProfile = (userName,firstName,lastName,initName)=>{
    let optionsUserProfile = {
      url: actionsApi.eyc3GetuserProfileSummary,
      data: {id:this.props.userProfile.userID,first_name:firstName,last_name:lastName},
      onAxiosStart: null,
      onAxiosEnd: null,
      method: 'post',
      channel: 'EYC3',
      isQsStringify:false,
      onSuccess: (res) => {
        if(res.data) {
          // if (__DEV__)console.log('res.data',res.data)
          let userProfile = Object.assign(res.data, {
            userName: userName,
            initName: initName,
            firstName: firstName,
            lastName: lastName,
            userID: this.state.userID
          })
          this.props.setUserProfile(userProfile)
        }
      },
      onError: null,
      onAuthorization: () => {
        this._signInRequired()
      },
      isRequiredToken: true
    }
    service(optionsUserProfile)
  }
    playGame() {
      let isGameOVer = this.props.isGameOver
      if (isGameOVer) {
        this.props.drillDown(this.props.drillDownItem, 'myLionsCompetitionGameResults')
        return
      }

        this.submitting=true
        this.props._setModalVisible(true,'loading')
        if (__DEV__)console.log('playgame this.props.tactics',this.props.tactics)
       let options = {
            url: this.getGameResultUrl,
            data: {
                "id" : this.props.userProfile.userID,
                "round_id":this.props.round_id,
                "game_id":this.props.game,
                "weather_id":this.props.weather_id,
                "referee_id":this.props.referees_id,
                "ground_id":this.props.grounds_id,
                "team":this.props.teamData,
                "tactics":{
                    "boost_player":this.props.tactics.starPlayer.info&&this.props.tactics.starPlayer.info.id?this.props.tactics.starPlayer.info.id:'',
                    "interchange":this.props.tactics.replacements,
                    "play_style":this.props.tactics.tactic
                }
            },
            method: 'post',
            onAxiosStart: () => {},
            onAxiosEnd: () => {
                if (__DEV__)console.log('onAxiosEnd')
            },
            onSuccess: (res) => {
              let {userName,initName,firstName,lastName} = this.props.userProfile
              this.getProfile(userName,firstName,lastName,initName)
                if (__DEV__)console.log('res',res)
                if (__DEV__)console.log('typeof res.data',typeof res.data)
                if(typeof res.data ==='object') {                    
                    this.props._setModalVisible(false)
                    this.props.drillDown(Object.assign(res.data,{isLiveResult:true,title:this.props.title,image:this.props.image,round_id:this.props.round_id}), 'myLionsCompetitionGameResults')
                }
                else if(typeof res.data==='string') {
                    this.props._setModalVisible(true,'message','ERROR',res.data+'\n\n Please try again later.','GO BACK')
                }
                else {
                    this.props._setModalVisible(true,'message','ERROR','Unfortunately something went wrong when attempting to process your game. \n\n Please try again later.','GO BACK')
                }
                this.submitting=false


            },
            onError: ()=>{
                if (__DEV__)console.log('onError')
                this.props._setModalVisible(true,'message','ERROR','Unfortunately something went wrong when attempting to process your game. \n\n Please try again later.','GO BACK')
                this.submitting=false
            },
            onAuthorization: null,
            isRequiredToken: true,
            channel: 'EYC3',
            isQsStringify:false
       }

       service(options)

    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        popRoute: ()=>dispatch(popRoute()),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        setUserProfile:(profile)=>dispatch(setUserProfile(profile)),
    }
}

export default connect((state) => {
    return {
        drillDownItem: state.content.drillDownItem,
        teamData: state.squad.teamData,
        teamStatus: state.squad.teamStatus,
        tactics: state.tactics.tacticsData,
        userProfile: state.squad.userProfile,
        connectionInfo: state.network.connectionInfo,

    }
},  bindAction)(GamePlayBtn)
GamePlayBtn.propTypes = {
  isGameOver: PropTypes.bool,
}