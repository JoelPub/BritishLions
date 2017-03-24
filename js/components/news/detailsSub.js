'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, ScrollView,WebView , ActivityIndicator,Linking,PanResponder} from 'react-native'
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


class NewsDetailsSub extends Component {
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
    }
    onLoadRequest(e){
        if(e.url.indexOf('HYPERLINK "https://www.lionsrugby.com/"https://www.lionsrugby.com') === -1){
            this.goToURL(e.url)
        }
    }
    goToURL(url) {
    Linking.canOpenURL(url).then(supported => {
            if (supported) {
                this.webview.stopLoading()
                Linking.openURL(url)
            } else {
                console.log('This device doesnt support URI: ' + url)
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
          // onPanResponderMove: this._handlePanResponderMove,
          onPanResponderRelease: this._handlePanResponderEnd.bind(this),
          onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
          
        })
    }

    _handleStartShouldSetPanResponderCapture(e, gestureState) {
       // console.log('_handleStartShouldSetPanResponderCapture e._targetInst',e._targetInst._currentElement)
       // console.log('_handleStartShouldSetPanResponderCapture getstureState',gestureState)
       if(e._targetInst._currentElement === 'SHARE'||e._targetInst._currentElement === 'NEXT STORY') {
            return false
       }
        return true
    }

    _handlePanResponderEnd(e, gestureState) {
       // console.log('_handlePanResponderEnd getstureState',gestureState)
       if(Math.abs(gestureState.dx)>Math.abs(gestureState.dy)) {
            let index = this._findID(this._items, this.props.article.id)
            let item = gestureState.dx<0?this._items[index + 1]:this._items[index-1]
            if(item) {
                this.props.drillReplace(item, 'newsDetailsSub', false)
            }  
       }
        return true
    }

    _findID(data, idToLookFor) {
        return data.findIndex((item) => {
            return item.id == idToLookFor
        })
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
                    <View  {...this._panResponder.panHandlers}>
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
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
                                onPress={shareTextWithTitle.bind(this, this.props.article.headline, this.props.article.link)}
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
                    </ScrollView>
                    </View>
                    <EYSFooter/>
                </View>

            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        drillReplace: (data, route, tpl)=>dispatch(drillReplace(data, route, tpl))
    }
}

export default connect((state) => {
    return {
        article: state.content.drillDownItemSub,
        json: state.content.contentState
    }
}, bindAction)(NewsDetailsSub)
