'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAccessGranted } from '../../actions/token'
import { updateToken, removeToken ,SaveUserNameAndPassword,getReloginInfo, isFirstLogIn} from '../utility/asyncStorageServices'
import { Keyboard, Dimensions,Image, PanResponder, NativeModules, Alert,Platform} from 'react-native'
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
import { APP_VERSION, actionsApi } from '../utility/urlStorage'
import { setJumpTo } from '../../actions/jump'
import { debounce } from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
//import fetch from '../utility/fetch'

const GoogleAndFBContainer = ({googleOnPress,fbOnPress}) => (
  <View >
     <ButtonFeedback style={[styles.authButton, styles.authButtonFB]} onPress={fbOnPress} >
         <Icon name='logo-facebook' style={styles.authButtonIcon} />
         <View style={styles.authButtonTextView}>
             <Text style={styles.authButtonText}>SIGN IN WITH FACEBOOK</Text>
         </View>
     </ButtonFeedback>
      <ButtonFeedback style={[styles.authButton, styles.authButtonGoogle]} onPress={googleOnPress}>
          <Icon name='logo-googleplus' style={styles.authButtonIcon} />
          <View style={styles.authButtonTextView}>
            <Text style={styles.authButtonText}>SIGN IN WITH GOOGLE</Text>
          </View>
      </ButtonFeedback>
  </View>
)

class Login extends Component {
    constructor(props) {
        super(props)
        //this._scrollView = KeyboardAwareScrollView
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
        NativeModules.One.sendInteraction('/signInView',
          {});
        setTimeout(() => {
            removeToken() 
            this.props.setAccessGranted(false)
            this._setupGoogleSignin()
            this.ReLogin()
        }, 400)

    }
    ReLogin = () =>{
        getReloginInfo().then((result)=>{
          // if (__DEV__)console.log(result)
            if (result===null) return
            let reloginInfo = JSON.parse(result)
            let {email , password, loginWay }=reloginInfo
            if(loginWay==='password') {
                // let passWord = getLoginPassword()
                this.setState({
                    user: null,
                    email: email,
                    password: password,
                })
                this._handleSignIn(true)
            }
            if(loginWay==='google') {
                this.setState({
                    user: email,
                })
                this._SignInWithGoogle(this.state.user)
            }
            if(loginWay==='fb') {
                this._handleFBLogin(true)
            }
      })
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

    _createTokenByPassword(res) {
        let { access_token, refresh_token, first_name, last_name, is_first_log_in } = res.data
        // if (__DEV__)console.log('this.state.email: ', this.state.email)
        NativeModules.One.sendInteraction('/signIn/button', {
            emailAddress:this.state.email,
            first_name:first_name,
            last_name:last_name
        })
        if(Platform.OS === 'android') {
            NativeModules.GlassBoxManger.reportEvent('/signIn/password',this.state.email)
        }
        console.log('password',this.state.email)
        updateToken(access_token, refresh_token, first_name, last_name, is_first_log_in,this.state.email)
        // reset the fields and hide loader
        SaveUserNameAndPassword(this.state.email,this.state.password,'password')
        this.setState({
            user: null,
            email: '',
            password: '',
            customMessages: '',
            customMessagesType: 'success'
        })
        this.props.setAccessGranted(true)
        // if (__DEV__)console.log('this.props.jumpRoute',this.props.jumpRoute)
        if(this.props.jumpRoute !== null){
            // console.warn(this.props.jumpRoute)
            isFirstLogIn().then((isFirst)=>{
                 isFirst = isFirst === 'yes'? true : false
                 if(isFirst)
                 {
                    this._replaceRoute('myLions')
                 }
                 else
                 {
                    this._replaceRoute(this.props.jumpRoute)
                    this.props.setJumpTo('isFixtures')
                 }
            }).catch((error) => {
                 this._replaceRoute(this.props.jumpRoute)
                 this.props.setJumpTo('isFixtures')
            })
            this._replaceRoute(this.props.jumpRoute)
            this.props.setJumpTo('isFixtures')
        }else{
            this._replaceRoute('myLions')
        }

    }
    _fbGlassBoxSender = (first_name,last_name) =>{
        let httpUrl ='https://graph.facebook.com/v2.5/me?fields=email,name&access_token='+this.state.fbUser.token

        fetch(httpUrl.toString())
          .then((response) => response.json())
          .then( (json) => {
              // if (__DEV__)console.log('json: ', JSON.stringify(json))
              if(!json.email) {
                  Alert.alert(
                    'Sorry',
                    'Sign up with Facebook is not yet supported, please sign up with a valid email address',
                    [
                        {text: 'Sign up now', onPress: () => {this._pushNewRoute('signUp')}},
                    ]
                  )
              }
              if(json.email) {
                  this.setState({
                      email:json.email
                  })
                  //NativeModules.One.sendInteraction('/signIn/button', {
                  //    emailAddress:json.email,
                  //    first_name:first_name,
                  //    last_name:last_name
                  //})
                  if(Platform.OS === 'android') {
                      NativeModules.GlassBoxManger.reportEvent('/signIn/facebook',json.email)
                  }
              } else {
              }
              return json
          }).catch((error)=>{
            console.log(error)

        })
    }
    _createTokenByFB(res) {
        let { access_token, refresh_token, first_name, last_name, is_first_log_in } = res.data
        // if (__DEV__)console.log('this.state.email: ', this.state.email)
        updateToken(access_token, refresh_token, first_name, last_name, is_first_log_in,this.state.email)
        // reset the fields and hide loader

        this._fbGlassBoxSender(first_name,last_name,access_token)

        SaveUserNameAndPassword(this.state.email,'Test1','fb')
        this.setState({
            user: null,
            email: '',
            password: '',
            customMessages: '',
            customMessagesType: 'success'
        })
        this.props.setAccessGranted(true)
        if(this.props.jumpRoute !== null){
           // console.warn(this.props.jumpRoute)
           isFirstLogIn().then((isFirst)=>{
                isFirst = isFirst === 'yes'? true : false
                if(isFirst)
                {
                   this._replaceRoute('myLions')
                }
                else
                {
                   this._replaceRoute(this.props.jumpRoute)
                   this.props.setJumpTo('isFixtures')
                }
           }).catch((error) => {
                this._replaceRoute(this.props.jumpRoute)
                this.props.setJumpTo('isFixtures')
           })
           this._replaceRoute(this.props.jumpRoute)
           this.props.setJumpTo('isFixtures')
       }else
           this._replaceRoute('myLions')
    }
    _createTokenByGoogle(res) {
        let { access_token, refresh_token, first_name, last_name, is_first_log_in } = res.data
        // if (__DEV__)console.log('this.state.email: ', this.state.email)
        //NativeModules.One.sendInteraction('/signIn/button', {
        //    emailAddress:this.state.user.email,
        //    first_name:first_name,
        //    last_name:last_name
        //})
        if(Platform.OS === 'android') {
            NativeModules.GlassBoxManger.reportEvent('/signIn/google',this.state.user.email)
        }
       // console.log('google',this.state.user.email)
        updateToken(access_token, refresh_token, first_name, last_name, is_first_log_in,this.state.email)
        // reset the fields and hide loader
        SaveUserNameAndPassword(this.state.email,'Test1','google')
        this.setState({
            user: null,
            email: '',
            password: '',
            customMessages: '',
            customMessagesType: 'success'
        })
        this.props.setAccessGranted(true)
        if(this.props.jumpRoute !== null){
           // console.warn(this.props.jumpRoute)
          isFirstLogIn().then((isFirst)=>{
               isFirst = isFirst === 'yes'? true : false
               if(isFirst)
               {
                  this._replaceRoute('myLions')
               }
               else
               {
                  this._replaceRoute(this.props.jumpRoute)
                  this.props.setJumpTo('isFixtures')
               }
          }).catch((error) => {
               this._replaceRoute(this.props.jumpRoute)
               this.props.setJumpTo('isFixtures')
          })
          this._replaceRoute(this.props.jumpRoute)
          this.props.setJumpTo('isFixtures')
        }else
           this._replaceRoute('myLions')
    }
    _SignInWithGoogle = (isFormValidate) => {
        this.setState({
            errorCheck:{
                submit: false
            }
        })
        if(!this.state.user.accessToken){
            NativeModules.RNGoogleSignin.getAccessToken(this.state.user)
            .then((token) => {
                // if (__DEV__)console.log(token)
                this._signInWithGoogleByToken(isFormValidate, token)
            })
        }else {
            this._signInWithGoogleByToken(isFormValidate, this.state.user.accessToken)
        }


    }
    _signInWithGoogleByToken = (isFormValidate,accessToken) => {
        if(isFormValidate) {
            // if (__DEV__)console.log(accessToken)
            let options = {
                url: this.serviceUrl,
                data: {
                    'google': accessToken ,
                    'app_version': APP_VERSION,
                    'grant_type': 'password'
                },
                onAxiosStart: () => {
                    this.setState({ isFormSubmitting: true })
                },
                onAxiosEnd: () => {
                    this.setState({ isFormSubmitting: false })
                },
                onSuccess: this._createTokenByGoogle.bind(this),
                onError: (res) => {
                    // if (__DEV__)console.log('error')
                    // if (__DEV__)console.log(res)
                    if (res == 'Google access token invalid.') {
                        //go to sign up
                        this._handleSignUp(true)
                    }else {
                        this.setState({
                            customMessages: res,
                            customMessagesType: 'error'
                        })
                        this._scrollToMessages()
                    }

                }
            }

            service(options)
        }
        else {
            this._scrollToMessages()
        }
    }
    _SignInWithFB = (isFormValidate) => {
        this.setState({
            errorCheck:{
                submit: false
            }
        })
        if(isFormValidate) {
            let options = {
                url: this.serviceUrl,
                data: {
                    'facebook': this.state.fbUser.token,
                    'app_version': APP_VERSION,
                    'grant_type': 'password'
                },
                onAxiosStart: () => {
                    this.setState({ isFormSubmitting: true })
                },
                onAxiosEnd: () => {
                    this.setState({ isFormSubmitting: false })
                },
                onSuccess: this._createTokenByFB.bind(this),
                onError: (res) => {
                    // if (__DEV__)console.log('error')
                    // if (__DEV__)console.log(res)
                    if (res == 'Facebook access token invalid.') {
                        //go to sign up
                        this._handleSignUpWithFB(true)
                    }else {
                        this.setState({
                            customMessages: res,
                            customMessagesType: 'error'
                        })
                        this._scrollToMessages()
                    }
                }
            }

            service(options)
        }
        else {
            this._scrollToMessages()
        }

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
                    'app_version': APP_VERSION,
                    'grant_type': 'password'
                },
                onAxiosStart: () => {
                    this.setState({ isFormSubmitting: true })
                },
                onAxiosEnd: () => {
                    this.setState({ isFormSubmitting: false })
                },
                onSuccess: this._createTokenByPassword.bind(this),
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
    _handleSignUp(isFormValidate){
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
                onSuccess: this._SignInWithGoogle,
                onError: (res) => {
                    this.setState({
                        customMessages: res,
                        customMessagesType: 'error'
                    })

                    this.refs._scrollView.scrollToPosition(0,0,false)
                }
            }

            service(options)

        } else {
            this.refs._scrollView.scrollToPosition(0,0,false)
        }
    }
    _handleSignUpWithFB(isFormValidate){
        this.setState({
            errorCheck:{
                submit: false
            }
        })
        // if (__DEV__)console.log(this.state.fbUser)
        let {token} =this.state.fbUser
        // if (__DEV__)console.log(token)
        let httpUrl ='https://graph.facebook.com/v2.5/me?fields=email,name&access_token='+token
        fetch(httpUrl.toString())
           .then((response) => response.json())
           .then( (json) => {
           // if (__DEV__)console.log('json: ', JSON.stringify(json))
           let nameArr  = json.name.split(' ')
           let lastName = nameArr[0]
           let firstName=  nameArr[1]
            if(!json.email) {
                Alert.alert(
                  'Sorry',
                  'Sign up with Facebook is not yet supported, please sign up with a valid email address',
                  [
                    {text: 'Sign up now', onPress: () => {this._pushNewRoute('signUp')}},
                  ]
                )
            }
            if(isFormValidate&&json.email) {
                this.setState({
                    email:json.email
                })
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
                    onSuccess: this._SignInWithFB(true),
                    onError: (res) => {
                        // if (__DEV__)console.log(res)
                        this.setState({
                            customMessages: res,
                            customMessagesType: 'error',
                            email:json.email
                        })

                        this.refs._scrollView.scrollToPosition(0,0,false)
                    }
                }

                service(options)

            } else {
                this.refs._scrollView.scrollToPosition(0,0,false)
            }
            return json
        }).catch((error)=>{
            this.setState({
                customMessages: error,
                customMessagesType: 'error'
            })
            this.refs._scrollView.scrollToPosition(0,0,false)
        })
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
        this.refs._scrollView.scrollToPosition(this.msgboxPosX,this.msgboxPosY,false)
    }

    focusMessage(event) {
        this.msgboxPosX=event.nativeEvent.layout.x
        this.msgboxPosY=event.nativeEvent.layout.y     
    }
    /* google sign in func */
    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: false });
            await GoogleSignin.configure({
                // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
                iosClientId: '919182744809-hlhpkfff5bp1rb5ft71ojeg0h2hu2mb1.apps.googleusercontent.com',
                offlineAccess: false
            });

            const user = await GoogleSignin.currentUserAsync();

            // if (__DEV__)console.log(user);
            if(user) this._signOut()
            this._fbSignOut()

        }
        catch(err) {
            // if (__DEV__)console.log("Google signin error", err.code, err.message);
        }
    }
    _signIn = () => {
        NativeModules.One.sendInteraction('/signIn/google',
          null);
        if(this.state.isFormSubmitting) return;
        GoogleSignin.signIn()
          .then((user) => {
              // if (__DEV__)console.log(JSON.stringify(user));
              this.setState({user: user});
              this._SignInWithGoogle(true)

          })
          .catch((err) => {
              // if (__DEV__)console.log('WRONG SIGNIN', err);
          })
          .done();
    }

    /* facebook sign in func */
    _handleFBLogin = () => {
        NativeModules.One.sendInteraction('/signIn/facebook',
          null);
        if(this.state.isFormSubmitting) return;
        FBLoginManager.loginWithPermissions(["email"],(error, data) => {
           if (!error) {
               // if (__DEV__)console.log(data);
              this.setState({
               fbUser:data.credentials
              })
               console.log('FBUSER')
              console.log(this.state.fbUser)
               this._SignInWithFB(true)
           } else {
                // if (__DEV__)console.log(error, data);
           }
        })

    }
    _signOut = () => {
        GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
              this.setState({user: null});
          })
          .done();
    }
    _fbSignOut = () => {
        FBLoginManager.logout((error, data)=>{
            if (!error) {
                this.setState({ user : null});
            } else {
                // if (__DEV__)console.log(error, data);
            }
        })
    }

    render() {
        return (
            <Container>
                <View theme={theme} 
                    {...this._panResponder.panHandlers}>
                    <Image source={require('../../../images/bg.jpg')} style={styles.background}>
                        <KeyboardAwareScrollView style={styles.main} ref='_scrollView'>
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
                                   <GoogleAndFBContainer googleOnPress={this._signIn} fbOnPress={this._handleFBLogin}/>
                                    <View style={styles.mailSignUpView}>
                                        <Text style={styles.mailSignUpText}>OR</Text>
                                    </View>
                                    <View style={styles.inputGroup}>
                                        {/*<Icon name='ios-at-outline' style={styles.inputIcon} />*/}
                                        <Input placeholder='Email' defaultValue={this.state.email} keyboardType='email-address' style={[styles.input]} onChange={(event) => this.setState({email:event.nativeEvent.text})} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        {/*<Icon name='ios-unlock-outline' style={styles.inputIcon} />*/}
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
                
                        <ButtonFeedback style={styles.pageClose} onPress={() => this._replaceRoute('landing')}>
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
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted)),
        setJumpTo:(jumpRoute)=>dispatch(setJumpTo(jumpRoute)),
    }
}

export default connect((state) => {
    return {
        jumpRoute: state.jump.jumpRoute,
        isAccessGranted: state.token.isAccessGranted
    }
}, bindActions)(Login)