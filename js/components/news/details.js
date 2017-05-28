'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, ScrollView,WebView , ActivityIndicator,Linking,PanResponder,NativeModules} from 'react-native'
import { Container, Text, Button, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import styles from './styles'
import styleVar from '../../themes/variable'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import HTMLView from 'react-native-htmlview'
import htmlStyles from '../../themes/html-styles'
import { shareTextWithTitle } from '../utility/socialShare'
import ButtonFeedback from '../utility/buttonFeedback'
import PaginationButton from '../utility/paginationButton'
import loader from '../../themes/loader-position'
import { drillReplace } from '../../actions/content'
var One = NativeModules.One;

class NewsDetails extends Component {
    constructor(props) {
        super(props)
        this.state={
          height:0,
          isLoaded:false
        }
        this._scrollView = ScrollView
        this.webview = WebView
        this.stopPost=false
        this._items = this.props.json
        this.currentPosition=0
    }
    onLoadRequest(e){
        // if (__DEV__)console.log('onLoadRequest')
        if(e.url.indexOf('HYPERLINK "https://www.lionsrugby.com/"https://www.lionsrugby.com') === -1){
            this.goToURL(e.url)
        }
    }
    bindingTID(url){
       One.sendInteractionForOutboundLink(url).catch(function(error) {
           if (__DEV__)console.log(error);
           alert(error);
       });

       One.getURLWithOneTid(url).then(function(urlWithOneTid) {
           if(urlWithOneTid){
                if (__DEV__)console.log('urlWithOneTid',urlWithOneTid)
               Linking.canOpenURL(urlWithOneTid).then(supported => {
                   if (supported) {
                       Linking.openURL(urlWithOneTid)
                   } else {
                       Alert.alert(
                         'Error',
                         'This device doesnt support URI: ' + urlWithOneTid
                       )
                   }
               })
           }
       },function(error) {
           if (__DEV__)console.log('error');
           if (__DEV__)console.log(error);
           if(url){
               Linking.canOpenURL(url).then(supported => {
                   if (supported) {
                       Linking.openURL(url)
                   } else {
                       Alert.alert(
                         'Error',
                         'This device doesnt support URI: ' + url
                       )
                   }
               })
           }
       });
    }
    goToURL(url) {
        // if (__DEV__)console.log('gotoURL',url)
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              if(Platform.OS === 'android'){
                NativeModules.One.getURLWithOneTid(url)
                NativeModules.One.sendInteractionForOutboundLink(url)

              }
                this.webview.stopLoading()
                Linking.openURL(url)
                //this.bindingTID(url)
            } else {
                if (__DEV__)console.log('This device doesnt support URI: ' + url)
            }
        })
    }
    postMessage = () => {
        if (this.webview) {
          this.webview.postMessage('window.postMessage(document.body.clientHeight)')
        }
      }
    onMessage = e => {
        this.stopPost=true
        this.setState({height:parseInt(e.nativeEvent.data)+250,isLoaded:true})
      }    
    componentWillMount() {
        this._panResponder = PanResponder.create({
          onStartShouldSetPanResponderCapture: this._handleStartShouldSetPanResponderCapture,
          // onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
          // onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
          // onPanResponderGrant: this._handlePanResponderGrant,
          onPanResponderMove: this._handlePanResponderMove.bind(this),
          onPanResponderRelease: this._handlePanResponderEnd.bind(this),
          onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
          
        })
    }
  componentDidMount() {
    NativeModules.One.sendInteraction("/news",
      { emailAddress : "" });
  }
    _handleStartShouldSetPanResponderCapture(e, gestureState) {
       // if (__DEV__)console.log('_handleStartShouldSetPanResponderCapture e',e.target)
       // for(let node in e) {
       //     if (__DEV__)console.log('node',node)
       // }
       // if (__DEV__)console.log('_handleStartShouldSetPanResponderCapture getstureState',gestureState)
       if (e._targetInst._currentElement === 'SHARE' ||
           e._targetInst._currentElement === 'NEXT STORY' || 
           (e._targetInst._currentElement.props && e._targetInst._currentElement.props.children === 'SHARE') || 
           (e._targetInst._currentElement.props && e._targetInst._currentElement.props.children && e._targetInst._currentElement.props.children[0] === 'NEXT STORY') ||
           (e._targetInst._currentElement && e._targetInst._currentElement.props && e._targetInst._currentElement.props.children && e._targetInst._currentElement.props.children[0] && e._targetInst._currentElement.props.children[0].props && e._targetInst._currentElement.props.children[0].props.children && e._targetInst._currentElement.props.children[0].props.children[0] === 'NEXT STORY') ||
           (e._targetInst._currentElement.props && e._targetInst._currentElement.props.swipeException)
           
           ){
                  if (__DEV__)console.log('return false')
                  return false
             }

       if (__DEV__)console.log('return true')
        return true
    }

    _handlePanResponderMove(e, gestureState) {
       if (__DEV__)console.log('@@@@@_handlePanResponderMove gestureState',gestureState)
       if(Math.abs(gestureState.dy)>0&&Platform.OS==='android') {
            if(this.currentPosition===0&&gestureState.dy>0||this.currentPosition===this.state.height+200&&gestureState.dy<0) {

            }
            else {
              if(this.currentPosition-gestureState.dy/10<0) {
                this.currentPosition=0
              }
              else if(this.currentPosition-gestureState.dy/10>this.state.height+200){
                this.currentPosition=this.state.height+200
              }
              else {
                this.currentPosition=this.currentPosition-gestureState.dy/10
              }
                if (__DEV__)console.log('@@@@@this.currentPosition',this.currentPosition)
                if (__DEV__)console.log('@@@@@this.state.height',this.state.height)
                this._scrollView.scrollTo({ y: this.currentPosition, animated: true })
            }
            
            
       }
       if (__DEV__)console.log('return true')
        return true
    }


    _handlePanResponderEnd(e, gestureState) {
       if (__DEV__)console.log('_handlePanResponderEnd gestureState',gestureState)
       if(Math.abs(gestureState.dx)>Math.abs(gestureState.dy)) {
            let index = this._findID(this._items, this.props.article.id)
            let rtl=gestureState.dx<0?false:true
            if (__DEV__)console.log('rtl',rtl)
            let item = rtl?this._items[index - 1]:this._items[index+1]
            if(item) {
                this.props.drillReplace(item, 'newsDetailsSub', false,false,rtl)
            }  
       }
       if (__DEV__)console.log('return true')
        return true
    }

    _findID(data, idToLookFor) {
        return data.findIndex((item) => {
            return item.id == idToLookFor
        })
    }
  sharePress = () => {
    NativeModules.One.sendInteraction("/news/share",
      { emailAddress : "" });
    shareTextWithTitle(this.props.article.headline, this.props.article.link)
  }
  handleScroll(event) {
    if (__DEV__)console.log(' @@@@@handleScroll this.currentPosition',this.currentPosition)
    this.currentPosition=event.nativeEvent.contentOffset.y

    if (__DEV__)console.log(' @@@@@event.nativeEvent.contentOffset',event.nativeEvent.contentOffset)
  }
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>

                    <LionsHeader 
                        back={true} 
                        title='NEWS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                        <ScrollView ref={(scrollView) => { this._scrollView = scrollView }} onScroll={this.handleScroll.bind(this)}>
                            <View  {...this._panResponder.panHandlers}>
                            <ImagePlaceholder height={270}>
                                <Image source={{uri: this.props.article.image}} style={styles.banner}>
                                    <Image 
                                        transparent
                                        resizeMode='cover'
                                        source={require('../../../images/shadows/rectangle.png')}
                                        style={styles.newsPosterContent}>

                                    </Image>
                                </Image>
                            </ImagePlaceholder>

                            <View>
                                <Text numberOfLines={3} style={styles.newsPosterHeader}>
                                    {this.props.article.headline.toUpperCase()}
                                </Text>
                                <View style={[styles.newsDateWrapper, styles.newsDateWrapperInverse]}>
                                    <Icon name='md-time' style={[styles.timeIcon, styles.timeIconInverse]} />
                                    <Text style={[styles.newsDateText]}>
                                        {this.props.article.date} at {this.props.article.time}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.shareWrapper}>
                                {this.props.article.author ? <Text style={styles.author} numberOfLines={1}>By {this.props.article.author}</Text> : null}
                                <ButtonFeedback
                                    onPress={this.sharePress}
                                    style={styles.shareLink}>
                                    <Text style={styles.shareLinkText}>SHARE</Text>
                                    <Icon name='md-share-alt' style={styles.shareLinkIcon} />
                                </ButtonFeedback>
                            </View>


                                <View style={[styles.description,{height:this.state.height}]}>
                                    <WebView
                                        style={{height:this.state.height}}
                                        bounces={false}
                                        ref={(webview) => { this.webview = webview }}
                                        scrollEnabled={false}
                                        source={{html:`<!DOCTYPE html><html><head><title>XHTML Tag Reference</title><style>body{width:${parseInt(styleVar.deviceWidth)-50}px;}p{font-size: 18px;font-family: 'georgia';line-height: 24px;color: rgb(38,38,38);margin-bottom: 20px;}ul{font-size: 18px;line-height: 24px;}li{font-size: 18px;font-family: 'georgia';line-height: 24px;color: rgb(38,38,38);}</style></head><body>${this.props.article.article}</body></html>`}}
                                        onNavigationStateChange={(e)=>{
                                                if (!this.stopPost) this.postMessage()
                                                this.onLoadRequest(e)
                                        }}
                                        injectedJavaScript="document.addEventListener('message', function(e) {eval(e.data);});"
                                        onMessage={this.onMessage}
                                    />
                                    {
                                    this.state.isLoaded&&<PaginationButton style={styles.paginateButton} label='NEXT STORY' next={true} data={[this.props.article.id, 'newsDetails', false]} />
                                    }
                                </View>
                                {
                                    !this.state.isLoaded&&<ActivityIndicator style={loader.centered} size='large' />
                                }
                            <LionsFooter isLoaded={true} />
                            </View>
                        </ScrollView>
                    <EYSFooter/>
                </View>

            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        drillReplace: (data, route, isSub, isPushNewRoute,rtl)=>dispatch(drillReplace(data, route, isSub, isPushNewRoute,rtl))
    }
}

export default connect((state) => {
    return {
        article: state.content.drillDownItem,
        json: state.content.contentState
    }
}, bindAction)(NewsDetails)
