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
import { setTeamToShow,setTeamDataTemp } from '../../../actions/squad'
import Immutable, { Map, List,Iterable } from 'immutable'
import Data from '../../../../contents/unions/data'
import { getAssembledUrl } from '../../utility/urlStorage'
import { setPositionToAdd , setPositionToRemove} from '../../../actions/position'
const styles = styleSheetCreate({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 25
    },
    btn: {
        backgroundColor: 'rgb(10, 127, 64)',
        height: 50,
        justifyContent: 'center'
    },
    btnLeft: {
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        paddingLeft: 0,
        paddingRight: 0,
        width: 120,
    },
    btnRed: {
        backgroundColor: 'rgb(208, 7, 42)',
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
    btnLeftRed: {
        backgroundColor: 'rgb(154, 2, 28)',
    },
    btnGreen: {
        backgroundColor: 'rgb(10, 127, 64)',
        //paddingLeft: 40,
        //paddingRight: 30
    },
    btnRight: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        paddingLeft: 20,
        paddingRight: 30
    },

})

class TeamPlayerEditor extends Component {
	constructor(props){
        super(props)
        this.saveSquadUrl=getAssembledUrl('SaveGoodFormUserCustomizedSquad')
        this.state = {
            isMyTeamPlayerUpdating: false,
            inTeam: false,
            teamDataFeed: TeamModel().toJS(),
    	}
    }

	render() {
        let buttonText =  this.state.inTeam === true&&this.props.positionToRemove!==''? 'REMOVE':'ADD'
		return (
            <View>
            {
                (this.props.positionToAdd===''&&this.props.positionToRemove==='')?
                null
                :
                <View style={styles.buttons}>
                    {
                        this.state.isMyTeamPlayerUpdating?
                            <ButtonFeedback
                                disabled = {true}
                                style={[styles.btn, styles.btnLeft, styles.btnRed ]}>
                                <Text style={styles.btnText}>CHECKING..</Text>
                            </ButtonFeedback>
                        :
                            <ButtonFeedback
                                disabled = {this.state.isMyTeamPlayerUpdating }
                                onPress={()=> this.updateTeam()}
                                style={[
                                    styles.btn,
                                    styles.btnLeft,
                                    this.state.inTeam === true&&this.props.positionToRemove!==''? styles.btnLeftRed : styles.btnGreen
                                ]}>
                                <Text style={styles.btnText}>{buttonText}</Text>
                            </ButtonFeedback>
                    }
                    <ButtonFeedback  style={[styles.btn, styles.btnRight, styles.btnRed]}>
                        <Text style={styles.btnText}>PLAYER</Text>
                    </ButtonFeedback>
                </View>
            }
            </View>
		)
	}
    componentDidMount() {
        console.log('TeamPlayerEditor componentDidmount')
        console.log('this.props.positionToAdd',this.props.positionToAdd)
        console.log('this.props.positionToRemove',this.props.positionToRemove)
        if (this.props.positionToAdd===''&&this.props.positionToRemove==='') return
        this._updateMyTeamStatus()
    }

    componentWillReceiveProps(nextProps,nextState) {
        console.log('!!!details componentWillReceiveProps')
        console.log('this.props.removePlayer',this.props.removePlayer)
        console.log('nextProps.removePlayer',nextProps.removePlayer)
        if(nextProps.removePlayer!==this.props.removePlayer&&nextProps.removePlayer===true) {
        console.log('updateTeam')
            this._updateTeam('remove',this.props.positionToRemove.toLowerCase())
        }
    }
    componentWillUnmount() {
        console.log('Unmount')
            this.props.setPositionToRemove('')

    }
    _updateMyTeamStatus() {
        // show loading in adding and removing button
        this.setState({isMyTeamPlayerUpdating: true})
        let teamFeed=TeamModel(this.props.teamDataTemp)
        console.log('@@@teamFeed',teamFeed.toJS())
        let inTeam = false
        
        teamFeed.forEach((value,index)=>{
            if(index==='backs'||index==='forwards') {
                if(value.find(x=>x.id.toString()===this.props.playerid)!==undefined) inTeam=true
            }
            else {
                if(value.toString()===this.props.playerid) inTeam=true
            }
        })
        this.setState({inTeam,teamDataFeed:teamFeed.toJS(), isMyTeamPlayerUpdating: false})
    }

    updateTeam(){
            if(this.state.inTeam&&this.props.positionToRemove!=='') {
                this.props._setModalVisible(true,'remove')
            }
            else {
                this._updateTeam('add',this.props.positionToAdd.toLowerCase())
            }
    }

    _updateTeam(type,position){
        console.log('type',type)
        console.log('position',position)
        let update=true
        console.log('this.props.teamDataTemp',this.props.teamDataTemp)
        console.log('this.props.playerid',this.props.playerid)
        let tmpFeed=TeamModel(this.props.teamDataTemp)
        console.log('tmpFeed',tmpFeed.toJS())
        if(position==='') {
            this.props._setModalVisible(true, 'message', '', 'PLEASE SELECT A POSITION', 'OK')
        }
        else {
            tmpFeed.forEach((value,index)=>{
                console.log('index',index)
                if(index==='backs'||index==='forwards') {
                console.log('value',value)
                    if(value.find(x=>x.id.toString()===this.props.playerid)!==undefined){
                            console.log('found')
                            console.log('this.props.positionToRemove',this.props.positionToRemove)
                        if (type==='remove'&&strToUpper(index)===strToUpper(this.props.positionToRemove)) {
                            console.log('tmpFeed',tmpFeed.toJS())
                            tmpFeed=tmpFeed.update(index,val=>{
                                val[val.findIndex(x=>x.id.toString()===this.props.playerid)].id=''
                                return val
                            })
                            console.log('tmpFeed',tmpFeed.toJS())
                            this.props.setTeamToShow(removePlayer(this.props.teamToShow,index,this.props.playerid))
                        }
                    }
                }
                else {
                    if(value.toString()===this.props.playerid) {
                        if (type==='remove'&&strToUpper(index)===strToUpper(this.props.positionToRemove)) {
                            console.log('!!!tmpFeed',tmpFeed.toJS())
                            tmpFeed=tmpFeed.set(index,'')
                            this.props.setTeamToShow(removePlayer(this.props.teamToShow,index))
                        }
                    }
                }
            })

            if(type==='add') {
                if(position==='backs'||position==='forwards') {
                    console.log('tmpFeed.get(position)',tmpFeed.get(position))
                    tmpFeed=tmpFeed.update(position,val=>{
                        val[val.findIndex(x=>x.name==='loosehead_prop')].id=this.props.playerid
                        return val
                    })
                    // tmpFeed=tmpFeed.set(position,tmpFeed.get(position).push({name:'loosehead_prop',id:this.props.playerid}))
                    console.log('tmpFeed.get(position)',tmpFeed.get(position))
                    console.log('position',position)
                    this.props.setTeamToShow(addPlayer(this.props.teamToShow,position,this.props.detail,this.props.playerid))
                }
                else{
                    if(tmpFeed.get(position).trim()==='') {
                        tmpFeed=tmpFeed.set(position,this.props.playerid)
                        this.props.setTeamToShow(addPlayer(this.props.teamToShow,position,this.props.detail))
                    }
                    else {
                        update=false
                        this.setState({ teamDataFeed:tmpFeed.toJS() })
                     }
                }

            }
            if(update){
               this._updateTeamPlayer(tmpFeed,position, type)
            }
        }
        
    }
    _updateTeamPlayer(teamData,position, type='') {
        let successDesc = this.state.inTeam&&this.props.positionToRemove!==''? 'PLAYER SUCCESSFULLY REMOVED' : 'SUCCESSFULLY ADDED'
        position = position?position.toUpperCase() : ''
        this.setState({ inTeam: !this.state.inTeam, teamDataFeed:teamData.toJS() }, () => {
            this.props._setModalVisible(true, 'message', position, successDesc, 'OK')
            this.props.setTeamDataTemp(teamData.toJS())
            this.props.setPositionToAdd('')
            this.props.setPositionToRemove('')
        })
    }
}

function bindAction(dispatch) {
    return {
        setTeamToShow:(team)=>dispatch(setTeamToShow(team)),
        setTeamDataTemp:(team)=>dispatch(setTeamDataTemp(team)),
        setPositionToAdd:(position)=>dispatch(setPositionToAdd(position)),
        setPositionToRemove:(position)=>dispatch(setPositionToRemove(position)),
    }
}

export default connect((state) => {
    return {
        teamToShow: state.squad.teamToShow,
        teamDataTemp: state.squad.teamDataTemp,
        positionToAdd: state.position.positionToAdd,
        positionToRemove: state.position.positionToRemove,
    }
},  bindAction)(TeamPlayerEditor)
