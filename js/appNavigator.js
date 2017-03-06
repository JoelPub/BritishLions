'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAccessGranted } from './actions/token'
import { getAccessToken, getRefreshToken, updateToken, removeToken } from './components/utility/asyncStorageServices'
import { service } from './components/utility/services'
import { Drawer } from 'native-base'
import { BackAndroid, Platform, StatusBar, View, Alert,NativeModules,AsyncStorage } from 'react-native'
import { closeDrawer } from './actions/drawer'
import { popRoute } from './actions/route'
import { statusBarColor } from './themes/base-theme'
import Navigator from 'Navigator'
import { register } from './components/utility/network'
import {configure,schedule} from './components/utility/notification'

// Templates/pages
import SplashPage from './components/splashscreen/'
import Landing from './components/landing/'
import Login from './components/login/'
import SignUp from './components/signUp/'
import ForgotPassword from './components/forgotPassword'
import MyAccount from './components/myAccount'
import Terms from './components/terms'
import News from './components/news/'
import NewsDetails from './components/news/details'
import NewsDetailsSub from './components/news/detailsSub'
import LionsSideBar from './components/global/lionsSideBar'
import LionsStore from './components/lionsStore'
import MyLions from './components/myLions'
import MyLionsPlayerList from './components/myLions/myLionsPlayerList'
import MyLionsExpertsList from './components/myLions/myLionsExpertsList'
import MylionsExpertProfile from './components/myLions/mylionsExpertProfile'
import MyLionsFavoriteList from './components/myLions/myLionsFavoriteList'
import MyLionsPlayerDetails from './components/myLions/myLionsPlayerDetails'
import MyLionsPlayerProfile from './components/myLions/myLionsPlayerProfile'
import MyLionsCoachProfile from './components/myLions/myLionsCoachProfile'
import MyLionsShareView from './components/myLions/myLionsShareView'
import MyLionsUnionsList from './components/myLions/myLionsUnionsList'
import MyLionsSquad from './components/myLions/myLionsSquad'
import MyLionsOfficialSquad from './components/myLions/myLionsOfficialSquad'
import MyLionsOppositionSquad from './components/myLions/myLionsOppositionSquad'

import MyLionsCompetitionCentre from './components/myLions/myLionsCompetitionCentre'
import MyLionsCompetitionGameListing from './components/myLions/myLionsCompetitionGameListing'
import MyLionsManageTeam from './components/myLions/myLionsManageTeam'
import MyLionsManageGame from './components/myLions/myLionsManageGame'
import MyLionsCompetitionGameResults from './components/myLions/myLionsCompetitionGameResults'
import MyLionsTactics from './components/myLions/tacticManger'
import MyLionsSelectPlayerListing from './components/myLions/myLionsSelectPlayerListing'

import MyLionsGroupView from './components/myLions/myLionsGroupView'
import CompetitionLadder from './components/myLions/competitionLadder'

import Competition from './components/competition'
import Tours from './components/tours'
import Galleries from './components/galleries'
import GalleriesDetails from './components/galleries/details'
import Fixtures from './components/fixtures'
import FixtureDetails from './components/fixtures/details'
import Sponsors from './components/sponsors'
import SponsorDetails from './components/sponsors/details'
import SponsorDetailsSub from './components/sponsors/detailsSub'
import Unions from './components/unions'
import UnionDetails from './components/unions/details'
import UnionDetailsSub from './components/unions/detailsSub'
import IosUtilityHeaderBackground from './components/utility/iosUtilityHeaderBackground'
import { actionsApi } from './components/utility/urlStorage'
import LionsTV from './components/lionsTV'
import DetailsLionsTV from './components/lionsTV/detailsLionTV'
import Contact from './components/contact'
import Storage from 'react-native-storage'

import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from 'react-native-google-analytics-bridge';


Navigator.prototype.replaceWithAnimation = function (route) {
    const activeLength = this.state.presentedIndex + 1
    const activeStack = this.state.routeStack.slice(0, activeLength)
    const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength)
    const nextStack = activeStack.concat([route])
    const destIndex = nextStack.length - 1
    const nextSceneConfig = this.props.configureScene(route, nextStack)
    const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig])

    const replacedStack = activeStack.slice(0, activeLength - 1).concat([route])
    this._emitWillFocus(nextStack[destIndex])
    this.setState({
        routeStack: nextStack,
        sceneConfigStack: nextAnimationConfigStack,
    }, () => {
        this._enableScene(destIndex)
        this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
            this.immediatelyResetRouteStack(replacedStack)
        })
    })
}

export var globalNav = {}

const reducerCreate = params => {
    const defaultReducer = Reducer(params)
    return (state, action) => {
        var currentState = state
        if(currentState){
            while (currentState.children){
                currentState = currentState.children[currentState.index]
            }
        }
        return defaultReducer(state, action)
    }
}

class AppNavigator extends Component {

    constructor(props){
        super(props)
        this.serviceUrl = actionsApi.goodFormRefreshToken
        this.state = {
            tracker: new GoogleAnalyticsTracker('UA-91181535-1'),
        }
    }

    _refreshToken() {    
        getRefreshToken().then((refreshToken) => {
            let options = {
                url: this.serviceUrl,
                data: {
                    'refresh_token': refreshToken,
                    'grant_type': 'refresh_token'
                },
                onSuccess: (res) => {
                    // Update token 
                    let { access_token, refresh_token, first_name, last_name, is_first_log_in } = res.data
                    updateToken(access_token, refresh_token, first_name, last_name, is_first_log_in)
                    
                    // Flag user access granted
                    this.props.setAccessGranted(true)
                },
                onError: (error) => {
                    //console.log('error: ', error)
                    // logout user
                    removeToken()
                    this.props.setAccessGranted(false)
                },
                isRefreshToken: true
            }

            service(options)

        }).catch((error) => {
            // We can't get the existing refresh token of the user here
            // In this situation, user will not logged in
            // By default: the redux isAccessGranted is set to 'false'
        })
    } 

    componentWillMount() {
        getAccessToken().then((accessToken) => {
            if (accessToken) {
                this._refreshToken() // update the token
            } 
        }).catch((error) => {
            // Nothing to do here since user don't have an existing ACCESS TOKEN
            // In this situation, user is not logged in
            // By default: the redux isAccessGranted is set to 'false'
        })
    }

    componentDidMount() {
        var storage = new Storage({
            size: 1000,
            storageBackend: AsyncStorage,
            defaultExpires: 1000 * 3600,
            enableCache: true,
        })
        global.storage = storage

        globalNav.navigator = this._navigator

        this.props.store.subscribe(() => {
            if(this.props.store.getState().drawer.drawerState == 'opened')
                this.openDrawer()

            if(this.props.store.getState().drawer.drawerState == 'closed')
                this._drawer.close()
        })

        BackAndroid.addEventListener('hardwareBackPress', () => {
            var routes = this._navigator.getCurrentRoutes()

            if(routes[routes.length - 1].id == 'landing' || routes[routes.length - 1].id == 'login') {
                return false
            }
            else {
                this.popRoute()
                return true
            }
        })
        
        register(this.props.store)
        configure.then(
            schedule()
        )
        // console.log('!!! System.out start')
        // NativeModules.ClarisiteAgent.start("http://report-bl.clarisite.com","A2BA2975-8DDB-9C8F-C629-FA45318BE325",(msg)=>{console.log('System.out ' , msg)}, (error)=>{console.log('System.out ' , error)})
        NativeModules.ClarisiteAgent.start("http://report-bl.clarisite.com","A2BA2975-8DDB-9C8F-C629-FA45318BE325")
    }

    popRoute() {
        this.props.popRoute()
    }

    openDrawer() {
        this._drawer.open()
    }

    closeDrawer() {
        if(this.props.store.getState().drawer.drawerState == 'opened') {
            this._drawer.close()
            this.props.closeDrawer()
        }
    }

    render() {
        return (
            <View style={{flex:1}}>

                <IosUtilityHeaderBackground />

                <Drawer
                    ref={(ref) => this._drawer = ref}
                    type='overlay'
                    content={<LionsSideBar navigator={this._navigator} />}
                    tapToClose={true}
                    onClose={() => this.closeDrawer()}
                    side='right'
                    openDrawerOffset={0.21}
                    panOpenMask={0}
                    panCloseMask={0.21}
                    negotiatePan={true}
                    tweenEasing='easeInOutCubic'
                    // tweenHandler={(ratio) => ({
                    //     main: { backgroundColor: '#000', opacity:(2-ratio)/2 }
                    // })}
                    tweenDuration={400}>

                    <StatusBar
                        backgroundColor={statusBarColor}
                        barStyle='light-content'
                    />

                    <Navigator
                        style={statusBarColor}
                        ref={(ref) => this._navigator = ref}
                        configureScene={(route) => {
                            return {
                                // ...Navigator.SceneConfigs.FloatFromRight,
                                ...Navigator.SceneConfigs.PushFromRight,
                                gestures: {
                                  pop: {
                                    ...Navigator.SceneConfigs.FloatFromRight.gestures.pop
                                  }
                                }
                            }
                        }}
                        initialRoute={{id: (Platform.OS === 'android') ? 'splashscreen' : 'landing', statusBarHidden: true}}
                        renderScene={this.renderScene} />
                </Drawer>
            </View>
        )
    }

    renderScene = (route, navigator) => {
        if(route.component) {
            var Component = route.component
            return (
                <Component navigator={navigator} route={route} {...route.passProps} />
            )
        }
        this.state.tracker.allowIDFA(true);
        this.state.tracker.trackScreenView(route.id);
        switch (route.id) {
            case 'splashscreen':
                return <SplashPage navigator={navigator} />
            case 'landing':
                return <Landing navigator={navigator} />
            case 'login':
                return <Login navigator={navigator} />
            case 'forgotPassword':
                return <ForgotPassword navigator={navigator} />
            case 'myAccount':
                return <MyAccount navigator={navigator} />
            case 'terms':
                return <Terms navigator={navigator} />
            case 'signUp':
                return <SignUp navigator={navigator} />
            case 'news':
                return <News navigator={navigator} />
            case 'newsDetails':
                return <NewsDetails navigator={navigator} />
            case 'newsDetailsSub':
                return <NewsDetailsSub navigator={navigator} />
            case 'lionsSideBar':
                return <LionsSideBar navigator={navigator} />
            case 'lionsStore':
                return <LionsStore navigator={navigator} />
            case 'myLions':
                return <MyLions navigator={navigator} />
            case 'myLionsPlayerList':
                    return <MyLionsPlayerList navigator={navigator} />
            case 'myLionsFavoriteList':
                return <MyLionsFavoriteList navigator={navigator} />
            case 'myLionsGroupView':
                return <MyLionsGroupView navigator={navigator} />
            case 'competitionLadder':
                return <CompetitionLadder navigator={navigator} />
            case 'myLionsUnionsList':
                return <MyLionsUnionsList navigator={navigator} />
            case 'myLionsSquad':
                return <MyLionsSquad navigator={navigator} />
            case 'myLionsOfficialSquad':
                return <MyLionsOfficialSquad navigator={navigator} />
            case 'myLionsOppositionSquad':
                return <MyLionsOppositionSquad navigator={navigator} />
            case 'myLionsPlayerDetails':
                return <MyLionsPlayerDetails navigator={navigator} />
            case 'myLionsPlayerProfile':
                return <MyLionsPlayerProfile navigator={navigator} />
            case 'myLionsCoachProfile':
                return <MyLionsCoachProfile navigator={navigator} />
            case 'myLionsExpertsList' :
                return <MyLionsExpertsList navigator={navigator} />
            case 'mylionsExpertProfile' :
                return <MylionsExpertProfile navigator={navigator} />
            case 'myLionsCompetitionCentre':
                return <MyLionsCompetitionCentre navigator={navigator} />
            case 'myLionsCompetitionGameListing':
                return <MyLionsCompetitionGameListing navigator={navigator} />
            case 'myLionsManageTeam':
                return <MyLionsManageTeam navigator={navigator} />
            case 'myLionsTactics':
                return <MyLionsTactics navigator={navigator} />
            case 'myLionsSelectPlayerListing':
                return <MyLionsSelectPlayerListing navigator={navigator} />
            case 'myLionsManageGame':
                return <MyLionsManageGame navigator={navigator} />
            case 'myLionsCompetitionGameResults':
                return <MyLionsCompetitionGameResults navigator={navigator} />
            case 'myLionsShareView' :
                return <MyLionsShareView navigator={navigator} />
            case 'competition':
                return <Competition navigator={navigator} />
            case 'tours':
                return <Tours navigator={navigator} />
            case 'galleries':
                return <Galleries navigator={navigator} />
            case 'galleriesDetails':
                return <GalleriesDetails navigator={navigator} />
            case 'fixtures':
                return <Fixtures navigator={navigator} />
            case 'fixtureDetails':
                return <FixtureDetails navigator={navigator} />
            case 'sponsors':
                return <Sponsors navigator={navigator} />
            case 'sponsorDetails':
                return <SponsorDetails navigator={navigator} />
            case 'sponsorDetailsSub':
                return <SponsorDetailsSub navigator={navigator} />
            case 'unions':
                return <Unions navigator={navigator} />
            case 'unionDetails':
                return <UnionDetails navigator={navigator} />
            case 'unionDetailsSub':
                return <UnionDetailsSub navigator={navigator} />
            case 'lionsTv':
                return <LionsTV navigator={navigator} />
            case 'lionsTvDetails':
                return <DetailsLionsTV navigator={navigator} />
            case 'contact':
                return <Contact navigator={navigator} />
            default :
                return <Landing navigator={navigator}  />
        }
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: () => dispatch(closeDrawer()),
        popRoute: () => dispatch(popRoute()),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}

const mapStateToProps = (state) => {
    return {
        drawerState: state.drawer.drawerState
    }
}

export default connect(mapStateToProps, bindAction) (AppNavigator)
