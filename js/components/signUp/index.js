'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard, Switch, Dimensions, Platform, ScrollView, PanResponder,TouchableOpacity, Alert } from 'react-native'
import { service } from '../utility/services'
import { replaceRoute, popRoute, pushNewRoute } from '../../actions/route'
import { Container, Content, Text, Icon, Input, View } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../login/login-theme'
import styles from '../login/login-layout-theme'
import ErrorHandler from '../utility/errorhandler/index'
import CustomMessages from '../utility/errorhandler/customMessages'
import ButtonFeedback from '../utility/buttonFeedback'
import OverlayLoader from '../utility/overlayLoader'
import { debounce } from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this._scrollView = KeyboardAwareScrollView
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            newEvent: false,
            newPartners: false,
            tc: false,
            visibleHeight: Dimensions.get('window').height,
            errorCheck: {
                firstName: null,
                lastName: null,
                email: null,
                password: null,
                tc: false,
                submit: false
            },
            isFormSubmitting: false,
            customMessages: '',
            customMessagesType: 'error'
        }
        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }

        this.serviceUrl = 'https://www.api-ukchanges2.co.uk/api/users'

        // debounce
        this._handleSignUp = debounce(this._handleSignUp, 500, {leading: true, maxWait: 0, trailing: false})
    }

    _replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    _pushNewRoute(route) {
        this.props.pushNewRoute(route)
    }

    _popRoute() {
        this.props.popRoute()
    }

    _reLogin() {
        this._replaceRoute('login')
    }

    _userSignUp() {
        // reset the fields
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            newEvent: false,
            newPartners: false,
            tc: false
        })

        // this._scrollView.scrollToPosition(0,0,false)
        // this.setState({ 
        //     customMessages: 'Your account has been created successfully.',
        //     customMessagesType: 'success'
        // })

        Alert.alert(
            'Account Registered',
            'Your account has been created successfully.',
            [{
                text: 'SIGN IN',
                onPress: this._reLogin.bind(this)
            }]
        )
    }

    _handleSignUp(isFormValidate){
        this.setState({
            errorCheck:{
                submit: false
            }
        })

        if(isFormValidate) {
            let options = {
                url: this.serviceUrl,
                data: {
                    'firstName': this.state.firstName,
                    'lastName': this.state.lastName,
                    'email': this.state.email,
                    'password': this.state.password,
                    'newEvent': this.state.newEvent,
                    'newPartners': this.state.newPartners,
                    'tc': this.state.tc
                },
                onAxiosStart: () => {
                    this.setState({ isFormSubmitting: true })
                },
                onAxiosEnd: () => {
                    this.setState({ isFormSubmitting: false })
                },
                onSuccess: this._userSignUp.bind(this),
                onError: (res) => {
                    this.setState({ 
                        customMessages: res,
                        customMessagesType: 'error'
                    })

                    this._scrollView.scrollToPosition(0,0,false)
                }
            }

            service(options)

        } else {
            this._scrollView.scrollToPosition(0,0,false)
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
          onStartShouldSetPanResponderCapture: this._handleStartShouldSetPanResponderCapture,
        })
    }

    _handleStartShouldSetPanResponderCapture(e, gestureState) {
        if(e._targetInst._currentElement.props===undefined) {
            Keyboard.dismiss(0)
        }
        else if(e._targetInst._currentElement.props.placeholder===undefined||e._targetInst._currentElement.props.placeholder!=='Password' || e._targetInst._currentElement.props.placeholder!=='Email'|| e._targetInst._currentElement.props.placeholder!=='Last Name'|| e._targetInst._currentElement.props.placeholder!=='First Name') {
            Keyboard.dismiss(0)
        }

        return false
      }

    render() {
        return (
            <Container>
                <View theme={theme}  {...this._panResponder.panHandlers}>
                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.background}>
                        <KeyboardAwareScrollView style={styles.main}  ref={(scrollView) => { this._scrollView = scrollView }}>
                            <View style={styles.content}>
                                <View style={styles.pageTitle}>
                                    <Text style={styles.pageTitleText}>JOIN THE PRIDE</Text>
                                </View>

                                <View style={styles.guther}>
                                    <CustomMessages
                                        messages = {this.state.customMessages}
                                        errorType = {this.state.customMessagesType} />

                                    <ErrorHandler
                                        errorCheck={this.state.errorCheck}
                                        callbackParent={this._handleSignUp.bind(this)}/>

                                    <View style={styles.inputGroup}>
                                        <Input defaultValue={this.state.firstName} onChange={(event) => this.setState({firstName: event.nativeEvent.text})} placeholder='First Name' style={styles.input} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Input defaultValue={this.state.lastName} onChange={(event) => this.setState({lastName: event.nativeEvent.text})}  placeholder='Last Name' style={styles.input} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-at-outline' style={styles.inputIcon} />
                                        <Input defaultValue={this.state.email} onChange={(event) => this.setState({email: event.nativeEvent.text})} keyboardType='email-address' placeholder='Email' style={styles.input}/>
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-unlock-outline' style={styles.inputIcon} />
                                        <Input defaultValue={this.state.password} onChange={(event) => this.setState({password: event.nativeEvent.text})} placeholder='Password' secureTextEntry={true} style={styles.input} />
                                    </View>

                                    <View style={styles.switchInputWrapper}>
                                        <Grid>
                                            <Col style={{width: Platform.OS === 'android'? 60 : 63}}>
                                                <Switch
                                                    onValueChange = {(value) => this.setState({newEvent: value})}
                                                    style = {styles.switchInput}
                                                    thumbTintColor ='#fff'
                                                    tintColor = '#fff'
                                                    onTintColor = '#6cb61b'
                                                    value = {this.state.newEvent} />
                                            </Col>
                                            <Col>
                                                <Text style={styles.switchLabelText}>
                                                    I am happy to recieve news and information on Lions Supporters Tours and events
                                                </Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.switchInputWrapper}>
                                        <Grid>
                                            <Col style={{width: Platform.OS === 'android'? 60 : 63}}>
                                                <Switch
                                                    onValueChange = {(value) => this.setState({newPartners: value})}
                                                    style = {styles.switchInput}
                                                    thumbTintColor = '#fff'
                                                    tintColor = '#fff'
                                                    onTintColor = '#6cb61b'
                                                    value={this.state.newPartners} />
                                            </Col>
                                            <Col>
                                                <Text style={styles.switchLabelText}>
                                                    I am happy to recieve news and information from carefully selected partners of Lions Rugby
                                                </Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.switchInputWrapper}>
                                        <Grid>
                                            <Col style={{width: Platform.OS === 'android'? 60 : 63}}>
                                                <Switch
                                                    onValueChange = {(value) => this.setState({tc: value})}
                                                    style = {styles.switchInput}
                                                    thumbTintColor = '#fff'
                                                    tintColor = '#fff'
                                                    onTintColor = '#6cb61b'
                                                    value={this.state.tc} />
                                            </Col>
                                            <Col style={{flexDirection:'row'}}>
                                                <Text style={styles.switchLabelText}>I agree to </Text>
                                                <ButtonFeedback onPress={() => this._pushNewRoute('terms')} style={styles.tncLink}>
                                                    <Text style={[styles.switchLabelText,styles.textUnderline]}>privacy policy</Text>
                                                </ButtonFeedback>
                                            </Col>
                                        </Grid>
                                    </View>

                                    <ButtonFeedback
                                        rounded
                                        disabled = {this.state.isFormSubmitting}
                                        label = {this.state.isFormSubmitting? 'REGISTERING..' : 'REGISTER'}
                                        style = {styles.button}
                                        onPress = {() => {
                                            this.setState({
                                                errorCheck: {
                                                    firstName: this.state.firstName,
                                                    lastName: this.state.lastName,
                                                    email: this.state.email,
                                                    password: this.state.password,
                                                    tc: this.state.tc,
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
                                        onPress={() => this._popRoute()}>
                                            <Icon name='md-arrow-back' style={styles.footerBtnIcon} />
                                            <Text style={styles.footerBtnText}> BACK TO LOGIN</Text>
                                    </ButtonFeedback>
                                </Col>
                                <Col>
                                    <ButtonFeedback
                                        style={styles.footerBtn}
                                        onPress={() => this._replaceRoute('forgotPassword')}>
                                            <Text style={styles.footerBtnText}>FORGOT PASSWORD</Text>
                                    </ButtonFeedback>
                                </Col>
                            </Grid>
                        </View>
                    </LinearGradient>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=> dispatch(replaceRoute(route)),
        pushNewRoute:(route)=> dispatch(pushNewRoute(route)),
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(SignUp)