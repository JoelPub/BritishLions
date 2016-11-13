
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, Alert } from 'react-native'
import { Container, Thumbnail, Header, Title, Content, Text, Button, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImageCircle from '../utility/imageCircle'
import ButtonFeedback from '../utility/buttonFeedback'

class MyLionsPlayerDetails extends Component {
    constructor(props){
        super(props)
    }

    _addPlayer() {
        Alert.alert(
            'Add Player',
            'adding player..',
        )
    }

    _myLions() {
        Alert.alert(
            'My Lions',
            'viewing my lions..',
        )
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
                            containerPadding={10}
                            src={require('../../../contents/my-lions/players/jameshaskell.png')} />

                        <View style={styles.headerPlayerDetails}>
                            <Text style={styles.headerPlayerName}>JAMES HASKELL</Text>
                            <Text style={styles.headerPlayerPosition}>Flanker</Text>
                        </View>

                        <View style={styles.buttons}>
                            <ButtonFeedback onPress={()=> this._addPlayer()} style={[styles.btn, styles.btnLeft, styles.btnGreen]}>
                                <Text style={styles.btnText}>ADD</Text>
                            </ButtonFeedback>
                            <ButtonFeedback onPress={()=> this._myLions()} style={[styles.btn, styles.btnRight, styles.btnRed]}>
                                <Text style={styles.btnText}>MY LIONS</Text>
                            </ButtonFeedback>
                        </View>
                    </Image>

                    <Content>
                        <Grid style={styles.detailsGrid}>
                            <Col style={styles.detailsGridCol} size={1}>
                                <Image transparent
                                    resizeMode='contain'
                                    source={require('../../../contents/my-lions/nations/england.png')}
                                    style={styles.detailsNationLogo} />
                            </Col>
                            <Col style={styles.detailsGridCol} size={2}>
                                <Text style={styles.detailsLabel}>COUNTRY</Text>
                                <Text style={styles.detail}>England</Text>
                            </Col>
                        </Grid>
                        <View style={[styles.detailsGridCol, styles.detailsGridColFull]}>
                            <Text style={styles.detailsLabel}>CLUB</Text>
                            <Text style={styles.detail}>Northhampton Saints</Text>
                        </View>
                        <Grid style={styles.detailsGrid}>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>D.O.B</Text>
                                <Text style={styles.detail}>28/04/85</Text>
                            </Col>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>HEIGHT</Text>
                                <Text style={styles.detail}>1.93 m</Text>
                            </Col>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>WEIGHT</Text>
                                <Text style={styles.detail}>118 kg</Text>
                            </Col>
                        </Grid>
                        <View style={[styles.detailsGridCol, styles.detailsGridColFull]}>
                            <Text style={styles.detailsLabel}>BIRTHPLACE</Text>
                            <Text style={styles.detail}>Manchester</Text>
                        </View>
                        <View style={styles.playerDesc}>
                            <Text style={styles.paragraph}>
                                Outstanding performances for England U21 foreshadowed James Haskell’s route into the England Elite Squad and the 70 senior caps he has won so far include 23 consecutively before he was an unused bench replacement against Australia at Sydney in June 2010. He completed a half century of Test appearances in the final game of the 2013 RBS 6 Nations Championship against Wales in Cardiff, but missed the subsequent tour of South America because of tendinitis.
                            </Text>
                            <Text style={styles.paragraph}>
                                He had been man of the match when England beat Scotland 22-16 at Twickenham in March 2011, was his country’s top tackler with 57 in that Championship and scored his fourth Test try against Wales at Twickenham the following August. His latest achievements include being man of the match in England’s historic 39-28 victory over Australia in Brisbane this June.
                            </Text>
                            <Text style={styles.paragraph}>
                                He made 18 tackles – twice as many as any other player in the game – and his work rate, energy and inspirational play all contributed to one of his finest displays in the red rose shirt. The following week, he again topped the tackle chart with 23 of England’s 213. Five of his teammates also made 16 or more tackles.
                            </Text>
                        </View>
                        <LionsFooter isLoaded={true} />
                    </Content>
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}

export default connect(null, null)(MyLionsPlayerDetails)
