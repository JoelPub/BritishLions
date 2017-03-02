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
import { setTeamToShow,setTeamData } from '../../../actions/squad'
import Immutable, { Map, List,Iterable } from 'immutable'
import Data from '../../../../contents/unions/data'
import { getAssembledUrl } from '../../utility/urlStorage'
import { setPositionToAdd , setPositionToRemove} from '../../../actions/position'
import { popRoute,replaceOrPushRoute } from '../../../actions/route'
const styles = styleSheetCreate({
    btn: {
        backgroundColor: 'rgb(10, 127, 64)',
        height: 50,
        justifyContent: 'center'
    },
    btnGreen: {
        backgroundColor: 'rgb(10, 127, 64)',
        //paddingLeft: 40,
        //paddingRight: 30
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
        this.saveSquadUrl=getAssembledUrl('SaveGoodFormUserCustomizedSquad')
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
        <View style={{backgroundColor: 'rgb(4, 79, 38)',paddingVertical:30,paddingHorizontal:100}}>
            <ButtonFeedback rounded onPress={() => this._saveTeam()}
                style={[styles.btn, styles.btnGreen ]}>
                <Text style={styles.btnText}>SAVE</Text>
            </ButtonFeedback>
        </View>
        )
	}

    _saveTeam() {

       let options = {
           url: this.saveSquadUrl,
           data: eval(`(${this.props.teamDataTemp})`),
           onAxiosStart: () => {},
           onAxiosEnd: () => {
           },
           onSuccess: (res) => {
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
        setTeamToShow:(team)=>dispatch(setTeamToShow(team)),
        setTeamData:(team)=>dispatch(setTeamData(team)),
        setPositionToAdd:(position)=>dispatch(setPositionToAdd(position)),
        setPositionToRemove:(position)=>dispatch(setPositionToRemove(position)),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        popRoute: ()=>dispatch(popRoute())
    }
}

export default connect((state) => {
    return {
        teamToShow: state.squad.teamToShow,
        teamData: state.squad.teamData,
        teamDataTemp: state.squad.teamDataTemp,
        positionToAdd: state.position.positionToAdd,
        positionToRemove: state.position.positionToRemove,
    }
},  bindAction)(TeamSaveBtn)
