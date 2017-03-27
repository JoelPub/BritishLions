
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
import { setPositionToAdd,setPositionToRemove } from '../../../actions/position'
import { setTeamToShow,setTeamDataTemp } from '../../../actions/squad'
import { getAssembledUrl } from '../../utility/urlStorage'
import TeamModel from  '../../../modes/Team'
import Immutable, { Map, List,Iterable } from 'immutable'
import TeamList from '../components/teamList'
import TeamSaveBtn from '../components/teamSaveBtn'
import {convertTeamToShow} from '../components/teamToShow'
import Versus from '../components/versus'
import { actionsApi } from '../../utility/urlStorage'

class MyLionsTestRound extends Component {

    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.state={
            isLoaded: false,
            modalVisible: false,
            userID:'',
            isNetwork: true,
        }
        this.uniondata = Data
        this.fullPlayerList={}
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
    _showDetail(item, route,playerPos) {
        this.props.setPositionToAdd(null)
        this.props.setPositionToRemove(playerPos)
        this.props.drillDown(item, route)
    }

    _addPlayer(type,playerPos) {
        this.props.setPositionToAdd(playerPos)
        this.props.setPositionToRemove(null)
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
                                <Text style={styles.modalContentText}>Lorem ipsum doloramet, conse tetur adipiscing elit. Vestibulum in elit quam. Etiam ullamcorper neque eu lorem elementum, a sagittis sem ullamcorper. Suspendisse ut dui diam.</Text>
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
        console.log('_getTeam',this.props.teamDataTemp)
        getSoticFullPlayerList().then((catchedFullPlayerList) => {                        
            if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                console.log('true')
                this.fullPlayerList=catchedFullPlayerList
                let optionsTeam = {
                    url: actionsApi.eyc3GetUserCustomizedSquad,
                    data: { "id":this.props.userProfile.userID,
                            "first_name":this.props.userProfile.firstName,
                            "last_name":this.props.userProfile.lastName,
                            "round_id":0, 
                            "game_id": 0},
                    onAxiosStart: null,
                    onAxiosEnd: null,
                    method: 'post',
                    onSuccess: (res) => {
                        console.log('res.data',res.data)
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
        console.log('!!!setTeam',team.toJS())
        let showTeamFeed=convertTeamToShow(team,this.fullPlayerList,this.uniondata)
        console.log('showTeamFeed',showTeamFeed.toJS())
        this.props.setTeamToShow(showTeamFeed.toJS())
        if(Immutable.is(team,TeamModel.fromJS(this.props.teamDataTemp))===false) {
            console.log('!!!team not equal')
            this.props.setTeamDataTemp(team.toJS())
        }
        else {            
            this.setState({ isLoaded: true })
        }
        

    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps',nextProps.teamDataTemp)
        if(Immutable.is(TeamModel.fromJS(nextProps.teamDataTemp),TeamModel.fromJS(this.props.teamDataTemp))===false) {
            this.setTeam(TeamModel.fromJS(nextProps.teamDataTemp))  
        }
    }
    _saveTeam() {

       let options = {
           url: actionsApi.eyc3SaveUserCustomizedSquad,
           data: {  "id":this.props.userProfile.userID,
                    "first_name":this.props.userProfile.firstName,
                    "last_name":this.props.userProfile.lastName,
                    "round_id":0, 
                    "game_id": 0,
                    "team":TeamModel.fromJS(this.props.teamDataTemp).toJS()},
           onAxiosStart: () => {},
           onAxiosEnd: () => {
           },
           onSuccess: (res) => {
            console.log('res.data',res.data)
                if(res.data&&res.data.success) {
                    this.props.pushNewRoute('myLionsTestRoundSubmit') 
                }
           },
           onError: () => {
            console.log('onError')
           },
            onAuthorization: null,
            isQsStringify:false,
            method: 'post',
            channel: 'EYC3',
            isRequiredToken: true
       }

       service(options)

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
    }
}, bindAction)(MyLionsTestRound)

