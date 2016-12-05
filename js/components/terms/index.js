'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replaceRoute, pushNewRoute, popRoute } from '../../actions/route'
import { Container, Content, Text, Icon, View } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../login/login-theme'
import styles from '../login/login-layout-theme'
import ButtonFeedback from '../utility/buttonFeedback'

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
                                    <Text style={styles.pageTitleText}>TERMS & CONDITIONS</Text>
                                </View>
                                <View style={styles.guther}>
                                    <Text style={[styles.paragraph]}>On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. </Text>

                                    <Text style={[styles.paragraph]}>LAST On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. Lavantage du Lorem Ipsum sur un texte générique comme Du texte. Du texte. Du texte.</Text>

                                    <Text style={[styles.paragraph]}>LAST On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. Lavantage du Lorem Ipsum sur un texte générique comme Du texte. Du texte. Du texte.</Text>

                                    <Text style={[styles.paragraph, styles.marginBottomOff]}>LAST On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. Lavantage du Lorem Ipsum sur un texte générique comme Du texte. Du texte. Du texte.</Text>
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
