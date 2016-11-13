'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { Container, Content, Text, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import styles from '../../themes/static-page'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ExternalLink from '../utility/externalLink'

class LionsStore extends Component {
    render() {
        return (
            <Container theme={theme} style={styles.container}>
                <View style={styles.container}>
                    <LionsHeader title='official STORE' />
                    <Content>
                        <Image source={require('../../../images/content/storeBanner.png')} style={styles.pagePoster} />
                        <View style={styles.linkWrapper}>
                            <ExternalLink url='http://store.lionsrugby.com'>
                                <Text style={styles.pageLinkText}>
                                    <Icon name='md-open' style={styles.pageLinkIcon} />  SHOP AT THE LIONS official SHOP
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
                    </Content>
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}

export default connect(null, null)(LionsStore)
