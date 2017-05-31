'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replaceRoute, pushNewRoute, popRoute } from '../../actions/route'
import { Linking } from 'react-native'
import { Container, Content, Text, Icon, View } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../login/login-theme'
import styles from '../login/login-layout-theme'
import ButtonFeedback from '../utility/buttonFeedback'
import { goToURL } from '../utility/externalLink'

class Terms extends Component {
    constructor(props) {
        super(props)
        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
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

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.background}>
                        <Content style={styles.main}>
                            <View style={styles.content}>
                                <View style={styles.pageTitle}>
                                    <Text style={styles.pageTitleText}>PRIVACY POLICY</Text>
                                </View>
                                <View style={styles.guther}>
                                    <Text style={[styles.paragraph, styles.marginBottomOff]}>By registering for the Official Lions Rugby app you agree to be added to the subscriber database to receive regular communications from The British & Irish Lion. You are free to unsubscribe from this communication at any time in the future by following the unsubscribe link contained in such communications. For more information read our <Text onPress={() => goToURL('http://www.lionsrugby.com/legal-notice-and-privacy-policy.php#.WFdZLFOGOUl')} style={[styles.tncLink, styles.textUnderline]}>privacy policy</Text>
                                    </Text>
                                    
                                        

                                </View>
                            </View>
                        </Content>
                        <ButtonFeedback style={styles.pageClose} onPress={() => this.popRoute()}>
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
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(Terms)
