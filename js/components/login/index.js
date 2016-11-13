'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard, Dimensions, Image } from 'react-native'
import { pushNewRoute, popRoute, replaceRoute } from '../../actions/route'
import { Container, Content, Text, Input, Icon, View } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from './login-theme'
import styles from './login-layout-theme'
import ErrorHandler from '../utility/errorhandler/index'
import ButtonFeedback from '../utility/buttonFeedback'

class Login extends Component {
    constructor(props) {
        super(props)
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
    replaceRoute(route) {
        this.props.replaceRoute(route)
    }
    pushNewRoute(route) {
        this.props.pushNewRoute(route)
    }
    popRoute() {
        this.props.popRoute()
    }
    onSuccessValidate = (parameter) => {
        if(parameter) {
            this.replaceRoute('news')
        }
        else {
            this.setState({errorCheck:{submit:false}, offset:{y:0}})
        }
    }

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../images/bg.jpg')} style={styles.background}>
                        <Content style={styles.main} contentOffset={this.state.offset}>
                            <View style={styles.content}>
                                <Image
                                    resizeMode='contain'
                                    source={require('../../../images/logos/british-and-irish-lions.png')}
                                    style={styles.pageLogo} />

                                <View style={styles.guther}>

                                    <ErrorHandler
                                        errorCheck={this.state.errorCheck}
                                        callbackParent={this.onSuccessValidate}/>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-at-outline' style={styles.inputIcon} />
                                        <Input placeholder='Email' style={[styles.input]} onChange={(event) => this.setState({email:event.nativeEvent.text})} />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Icon name='ios-unlock-outline' style={styles.inputIcon} />
                                        <Input placeholder='Password' secureTextEntry={true} style={styles.input} onChange={(event) => this.setState({password:event.nativeEvent.text})} />
                                    </View>

                                    <ButtonFeedback rounded label='SIGN IN' onPress={() => {this.setState({errorCheck:{email:this.state.email,password:this.state.password,submit:true}})}}/>
                                </View>
                            </View>
                        </Content>

                        <ButtonFeedback style={styles.pageClose} onPress={() => this.replaceRoute('news')}>
                            <Icon name='md-close' style={styles.pageCloseIcon} />
                        </ButtonFeedback>

                        <View style={styles.footer}>
                            <Grid>
                                <Col style={styles.borderRight}>
                                    <ButtonFeedback
                                        style={styles.footerBtn}
                                        onPress={() => this.pushNewRoute('signUp')}>
                                            <Icon name='md-contact' style={styles.footerBtnIcon} />
                                            <Text style={styles.footerBtnText}> JOIN THE PRIDE</Text>
                                    </ButtonFeedback>
                                </Col>
                                <Col>
                                    <ButtonFeedback
                                        style={styles.footerBtn}
                                        onPress={() => this.pushNewRoute('forgotPassword')}>
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
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindActions)(Login)
