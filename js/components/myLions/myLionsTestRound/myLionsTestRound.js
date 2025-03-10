
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, RefreshControl, ActivityIndicator, Alert, Modal } from 'react-native'
import { Container, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../../../themes/base-theme'
import styles from './styles'
import shapes from '../../../themes/shapes'
import LoginRequire from '../../global/loginRequire'
import LionsHeader from '../../global/lionsHeader'
import EYSFooter from '../../global/eySponsoredFooter'
import LionsFooter from '../../global/lionsFooter'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImageCircle from '../../utility/imageCircle'
import { replaceRoute, pushNewRoute } from '../../../actions/route'
import loader from '../../../themes/loader-position'
import { alertBox } from '../../utility/alertBox'
import refresh from '../../../themes/refresh-control'
import { drillDown } from '../../../actions/content'
import { setAccessGranted } from '../../../actions/token'
import { removeToken, getUserId } from '../../utility/asyncStorageServices'
import { service } from '../../utility/services'
import Data from '../../../../contents/unions/data'
import { globalNav } from '../../../appNavigator'
import SquadModal from '../../global/squadModal'
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'
import { setPositionToAdd,setPositionToRemove,setViewdetailFrom } from '../../../actions/position'
import { setTeamToShow,setTeamDataTemp } from '../../../actions/squad'
import { getAssembledUrl } from '../../utility/urlStorage'
import TeamModel from  '../../../modes/Team'
import Immutable, { Map, List,Iterable } from 'immutable'
import TeamList from '../components/teamList'
import TeamSaveBtn from '../components/teamSaveBtn'
import {convertTeamToShow} from '../components/teamToShow'
import Versus from '../components/versus'
import { actionsApi } from '../../utility/urlStorage'
import { debounce } from 'lodash'
import { isEmptyObject } from '../../utility/helper'
import Toast from 'react-native-root-toast'
class MyLionsTestRound extends Component {

    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.state={
            isLoaded: false,
            modalVisible: false,
            userID:'',
            isNetwork: true,
            drillDownItem:this.props.drillDownItem
        }
        this.uniondata = Data
        this.fullPlayerList={}

        // debounce
        this._saveTeam = debounce(this._saveTeam, 1000, {leading: true, maxWait: 0, trailing: false})
    }

    _showError(error) {
        if(!this.state.isNetwork) return

       if(error === 'Please make sure that you\'re connected to the network.') {
           this.setState({
               isNetwork: false
           })
       }
        let toast = Toast.show('An error occured', {
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
                
            }
        })
    }
    _showDetail(item, route,playerPos) {
        this.props.setPositionToAdd(null)
        this.props.setPositionToRemove(playerPos)
        this.props.drillDown(item, route)
    }

    _addPlayer(type,playerPos) {
        this.props.setPositionToAdd(playerPos)
        this.props.setPositionToRemove(null)
        this.props.setViewdetailFrom('myLionsTestRound')
        this.props.pushNewRoute('myLionsSelectPlayerListing')
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        back={true} 
                        title='MY LIONS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    {
                        this.state.isLoaded?
                            <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                                <Text style={[styles.headerTitle,styles.squadTitle]}>SELECT TEAM</Text>
                                <ButtonFeedback 
                                    style={styles.pageTitleBtnIconRight} 
                                    onPress={() => { this.setState({modalVisible: true}) }}>
                                    <Icon name='ios-information-circle-outline' style={styles.pageTitleBtnIcon} />
                                </ButtonFeedback>
                                <TeamList teamDatafeed={this.props.teamToShow} pressImg={this._showDetail.bind(this)} pressAdd={this._addPlayer.bind(this)}/>
                                <View style={styles.wrapper}>
                                    <ButtonFeedback rounded onPress={() => this._saveTeam()}
                                        style={[styles.btnSave, styles.btnGreen ]}>
                                        <Text style={styles.btnText}>SUBMIT TEAM</Text>
                                    </ButtonFeedback>
                                </View>
                                <LionsFooter isLoaded={true} />
                            </ScrollView>
                        :
                            <ActivityIndicator style={loader.centered} size='large' />
                    }
                    <SquadModal
                        modalVisible={this.state.modalVisible}
                        callbackParent={() => {this.setState({modalVisible: false})}}>
                            <View style={[styles.modalContent]}>
                                <Text style={styles.modalContentTitleText}>SELECT TEAM</Text>
                                <Text style={styles.modalContentText}>Select the run-on XV you think will be chosen by Warren Gatland for the upcoming Test match. Once you have chosen, you can share your picks on Social Media. You will be able to make changes to this Team until the day before the official team announcement.</Text>
                            </View>
                    </SquadModal>
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
                </View>
            </Container>
        )
    }

    componentDidMount() {
        this._getTeam()
    }
    _getTeam(){
        if (__DEV__)console.log('_getTeam',this.props.teamDataTemp)
        getSoticFullPlayerList().then((catchedFullPlayerList) => {                        
            if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                if (__DEV__)console.log('true')
                this.fullPlayerList=catchedFullPlayerList
                let optionsTeam = {
                    url: actionsApi.eyc3GetUserCustomizedSquad,
                    data: { "id":this.props.userProfile.userID,
                            "first_name":this.props.userProfile.firstName,
                            "last_name":this.props.userProfile.lastName,
                            "round_id":this.state.drillDownItem.round_id, 
                            "game_id": 0},
                    onAxiosStart: null,
                    onAxiosEnd: null,
                    method: 'post',
                    onSuccess: (res) => {
                        if (__DEV__)console.log('res.data',res.data)
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

    setTeam(team){
        if (__DEV__)console.log('!!!setTeam',team.toJS())
        let showTeamFeed=convertTeamToShow(team,this.fullPlayerList,this.uniondata)
        if (__DEV__)console.log('showTeamFeed',showTeamFeed.toJS())
        this.props.setTeamToShow(showTeamFeed.toJS())
        this.setState({ isLoaded: true })
        if(Immutable.is(team,TeamModel.fromJS(this.props.teamDataTemp))===false) {
            if (__DEV__)console.log('!!!team not equal')
            this.props.setTeamDataTemp(team.toJS())
        }
        

    }

    componentWillReceiveProps(nextProps) {
        if (__DEV__)console.log('componentWillReceiveProps nextProps.teamDataTemp',nextProps.teamDataTemp)
        if (__DEV__)console.log('componentWillReceiveProps this.props.teamDataTemp',this.props.teamDataTemp)
        if(Immutable.is(TeamModel.fromJS(nextProps.teamDataTemp),TeamModel.fromJS(this.props.teamDataTemp))===false) {
            this.setTeam(TeamModel.fromJS(nextProps.teamDataTemp))  
        }
    }
    _saveTeam() {
        // console.warn("this.props.teamDataTemp:",this.props.teamDataTemp)
        if( !isEmptyObject(this.props.teamDataTemp) &&
            (this.props.teamDataTemp.backs.length === 7
            && this.props.teamDataTemp.forwards.length === 8
            && this.props.teamDataTemp.captain !== ""
            && this.props.teamDataTemp.kicker !== ""))
        {

           let options = {
               url: actionsApi.eyc3SaveUserCustomizedSquad,
               data: {  "id": this.props.userProfile.userID,
                        "first_name": this.props.userProfile.firstName,
                        "last_name": this.props.userProfile.lastName,
                        "round_id":this.state.drillDownItem.round_id,
                        "game_id": 0,
                        "team":TeamModel.fromJS(this.props.teamDataTemp).toJS()},
               onAxiosStart: () => {},
               onAxiosEnd: () => {
               },
               onSuccess: (res) => {
                if (__DEV__)console.log('res.data',res.data)
                    if(res.data&&res.data.success) {
                        this.props.drillDown(this.state.drillDownItem,'myLionsTestRoundSubmit')
                    }
               },
               onError: () => {
                if (__DEV__)console.log('onError')
               },
                onAuthorization: null,
                isQsStringify:false,
                method: 'post',
                channel: 'EYC3',
                isRequiredToken: true
           }

           service(options)
       }else{
            Alert.alert(
                'Warning',
                'Please complete the full squad selection first before the submission',
                [{
                    text: 'Dismiss'
                }]
            )
        }
    }
    
    _replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    _reLogin() {
        removeToken()
        this.props.setAccessGranted(false)
        this._replaceRoute('login')
    }

    _signInRequired() {
        Alert.alert(
            'Your session has expired',
            'Please sign into your account.',
            [{
                text: 'SIGN IN', 
                onPress: this._reLogin.bind(this)
            }]
        )
    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted)),
        setPositionToAdd:(position)=>dispatch(setPositionToAdd(position)),
        setPositionToRemove:(position)=>dispatch(setPositionToRemove(position)),
        setViewdetailFrom:(page)=>dispatch(setViewdetailFrom(page)),
        setTeamToShow:(team)=>dispatch(setTeamToShow(team)),
        setTeamDataTemp:(team)=>dispatch(setTeamDataTemp(team)),
    }
}

export default connect((state) => {
    return {
        teamToShow: state.squad.teamToShow,
        teamDataTemp: state.squad.teamDataTemp,
        netWork: state.network,
        userProfile: state.squad.userProfile,
        drillDownItem: state.content.drillDownItem,
    }
}, bindAction)(MyLionsTestRound)

