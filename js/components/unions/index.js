'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Linking, ActivityIndicator, ScrollView } from 'react-native'
import { drillDown, saveContent } from '../../actions/content'
import { Container, Text } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import loader from '../../themes/loader-position'
import styleVar from '../../themes/variable'


// For mapping a static image only, since require() is not working with concatenating a dynamic variable
// should be delete this code once api is ready.
import Data from '../../../contents/unions/data'

class Unions extends Component {

    constructor(props) {
         super(props)
         this._scrollView = ScrollView
         this.state = {
              isLoaded: false
         }
    }

    _drillDown(item, route) {
        this.props.drillDown(item, 'unionDetails')
    }

    componentDidMount() {
        this.props.saveContent(Data)
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
                    <LionsHeader 
                        title='UNIONS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        {
                            this._mapJSON(Data).map((rowData, index) => {
                                return (
                                    <Grid key={index}>
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
                                                                            source={item.logo}
                                                                            style={styles.gridBoxImg} />
                                                                    </ImagePlaceholder>
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
                    </ScrollView>
                    <EYSFooter />
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        saveContent: (data)=>dispatch(saveContent(data)),
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect(null, bindAction)(Unions)
