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
            handleInlineScript(item)
            handleVideo(item)
            handleImg(item)
            handleImgStyle(item)

        })

        function handleImg(item) {
            let imgPathArr=[]
            let imgPath=''
            if(item.image!==null) {
                imgPathArr=item.image.split('/')
                imgPathArr.pop()
                imgPath=imgPathArr.join('/')
            }
            item.article=item.article.replace(/src="\/\//ig,'src="https:\/\/')
            item.article=item.article.replace(/src="\//ig,`src="${imgPath}\/`)
            // item.article=item.article.replace(/https:\/\/www.lionsrugby.com\/learning-with-the-lions\/pick-of-the-pride\/pick-of-the-pride-ambassadors\//ig,'click link')
        }
        function handleImgStyle(item) {
            if(__DEV__)console.log('article',item.article)
            let imgPos=0
            let imgStr=null
            let imgStrLen=0
            let imgStylePos=0
            let styleLen=0
            let orgWidth=0
            let orgHeight=0
            let ratio=[]
            if(item.article.match(/<img /ig)!==null) {
                 item.article.match(/<img /ig).map((value,index)=>{
                    if(__DEV__)console.log('imgPos',imgPos)
                    imgPos=item.article.toLowerCase().indexOf('<img ',imgPos)
                    if(__DEV__)console.log('imgPos',imgPos)
                    imgStrLen=item.article.toLowerCase().indexOf('/>',imgPos)+2-imgPos
                    if(__DEV__)console.log('imgStrLen',imgStrLen)
                    imgStr=item.article.substr(imgPos,imgStrLen)
                    if(__DEV__)console.log('imgStr',imgStr)

                    if(imgStr.match(/width="/ig)===null&&imgStr.match(/width:/ig)===null) {
                        imgStr=imgStr.replace('/>',`width="${parseInt(styleVar.deviceWidth)-50}"/>`)
                    }

                    imgStylePos=0
                    styleLen=0
                    orgWidth=0
                    orgHeight=0
                    ratio=[]
                    if(imgStr.match(/width="/ig)!==null) {
                         imgStr.match(/width="/ig).map((value,index)=>{
                            imgStylePos=imgStr.toLowerCase().indexOf('width="',imgStylePos)
                            styleLen=imgStr.toLowerCase().indexOf('\"',imgStylePos+7)-(imgStylePos+7)
                            orgWidth=imgStr.toLowerCase().substr(imgStylePos+7,styleLen)
                            if(__DEV__)console.log('orgWidth',orgWidth)
                            imgStr=imgStr.substring(0,imgStylePos)+`width="${parseInt(styleVar.deviceWidth)-50}`+imgStr.substring(imgStr.indexOf('\"',imgStylePos+7+styleLen))
                            if(__DEV__)console.log('imgStr',imgStr)
                            ratio.push((parseInt(styleVar.deviceWidth)-50)/orgWidth)
                            imgStylePos=imgStr.indexOf('\"',imgStylePos+7+styleLen)
                        })
                    }
                    imgStylePos=0
                    styleLen=0
                    orgWidth=0
                    orgHeight=0
                    if(imgStr.match(/height="/ig)!==null) {
                         imgStr.match(/height="/ig).map((value,index)=>{
                            imgStylePos=imgStr.toLowerCase().indexOf('height="',imgStylePos)
                            styleLen=imgStr.toLowerCase().indexOf('\"',imgStylePos+8)-(imgStylePos+8)
                            orgHeight=imgStr.toLowerCase().substr(imgStylePos+8,styleLen)
                            if(__DEV__)console.log('orgHeight',orgHeight)
                            imgStr=imgStr.substring(0,imgStylePos)+`height="${parseInt(orgHeight)*ratio[index]}`+imgStr.substring(imgStr.indexOf('\"',imgStylePos+8+styleLen))
                            if(__DEV__)console.log('imgStr',imgStr)
                            imgStylePos=imgStr.indexOf('\"',imgStylePos+8+styleLen)
                        })
                    }

                    imgStylePos=0
                    styleLen=0
                    orgWidth=0
                    orgHeight=0
                    ratio=[]
                    if(imgStr.match(/width:/ig)!==null) {
                         imgStr.match(/width:/ig).map((value,index)=>{
                            imgStylePos=imgStr.toLowerCase().indexOf('width:',imgStylePos)
                            styleLen=imgStr.toLowerCase().indexOf('px',imgStylePos+6)-(imgStylePos+6)
                            orgWidth=imgStr.toLowerCase().substr(imgStylePos+6,styleLen)
                            if(__DEV__)console.log('orgWidth',orgWidth)
                            imgStr=imgStr.substring(0,imgStylePos)+`width:${parseInt(styleVar.deviceWidth)-50}`+imgStr.substring(imgStr.indexOf('px',imgStylePos+6+styleLen))
                            if(__DEV__)console.log('imgStr',imgStr)
                            ratio.push((parseInt(styleVar.deviceWidth)-50)/orgWidth)
                            imgStylePos=imgStr.indexOf('px',imgStylePos+6+styleLen)
                        })
                    }
                    imgStylePos=0
                    styleLen=0
                    orgWidth=0
                    orgHeight=0
                    if(imgStr.match(/height:/ig)!==null) {
                         imgStr.match(/height:/ig).map((value,index)=>{
                            imgStylePos=imgStr.toLowerCase().indexOf('height:',imgStylePos)
                            styleLen=imgStr.toLowerCase().indexOf('px',imgStylePos+7)-(imgStylePos+7)
                            orgHeight=imgStr.toLowerCase().substr(imgStylePos+7,styleLen)
                            if(__DEV__)console.log('orgHeight',orgHeight)
                            imgStr=imgStr.substring(0,imgStylePos)+`height:${parseInt(orgHeight)*ratio[index]}`+imgStr.substring(imgStr.indexOf('px',imgStylePos+7+styleLen))
                            if(__DEV__)console.log('imgStr',imgStr)
                            imgStylePos=imgStr.indexOf('px',imgStylePos+7+styleLen)
                        })
                    }
                    item.article=item.article.substring(0,imgPos)+imgStr+item.article.substring(imgPos+imgStrLen)
                    if(__DEV__)console.log('item.article',item.article)
                    imgPos=imgPos+imgStrLen
                })
            }

            // if(item.article.match(/width:/ig)!==null) {
            //      item.article.match(/width:/ig).map((value,index)=>{
            //         imgStylePos=item.article.toLowerCase().indexOf('width:',imgStylePos)
            //         styleLen=item.article.toLowerCase().indexOf(';',imgStylePos+6)-(imgStylePos+6)
            //         orgWidth=item.article.toLowerCase().substr(imgStylePos+6,styleLen)
            //         // orgHeight=strStyle.indexOf('height:')===-1?'210':strStyle.substring(strStyle.indexOf('height:')+7,strStyle.indexOf('px',strStyle.indexOf('height')))
            //         if(__DEV__)console.log('orgWidth',orgWidth)
            //         item.article=item.article.substring(0,imgStylePos)+`width: ${parseInt(styleVar.deviceWidth)-50}px;`+item.article.substring(item.article.indexOf('\"',imgStylePos+6+styleLen))
            //         if(__DEV__)console.log('article',item.article)
            //         ratio.push((parseInt(styleVar.deviceWidth)-50)/orgWidth)
            //         imgStylePos=item.article.indexOf('\"',imgStylePos+6+styleLen)
            //     })
            // }
            // imgStylePos=0
            // styleLen=0
            // orgWidth=0
            // orgHeight=0
            // if(item.article.match(/height:/ig)!==null) {
            //      item.article.match(/height="/ig).map((value,index)=>{
            //         imgStylePos=item.article.toLowerCase().indexOf('height="',imgStylePos)
            //         styleLen=item.article.toLowerCase().indexOf('\"',imgStylePos+8)-(imgStylePos+8)
            //         orgHeight=item.article.toLowerCase().substr(imgStylePos+8,styleLen)
            //         if(__DEV__)console.log('orgHeight',orgHeight)
            //         item.article=item.article.substring(0,imgStylePos)+`height="${parseInt(orgHeight)*ratio[index]}`+item.article.substring(item.article.indexOf('\"',imgStylePos+8+styleLen))
            //         if(__DEV__)console.log('article',item.article)
            //         imgStylePos=item.article.indexOf('\"',imgStylePos+8+styleLen)
            //     })
            // }
            // imgStylePos=0
            // styleLen=0
            // orgWidth=0
            // orgHeight=0
            // ratio=[]
            // if(item.article.match(/width="/ig)!==null) {
            //      item.article.match(/width="/ig).map((value,index)=>{
            //         imgStylePos=item.article.toLowerCase().indexOf('width="',imgStylePos)
            //         styleLen=item.article.toLowerCase().indexOf('\"',imgStylePos+7)-(imgStylePos+7)
            //         orgWidth=item.article.toLowerCase().substr(imgStylePos+7,styleLen)
            //         if(__DEV__)console.log('orgWidth',orgWidth)
            //         item.article=item.article.substring(0,imgStylePos)+`width="${parseInt(styleVar.deviceWidth)-50}`+item.article.substring(item.article.indexOf('\"',imgStylePos+7+styleLen))
            //         if(__DEV__)console.log('article',item.article)
            //         ratio.push((parseInt(styleVar.deviceWidth)-50)/orgWidth)
            //         imgStylePos=item.article.indexOf('\"',imgStylePos+7+styleLen)
            //     })
            // }
            // imgStylePos=0
            // styleLen=0
            // orgWidth=0
            // orgHeight=0
            // if(item.article.match(/height="/ig)!==null) {
            //      item.article.match(/height="/ig).map((value,index)=>{
            //         imgStylePos=item.article.toLowerCase().indexOf('height="',imgStylePos)
            //         styleLen=item.article.toLowerCase().indexOf('\"',imgStylePos+8)-(imgStylePos+8)
            //         orgHeight=item.article.toLowerCase().substr(imgStylePos+8,styleLen)
            //         if(__DEV__)console.log('orgHeight',orgHeight)
            //         item.article=item.article.substring(0,imgStylePos)+`height="${parseInt(orgHeight)*ratio[index]}`+item.article.substring(item.article.indexOf('\"',imgStylePos+8+styleLen))
            //         if(__DEV__)console.log('article',item.article)
            //         imgStylePos=item.article.indexOf('\"',imgStylePos+8+styleLen)
            //     })
            // }
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
            // scriptPos=0
            // if(item.article.match(/\[caption/ig)!==null) {
            //      item.article.match(/\[caption/ig).map((value,index)=>{
            //         scriptPos=item.article.toLowerCase().indexOf('\[caption',scriptPos)
            //         let styleLen=item.article.toLowerCase().indexOf('caption\]',scriptPos)-scriptPos
            //         item.article=item.article.substring(0,scriptPos)+item.article.substring(item.article.toLowerCase().indexOf('caption\]',scriptPos)+8)
            //         scriptPos=item.article.toLowerCase().indexOf('\[caption',scriptPos)
            //     })
            // }
            // scriptPos=0
            // if(item.article.match(/<blockquote/ig)!==null) {
            //      item.article.match(/<blockquote/ig).map((value,index)=>{
            //         scriptPos=item.article.toLowerCase().indexOf('<blockquote',scriptPos)
            //         let styleLen=item.article.toLowerCase().indexOf('blockquote>',scriptPos)-scriptPos
            //         item.article=item.article.substring(0,scriptPos)+item.article.substring(item.article.toLowerCase().indexOf('blockquote>',scriptPos)+11)
            //         scriptPos=item.article.toLowerCase().indexOf('<blockquote',scriptPos)
            //     })
            // }
            item.article=item.article.replace(/blockquote/ig,'div')

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
        if(__DEV__)console.log('_fetchContent')
        this.props.fetchContent(this.state.apiUrl)
        this.setState({ isFetchContent: true })
    }

    _onRefresh() {
        this.setState({isRefreshing: true})
        this._fetchContent()
    }

    componentDidMount() {
        if(__DEV__)console.log('news compnentdidmount')
        setTimeout(() => {
            this._fetchContent()
        }, 1000)
    }

    componentWillReceiveProps(nextProps) {
        if(__DEV__)console.log('news componentWillReceiveProps')
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
