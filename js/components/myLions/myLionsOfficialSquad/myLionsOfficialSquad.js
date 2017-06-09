
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
import { drillDown} from '../../../actions/content'
import { setAccessGranted } from '../../../actions/token'
import { removeToken, getUserId ,getAccessToken,getRefreshToken} from '../../utility/asyncStorageServices'
import { setJumpTo } from '../../../actions/jump'
import { service } from '../../utility/services'
import Data from '../../../../contents/unions/data'
import { globalNav } from '../../../appNavigator'
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getEYC3OfficialSquad,removeEYC3OfficialSquad} from '../../utility/apiasyncstorageservice/eyc3AsyncStorageService'
import { setOfficialSquadToShow,setCoachAndStaff } from '../../../actions/squad'
import { getAssembledUrl,actionsApi } from '../../utility/urlStorage'
import OfficialSquadModel from  '../../../modes/Squad/OfficialSquadModel'
import Immutable, { Map, List,Iterable } from 'immutable'
import Cursor from 'immutable/contrib/cursor'
import OfficialSquadList from '../components/officialSquadList'
import {convertSquadToShow} from '../components/officialSquadToShow'
import { strToUpper,isEmptyObject } from '../../utility/helper'
import _fetch from '../../utility/fetch'
import Toast from 'react-native-root-toast'

class MyLionsOfficialSquad extends Component {

    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.state={
            isLoaded: false,
            userID:'',
            isNetwork: true
        }
        this.uniondata = Data
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

    _isSignIn(route) {
             getRefreshToken().then((refreshToken) => {
                if(refreshToken)
                    this._navigateTo(route)
                else{
                    // if (__DEV__)console.log('jumproute',route)
                    this.props.setJumpTo(route)
                    this._navigateTo('login')
                }
             }).catch((error) => {
                this._navigateTo('login')
            })
    }

    _navigateTo(route) {
        this.props.pushNewRoute(route)
    }

    showNetError  = ()=> {
        Alert.alert(
          'An error occured',
          'Please make sure that you\'re connected to the network.',
          [{text: 'Dismiss'}]
        )
    }
    _showDetail(item, route,playerPos,max,seq) {
        this.props.drillDown(item, route)
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
                                <Text style={[styles.headerTitle,styles.squadTitle]}>2017 LIONS SQUAD</Text>
                                <OfficialSquadList squadDatafeed={this.props.officialSquadToShow} coachAndStaffData={this.props.coachAndStaffData} pressImg={this._showDetail.bind(this)}/>
                                <ButtonFeedback rounded style={[styles.button,styles.btnExpert]} onPress={() =>this._isSignIn('myLionsCompetitionCentre')}
                                >
                                    <Icon name='md-analytics' style={styles.btnFavouritesIcon} />
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.btnExpertLabel} >
                                        COMPETITION CENTRE
                                    </Text>
                                </ButtonFeedback>
                                <LionsFooter isLoaded={true} />
                            </ScrollView>
                        :
                            <ActivityIndicator style={loader.centered} size='large' />
                    }
                    <EYSFooter mySquadBtn={true}/>
                </View>
            </Container>
        )
    }

    componentDidMount() {
        //setTimeout(() => this._getSquad(), 600)

      setTimeout(()=>{
        let {userProfile} = this.props
        this._getSquad(userProfile.userID)
        this._getCoachAndStaffData()
      },2000)
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
    _getCoachAndStaffData = () => {
        let coachAndStaff = [];
        _fetch({url:'https://f3k8a7j4.ssl.hwcdn.net/feeds/app/coaches.php'}).then((json)=>{
            json.map((item)=>{
                coachAndStaff.push(item)
                    })

            this.props.setCoachAndStaff(coachAndStaff)

            //_fetch({url:'https://f3k8a7j4.ssl.hwcdn.net/feeds/app/management.php'}).then((otherJson)=>{
            //    otherJson.map((item)=>{
            //        coachAndStaff.push(item)
            //    })
            //    json.map((item,index)=>{
            //        if (index!==0){
            //            coachAndStaff.push(item)
            //        }
            //    })
            //    //_fetch({url:'https://f3k8a7j4.ssl.hwcdn.net/feeds/app/backroom.php'}).then((therdJson)=>{
            //    //    therdJson.map((item)=>{
            //    //        coachAndStaff.push(item)
            //    //    })
            //    //    // if (__DEV__)console.log('测试******')
            //    //    // if (__DEV__)console.log(coachAndStaff)
            //    //
            //    //})
            //
            //})


        }).catch((error)=>{
            // if (__DEV__)console.log(error)
        })
    }
    _getSquad(userId){
      this.setState({ isLoaded: false },()=>{
          getSoticFullPlayerList().then((catchedFullPlayerList) => {
              if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                  // let optionsOfficialSquad = {
                  //     url: actionsApi.eyc3GetOfficalSquad,
                  //     onAxiosStart: null,
                  //     onAxiosEnd: null,
                  //     method: 'post',
                  //     channel: 'EYC3',
                  //     isQsStringify:false,
                  //     onSuccess: (res) => {
                  //         if(res.data) {
                  //                 let showSquadFeed=convertSquadToShow(OfficialSquadModel(res.data),catchedFullPlayerList,this.uniondata)
                  //                 this.props.setOfficialSquadToShow(showSquadFeed.toJS())
                  //                 this.setState({isLoaded:true})
                  //         }
                  //     },
                  //     onError: null,
                  //     isRequiredToken: false
                  // }
                  //  service(optionsOfficialSquad)
                  getEYC3OfficialSquad().then((catchedOfficialSquad) => {
                        // if (__DEV__)console.log('catchedOfficialSquad',catchedOfficialSquad)
                        if(catchedOfficialSquad !== null && catchedOfficialSquad !== 0 && catchedOfficialSquad !== -1) {
                            let showSquadFeed=convertSquadToShow(OfficialSquadModel(catchedOfficialSquad),catchedFullPlayerList,this.uniondata)
                            this.props.setOfficialSquadToShow(showSquadFeed.toJS())
                            this.setState({isLoaded:true})
                        }
                        else {
                            this.setState({ isLoaded: true })
                        }
                  }).catch((error) => {
                        this.setState({ isLoaded: true }, () => {
                                this._showError(error) // prompt error
                        })
                  })

              }
          }).catch((error) => {
              this.setState({ isLoaded: true }, () => {
                      this._showError(error) // prompt error
              })
          })
      })
    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted)),
        setOfficialSquadToShow:(squad)=>dispatch(setOfficialSquadToShow(squad)),
        setCoachAndStaff: (cocahAndStaff)=>dispatch(setCoachAndStaff(cocahAndStaff)),
        setJumpTo:(jumpRoute)=>dispatch(setJumpTo(jumpRoute)),
    }
}

export default connect((state) => {
  //  if (__DEV__)console.log(state)
    return {
        officialSquadToShow: state.squad.officialSquadToShow,
        netWork: state.network,
        userProfile:state.squad.userProfile,
        coachAndStaffData: state.squad.coachData
    }
}, bindAction)(MyLionsOfficialSquad)

