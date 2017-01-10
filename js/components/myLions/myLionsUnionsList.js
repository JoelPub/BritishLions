'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { drillDown } from '../../actions/content'
import { Container, Content, Text, Icon } from 'native-base'
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
import Data from '../../../contents/unions/data'

class MyLionsUnionsList extends Component {

    constructor(props) {
         super(props)
    }

    _showList(item, route) {
        this.props.drillDown(item, route)
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
                    <View style={styles.headerContainer}>
                        <LionsHeader back={true} title='MY LIONS' />
                        <View style={styles.myLionsSharedHeader}>
                         <Text style={styles.myLionsSharedHeaderText}>
                              HOME UNIONS
                         </Text>
                        </View>
                    </View>
                    <Content>
                         {
                            this._mapJSON(Data).map((rowData, index) => {
                                return (
                                    <Grid key={index}>
                                        {
                                            rowData.map((item, key) => {
                                                let styleGridBoxImgWrapper = (key === 0)? [styles.gridBoxImgWrapper, styles.gridBoxImgWrapperRight] : [styles.gridBoxImgWrapper]
                                                let styleGridBoxTitle = (key ===  0)? [styles.gridBoxTitle, styles.gridBoxTitleRight] : [styles.gridBoxTitle]

                                                return (
                                                    <Col  key={key}>
                                                        <ButtonFeedback
                                                            style={styles.gridBoxTouchable}
                                                            onPress={() => this._showList({
                                                                'uniondata': Data,
                                                                'unionId': item.id,
                                                                'logo': item.logo,
                                                                'name': item.displayname.toUpperCase()
                                                            }, 'myLionsPlayerList')}>

                                                            <View style={styles.gridBoxTouchableView}>
                                                                <View style={styleGridBoxImgWrapper}>
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
                                                                <View style={styleGridBoxTitle}>
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
                    < EYSFooter mySquadBtn={true}/>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect((state) => {
    return {
        route: state.route,
    }
},  bindAction)(MyLionsUnionsList)
