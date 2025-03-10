'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard, Image, Dimensions, PanResponder } from 'react-native'
import { replaceRoute, popRoute } from '../../actions/route'
import { service } from '../utility/services'
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

class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            visibleHeight: Dimensions.get('window').height,
            offset: {
                x:0,
                y:0
            },
            errorCheck: {
                email: null,
                submit: false
            },
            isFormSubmitting: false,
            customMessages: '',
            customMessagesType: 'error'
        }

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object
        }

        this.serviceUrl = 'https://www.api-ukchanges2.co.uk/api/password/reset'

        // debounce
        this._onValidateSuccess = debounce(this._onValidateSuccess, 1000, {leading: true, maxWait: 0, trailing: false})
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
          onStartShouldSetPanResponderCapture: this._handleStartShouldSetPanResponderCapture,
        })
    }

    replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    popRoute() {
        this.props.popRoute()
    }

    _onValidateSuccess(isFormValidate) {
        this.setState({
            errorCheck: {
                submit: false
            }
        })

        if(isFormValidate) {
            let options = {
                url: this.serviceUrl,
                data: {
                    'email': this.state.email
                },
                onAxiosStart: () => {
                    this.setState({ isFormSubmitting: true })
                },
                onAxiosEnd: () => {
                    this.setState({ isFormSubmitting: false })
                },
                onSuccess: this._resetPassword.bind(this),
                onError: (res) => {
                    this.setState({
                        customMessages: res,
                        customMessagesType: 'error'
                    })
                }
            }

            service(options)
        } else {
            this.setState({
                offset:{ y: 0}
            })
        }
    }

    _resetPassword(res) {
        // successful sent to the server
        // reset the email field
        this.setState({
            email: '',
            customMessages: 'Your password has been reset. You will receive an email shortly with a temporary password, which you may update once you have logged in.',
            customMessagesType: 'success'
        })
    }

    _handleStartShouldSetPanResponderCapture(e, gestureState) {
        if(e._targetInst._currentElement.props===undefined) {
            Keyboard.dismiss(0)
        }
        else if(e._targetInst._currentElement.props.placeholder===undefined||e._targetInst._currentElement.props.placeholder!=='Email') {
            Keyboard.dismiss(0)
        }

        return false
      }

    render() {
        return (
            <Container>
                <View theme={theme}  {...this._panResponder.panHandlers}>
                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.background}>
                        <KeyboardAwareScrollView style={styles.main} >
                            <View style={styles.content} contentOffset={this.state.offset}>
                                <View style={styles.pageTitle}>
                                    <Text style={styles.pageTitleText}>FORGOT PASSWORD</Text>
                                </View>

                                <View style={styles.guther}>

                                    <CustomMessages
                                        messages = {this.state.customMessages}
                                        errorType = {this.state.customMessagesType} />

                                    <ErrorHandler
                                        errorCheck={this.state.errorCheck}
                                        callbackParent={this._onValidateSuccess.bind(this)} />

                                    <View style={styles.inputGroup}>
                                        {/*<Icon name='ios-at-outline' style={styles.inputIcon} />*/}
                                        <Input placeholder='Email' defaultValue={this.state.email} keyboardType='email-address' style={styles.input} onChange={(event) => this.setState({email:event.nativeEvent.text})} />
                                    </View>

                                    <ButtonFeedback
                                        rounded
                                        disabled = {this.state.isFormSubmitting}
                                        label = {this.state.isFormSubmitting? 'SUBMITTING..' : 'SUBMIT'}
                                        style={styles.button}
                                        onPress={() => {
                                            this.setState({
                                                errorCheck: {
                                                    email: this.state.email,
                                                    submit:true
                                                },
                                                customMessages: ''
                                            }
                                        )}}
                                    />
                                </View>
                            </View>
                        </KeyboardAwareScrollView>

                        <ButtonFeedback style={styles.pageClose} onPress={() => this.replaceRoute('login')}>
                            <Icon name='md-close' style={styles.pageCloseIcon} />
                        </ButtonFeedback>

                        <OverlayLoader visible={this.state.isFormSubmitting} />

                        <View style={styles.footer}>
                            <Grid>
                                <Col style={styles.borderRight}>
                                    <ButtonFeedback
                                        style={styles.footerBtn}
                                        onPress={() => this.popRoute()}>
                                            <Icon name='md-arrow-back' style={styles.footerBtnIcon} />
                                            <Text style={styles.footerBtnText}> BACK TO LOGIN</Text>
                                    </ButtonFeedback>
                                </Col>
                                <Col>
                                    <ButtonFeedback
                                        style={styles.footerBtn}
                                        onPress={() => this.replaceRoute('signUp')}>
                                            <Icon name='md-contact' style={[styles.footerBtnIcon]} />
                                            <Text style={styles.footerBtnText}> JOIN THE PRIDE</Text>
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
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(ForgotPassword)