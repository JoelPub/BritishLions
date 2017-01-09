'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import { setAccessGranted } from '../../actions/token'
import { service } from '../utility/services'
import { replaceOrPushRoute, resetRoute } from '../../actions/route'
import { closeDrawer } from '../../actions/drawer'
import { Container, Content, Footer, View, Text, Button, Icon } from 'native-base'
import { removeToken, checkIfLogin, generateLoginExpiration, getRefreshToken, updateToken } from '../utility/asyncStorageServices'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from '../utility/buttonFeedback'
import  { Grid, Col, Row } from 'react-native-easy-grid'
import { debounce } from 'lodash'
import { alertBox } from '../utility/alertBox'
import { removeGoodFormFavoritePlayerList, removeUserCustomizedSquad } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'

const styles = styleSheetCreate({
    background: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: styleVar.colorText
    },
    drawerContent: {
        flex: 1
    },
    links: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: '#000',
        borderTopColor: '#3a3a3a',
        paddingTop: 4
    },
    linkText: {
        flex: 1,
        fontSize: 28,
        lineHeight: 28,
        fontFamily: styleVar.fontCondensed,
        textAlign: 'left',
        color: '#FFF',
        paddingTop: 12,
        paddingLeft: 10,
        android: {
            paddingTop: 0
        }
    },
    icon:{
        marginLeft: 20,
        width: 34,
        color: 'rgb(175,0,30)'
    },
    footer: {
        height: 50,
        backgroundColor: '#000'
    },
    footerWrapper: {
        paddingLeft:10,
        height: 50
    },
    footerLink: {
        flexDirection:'row',
        height:50,
    },
    linkAccount: {
        borderRightWidth:1,
        borderRightColor:'rgba(255,255,255,0.15)',
        paddingLeft:5
    },
    linkLogin: {
        justifyContent: 'flex-start',
        paddingLeft:15
    },
    linkLogout: {
        justifyContent: 'center',
    },
    footerLinkText: {
        textAlign: 'right',
        color: '#FFF',
        paddingTop: 17,
        fontSize: 24,
        fontFamily: styleVar.fontCondensed
    },
    footerLinkIcon: {
        width: 34,
        paddingLeft: 5,
        alignSelf: 'center',
        color: styleVar.colorScarlet,
        fontSize: 24
    }
})

class LionsSidebar extends Component {
    constructor(props) {
        super(props)

        this.isUnMounted = false
        this.state = {
            isAjaxRequesting: false,
            routeRequesting: ''
        }

        // debounce event
        this.navigateTo = debounce(this.navigateTo, 1000, {leading: true, maxWait: 0, trailing: false})
        this._requireSignIn = debounce(this._requireSignIn, 1000, {leading: true, maxWait: 0, trailing: false})
    }

    navigateTo(route) {
        setTimeout(() => {
          this.props.replaceOrPushRoute(route)
        }, 400)
        this.props.closeDrawer()
    }

    resetRoute(route) {
        setTimeout(() => {
          this.props.resetRoute(route)
        }, 400)
        this.props.closeDrawer()
    }

    _reLogin() {
        this.navigateTo('login')
    }

    _askToSignIn() {
        removeToken()
        this.props.setAccessGranted(false)
        
        Alert.alert(
            'Your session has expired',
            'Please sign in your account again.',
            [{
                text: 'SIGN IN',
                onPress: this._reLogin.bind(this)
            }]
        )
    }

    _refreshToken(route) {
        let refreshTokenUrl = 'https://www.api-ukchanges2.co.uk/api/sessions/create'
        
        if (!this.state.isAjaxRequesting) {  
            // if no requesting in service, then lets proceed

            getRefreshToken().then((refreshToken) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                service({
                    url: refreshTokenUrl,
                    data: {
                        'refresh_token': refreshToken,
                        'grant_type': 'refresh_token'
                    },
                    onAxiosStart: () => {
                        if (this.isUnMounted) return // return nothing if the component is already unmounted
                        this.setState({ isAjaxRequesting: true, routeRequesting: route })
                    },
                    onAxiosEnd: () => {
                        if (this.isUnMounted) return // return nothing if the component is already unmounted
                        this.setState({ isAjaxRequesting: false, routeRequesting: '' })
                    },
                    onSuccess: (res) => {
                        if (this.isUnMounted) return // return nothing if the component is already unmounted

                        // successfully refresh the token
                        let accessToken = res.data.access_token
                        let refreshToken = res.data.refresh_token
                        
                        // then lets update user's token 
                        updateToken(accessToken, refreshToken)
                        // then navigate user to the page route
                        this.navigateTo(route)
                    },
                    onError: (error) => {
                        if (this.isUnMounted) return // return nothing if the component is already unmounted

                        if (error === 'The email and password do not match, Please verify and try again.') {
                            // token failed to update, ask user to sign in again
                            this._askToSignIn()
                        } else {
                            alertBox(
                                'An Error Occured',
                                error,
                                'Dismiss'
                            )
                        }
                    }
                })
            }).catch((error) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                // We can't get the existing refresh token of the user here
                // ask user to sign in again
                this._askToSignIn()
            })
        }
    }

    _requireSignIn(route) {
        if (this.props.isAccessGranted) {
            // user still logged in, then we need check if user's token still valid
            checkIfLogin().then((isTokenValid) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                if (isTokenValid) {
                    // still token is valid
                    this.navigateTo(route)
                } else {
                    // token was expired, let refresh the token
                    this._refreshToken(route)
                }
            }).catch((error) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                // token was expired, let refresh the token
                this._refreshToken()
            })
        } else {
            // user is not logged it, then we redirect it to login page
            this.navigateTo('login')
        }
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    _signOut() {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to logout?',
            [
                {text: 'Yes', onPress: () => {
                    this.props.setAccessGranted(false)
                    removeToken()
                    removeGoodFormFavoritePlayerList()
                    removeUserCustomizedSquad()
                    this.navigateTo('news')
                }},
                {text: 'No'}
            ]
        )
    }

    render(){
        let labelMyAccount = 'MY ACCOUNT'
        let labelMyLions = 'MY LIONS'

        if (this.state.isAjaxRequesting) {
            if (this.state.routeRequesting === 'myAccount') {
                labelMyAccount = 'VIEWING..'
            } 
            if (this.state.routeRequesting === 'myLions') {
                labelMyLions = 'VIEWING..'
            }
        }

        return (
            <Container style={styles.background}>
                <Content style={styles.drawerContent}>
                    <ButtonFeedback onPress={() => this.navigateTo('news')} style={styles.links}>
                        <Icon name='md-planet' style={styles.icon} />
                        <Text style={styles.linkText}>NEWS</Text>
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('fixtures')} style={styles.links}>
                        <Icon name='md-american-football' style={styles.icon} />
                        <Text style={styles.linkText}>FIXTURES</Text>
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('lionsTv')} style={styles.links}>
                        <Icon name='md-play' style={styles.icon} />
                        <Text style={styles.linkText}>LIONS TV</Text>
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('galleries')} style={styles.links}>
                        <Icon name='md-image' style={styles.icon} />
                        <Text style={styles.linkText}>GALLERIES</Text>
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this._requireSignIn('myLions')} style={styles.links}>
                        <Icon name='md-heart' style={styles.icon} />
                        <Text style={styles.linkText}>{labelMyLions}</Text>
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('lionsStore')} style={styles.links}>
                        <Icon name='md-ribbon' style={styles.icon} />
                        <Text style={styles.linkText}>OFFICIAL STORE</Text>
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('tours')} style={styles.links}>
                        <Icon name='md-people' style={styles.icon} />
                        <Text style={styles.linkText}>SUPPORTER TOURS</Text>
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('competition')} style={styles.links}>
                        <Icon name='md-trophy' style={styles.icon} />
                        <Text style={styles.linkText}>COMPETITIONS</Text>
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('sponsors')} style={styles.links}>
                        <Icon name='md-flag' style={styles.icon} />
                        <Text style={styles.linkText}>SPONSORS</Text>
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('unions')} style={styles.links}>
                        <Icon name='md-globe' style={styles.icon} />
                        <Text style={styles.linkText}>UNIONS</Text>
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('contact')} style={styles.links}>
                        <Icon name='md-mail' style={styles.icon} />
                        <Text style={styles.linkText}>CONTACT US</Text>
                    </ButtonFeedback>
                </Content>
                <Footer style={styles.footer}>
                    <View style={styles.footerWrapper}>
                          { !this.props.isAccessGranted?
                              <Grid>
                                  <Col size={100}>
                                      <ButtonFeedback style={[styles.footerLink,styles.linkLogin]} onPress={() => this.navigateTo('login')}>
                                          <Text style={styles.footerLinkText}>SIGN IN</Text>
                                          <Icon name='md-log-in' style={styles.footerLinkIcon} />
                                      </ButtonFeedback>
                                  </Col>
                              </Grid>
                          :
                              <Grid>
                                  <Col size={55}>
                                      <ButtonFeedback style={[styles.footerLink,styles.linkAccount]} onPress={() => this._requireSignIn('myAccount')}>
                                          <Icon name='md-contact' style={styles.footerLinkIcon} />
                                          <Text style={styles.footerLinkText}>{labelMyAccount}</Text>
                                      </ButtonFeedback>
                                  </Col>
                                  <Col size={45}>
                                      <ButtonFeedback style={[styles.footerLink,styles.linkLogin]} onPress={this._signOut.bind(this)}>
                                          <Text style={styles.footerLinkText}>LOGOUT</Text>
                                      </ButtonFeedback>
                                  </Col>
                              </Grid>
                          }
                    </View>
                </Footer>
            </Container>
        )
    }
}

function bindActions(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        resetRoute:(route)=>dispatch(resetRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}


export default connect((state) => {
    return {
        isAccessGranted: state.token.isAccessGranted
    }
}, bindActions)(LionsSidebar)
