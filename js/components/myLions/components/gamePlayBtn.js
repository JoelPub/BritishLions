'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, Platform } from 'react-native'
import { Container, Icon } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import { Grid, Col, Row } from 'react-native-easy-grid'
import styleVar from '../../../themes/variable'
import { strToUpper } from '../../utility/helper'
import ButtonFeedback from '../../utility/buttonFeedback'
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'
import TeamModel from  '../../../modes/Team'
import { service } from '../../utility/services'
import {convertTeamToShow,removePlayer,addPlayer} from '../components/teamToShow'
import { setTeamData } from '../../../actions/squad'
import Immutable, { Map, List,Iterable } from 'immutable'
import Data from '../../../../contents/unions/data'
import { getAssembledUrl } from '../../utility/urlStorage'
import { popRoute,pushNewRoute } from '../../../actions/route'
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
        this.getGameResultUrl='http://biltestapp.azurewebsites.net/GetGameResult'
        this.state = {
            isMyTeamPlayerUpdating: false,
            inTeam: false,
            teamDataFeed: TeamModel().toJS(),
            isMyTeamPlayerSubmitting: false,
            btnSubmit:'',
    	}
    }

	render() {
        return (
            <ButtonFeedback style={[styles.playBtn,this.props.teamStatus&&styles.playBtnActive]} disabled={!this.props.teamStatus} onPress={()=>this.playGame()}>
                    <Text style={[styles.textPlay,this.props.teamStatus&&styles.textPlayActive]}>
                        PLAY GAME
                    </Text>
            </ButtonFeedback>
        )
	}

    playGame() {
       this.props._setModalVisible(true,'loading')
       let options = {
            url: this.getGameResultUrl,
            data: {
                "id" : this.props.userProfile.userID,
                "round_id":1,
                "game_id":3,
                "weather_id":123,
                "referee_id":234,
                "ground_id":345,
                "team":this.props.teamData,
                "tactics":{
                    "boost_player":12334,
                    "interchange":"75",
                    "play_style":"balanced"
                }
            },
            method: 'post',
            onAxiosStart: () => {},
            onAxiosEnd: () => {
            },
            onSuccess: (res) => {
                this.props._setModalVisible(false)
                this.props.pushNewRoute('myLionsCompetitionGameResults')
            },
            onError: ()=>{
                this.props._setModalVisible(true,'message','ERROR','Unfortunately something went wrong when attampting to process your game. \n\n Please try again later.','GO BACK')
            },
            onAuthorization: null,
            isRequiredToken: true,
            channel: 'EYC3',
            isQsStringify:false
       }

       setTimeout(()=>service(options),3000)

    }
}

function bindAction(dispatch) {
    return {
        popRoute: ()=>dispatch(popRoute()),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
    }
}

export default connect((state) => {
    return {
        teamData: state.squad.teamData,
        teamStatus: state.squad.teamStatus,
        userProfile: state.squad.userProfile,
    }
},  bindAction)(GamePlayBtn)
