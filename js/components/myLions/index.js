
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ActivityIndicator } from 'react-native'
import { isFirstLogIn } from '../utility/asyncStorageServices'
import { drillDown } from '../../actions/content'
import { Container, Content, Text, Icon } from 'native-base'
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
import { replaceRoute } from '../../actions/route'
import styleVar from '../../themes/variable'
import { Modal } from 'react-native'
import Swiper from 'react-native-swiper'
import LinearGradient from 'react-native-linear-gradient'
import IosUtilityHeaderBackground from '../utility/iosUtilityHeaderBackground'
import Data from '../../../contents/my-lions/onboarding/data'
import { getGoodFormFavoritePlayerList, removeGoodFormFavoritePlayerList } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import loader from '../../themes/loader-position'
import SquadModal from '../global/squadModal'

class MyLions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            modalInfoVisible: false,
            swiperWindow: styleVar.deviceHeight,
            currentPage: 0,
            isLoaded:true
        }
        this.totalPages = 3
        this.pageWindow=[]
        this.isUnMounted = false
    }

    _showList(item, route) {
        this.props.drillDown(item, route)
    }

    _myLions(){
        this._showList({}, 'myLionsFavoriteList')
    }

    _mySquad(){
        this._setModalVisible(false)
        this.props.drillDown({}, 'myLionsSquad')
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
                isFirst = isFirst === 'yes'? true : false
                // isFirst = true
                this.setState({ modalVisible: isFirst })
            }).catch((error) => {})
        }
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                        <LionsHeader title='MY LIONS' />
                        <Content >
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
                                        MY SQUAD
                                    </Text>
                                </ButtonFeedback>
                                <ButtonFeedback rounded style={[styles.button,styles.btnExpert]} onPress={this._myExpertsPick}>
                                    <Icon name='md-list-box' style={styles.btnExpertIcon} />
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.btnExpertLabel}>
                                        THE EXPERTS' SQUADS
                                    </Text>
                                </ButtonFeedback>
                                <ButtonFeedback rounded style={[styles.button,styles.btnFavourites]} onPress={() => this._myLions()}>
                                    <Icon name='md-star' style={styles.btnFavouritesIcon} />
                                    <Text style={styles.btnFavouritesLabel}>
                                        FAVOURITES
                                    </Text>
                                </ButtonFeedback>

                                <ButtonFeedback rounded style={[styles.button,styles.btnFavourites, styles.btnInformation]} onPress={() => this._openInformation()}>
                                    <Icon name='ios-information-circle-outline' style={styles.btnFavouritesIcon} />
                                    <Text style={styles.btnFavouritesLabel}>
                                        INFORMATION
                                    </Text>
                                </ButtonFeedback>
                            </View>
                            <LionsFooter isLoaded={true} />
                        </Content>
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire onFinish={this._renderLogic.bind(this)}/>
                    <Modal
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={()=>this._setModalVisible(false)}>
                        <LinearGradient colors={['#AF001E', '#81071C']} style={styles.onboarding}>
                            <IosUtilityHeaderBackground />

                            <ScrollView style={styles.onboardingContent}>
                                <Text style={styles.onboardingTitle}> WELCOME TO MY LIONS</Text>
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
                                                                <Text key={i} style={styles.onboardingPageText}>{desc}</Text>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        (index===this.totalPages-1)&&<ButtonFeedback rounded label='BUILD MY SQUAD' onPress={() => this._mySquad()} style={[styles.button, styles.btnonBoardSquard]}  />
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
                                <Text style={styles.modalText}>A score out of 500 based on your selected players, cohesion rating, individual player performances over the last two years, and their most recent five games.</Text>
                                <Text style={styles.modalTitleText}>Cohesion</Text>
                                <Text style={styles.modalText}>A rating out of 100 where 0 means that your squad has played no games together and 100 means that your squad has played all their games together over the last two years.</Text>
                                <Text style={styles.modalTitleText}>Attack / Defence</Text>
                                <Text style={styles.modalText}>Assessment of the balance of the attacking and defensive capabilities of your squad.</Text>
                            </ScrollView>
                    </SquadModal>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect((state) => {
    return {
        isAccessGranted: state.token.isAccessGranted
    }
},  bindAction)(MyLions)