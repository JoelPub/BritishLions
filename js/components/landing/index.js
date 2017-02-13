
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { Container, Icon } from 'native-base'
import { drillDown, fetchContent } from '../../actions/content'
import { pushNewRoute } from '../../actions/route'
import theme from '../../themes/base-theme'
import styles from './styles'
import styleVar from '../../themes/variable'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import { Grid, Col, Row } from 'react-native-easy-grid'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import shapes from '../../themes/shapes'
import Swiper from 'react-native-swiper'

// For mapping a static image only, since require() is not working with concatenating a dynamic variable
// should be delete this code once api is ready.
import data from '../../../contents/fixtures/data.json'
import images from '../../../contents/fixtures/images'

class Landing extends Component {

    constructor(props) {
        super(props)

        this.state = {
            apiUrl: 'https://f3k8a7j4.ssl.hwcdn.net/feeds/app/news.php',
            isLoaded: false,
            isFetchContent: false,
            newsFeed: [], 
        }
    }

    _navigateTo(route) {
        this.props.pushNewRoute(route)
    }

    _drillDown(data) {
        //this.props.drillDown(data, 'fixtureDetails')
    }

    _fetchContent(){
        this.props.fetchContent(this.state.apiUrl)
        this.setState({ isFetchContent: true })
    }

    _filterNewsFeed() {
        // TODO
    }

    componentDidMount() {
        setTimeout(() => {
            this._fetchContent()
        }, 1000)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isFetchContent) {
            this.setState({
                isLoaded: nextProps.isLoaded,
                isRefreshing: nextProps.isRefreshing,
                newsFeed: nextProps.newsFeed,
                isFetchContent: false
            })
        }
    }

    render() {    

        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader 
                        title='LANDING'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />

                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        <ImagePlaceholder height={styleVar.deviceWidth} width={styleVar.deviceWidth}>
                            <Image 
                                resizeMode='cover'
                                source={require('../../../images/content/mylionsBanner.jpg')} style={styles.mainBanner}>
                            </Image>
                        </ImagePlaceholder>

                        <View style={styles.btnWrapper}>
                            {/*<ButtonFeedback rounded style={[styles.roundButton]} onPress={() => this.props.pushNewRoute('myLionsCompetitionCentre')}>
                                <Icon name='md-analytics' style={styles.roundButtonIcon} />
                                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.roundButtonLabel} >
                                    COMPETITION CENTRE
                                </Text>
                            </ButtonFeedback>*/}
                            <ButtonFeedback 
                                rounded 
                                style={[styles.button, styles.btnMysquad]} 
                                onPress={() => this._navigateTo('myLions')}
                            >
                                <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                    style={styles.btnMysquadIcon}>
                                </Image>
                                <Text style={styles.btnMysquadLabel}>
                                    MY SQUAD
                                </Text>
                            </ButtonFeedback>
                        </View>


                        <View>
                            <View style={styles.pageTitle}>
                                <Text style={styles.pageTitleText}>
                                    LATEST UPDATES
                                </Text>
                            </View>

                            <View style={styles.swiperWrapper}>
                                <Swiper
                                    height={250}
                                    loop={false}
                                    dotColor='rgba(255,255,255,0.3)'
                                    activeDotColor='rgb(239,239,244)'
                                    paginationStyle={styles.swiperPaginationStyle}>
                                    {
                                        this.state.newsFeed.map(function(item, index) {
                                            
                                            let headline = item.headline || ''
                                            let image = item.image

                                            return (
                                                <ButtonFeedback key={index}
                                                    style={styles.banner}
                                                    onPress={() => this._drillDown([])}>
                                                    <ImagePlaceholder height={200}>
                                                        <Image
                                                            resizeMode='cover' 
                                                            style={styles.bannerImg}
                                                            source={{uri: image}} />
                                                    </ImagePlaceholder>
                                                    <View style={[shapes.triangle, {marginTop: -12}]} />
                                                    <View style={styles.bannerDetails}>
                                                        <Text style={styles.bannerTitle} numberOfLines={1}>
                                                            {headline.toUpperCase()}
                                                        </Text>
                                                    </View>  
                                                </ButtonFeedback>
                                            )
                                        }, this)
                                    }
                                </Swiper>
                            </View>
                        </View>


                        <View>
                            <View style={styles.pageTitle}>
                                <Text style={styles.pageTitleText}>
                                    UPCOMING FIXTURE
                                </Text>
                            </View>
                            <ButtonFeedback key={1}
                                style={styles.banner}
                                onPress={() => this._drillDown([])}>
                                <ImagePlaceholder height={200}>
                                    {/*<Image
                                        resizeMode='cover' 
                                        style={styles.bannerImg}
                                        source={images[item.id]} />*/}
                                </ImagePlaceholder>
                                <View style={[shapes.triangle, {marginTop: -12}]} />
                                <View style={styles.bannerDetails}>
                                    <Text style={styles.bannerTitle}>03 JUNE</Text>
                                    <Text style={styles.bannerDesc}>TITLE </Text>
                                </View>
                            </ButtonFeedback>
                        </View>
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
        fetchContent: (url)=>dispatch(fetchContent(url)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect((state) => {
    return {
        newsFeed: state.content.contentState
    }
}, bindAction)(Landing)