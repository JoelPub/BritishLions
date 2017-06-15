'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ActivityIndicator, ScrollView, ListView } from 'react-native'
import { fetchContent, drillDown } from '../../actions/content'
import { Container, Text, Button, Icon } from 'native-base'
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
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this._scrollView = ScrollView
        this.state = {
            isLoaded: false,
            galleriesFeed: this.ds.cloneWithRows([{title:'Galleries',thumb50:null}]),
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
        if(nextProps.galleriesFeed&&nextProps.galleriesFeed[0]) {

            this.setState({
                isLoaded: nextProps.isLoaded,
                galleriesFeed: this.ds.cloneWithRows(nextProps.galleriesFeed.filter(x=>x.images.length>0))
            })
        }
    }
    _renderRow(rowData, sectionID, rowID, highlightRow) {

        return (
            <ButtonFeedback
                style={styles.btn}
                key={rowID}
                onPress={() => this._drillDown(rowData)}
                disabled={!this.state.isLoaded}>
                <ImagePlaceholder height={420 * (styleVar.deviceWidth/750)}>
                {
                    rowData.thumb50&&<Image source={{uri: rowData.thumb50}} style={styles.galleriesImage} />
                }

                </ImagePlaceholder>
                <View style={[shapes.triangle, styles.triangle]} />
                <View style={styles.galleriesContent}>
                    <Text numberOfLines={1} style={styles.galleriesHeader}>
                        {rowData.title? rowData.title.toUpperCase() : ' '}
                    </Text>
                </View>
            </ButtonFeedback>
        )
    }
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader
                        title='GALLERIES'
                        contentLoaded={this.state.isLoaded}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        <StickyFooter>
                            <ListView
                                dataSource={this.state.galleriesFeed}
                                renderRow={this._renderRow.bind(this)}
                                enableEmptySections = {true}
                                contentContainerStyle={styles.backgroundList}
                            />
                        </StickyFooter>
                    </ScrollView>
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
