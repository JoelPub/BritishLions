'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ActivityIndicator } from 'react-native'
import { fetchContent, drillDown } from '../../actions/content'
import { Container, Content, Text, Button, Icon } from 'native-base'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import styles from './styles'
import theme from '../../themes/base-theme'
import loader from '../../themes/loader-position'
import shapes from '../../themes/shapes'
import {getNetinfo} from '../utility/network'
import { alertBox } from './../utility/alertBox'

class Galleries extends Component {
    constructor(props) {
         super(props)
         this.state = {
              isLoaded: false
         }
         this.url='https://f3k8a7j4.ssl.hwcdn.net/feeds/app/galleries_json_v6.php'
    }

    _drillDown(data) {
        if(data.images&&data.images.length>0) {
            this.props.drillDown(data, 'galleriesDetails')
        }
        else {
            alertBox(
                      'An Error Occured',
                      'Please make sure the network is connected and reload the app. ',
                      'Dismiss'
                    )
        }
    }

    fetchContent(connectionInfo) {
                if(connectionInfo==='NONE') {
                    this.setState({
                        isLoaded:true,
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

    componentDidMount() {
        if(this.props.connectionInfo===null||this.props.connectionInfo==='NONE') {
            getNetinfo(this.fetchContent.bind(this))
        } 
        else {       
            this.fetchContent(this.props.connectionInfo)
        }
    }

    componentWillReceiveProps() {
          this.setState({
            isLoaded: this.props.isLoaded || true
          })
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader title='GALLERIES' />
                    {
                        this.state.isLoaded&&this.props.galleriesFeed.length>0?
                            <Content>
                              {
                                   this.props.galleriesFeed.map(function(data, index) {
                                        return (
                                           <ButtonFeedback
                                                style={styles.btn}
                                                key={index}
                                                onPress={() => this._drillDown(data)}>
                                                <ImagePlaceholder height={180}>
                                                    <Image source={{uri: data.thumb50}} style={styles.galleriesImage} />
                                                </ImagePlaceholder>
                                                <View style={[shapes.triangle, styles.triangle]} />
                                                <View style={styles.galleriesContent}>
                                                    <Text numberOfLines={1} style={styles.galleriesHeader}>
                                                        {data.title? data.title.toUpperCase() : ' '}
                                                    </Text>
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
        galleriesFeed: state.content.contentState,
        isLoaded: state.content.isLoaded,
        connectionInfo: state.network.connectionInfo
    }
}, bindAction)(Galleries)
