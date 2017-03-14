
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, Alert,  ScrollView, Modal, ActivityIndicator } from 'react-native'
import { Container, Thumbnail, Header, Title, Text, Button, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../../../themes/base-theme'
import styles from './styles'
import shapes from '../../../themes/shapes'
import LoginRequire from '../../global/loginRequire'
import LionsHeader from '../../global/lionsHeader'
import EYSFooter from '../../global/eySponsoredFooter'
import LionsFooter from '../../global/lionsFooter'
import ImageCircle from '../../utility/imageCircle'
import ButtonFeedback from '../../utility/buttonFeedback'
import { pushNewRoute, replaceRoute } from '../../../actions/route'
import { setAccessGranted } from '../../../actions/token'
import { removeToken } from '../../utility/asyncStorageServices'
import { service } from '../../utility/services'
import HTMLView from 'react-native-htmlview'
import htmlStyles from '../../../themes/html-styles'
import styleVar from '../../../themes/variable'
import { getGoodFormFavoritePlayerList, removeGoodFormFavoritePlayerList } from '../../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import SquadModal from '../../global/squadModal'
import PlayerFigure from '../../global/playerFigure'
import { getUserCustomizedSquad, removeUserCustomizedSquad } from '../../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import { getAssembledUrl } from '../../utility/urlStorage'
import { setPositionToAdd , setPositionToRemove} from '../../../actions/position'
import ProfileListModel from  '../../../modes/Players'
import ProfileModel from '../../../modes/Players/Profile'
import FigureListModel from  '../../../modes/Players/Profile/SeasonList/Season/FigureList'
import FigureModel from '../../../modes/Players/Profile/SeasonList/Season/FigureList/Figure'
import SquadModel from  '../../../modes/Squad'
import SquadShowModel from  '../../../modes/Squad/SquadShowModel'
import Immutable, { Map, List } from 'immutable'
import { strToUpper } from '../../utility/helper'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import Swiper from 'react-native-swiper'
import SquadList from '../../global/squadList'
import { setSquadToShow,setSquadData } from '../../../actions/squad'
import {removePlayer,addPlayer,replacePlayer,checkFullSquad} from '../../global/squadToShow'


class MyLionsCoachProfile extends Component {
    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.playerid = this.props.detail.id,
        this.playerName = this.props.detail.name,
        this.playerPos=null,
        this.seq=0
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

    _showError(error) {
         if(error !== ''){
            Alert.alert(
                'An error occured',
                error,
                [{text: 'Dismiss'}]
            )
        }
    }

    render() {
        let name = this.props.detail.name ? this.props.detail.name.toUpperCase() : ''
         return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        back={true} 
                        title='MY LIONS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />

                    <ScrollView bounces={false} ref={(scrollView) => { this._scrollView = scrollView }}>
                        <View style={styles.header}>
                            <View style={styles.playerPic}>
                                <Image resizeMode='cover' source={this.props.detail.image} style={styles.playerPicImg}/>
                                <Image source={require('../../../../images/redCircle.png')} style={styles.playerPicCover}/>
                            </View>
                            
                            <View style={styles.headerPlayerDetails}>
                                <Text style={styles.headerPlayerName}>{name}</Text>
                                <Text style={styles.headerPlayerPosition}>{this.props.detail.position}</Text>
                            </View>
                        </View>
                        <Grid style={styles.detailsGrid}>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>D.O.B</Text>
                                <Text style={styles.detail}>{this.props.detail.dob} </Text>
                            </Col>
                            <Col style={styles.detailsGridCol} size={1}>
                                <Text style={styles.detailsLabel}>BIRTHPLACE</Text>
                                <Text style={styles.detail}>{this.props.detail.birthplace} </Text>
                            </Col>
                        </Grid>
                        <Grid style={[styles.detailsGrid, styles.detailsGridColFull]}>
                            <Col style={[styles.detailsGridGreyBackground, styles.detailsGridCol]} size={1}>
                                <Text style={styles.detailsLabel}>UNION</Text>
                                <Text style={styles.detail}>{this.props.detail.education} </Text>
                            </Col>
                            <Col style={styles.detailsGridCol} size={1}>
                                <Text style={styles.detail}>{this.props.detail.biog} </Text>
                            </Col>
                        </Grid>
                        {/*
                            this.props.detail.biog?
                                <View style={styles.playerDesc}>
                                    <HTMLView
                                       value={this.props.detail.biog}
                                       stylesheet={htmlStyles}
                                     />
                                </View>
                            :
                                null

                        */}
                        <LionsFooter isLoaded={true} />
                    </ScrollView>
                    < EYSFooter mySquadBtn={true} />
                    <LoginRequire/>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted)),
        setPositionToAdd:(position)=>dispatch(setPositionToAdd(position)),
        setPositionToRemove:(position)=>dispatch(setPositionToRemove(position)),
        setSquadToShow:(squad)=>dispatch(setSquadToShow(squad)),
        setSquadData:(squad)=>dispatch(setSquadData(squad)),
    }
}

export default connect((state) => {
    return {
        detail: state.content.drillDownItem,
        isAccessGranted: state.token.isAccessGranted,
        positionToAdd: state.position.positionToAdd,
        positionToRemove: state.position.positionToRemove,
        squadToShow: state.squad.squadToShow,
        squadData: state.squad.squadData,
    }
}, bindAction)(MyLionsCoachProfile)
