
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, ScrollView, ActivityIndicator, Platform, Alert } from 'react-native'
import { Container, Icon } from 'native-base'
import { drillDown } from '../../actions/content'
import { pushNewRoute, replaceRoute } from '../../actions/route'
import { setUserProfile } from '../../actions/squad'
import { setAccessGranted } from '../../actions/token'
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
import LinearGradient from 'react-native-linear-gradient'
import SummaryCardWrapper from '../global/summaryCardWrapper'
import ProfileSummaryCard from '../myLions/components/profileSummaryCard'
import { getUserCustomizedSquad, removeUserCustomizedSquad } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import SquadModel from  'modes/Squad'
import Rating from  'modes/SquadPop/Rating'
import { getAssembledUrl } from '../utility/urlStorage'
import { getUserId, removeToken, getUserFullName } from '../utility/asyncStorageServices'
import { service } from '../utility/services'
import { sortBy } from 'lodash'
import { actionsApi } from '../utility/urlStorage'
// For mapping a static image only, since require() is not working with concatenating a dynamic variable
// should be delete this code once api is ready.
import fixturesList from '../../../contents/fixtures/data.json'
import fixturesImages from '../../../contents/fixtures/images'

class Landing extends Component {

    constructor(props) {
        super(props)
        this.totalPlayer = 35
        this.getMySquadRatingUrl = getAssembledUrl('EYC3GetMySquadRating')
        this.latestUpdatesFeeds = []

        this.state = {
            apiNewsUrl: 'https://f3k8a7j4.ssl.hwcdn.net/feeds/app/news.php',
            apiGalleriesUrl: 'https://f3k8a7j4.ssl.hwcdn.net/feeds/app/galleries_json_v15.php',
            apiTvUrl: 'https://www.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=UC5Pw6iUW8Dgmb_JSEqzXH3w&maxResults=20&key=AIzaSyDZ_Oe-ZMxv-3vL3SX3BB2KE5wKVwkF64U',
            isLoaded: false,
            isFetchContent: false,
            isProfileSummaryLoaded: false,
            latestUpdatesFeeds: [], 
            fixturesList: [],
            isFullPlayer: true,
            totalPlayerSelected: 0,
            isLoadedSquad: false,
            userID: '',
            rating: Rating().toJS(),
            isNetwork: true
        }
    }

    _isSignIn(route) {
        this._navigateTo(route)
    }

    _navigateTo(route) {
        this.props.pushNewRoute(route)
    }

    _drillDown(data, route) {
        this.props.drillDown(data, route)
    }

    _fetchNews() {
        let options = {
            url: this.state.apiNewsUrl,
            method: 'get',
            data: {},
            onAxiosStart: () => {},
            onAxiosEnd: () => {},
            onSuccess: (json) => {
                
                this._latestUpdate('news', json.data, 1)
            },
            onError: (res) => {
                //this._showError(res)
            }
        }

        service(options)    
    }

    _fetchGalleries() {
        let options = {
            url: this.state.apiGalleriesUrl,
            method: 'get',
            data: {},
            onAxiosStart: () => {},
            onAxiosEnd: () => {},
            onSuccess: (json) => {
                
                this._latestUpdate('galleries', json.data, 3)
            },
            onError: (res) => {
                //this._showError(res)
            }
        }

        service(options)    
    }

    _fetchTV() {
        let options = {
            url: this.state.apiTvUrl,
            method: 'get',
            data: {},
            onAxiosStart: () => {},
            onAxiosEnd: () => {},
            onSuccess: (json) => {
                
                this._latestUpdate('lions tv', json.data.items, 2)
            },
            onError: (res) => {
                //this._showError(res)
            }
        }

        service(options)    
    }

    _fetchFixture() {
        let fixturesLeft = []
        let dateNow = new Date
        //dateNow = 'Wed Jun 03 2017 17:34:00 GMT+0800 (PHT)'
        dateNow = Date.parse(dateNow)

        fixturesList.map(function(item, index) {
            let dateSched = Date.parse(new Date(`${item.date} ${item.time}`))
            //console.log(dateSched, new Date(`${item.date} ${item.time}`))
            
            if (dateSched > dateNow) {
                fixturesLeft.push(item)
            }
        })

        this.setState({
            fixturesList: this._limitList(fixturesLeft, 1)
        })
    }

    _fetchContent() {
        this._fetchNews()
        this._fetchGalleries() 
        this._fetchTV()
        this._fetchFixture()
    }

    _latestUpdate(cat, data, order) {
        data = this._limitList(data, 1)[0]
        data.category = cat
        data.order = order
        this.latestUpdatesFeeds.push(data)

        this.setState({
            latestUpdatesFeeds: sortBy(this.latestUpdatesFeeds, ['order']),
            isLoaded: true
        })
    }

    _limitList(list, limit=null) {
        if (limit) {
            return list.slice(0, limit)
        }

        return list
    }

    _showError(error) {
        if(!this.state.isNetwork) return

        if(error === 'Please make sure that you\'re connected to the network.') {
            this.setState({
                isNetwork: false
            })
        }
        Alert.alert(
            'An error occured',
            error,
            [{text: 'Dismiss'}]
        )
    }

    _replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    _reLogin() {
        removeToken()
        this.props.setAccessGranted(false)
        this._replaceRoute('login')
        //this._drillDown([{backRoute: 'landing'}], 'login')
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
        console.log('get squad...')
        getUserCustomizedSquad().then((catchedSquad)=>{
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

    componentDidMount() {
        setTimeout(() => {
            this._fetchContent()
            if (this.props.isAccessGranted) {
                getUserId().then((userID) => {
                    this.setState({ userID },()=>{
                        getUserFullName().then((userName) => {
                            let firstName=''
                            let lastName=''
                            let initName = ''
                            if(typeof userName==='string') {
                                let u=userName.trim().replace(/\s+/g,' ')
                                // console.log('userName',userName)
                                firstName=u.split(' ')[0]||''
                                lastName=u.split(' ')[1]||''
                                initName = ''
                                u.split(' ').map((value, index)=>{
                                    initName = initName + value[0]
                                })
                                // console.log('firstName',firstName)
                                // console.log('lastName',lastName)
                                // console.log('initName',initName)
                            }
                            this._getProfileSummary(userName,firstName,lastName,initName)
                        }).catch((error) => {})
                        
                    })
                }).catch((error) => {})
            }
        }, 600)
    }

    _getProfileSummary(userName,firstName,lastName,initName){
        let optionsUserProfile = {
            url: actionsApi.eyc3GetuserProfileSummary,
            data: {id:this.state.userID,first_name:firstName,last_name:lastName},
            onAxiosStart: null,
            onAxiosEnd: null,
            method: 'post',
            channel: 'EYC3',
            isQsStringify:false,
            onSuccess: (res) => {
                if(res.data) {
                    console.log('res.data',res.data)
                    let userProfile = Object.assign(res.data, {
                        userName: userName, 
                        initName: initName, 
                        firstName: firstName,
                        lastName: lastName, 
                        userID: this.state.userID
                    })

                    this.setState({ isProfileSummaryLoaded: true }, () => {
                        this.props.setUserProfile(userProfile)
                    })
                }
            },
            onError: null,
            onAuthorization: () => {
                this._signInRequired()
            },
            isRequiredToken: true
        }
        service(optionsUserProfile)        
    }

    _countPlayerSelected(data) {
        let isFullPlayer = false
        let backs = this._convertToArr(data.backs)
        let forwards = this._convertToArr(data.forwards)
        let kicker = this._convertToArr(data.kicker)
        let widecard = this._convertToArr(data.widecard)
        let captain = this._convertToArr(data.captain)
        let totalPlayerSelected = backs.length + forwards.length + kicker.length + widecard.length + captain.length
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

    _renderNewsFeed() {
        let styleSwiperWrapper = this.state.latestUpdatesFeeds.length? [styles.swiperWrapper] : [styles.swiperWrapper, styles.swiperWrapperEmpty]
        return (
            <View style={styleSwiperWrapper}>
                <Swiper
                    height={Platform.OS === 'android'? 295 : 250}
                    loop={false}
                    dotColor='rgba(255,255,255,0.3)'
                    activeDotColor='rgb(239,239,244)'
                    paginationStyle={styles.swiperPaginationStyle}>
                    {
                        this.state.latestUpdatesFeeds.map(function(item, index) {
                            let category = item.category || ''
                            let imageURL = ''
                            let route = ''

                            switch (category) {
                                case 'news':
                                    route = 'news'
                                    imageURL = item.image
                                    break
                                case 'galleries':
                                    route = 'galleries'
                                    imageURL = item.thumb50
                                    break
                                case 'lions tv':
                                    route = 'lionsTv'
                                    imageURL = item.snippet.thumbnails.standard? item.snippet.thumbnails.standard.url : item.snippet.thumbnails.high.url
                                    break
                            }

                            return (
                                <ButtonFeedback key={index}
                                    style={styles.banner}
                                    onPress={() => this._navigateTo(route)}>
                                    <ImagePlaceholder height={200}>
                                        {
                                            imageURL?
                                                <Image
                                                    resizeMode='cover' 
                                                    style={styles.bannerImg}
                                                    source={{uri: imageURL}} />
                                            :
                                                null
                                        }
                                    </ImagePlaceholder>
                                    <View style={[shapes.triangle, {marginTop: -12}]} />
                                    <View style={styles.bannerDetails}>
                                        <Text style={styles.bannerTitle} numberOfLines={1}>
                                            {category.toUpperCase()}
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
                                <ButtonFeedback onPress={() => this._isSignIn('myLions')}>
                                    <ImagePlaceholder height={styleVar.deviceWidth*0.645} width={styleVar.deviceWidth}>
                                        <Image 
                                            resizeMode='cover'
                                            source={require('../../../images/content/myLionsSpanner.png')} style={styles.mainBanner}>
                                        </Image>
                                    </ImagePlaceholder>
                                </ButtonFeedback>
                            : 
                                null
                        }

                        <View style={styles.guther}>
                            {
                                this.props.isAccessGranted?
                                    !this.state.isProfileSummaryLoaded?
                                        <View style={styles.squadIndicator}>
                                            <ActivityIndicator style={styles.scoreCard} size='small' /> 
                                        </View>
                                    :
                                        <View style={styles.squad}>
                                            <ProfileSummaryCard profile={this.props.userProfile}/>
                                            {/*<SummaryCardWrapper>
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
                                            </SummaryCardWrapper>*/}
                                        </View>
                                : 
                                    null
                            }
                            <View style={styles.btnWrapper}>
                                <ButtonFeedback 
                                    rounded 
                                    style={[styles.roundButton]} 
                                    onPress={() => this._isSignIn('myLionsCompetitionCentre')}>
                                    <Icon name='md-analytics' style={styles.roundButtonIcon} />
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.roundButtonLabel} >
                                        COMPETITION CENTRE
                                    </Text>
                                </ButtonFeedback>
                                {/*<ButtonFeedback 
                                    rounded 
                                    style={[styles.button, styles.btnMysquad]} 
                                    onPress={() => this._myLions([{backRoute: 'landing'}], 'myLionsSquad')}
                                >
                                    <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                        style={styles.btnMysquadIcon}>
                                    </Image>
                                    <Text style={styles.btnMysquadLabel}>
                                        MY SQUAD
                                    </Text>
                                </ButtonFeedback>*/}
                            </View>
                        </View>
                        
                        <View>
                            <View style={styles.pageTitle}>
                                <Text style={styles.pageTitleText}>
                                    2017 LIONS SQUAD
                                </Text>
                            </View>
                            <ButtonFeedback
                                style={styles.banner}
                                onPress={() => this._isSignIn('myLionsOfficialSquad')}>
                                <ImagePlaceholder height={200}>
                                    <Image
                                        resizeMode='cover' 
                                        style={styles.bannerImg}
                                        source={{uri: 'https://bileurostoraged001.blob.core.windows.net/expertimages/SquadPhoto.jpg'}} />
                                </ImagePlaceholder>
                                <View style={[shapes.triangle, {marginTop: -12}]} />
                                <View style={styles.bannerDetails}>
                                    <Text style={styles.bannerTitle} numberOfLines={1}>
                                        VIEW SQUAD
                                    </Text>
                                </View>  
                            </ButtonFeedback>
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
                            {
                                this.state.fixturesList.length? 
                                    <View style={styles.pageTitle}>
                                        <Text style={styles.pageTitleText}>
                                            UPCOMING FIXTURE
                                        </Text>
                                    </View>
                                :
                                    null
                            }
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
                                                <LinearGradient style={styles.fixtureImgContainer} colors={['#d9d7d8', '#FFF']}>
                                                    <Image
                                                        resizeMode='contain'
                                                        style={styles.bannerImg}
                                                        source={image} />
                                                </LinearGradient>
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
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted)),
        setUserProfile:(profile)=>dispatch(setUserProfile(profile)),
    }
}

export default connect((state) => {
    return {
        newsFeed: state.content.contentState,
        userProfile: state.squad.userProfile,
        isAccessGranted: state.token.isAccessGranted,
        routeCount: state.route.routes.length
    }
}, bindAction)(Landing)