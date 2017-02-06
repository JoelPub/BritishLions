'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView } from 'react-native'
import { Container, Text, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import styles from './styles'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ExternalLink, { goToURL } from '../utility/externalLink'
import PaginationButton from '../utility/paginationButton'
import HTMLView from 'react-native-htmlview'
import htmlStyles from '../../themes/html-styles'
import ButtonFeedback from '../utility/buttonFeedback'

// For mapping a static image only, since require() is not working with concatenating a dynamic variable
// should be delete this code once api is ready.
import JSON from '../../../contents/sponsors/data'

class SponsorDetails extends Component {
    constructor(props){
        super(props)
        this._scrollView = ScrollView
    }

    render() {
        let shareLinkIcon = this.props.details.url? <Icon name='md-open' style={styles.shareLinkIcon} /> : null
        
        return (
            <Container theme={theme}>
                <View style={styles.container}>

                    <LionsHeader 
                        back={true} 
                        title='SPONSORS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />

                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        <View style={styles.content}>

                            <View style={styles.wrapper}>
                                <Text style={styles.wrapperTitle}>{this.props.details.title.toUpperCase()}</Text>

                                {this.props.details.partner? <Text style={styles.wrapperPartner}>{this.props.details.partner}</Text> : null }
                            </View>
                            
                            <View style={styles.bannerContainer}>
                                <Image transparent
                                    resizeMode='contain'
                                    source={this.props.details.banner}
                                    style={styles.banner} />
                            </View>

                            <View style={styles.shareLinkWrapper}>
                                <ExternalLink style={styles.shareLink} url={this.props.details.url}>
                                    <Text style={styles.shareLinkText}>{shareLinkIcon} {this.props.details.label.toUpperCase()}</Text>
                                </ExternalLink>
                            </View>

                            <View style={styles.description}>
                                <HTMLView
                                    value={this.props.details.description}
                                    stylesheet={htmlStyles}
                                    onLinkPress={(url) => goToURL(url)}
                                />
                                <PaginationButton label='NEXT SPONSOR' style={styles.paginateButton} next={true} data={[this.props.details.id, 'sponsorDetails']} />
                            </View>
                        </View>

                        <LionsFooter isLoaded={true} />
                    </ScrollView>
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}

export default connect((state) => {
    return {
        details: state.content.drillDownItem
    }
}, null)(SponsorDetails)
