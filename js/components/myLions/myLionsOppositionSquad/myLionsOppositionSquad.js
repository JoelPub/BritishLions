
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
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'
import { setOppositionSquadToShow } from '../../../actions/squad'
import { getAssembledUrl } from '../../utility/urlStorage'
import OppositionSquadModel from  '../../../modes/Squad/OppositionSquadModel'
import Immutable, { Map, List,Iterable } from 'immutable'
import OppositionSquadList from '../components/oppositionSquadList'
import {convertSquadToShow} from '../components/oppositionSquadToShow'
import { strToUpper } from '../../utility/helper'
import Toast from 'react-native-root-toast'

class MyLionsOppositionSquad extends Component {

    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.state={
            isLoaded: false,
            userID:'',
            isNetwork: true,
            image:this.props.drillDownItem.image,
            title:this.props.drillDownItem.title,
            description:this.props.drillDownItem.description,
            drillDownItem:this.props.drillDownItem,
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
    showNetError  = ()=> {
        Alert.alert(
          'An error occured',
          'Please make sure that you\'re connected to the network.',
          [{text: 'Dismiss'}]
        )
    }
    _showDetail(item, route,playerPos,max,seq) {
      if (__DEV__)console.log('item',item)
      if (__DEV__)console.log('route',route)
        this.props.drillDown(item, route)
    }
    render() {
        let { drillDownItem } = this.state
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
                                <View style={styles.header}>
                                    <View style={styles.playerPic}>
                                        <Image resizeMode='cover' source={{uri: this.state.image}} style={styles.playerPicImg}/>
                                        <Image source={require('../../../../images/redCircle.png')} style={styles.playerPicCover}/>
                                    </View>
                                    
                                    <View style={styles.headerPlayerDetails}>
                                        <Text style={styles.headerPlayerName}>{strToUpper(this.state.title)}</Text>
                                        <Text style={[styles.headerPlayerPosition,{textAlign:'center',paddingHorizontal:25}]}>{this.state.description}</Text>
                                        <ButtonFeedback rounded onPress={()=> { this.props.drillDown(this.state.drillDownItem,this.state.drillDownItem.isPlayed === "true"?'myLionsCompetitionGameResults':'myLionsManageGame') }}
                                            style={[styles.btn, styles.btnGreen ]}>
                                            <Text style={styles.btnText}>{this.state.drillDownItem.isPlayed === "true"?'VIEW RESULT':'PLAY'}</Text>
                                        </ButtonFeedback>
                                    </View>
                                </View>
                                <OppositionSquadList squadDatafeed={this.props.oppositionSquadToShow} pressImg={this._showDetail.bind(this)}/>
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
      if (__DEV__)console.log('_getSquad')
      this.setState({ isLoaded: false },()=>{
          getSoticFullPlayerList().then((catchedFullPlayerList) => {
              if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                this.fullPlayerList=catchedFullPlayerList
                let showSquadFeed=convertSquadToShow(OppositionSquadModel(this.state.drillDownItem.expertTeam),catchedFullPlayerList,this.uniondata)
                if (__DEV__)console.log('showSquadFeed',showSquadFeed.toJS())
                this.props.setOppositionSquadToShow(showSquadFeed.toJS())
                this.setState({isLoaded:true})
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
        setOppositionSquadToShow:(squad)=>dispatch(setOppositionSquadToShow(squad)),
    }
}

export default connect((state) => {
    return {
        drillDownItem: state.content.drillDownItem,
        oppositionSquadToShow: state.squad.oppositionSquadToShow,
        netWork: state.network
    }
}, bindAction)(MyLionsOppositionSquad)

