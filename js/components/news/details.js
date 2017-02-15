'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, ScrollView,WebView , ActivityIndicator,Linking} from 'react-native'
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


class NewsDetails extends Component {
    constructor(props) {
        super(props)
        this.state={
          height:0,
          isLoaded:false
        }
        this._scrollView = ScrollView
        this.webview = WebView
    }
    onLoadRequest(e){
     console.log('!!!!!! can open URI: ' + e.url)

     if(e.url.indexOf('HYPERLINK "https://www.lionsrugby.com/"https://www.lionsrugby.com') !== -1){
     console.log('come in Here')
     }
    else{
    console.log('come in here111')
        this.goToURL(e.url)
        } 
    }
    goToURL(url) {
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    console.log('open URI: ' + url)
                    Linking.openURL(url)
                } else {
                     console.log('This device doesnt support URI: ' + url)
                }
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
                                    source={{html:`<!DOCTYPE html><html><head><style>body{width:${parseInt(styleVar.deviceWidth)-50}px;}p{font-size: 18px;font-family: 'georgia';line-height: 24px;color: rgb(38,38,38);margin-bottom: 20px;}ul{font-size: 18px;line-height: 24px;}li{font-size: 18px;font-family: 'georgia';line-height: 24px;color: rgb(38,38,38);}</style></head><body>${this.props.article.article}<script>window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}</script></body></html>`}}
                                    onNavigationStateChange={(title)=>{
                                        if(title.title!== undefined && title.title.trim()!==''&&isNaN(title.title)===false) {
                                            this.setState({
                                                height:(parseInt(title.title)+250),
                                                isLoaded:true
                                            })
                                        }else{
                                            console.log('start loading',this.webview.stopLoading)
                                            this.webview.stopLoading()
                                            this.onLoadRequest(title)
                                        }
                                    }}
                                />
                                {
                                this.state.isLoaded&&<PaginationButton style={styles.paginateButton} label='NEXT STORY' next={true} data={[this.props.article.id, 'newsDetails', false]} />
                                }
                            </View>
                            {
                            !this.state.isLoaded&&<ActivityIndicator style={loader.centered} size='small' />
                            }

                        <LionsFooter isLoaded={true} />
                    </ScrollView>
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
