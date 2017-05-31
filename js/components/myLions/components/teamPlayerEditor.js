'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, Platform } from 'react-native'
import { Container, Icon } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import { Grid, Col, Row } from 'react-native-easy-grid'
import styleVar from '../../../themes/variable'
import { strToUpper,strToLower } from '../../utility/helper'
import ButtonFeedback from '../../utility/buttonFeedback'
import TeamModel from  '../../../modes/Team'
import { service } from '../../utility/services'
import {convertTeamToShow,removePlayer,addPlayer} from '../components/teamToShow'
import { setTeamToShow,setTeamDataTemp } from '../../../actions/squad'
import Immutable, { Map, List,Iterable } from 'immutable'
import Data from '../../../../contents/unions/data'
import { getAssembledUrl } from '../../utility/urlStorage'
import { setPositionToAdd , setPositionToRemove} from '../../../actions/position'
import Toast from 'react-native-root-toast'
import { popToRoute } from '../../../actions/route'

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
        this.state = {
            isMyTeamPlayerUpdating: false,
            inTeam: false,
            teamDataFeed: TeamModel().toJS(),
    	}
    }

	render() {

        let buttonText =  this.state.inTeam === true&&this.props.positionToRemove!==null? 'REMOVE':'ADD'
		return (
            <View>
            {
                ((this.props.positionToAdd===null||this.props.positionToAdd==='')&&(this.props.positionToRemove===null||this.props.positionToRemove===''))?
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
                                    this.state.inTeam === true&&this.props.positionToRemove!==null? styles.btnLeftRed : styles.btnGreen
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
        if (__DEV__)console.log('TeamPlayerEditor componentDidmount')
        if (__DEV__)console.log('this.props.positionToAdd',this.props.positionToAdd)
        if (__DEV__)console.log('this.props.positionToRemove',this.props.positionToRemove)
        if (this.props.positionToAdd===null&&this.props.positionToRemove===null) return
        this._updateMyTeamStatus()
    }

    componentWillReceiveProps(nextProps,nextState) {
        if (__DEV__)console.log('!!!details componentWillReceiveProps')
        if (__DEV__)console.log('this.props.removePlayer',this.props.removePlayer)
        if (__DEV__)console.log('nextProps.removePlayer',nextProps.removePlayer)
        if(nextProps.removePlayer!==this.props.removePlayer&&nextProps.removePlayer===true) {
        if (__DEV__)console.log('updateTeam')
            this._updateTeam('remove',strToLower(this.props.positionToRemove.split('|')[0]),strToLower(this.props.positionToRemove.split('|')[1]))
        }
    }
    componentWillUnmount() {
        if (__DEV__)console.log('Unmount')
            this.props.setPositionToRemove(null)

    }
    _updateMyTeamStatus() {
        // show loading in adding and removing button
        this.setState({isMyTeamPlayerUpdating: true})
        let teamFeed=TeamModel.fromJS(this.props.teamDataTemp)
        if (__DEV__)console.log('@@@teamFeed',teamFeed.toJS())
        let inTeam = false
        
        teamFeed.forEach((value,index)=>{
            if(index==='backs'||index==='forwards') {
                if(value.find(x=>x.get('id').toString()===this.props.playerid)!==undefined) inTeam=true
            }
            else {
                if(value.toString()===this.props.playerid) inTeam=true
            }
        })
        this.setState({inTeam,teamDataFeed:teamFeed.toJS(), isMyTeamPlayerUpdating: false})
    }

    updateTeam(){
            if(this.state.inTeam&&this.props.positionToRemove!==null) {
                this.props._setModalVisible(true,'remove')
            }
            else {
                this._updateTeam('add',strToLower(this.props.positionToAdd.split('|')[0]),strToLower(this.props.positionToAdd.split('|')[1]))
            }
    }

    _updateTeam(type,position,subPosition){
        if (__DEV__)console.log('type',type)
        if (__DEV__)console.log('position',position)
        if (__DEV__)console.log('subPosition',subPosition)
        let update=true
        if (__DEV__)console.log('this.props.teamDataTemp',this.props.teamDataTemp)
        if (__DEV__)console.log('this.props.playerid',this.props.playerid)
        let tmpFeed=TeamModel.fromJS(this.props.teamDataTemp)
        if (__DEV__)console.log('tmpFeed',tmpFeed.toJS())
        tmpFeed.forEach((value,index)=>{
            if (__DEV__)console.log('index',index)
            if(index==='backs'||index==='forwards') {
                if (__DEV__)console.log('value',value)
                if(value.find(x=>x.get('id').toString()===this.props.playerid&&x.get('name').toString()===subPosition)!==undefined){
                        if (__DEV__)console.log('found')
                    if (type==='remove'&&strToUpper(index)===strToUpper(position)) {
                        if (__DEV__)console.log('tmpFeed.toJS()',tmpFeed.toJS())
                        tmpFeed=tmpFeed.update(index,val=>{
                            let t=List(val)
                            t=t.splice(t.findIndex(x=>x.get('id').toString()===this.props.playerid&&x.get('name').toString()===subPosition),1)
                            return t
                        })
                        let sTeam=removePlayer(this.props.teamToShow,index,this.props.playerid,subPosition)
                        // this.props.setTeamToShow(removePlayer(this.props.teamToShow,index,this.props.playerid,subPosition))
                        if (__DEV__)console.log('@@@captain')
                        if(tmpFeed.get('captain').toString()===this.props.playerid) {
                            if (__DEV__)console.log('true')
                            tmpFeed=tmpFeed.set('captain','')
                            // this.props.setTeamToShow(removePlayer(this.props.teamToShow,'captain'))
                            sTeam=removePlayer(sTeam,'captain')
                        }
                        if(tmpFeed.get('kicker').toString()===this.props.playerid) {
                            tmpFeed=tmpFeed.set('kicker','')
                            // this.props.setTeamToShow(removePlayer(this.props.teamToShow,'kicker'))
                            sTeam=removePlayer(sTeam,'kicker')
                        }
                        this.props.setTeamToShow(sTeam)
                    }
                }
            }
            else {
                if(value.toString()===this.props.playerid) {
                    if (type==='remove'&&strToUpper(index)===strToUpper(position)) {
                        tmpFeed=tmpFeed.set(index,'')
                        this.props.setTeamToShow(removePlayer(this.props.teamToShow,index))
                    }
                }
            }
        })

        if(type==='add') {
            if(position==='backs'||position==='forwards') {
                if (__DEV__)console.log('tmpFeed.get(position)',tmpFeed.get(position))
                tmpFeed=tmpFeed.update(position,val=>{
                            let t=List(val)
                            // if (__DEV__)console.log('t',t.toJS())
                            // if (__DEV__)console.log('t',t.findIndex(x=>x.get('name')===subPosition))
                            if(t.findIndex(x=>x.get('name')===subPosition)!==-1) {
                                // if (__DEV__)console.log('position exist')
                                t=t.update(t.findIndex(x=>x.get('name')===subPosition),v=>{
                                    // if (__DEV__)console.log('v',v.toJS())
                                    let w=Map(v)
                                    w=w.set('id',this.props.playerid)
                                    return w
                                })
                            }
                            else {
                               t=t.push({"name":subPosition,"id":this.props.playerid}) 
                            }
                            
                            return t
                        })
                if (__DEV__)console.log('tmpFeed.get(position)',tmpFeed.get(position))
                if (__DEV__)console.log('position',position)
                this.props.setTeamToShow(addPlayer(this.props.teamToShow,position,this.props.detail,this.props.playerid,subPosition))
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
            let successDesc = this.state.inTeam&&this.props.positionToRemove!==null? 'PLAYER SUCCESSFULLY REMOVED' : 'SUCCESSFULLY ADDED'
            let positionDisplay = subPosition?strToUpper(subPosition) :position?strToUpper(position) : ''
            this.setState({ inTeam: !this.state.inTeam, teamDataFeed:tmpFeed.toJS() }, () => {
                if(type==='add') {
                    let toast = Toast.show(`${positionDisplay} ${successDesc}`, {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                        onShow: () => {
                            // calls on toast\`s appear animation start
                        },
                        onShown: () => {
                            // calls on toast\`s appear animation end.
                        },
                        onHide: () => {
                            // calls on toast\`s hide animation start.
                        },
                        onHidden: () => {
                            this.props.popToRoute(this.props.viewDetailFrom)
                        }
                    })
                }
                else {
                   this.props._setModalVisible(true, 'message', positionDisplay, successDesc, 'OK') 
                }
                this.props.setTeamDataTemp(tmpFeed.toJS())
                this.props.setPositionToAdd(null)
                this.props.setPositionToRemove(null)
            })
        }
        
    }
}

function bindAction(dispatch) {
    return {
        setTeamToShow:(team)=>dispatch(setTeamToShow(team)),
        setTeamDataTemp:(team)=>dispatch(setTeamDataTemp(team)),
        setPositionToAdd:(position)=>dispatch(setPositionToAdd(position)),
        setPositionToRemove:(position)=>dispatch(setPositionToRemove(position)),
        popToRoute: (route)=>dispatch(popToRoute(route))
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
