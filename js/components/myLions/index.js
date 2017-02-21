'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ActivityIndicator } from 'react-native'
import { isFirstLogIn, getUserId } from '../utility/asyncStorageServices'
import { drillDown } from '../../actions/content'
import { Container, Text, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LoginRequire from '../global/loginRequire'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import { pushNewRoute } from '../../actions/route'
import styleVar from '../../themes/variable'
import { Modal } from 'react-native'
import Swiper from 'react-native-swiper'
import LinearGradient from 'react-native-linear-gradient'
import IosUtilityHeaderBackground from '../utility/iosUtilityHeaderBackground'
import Data from '../../../contents/my-lions/onboarding/data'
import { getGoodFormFavoritePlayerList, removeGoodFormFavoritePlayerList } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import loader from '../../themes/loader-position'
import SquadModal from '../global/squadModal'
import CreateGroupModal from './createGroup'
import JoinGroupModal from  './joinGroup'
import { service } from '../utility/services'
import { strToUpper } from '../utility/helper'

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
        }
        this.totalPages = 3
        this.pageWindow=[]
        this.isUnMounted = false
        this._scrollView = ScrollView
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
    _myExpertsPick = () => {
        this.props.drillDown({}, 'myLionsExpertsList')
    }

    prev(){
        this.setState({
            swiperWindow: this.pageWindow.find((element)=>element.index===this.state.currentPage-1).size,
            currentPage:this.state.currentPage-1
        },()=>{
            this.refs['swiper'].scrollBy(-1,true)
        })
    }

    next(){
        this.setState({
            swiperWindow:this.pageWindow.find((element)=>element.index===this.state.currentPage+1).size,
            currentPage:this.state.currentPage+1
        },()=>{
            this.refs['swiper'].scrollBy(1,true)
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
        // console.log('measurePage')
        if(this.pageWindow.length===this.totalPages) return
        const { x, width, height, } = event.nativeEvent.layout
        let i=this.pageWindow.findIndex((value)=>value.index===page)
        // console.log('page',page)
        // console.log('i',i)
        if (i>-1) {
            this.pageWindow[i].size=height+70
        }
        else {
            this.pageWindow.push({index:page,size:height + 70})
        }
        if(page===this.state.currentPage) {
           this.setState({
                swiperWindow: height + 70
            })
        }
        // console.log('this.pageWindow',this.pageWindow)

    }

    scrollEnd(e, state, context){
        // console.log('scrollEnd')
       
            this.setState({
                currentPage:state.index,
                swiperWindow:this.pageWindow.find((element)=>element.index===state.index).size
            })
        
    }

    _updateFavPlayers() {
        removeGoodFormFavoritePlayerList() 
        getGoodFormFavoritePlayerList()
    }

    _openInformation() {
        this.setState({
            modalInfoVisible: true
        })
    }

    _renderLogic(isLogin) {
        if (isLogin) { // user is logged in
            this._updateFavPlayers()

            // check if user is first login
            isFirstLogIn().then((isFirst) => {
                // when first login, it will show the onboarding
                // isFirst = isFirst === 'yes'? true : false
                isFirst = true
                // this.setState({ modalVisible: isFirst },()=>{this.getRating()})
                if (isFirst) this.getRating()
            }).catch((error) => {})
        }
    }
    getRating(){
        let optionsSquadRating = {
            url: 'https://api.myjson.com/bins/16284p',
            data: {id:this.state.userID},
            onAxiosStart: null,
            onAxiosEnd: null,
            method: 'get',
            onSuccess: (res) => {
                if(res.data) {                    
                        Data.splice(0,Data[0]&&Data[0].id==='0'?1:0,{
                            "id": "0",
                            "highLight":3,
                            "description": [
                            "WELL DONE!",
                            `you picked ${res.data.percentage} players from the official British & Irish Lions 2017 Squad.`,
                            "you have earned the rank of:",
                            strToUpper(res.data.title),
                            "With the announcement of the official squad, we'ave updated My Lions with some exciting new gameplay features.",
                            "Click next to discover what's new in this version."
                            ]
                        })
                        this.totalPages=Data.length
                }
                this.setState({modalVisible:true})
            },
            onError: ()=>{
                this.setState({modalVisible:true})
            },
            onAuthorization: () => {
                    this._signInRequired()
            },
            isRequiredToken: true
        }
        service(optionsSquadRating)        
    }

    componentWillMount() {
        getUserId().then((userID) => {
            this.setState({userID})
        }).catch((error) => {})
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    render() {

        return (
            <Container theme={theme}>
                <View style={styles.container}>
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
                                <ButtonFeedback rounded style={[styles.button, styles.btnMysquad]} onPress={() => this._mySquad()}>
                                    <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                        style={styles.btnMysquadIcon}>
                                    </Image>
                                    <Text style={styles.btnMysquadLabel}>
                                        OFFICIAL SQUAD
                                    </Text>
                                </ButtonFeedback>
                                <ButtonFeedback rounded style={[styles.button,styles.btnExpert]} onPress={() => this.props.pushNewRoute('myLionsCompetitionCentre')}>
                                    <Icon name='md-analytics' style={styles.btnFavouritesIcon} />
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.btnExpertLabel} >
                                        COMPETITION CENTRE
                                    </Text>
                                </ButtonFeedback>
                                <ButtonFeedback rounded style={[styles.button,styles.btnFavourites]} onPress={() => this.props.pushNewRoute('competitionLadder')} >
                                    <Icon name='md-star' style={styles.btnFavouritesIcon} />
                                    <Text style={styles.btnFavouritesLabel}>
                                        COMPETITION LADDER
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
                                    >
                                    {
                                        Data.map((item,index)=>{
                                            return(
                                                <View  key={index} style={[styles.onboardingPage, (!this.state.isLoaded||this.state.currentPage!==index)&&{opacity:0}]} onLayout={this.measurePage.bind(this,index)}>
                                                    {
                                                        item.description.map((desc,i)=>{
                                                            return(
                                                                <Text key={i} style={(i===0||item.highLight&&item.highLight===i)?styles.onboardingTitle:styles.onboardingPageText}>{desc}</Text>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        (index===this.totalPages-1)&&<ButtonFeedback rounded label='COMPETITION CENTRE' onPress={() => this.props.pushNewRoute('myLionsCompetitionCentre')} style={[styles.button, styles.btnonBoardSquard]}  />
                                                    }
                                                    <View style={styles.onboardingPageBtns}>
                                                        {
                                                            index===0?
                                                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='SKIP' style={styles.btnSkipLeft} />
                                                            :
                                                            <ButtonFeedback rounded onPress={()=>this.prev()} label='BACK' style={styles.btnBack} />
                                                        }
                                                        {
                                                            index===this.totalPages-1?
                                                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='SKIP' style={styles.btnSkipRight} />
                                                            :
                                                            <ButtonFeedback rounded onPress={()=>this.next()} label='NEXT' style={styles.btnNext}  />
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
                    <CreateGroupModal modalVisible = {this.state.modalCreateGroupVisible } callbackParent ={this._setModalCreateGroupVisible}/>
                    <JoinGroupModal modalVisible = {false} callbackParent ={this._setModalCreateGroupVisible}/>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect((state) => {
    return {
        isAccessGranted: state.token.isAccessGranted
    }
},  bindAction)(MyLions)