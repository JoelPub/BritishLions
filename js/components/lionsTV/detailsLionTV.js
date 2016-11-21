'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, NativeModules, WebView } from 'react-native'
import { Container, Content, Text, Button, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import styles from './styles'
import { shareTextWithTitle } from '../utility/socialShare'

class DetailsLionsTV extends Component {

  convertToUppercase(data) {
    return data.toUpperCase()
  }

  convertToEmbed(url){
    return url.replace('watch?v=', '/embed/')
  }

  render(){
    return(
      <Container theme={theme}>
          <View style={styles.background}>
              <LionsHeader title='LIONS TV' back={true} />
              <Content>
                  <View style={[styles.lionsTvGalleryContent, styles.lionsTvGalleryContentDetail]}>
                      <Text numberOfLines={4} style={[styles.headline, styles.headlineDetail]}>
                          {this.convertToUppercase(this.props.details.headline)}
                      </Text>
                      <View style={styles.lionsTVDateWrapper}>
                          <Icon name='md-time' style={[styles.timeIcon, styles.timeIconDetail]} />
                          <Text style={[styles.lionsTVDateText, styles.lionsTVDateTextDetail]}> {this.props.details.date} at {this.props.details.time}</Text>
                      </View>
                  </View>
                    <ImagePlaceholder height={300}>
                        <WebView
                            style={styles.youtubePlayerView}
                            javaScriptEnabled={true}
                            source={{uri: this.convertToEmbed(this.props.details.multimedia[0].url)}}
                        />
                    </ImagePlaceholder>
                  <View style={styles.shareWrapper}>
                      <ButtonFeedback
                          onPress={shareTextWithTitle.bind(this, this.props.details.headline, this.props.details.link)}
                          style={styles.shareLink}>
                          <Text style={styles.shareLinkText}>SHARE</Text>
                          <Icon name='md-share-alt' style={styles.shareLinkIcon} />
                      </ButtonFeedback>
                  </View>
                  <View style={styles.description}>
                      <Text style={styles.paragraph}>
                        {this.props.details.article}
                      </Text>
                  </View>
                  <LionsFooter isLoaded={true} />
              </Content>
              <EYSFooter />
            </View>
        </Container>
    )
  }
}

export default connect((state) => {
    return {
        details: state.content.drillDownItem
    }
}, null)(DetailsLionsTV)
