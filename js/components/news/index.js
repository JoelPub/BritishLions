'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
import { fetchContent, drillDown } from '../../actions/content'
import { Container, Content, Text, Button, Icon } from 'native-base'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import theme from '../../themes/base-theme'
import loader from '../../themes/loader-position'
import refresh from '../../themes/refresh-control'
import styles from './styles'

class News extends Component {
    constructor(props) {
         super(props)
         this.state = {
              isLoaded: false,
              isRefreshing: false,
              newsFeed: {}
         }
    }

    _drillDown(item) {
        this.props.drillDown(item, 'newsDetails')
    }

    componentDidMount() {
        this.props.fetchContent('https://f3k8a7j4.ssl.hwcdn.net/feeds/app/news.php')
    }

    componentWillReceiveProps() {
        this.setState({
            isLoaded: true,
            isRefreshing: false,
            newsFeed: this.props.newsFeed
        })
    }

    _onRefresh() {
        this.setState({isRefreshing: true})
        this.props.fetchContent('https://f3k8a7j4.ssl.hwcdn.net/feeds/app/news.php')
    };

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
                                {
                                    this.props.newsFeed.map(function(data, index) {
                                        return (
                                            <ButtonFeedback
                                                key={index}
                                                style={styles.listLink}
                                                onPress={() => this._drillDown(data)}>
                                                    <Image source={{uri: data.thumb}} style={[styles.newsImage]} />
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
    isLoaded: state.content.isLoaded
  }
}, bindAction)(News)
