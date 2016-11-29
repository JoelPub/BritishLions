'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAccessGranted } from './actions/token'
import { getAccessToken, getRefreshToken, updateToken, removeToken } from './components/utility/asyncStorageServices'
import { service } from './components/utility/services'
import { Drawer } from 'native-base'
import { BackAndroid, Platform, StatusBar, View, Alert } from 'react-native'
import { closeDrawer } from './actions/drawer'
import { popRoute } from './actions/route'
import { statusBarColor } from './themes/base-theme'
import Navigator from 'Navigator'

// Templates/pages
import SplashPage from './components/splashscreen/'
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
import MyLionsFavoriteList from './components/myLions/myLionsFavoriteList'
import MyLionsPlayerDetails from './components/myLions/myLionsPlayerDetails'
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
import LionsTV from './components/lionsTV'
import DetailsLionsTV from './components/lionsTV/detailsLionTV'
import Contact from './components/contact'

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

        this.serviceUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/sessions/create'
    }

    _refreshToken() {    
        getRefreshToken().then((refreshToken) => {
            removeToken() // Make sure to remove user's device token first
            this.props.setAccessGranted(false) // make the flag false

            let data = {
                'refresh_token': refreshToken,
                'grant_type': 'refresh_token'
            }

            service(this.serviceUrl, data, (res) => {
                let accessToken = res.data.access_token
                let refreshToken = res.data.refresh_token
                
                // Update token 
                updateToken(accessToken, refreshToken)
                // Flag user access granted
                this.props.setAccessGranted(true)

            }, false, true)
        }).catch((error) => {
            // We can't get the existing refresh token of the user here
            // In this situation, user will not logged in
            
            removeToken() // Make sure to remove user's device token
            this.props.setAccessGranted(false)
        })
    } 

    componentWillMount() {
        getAccessToken().then((accessToken) => {
            if (accessToken) {
                this._refreshToken()
            }
        }).catch((error) => {
            // Nothing to do here since user don't have an existing ACCESS TOKEN
            // In this situation, user is not logged in

            removeToken() // Make sure to remove user's device token
            this.props.setAccessGranted(false)
        })
    }

    componentDidMount() {
        globalNav.navigator = this._navigator

        this.props.store.subscribe(() => {
            if(this.props.store.getState().drawer.drawerState == 'opened')
                this.openDrawer()

            if(this.props.store.getState().drawer.drawerState == 'closed')
                this._drawer.close()
        })

        BackAndroid.addEventListener('hardwareBackPress', () => {
            var routes = this._navigator.getCurrentRoutes()

            if(routes[routes.length - 1].id == 'news' || routes[routes.length - 1].id == 'login') {
                return false
            }
            else {
                this.popRoute()
                return true
            }
        })
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
                    tapToClose={false}
                    onClose={() => this.closeDrawer()}
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
                        initialRoute={{id: (Platform.OS === 'android') ? 'splashscreen' : 'news', statusBarHidden: true}}
                        renderScene={this.renderScene} />
                </Drawer>
            </View>
        )
    }

    renderScene(route, navigator) {
        if(route.component) {
            var Component = route.component
            return (
                <Component navigator={navigator} route={route} {...route.passProps} />
            )
        }

        switch (route.id) {
            case 'splashscreen':
                return <SplashPage navigator={navigator} />
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
            case 'myLionsPlayerDetails':
                return <MyLionsPlayerDetails navigator={navigator} />
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
                return <News navigator={navigator}  />
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
