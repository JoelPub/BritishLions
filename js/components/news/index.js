'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ActivityIndicator, RefreshControl, ScrollView, NetInfo } from 'react-native'
import { fetchContent, drillDown } from '../../actions/content'
import { Container, Text, Button, Icon } from 'native-base'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import ImagePlaceholder from '../utility/imagePlaceholder'
import theme from '../../themes/base-theme'
import loader from '../../themes/loader-position'
import refresh from '../../themes/refresh-control'
import styles from './styles'
import styleVar from '../../themes/variable'
import { alertBox } from './../utility/alertBox'
import {getNetinfo} from '../utility/network'

class News extends Component {
    constructor(props) {
         super(props)
         this.url = 'https://f3k8a7j4.ssl.hwcdn.net/feeds/app/news.php'
         this.state = {
              isLoaded: false,
              isRefreshing: false,
              newsFeed: {},              
         }
    }

    _drillDown(item) {
        this.props.drillDown(item, 'newsDetails')
    }

    fetchContent(connectionInfo) {
                if(connectionInfo==='NONE') {
                    this.setState({
                        isLoaded:true,
                        isRefreshing:false,
                        newsFeed: this.props.newsFeed
                    })
                    alertBox(
                      'An Error Occured',
                      'Please make sure the network is connected and reload the app. ',
                      'Dismiss'
                    )
                }
                else {
                    this.props.fetchContent(this.url)
                }
               
    }

    _onRefresh() {
        this.setState({isRefreshing: true})
        getNetinfo(this.fetchContent.bind(this))
    }

    

    componentDidMount() {
        setTimeout(()=>{
            if(this.props.connectionInfo===null||this.props.connectionInfo==='NONE') {
                getNetinfo(this.fetchContent.bind(this))
            } 
            else {       
                this.fetchContent(this.props.connectionInfo)
            }

        },3000)
        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoaded: true,
            isRefreshing: nextProps.isRefreshing,
            newsFeed: nextProps.newsFeed
        })
    }
    
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>

                    <LionsHeader title='NEWS' />
                    {
                        this.state.isLoaded&&this.state.newsFeed.length>0?
                            <ScrollView
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
                                                    <Text numberOfLines={2} style={styles.newsHeader}>
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
                                <LionsFooter isLoaded={true} />
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
        isRefreshing: state.content.isRefreshing,
        connectionInfo: state.network.connectionInfo
    }
}, bindAction)(News)
