'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ActivityIndicator } from 'react-native'
import { fetchContent, drillDown } from '../../actions/content'
import { Container, Content, Text, Button, Icon } from 'native-base'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import theme from '../../themes/base-theme'
import loader from '../../themes/loader-position'
import styles from './styles'

class News extends Component {
    constructor(props) {
         super(props)
         this.state = {
              isLoaded: false
         }
    }
    _drillDown(item, route) {
        let data = Object.assign(item, {'json': this.props.newsFeed})
        this.props.drillDown(data, route)
    }
    componentDidMount() {
      this.props.fetchContent('https://f3k8a7j4.ssl.hwcdn.net/feeds/app/news.php')
    }
    componentWillReceiveProps() {
      this.setState({
        isLoaded: true
      })
    }
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>

                    <LionsHeader title='NEWS' />
                    {
                        this.state.isLoaded?
                            <Content>
                                {
                                     this.props.newsFeed.map(function(data, index) {
                                         return (
                                             <ButtonFeedback
                                                 key={index}
                                                 style={styles.listLink}
                                                 onPress={() => this._drillDown(data, 'newsDetails')}>
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
                          </Content>
                      :
                          <ActivityIndicator
                            style={loader.centered}
                            size='large'
                          />
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
