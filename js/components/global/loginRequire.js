'use strict'

import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { pushNewRoute } from '../../actions/route'
import { setAccessGranted } from '../../actions/token'
import OverlayLoader from '../utility/overlayLoader' 
import { removeToken, checkIfLogin, getRefreshToken, updateToken } from '../utility/asyncStorageServices'
import { actionsApi } from '../utility/urlStorage'
import { service } from '../utility/services'

class LoginRequire extends Component {
	constructor(props){
		super(props)

        this.state = {
            isOverlayLoaderVisible: false,
            isUnMounted: false
        }
	}

    _onFinishCallBack(isLogin) {
        if(this.props.onFinish) this.props.onFinish(isLogin) // callback function
    }

    _closeIndicator() {
        this.setState({ isOverlayLoaderVisible: false })
    }

    _reLogin() {
        this.props.pushNewRoute('login')
    }

    _askToSignIn() {
        removeToken()
        this.props.setAccessGranted(false)
        
        Alert.alert(
            'Your session has expired',
            'Please sign into your account again.',
            [{
                text: 'SIGN IN',
                onPress: this._reLogin.bind(this)
            }]
        )
    }

    _refreshToken(route) {
        let refreshTokenUrl = actionsApi.goodFormRefreshToken
        
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
                    this.setState({ isOverlayLoaderVisible: true })
                },
                onAxiosEnd: () => {
                    if (this.isUnMounted) return // return nothing if the component is already unmounted
                    this._closeIndicator()
                },
                onSuccess: (res) => {
                    if (this.isUnMounted) return // return nothing if the component is already unmounted
                    // successfully refresh the token
                    // then lets update user's token 
                    let { access_token, refresh_token, first_name, last_name, is_first_log_in } = res.data
                    updateToken(access_token, refresh_token, first_name, last_name, is_first_log_in)

                    this._onFinishCallBack(true) // callback function
                },
                onError: (error) => {
                    if (this.isUnMounted) return // return nothing if the component is already unmounted

                    // token failed to update, ask user to sign in again
                    setTimeout(() => {
                        console.warn('error1: ', error)
                        this._askToSignIn()
                        this._onFinishCallBack(false) // callback function
                    }, 300)
                }
            })
        }).catch((error) => {
            if (this.isUnMounted) return // return nothing if the component is already unmounted
                
            // We can't get the existing refresh token of the user here
            // ask user to sign in again
            console.warn('error2: ', error)
            this._askToSignIn()
            this._onFinishCallBack(false) // callback function
        })
    }

    _isSignIn(route) {
        // if (this.state.isAccessGranted) {
            // user still logged in, then we need check if user's token still valid
            checkIfLogin().then((isTokenValid) => {
                if (this.state.isUnMounted) return // return nothing if the component is already unmounted

                if (isTokenValid) {
                    // token still valid, do nothing
                    this._onFinishCallBack(true) // callback function
                } else {
                    // token was expired, let refresh the token
                    this._refreshToken(route)
                }
            }).catch((error) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                // token was expired, let refresh the token
                this._refreshToken()
            })
        // } else {
        //     // user is not logged in, then ask user to login again
        //     this._askToSignIn()
        // }
    }

    componentWillMount() {
        this._isSignIn()
    }

    componentWillUnmount() {
        this.setState({ isUnMounted: true })
    }

    render() {
    	return (
            <OverlayLoader visible={this.state.isOverlayLoaderVisible} showBothPlatform={true} />
        )
    }
}


function bindActions(dispatch) {
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}

export default connect((state) => {
    return {
        isAccessGranted: state.token.isAccessGranted
    }
},  bindActions)(LoginRequire)

