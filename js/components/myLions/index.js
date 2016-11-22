
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { Container, Content, Text, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import { pushNewRoute } from '../../actions/route'
import styleVar from '../../themes/variable'

class MyLions extends Component {

    _drillDown(route, index) {
        this.props.pushNewRoute('myLionsPlayerList')
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader title='MY LIONS' />
                    {/*<Image resizeMode='cover' source={require('../../../images/footer-bg.jpg')} style={styles.header}>
                        <ButtonFeedback style={styles.headerBtn}>
                            <Text style={styles.headerBtnText}>MY LIONS</Text>
                        </ButtonFeedback>
                    </Image>*/}
                    <Content>
                        <Grid>
                            <Col style={styles.gridBoxCol}>
                                <ButtonFeedback style={[styles.gridBoxTouchable, styles.gridBoxTouchableLeft]} onPress={() => this._drillDown(1)}>
                                    <View style={styles.gridBoxTouchableView}>
                                        <View style={styles.gridBoxImgWrapper}>
                                            <ImagePlaceholder
                                                width = {styleVar.deviceWidth / 2 - 1}
                                                height = {styleVar.deviceWidth / 2}>
                                                <Image transparent
                                                    resizeMode='contain'
                                                    source={require('../../../contents/my-lions/nations/england.png')}
                                                    style={styles.gridBoxImg} />
                                            </ImagePlaceholder>
                                        </View>

                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={styles.gridBoxTitleText} numberOfLines={1}>ENGLAND</Text>
                                        </View>
                                    </View>
                                </ButtonFeedback>
                            </Col>
                            <Col style={styles.gridBoxCol}>
                                <ButtonFeedback style={styles.gridBoxTouchable} onPress={() => this._drillDown(1)}>
                                    <View style={styles.gridBoxTouchableView}>
                                        <View style={styles.gridBoxImgWrapper}>
                                            <ImagePlaceholder
                                                width = {styleVar.deviceWidth / 2 - 1}
                                                height = {styleVar.deviceWidth / 2}>
                                                <Image transparent
                                                    resizeMode='contain'
                                                    source={require('../../../contents/my-lions/nations/scotland.png')}
                                                    style={styles.gridBoxImg} />
                                            </ImagePlaceholder>
                                        </View>

                                        <View style={[shapes.triangle]} />

                                        <View style={styles.gridBoxTitle}>
                                            <Text style={styles.gridBoxTitleText} numberOfLines={1}>SCOTLAND</Text>
                                        </View>
                                    </View>
                                </ButtonFeedback>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={styles.gridBoxCol}>
                                <ButtonFeedback
                                    style={[styles.gridBoxTouchable, styles.gridBoxTouchableLeft]}
                                    onPress={() => this._drillDown(1)}>

                                    <View style={styles.gridBoxTouchableView}>
                                        <View style={styles.gridBoxImgWrapper}>
                                            <ImagePlaceholder
                                                width = {styleVar.deviceWidth / 2 - 1}
                                                height = {styleVar.deviceWidth / 2}>
                                                <Image transparent
                                                    resizeMode='contain'
                                                    source={require('../../../contents/my-lions/nations/ireland.png')}
                                                    style={styles.gridBoxImg} />
                                            </ImagePlaceholder>
                                        </View>

                                        <View style={[shapes.triangle]} />

                                        <View style={styles.gridBoxTitle}>
                                            <Text style={styles.gridBoxTitleText} numberOfLines={1}>IRELAND</Text>
                                        </View>
                                    </View>
                                </ButtonFeedback>
                            </Col>
                            <Col style={styles.gridBoxCol}>
                                <ButtonFeedback style={styles.gridBoxTouchable} onPress={() => this._drillDown(1)}>
                                    <View style={styles.gridBoxTouchableView}>
                                        <View style={styles.gridBoxImgWrapper}>
                                            <ImagePlaceholder
                                                width = {styleVar.deviceWidth / 2 - 1}
                                                height = {styleVar.deviceWidth / 2}>
                                                <Image transparent
                                                    resizeMode='contain'
                                                    source={require('../../../contents/my-lions/nations/wales.png')}
                                                    style={styles.gridBoxImg} />
                                            </ImagePlaceholder>
                                        </View>

                                        <View style={[shapes.triangle]} />

                                        <View style={styles.gridBoxTitle}>
                                            <Text style={styles.gridBoxTitleText} numberOfLines={1}>WALES</Text>
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

export default connect(null, bindAction)(MyLions)
