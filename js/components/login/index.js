'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAccessGranted } from '../../actions/token'
import { updateToken, removeToken } from '../utility/asyncStorageServices'
import { Keyboard, Dimensions, Image, PanResponder} from 'react-native'
import { pushNewRoute, replaceRoute } from '../../actions/route'
import { service } from '../utility/services'
import { Container, Content, Text, Input, Icon, View } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from './login-theme'
import styles from './login-layout-theme'
import ErrorHandler from '../utility/errorhandler/index'
import CustomMessages from '../utility/errorhandler/customMessages'
import ButtonFeedback from '../utility/buttonFeedback'
import OverlayLoader from '../utility/overlayLoader'
import { actionsApi } from '../utility/urlStorage'
import { debounce } from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Login extends Component {
    constructor(props) {
        super(props)
        this._scrollView = KeyboardAwareScrollView
        this.state = {
            email: '',
            password: '',
            visibleHeight: Dimensions.get('window').height,
            offset: {
                x:0,
                y:0
            },
            errorCheck: {
                email: null,
                password: null,
                submit: false
            },
            isFormSubmitting: false,
            customMessages: '',
            customMessagesType: 'error'
        }
        this.msgboxPosX=0
        this.msgboxPosY=0

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object
        }

        this.serviceUrl = actionsApi.goodFormRefreshToken

        // debounce
        this._handleSignIn = debounce(this._handleSignIn, 1000, {leading: true, maxWait: 0, trailing: false})
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
          onStartShouldSetPanResponderCapture: this._handleStartShouldSetPanResponderCapture,
          
        })
    }

    componentDidMount () {
        // just to make sure that token was removed and
        // isAccessGranted flag is set to false when 
        // user is in the login page
        setTimeout(() => {
            removeToken() 
            this.props.setAccessGranted(false)
        }, 400)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    _replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    _pushNewRoute(route) {
        this.props.pushNewRoute(route)
    }

    _createToken(res) {
        let { access_token, refresh_token, first_name, last_name } = res.data

        // reset the fields and hide loader
        this.setState({
            email: '',
            password: '',
            customMessages: '',
            customMessagesType: 'success'
        })

        updateToken(access_token, refresh_token, first_name, last_name)
        this.props.setAccessGranted(true)
        this._replaceRoute('news')
    }

    _handleSignIn(isFormValidate) {
        this.setState({
            errorCheck:{
                submit: false
            }
        })

        if(isFormValidate) {
            let options = {
                url: this.serviceUrl,
                data: {
                    'username': this.state.email,
                    'password': this.state.password,
                    'grant_type': 'password'
                },
                onAxiosStart: () => {
                    this.setState({ isFormSubmitting: true })
                },
                onAxiosEnd: () => {
                    this.setState({ isFormSubmitting: false })
                },
                onSuccess: this._createToken.bind(this),
                onError: (res) => {
                    this.setState({ 
                        customMessages: res,
                        customMessagesType: 'error'
                    })
                    this._scrollToMessages()
                }
            }

            service(options)
        } 
        else {
            this._scrollToMessages()
        }
    }

    _handleStartShouldSetPanResponderCapture(e, gestureState) {
        if(e._targetInst._currentElement.props===undefined) {
            Keyboard.dismiss(0)
        } 
        else if(e._targetInst._currentElement.props.placeholder===undefined||e._targetInst._currentElement.props.placeholder!=='Email' || e._targetInst._currentElement.props.placeholder!=='Password') {
            Keyboard.dismiss(0)
        }

        return false
      }

    _scrollToMessages() {
        this._scrollView.scrollToPosition(this.msgboxPosX,this.msgboxPosY,false)
    }

    focusMessage(event) {
        this.msgboxPosX=event.nativeEvent.layout.x
        this.msgboxPosY=event.nativeEvent.layout.y     
    }

    render() {
        return (
            <Container>
                <View theme={theme} 
                    {...this._panResponder.panHandlers}>
                    <Image source={require('../../../images/bg.jpg')} style={styles.background}>
                        <KeyboardAwareScrollView style={styles.main} ref={(scrollView) => { this._scrollView = scrollView }}>
                            <View style={styles.content}>
                                <Image
                                    resizeMode='contain'
                                    source={require('../../../images/logos/british-and-irish-lions.png')}
                                    style={styles.pageLogo} />

                                <View style={styles.guther} onLayout={(event)=>this.focusMessage(event)}>
                                    <CustomMessages 
                                        messages = {this.state.customMessages} 
                                        errorType = {this.state.customMessagesType} />

                                    <ErrorHandler
                                        ref = 'errorHandlerElem'
                                        errorCheck={this.state.errorCheck}
                                        callbackParent={this._handleSignIn.bind(this)}/>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-at-outline' style={styles.inputIcon} />
                                        <Input placeholder='Email' defaultValue={this.state.email} keyboardType='email-address' style={[styles.input]} onChange={(event) => this.setState({email:event.nativeEvent.text})} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-unlock-outline' style={styles.inputIcon} />
                                        <Input placeholder='Password' defaultValue={this.state.password} secureTextEntry={true} style={styles.input} onChange={(event) => this.setState({password:event.nativeEvent.text})} />
                                    </View>

                                    <ButtonFeedback 
                                        rounded 
                                        disabled = {this.state.isFormSubmitting}
                                        label = {this.state.isFormSubmitting? 'SIGNING IN..' : 'SIGN IN'} 
                                        onPress = {() => {
                                            this.setState({
                                                errorCheck: {
                                                    email: this.state.email,
                                                    password: this.state.password, 
                                                    submit: true
                                                },
                                                customMessages: ''
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                
                        <ButtonFeedback style={styles.pageClose} onPress={() => this._replaceRoute('news')}>
                            <Icon name='md-close' style={styles.pageCloseIcon} />
                        </ButtonFeedback>

                        <OverlayLoader visible={this.state.isFormSubmitting} />

                        <View style={styles.footer}>
                            <Grid>
                                <Col style={styles.borderRight}>
                                    <ButtonFeedback
                                        style={styles.footerBtn}
                                        onPress={() => this._pushNewRoute('signUp')}>
                                            <Icon name='md-contact' style={styles.footerBtnIcon} />
                                            <Text style={styles.footerBtnText}> JOIN THE PRIDE</Text>
                                    </ButtonFeedback>
                                </Col>
                                <Col>
                                    <ButtonFeedback
                                        style={styles.footerBtn}
                                        onPress={() => this._pushNewRoute('forgotPassword')}>
                                            <Text style={styles.footerBtnText}>FORGOT PASSWORD</Text>
                                    </ButtonFeedback>
                                </Col>
                            </Grid>
                        </View>
                    </Image>
                </View>
            </Container>
        )
    }
}

function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}

export default connect((state) => {
    return {
        isAccessGranted: state.token.isAccessGranted
    }
}, bindActions)(Login)