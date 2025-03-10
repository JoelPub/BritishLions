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
import ButtonNetwork from '../../utility/buttonNetwork'
import TeamModel from  '../../../modes/Team'
import { service } from '../../utility/services'
import {convertTeamToShow,removePlayer,addPlayer} from '../components/teamToShow'
import { setTeamData } from '../../../actions/squad'
import Immutable, { Map, List,Iterable } from 'immutable'
import Data from '../../../../contents/unions/data'
import { getAssembledUrl } from '../../utility/urlStorage'
import { popRoute } from '../../../actions/route'
import { actionsApi } from '../../utility/urlStorage'
import { debounce } from 'lodash'
const styles = styleSheetCreate({
    wrapper:{
        backgroundColor: 'rgb(4, 79, 38)',
        paddingVertical:styleVar.deviceWidth*0.06,
    }, 
    btn: {
        backgroundColor: 'rgb(10, 127, 64)',
        height: styleVar.deviceWidth*0.13,
        width: styleVar.deviceWidth*0.5,
        marginHorizontal: styleVar.deviceWidth*0.25,
        justifyContent: 'center'
    },
    btnGreen: {
        backgroundColor: 'rgb(10, 127, 64)',
    },
    btnText: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 24,
        lineHeight: 24,
        color: '#FFF',
        fontFamily: styleVar.fontCondensed,
        android: {
            marginTop: 4
        }
    },

})

class TeamSaveBtn extends Component {
	constructor(props){
        super(props)
        this.saveSquadUrl='http://bilprod.azurewebsites.net/SaveUserCustomizedSquad'
        this.state = {
            isMyTeamPlayerUpdating: false,
            inTeam: false,
            teamDataFeed: TeamModel().toJS(),
            isMyTeamPlayerSubmitting: false,
            btnSubmit:'',
    	}

        // debounce
        this._saveTeam = debounce(this._saveTeam, 1000, {leading: true, maxWait: 0, trailing: false})
    }

	render() {
        return (
        <View style={styles.wrapper}>
            <ButtonNetwork rounded onPress={() => this._saveTeam()}
                style={[styles.btn, styles.btnGreen ]}>
                <Text style={styles.btnText}>SAVE</Text>
            </ButtonNetwork>
        </View>
        )
	}

    _saveTeam() {

       let options = {
            url: actionsApi.eyc3SaveUserCustomizedSquad,
            data: {         "id":this.props.userProfile.userID,
                            "first_name":this.props.userProfile.firstName,
                            "last_name":this.props.userProfile.lastName,
                            "round_id":this.props.gameData.round_id, 
                            "game_id": this.props.gameData.game,
                            "team":TeamModel.fromJS(this.props.teamDataTemp).toJS()},
            onAxiosStart: () => {},
            onAxiosEnd: () => {
            },
            method: 'post',
            channel: 'EYC3',
            isQsStringify:false,
            onSuccess: (res) => {
                if (__DEV__)console.log('res',res)
                this.props.setTeamData(this.props.teamDataTemp)
                this.props.popRoute()
            },
            onError: null,
            onAuthorization: null,
            isRequiredToken: true
       }

       service(options)

    }
}

function bindAction(dispatch) {
    return {
        setTeamData:(team)=>dispatch(setTeamData(team)),
        popRoute: ()=>dispatch(popRoute())
    }
}

export default connect((state) => {
    return {
        teamDataTemp: state.squad.teamDataTemp,
        userProfile: state.squad.userProfile,
    }
},  bindAction)(TeamSaveBtn)
