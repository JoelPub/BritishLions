'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ActivityIndicator } from 'react-native'
import { fetchContent, drillDown } from '../../actions/content'
import { Container, Header, Content, Text, Button, Icon } from 'native-base'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import theme from '../../themes/base-theme'
import styles from './styles'
import loader from '../../themes/loader-position'
import shapes from '../../themes/shapes'
import StickyFooter from '../utility/stickyFooter'

class LionsTV extends Component {
    constructor(props) {
         super(props)
         this.state = {
              isLoaded: false,
              videosFeed: {items:[]}, 
         }
         this.url = 'https://www.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=UC5Pw6iUW8Dgmb_JSEqzXH3w&maxResults=20&key=AIzaSyAz7Z48Cl9g5AgCd1GJRiIKwM9Q3Sz2ifY'
    }

    _drillDown(data, route) {
        this.props.drillDown(data, route)
    }

    componentDidMount() {
        this.props.fetchContent(this.url)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoaded: nextProps.isLoaded,
            videosFeed: nextProps.videosFeed.length !== 0? nextProps.videosFeed : {items:[]}
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    render(){
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader title='LIONS TV' />
                    {
                        this.state.isLoaded?
                            <Content>
                                <StickyFooter>
                                    {
                                        this.state.videosFeed.items.map(function(data, index) {
                                            let year = data.snippet.publishedAt.substr(0,4)
                                            let publishDate = new Date(data.snippet.publishedAt).toLocaleDateString()
                                            let month = publishDate.split('/')[0]?publishDate.split('/')[0]:''
                                            let day = publishDate.split('/')[1]?publishDate.split('/')[1]:''
                                            return (
                                               <ButtonFeedback
                                                    style={styles.btn}
                                                    key={index}
                                                    onPress={() => this._drillDown(data, 'lionsTvDetails')}>
                                                    <Image
                                                        source={require('../../../images/placeholder/banner.png')}
                                                        style={styles.placeholderImage}>
                                                        <Image source={{uri: data.snippet.thumbnails.standard.url}} style={styles.lionsTvGalleryImage}/>
                                                    </Image>
                                                    <View style={[shapes.triangle, {marginTop: -11}]} />
                                                    <View style={styles.lionsTvGalleryContent}>
                                                        <Text numberOfLines={4} style={styles.headline}>
                                                            {data.snippet.title ? data.snippet.title.toUpperCase() : ' '}
                                                        </Text>
                                                        <View style={styles.lionsTVDateWrapper}>
                                                            <Icon name='md-time' style={ styles.timeIcon} />
                                                            <Text style={styles.lionsTVDateText}> {`${day}/${month}/${year}`} at {new Date(data.snippet.publishedAt).toLocaleTimeString()}</Text>
                                                        </View>
                                                    </View>
                                                </ButtonFeedback>
                                            )
                                        }, this)
                                    }
                                </StickyFooter>
                            </Content>
                        :
                            <ActivityIndicator
                              style={loader.centered}
                              size='large'
                            />
                      }
                      <EYSFooter />
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
        videosFeed: state.content.contentState,
        isLoaded: state.content.isLoaded,
        connectionInfo: state.network.connectionInfo
    }
}, bindAction)(LionsTV)
