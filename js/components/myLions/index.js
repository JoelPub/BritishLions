'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ActivityIndicator, Modal, Alert,NativeModules } from 'react-native'
import { isFirstLogIn, getUserId,removeToken,getUserFullName } from '../utility/asyncStorageServices'
import { drillDown } from '../../actions/content'
import { Container, Text, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../themes/base-theme'
import styles from './styles'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import shapes from '../../themes/shapes'
import LoginRequire from '../global/loginRequire'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import { pushNewRoute, replaceRoute,replaceOrPushRoute } from '../../actions/route'
import Swiper from 'react-native-swiper'
import LinearGradient from 'react-native-linear-gradient'
import IosUtilityHeaderBackground from '../utility/iosUtilityHeaderBackground'
import Data from '../../../contents/my-lions/onboarding/data'
import { getSoticFullPlayerListR2} from '../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getUserCustomizedSquad, removeUserCustomizedSquad } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import { getGoodFormFavoritePlayerList, removeGoodFormFavoritePlayerList } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import loader from '../../themes/loader-position'
import SquadModal from '../global/squadModal'
import CreateGroupModal from './createGroup'
import JoinGroupModal from  './joinGroup'
import { service } from '../utility/services'
import { strToUpper,isEmptyObject } from '../utility/helper'
import { setUserProfile , setPrivateLeagues, setVisitedOnboarding} from '../../actions/squad'
import { actionsApi } from '../utility/urlStorage'
import { setAccessGranted } from '../../actions/token'
import {convertSquadToShow,checkFullSquad} from '../global/squadToShow'
import unionData from '../../../contents/unions/data'
import SquadModel from  'modes/Squad'

const locStyle = styleSheetCreate({
    button: {
        backgroundColor: styleVar.brandSecondary
    },
    buttonBlack: {
        backgroundColor: styleVar.colorText
    },
    buttonBig: {
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    buttonBigGradient: {
        height: 90,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        borderRadius: 45/2
    },
    buttonBigIcon: {
        width: 36,
        height: 54,
        backgroundColor: 'transparent'
    },
    buttonBigLabel: {
        backgroundColor: 'transparent',
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        marginTop: 14,
        marginLeft: 14,
        android: {
            marginTop: 3,
        }
    },
    logoIcon: {
        width: 21,
        height: 32,
        backgroundColor: 'transparent',
        marginTop: -5,
        android: {
            marginTop: 0
        }
    },
    btnPrivateLeagesLabel: {
        android: {
            marginTop: 5
        }
    }
})

class MyLions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            modalInfoVisible: false,
            modalCreateGroupVisible: false,
            swiperWindow: styleVar.deviceHeight,
            currentPage: 0,
            isLoaded:true,
            userID:'',
            isNetwork: true,
            btnDisable:false,
            totalPages:3,
            onBordingModalVisible:false,
        }
        this.pageWindow=[]
        this._scrollView = ScrollView
        this.Data=[]
    }

    _showList(item, route) {
        this.props.drillDown(item, route)
    }
    // R2
    _myLions(){
        this._showList({}, 'myLionsFavoriteList')
    }
    // R2
    _mySquad(){
        this._setModalVisible(false)
        this.props.drillDown({}, 'myLionsSquad')
    }
    // R2
    _myBrowse = () => {
        this.props.drillDown({}, 'myLionsUnionsList')
    }

    _officialSquad(){
        this._setModalVisible(false)
        NativeModules.One.sendInteraction("/myLions/mySquad",
          { userName : this.props.userProfile.userName });
        this.props.drillDown({},'myLionsOfficialSquad')
    }

    _myExpertsPick = () => {
        NativeModules.One.sendInteraction("/myLions/experts",
          { userName : this.props.userProfile.userName });
        this.props.drillDown({}, 'myLionsExpertsList')
    }

    _showError(error) {
        if(!this.state.isNetwork) return

       if(error === 'Please make sure that you\'re connected to the network.') {
           this.setState({
               isNetwork: false
           })
       }
        if(error !== ''){
            Alert.alert(
                'An error occured',
                error,
                [{text: 'Dismiss'}]
            )
        }
    }

    prev(){
        this.setState({btnDisable:true},()=>{
            this.setState({
                swiperWindow: this.pageWindow.find((element)=>element.index===this.state.currentPage-1).size,
                currentPage:this.state.currentPage-1
            },()=>{
                this.setState({currentPage:this.state.currentPage-1},()=>{this.refs['swiper'].scrollBy(-1,true)})
            })
        })

    }

    next(){
        this.setState({btnDisable:true},()=>{
            this.setState({
                swiperWindow:this.pageWindow.find((element)=>element.index===this.state.currentPage+1).size,
                currentPage:this.state.currentPage+1
            },()=>{
                this.setState({currentPage:this.state.currentPage+1},()=>{this.refs['swiper'].scrollBy(1,true)})
            })
        })

    }

    _setModalVisible=(visible) => {
        this.setState({
            modalVisible: visible,
            modalInfoVisible: visible
        })
    }

    _setModalCreateGroupVisible = () => {
        let visible  = !this.state.modalCreateGroupVisible
        this.setState({
            modalVisible: visible,
            modalCreateGroupVisible: visible
        })
    }

    measurePage(page,event) {
        if (__DEV__)console.log('measurePage')
        if(this.pageWindow.length===this.state.totalPages) return
        const { x, y,width, height, } = event.nativeEvent.layout
        let i=this.pageWindow.findIndex((value)=>value.index===page)
        if (__DEV__)console.log('page',page)
        if (__DEV__)console.log('i',i)
        if (i>-1) {
            this.pageWindow[i].size=y+120
        }
        else {
            this.pageWindow.push({index:page,size:y+120})
        }
        if(page===this.state.currentPage) {
           this.setState({
                swiperWindow: y+120
            })
        }
        if (__DEV__)console.log('this.pageWindow',this.pageWindow)
    }

    scrollEnd(e, state, context){
        // if (__DEV__)console.log('scrollEnd')

            this.setState({
                currentPage:state.index,
                swiperWindow:this.pageWindow.find((element)=>element.index===state.index).size
            },()=>{
                setTimeout(()=>this.setState({btnDisable:false}),100)
            })
    }

    // _updateFavPlayers() {
    //     removeGoodFormFavoritePlayerList()
    //     getGoodFormFavoritePlayerList()
    // }

    _openInformation() {
        this.setState({
            modalInfoVisible: true
        })
    }
    componentDidMount() {
        // if (__DEV__)console.log('onBordingModalVisible true')
        this.setState({onBordingModalVisible:true},()=>{
            this.Data=[]
            Data.map((value,index)=>{
                this.Data.push(value)
            })
        })
        // removeUserCustomizedSquad()
    }

    _renderLogic(isLogin) {
        if (isLogin) { // user is logged in
            // this._updateFavPlayers()
            setTimeout(()=>{
                getUserId().then((userID) => {
                    this.setState({ userID },()=>{
                        getUserFullName().then((userName) => {
                            let firstName=''
                            let lastName=''
                            let initName = ''
                            if(typeof userName==='string') {
                                let u=userName.trim().replace(/\s+/g,' ')
                                // if (__DEV__)console.log('userName',userName)
                                firstName=u.split(' ')[0]||''
                                lastName=u.split(' ')[1]||''
                                initName = ''
                                u.split(' ').map((value, index)=>{
                                    initName = initName + value[0]
                                })
                                // if (__DEV__)console.log('firstName',firstName)
                                // if (__DEV__)console.log('lastName',lastName)
                                // if (__DEV__)console.log('initName',initName)
                            }

                            // check if user is first login
                            isFirstLogIn().then((isFirst) => {
                                // when first login, it will show the onboarding
                                isFirst = isFirst === 'yes'? true : false
                                // isFirst = true
                                let squadData={ "backs" : [],
                                                "wildcard" : "",
                                                "captain" : "",
                                                "forwards" : [],
                                                "kicker" : ""
                                                }
                                if(isFirst) {
                                    getUserCustomizedSquad().then((catchedSquad)=>{
                                        if(catchedSquad.error){
                                                this.getRating(isFirst,false,squadData,userName,firstName,lastName,initName)
                                        }else{
                                            getSoticFullPlayerListR2().then((catchedFullPlayerList) => {
                                                // if (__DEV__)console.log('catchedFullPlayerList',catchedFullPlayerList)
                                                if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                                                    // if (__DEV__)console.log('catchedSquad.data',catchedSquad.data)
                                                    let squadFeed=eval(`(${catchedSquad.data})`)
                                                    let showSquadFeed=convertSquadToShow(SquadModel.format(squadFeed),catchedFullPlayerList,false,unionData)
                                                    // if (__DEV__)console.log('squadFeed',squadFeed)
                                                    // if (__DEV__)console.log('showSquadFeed',showSquadFeed)
                                                    let fullFeed=checkFullSquad(showSquadFeed.toJS())
                                                    // if (__DEV__)console.log('fullFeed',fullFeed)
                                                    for( let pos in squadData) {
                                                        // if (__DEV__)console.log('pos',pos)
                                                        if(squadFeed[pos==='wildcard'?'widecard':pos]) {
                                                            // if (__DEV__)console.log('squadFeed[pos]',squadFeed[pos])
                                                            squadData[pos]=(pos==='forwards'||pos==='backs')?squadFeed[pos]:squadFeed[pos==='wildcard'?'widecard':pos]
                                                            // if (__DEV__)console.log('squadData[pos]',squadData[pos])
                                                        }
                                                    }
                                                    // if (__DEV__)console.log('squadFeed',squadFeed)
                                                    this.getRating(isFirst,fullFeed,squadData,userName,firstName,lastName,initName)
                                                }
                                                else {
                                                    this.getRating(isFirst,false,squadData,userName,firstName,lastName,initName)
                                                }
                                            }).catch((error) => {
                                                this.getRating(isFirst,false,squadData,userName,firstName,lastName,initName)
                                            })
                                        }
                                    })
                                }
                                else {
                                    this.getRating(isFirst,false,squadData,userName,firstName,lastName,initName)
                                }
                            }).catch((error) => {this.getRating(false,false,squadData,userName,firstName,lastName,initName)})
                        }).catch((error) => {this.setState({onBordingModalVisible:false},()=>this._signInRequired())})
                    })
                }).catch((error) => {this.setState({onBordingModalVisible:false},()=>this._signInRequired())})

            },2000)
        }
        else {
            this.setState({onBordingModalVisible:false},()=>this._signInRequired())
        }
    }

    getRating(isFirst,fullFeed,squadData,userName,firstName,lastName,initName){
        // if (__DEV__)console.log('getRating',squadData)
        let optionsSquadRating = {
            url: actionsApi.eyc3GetOnBoardingInfo,
            data: Object.assign(squadData,{id:this.state.userID,first_name:firstName,last_name:lastName,userName:userName}),
            onAxiosStart: null,
            onAxiosEnd: null,
            method: 'post',
            onSuccess: (res) => {
                // if (__DEV__)console.log('res',r es)
                // if (__DEV__)console.log('this.props.visitedOnboarding',this.props.visitedOnboarding)
                // if (__DEV__)console.log('this.state.userID',this.state.userID)
                this.setState({onBordingModalVisible:false})
                if(res.data&&isFirst&&!(this.props.visitedOnboarding.id!==undefined &&this.props.visitedOnboarding.id!==null && this.props.visitedOnboarding.id===this.state.userID)) {
                        if (fullFeed) {
                            this.Data.splice(0,Data[0]&&Data[0].id==='0'?1:0,{
                                "id": "0",
                                "highLight":3,
                                "description": [
                                "WELL DONE!",
                                `You picked ${res.data.percentage} players from the official British & Irish Lions 2017 Squad.`,
                                "You have earned the rank of:",
                                strToUpper(res.data.selectorRating),
                                "With the announcement of the official squad, we've updated My Lions with some exciting new gameplay features.",
                                "Click next to discover what's new in this version."
                                ]
                            })
                        }

                        this.setState({totalPages:this.Data.length,modalVisible:true},()=>this.props.setVisitedOnboarding({id:this.state.userID}))

                }
                this.getProfile(userName,firstName,lastName,initName)
            },
            onError: ()=>{
                this.setState({onBordingModalVisible:false})
                this.getProfile(userName,firstName,lastName,initName)
            },
            onAuthorization: () => {
                    this.setState({onBordingModalVisible:false})
                    this._signInRequired()
            },
            isRequiredToken: true,
            channel: 'EYC3',
            isQsStringify:false
        }
        service(optionsSquadRating)
    }

    getProfile(userName,firstName,lastName,initName){
        // if (__DEV__)console.log('getProfile')
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
                    // if (__DEV__)console.log('res.data',res.data)
                        let userProfile = Object.assign(res.data, {
                            userName: userName,
                            initName: initName,
                            firstName: firstName,
                            lastName: lastName,
                            userID: this.state.userID
                        })
                        this.props.setUserProfile(userProfile)
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
    privateLeagues(){
        NativeModules.One.sendInteraction("/myLions/privateLeagues",
          { userName : this.props.userProfile.userName });
        this.props.setPrivateLeagues(true)
        this.props.pushNewRoute('competitionLadder')
    }
    _onBordingModalVisible(visible) {
        this.setState({onBordingModalVisible:visible})
    }

    _replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    _reLogin() {
        removeToken()
        this.props.setAccessGranted(false)
        this._replaceRoute('login')
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
    navToRouterCenter = () =>  {
        NativeModules.One.sendInteraction("/myLions/myCompetitionCentre",
          { userName : this.props.userProfile.userName });
        this.props.pushNewRoute('myLionsCompetitionCentre')
    }
    navToRouterLadder = () =>  {
        NativeModules.One.sendInteraction("/myLions/myCompetitionLadder",
          { userName : this.props.userProfile.userName });
        this.props.pushNewRoute('competitionLadder')
    }

    navigateTo(route) {
        setTimeout(() => {
          this.props.replaceOrPushRoute(route)
        }, 400)
    }

    render() {

        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <Modal
                        visible={this.state.onBordingModalVisible}
                        transparent={true}
                        onRequestClose={()=>this._onBordingModalVisible(false)}>
                            <View style={styles.onBoardingModal}>
                                <ActivityIndicator style={loader.centered} size='small' />
                            </View>
                    </Modal>
                        <LionsHeader
                            title='MY LIONS'
                            contentLoaded={true}
                            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                        <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                            <ImagePlaceholder height={styleVar.deviceWidth} width={styleVar.deviceWidth}>
                                <Image resizeMode='cover'
                                source={require('../../../images/content/mylionsBanner.jpg')} style={styles.mylionsBanner}>
                                </Image>
                            </ImagePlaceholder>

                            <View style={styles.btnsLanding}>
                                <ButtonFeedback style={locStyle.buttonBig} onPress={() => this._officialSquad()}>
                                    <LinearGradient style={locStyle.buttonBigGradient} colors={['#af001e', '#820417']}>
                                        <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                            style={locStyle.buttonBigIcon}>
                                        </Image>
                                        <Text style={locStyle.buttonBigLabel}>
                                            2017 LIONS SQUAD
                                        </Text>
                                    </LinearGradient>
                                </ButtonFeedback>


                                <ButtonFeedback rounded style={[styles.button, styles.btnExpert, locStyle.button]} onPress={this.navToRouterCenter}>
                                    <Icon name='md-analytics' style={styles.btnFavouritesIcon} />
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.btnExpertLabel} >
                                        COMPETITION CENTRE
                                    </Text>
                                </ButtonFeedback>
                                <ButtonFeedback rounded style={[styles.button,styles.btnExpert, locStyle.button]} onPress={this.navToRouterLadder}>
                                    <Icon name='md-trophy' style={styles.btnFavouritesIcon} />
                                    <Text style={styles.btnFavouritesLabel}>
                                        LEADERBOARD
                                    </Text>
                                </ButtonFeedback>
                                <ButtonFeedback rounded style={[styles.button,styles.btnFavourites, locStyle.buttonBlack]} onPress={() => this.privateLeagues()} >
                                    <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                        style={locStyle.logoIcon}>
                                    </Image>
                                    <Text style={[styles.btnFavouritesLabel, locStyle.btnPrivateLeagesLabel]}>
                                        PRIVATE LEAGUES
                                    </Text>
                                </ButtonFeedback>
                              </View>

                              <View style={styles.btnsLanding}>

                                <ButtonFeedback style={locStyle.buttonBig} onPress={() => this.navigateTo('myLionsSquad')}>
                                    <LinearGradient style={locStyle.buttonBigGradient} colors={['#af001e', '#820417']}>
                                        <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                            style={locStyle.buttonBigIcon}>
                                        </Image>
                                        <Text style={locStyle.buttonBigLabel}>
                                            MY SQUAD
                                        </Text>
                                    </LinearGradient>
                                </ButtonFeedback>
                                <ButtonFeedback rounded style={[styles.button, styles.btnExpert, locStyle.button]} onPress={() => this.navigateTo('myLionsUnionsList')}>
                                    <Icon name='md-analytics' style={styles.btnFavouritesIcon} />
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.btnExpertLabel} >
                                        UNION LIST
                                    </Text>
                                </ButtonFeedback>
                                <ButtonFeedback rounded style={[styles.button,styles.btnExpert, locStyle.button]} onPress={() => this.navigateTo('myLionsExpertsList')}>
                                    <Icon name='md-trophy' style={styles.btnFavouritesIcon} />
                                    <Text style={styles.btnFavouritesLabel}>
                                        EXPERT LIST
                                    </Text>
                                </ButtonFeedback>
                                <ButtonFeedback rounded style={[styles.button,styles.btnFavourites, locStyle.buttonBlack]} onPress={() => this.navigateTo('myLionsFavoriteList')} >
                                    <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                        style={locStyle.logoIcon}>
                                    </Image>
                                    <Text style={[styles.btnFavouritesLabel, locStyle.btnPrivateLeagesLabel]}>
                                        FAVORITE LIST
                                    </Text>
                                </ButtonFeedback>
                            </View>
                            <LionsFooter isLoaded={true} />
                        </ScrollView>
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire onFinish={this._renderLogic.bind(this)}/>
                    <Modal
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={()=>this._setModalVisible(false)}>
                        <LinearGradient colors={['#AF001E', '#81071C']} style={styles.onboarding}>
                            <IosUtilityHeaderBackground />

                            <ScrollView style={styles.onboardingContent}>
                                <Swiper
                                    height={this.state.swiperWindow}
                                    ref='swiper'
                                    loop={false}
                                    dotColor={this.state.isLoaded?'rgba(255,255,255,0.3)':'transparent'}
                                    activeDotColor='rgb(239,239,244)'
                                    showsButton={this.state.isLoaded}
                                    onMomentumScrollEnd={this.scrollEnd.bind(this)}
                                    paginationStyle={{top:this.state.swiperWindow-50}}
                                    >
                                    {
                                        this.Data.map((item,index)=>{
                                            return(
                                                <View  key={index} style={[styles.onboardingPage, (!this.state.isLoaded||this.state.currentPage!==index)&&{opacity:0}]} >
                                                    {
                                                        item.description.map((desc,i)=>{
                                                            return(
                                                                <Text key={i} style={(i===0||item.highLight&&item.highLight===i)?styles.onboardingTitle:styles.onboardingPageText}>{desc}</Text>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        (index===this.state.totalPages-1)&&<ButtonFeedback rounded disabled={this.state.btnDisable} label='COMPETITION CENTRE' onPress={() => [this.props.pushNewRoute('myLionsCompetitionCentre'),this._setModalVisible(false)]} style={[styles.button, styles.btnonBoardSquard]}  />
                                                    }
                                                    <View style={styles.onboardingPageBtns} onLayout={this.measurePage.bind(this,index)}>
                                                        {
                                                            index===0?
                                                            <ButtonFeedback rounded disabled={this.state.btnDisable} onPress={()=>this._setModalVisible(false)} label='SKIP' style={styles.btnSkipLeft} />
                                                            :
                                                            <ButtonFeedback rounded disabled={this.state.btnDisable} onPress={()=>this.prev()} label='BACK' style={styles.btnBack} />
                                                        }
                                                        {
                                                            index===this.state.totalPages-1?
                                                            <ButtonFeedback rounded disabled={this.state.btnDisable} onPress={()=>this._setModalVisible(false)} label='SKIP' style={styles.btnSkipRight} />
                                                            :
                                                            <ButtonFeedback rounded disabled={this.state.btnDisable} onPress={()=>this.next()} label='NEXT' style={styles.btnNext}  />
                                                        }
                                                    </View>
                                                </View>
                                            )
                                        },this)
                                    }
                                </Swiper>
                            </ScrollView>

                            <ButtonFeedback
                                onPress={()=>this._setModalVisible(false)}
                                style={styles.btnClose}>
                                <Icon name='md-close' style={styles.btnCloseIcon}/>
                            </ButtonFeedback>
                       </LinearGradient>
                    </Modal>

                    <SquadModal
                        modalVisible={this.state.modalInfoVisible}
                        callbackParent={() => this._setModalVisible(false)}>
                            <ScrollView style={styles.modalViewWrapper}>
                                <Text style={styles.modalTitleText}>Overall Rating</Text>
                                <Text style={styles.modalText}>To provide an overall player rating EY have taken the results of more than 700 international and top tier club rugby games started by players in the 2015/16 & 2016/17 seasons. As new games are played, including the 2017 RBS 6 Nations Championship, a player’s rating will be updated based on their performance.</Text>

                                <Text style={[styles.modalText, styles.modalTextMTop]}>There are over 150 performance features collected and analysed per game. Using advanced analytical techniques, EY identified the 30 most influential factors in a team winning a game. These factors are split into Defensive and Attacking attributes and weighted by position. i.e. a fullback doesn’t have influence in scrums being won or lost but does contribute to team metres gained.</Text>

                                <Text style={styles.modalTitleText}>Recent Performance</Text>
                                <Text style={styles.modalText}>Recent Performance is a score out of 100 based on how a player has performed in their last five matches.</Text>


                                <Text style={styles.modalTitleText}>Squad Rating</Text>
                                <Text style={styles.modalText}>A score out of 500 based on your selected players cohesion rating and individual player performances over the last two years and their most recent five games. Your squad rating will take into account all the ratings of your selected players and allows you to choose which players’ ratings you want to boost by nominating a Captain, Kicker and a Star player i.e the player you nominate as your best performer.</Text>

                                <Text style={styles.modalTitleText}>Cohesion</Text>
                                <Text style={styles.modalText}>Rugby is a team sport, the more familiar your players are with each other the better they will perform in a game. EY has developed an algorithm to decide the cohesion of your squad based on international and top tier club rugby games in the last two years. A rating out of 100 where 100 means all of your squad have started at least one game with every other player in your squad. There is an assumption that professional players will gel together in training camp so a baseline score of 50 is given.</Text>

                                <Text style={styles.modalTitleText}>Attack and Defence</Text>
                                <Text style={styles.modalText}>Players are individually rated on their defensive and attacking abilities.</Text>
                            </ScrollView>
                    </SquadModal>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        setUserProfile:(profile)=>dispatch(setUserProfile(profile)),
        setPrivateLeagues:(privateLeagues)=>dispatch(setPrivateLeagues(privateLeagues)),
        setVisitedOnboarding:(visitedOnboarding)=>dispatch(setVisitedOnboarding(visitedOnboarding)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
    }
}

export default connect((state) => {
    return {
        isAccessGranted: state.token.isAccessGranted,
        userProfile: state.squad.userProfile,
        privateLeagues: state.squad.privateLeagues,
        visitedOnboarding: state.squad.visitedOnboarding,
        netWork: state.network
    }
},  bindAction)(MyLions)
