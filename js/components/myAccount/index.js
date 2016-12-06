'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard, Dimensions, ScrollView, Platform, Alert, KeyboardAvoidingView  } from 'react-native'
import { replaceRoute, popRoute } from '../../actions/route'
import { service } from '../utility/services'
import { setAccessGranted } from '../../actions/token'
import { removeToken } from '../utility/asyncStorageServices'
import { Container, Content, Text, Icon, Input, View } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../login/login-theme'
import styles from '../login/login-layout-theme'
import ErrorHandler from '../utility/errorhandler/index'
import ButtonFeedback from '../utility/buttonFeedback'
import OverlayLoader from '../utility/overlayLoader'
import { debounce } from 'lodash'

var _scrollView: ScrollView

class MyAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            visibleHeight: Dimensions.get('window').height,
            offset: {
                x: 0,
                y: 0
            },
            errorCheckEmail: {
                email: null,
                submit: false
            },
            errorCheckPassword: {
                password: null,
                confirmPassword: null,
                submit: false
            },
            isFormSubmitting: false,
            isFormSubmittingEmail: false
        }

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }

        this.changePasswordServiceUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/password/change'
        this.changeEmailServiceUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/email/change'

        // debounce
        this._onSuccessValidateEmail = debounce(this._onSuccessValidateEmail, 1000, {leading: true, maxWait: 0, trailing: false})
        this._onSuccessValidatePassword = debounce(this._onSuccessValidatePassword, 1000, {leading: true, maxWait: 0, trailing: false})
    }

    keyboardWillShow (e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height
        this.setState({offset :{y: 120}})
    }

    keyboardFocus(){
        if(Platform.OS ==='android') {
            _scrollView.scrollTo({
                x: 0,
                y: 0,
                false
            })
        }
    }

    keyboardBlur(){
        if(Platform.OS ==='android') {
            _scrollView.scrollTo({
                x: 0,
                y: 0,
                false
            })
        }
    }

    keyboardWillHide (e) {
        this.setState({offset :{y: 0}})
    }

    componentDidMount () {
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    popRoute() {
        this.props.popRoute()
    }

    _reLogin() {
        removeToken()
        this.props.setAccessGranted(false)
        this.replaceRoute('login')
    }

    _signInRequired() {
        Alert.alert(
            'An error occured',
            'Please sign in your account first.',
            [{
                text: 'SIGN IN', 
                onPress: this._reLogin.bind(this)
            }]
        )
    }

    _onSuccessValidateEmail(isFormValidate) {
        this.setState({
            errorCheckEmail: {
                submit: false
            }
        })

        if(this.props.isAccessGranted) {
            if(isFormValidate) {
                let options = {
                    url: this.changeEmailServiceUrl,
                    data: {
                        'newEmail': this.state.email
                    },
                    onAxiosStart: () => {
                        this.setState({ isFormSubmittingEmail: true })
                    },
                    onAxiosEnd: () => {
                        this.setState({ isFormSubmittingEmail: false })
                    },
                    onSuccess: (res) => {
                        // reset the fields
                        this.setState({
                            email: ''
                        }, () => {
                            Alert.alert(
                                'Messages',
                                'Your email is successfully changed.',
                                [{text: 'RE SIGN IN', onPress: this._reLogin.bind(this)}]
                            )
                        })
                    },
                    onAuthorization: this._signInRequired.bind(this),
                    isRequiredToken: true
                }

                service(options)
            } else {
                this.setState({
                    offset:{y:0}
                })
            }
        } else {
            this._signInRequired()
        }
    }

    _onSuccessValidatePassword(isFormValidate) {
        this.setState({
            errorCheckPassword: {
                submit: false
            }
        })

        if(this.props.isAccessGranted) {
            if(isFormValidate) {

                let options = {
                    url: this.changePasswordServiceUrl,
                    data: {
                        'newPassword': this.state.confirmPassword
                    },
                    onAxiosStart: () => {
                        this.setState({ isFormSubmitting: true })
                    },
                    onAxiosEnd: () => {
                        this.setState({ isFormSubmitting: false })
                    },
                    onSuccess: (res) => {
                        // reset the fields and hide the loader
                        this.setState({
                            password: '',
                            confirmPassword: ''
                        }, () => {
                            Alert.alert(
                                'Messages',
                                'Your password is successfully changed.',
                                [{text: 'OK'}]
                            )
                        })
                    },
                    onAuthorization: this._signInRequired.bind(this),
                    isRequiredToken: true
                }

                service(options)
            } else {
                this.setState({
                    offset:{y:0}
                })
            }
        } else {
            this._signInRequired()
        }
    }

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.background}>
                            <ScrollView
                                style={styles.content}
                                keyboardShouldPersistTaps={true}
                                contentOffset={this.state.offset}
                                ref={(scrollView) => { _scrollView = scrollView; }}
                            >
                                <View style={styles.pageTitle}>
                                    <Text style={styles.pageTitleText}>MY ACCOUNT</Text>
                                </View>

                                <View style={styles.guther}>

                                    <ErrorHandler
                                        errorCheck={this.state.errorCheckPassword}
                                        callbackParent={this._onSuccessValidatePassword.bind(this)} />

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-unlock-outline' style={styles.inputIcon} />
                                        <Input defaultValue={this.state.password} onFocus={()=>this.keyboardFocus()} onBlur={()=>this.keyboardBlur()}  onChange={(event) => this.setState({password:event.nativeEvent.text})} placeholder='New Password' secureTextEntry={true}  style={styles.input} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-unlock-outline' style={styles.inputIcon} />
                                        <Input defaultValue={this.state.confirmPassword} onChange={(event) => this.setState({confirmPassword:event.nativeEvent.text})} placeholder='Confirm Password' secureTextEntry={true}  style={styles.input} />
                                    </View>

                                    <ButtonFeedback 
                                        rounded 
                                        disabled = {this.state.isFormSubmitting}
                                        label = {this.state.isFormSubmitting? 'SUBMITTING..' : 'SUBMIT PASSWORD'} 
                                        style={styles.button} 
                                        onPress={() => {
                                            this.setState({
                                                errorCheckPassword: {
                                                    password: this.state.password,
                                                    confirmPassword: this.state.confirmPassword,
                                                    submit: true
                                                }}
                                            )}
                                        } 
                                    />
                                </View>

                                <View style={styles.split}></View>

                                <View style={styles.guther}>
                                    <ErrorHandler
                                        errorCheck={this.state.errorCheckEmail}
                                        callbackParent={this._onSuccessValidateEmail.bind(this)} />

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-at-outline' style={styles.inputIcon} />
                                        <Input defaultValue={this.state.email} placeholder='New Email' style={styles.input} onChange={(event) => this.setState({email:event.nativeEvent.text})} />
                                    </View>

                                    <ButtonFeedback 
                                        rounded 
                                        disabled = {this.state.isFormSubmittingEmail}
                                        label = {this.state.isFormSubmittingEmail? 'SUBMITTING..' : 'SUBMIT EMAIL'} 
                                        style={styles.button} 
                                        onPress={() => {
                                            this.setState({
                                                errorCheckEmail: {
                                                    email: this.state.email,
                                                    submit: true
                                                }}
                                            )}
                                        } 
                                    />
                                </View>
                        </ScrollView>
                        
                        <OverlayLoader visible={(this.state.isFormSubmitting && this.state.isFormSubmittingEmail)} />

                        <ButtonFeedback style={styles.pageClose} onPress={() => this.replaceRoute('news')}>
                            <Icon name='md-close' style={styles.pageCloseIcon} />
                        </ButtonFeedback>
                    </LinearGradient>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        popRoute: () => dispatch(popRoute()),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}

export default connect((state) => {
    return {
        isAccessGranted: state.token.isAccessGranted
    }
}, bindAction)(MyAccount)
