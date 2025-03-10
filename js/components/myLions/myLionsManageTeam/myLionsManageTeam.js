
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
import Toast from 'react-native-root-toast'

class MyLionsManageTeam extends Component {

    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.state={
            isLoaded: false,
            modalVisible: false,
            userID:'',
            isNetwork: true,
            drillDownItem:this.props.drillDownItem,
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
        this.props.setViewdetailFrom('myLionsManageTeam')
        this.props.pushNewRoute('myLionsSelectPlayerListing')
    }

    render() {
        let { drillDownItem } = this.props
        let backRoute = drillDownItem[0] && drillDownItem[0].backRoute? drillDownItem[0].backRoute : null
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        back={true} 
                        backRoute={backRoute}
                        title='MY LIONS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                        <View>
                        <Text style={[styles.headerTitle,styles.squadTitle]}>SELECT TEAM</Text>
                            <ButtonFeedback 
                                style={styles.pageTitleBtnIconRight} 
                                onPress={() => { this.setState({modalVisible: true}) }}>
                                <Icon name='ios-information-circle-outline' style={styles.pageTitleBtnIcon} />
                            </ButtonFeedback>
                        </View>
                    {
                        this.state.isLoaded?
                            <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                                
                                <Versus gameData={this.state.drillDownItem} userData={this.props.userProfile} pressBtn={()=> { this.props.drillDown(this.state.drillDownItem, 'myLionsOppositionSquad') }}/>
                                <TeamList teamDatafeed={this.props.teamToShow} pressImg={this._showDetail.bind(this)} pressAdd={this._addPlayer.bind(this)}/>
                                <TeamSaveBtn gameData={this.state.drillDownItem}/>
                                <LionsFooter isLoaded={true} />
                            </ScrollView>
                        :
                            <ActivityIndicator style={loader.centered} size='large' />
                    }
                    <SquadModal 
                        modalVisible={this.state.modalVisible}
                        callbackParent={() => {}}>
                            <View style={[styles.modalContent]}>
                                <Text style={styles.modalContentTitleText}>SELECT TEAM</Text>
                                <Text style={styles.modalContentText}>You can select the XV you want to challenge the Experts XV. Along with your XV you can select your Game Captain and Kicker who will help determine if your XV will be victorious. You can view the oppositions XV to see who you will be playing against. In this section you can also save your team if you would like to use it as the basis of subsequent matches.</Text>
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
        if (__DEV__)console.log('_getTeam',this.props.teamData)
        getSoticFullPlayerList().then((catchedFullPlayerList) => {                        
            if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                if (__DEV__)console.log('true')
                this.fullPlayerList=catchedFullPlayerList
                this.props.setTeamDataTemp(this.props.teamData)
                this.setTeam(TeamModel.fromJS(this.props.teamData))
            }
        }).catch((error) => {
                    this._showError(error) 
        })
    }
    componentWillReceiveProps(nextProps) {
        if (__DEV__)console.log('componentWillReceiveProps',nextProps.teamDataTemp)
        if(Immutable.is(TeamModel.fromJS(nextProps.teamDataTemp),TeamModel.fromJS(this.props.teamDataTemp))===false) {
            this.setTeam(TeamModel.fromJS(nextProps.teamDataTemp))  
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

    setTeam(team){
        if (__DEV__)console.log('!!!setTeam',team.toJS())
        let showTeamFeed=convertTeamToShow(team,this.fullPlayerList,this.uniondata)
        this.props.setTeamToShow(showTeamFeed.toJS())
        if(Immutable.is(team,TeamModel.fromJS(this.props.teamDataTemp))===false) {
            if (__DEV__)console.log('!!!team not equal')
            this.props.setTeamDataTemp(team.toJS())
        }
        else {
            this.setState({ isLoaded: true })
        }
        

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
        drillDownItem: state.content.drillDownItem,
        teamToShow: state.squad.teamToShow,
        teamData: state.squad.teamData,
        teamDataTemp: state.squad.teamDataTemp,
        netWork: state.network,
        userProfile: state.squad.userProfile,
    }
}, bindAction)(MyLionsManageTeam)

