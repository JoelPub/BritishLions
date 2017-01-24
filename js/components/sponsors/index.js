'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Linking } from 'react-native'
import { drillDown, saveContent } from '../../actions/content'
import { Container, Content, Text } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import styleVar from '../../themes/variable'

// For mapping a static image only, since require() is not working with concatenating a dynamic variable
// should be delete this code once api is ready.
import Data from '../../../contents/sponsors/data'

class Sponsors extends Component {

    _mapJSONbyCategories(data, category, colMax = 2) {
        let cat = category.toLowerCase()
        let i = 0
        let k = 0
        let newData = []
        let items = []

        // filter by categories
        let sponsors = data.filter((item) => {
            return item.category == cat
        })
        
        let length = sponsors.length
        // extract by colMax
        for( i = 0; i <= length; (i += colMax)) {
            for( k = 0; k < colMax; k++ ) {
                if(sponsors[i + k])
                    items.push(sponsors[i + k])
            }

            newData.push(items)
            items = []
        }

        return newData
    }

    _drillDown(data) {
        this.props.drillDown(data, 'sponsorDetails')
    }

    componentDidMount() {
        this.props.saveContent(Data)
    }

    render() {
        let catSponsors = ['Principal Partners', 'Official Sponsors', 'Official Suppliers', 'Charity', 'Media']

                                        
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader title='SPONSORS' />
                    <Content>
                        {
                            catSponsors.map((category, index) => {
                                return (
                                    <View key={index}>
                                        <View style={styles.tier}>
                                            <Text style={styles.tierTitle}>{category.toUpperCase()}</Text>
                                        </View>
                                        {
                                            this._mapJSONbyCategories(Data, category).map((rowData, index) => {
                                                return (
                                                    <Grid key={index}>
                                                        <Row>
                                                        {
                                                            rowData.map((item, key) => {
                                                                let stylesArr = (key === 0)? [styles.gridBoxTouchable, styles.gridBoxTouchableLeft] : [styles.gridBoxTouchable]

                                                                return (
                                                                    <Col style={styles.gridBoxCol} key={key}>
                                                                        <ButtonFeedback
                                                                            style={stylesArr}
                                                                            onPress={() => this._drillDown(item)}>

                                                                            <View style={styles.gridBoxTouchableView}>
                                                                                <View style={styles.gridBoxImgWrapper}>
                                                                                    <ImagePlaceholder
                                                                                        width = {styleVar.deviceWidth / 2 - 1}
                                                                                        height = {styleVar.deviceWidth / 2}>
                                                                                        <Image transparent
                                                                                            resizeMode='contain'
                                                                                            source={item.image}
                                                                                            style={styles.gridBoxImg} />
                                                                                    </ImagePlaceholder>
                                                                                </View>

                                                                                <View style={[shapes.triangle]} />
                                                                                <View style={styles.gridBoxTitle}>
                                                                                    <Text style={styles.gridBoxTitleText}>{item.title.toUpperCase()}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </ButtonFeedback>
                                                                    </Col>
                                                                )
                                                            }, this)
                                                        }
                                                        </Row>
                                                    </Grid>
                                                )
                                            }, this)
                                        }
                                    </View>
                                )
                            }, this)
                        }
                        <LionsFooter isLoaded={true} />
                    </Content>
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        saveContent: (data)=>dispatch(saveContent(data))
    }
}

export default connect(null, bindAction)(Sponsors)
