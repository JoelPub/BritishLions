'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, Platform, Alert } from 'react-native'
import { Container, Icon } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import { Grid, Col, Row } from 'react-native-easy-grid'
import styles from '../styles'
import styleVar from '../../../themes/variable'
import { strToUpper } from '../../utility/helper'
import ButtonFeedback from '../../utility/buttonFeedback'
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'
import TeamModel from  '../../../modes/Team'
import { service } from '../../utility/services'
import {convertTeamToShow} from '../components/teamToShow'
import { setTeamToShow,setTeamStatus,setTeamData } from '../../../actions/squad'
import Immutable, { Map, List,Iterable } from 'immutable'
import Data from '../../../../contents/unions/data'
import { actionsApi } from '../../utility/urlStorage'

const locStyle = styleSheetCreate({
    btnBg: {
        height: 80,
        borderRadius:40,
        paddingLeft:10,
    },
    btn: {
        paddingTop:20,
        flexDirection:'row',
    },
    btnText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 36,
        lineHeight: 36,
        color: '#FFF',
        backgroundColor:'transparent',
    },
    icon: {
        fontSize:36,
        textAlign:'center',
        backgroundColor:"transparent"
    },
    iconText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 36,
        lineHeight: 36,
        color: '#FFF',
        textAlign:'center',
        backgroundColor:'transparent',
    },
    btnCircle:{
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:'rgb(208,7,41)',
        paddingTop:15,
        marginTop:-10,
    },
    titleText: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:-60,
        backgroundColor:'transparent'
    }
})

class TeamWidget extends Component {
	constructor(props){
        super(props)
        this.uniondata = Data
        this.state = {
            fullTeam:false,            
            isNetwork: true,
    	}
    }

	render() {
		return (
        <View>
        {
            this.state.fullTeam&&this.props.tactics!==null?
                <View style={[locStyle.btnBg,{backgroundColor:'#FFF'}]}>
                     <ButtonFeedback style={locStyle.btn} onPress={this.props.onPress}>
                        <View style={[locStyle.btnCircle,{backgroundColor:'rgb(10, 127, 64)'}]}>
                            <Icon name='md-checkmark' style={locStyle.icon} /> 
                        </View>
                        <View style={locStyle.titleText}>
                            <Text style={[locStyle.btnText,{color:'rgb(10, 127, 64)'}]}>
                                {this.props.text}
                            </Text>
                        </View>
                    </ButtonFeedback>
                </View>
                :
                <LinearGradient style={locStyle.btnBg} colors={['#af001e', '#820417']}>
                     <ButtonFeedback style={locStyle.btn} onPress={this.props.onPress}>
                     {
                        this.state.fullTeam?
                        <View style={[locStyle.btnCircle,{backgroundColor:'rgb(10, 127, 64)'}]}>
                            <Icon name='md-checkmark' style={locStyle.icon} /> 
                        </View>
                        :
                        <View style={locStyle.btnCircle}>
                            <Text style={locStyle.iconText}>{this.props.iconText}</Text>
                        </View>
                     }                        
                        <View style={locStyle.titleText}>
                            <Text style={locStyle.btnText}>
                                 {this.props.text}
                            </Text>
                        </View>
                    </ButtonFeedback>
                </LinearGradient>
        }
        </View>
                
		)
	}
    componentDidMount() {
        console.log('teamWidget componentDidmount')
            this._getTeam()
    }
    _showError(error) {
        if(!this.state.isNetwork) return

       if(error === 'Please make sure that you\'re connected to the network.') {
           this.setState({
               isNetwork: false
           })
       }
        if(error !== ''){
            Alert.alert(
                'An error occured',
                error,
                [{text: 'Dismiss'}]
            )
        }
    }

    _getTeam(){
        console.log('teamWidget _getTeam')
        getSoticFullPlayerList().then((catchedFullPlayerList) => {                        
            if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
        console.log('teamWidget catchedFullPlayerList')
                this.fullPlayerList=catchedFullPlayerList
                let optionsTeam = {
                    url: actionsApi.eyc3GetUserCustomizedSquad,
                    data: { "id":this.props.userProfile.userID,
                            "first_name":this.props.userProfile.firstName,
                            "last_name":this.props.userProfile.lastName,
                            "round_id":this.props.round_id, 
                            "game_id": this.props.game},
                    onAxiosStart: null,
                    onAxiosEnd: null,
                    method: 'post',
                    onSuccess: (res) => {
                        console.log('res.data',res.data)
                        console.log('typeof res.data',typeof res.data)
                        if(res.data&&(typeof res.data==='object')) {
                            this.setTeam(TeamModel.fromJS(res.data))
                        }
                        else {
                            this.setTeam(TeamModel.fromJS({}))
                        }
                        
                    },
                    isRequiredToken: true,
                    channel: 'EYC3',
                    isQsStringify:false
                }
                service(optionsTeam)
            }
        }).catch((error) => {
                this._showError(error) 
        })
    }
    componentWillReceiveProps(nextProps) {
        // console.log('teamWidget componentWillReceiveProps nextProps',nextProps)
        if(Immutable.is(TeamModel.fromJS(nextProps.teamData),TeamModel())===false) {
            this.setTeam(TeamModel.fromJS(nextProps.teamData))  
        }
    }
    setTeam(team){
        // console.log('!!!setTeam',team.toJS())
        let fullFeed=true
        let showTeamFeed=convertTeamToShow(team,this.fullPlayerList,this.uniondata)
        // console.log('showTeamFeed',showTeamFeed.toJS())
        showTeamFeed.forEach((value,index)=>{
            if (value.find(x=>x.info===null)!==undefined) fullFeed=false
        })
        if(Immutable.is(team,TeamModel.fromJS(this.props.teamData))===false) {
            // console.log('not equal')
            this.props.setTeamData(team.toJS())
            // this.props.setTeamToShow(showTeamFeed.toJS())
         }
            this.setState({fullTeam:fullFeed})
            this.props.setTeamStatus(fullFeed)
        

    }
}

function bindAction(dispatch) {
    return {
        setTeamStatus:(teamStatus)=>dispatch(setTeamStatus(teamStatus)),
        setTeamData:(team)=>dispatch(setTeamData(team)),
    }
}

export default connect((state) => {
    return {
        teamData: state.squad.teamData,
        userProfile: state.squad.userProfile,
        tactics: state.tactics.tacticsData,
    }
},  bindAction)(TeamWidget)
