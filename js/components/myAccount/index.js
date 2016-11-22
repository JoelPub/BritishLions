'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard, Image, Dimensions, ScrollView, Platform } from 'react-native'
import { replaceRoute, popRoute } from '../../actions/route'
import { Container, Content, Text, Icon, Input, View } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../login/login-theme'
import styles from '../login/login-layout-theme'
import ErrorHandler from '../utility/errorhandler/index'
import ButtonFeedback from '../utility/buttonFeedback'
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
                x:0,
                y:0
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

    onSuccessValidateEmail = (parameter) => {
        this.setState({
            errorCheckEmail:{
                submit: false
            }
        })
        if(parameter) {
            this.popRoute()
        }
        else {
            this.setState({
             offset:{y:0}
            })
        }
    }

    onSuccessValidatePassword = (parameter) => {
        this.setState({
            errorCheckPassword:{
                submit: false
            }
        })
        if(parameter) {
            this.popRoute()
        }
        else {
            this.setState({
                offset:{y:0}
            })
        }
    }

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../images/bg.jpg')} style={styles.background}>
                            <ScrollView style={styles.content} contentOffset={this.state.offset} 
                            ref={(scrollView) => { _scrollView = scrollView; }} 
                            >
                                <View style={styles.pageTitle}>
                                    <Text style={styles.pageTitleText}>MY ACCOUNT</Text>
                                </View>

                                <View style={styles.guther}>

                                    <ErrorHandler
                                        errorCheck={this.state.errorCheckPassword}
                                        callbackParent={this.onSuccessValidatePassword} />

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-unlock-outline' style={styles.inputIcon} />
                                        <Input onChange={(event) => this.setState({password:event.nativeEvent.text})} placeholder='New Password' secureTextEntry={true}  style={styles.input} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-unlock-outline' style={styles.inputIcon} />
                                        <Input onChange={(event) => this.setState({confirmPassword:event.nativeEvent.text})} placeholder='Confirm Password' secureTextEntry={true}  style={styles.input} />
                                    </View>

                                    <ButtonFeedback rounded label='SUBMIT PASSWORD' style={styles.button} onPress={() => {this.setState({errorCheckPassword:{password:this.state.password,confirmPassword:this.state.confirmPassword,submit:true}})}} />
                                </View>

                                <View style={styles.split}></View>
                                <View style={[styles.guther,styles.extendBlock]}>
                                    
                                    <ErrorHandler
                                        errorCheck={this.state.errorCheckEmail}
                                        callbackParent={this.onSuccessValidateEmail} />

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
                    </Image>
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
