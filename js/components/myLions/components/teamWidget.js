'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, Platform } from 'react-native'
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
import { setTeamToShow,setTeamData } from '../../../actions/squad'
import Immutable, { Map, List,Iterable } from 'immutable'
import Data from '../../../../contents/unions/data'

const locStyle = styleSheetCreate({
    btnBg: {
        height: 80,
        borderRadius:40,
        paddingLeft:10,
    },
    btn: {
        paddingTop:20,
        flexDirection:'row'
    },
    btnText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 36,
        lineHeight: 36,
        color: '#FFF',
        textAlign:'center',
        marginLeft:20
    },
    iconText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 36,
        lineHeight: 36,
        color: '#FFF',
        textAlign:'center',
    }
})

class TeamWidget extends Component {
	constructor(props){
        super(props)
        this.uniondata = Data
        this.state = {
            fullTeam:false           
    	}
    }

	render() {
		return (
            <View>
        {
            this.state.fullTeam?
                <View style={[locStyle.btnBg,{backgroundColor:'#FFF'}]}>
                     <ButtonFeedback style={locStyle.btn} onPress={this.props.onPress}>
                        <View style={[{height:60,width:60,borderRadius:30,backgroundColor:'#af001e',paddingTop:10,marginTop:-10},{backgroundColor:'rgb(10, 127, 64)'}]}>
                            <Icon name='md-checkmark' style={{fontSize:36,textAlign:'center'}} /> 
                        </View>
                        <Text style={[locStyle.btnText,{color:'rgb(10, 127, 64)'}]}>
                            TEAM
                        </Text>
                    </ButtonFeedback>
                </View>
                :
                <LinearGradient style={locStyle.btnBg} colors={['#af001e', '#820417']}>
                     <ButtonFeedback style={locStyle.btn} onPress={this.props.onPress}>
                        <View style={{height:60,width:60,borderRadius:30,backgroundColor:'#af001e',paddingTop:10,marginTop:-10}}>
                            <Text style={locStyle.iconText}>1</Text>
                        </View>
                        <Text style={locStyle.btnText}>
                            TEAM
                        </Text>
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

    _getTeam(){
        getSoticFullPlayerList().then((catchedFullPlayerList) => {                        
            if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                this.fullPlayerList=catchedFullPlayerList
                let optionsTeam = {
                    url: 'https://www.api-ukchanges2.co.uk/api/protected/squad/get?_=1483928168053',
                    method: 'get',
                    onSuccess: (res) => {
                        if(res.data) {
                            this.setTeam(TeamModel.format(eval(`(${res.data})`)))
                        }
                        
                    },
                    isRequiredToken: true
                }
                service(optionsTeam)
            }
        }).catch((error) => {
                this._showError(error) 
        })
    }
    setTeam(team){
        console.log('!!!setTeam',team.toJS())
        let tmpTeam=new TeamModel()
        let fullFeed=true
        let showTeamFeed=convertTeamToShow(team,this.fullPlayerList,this.uniondata)
        console.log('showTeamFeed',showTeamFeed.toJS())
        showTeamFeed.forEach((value,index)=>{
            if(index==='backs'||index==='forwards') {
                value.map((v,i)=>{
                    if(showTeamFeed.get(index)[i]===null) {
                        team=team.update(index,val=>{
                            val[i]=null
                            return val
                        })
                        fullFeed=false
                    }
                })
            }
            else {
                value.map((v,i)=>{
                    let p=v.position==='wildcard'?'widecard':v.position
                    if(showTeamFeed.get(index)[i].info===null) {
                        team=team.set(p,'')
                        fullFeed=false
                    }
                })
            }
        })
        // console.log('2')
        tmpTeam.forEach((value,index)=>{
            if(List.isList(team.get(index))) {
                if(team.get(index).count()>0)   tmpTeam=tmpTeam.set(index,team.get(index).join('|'))
                else tmpTeam=tmpTeam.set(index,'')
            }
            else tmpTeam=tmpTeam.set(index,team.get(index))
        })
        let optionsSaveList = {
            url: 'https://www.api-ukchanges2.co.uk/api/protected/squad/save',
            data:tmpTeam.toJS(),
            onAxiosStart: () => {
            },
            onAxiosEnd: () => {
            },
            onSuccess: (res) => {
                        
            },
            onError: (res) => {
                    this._showError(res)
            },
            onAuthorization: () => {
            },
            isRequiredToken: true
        }
        console.log('this.props.teamData',this.props.teamData)
            this.props.setTeamData(JSON.stringify(tmpTeam))
            this.props.setTeamToShow(showTeamFeed.toJS())
            this.setState({fullTeam:fullFeed})
            service(optionsSaveList)
        

    }
}

function bindAction(dispatch) {
    return {
        setTeamToShow:(team)=>dispatch(setTeamToShow(team)),
        setTeamData:(team)=>dispatch(setTeamData(team)),
    }
}

export default connect((state) => {
    return {
        teamToShow: state.squad.teamToShow,
        teamData: state.squad.teamData,
    }
},  bindAction)(TeamWidget)
