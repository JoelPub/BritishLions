'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform } from 'react-native'
import { Container, Content, Text, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import styles from './styles'
import staticStyles from '../../themes/static-page'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ExternalLink, { goToURL } from '../utility/externalLink'
import PaginationButton from '../utility/paginationButton'
import HTMLView from 'react-native-htmlview'
import htmlStyles from '../../themes/html-styles'
import ButtonFeedback from '../utility/buttonFeedback'
import { Grid, Col, Row } from 'react-native-easy-grid'
import Swiper from 'react-native-swiper'
import Lightbox from 'react-native-lightbox'
import Slider from '../utility/imageSlider'

class UnionDetailsSub extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>

                    <LionsHeader back={true} title='UNIONS' />

                    <Content>
                        <View style={styles.content}>

                            <View style={styles.wrapper}>
                                <Text style={styles.wrapperTitle}>{this.props.details.displayname.toUpperCase()}</Text>
                            </View>

                            <Swiper
                                height={187}
                                loop={false}
                                dot={<View style={Slider.swiperDot} />}
                                activeDot={<View style={Slider.swiperActiveDot}
                                showsButtons={true} />} >

                            <Lightbox navigator={this.props.navigator}>
                                <Image transparent
                                    resizeMode='contain'
                                    source={this.props.details.logo}
                                    style={styles.banner} />
                            </Lightbox>
                            <Lightbox navigator={this.props.navigator}>
                                <Image transparent
                                    resizeMode='contain'
                                    source={require('../../../contents/unions/england.png')}
                                    style={styles.banner} />
                            </Lightbox>
                            <Lightbox navigator={this.props.navigator}>
                                <Image transparent
                                    resizeMode='contain'
                                    source={require('../../../contents/unions/ireland.png')}
                                    style={styles.banner} />
                            </Lightbox>

                            </Swiper>

                            <View style={styles.shareLinkWrapper}>
                                <ExternalLink style={styles.shareLink} url='https://www.lionsrugby.com'>
                                    <Text style={styles.shareLinkText}><Icon name='md-open' style={styles.shareLinkIcon} /> VISIT {this.props.details.displayname.toUpperCase()} RUGBY WEBSITE </Text>
                                </ExternalLink>
                            </View>

                            <View style={styles.description}>
                                <Text style={[staticStyles.pageText]}>
                                    The Rugby Football Union is the national governing body for grassroots and elite rugby in England, with 2,000 autonomous rugby clubs in its membership.
                                </Text>
                                <Text style={[staticStyles.pageText]}>
                                    The clubs are grouped within 35 Constituent Bodies (CBs), comprised of counties – some individual, some combined – the three armed forces, Oxford and Cambridge Universities, England Schools Rugby Football Union and England Students.
                                </Text>
                                <Text style={[staticStyles.pageText]}>
                                    All of this is supported by the RFU's 50 Rugby Development Officers, six Area Managers and 120 Community Rugby Coaches across the country, who provide some 30,000 coaching sessions a year for young people.
                                </Text>
                                <Text style={[staticStyles.pageText]}>
                                    The RFU employs approximately 500 paid staff and helps to train and support more than 60,000 volunteers whose roles include:
                                </Text>

                                <View style={staticStyles.gridWrapper}>
                                    <Grid>
                                        <Row size={2}>
                                            <Col style={{width:20}}>
                                                <Text style={[staticStyles.pageText]}>•</Text>
                                            </Col>
                                            <Col>
                                                <Text style={[staticStyles.pageText]}>
                                                    Organising rugby activity, including the playing, coaching and refereeing of matches and recreational rugby at all levels
                                                </Text>
                                            </Col>
                                        </Row>
                                         <Row size={1} style={{marginTop:-20}}>
                                            <Col style={{width:20}}>
                                                <Text style={[staticStyles.pageText]}>•</Text>
                                            </Col>
                                            <Col>
                                                <Text style={[staticStyles.pageText]}>
                                                    Supporting the volunteer workforce
                                                </Text>
                                            </Col>
                                        </Row>
                                         <Row size={1} style={Platform.OS==='android'?{marginTop:-10}:{marginTop:-30}}>
                                            <Col style={{width:20}}>
                                                <Text style={[staticStyles.pageText]}>•</Text>
                                            </Col>
                                            <Col>
                                                <Text style={[staticStyles.pageText]}>
                                                    Working with clubs to secure grants and loans for facilities
                                                </Text>
                                            </Col>
                                        </Row>
                                         <Row size={1} style={{marginTop:-10}}>
                                            <Col style={{width:20}}>
                                                <Text style={[staticStyles.pageText]}>•</Text>
                                            </Col>
                                            <Col>
                                                <Text style={[staticStyles.pageText]}>
                                                    Fundraising, handling money and insurance
                                                </Text>
                                            </Col>
                                        </Row>
                                         <Row size={1} style={{marginTop:-10}}>
                                            <Col style={{width:20}}>
                                                <Text style={[staticStyles.pageText]}>•</Text>
                                            </Col>
                                            <Col>
                                                <Text style={[staticStyles.pageText]}>
                                                    Offering medical advice and support
                                                </Text>
                                            </Col>
                                        </Row>
                                         <Row size={1} style={Platform.OS==='android'?{marginTop:-10}:{marginTop:-30}}>
                                            <Col style={{width:20}}>
                                                <Text style={[staticStyles.pageText]}>•</Text>
                                            </Col>
                                            <Col>
                                                <Text style={[staticStyles.pageText]}>
                                                    Committee member/trustee
                                                </Text>
                                            </Col>
                                        </Row>
                                         <Row size={1} style={{marginTop:-30}}>
                                            <Col style={{width:20}}>
                                                <Text style={[staticStyles.pageText]}>•</Text>
                                            </Col>
                                            <Col>
                                                <Text style={[staticStyles.pageText]}>
                                                    Secretarial, administration and clerical help
                                                </Text>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </View>
                                <PaginationButton label='NEXT UNION' style={styles.paginateButton} next={true} data={[this.props.details.id, 'unionDetails', true]} />
                            </View>
                        </View>

                        <LionsFooter isLoaded={true} />
                    </Content>
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}

export default connect((state) => {
    return {
        details: state.content.drillDownItemSub
    }
}, null)(UnionDetailsSub)


