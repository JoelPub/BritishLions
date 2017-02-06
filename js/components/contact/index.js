'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, ScrollView } from 'react-native'
import { Container, View, Text, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import styles from '../../themes/static-page'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ExternalLink from '../utility/externalLink'
import { Grid, Col, Row } from 'react-native-easy-grid'
import styleVar from '../../themes/variable'

class LionsStore extends Component {
    constructor(props) {
         super(props)
         this._scrollView = ScrollView
    }

    render() {
        let subject = encodeURIComponent('British & Irish Lions')
        let mailto = 'mailto:office@lionsrugby.com?subject=' + subject

        return (
            <Container theme={theme} style={styles.container}>
                <View style={styles.container}>
                    <LionsHeader 
                        title='CONTACT'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        <ImagePlaceholder height={styleVar.deviceHeight / 3.4}>
                            <Image source={require('../../../images/header/blionsBanner.jpg')} style={styles.pagePoster} />
                        </ImagePlaceholder>
                        <View style={styles.linkWrapper}>
                            <ExternalLink url='https://www.lionsrugby.com'>
                                <Text style={styles.pageLinkText}>
                                    <Icon name='md-open' style={styles.pageLinkIcon} /> VISIT THE OFFICIAL LIONS WEBSITE
                                </Text>
                            </ExternalLink>
                        </View>
                        <View style={styles.pageContent}>
                            <View style={styles.gridWrapper}>
                                <Grid>
                                    <Col style={{width: 80}}>
                                        <Text style={styles.label}>Address:</Text>
                                    </Col>
                                    <Col>
                                        <Text style={styles.labelValue}>1st Floor</Text>
                                        <Text style={styles.labelValue}>Simmonscourt House</Text>
                                        <Text style={styles.labelValue}>Simmonscourt Road</Text>
                                        <Text style={styles.labelValue}>Ballsbridge </Text>
                                        <Text style={styles.labelValue}>Dublin 4</Text>
                                        <Text style={styles.labelValue}>Ireland</Text>
                                    </Col>
                                </Grid>
                            </View>
                            <View style={styles.gridWrapper}>
                                <Grid>
                                    <Col style={{width: 80}}>
                                        <Text style={styles.label}>Phone:</Text>
                                    </Col>
                                    <Col>
                                        <ExternalLink style={styles.labelValueLink} url='tel:+353 (1) 669 0950'>
                                            <Text style={styles.labelValueLinkText}>
                                                +353 (1) 669 0950
                                            </Text>
                                        </ExternalLink>
                                    </Col>
                                </Grid>
                            </View>
                            <View style={styles.gridWrapper}>
                                <Grid>
                                    <Col style={{width: 80}}>
                                        <Text style={styles.label}>Email:</Text>
                                    </Col>
                                    <Col>
                                        <ExternalLink url={mailto} style={styles.labelValueLink}>
                                            <Text style={styles.labelValueLinkText}>office@lionsrugby.com</Text>
                                        </ExternalLink>
                                    </Col>
                                </Grid>
                            </View>
                        </View>
                        <LionsFooter isLoaded={true} />
                    </ScrollView>
                    <EYSFooter />
                </View>
            </Container>
        )
    }
}

export default connect(null, null)(LionsStore)
