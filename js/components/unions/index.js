'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Linking, ActivityIndicator } from 'react-native'
import { fetchContent,drillDown } from '../../actions/content'
import { Container, Content, Text } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import loader from '../../themes/loader-position'

class Unions extends Component {

    constructor(props) {
         super(props)
         this.state = {
              isLoaded: false
         }
    }

    _drillDown(item, route) {
        let data = Object.assign(item, {'json': this.props.unionsFeed})
        this.props.drillDown(data, route)
    }

    componentDidMount() {
        this.props.fetchContent('https://f3k8a7j4.ssl.hwcdn.net/tools/feeds?id=388')
    }

    componentWillReceiveProps() {
        this.setState({
            isLoaded: true
        })
    }
    _mapJSON(data, colMax = 2) {
        let i = 0
        let k = 0
        let newData = []
        let items = []
        let length = data.length

        for( i = 0; i <data.length; (i += colMax)) {
            for( k = 0; k < colMax; k++ ) {
                if(data[i + k])
                    items.push(data[i + k])
            }

            newData.push(items)
            items = []
        }
        return newData
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader title='UNIONS' />
                    {
                        this.state.isLoaded?
                            <Content>
                                {
                                    this._mapJSON(this.props.unionsFeed).map((rowData, index) => {
                                        return (
                                            <Grid key={index}>
                                                {
                                                    rowData.map((item, key) => {
                                                        let stylesArr = (key === 0)? [styles.gridBoxTouchable, styles.gridBoxTouchableLeft] : [styles.gridBoxTouchable]

                                                        return (
                                                            <Col style={styles.gridBoxCol} key={key}>
                                                                <ButtonFeedback
                                                                    style={stylesArr}
                                                                    onPress={() => this._drillDown(item,'unionDetails')}>

                                                                    <View style={styles.gridBoxTouchableView}>
                                                                        <View style={styles.gridBoxImgWrapper}>
                                                                            <Image transparent
                                                                                resizeMode='contain'
                                                                                source={{uri: item.logo}}
                                                                                style={styles.gridBoxImgWithPadding} />
                                                                        </View>

                                                                        <View style={[shapes.triangle]} />
                                                                        <View style={styles.gridBoxTitle}>
                                                                            <Text style={styles.gridBoxTitleText}>{item.displayname.toUpperCase()}</Text>
                                                                        </View>
                                                                    </View>
                                                                </ButtonFeedback>
                                                            </Col>
                                                        )
                                                    }, this)
                                                }
                                            </Grid>
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
                    < EYSFooter />
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
    unionsFeed: state.content.contentState,
    isLoaded: state.content.isLoaded
  }
}, bindAction)(Unions)
