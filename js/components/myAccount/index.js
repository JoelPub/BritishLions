'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard, Dimensions, ScrollView, Platform, Alert } from 'react-native'
import { replaceRoute, popRoute } from '../../actions/route'
import { service } from '../utility/services'
import { Container, Content, Text, Icon, Input, View } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../login/login-theme'
import styles from '../login/login-layout-theme'
import ErrorHandler from '../utility/errorhandler/index'
import ButtonFeedback from '../utility/buttonFeedback'
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

    showK(){
        if(Platform.OS ==='android') {
            _scrollView.scrollTo({y:300})
        }
    }

    hideK(){
        if(Platform.OS ==='android') {
            _scrollView.scrollTo({y:0})
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

    _onSuccessValidateEmail(isFormValidate) {
        this.setState({
            errorCheckEmail: {
                submit: false
            }
        })

        if(isFormValidate) {
            this.popRoute()
        }
        else {
            this.setState({
                offset:{y:0}
            })
        }
    }

    _onSuccessValidatePassword(isFormValidate) {
        this.setState({
            errorCheckPassword: {
                submit: false
            }
        })

        if(isFormValidate) {
            let data = {
                'newPassword': this.state.confirmPassword
            }

            service(this.changePasswordServiceUrl, data, (res) => {
                // reset the fields
                this.setState({
                    password: '',
                    confirmPassword: ''
                })

                Alert.alert(
                    'Messages',
                    'Your password is successfully changed.',
                    [{text: 'OK'}]
                )
            }, true)
        } else {
            this.setState({
                offset:{y:0}
            })
        }
    }

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.background}>
                            <ScrollView style={styles.content}  keyboardShouldPersistTaps={true} contentOffset={this.state.offset}
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
                                        <Input defaultValue={this.state.password} onChange={(event) => this.setState({password:event.nativeEvent.text})} placeholder='New Password' secureTextEntry={true}  style={styles.input} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-unlock-outline' style={styles.inputIcon} />
                                        <Input defaultValue={this.state.confirmPassword} onChange={(event) => this.setState({confirmPassword:event.nativeEvent.text})} placeholder='Confirm Password' secureTextEntry={true}  style={styles.input} />
                                    </View>

                                    <ButtonFeedback rounded label='SUBMIT PASSWORD' style={styles.button} onPress={() => {this.setState({errorCheckPassword:{password:this.state.password,confirmPassword:this.state.confirmPassword,submit:true}})}} />
                                </View>

                                <View style={styles.split}></View>

                                <View style={[styles.guther,styles.extendBlock]}>
                                    <ErrorHandler
                                        errorCheck={this.state.errorCheckEmail}
                                        callbackParent={this._onSuccessValidateEmail.bind(this)} />

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-at-outline' style={styles.inputIcon} />
                                        <Input onFocus={()=>this.showK()} onBlur={()=>this.hideK()} placeholder='New Email' style={styles.input} onChange={(event) => this.setState({email:event.nativeEvent.text})} />
                                    </View>

                                    <ButtonFeedback rounded label='SUBMIT EMAIL' style={styles.button} onPress={() => {this.setState({errorCheckEmail:{email:this.state.email,submit:true}})}} />
                                </View>
                            </ScrollView>
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
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(MyAccount)
