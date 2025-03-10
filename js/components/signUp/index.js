'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAccessGranted } from '../../actions/token'
import { updateToken } from '../utility/asyncStorageServices'
import { Keyboard, Switch, Dimensions, Platform, ScrollView, PanResponder,TouchableOpacity, Alert ,NativeModules} from 'react-native'
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
import ButtonNetwork from '../utility/buttonNetwork'
import OverlayLoader from '../utility/overlayLoader'
import { debounce } from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { APP_VERSION, actionsApi } from '../utility/urlStorage'
import { FBLogin, FBLoginManager } from 'react-native-facebook-login'

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
            loginType:'',
            loginToken:'',
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
            customMessagesType: 'error',
            isShowPasswordTips: false
        }

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }

        this.serviceUsersUrl = actionsApi.goodFormUsers
        this.serviceRefreshTokenUrl = actionsApi.goodFormRefreshToken

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
    _GoogleSignIn = () => {

         this.setState({user: {}})
        GoogleSignin.signIn()
          .then((user) => {
              if (__DEV__)console.log(user);
              this.setState({user: user})
              this._googleHandleSignUp(true)
          })
          .catch((err) => {
              if (__DEV__)console.log('WRONG SIGNIN', err)
          })
          .done();
    }
    _FBSignIn = () => {
        NativeModules.One.sendInteraction('/register/facebook', null);
        FBLoginManager.loginWithPermissions(["email"],(error, data) => {
            if (!error) {
                if (__DEV__)console.log(data);
                this.setState({
                    fbUser:data
                })
                this._handleSignUpWithFB(true,'/register/facebook')

            } else {
                if (__DEV__)console.log(error, data);
            }
        })
    }
    _handleSignUpWithFB(isFormValidate){
        this.setState({
            errorCheck:{
                submit: false
            }
        })
        let {token} =this.state.fbUser.credentials
        if (__DEV__)console.log('this.state.fbUser.credentials: ',this.state.fbUser)
        let httpUrl ='https://graph.facebook.com/v2.5/me?fields=email,name&access_token='+token
        fetch({ method: 'GET',url: httpUrl })
            .then((response) => response.json())
            .then( (json) => {
            if (__DEV__)console.log('json: ', json)
            let nameArr  = json.name.split(' ')
            let lastName = nameArr[0]
            let firstName=  nameArr[1]
            if(isFormValidate) {
                let options = {
                    url: 'https://www.api-ukchanges2.co.uk/api/users',
                    data: {
                        'firstName': firstName,
                        'lastName': lastName,
                        'email': json.email,
                        'password': 'Text1234',
                        'newEvent': true,
                        'newPartners': true,
                        'tc': true
                    },
                    onAxiosStart: () => {
                        this.setState({ isFormSubmitting: true })
                    },
                    onAxiosEnd: () => {
                        this.setState({ isFormSubmitting: false })
                    },
                    onSuccess: () => {
                        NativeModules.One.sendInteraction('/register/facebook', {
                            username: json.name,
                            emailAddress:json.email
                        });
                        this.setState({
                            loginType:'facebook',
                            loginToken:token,
                        })
                        this._userSignUp()
                    },
                    onError: (res) => {
                        if (__DEV__)console.log('注册失败')
                        if (__DEV__)console.log(res)
                        this.setState({
                            customMessages: res,
                            customMessagesType: 'error'
                        })

                        this._scrollView.scrollToPosition(0,0,false)
                    }
                }
                if (__DEV__)console.log('postion 222,', JSON.stringify(options))

                service(options)

            } else {
                this._scrollView.scrollToPosition(0,0,false)
            }
            return json
        }).catch((error)=>{
            this.setState({
                customMessages: error,
                customMessagesType: 'error'
            })
            this._scrollView.scrollToPosition(0,0,false)
        })
    }
    _googleHandleSignUp(isFormValidate){
        this.setState({
            errorCheck:{
                submit: false
            }
        })
        if(isFormValidate) {
            let lastName = ''
            let firstName = ''
            if(this.state.user.name){
                let nameArr = this.state.user.name.split(' ')
                lastName = nameArr[0]
                firstName=  nameArr[1]
            }else if(this.state.user.familyName){
                lastName = this.state.user.familyName
                firstName=  this.state.user.givenName
            }
            let options = {
                url: 'https://www.api-ukchanges2.co.uk/api/users',
                data: {
                    'firstName': firstName,
                    'lastName': lastName,
                    'email': this.state.user.email,
                    'password': 'Text1234',
                    'newEvent': true,
                    'newPartners': true,
                    'tc': true
                },
                onAxiosStart: () => {
                    this.setState({ isFormSubmitting: true })
                },
                onAxiosEnd: () => {
                    this.setState({ isFormSubmitting: false })
                },
                onSuccess: () => {
                    NativeModules.One.sendInteraction('/register/google', {
                        username: this.this.state.user.name,
                        emailAddress:this.state.user.email
                    });
                   if (__DEV__)console.log(JSON.stringify(this.state.user.accessToken))
                   if(!this.state.user.accessToken){
                       NativeModules.RNGoogleSignin.getAccessToken(this.state.user)
                       .then((token) => {
                            this.setState({
                               loginType:'google',
                               loginToken:token,
                            })
                       })
                   }else {
                        this.setState({
                           loginType:'google',
                           loginToken:this.state.user.accessToken,
                        })
                   }
                   this._userSignUp()
                },
                onError: (res) => {
                    this.setState({
                        customMessages: res,
                        customMessagesType: 'error'
                    })

                    this._scrollView.scrollToPosition(0,0,false)
                }
            }
            if (__DEV__)console.log('postion 111,', JSON.stringify(options))
            service(options)

        } else {
            this._scrollView.scrollToPosition(0,0,false)
        }
    }
    _handleSignUp(isFormValidate){
        this.setState({
            errorCheck:{
                submit: false
            }
        })

        if(isFormValidate) {
            let options = {
                url: this.serviceUsersUrl,
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
                onSuccess: (res) => {
                    let name = this.state.firstName +' ' + this.state.lastName
                    NativeModules.One.sendInteraction('/register/button', {
                        username: name,
                        emailAddress:this.state.email
                    });
                    this._userSignUp()
                },
                onError: (res) => {
                    this.setState({ 
                        customMessages: res,
                        customMessagesType: 'error',
                        isFormSubmitting: false
                    })

                    this._scrollView.scrollToPosition(0,0,false)
                },
                channel:'SignUp'
            }
            if (__DEV__)console.log('postion 333,', JSON.stringify(options))

            service(options)

        } else {
            this._scrollView.scrollToPosition(0,0,false)
        }
    }

    _userSignUp() {
        if (__DEV__)console.log('called')
        // reset the fields
        this.setState({
            firstName: '',
            lastName: '',
            newEvent: false,
            newPartners: false,
            tc: false
        })

        // let's login the user
        this._login()

        // this._scrollView.scrollToPosition(0,0,false)
        // this.setState({ 
        //     customMessages: 'Your account has been created successfully.',
        //     customMessagesType: 'success'
        // })
    }

    _login() {
        if (__DEV__)console.log('starting....token: ', this.state.loginToken)
        if (__DEV__)console.log('starting....loginType: ', this.state.loginType)
        let options = {
            url: this.serviceRefreshTokenUrl,
            data: {
                'username': this.state.email,
                'password': this.state.password,
                'facebook': this.state.loginType === 'facebook' ? this.state.loginToken : '',
                'google': this.state.loginType === 'google' ? this.state.loginToken : '',
                'app_version': APP_VERSION,
                'grant_type': 'password'
            },
            onAxiosStart: () => {
                this.setState({ 
                    isFormSubmitting: true,
                    username: '',
                    password: '',
                })
            },
            onAxiosEnd: () => {
                this.setState({ isFormSubmitting: false })
            },
            onSuccess: this._createToken.bind(this),
            onError: (res) => {
                this.setState({ 
                    customMessages: res,
                    customMessagesType: 'error',
                    isFormSubmitting: false
                })

                this._scrollView.scrollToPosition(0,0,false)
            }
        }
        if (__DEV__)console.log('postion 444,', JSON.stringify(options))

        service(options)
    }

    _createToken(res) {
        let { access_token, refresh_token, first_name, last_name, is_first_log_in } = res.data
        
        updateToken(access_token, refresh_token, first_name, last_name, is_first_log_in, this.state.email)
        this.props.setAccessGranted(true)
        
        // reset the fields and hide loader
        this.setState({
            email: '',
            password: ''
        }, () => {
           Alert.alert(
               'Account Registered',
               'Your account has been created successfully.',
               [{
                   text: 'Go to My Lions Page',
                   onPress: () => { this._replaceRoute('myLions') }
               }]
           ) 
        })
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
    componentDidMount () {
        NativeModules.One.sendInteraction('/registerView', null);
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

                                    <View>
                                        <ButtonFeedback style={[styles.authButton, styles.authButtonFB]} onPress={this._FBSignIn}>
                                            <Icon name='logo-facebook' style={styles.authButtonIcon} />
                                            <View style={styles.authButtonTextView}>
                                                <Text style={[styles.authButtonText, styles.authButtonTextSignUpFB]}>CONTINUE WITH FACEBOOK</Text>
                                            </View>
                                        </ButtonFeedback>
                                        <ButtonFeedback style={[styles.authButton, styles.authButtonGoogle]} onPress={this._GoogleSignIn}>
                                            <Icon name='logo-googleplus' style={styles.authButtonIcon} />
                                            <View style={styles.authButtonTextView}>
                                              <Text style={[styles.authButtonText]}>CONTINUE WITH GOOGLE</Text>
                                            </View>
                                        </ButtonFeedback>
                                    </View>

                                    <View style={styles.mailSignUpView}>
                                        <Text style={styles.mailSignUpText}>OR REGISTER WITH EMAIL</Text>
                                    </View>
                                    <View style={styles.inputGroup}>
                                        <Input defaultValue={this.state.firstName} onChange={(event) => this.setState({firstName: event.nativeEvent.text})} placeholder='First Name' style={styles.input} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Input defaultValue={this.state.lastName} onChange={(event) => this.setState({lastName: event.nativeEvent.text})}  placeholder='Last Name' style={styles.input} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        {/*<Icon name='ios-at-outline' style={styles.inputIcon} />*/}
                                        <Input defaultValue={this.state.email} onChange={(event) => this.setState({email: event.nativeEvent.text})} keyboardType='email-address' placeholder='Email' style={styles.input}/>
                                    </View>

                                    {
                                        this.state.isShowPasswordTips?
                                            <View style={styles.tips}>
                                                <Icon name='ios-information-circle-outline' style={styles.tipsIcon}/>
                                                <View style={styles.tipsTextCol}>
                                                    <Text style={styles.tipsText}>Password must consist of 8 or more characters and contain an upper and lower case letter, and at least one number.</Text>
                                                </View>
                                            </View>
                                        :
                                            null
                                    }

                                    <View style={styles.inputGroup}>
                                        {/*<Icon name='ios-unlock-outline' style={styles.inputIcon} />*/}
                                        <Input defaultValue={this.state.password} 
                                            onChange={(event) => this.setState({password: event.nativeEvent.text})} 
                                            onFocus={()=> this.setState({isShowPasswordTips: true})}
                                            onBlur={()=> this.setState({isShowPasswordTips: false})}
                                            placeholder='Password' 
                                            secureTextEntry={true} 
                                            style={styles.input} />
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
                                                    I am happy to receive news and information on Lions Supporters Tours and events
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
                                                    I am happy to receive news and information from carefully selected partners of Lions Rugby
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
                                                <Text style={styles.switchLabelText}>I agree to the </Text>
                                                <ButtonFeedback onPress={() => this._pushNewRoute('terms')} style={styles.tncLink}>
                                                    <Text style={[styles.switchLabelText,styles.textUnderline]}>Privacy Policy</Text>
                                                </ButtonFeedback>
                                            </Col>
                                        </Grid>
                                    </View>

                                    <ButtonNetwork
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

                        <ButtonFeedback style={styles.pageClose} onPress={() => this._replaceRoute('login')}>
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
                                            <Text style={styles.footerBtnText}> BACK TO SIGN IN</Text>
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
        popRoute: () => dispatch(popRoute()),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}

export default connect(null, bindAction)(SignUp)
