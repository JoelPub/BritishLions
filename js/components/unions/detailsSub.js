'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, WebView, ScrollView } from 'react-native'
import { Container, Text, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import styles from './styles'
import staticStyles from '../../themes/static-page'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ExternalLink, { goToURL } from '../utility/externalLink'
import PaginationButton from '../utility/paginationButton'
import HTMLView from 'react-native-htmlview'
import htmlStyles from '../../themes/html-styles'
import ButtonFeedback from '../utility/buttonFeedback'
import { Grid, Col, Row } from 'react-native-easy-grid'
import Swiper from 'react-native-swiper'
import Lightbox from 'react-native-lightbox'
import Slider from '../utility/imageSlider'
import styleVar from '../../themes/variable'

class UnionDetailsSub extends Component {
    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.state={
          height:0,
        }
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>

                    <LionsHeader 
                        back={true} 
                        title='UNIONS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />

                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        <View style={styles.content}>

                            <View style={styles.wrapper}>
                                <Text style={styles.wrapperTitle}>{this.props.details.displayname.toUpperCase()}</Text>
                            </View>

                            <Swiper
                                height={187}
                                loop={false}
                                dot={<View style={Slider.swiperDot} />}
                                activeDot={<View style={Slider.swiperActiveDot}
                                showsButtons={true} />} >
                            {
                                this.props.details.images.map((item,index)=>{
                                    return (
                                    <Lightbox key={index} navigator={this.props.navigator}>
                                        <Image transparent
                                            resizeMode='contain'
                                            source={item.source}
                                            style={styles.banner} />
                                    </Lightbox>
                                    )
                                })
                            }

                            </Swiper>

                            <View style={styles.shareLinkWrapper}>
                                <ExternalLink style={styles.shareLink} url={this.props.details.url}>
                                    <Text style={styles.shareLinkText}><Icon name='md-open' style={styles.shareLinkIcon} /> VISIT {this.props.details.displayname.toUpperCase()} RUGBY WEBSITE </Text>
                                </ExternalLink>
                            </View>

                           <View style={[styles.description,{height:this.state.height}]}>
                                <WebView
                                    style={{flex:1}}
                                    bounces={false}
                                    scrollEnabled={false}
                                    source={{html:`<!DOCTYPE html><html><head><style>body{width:${parseInt(styleVar.deviceWidth)-50}px;}p{font-size: 18px;font-family: 'georgia';line-height: 24px;color: rgb(38,38,38);margin-bottom: 20px;}ul{font-size: 18px;line-height: 24px;}li{font-size: 18px;font-family: 'georgia';line-height: 24px;color: rgb(38,38,38);}</style></head><body>${this.props.details.description}<script>window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}</script></body></html>`}}
                                    onNavigationStateChange={(title)=>{
                                        if(title.title!== undefined && title.title.trim()!==''&&isNaN(title.title)===false) {
                                            this.setState({
                                                height:(parseInt(title.title)+150)
                                            })
                                        }
                                    }}
                                />
                                 <PaginationButton label='NEXT UNION' style={styles.paginateButton} next={true} data={[this.props.details.id, 'unionDetails', true]} />
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
        details: state.content.drillDownItemSub
    }
}, null)(UnionDetailsSub)


