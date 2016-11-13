
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { Container, Content, Text, Button, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import { pushNewRoute } from '../../actions/route'

class MyLionsPlayerList extends Component {
    constructor(props){
        super(props)
    }

    _drillDown(route, index) {
        this.props.pushNewRoute('myLionsPlayerDetails')
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />
                    <Image resizeMode='cover' source={require('../../../images/gradient-bg.jpg')} style={styles.header}>
                        <ImageCircle
                            size={100}
                            containerStyle={styles.imageCircle}
                            containerBgColor='#fff'
                            containerPadding={20}
                            src={require('../../../contents/my-lions/nations/england.png')} />

                        <Text style={styles.headerTitle}>ENGLAND</Text>
                    </Image>

                    <Content>
                        <Grid>
                            <Col style={styles.gridBoxCol}>
                                <ButtonFeedback style={[styles.gridBoxTouchable, styles.gridBoxTouchableLeft]} onPress={() => this._drillDown(1)}>
                                    <View style={styles.gridBoxTouchableView}>
                                        <View style={styles.gridBoxImgWrapper}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                style={styles.gridBoxImg} />
                                        </View>

                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={styles.gridBoxTitleText}>JAMES</Text>
                                            <Text style={styles.gridBoxTitleText}>HASKELL</Text>
                                            <Text style={styles.gridBoxTitleSupportText}>Flanker</Text>
                                        </View>
                                    </View>
                                </ButtonFeedback>
                            </Col>
                            <Col style={styles.gridBoxCol}>
                                <ButtonFeedback style={styles.gridBoxTouchable} onPress={() => this._drillDown(2)}>
                                    <View style={styles.gridBoxTouchableView}>
                                        <View style={styles.gridBoxImgWrapper}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                style={styles.gridBoxImg} />
                                        </View>

                                        <View style={[shapes.triangle]} />

                                        <View style={styles.gridBoxTitle}>
                                            <Text style={styles.gridBoxTitleText}>ELLIS</Text>
                                            <Text style={styles.gridBoxTitleText}>GENGE</Text>
                                            <Text style={styles.gridBoxTitleSupportText}>Scrum Half</Text>
                                        </View>
                                    </View>
                                </ButtonFeedback>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={styles.gridBoxCol}>
                                <ButtonFeedback
                                    style={[styles.gridBoxTouchable, styles.gridBoxTouchableLeft]}
                                    onPress={() => this._drillDown(3)}>

                                    <View style={styles.gridBoxTouchableView}>
                                        <View style={styles.gridBoxImgWrapper}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                style={styles.gridBoxImg} />
                                        </View>

                                        <View style={[shapes.triangle]} />

                                        <View style={styles.gridBoxTitle}>
                                            <Text style={styles.gridBoxTitleText}>ROY</Text>
                                            <Text style={styles.gridBoxTitleText}>THOMPSON</Text>
                                            <Text style={styles.gridBoxTitleSupportText}>Main</Text>
                                        </View>
                                    </View>
                                </ButtonFeedback>
                            </Col>
                            <Col style={styles.gridBoxCol}>
                                <ButtonFeedback style={styles.gridBoxTouchable} onPress={() => this._drillDown(4)}>
                                    <View style={styles.gridBoxTouchableView}>
                                        <View style={styles.gridBoxImgWrapper}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                style={styles.gridBoxImg} />
                                        </View>

                                        <View style={[shapes.triangle]} />

                                        <View style={styles.gridBoxTitle}>
                                            <Text style={styles.gridBoxTitleText}>JAY</Text>
                                            <Text style={styles.gridBoxTitleText}>WOLLISH</Text>
                                            <Text style={styles.gridBoxTitleSupportText}>BRIDA</Text>
                                        </View>
                                    </View>
                                </ButtonFeedback>
                            </Col>
                        </Grid>
                        <LionsFooter isLoaded={true} />
                    </Content>
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        pushNewRoute: (route)=>dispatch(pushNewRoute(route)),
        pushNewsItem: (index)=>dispatch(pushNewsItem(index))
    }
}

export default connect(null, bindAction)(MyLionsPlayerList)
