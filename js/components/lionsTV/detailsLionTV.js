'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Linking,Image, View, NativeModules, WebView, Alert } from 'react-native'
import { Container, Content, Text, Button, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import styles from './styles'
import { shareTextWithTitle } from '../utility/socialShare'
import YouTube from 'react-native-youtube'

class DetailsLionsTV extends Component {

  constructor(props) {
         super(props)
         this.state = {
              isReady: false,
              status: null,
              quality: null,
              error: null,
              isPlaying: true
                 }
    }

  convertToUppercase(data) {
    return data.toUpperCase()
  }

  convertToEmbed(url){
    return url.replace('watch?v=', '/embed/')
  }

  goToURL(url) {
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
              Linking.openURL(url)
          } else {
              Alert.alert('This device doesnt support URI: ' + url);
          }
      })
  }

  render(){
    return(
      <Container theme={theme}>
          <View style={styles.background}>
              <LionsHeader title='LIONS TV' back={true} />
              <Content>
                  <View style={[styles.lionsTvGalleryContent, styles.lionsTvGalleryContentDetail]}>
                      <Text numberOfLines={2} style={[styles.headline, styles.headlineDetail]}>
                          {this.convertToUppercase(this.props.details.snippet.title)}
                      </Text>
                      <View style={styles.lionsTVDateWrapper}>
                          <Icon name='md-time' style={[styles.timeIcon, styles.timeIconDetail]} />
                          <Text style={[styles.lionsTVDateText, styles.lionsTVDateTextDetail]}> {new Date(this.props.details.snippet.publishedAt).toLocaleDateString()} at {new Date(this.props.details.snippet.publishedAt).toLocaleTimeString()}</Text>
                      </View>
                  </View>

                <YouTube
                    ref='youtubePlayer'
                    videoId= {this.props.details.contentDetails.upload.videoId} // The YouTube video ID
                    apiKey='AIzaSyAz7Z48Cl9g5AgCd1GJRiIKwM9Q3Sz2ifY'
                    hidden={false}
                    rel={true}
                    showinfo={false}
                    playsInline={true}    // control whether the video should play inline
                    //onError={(e)=>{console.log(e.error}}
                    play={this.state.isPlaying}
                    onReady={(e)=>{this.setState({isReady: true})}}
                    onChangeState={(e)=>{this.setState({status: e.state})}}
                    onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
                    onError={(e)=>{
                        this.setState({error: e.error})
                        Alert.alert(
                                      'Warning',
                                      'Looks like there is something wrong when tring to play the video, please make sure you have Youtube app installed in your device. Alternatively, '
                                      +'you can also watch the video through browser by clicking "Watch the video now" button',
                                      [
                                          {text: 'Watch the video now', onPress: () => this.goToURL(this.convertToEmbed('https://m.youtube.com/watch?v='+this.props.details.contentDetails.upload.videoId))},
                                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                                      ]
                                  )
                    }}
                    style={styles.youtubePlayerView}
                  />

                  <View style={styles.shareWrapper}>
                      <ButtonFeedback
                          onPress={shareTextWithTitle.bind(this, this.props.details.snippet.title, 'https://www.youtube.com/watch?v='+this.props.details.contentDetails.upload.videoId)}
                          style={styles.shareLink}>
                          <Text style={styles.shareLinkText}>SHARE</Text>
                          <Icon name='md-share-alt' style={styles.shareLinkIcon} />
                      </ButtonFeedback>
                  </View>
                  <View style={styles.description}>
                      <Text style={styles.paragraph}>
                        {this.props.details.snippet.description}
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
