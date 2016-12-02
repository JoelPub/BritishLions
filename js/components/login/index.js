'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAccessGranted } from '../../actions/token'
import { updateToken } from '../utility/asyncStorageServices'
import { Keyboard, Dimensions, Image, ScrollView, Alert } from 'react-native'
import { pushNewRoute, replaceRoute } from '../../actions/route'
import { service } from '../utility/services'
import { Container, Content, Text, Input, Icon, View } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from './login-theme'
import styles from './login-layout-theme'
import ErrorHandler from '../utility/errorhandler/index'
import ButtonFeedback from '../utility/buttonFeedback'
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
        }

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object
        }

        this.serviceUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/sessions/create'

        // debounce
        this._handleSignIn = debounce(this._handleSignIn, 1000, {leading: true, maxWait: 0, trailing: false})
    }

    componentDidMount () {
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
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

        // reset the fields
        this.setState({
            email: '',
            password: ''
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
                successCallback: this._createToken.bind(this)
            }

            service(options)

        } else {
            this.setState({
                errorCheck:{
                    submit: false
                }
            })

            this._scrollView.scrollTo({
                x: 0,
                y: 0,
                false
            })
        }
    }
    
    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../images/bg.jpg')} style={styles.background}>
                        <ScrollView style={styles.main} keyboardShouldPersistTaps={true} contentOffset={this.state.offset} ref={(scrollView) => { this._scrollView = scrollView }}>
                            <View style={styles.content}>
                                <Image
                                    resizeMode='contain'
                                    source={require('../../../images/logos/british-and-irish-lions.png')}
                                    style={styles.pageLogo} />

                                <View style={styles.guther}>
                                    <ErrorHandler
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

                                    <ButtonFeedback rounded label='SIGN IN' onPress={() => {this.setState({errorCheck:{email:this.state.email,password:this.state.password,submit:true}})}}/>
                                </View>
                            </View>
                        </ScrollView>

                        <ButtonFeedback style={styles.pageClose} onPress={() => this._replaceRoute('news')}>
                            <Icon name='md-close' style={styles.pageCloseIcon} />
                        </ButtonFeedback>

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