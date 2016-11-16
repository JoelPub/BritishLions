'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { Container, Content, Text, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import styles from './styles'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ExternalLink, { goToURL } from '../utility/externalLink'
import PaginationButton from '../utility/paginationButton'
import HTMLView from 'react-native-htmlview'
import htmlStyles from '../../themes/html-styles'
import ButtonFeedback from '../utility/buttonFeedback'

// For mapping a static image only, since require() is not working with concatenating a dynamic variable
// should be delete this code once api is ready.
import JSON from '../../../contents/sponsors/data'

class SponsorDetailsSub extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>

                    <LionsHeader back={true} title='SPONSORS' />

                    <Content>
                        <View style={styles.content}>

                            <View style={styles.wrapper}>
                                <Text style={styles.wrapperTitle}>{this.props.details.title.toUpperCase()}</Text>

                                {this.props.details.partner? <Text style={styles.wrapperPartner}>{this.props.details.partner}</Text> : null }
                            </View>

                            <Image transparent
                                    resizeMode='contain'
                                    source={this.props.details.image}
                                    style={styles.banner} />

                            <View style={styles.shareLinkWrapper}>
                                <ExternalLink style={styles.shareLink} url={this.props.details.url}>
                                    <Text style={styles.shareLinkText}><Icon name='md-open' style={styles.shareLinkIcon} /> {this.props.details.label.toUpperCase()}</Text>
                                </ExternalLink>
                            </View>

                            <View style={styles.description}>
                                <HTMLView
                                    value={this.props.details.description}
                                    stylesheet={htmlStyles}
                                    onLinkPress={(url) => goToURL(url)}
                                />
                                <PaginationButton label='NEXT SPONSOR' style={styles.paginateButton} next={true} data={[this.props.details.id, 'sponsorDetails', true]} />
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
}, null)(SponsorDetailsSub)
