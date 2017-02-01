'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ActivityIndicator } from 'react-native'
import { fetchContent, drillDown } from '../../actions/content'
import { Container, Content, Text, Button, Icon } from 'native-base'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import styles from './styles'
import theme from '../../themes/base-theme'
import loader from '../../themes/loader-position'
import shapes from '../../themes/shapes'
import StickyFooter from '../utility/stickyFooter'
import styleVar from '../../themes/variable'

class Galleries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            galleriesFeed: [],       
        }
        this.url='https://f3k8a7j4.ssl.hwcdn.net/feeds/app/galleries_json_v15.php'
    }

    _drillDown(data) {
        this.props.drillDown(data, 'galleriesDetails')
    }
    
    componentDidMount() {
        this.props.fetchContent(this.url)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoaded: nextProps.isLoaded,
            galleriesFeed: nextProps.galleriesFeed
        })
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader title='GALLERIES' />
                    {
                        this.state.isLoaded?
                            <Content>
                                <StickyFooter>
                                    <View style={styles.backgroundList}>
                                        {
                                           this.state.galleriesFeed.map(function(data, index) {
                                                return (
                                                   <ButtonFeedback
                                                        style={styles.btn}
                                                        key={index}
                                                        onPress={() => this._drillDown(data)}>
                                                        <ImagePlaceholder height={420 * (styleVar.deviceWidth/750)}>
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
                                    </View>
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
        galleriesFeed: state.content.contentState,
        isLoaded: state.content.isLoaded
    }
}, bindAction)(Galleries)
