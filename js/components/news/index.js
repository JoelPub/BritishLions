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
        let imgPathArr=item.image.split('/')
        console.log('imgPathArr',imgPathArr)
        imgPathArr.pop()
        let imgPath=imgPathArr.join('/')
        console.log('imgPath',imgPath)
        console.log('item.article',item.article)
        item.article=item.article.replace(/src="\/\//ig,'src="https:\/\/')
        item.article=item.article.replace(/\n/ig,'')
        console.log('item.article',item.article)
        item.article=item.article.replace(/src="\//ig,`src="${imgPath}\/`)
        console.log('item.article',item.article)
        let startPos=0
        if(item.article.match(/width:/ig)!==null) {
             item.article.match(/width:/ig).map((value,index)=>{
                console.log('index',index)
                startPos=item.article.indexOf('width:',startPos)
                let styleLen=item.article.indexOf('\"',startPos)-startPos
                item.article=item.article.substring(0,startPos)+'width: 325px; height: 210px;'+item.article.substring(item.article.indexOf('\"',startPos))
                startPos=item.article.indexOf('\"',startPos)
                console.log('startPos',startPos)
                console.log('styleLen',styleLen)


            })           
        }
        // setTimeout(()=>{
            let startPos1=0
            if(item.article.match(/<script/ig)!==null) {
                 item.article.match(/<script/ig).map((value,index)=>{
                    console.log('index',index)
                    startPos1=item.article.indexOf('<script',startPos1)
                    let styleLen=item.article.indexOf('script>',startPos1)-startPos1
                    item.article=item.article.substring(0,startPos1)+item.article.substring(item.article.indexOf('script>',startPos1)+7)
                    startPos1=item.article.indexOf('<script',startPos1)
                    console.log('startPos1',startPos1)
                    console.log('styleLen',styleLen)


                })           
            }
            // setTimeout(()=>{
                let startPos2=0
                if(item.article.match(/<iframe/ig)!==null) {
                     item.article.match(/<iframe/ig).map((value,index)=>{
                        console.log('index',index)
                        startPos2=item.article.indexOf('<iframe',startPos2)
                        let styleLen=item.article.indexOf('iframe>',startPos2)-startPos2
                        item.article=item.article.substring(0,startPos2)+item.article.substring(item.article.indexOf('iframe>',startPos2)+7)
                        startPos2=item.article.indexOf('<iframe',startPos2)
                        console.log('startPos2',startPos2)
                        console.log('styleLen',styleLen)


                    })
                }
                console.log('Final item.article',item.article)
                // console.log('item.article.length',item.article.length)
                // for (let i=0;i<item.article.length;) {
                //     let j=i+1000<item.article.length?i+1000:item.article.length
                //     console.log(item.article.substring(i,j))
                //     i=j
                // }
                this.props.drillDown(item, 'newsDetails')
        //     },2000)
        // },2000)
        
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
                newsFeed: nextProps.newsFeed,
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
