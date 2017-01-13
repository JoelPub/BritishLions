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
         this.state = {
              isLoaded: false,
              isRefreshing: false,
              newsFeed: [], 
              isFetchContent: false,
              apiUrl: 'https://f3k8a7j4.ssl.hwcdn.net/feeds/app/news.php'             
         }
    }

    _drillDown(item) {
        this.props.drillDown(item, 'newsDetails')
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

                    <LionsHeader title='NEWS' />
                    {
                        this.state.isLoaded?
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
