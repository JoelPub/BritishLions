
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, ScrollView, ActivityIndicator, Platform, Alert } from 'react-native'
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
import SummaryCardWrapper from '../global/summaryCardWrapper'
import { getUserCustomizedSquad, removeUserCustomizedSquad } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import SquadModel from  'modes/Squad'
import Rating from  'modes/SquadPop/Rating'
import { getAssembledUrl } from '../utility/urlStorage'
import { getUserId } from '../utility/asyncStorageServices'
import { service } from '../utility/services'

// For mapping a static image only, since require() is not working with concatenating a dynamic variable
// should be delete this code once api is ready.
import fixturesList from '../../../contents/fixtures/data.json'
import fixturesImages from '../../../contents/fixtures/images'

class Landing extends Component {

    constructor(props) {
        super(props)

        this.isUnMounted = false
        this.totalPlayer = 35
        this.getMySquadRatingUrl = getAssembledUrl('EYC3GetMySquadRating')

        this.state = {
            apiUrl: 'https://f3k8a7j4.ssl.hwcdn.net/feeds/app/news.php',
            isLoaded: false,
            isFetchContent: false,
            newsFeed: [], 
            fixturesList: this._limitList(fixturesList, 1),
            isFullPlayer: true,
            totalPlayerSelected: 0,
            isLoadedSquad: false,
            userID: '',
            rating: Rating().toJS(),
        }
    }

    _navigateTo(route) {
        this.props.pushNewRoute(route)
    }

    _drillDown(data, route) {
        this.props.drillDown(data, route)
    }

    _fetchContent() {
        this.props.fetchContent(this.state.apiUrl)
        this.setState({ isFetchContent: true })
    }

    _limitList(list, limit=null) {
        if (limit) {
            return list.slice(0, limit)
        }

        return list
    }

     _showError(error) {
        Alert.alert(
            'An error occured',
            error,
            [{text: 'Dismiss'}]
        )
    }

    _signInRequired() {
        Alert.alert(
            'Your session has expired',
            'Please sign into your account.',
            [{
                text: 'SIGN IN', 
                onPress: this._reLogin.bind(this)
            }]
        )
    }

    _getSquad() {
        getUserCustomizedSquad().then((catchedSquad)=>{
            if (this.isUnMounted) return // return nothing if the component is already unmounted

            if(catchedSquad.auth) {
                if(catchedSquad.auth === 'Sign In is Required'){
                    this.setState({ isLoadedSquad: true }, () => {
                        this._signInRequired()
                    })
                }
            }else if(catchedSquad.error){
                this.setState({ isLoadedSquad: true }, () => {
                    this._showError(catchedSquad.error)
                })
            }else{
                let data = eval(`(${catchedSquad.data})`)
                this._countPlayerSelected(data)
            }
        })   
    }

    _countPlayerSelected(data) {
        let isFullPlayer = false
        let backs = this._convertToArr(data.backs)
        let forwards = this._convertToArr(data.forwards)
        let kicker = this._convertToArr(data.kicker)
        let widecard = this._convertToArr(data.widecard)
        let captain = this._convertToArr(data.captain)
        let totalPlayerSelected = backs.length + forwards.length + kicker.length + widecard.length + captain.length
        // console.log('backs: ', backs)
        // console.log('forwards: ', forwards)
        // console.log('kicker: ', kicker)
        // console.log('widecard: ', widecard)
        // console.log('captain: ', captain)
        if (totalPlayerSelected === this.totalPlayer) {
            isFullPlayer = true

            this.setState({ isFullPlayer, totalPlayerSelected }, () => {
                let squadList = {
                    backs,
                    captain,
                    widecard,
                    forwards,
                    kicker
                }
                this._getRating(squadList)
            })
        } else {
            this.setState({ isFullPlayer, totalPlayerSelected, isLoadedSquad: true })
        }
    }

    _convertToArr(str) {
        // clean
        str =  str.trim().replace(/["']/g, '')
        
        // convert
        if (str) {
            return str.split('|')
        }

        return []
    }

    _toRating(rate) {
        console.log(rate)
        let finalRate = 0
        rate = parseInt(rate)

        switch(rate) {
            case 1:
                finalRate = 5
                break
            case 2:
                finalRate = 10
                break
            case 3:
                finalRate = 25
                break
            case 4:
                finalRate = 50
                break
        }

        return finalRate + '%'
    }

    _getRating(squadList){
        let optionsSquadRating = {
            url: this.getMySquadRatingUrl,
            data: {id: this.state.userID, squad: JSON.stringify(squadList)},
            onAxiosStart: () => {},
            onAxiosEnd: () => {
                this.setState({ isLoadedSquad: true })
            },
            onSuccess: (rating) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                console.log(rating)
                this.setState({
                    rating: rating.data
                },()=>{      
                    removeUserCustomizedSquad()
                })
            },
            onError: (res) => {
                this._showError(res)
            },
            onAuthorization: () => {
                this._signInRequired()
            },
            isRequiredToken: true,
            channel: 'EYC3'
        }

        service(optionsSquadRating)        
    }

    componentWillMount() {
        getUserId().then((userID) => {
            this.setState({ userID })
        }).catch((error) => {})
    }

    componentDidMount() {
        setTimeout(() => {
            this._fetchContent()
        }, 600)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isFetchContent) {
            this.setState({
                isLoaded: true,
                isRefreshing: nextProps.isRefreshing,
                newsFeed: this._limitList(nextProps.newsFeed, 3),
                isFetchContent: false
            })
        }

        if (this.props.isAccessGranted) {
            this._getSquad()
        }
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    _renderNewsFeed() {
        let styleSwiperWrapper = this.state.newsFeed.length? [styles.swiperWrapper] : [styles.swiperWrapper, styles.swiperWrapperEmpty]
        return (
            <View style={styleSwiperWrapper}>
                <Swiper
                    height={Platform.OS === 'android'? 295 : 250}
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
                                    onPress={() => this._navigateTo('news')}>
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
        )

    }

    render() {    
        console.log(this.state)
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader 
                        title='LANDING'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />

                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        {
                            !this.props.isAccessGranted?
                                <ImagePlaceholder height={styleVar.deviceWidth} width={styleVar.deviceWidth}>
                                    <Image 
                                        resizeMode='cover'
                                        source={require('../../../images/content/mylionsBanner.jpg')} style={styles.mainBanner}>
                                    </Image>
                                </ImagePlaceholder>
                            : 
                                null
                        }

                        <View style={styles.guther}>
                            {
                                this.props.isAccessGranted?
                                    !this.state.isLoadedSquad?
                                        <View style={styles.squadIndicator}>
                                            <ActivityIndicator style={styles.scoreCard} size='small' /> 
                                        </View>
                                    :
                                        <View style={styles.squad}>
                                            <SummaryCardWrapper>
                                                {
                                                    this.state.isFullPlayer? 
                                                        <View>
                                                            <View style={styles.squadCompleted}>
                                                                
                                                                {
                                                                    parseInt(this.state.rating.fan_ranking) < 5?
                                                                        <View>
                                                                            <Text style={styles.squadText}>Your squad score is ranked in the</Text>
                                                                            <Text style={styles.squadPercentage}>
                                                                                TOP {this._toRating(this.state.rating.fan_ranking)}
                                                                            </Text>
                                                                        </View>
                                                                    :
                                                                        <View>
                                                                            <Text style={styles.squadText}>There’s room to improve your squad!</Text>
                                                                            <Text style={styles.squadPercentage}>
                                                                                MORE THAN 50%
                                                                            </Text>
                                                                            <Text style={[styles.squadText, styles.squadText2]}>of scores are higher than yours.</Text>
                                                                        </View>
                                                                }
                                                            </View> 
                                                            <View style={styles.squadRating}> 
                                                                <Text style={styles.squadRatingText}>OVERALL RATING</Text>
                                                                <View style={styles.squadCircle}>
                                                                    <Text style={styles.squadCircleText}>
                                                                        { this.state.rating.overall_rating || 'N/A' }
                                                                    </Text>
                                                                </View>
                                                            </View> 
                                                        </View> 
                                                    :    
                                                        <View style={styles.padder}>
                                                            <Text style={styles.squadTitleText}>MY SQUAD PLAYERS SELECTED</Text>
                                                            <Text style={styles.squadCountText}>
                                                                { this.state.totalPlayerSelected }/{this.totalPlayer}
                                                            </Text>
                                                            <Text style={styles.squadText}>Complete your full squad of {this.totalPlayer} players to receive a real-time squad rating from EY</Text>
                                                        </View>
                                                }
                                            </SummaryCardWrapper>
                                        </View>
                                : 
                                    null
                            }
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
                                    onPress={() => this._navigateTo('myLionsSquad')}
                                >
                                    <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                        style={styles.btnMysquadIcon}>
                                    </Image>
                                    <Text style={styles.btnMysquadLabel}>
                                        MY SQUAD
                                    </Text>
                                </ButtonFeedback>
                            </View>
                        </View>


                        <View>
                            <View style={styles.pageTitle}>
                                <Text style={styles.pageTitleText}>
                                    LATEST UPDATES
                                </Text>
                            </View>
                            {
                                !this.state.isLoaded?
                                    <View style={styles.latestUpdateIndicator}>
                                        <ActivityIndicator style={styles.scoreCard} size='small' /> 
                                    </View>
                                :
                                    this._renderNewsFeed()
                            }
                        </View>


                        <View>
                            <View style={styles.pageTitle}>
                                <Text style={styles.pageTitleText}>
                                    UPCOMING FIXTURE
                                </Text>
                            </View>
                            {
                                this.state.fixturesList.map(function(item, index) {
                                    let date = item.date.toUpperCase() || ''
                                    let title = item.title || ''
                                    let image = fixturesImages[item.id]

                                    return (
                                        <ButtonFeedback key={index}
                                            style={styles.banner}
                                            onPress={() => this._drillDown(item, 'fixtureDetails')}>
                                            <ImagePlaceholder height={200}>
                                                <Image
                                                    resizeMode='cover' 
                                                    style={styles.bannerImg}
                                                    source={image} />
                                            </ImagePlaceholder>
                                            <View style={[shapes.triangle, {marginTop: -12}]} />
                                            <View style={styles.bannerDetails}>
                                                <Text style={styles.bannerTitle}>{ date }</Text>
                                                <Text style={styles.bannerDesc}>{ title }</Text>
                                            </View>
                                        </ButtonFeedback>
                                    )
                                }, this)
                            }
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
        newsFeed: state.content.contentState,
        isAccessGranted: state.token.isAccessGranted
    }
}, bindAction)(Landing)