'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
import { fetchContent, drillDown } from '../../actions/content'
import { Container, Text, Button, Icon } from 'native-base'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import ImagePlaceholder from '../utility/imagePlaceholder'
import theme from '../../themes/base-theme'
import loader from '../../themes/loader-position'
import refresh from '../../themes/refresh-control'
import styles from './styles'
import styleVar from '../../themes/variable'
import StickyFooter from '../utility/stickyFooter'



class News extends Component {
    constructor(props) {
         super(props)
         this._scrollView = ScrollView
         this.state = {
              isLoaded: false,
              isRefreshing: false,
              newsFeed: [], 
              isFetchContent: false,
              apiUrl: 'https://f3k8a7j4.ssl.hwcdn.net/feeds/app/news2.php',
         }
    }

    _drillDown(item) {
                this.props.drillDown(item, 'newsDetails')
    }
    processArticle(dataFeed){
        dataFeed.map((item,index)=>{
            item.article=item.article.replace(/\n/ig,'')
            handleImg(item)
            handleImgStyle(item)
            handleInlineScript(item)
            handleVideo(item)

        })
            
        function handleImg(item) {
            let imgPathArr=item.image.split('/')
            imgPathArr.pop()
            let imgPath=imgPathArr.join('/')
            item.article=item.article.replace(/src="\/\//ig,'src="https:\/\/')
            item.article=item.article.replace(/src="\//ig,`src="${imgPath}\/`)                
        }
        function handleImgStyle(item) {
            let imgStylePos=0
            if(item.article.match(/width:/ig)!==null) {
                 item.article.match(/width:/ig).map((value,index)=>{
                    imgStylePos=item.article.toLowerCase().indexOf('width:',imgStylePos)
                    let styleLen=item.article.toLowerCase().indexOf('\"',imgStylePos)-imgStylePos
                    let strStyle=item.article.toLowerCase().substr(imgStylePos,styleLen)
                    let orgWidth=strStyle.substring(6,strStyle.indexOf('px'))
                    let orgHeight=strStyle.indexOf('height:')===-1?'210':strStyle.substring(strStyle.indexOf('height:')+7,strStyle.indexOf('px',strStyle.indexOf('height')))
                    item.article=item.article.substring(0,imgStylePos)+`width: ${parseInt(styleVar.deviceWidth)-50}px; height: ${(parseInt(styleVar.deviceWidth)-50)*parseInt(orgHeight)/parseInt(orgWidth)}px;`+item.article.substring(item.article.indexOf('\"',imgStylePos))
                    imgStylePos=item.article.indexOf('\"',imgStylePos)
                })           
            }               
        }
        function handleInlineScript(item) {
            let scriptPos=0
            if(item.article.match(/<script/ig)!==null) {
                 item.article.match(/<script/ig).map((value,index)=>{
                    scriptPos=item.article.toLowerCase().indexOf('<script',scriptPos)
                    let styleLen=item.article.toLowerCase().indexOf('script>',scriptPos)-scriptPos
                    item.article=item.article.substring(0,scriptPos)+item.article.substring(item.article.toLowerCase().indexOf('script>',scriptPos)+7)
                    scriptPos=item.article.toLowerCase().indexOf('<script',scriptPos)
                })           
            }

        }
        function handleVideo(item) {
            let videoPos=0
            if(item.article.match(/<iframe/ig)!==null) {
                 item.article.match(/<iframe/ig).map((value,index)=>{
                    videoPos=item.article.toLowerCase().indexOf('<iframe',videoPos)
                    let styleLen=item.article.toLowerCase().indexOf('iframe>',videoPos)-videoPos
                    item.article=item.article.substring(0,videoPos)+item.article.substring(item.article.toLowerCase().indexOf('iframe>',videoPos)+7)
                    videoPos=item.article.toLowerCase().indexOf('<iframe',videoPos)
                })
            }

        }
        return dataFeed
    }

    _fetchContent(){
        this.props.fetchContent(this.state.apiUrl)
        this.setState({ isFetchContent: true })
    }

    _onRefresh() {
        this.setState({isRefreshing: true})
        this._fetchContent()
    }

    componentDidMount() {
        setTimeout(() => {
            this._fetchContent()
        }, 1000)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isFetchContent) {
            this.setState({
                isLoaded: nextProps.isLoaded,
                isRefreshing: nextProps.isRefreshing,
                newsFeed: this.processArticle(nextProps.newsFeed),
                isFetchContent: false
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }
    
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>

                    <LionsHeader 
                        title='NEWS' 
                        contentLoaded={this.state.isLoaded}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    {
                        this.state.isLoaded?
                            <ScrollView
                                ref={(scrollView) => { this._scrollView = scrollView }}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={()=> { this._onRefresh() }}
                                        tintColor = {refresh.tintColor}
                                        title = {refresh.title}
                                        titleColor = {refresh.titleColor}
                                        colors = {refresh.colors}
                                        progressBackgroundColor = {refresh.background}
                                    />
                            }>
                                <StickyFooter>
                                    {
                                        this.state.newsFeed.map(function(data, index) {
                                            return (
                                                <ButtonFeedback
                                                    key={index}
                                                    style={styles.listLink}
                                                    onPress={() => this._drillDown(data)}>
                                                    <ImagePlaceholder
                                                        width = {styleVar.deviceWidth / 3}
                                                        height = {styleVar.deviceHeight / 3.7}>
                                                        <Image source={{uri: data.thumb}} style={[styles.newsImage]} />
                                                    </ImagePlaceholder>

                                                    <View style={styles.newsContent}>
                                                        <Text numberOfLines={3} style={styles.newsHeader}>
                                                            {data.headline ? data.headline.toUpperCase() : null}
                                                        </Text>
                                                        <View style={styles.newsDateWrapper}>
                                                            <Icon name='md-time' style={styles.timeIcon} />
                                                            <Text style={styles.newsDateText}>{data.date} at {data.time}</Text>
                                                        </View>
                                                    </View>
                                                </ButtonFeedback>
                                            )
                                        }, this)
                                    }
                                </StickyFooter>
                            </ScrollView>
                        :
                        <ActivityIndicator style={loader.centered} size='large' />
                    }
                    <EYSFooter/>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        fetchContent: (url)=>dispatch(fetchContent(url)),
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect((state) => {
    return {
        newsFeed: state.content.contentState,
        isLoaded: state.content.isLoaded,
        isRefreshing: state.content.isRefreshing
    }
}, bindAction)(News)
