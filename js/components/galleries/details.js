'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder } from 'react-native'
import { Container, Header, Content, Text, Button, Icon } from 'native-base'
import Swiper from 'react-native-swiper'
import theme from '../../themes/base-theme'
import styles from './styles'
import PaginationButton from '../utility/paginationButton'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import Lightbox from 'react-native-lightbox'
import Slider from '../utility/imageSlider'
import { shareTextWithTitle } from '../utility/socialShare'

class Gallery extends Component {
    
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader back={true} title='GALLERIES' />
                    <Content>
                        <View style={styles.galleryDetailHeader}>
                            <Text style={styles.galleryDetailHeaderText}>
                                WARREN GATLAND ANNOUNCEMENT
                            </Text>
                        </View>

                        <View>
                            <Swiper
                                height={270}
                                loop={false}
                                dot={<View style={Slider.swiperDot} />}
                                activeDot={<View style={Slider.swiperActiveDot}
                                showsButtons={true} />} >
                                <Lightbox navigator={this.props.navigator}>
                                    <Image style={Slider.galleryPoster} source={require('../../../images/content/toursBanner.png')} />
                                </Lightbox>
                                <Lightbox navigator={this.props.navigator}>
                                    <Image style={Slider.galleryPoster} source={require('../../../images/content/competitionsBanner.png')} />
                                </Lightbox>
                                <Lightbox navigator={this.props.navigator}>
                                    <Image style={Slider.galleryPoster} source={require('../../../images/content/storeBanner.png')} />
                                </Lightbox>
                            </Swiper>
                        </View>

                        <View style={styles.shareWrapper}>
                            <ButtonFeedback
                                onPress={shareTextWithTitle.bind(this, 'DummyTitle', '')}
                                style={styles.shareLink}>
                                <Text style={styles.shareLinkText}>SHARE</Text>
                                <Icon name='md-share-alt' style={styles.shareLinkIcon} />
                            </ButtonFeedback>
                        </View>

                        <View style={styles.description}>
                            <Text style={styles.paragraph}>
                                Warrent Gatland was today announced as the Head Coach of The British & Irish Lions 2017 Tour to New Zealand.
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

export default connect((state) => {
  return {
    content: state.content.drillDownItem
  }
}, null)(Gallery)