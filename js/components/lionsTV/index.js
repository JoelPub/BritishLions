'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ActivityIndicator } from 'react-native'
import { fetchContent, drillDown } from '../../actions/content'
import { Container, Header, Content, Text, Button, Icon } from 'native-base'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import theme from '../../themes/base-theme'
import styles from './styles'
import loader from '../../themes/loader-position'
import shapes from '../../themes/shapes'

class LionsTV extends Component {
    constructor(props) {
         super(props)
         this.state = {
              isLoaded: false
         }
    }
    _drillDown(data, route) {
        this.props.drillDown(data, route)
    }
    componentDidMount() {
        this.props.fetchContent('https://f3k8a7j4.ssl.hwcdn.net/feeds/app/tv.php')
    }
    componentWillReceiveProps() {
      this.setState({
        isLoaded: this.props.isLoaded || true
      })
    }
    render(){
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader title='LIONS TV' />
                    {
                        this.state.isLoaded?
                            <Content>
                                {
                                   this.props.videosFeed.map(function(data, index) {
                                        return (
                                           <ButtonFeedback
                                                style={styles.btn}
                                                key={index}
                                                onPress={() => this._drillDown(data, 'lionsTvDetails')}>
                                                <ImagePlaceholder height={211}>
                                                    <Image source={{uri: data.image}} style={styles.lionsTvGalleryImage}/>
                                                </ImagePlaceholder>
                                                <View style={[shapes.triangle, {marginTop: -11}]} />
                                                <View style={styles.lionsTvGalleryContent}>
                                                    <Text numberOfLines={2} style={styles.headline}>
                                                        {data.headline ? data.headline.toUpperCase() : ' '}
                                                    </Text>
                                                    <View style={styles.lionsTVDateWrapper}>
                                                        <Icon name='md-time' style={ styles.timeIcon} />
                                                        <Text style={styles.lionsTVDateText}> {data.date} at {data.time}</Text>
                                                    </View>
                                                </View>
                                            </ButtonFeedback>
                                        )
                                    }, this)
                                }
                                <LionsFooter isLoaded={this.props.isLoaded} />
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
        isLoaded: state.content.isLoaded
    }
}, bindAction)(LionsTV)
