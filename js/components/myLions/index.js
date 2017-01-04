
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
import { replaceRoute } from '../../actions/route'
import styleVar from '../../themes/variable'
import { Modal } from 'react-native'
import Swiper from 'react-native-swiper'
import LinearGradient from 'react-native-linear-gradient'
import Data from '../../../contents/my-lions/onboarding/data'

class MyLions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: true,
            swiperWindow: styleVar.deviceWidth,
            currentPage:0,
            onScroll:false,
        }
        this.totalPages = 4 
        this.pageWindow=[]
    }

    _showList(item, route) {
        this.props.drillDown(item, route)
    }

    _myLions(){
        this._showList({}, 'myLionsUnionsList')
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
            swiperWindow:this.pageWindow.find((element)=>element.index===this.state.currentPage-1).size,
            currentPage:this.state.currentPage-1,
            onScroll:true
        },()=>{
            this.refs['swiper'].scrollBy(-1,true)
            setTimeout(()=>this.setState({onScroll:false}),200)
        })
    }
    next(){
        this.setState({
            swiperWindow:this.pageWindow.find((element)=>element.index===this.state.currentPage+1).size,
            currentPage:this.state.currentPage+1,
            onScroll:true
        },()=>{
            this.refs['swiper'].scrollBy(1,true)
            setTimeout(()=>this.setState({onScroll:false}),200)
        })
        
    }
    _setModalVisible=(visible) => {
        this.setState({
            modalVisible:visible,
        })
    }
    measurePage(page,event) {
       const { x, width, height, } = event.nativeEvent.layout
        this.pageWindow.push({index:page,size:height+150})
        if(page===this.state.currentPage) {
           this.setState({
                swiperWindow:height+150
            })
        }
        
    }

    touchStart(e, state, context){
        this.setState({
            onScroll:true
        })
    }

    touchEnd(e, state, context){
        setTimeout(()=>this.setState({onScroll:false}),1000)
    }

    scrollEnd(e, state, context){
        this.setState({
            currentPage:state.index,
            swiperWindow:this.pageWindow.find((element)=>element.index===state.index).size,
            onScroll:false
        })
    }
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                        <LionsHeader title='MY LIONS' />
                        <Content >
                            <ImagePlaceholder height={styleVar.deviceWidth} width={styleVar.deviceWidth}>
                                <Image resizeMode='stretch'
                                source={require('../../../images/content/mylionsBanner.png')} style={styles.mylionsBanner}>
                                </Image>
                            </ImagePlaceholder>
                            <ButtonFeedback rounded style={[styles.button,styles.btnMysquad]} onPress={() => this._mySquad()}>
                                <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')} 
                                    style={styles.btnMysquadIcon}>
                                </Image>
                                <Text 
                                style={styles.btnMysquadLabel}>
                                MY SQUAD
                                </Text>
                            </ButtonFeedback>                            
                            <ButtonFeedback rounded style={[styles.button,styles.btnExpert]}
                                            onPress={this._myExpertsPick}
                            >
                                <Icon name='md-contact' style={styles.btnExpertIcon} />
                                <Text
                                style={styles.btnExpertLabel}>
                                THE EXPERTS' SQUADS
                                </Text>
                            </ButtonFeedback>
                            <ButtonFeedback rounded style={[styles.button,styles.btnFavourites]} 
                            onPress={() => this._myLions()} >
                                <Icon name='md-star' style={styles.btnFavouritesIcon} />
                                <Text
                                style={styles.btnFavouritesLabel}>
                                FAVOURITES
                                </Text>
                            </ButtonFeedback>                             
                            <LionsFooter isLoaded={true} />
                        </Content>
                    < EYSFooter />
                    <Modal
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={()=>this._setModalVisible(false)}>
                        <LinearGradient colors={['#AF001E', '#81071C']} style={styles.onboarding}>
                            <ButtonFeedback onPress={()=>this._setModalVisible(false)} 
                            style={styles.btnClose}>
                                <Icon name='md-close' style={styles.btnCloseIcon}/>
                            </ButtonFeedback>
                            <View style={styles.onboardingContent}>
                                    <Text style={styles.onboardingTitle}> WELCOME TO MY LIONS</Text>
                                    <Swiper
                                        ref='swiper'
                                        height={this.state.swiperWindow}
                                        loop={false}
                                        dotColor='rgba(255,255,255,0.3)'
                                        activeDotColor='rgb(239,239,244)'
                                        onMomentumScrollEnd={this.scrollEnd.bind(this)}
                                        onTouchStart={this.touchStart.bind(this)}
                                        onTouchEnd={this.touchEnd.bind(this)}>
                                        {
                                            Data.map((item,index)=>{
                                                return(
                                                    <View key={index} style={styles.onboardingPage} onLayout={this.measurePage.bind(this,index)}>
                                                        {
                                                            item.description.map((desc,i)=>{
                                                                return(
                                                                    <Text key={i} style={styles.onboardingPageText}>{desc}</Text>
                                                                )
                                                            })
                                                        }
                                                        {
                                                            (index===Data.length-1)&&<ButtonFeedback rounded label='BUILD MY SQUAD' onPress={() => this._mySquad()} style={[styles.button,styles.btnonBoardSquard]}  />
                                                        }
                                                    </View>
                                                )
                                            },this)
                                        }
                                    </Swiper>
                                    {
                                    !this.state.onScroll&&<View>
                                        {
                                            this.state.currentPage===0?
                                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='SKIP' style={styles.btnSkipLeft} />
                                            :
                                            <ButtonFeedback rounded onPress={()=>this.prev()} label='BACK' style={styles.btnBack} />
                                        }
                                        {
                                            this.state.currentPage===this.totalPages-1?
                                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='SKIP' style={styles.btnSkipRight} />
                                            :
                                            <ButtonFeedback rounded onPress={()=>this.next()} label='NEXT' style={styles.btnNext}  />
                                        }
                                        </View>
                                    }
                                </View> 
                       </LinearGradient>
                    </Modal>
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
