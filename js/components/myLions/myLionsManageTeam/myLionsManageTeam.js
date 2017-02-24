
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
import { drillDown ,shareReplace} from '../../../actions/content'
import { setAccessGranted } from '../../../actions/token'
import { removeToken, getUserId } from '../../utility/asyncStorageServices'
import { service } from '../../utility/services'
import Data from '../../../../contents/unions/data'
import { globalNav } from '../../../appNavigator'
import SquadModal from '../../global/squadModal'
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getEYC3FullPlayerList, removeEYC3FullPlayerList } from '../../utility/apiasyncstorageservice/eyc3AsyncStorageService'
import { getUserCustomizedSquad, removeUserCustomizedSquad } from '../../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import { setPositionToAdd,setPositionToRemove } from '../../../actions/position'
import { setTeamToShow,setTeamData } from '../../../actions/squad'
import { getAssembledUrl } from '../../utility/urlStorage'
import PlayerScore from '../../global/playerScore'
import SquadPopModel from  '../../../modes/SquadPop'
import Rating from  '../../../modes/SquadPop/Rating'
import TeamModel from  '../../../modes/Team'
import SquadRatingModel from '../../../modes/Squad/Rating'
import Immutable, { Map, List,Iterable } from 'immutable'
import Cursor from 'immutable/contrib/cursor'
import SquadList from '../../global/squadList'
import {convertTeamToShow} from '../components/teamToShow'
import SquadShowModel from  '../../../modes/Squad/SquadShowModel'

class MyLionsManageTeam extends Component {

    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.state={
            isLoaded: false,
            isScoreLoaded: false,
            modalVisible: false,
            modalClear:false,
            modalPopulate:false,
            showScoreCard:'semi',
            isSubmitting: false,
            rating:Rating().toJS(),
            userID:'',
            isNetwork: true
        }
        this.isUnMounted = false
        this.uniondata = Data
        this.fullPlayerList={}
        this.catchedSquad={}
        this.saveSquadUrl=getAssembledUrl('SaveGoodFormUserCustomizedSquad')
        this.autoPopulatedSquadUrl=getAssembledUrl('EYC3AutoPopulatedSquad')
        this.getMySquadRatingUrl=getAssembledUrl('EYC3GetMySquadRating')
    }

    componentWillMount() {
        getUserId().then((userID) => {
            this.setState({userID})
        }).catch((error) => {})
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
    showNetError  = ()=> {
        Alert.alert(
          'An error occured',
          'Please make sure that you\'re connected to the network.',
          [{text: 'Dismiss'}]
        )
    }
    _showDetail(item, route,playerPos,max,seq) {
        this.props.setPositionToAdd('')
        this.props.setPositionToRemove(playerPos)
        this.props.drillDown(item, route)
    }

    _addPlayer(type,playerPos,max) {
        this.props.setPositionToAdd(playerPos)
        this.props.setPositionToRemove('')
        this.props.pushNewRoute('myLionsUnionsList')
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
                    {
                        this.state.isLoaded?
                            <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                                <Text style={[styles.headerTitle,styles.squadTitle]}>MY SQUAD</Text>
                                <View>
                                    <SquadList squadDatafeed={this.props.teamToShow} pressImg={this._showDetail.bind(this)} pressAdd={this._addPlayer.bind(this)}/>
                                    <LionsFooter isLoaded={true} />
                                </View>
                            </ScrollView>
                        :
                            <ActivityIndicator style={loader.centered} size='large' />
                    }
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
        getSoticFullPlayerList().then((catchedFullPlayerList) => {                        
            if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                this.fullPlayerList=catchedFullPlayerList
                this.setTeam(TeamModel.format(eval(`(${this.props.teamData})`)))
            }
        }).catch((error) => {
                    this._showError(error) 
        })
    }
    componentWillReceiveProps(nextProps) {
        //console.log('!!!mySquad componentWillReceiveProps')
        // console.log('!!!this.props.squadToShow',JSON.stringify(this.props.squadToShow)!=='{}'?this.props.squadToShow.indivPos:'null')
        // console.log('!!!nextProps.squadToShow',JSON.stringify(nextProps.squadToShow)!=='{}'?nextProps.squadToShow.indivPos:'null')
        // console.log('!!!this.props.squadToShow=nextProps.squadToShow',Map(this.props.squadToShow).equals(Map(nextProps.squadToShow))?'true':'false')
        // console.log('!!!this.props.squadData',this.props.squadData)
        //console.log('!!!nextProps.squadData',nextProps.squadData)
        // console.log('!!!this.props.squadData=nextProps.squadData',this.props.squadData===nextProps.squadData?'true':'false')
        // let routes = globalNav.navigator.getCurrentRoutes()
        
        // re render after 'back nav' pressed
            // if (!this.isUnMounted && nextProps.route.routes[nextProps.route.routes.length-1]==='myLionsSquad') {
            // console.log('!!!!!',nextProps.route.routes)
                // if(JSON.stringify(nextProps.squadToShow)!=='{}'&&nextProps.squadData!==null&&(!Map(this.props.squadToShow).equals(Map(nextProps.squadToShow))||this.props.squadData!==nextProps.squadData)) {
                if(nextProps.teamData!==null) {
                    // console.log('pass')
                    this.setTeam(TeamModel.format(eval(`(${nextProps.teamData})`)))  
                }                
            // }
            // else {
            //     this.setState({
            //         isLoaded: false,
            //     }, () => {
            //         setTimeout(()=>{this._getSquad()},600)
            //     })
            // }
        // }
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
        //console.log('!!!setTeam')
        let tmpTeam=new TeamModel()
        let emptyFeed=true
        let fullFeed=true
        let showTeamFeed=convertTeamToShow(team,this.fullPlayerList,this.uniondata)
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
                    else {
                        emptyFeed=false
                    }
                })
            }
            else {
                value.map((v,i)=>{
                    let p=v.position
                    if(showTeamFeed.get(index)[i].info===null) {
                        team=team.set(p,'')
                        fullFeed=false
                    }
                    else {
                        emptyFeed=false
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
            url: this.saveSquadUrl,
            data:tmpTeam.toJS(),
            onAxiosStart: () => {
            },
            onAxiosEnd: () => {
                this.setState({ isLoaded: true })
            },
            onSuccess: (res) => {
                this.setState({
                    isLoaded:true
                })
            },
            onError: (res) => {
                this.setState({isLoaded: true }, () => {
                    this._showError(res)
                })
            },
            onAuthorization: () => {
                this.setState({isLoaded: true }, () => {
                    this._signInRequired()
                })
            },
            isRequiredToken: true
        }
        if(JSON.stringify(tmpTeam)!==this.props.teamData) {
            console.log('!!!team not equal')
            this.props.setTeamData(JSON.stringify(tmpTeam))
            this.props.setTeamToShow(showTeamFeed.toJS())
        }
        else {
            service(optionsSaveList)
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
        setTeamToShow:(team)=>dispatch(setTeamToShow(team)),
        setTeamData:(team)=>dispatch(setTeamData(team)),
        drillDownItemShare:(data, route, isSub, isPushNewRoute)=>dispatch(shareReplace(data, route, isSub, isPushNewRoute)),
    }
}

export default connect((state) => {
    return {
        drillDownItem: state.content.drillDownItem,
        teamToShow: state.squad.teamToShow,
        teamData: state.squad.teamData,
        netWork: state.network
    }
}, bindAction)(MyLionsManageTeam)

