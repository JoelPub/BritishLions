'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard, Dimensions, Image, ScrollView, Alert } from 'react-native'
import axios from 'axios'
import qs from 'qs'
import { pushNewRoute, replaceRoute } from '../../actions/route'
import { Container, Content, Text, Input, Icon, View } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from './login-theme'
import styles from './login-layout-theme'
import { updateToken } from '../utility/JWT'
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
            serviceUrl: 'https://api-ukchanges.co.uk/lionsrugby/api/sessions/create',
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
            theme: React.PropTypes.object,
        }

        // debounce
        this._handleSignIn = debounce(this._handleSignIn, 500, {leading: true, maxWait: 0, trailing: false})
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

    _createToken() {
        axios.post(
            this.state.serviceUrl,
            qs.stringify({
                'username': this.state.email,
                'password': this.state.password,
                'grant_type': 'password'
            })
        )
        .then(function(response) {
            if (response.request._response) {
                let data = JSON.parse(response.request._response)
                updateToken(data.access_token, data.refresh_token)
                this._replaceRoute('news')
            } else {
                Alert.alert(
                    'Access not granted',
                    'Please try again later.',
                    [{text: 'DISMISS'}]
                )
            }
        }.bind(this))
        .catch(function(error) {
            Alert.alert(
                'An error occured',
                '' + error,
                [{text: 'DISMISS'}]
            )
        })
    }

    _handleSignIn = (isFormValidate) => {
        if(isFormValidate) {
            // TODO Make sure the _createToken function does fire twice on double click
            // Use the _.Throttle function from Lodash

            this._createToken()
          
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
                                        callbackParent={this._handleSignIn}/>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-at-outline' style={styles.inputIcon} />
                                        <Input placeholder='Email' keyboardType='email-address' style={[styles.input]} onChange={(event) => this.setState({email:event.nativeEvent.text})} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-unlock-outline' style={styles.inputIcon} />
                                        <Input placeholder='Password' secureTextEntry={true} style={styles.input} onChange={(event) => this.setState({password:event.nativeEvent.text})} />
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
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null, bindActions)(Login)
