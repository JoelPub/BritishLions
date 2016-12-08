'use strict'

import React, { Component } from 'react'
import { UIManager } from 'NativeModules';
import { connect } from 'react-redux'
import { setAccessGranted } from '../../actions/token'
import { updateToken } from '../utility/asyncStorageServices'
import { Keyboard, Dimensions, Image, ScrollView, findNodeHandle } from 'react-native'
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
import { debounce } from 'lodash'


class Login extends Component {
    constructor(props) {
        super(props)
        this._scrollView = ScrollView
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

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object
        }

        this.serviceUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/sessions/create'

        // debounce
        this._handleSignIn = debounce(this._handleSignIn, 1000, {leading: true, maxWait: 0, trailing: false})
    }

    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    componentWillUnmount(){
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    keyboardWillShow (e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height
        this.setState({offset :{y: 150}})
    }

    keyboardWillHide (e) {
        this.setState({offset :{y: 0}})
    }

    _replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    _pushNewRoute(route) {
        this.props.pushNewRoute(route)
    }

    _createToken(res) {
        let accessToken = res.data.access_token
        let refreshToken = res.data.refresh_token

        // reset the fields and hide loader
        this.setState({
            email: '',
            password: '',
            customMessages: '',
            customMessagesType: 'success'
        })

        updateToken(accessToken, refreshToken)
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
        } else {
            this._scrollToMessages()
        }
    }

    _scrollToMessages() {
        let errorHandlerElem = findNodeHandle(this.refs.errorHandlerElem); 
        UIManager.measure(errorHandlerElem, (x, y, width, height, pageX, pageY) => {
           // scroll/focus to validation error messages
           this._scrollView.scrollTo({ x: 0, y: pageY - 50,false })
        })
    }
    
    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../images/bg.jpg')} style={styles.background}>
                        <ScrollView style={styles.main} keyboardShouldPersistTaps={true} keyboardDismissMode='on-drag' ref={(scrollView) => { this._scrollView = scrollView }}>
                            <View style={styles.content}>
                                <Image
                                    resizeMode='contain'
                                    source={require('../../../images/logos/british-and-irish-lions.png')}
                                    style={styles.pageLogo} />

                                <View style={styles.guther}>
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
                        </ScrollView>
                
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