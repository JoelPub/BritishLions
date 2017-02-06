'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView } from 'react-native'
import { Container, Text, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import styles from '../../themes/static-page'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ExternalLink from '../utility/externalLink'
import styleVar from '../../themes/variable'

class LionsStore extends Component {
    constructor(props) {
         super(props)
         this._scrollView = ScrollView
    }

    render() {
        return (
            <Container theme={theme} style={styles.container}>
                <View style={styles.container}>
                    <LionsHeader 
                        title='OFFICIAL STORE'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        <ImagePlaceholder height={styleVar.deviceHeight / 3.4}>
                            <Image 
                                source={require('../../../images/content/storeBanner.png')} 
                                style={styles.pagePoster} />
                        </ImagePlaceholder>
                        <View style={styles.linkWrapper}>
                            <ExternalLink url='http://store.lionsrugby.com'>
                                <Text style={styles.pageLinkText}>
                                    <Icon name='md-open' style={styles.pageLinkIcon} />  SHOP AT THE LIONS OFFICIAL SHOP
                                </Text>
                            </ExternalLink>
                        </View>
                        <View style={styles.pageContent}>
                            <Text style={[styles.pageHeader, styles.pageText]}>
                                Whether you are travelling with the squad or supporting the team at home, you can wear the colours and display your passion for The British & Irish Lions!
                            </Text>
                            <Text style={styles.pageText}>
                                At the official Shop, you can take your pick from our full range of clothing or accessories to accompany your wardrobe, including the iconic British & Irish Lions jersey.
                            </Text>
                            <Text style={styles.pageText}>
                                  We also have a range of classic jerseys, t-shirts, gifts, leisure-wear and more. No matter what kind of rugby fan you are, the official Lions Shop has something to help you show your support for the 2017 squad.
                            </Text>
                            <Text style={styles.pageText}>
                                Ordering with the official Shop couldn’t be easier, with fast delivery options available to most locations across the globe, and hassle free returns to ensure your seamless shopping experience with us no matter where you are supporting the team.
                            </Text>
                            <ExternalLink url='http://store.lionsrugby.com'>
                                <Text style={styles.pageLink}>
                                    Shop at the Lions Official Shop <Icon name='md-open' style={styles.icon} />
                                </Text>
                            </ExternalLink>
                        </View>
                        <LionsFooter isLoaded={true} />
                    </ScrollView>
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}

export default connect(null, null)(LionsStore)
