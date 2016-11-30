'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Linking,Image, View, NativeModules, WebView, Alert, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Button, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
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
              isPlaying: true,
              poster: true,
              videoId:null
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

  componentWillMount(){
    setTimeout(()=>{
      this.setState({
        poster:false
      })
    },3000)
    
  }
  componentDidMount(){
    this.setState({
        videoId:this.props.details.contentDetails.upload.videoId
    })
  }

  render(){
    return(
      <Container theme={theme}>
          <View style={styles.background}>
              <LionsHeader title='LIONS TV' back={true} />
              <Content>
                  <View style={[styles.lionsTvGalleryContent, styles.lionsTvGalleryContentDetail]}>
                      <Text numberOfLines={4} style={[styles.headline, styles.headlineDetail]}>
                          {this.convertToUppercase(this.props.details.snippet.title)}
                      </Text>
                      <View style={styles.lionsTVDateWrapper}>
                          <Icon name='md-time' style={[styles.timeIcon, styles.timeIconDetail]} />
                          <Text style={[styles.lionsTVDateText, styles.lionsTVDateTextDetail]}> {new Date(this.props.details.snippet.publishedAt).toLocaleDateString()} at {new Date(this.props.details.snippet.publishedAt).toLocaleTimeString()}</Text>
                      </View>
                  </View>

                  <View style={styles.playerWrapper}>
                    {
                    this.state.videoId!==null&& 
                        <YouTube
                        ref='youtubePlayer'
                        videoId= {this.state.videoId}
                        apiKey='AIzaSyAz7Z48Cl9g5AgCd1GJRiIKwM9Q3Sz2ifY'
                        hidden={false}
                        rel={true}
                        showinfo={false}
                        playsInline={true}
                        loop={false}
                        play={this.state.isPlaying}
                        onReady={(e)=>{this.setState({isReady: true,})}}
                        onChangeState={(e)=>{this.setState({status: e.state})}}
                        onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
                        onError={(e)=>{
                        this.setState({error: e.error})
                            if(!this.state.isReady)
                            {
                                Alert.alert(
                                              'Warning',
                                               'Looks like something went wrong when attempting to play the video.'
                                               + '\nPlease make sure you have the YouTube app installed on your device.\n\n'
                                               + 'Alternatively, you can watch the video through your device\'s browser via the link below.',
                                              [
                                                  {text: 'Watch the video now', onPress: () => this.goToURL(this.convertToEmbed('https://m.youtube.com/watch?v='+this.props.details.contentDetails.upload.videoId))},
                                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                                              ]
                                          )
                              }
                        }}
                        style={styles.youtubePlayerView}
                      />
                }
                {
                   
                    this.state.poster&&
                    <View style={styles.posterWrapper}>
                      <Image source={{uri: this.props.details.snippet.thumbnails.standard.url}} style={styles.poster}/>
                    </View>
                    }
                  </View>
                 
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
