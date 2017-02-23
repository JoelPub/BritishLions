
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
import { setOfficialSquadToShow } from '../../../actions/squad'
import { getAssembledUrl } from '../../utility/urlStorage'
import PlayerScore from '../../global/playerScore'
import SquadPopModel from  '../../../modes/SquadPop'
import Rating from  '../../../modes/SquadPop/Rating'
import OfficialSquadModel from  '../../../modes/Squad/OfficialSquadModel'
import SquadRatingModel from '../../../modes/Squad/Rating'
import Immutable, { Map, List,Iterable } from 'immutable'
import Cursor from 'immutable/contrib/cursor'
import OfficialSquadList from '../components/officialSquadList'
import {convertSquadToShow} from '../components/officialSquadToShow'
import SquadShowModel from  '../../../modes/Squad/SquadShowModel'

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
        item.isShowAddBtn = false
        this.props.drillDown(item, route)
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
                                <Text style={[styles.headerTitle,styles.squadTitle]}>2017 OFFICIAL SQUAD</Text>
                                <OfficialSquadList squadDatafeed={this.props.officialSquadToShow} pressImg={this._showDetail.bind(this)}/>
                                <ButtonFeedback rounded style={[styles.button,styles.btnExpert]} onPress={() => this.props.pushNewRoute('myLionsCompetitionCentre')}>
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
                    <LoginRequire/>
                </View>
            </Container>
        )
    }

    componentDidMount() {
        setTimeout(() => this._getSquad(), 600)        
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

    _getSquad(){
      console.log('_getSquad')
      this.setState({ isLoaded: false },()=>{
          getSoticFullPlayerList().then((catchedFullPlayerList) => {
              if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                  this.fullPlayerList=catchedFullPlayerList
                  let optionsOfficialSquad = {
                      url: 'https://api.myjson.com/bins/14iqg1',
                      data: {id:this.state.userID},
                      onAxiosStart: null,
                      onAxiosEnd: null,
                      method: 'get',
                      onSuccess: (res) => {
                          if(res.data) {
                                  console.log('res.data',res.data)                    
                                  this.setSquadData(OfficialSquadModel(res.data))
                          }
                      },
                      onError: null,
                      onAuthorization: () => {
                              this._signInRequired()
                      },
                      isRequiredToken: true
                  }
                  service(optionsOfficialSquad)

                
              }
          }).catch((error) => {
              this.setState({ isLoaded: true }, () => {
                      this._showError(error) // prompt error
              })
          })
      })
    }

    setSquadData(squad){
      console.log('setSquadData')
        let tmpSquad=new OfficialSquadModel()
        let showSquadFeed=convertSquadToShow(squad,this.fullPlayerList,this.uniondata)
        this.props.setOfficialSquadToShow(showSquadFeed.toJS())
        this.setState({isLoaded:true})
        
    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted)),
        setOfficialSquadToShow:(squad)=>dispatch(setOfficialSquadToShow(squad)),
        drillDownItemShare:(data, route, isSub, isPushNewRoute)=>dispatch(shareReplace(data, route, isSub, isPushNewRoute)),
    }
}

export default connect((state) => {
    return {
        drillDownItem: state.content.drillDownItem,
        officialSquadToShow: state.squad.officialSquadToShow,
        netWork: state.network
    }
}, bindAction)(MyLionsOfficialSquad)

