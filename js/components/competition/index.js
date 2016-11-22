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
import ImagePlaceholder from '../utility/imagePlaceholder'
import ExternalLink from '../utility/externalLink'
import styleVar from '../../themes/variable'

class Competition extends Component {
    render() {
        return (
            <Container theme={theme} style={styles.container}>
                <View style={styles.container}>
                    <LionsHeader title='COMPETITIONS' />
                    <Content>
                        <ImagePlaceholder height={styleVar.deviceHeight / 3.4}>
                            <Image source={require('../../../images/content/competitionsBanner.png')} style={styles.pagePoster} />
                        </ImagePlaceholder>
                        <View style={styles.linkWrapper}>
                            <ExternalLink url='http://www.lionsrugby.com/fanzone/competitions.php#.V9ozFJh96rM'>
                                <Text style={styles.pageLinkText}>
                                     <Icon name='md-open' style={styles.pageLinkIcon} /> COMPETITIONS LINK
                                </Text>
                            </ExternalLink>
                        </View>
                        <View style={styles.pageContent}>
                            <Text style={[styles.pageHeader, styles.pageText]}>
                                Welcome to the official competitions page of The British & Irish Lions!
                            </Text>
                            <Text style={[styles.pageText]}>
                                Our special competitions are your chance to win unique prizes including signed clothing, equipment and memorabilia. You can also win opportunities to attend special Lions events.
                            </Text>
                            <Text style={[styles.pageText]}>
                                To keep up to date with all our competitions, make sure you have signed up to receive our emails and follow us on Social Media.
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

export default connect(null, null)(Competition)
