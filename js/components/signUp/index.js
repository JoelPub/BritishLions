'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard, Image, Switch, Dimensions, Platform, ScrollView } from 'react-native'
import { replaceRoute, popRoute, pushNewRoute } from '../../actions/route'
import { Container, Content, Text, Icon, Input, View } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../login/login-theme'
import styles from '../login/login-layout-theme'
import ErrorHandler from '../utility/errorhandler/index'
import ButtonFeedback from '../utility/buttonFeedback'

class SignUp extends Component {
    constructor(props) {
        super(props)

        this._scrollView = ScrollView

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            term: false,
            visibleHeight: Dimensions.get('window').height,
            offset: {
                x:0,
                y:0
            },
            errorCheck: {
                firstname: null,
                lastname: null,
                email: null,
                password: null,
                term: null,
                submit: false
            },
        }
        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
    }

    componentDidMount () {
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    keyboardWillShow (e) {
       let newSize = Dimensions.get('window').height - e.endCoordinates.height
       this.setState({offset :{y: 80}})
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

    _popRoute() {
        this.props.popRoute()
    }

   _onSuccessValidate = (parameter) => {
        if(parameter) {
            this._popRoute()
        } else {
            this.setState({errorCheck:{submit:false}})
            this._scrollView.scrollTo({x:0, y: 0, false});
        }
    }

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../images/bg.jpg')} style={styles.background}>
                        <ScrollView style={styles.main} contentOffset={this.state.offset} ref={(scrollView) => { this._scrollView = scrollView }}>
                            <View style={styles.content}>
                                <View style={styles.pageTitle}>
                                    <Text style={styles.pageTitleText}>JOIN THE PRIDE</Text>
                                </View>

                                <View style={styles.guther}>
                                    <ErrorHandler
                                        errorCheck={this.state.errorCheck}
                                        callbackParent={this._onSuccessValidate}/>

                                    <View style={styles.inputGroup}>
                                        <Input onChange={(event) => this.setState({firstname:event.nativeEvent.text})} placeholder='First Name' style={styles.input} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Input onChange={(event) => this.setState({lastname:event.nativeEvent.text})}  placeholder='Last Name' style={styles.input} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-at-outline' style={styles.inputIcon} />
                                        <Input onChange={(event) => this.setState({email:event.nativeEvent.text})} placeholder='Email' style={styles.input}/>
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-unlock-outline' style={styles.inputIcon} />
                                        <Input onChange={(event) => this.setState({password:event.nativeEvent.text})} placeholder='Password' secureTextEntry={true} style={styles.input} />
                                    </View>

                                    <View style={styles.switchInputWrapper}>
                                        <Grid>
                                            <Col style={{width: Platform.OS === 'android'? 60 : 63}}>
                                                <Switch
                                                    onValueChange = {(value) => this.setState({news: value})}
                                                    style = {styles.switchInput}
                                                    thumbTintColor ='#FFF'
                                                    tintColor = '#FFF'
                                                    onTintColor = '#6cb61b'
                                                    value = {this.state.news} />
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
                                                    onValueChange = {(value) => this.setState({lionRugby: value})}
                                                    style = {styles.switchInput}
                                                    thumbTintColor = '#FFF'
                                                    tintColor = '#FFF'
                                                    onTintColor = '#6cb61b'
                                                    value={this.state.lionRugby} />
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
                                                    onValueChange = {(value) => this.setState({term: value})}
                                                    style = {styles.switchInput}
                                                    thumbTintColor = '#FFF'
                                                    tintColor = '#FFF'
                                                    onTintColor = '#6cb61b'
                                                    value={this.state.term} />
                                            </Col>
                                            <Col>
                                                <Text style={styles.switchLabelText}>
                                                    I agree to <Text style={styles.textUnderline} onPress={() => this._pushNewRoute('terms')}>Terms and Conditions</Text>
                                                </Text>
                                            </Col>
                                        </Grid>
                                    </View>

                                    <ButtonFeedback 
                                        rounded 
                                        label="REGISTER" 
                                        style={styles.button} 
                                        onPress={() => {this.setState({errorCheck:{firstname:this.state.firstname,lastname:this.state.lastname,email:this.state.email,password:this.state.password,term:this.state.term,submit:true}})}} />
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
                    </Image>
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
