'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform } from 'react-native'
import { Container, Content, Text, Button, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import styles from './styles'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import HTMLView from 'react-native-htmlview'
import htmlStyles from '../../themes/html-styles'
import { shareTextWithTitle } from '../utility/socialShare'
import ButtonFeedback from '../utility/buttonFeedback'
import PaginationButton from '../utility/paginationButton'


class NewsDetails extends Component {

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>

                    <LionsHeader back={true} title='NEWS' />
                    <Content>
                        <Image
                            source={require('../../../images/placeholder/banner.png')}
                            style={styles.bannerWrapper}>
                            <Image source={{uri: this.props.article.image}} style={styles.banner}>
                                <Image transparent
                                    resizeMode='cover'
                                    source={require('../../../images/shadows/rectangle.png')}
                                    style={styles.newsPosterContent}>
                                    <Text numberOfLines={2} style={styles.newsPosterHeader}>
                                        {this.props.article.headline.toUpperCase()}
                                    </Text>
                                    <View style={[styles.newsDateWrapper, styles.newsDateWrapperInverse]}>
                                        <Icon name='md-time' style={[styles.timeIcon, styles.timeIconInverse]} />
                                        <Text style={[styles.newsDateText, styles.newsDateTextInverse]}>
                                            {this.props.article.date} at {this.props.article.time}
                                        </Text>
                                    </View>
                                </Image>
                            </Image>
                        </Image>

                        <View style={styles.shareWrapper}>
                            {this.props.article.author ? <Text style={styles.author} numberOfLines={1}>By {this.props.article.author}</Text> : null}
                            <ButtonFeedback
                                onPress={shareTextWithTitle.bind(this, this.props.article.headline, this.props.article.link)}
                                style={styles.shareLink}>
                                <Text style={styles.shareLinkText}>SHARE</Text>
                                <Icon name='md-share-alt' style={styles.shareLinkIcon} />
                            </ButtonFeedback>
                        </View>

                        <View style={styles.content}>
                            <HTMLView
                               value={this.props.article.article}
                               stylesheet={htmlStyles}
                             />
                            <PaginationButton style={styles.paginateButton} label='NEXT STORY' next={true} data={[this.props.article.json, this.props.article.id, 'newsDetails']} />
                        </View>

                        <LionsFooter isLoaded={true} />

                    </Content>
                    <EYSFooter/>
                </View>

            </Container>
        )
    }
}

export default connect((state) => {
  return {
    article: state.content.drillDownItem
  }
}, null)(NewsDetails)
