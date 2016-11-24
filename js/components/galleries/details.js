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
import ImagePlaceholder from '../utility/imagePlaceholder'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import Lightbox from 'react-native-lightbox'
import Slider from '../utility/imageSlider'
import { shareTextWithTitle } from '../utility/socialShare'
const renderPagination = (index, total, context) => {
  return (
    <View style={styles.swiperNumber}>
      <Text style={styles.swiperNumberText}>
        {index + 1} of {total}
      </Text>
    </View>
  )
}

class Gallery extends Component {

    renderContent() {
        return (
            <View>
                <Text style={styles.galleryPosterCaption}> {this.children.props.caption}</Text>
                <Image style={Slider.galleryPoster} source={{uri:this.children.props.source.uri}} />
            </View>
            )
    }
    
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader back={true} title='GALLERIES' />
                    <Content>
                        <View style={styles.galleryDetailHeader}>
                            <Text style={styles.galleryDetailHeaderText}>
                                {this.props.content.title}
                            </Text>
                        </View>

                        <View>
                            <Swiper
                                ref='swiper'
                                height={270}
                                renderPagination={renderPagination}
                                loop={false}>
                                {
                                    this.props.content.images.map((img,index)=>{
                                        return(
                                             <Lightbox key={index} navigator={this.props.navigator} renderContent={this.renderContent}>
                                                <Image style={Slider.galleryPoster} source={{uri:img.image}} caption={img.caption}/>
                                            </Lightbox>
                                            )
                                    })
                                }
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
                                {this.props.content.title}
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