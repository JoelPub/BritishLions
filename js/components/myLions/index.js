
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

class MyLions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: true,
            currentPage: 0,
        }
        this.allPage = 4  
    }

    _showList(item, route) {
        this.props.drillDown(item, route)
    }

    _myLions(){
        this._showList({}, 'myLionsFavoriteList')
    }

    prev(){
        this.refs['swiper'].scrollBy(-1,true)
        this.setState({
            currentPage: this.state.currentPage-1
        })
    }
    next(){
        this.refs['swiper'].scrollBy(1,true)
        this.setState({
            currentPage: this.state.currentPage+1
        })
    }
    _setModalVisible=(visible) => {
        this.setState({
            modalVisible:visible,
        })
    }
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                        <LionsHeader title='MY LIONS' />
                        <Content >
                            <ImagePlaceholder height={376}>
                                <Image resizeMode='cover'
                                source={require('../../../images/content/mylionsBanner.png')} style={styles.mylionsBanner}>
                                </Image>
                            </ImagePlaceholder>
                            <ButtonFeedback rounded style={[styles.button,styles.btnMysquad]}>
                                <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')} 
                                    style={styles.btnMysquadIcon}>
                                </Image>
                                <Text 
                                style={styles.btnMysquadLabel}>
                                MY SQUAD
                                </Text>
                            </ButtonFeedback>                            
                            <ButtonFeedback rounded style={[styles.button,styles.btnExpert]}>
                                <Icon name='md-contact' style={styles.btnExpertIcon} />
                                <Text
                                style={styles.btnExpertLabel}>
                                THE EXPERTS PICK
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
                        onRequestClose={()=>this._setModalVisible(false)}>
                        <LinearGradient colors={['#AF001E', '#81071C']} style={styles.onboarding}>
                            <ButtonFeedback onPress={()=>this._setModalVisible(false)} 
                            style={styles.btnClose}>
                                <Icon name='md-close' style={styles.btnCloseIcon}/>
                            </ButtonFeedback>
                            <Text style={styles.onboardingTitle}> WELCOME TO MY LIONS</Text>
                                <View >
                                    <Swiper
                                        ref='swiper'
                                        height={400}
                                        loop={false}
                                        dotColor='rgba(255,255,255,0.3)'
                                        activeDotColor='rgb(239,239,244)'
                                        onMomentumScrollEnd={(e, state, context) => this.setState({currentPage:state.index})}>
                                        <View style={styles.onboardingPage}>
                                            <Text style={styles.onboardingPageText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </Text>
                                            <Text style={styles.onboardingPageText}>Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </Text>
                                        </View>
                                        <View style={styles.onboardingPage}>
                                            <Text style={styles.onboardingPageText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </Text>
                                            <Text style={styles.onboardingPageText}>Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </Text>
                                        </View>
                                        <View style={styles.onboardingPage}>
                                            <Text style={styles.onboardingPageText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </Text>
                                            <Text style={styles.onboardingPageText}>Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </Text>
                                        </View>
                                        <View style={styles.onboardingPage}>
                                            <Text style={styles.onboardingPageText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </Text>
                                            <Text style={styles.onboardingPageText}>Nulla accumsan vehicula ex non commodo.</Text>
                                            <ButtonFeedback rounded label='BUILD MY SQUAD' style={[styles.button]}  />
                                        </View>
                                    </Swiper>
                                    {
                                        this.state.currentPage===0?
                                        <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='SKIP' style={styles.btnSkipLeft} />
                                        :
                                        <ButtonFeedback rounded onPress={()=>this.prev()} label='BACK' style={styles.btnBack} />
                                    }
                                    {
                                        this.state.currentPage===this.allPage-1?
                                        <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='SKIP' style={styles.btnSkipRight} />
                                        :
                                        <ButtonFeedback rounded onPress={()=>this.next()} label='NEXT' style={styles.btnNext}  />
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
