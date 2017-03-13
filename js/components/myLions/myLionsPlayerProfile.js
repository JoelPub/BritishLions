
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, Alert,  ScrollView, Modal, ActivityIndicator } from 'react-native'
import { Container, Thumbnail, Header, Title, Text, Button, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LoginRequire from '../global/loginRequire'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImageCircle from '../utility/imageCircle'
import ButtonFeedback from '../utility/buttonFeedback'
import { pushNewRoute, replaceRoute,popToRoute } from '../../actions/route'
import { setAccessGranted } from '../../actions/token'
import { removeToken } from '../utility/asyncStorageServices'
import { service } from '../utility/services'
import HTMLView from 'react-native-htmlview'
import htmlStyles from '../../themes/html-styles'
import styleVar from '../../themes/variable'
import SquadModal from '../global/squadModal'
import PlayerFigure from '../global/playerFigure'
import { getAssembledUrl } from '../utility/urlStorage'
import ProfileListModel from  'modes/Players'
import ProfileModel from 'modes/Players/Profile'
import FigureListModel from  'modes/Players/Profile/SeasonList/Season/FigureList'
import FigureModel from 'modes/Players/Profile/SeasonList/Season/FigureList/Figure'
import Immutable, { Map, List } from 'immutable'
import { strToUpper } from '../utility/helper'
import ImagePlaceholder from '../utility/imagePlaceholder'
import Swiper from 'react-native-swiper'
import TeamPlayerEditor from './components/teamPlayerEditor'

class MyLionsPlayerProfile extends Component {
    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.PlayersProfileUrl=getAssembledUrl('EYC3GetPlayersProfile')
        this.playerid = this.props.detail.id,
        this.playerName = this.props.detail.name,
        this.playerPos=null,
        this.seq=0,
        this.state = {
            modalVisible: false,
            isLoaded: false,
            profile: ProfileListModel.fromJS([new ProfileModel()]),
            modalContent:this.getModalContent(),
            removePlayer:false
        }
    }

    getModalContent(mode,title,subtitle,btn){
        switch(mode)  {
            case 'remove' :
                this.setState({removePlayer:false})
                return(
                    <View style={styles.modalViewWrapper}>
                        <Text style={styles.modalTitleTextCenter}>REMOVE PLAYER FROM YOUR SQUAD?</Text>
                        <View style={styles.modalBtnWrapper}>
                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='CANCEL' style={styles.modlaBtnConfirm} />
                            <ButtonFeedback rounded onPress={()=>this.setState({removePlayer:true})}  label='CONFIRM' style={[styles.modlaBtnConfirm,styles.btnConfirmGreen]}  />
                        </View>
                    </View>
                )
                break
            case 'message' :
                return(
                    <View style={styles.modalViewWrapper}>
                        <Text style={styles.modalBtnTitle}>{title}</Text>
                        <Text style={styles.modalTitleTextCenter}>{subtitle}</Text>
                        <ButtonFeedback rounded label={btn} onPress={()=>this.props.popToRoute('myLionsManageTeam')}  style={styles.modalConfirmBtn} />
                    </View>
                )
                break
            case 'info' :
                return (
                    <ScrollView style={styles.modalViewWrapper}>
                        <Text style={styles.modalTitleText}>Overall Rating</Text>
                        <Text style={styles.modalTextRN}>To provide an overall player rating EY took the results of more than 700 international and top tier club rugby games started by players in the 2015/2016 & 2016/2017 seasons. As new games are played, including the 2017 RBS 6 Nations Championship, a player’s performance will be updated.</Text>
                        <Text style={[styles.modalTextRN, styles.modalTextMTop]}>For each game there are over 150 features collected on player performance. Using advanced analytic techniques, EY identified the 30 most influential factors in a team winning a game. These factors are split into Defensive and Attacking attributes and weighted by position. i.e. a fullback doesn’t have influence in scrums being won or lost but does contribute to team metres gained.</Text>

                        <Text style={styles.modalTitleText}>Recent Performance</Text>
                        <Text style={styles.modalTextRN}>Recent Performance is a score out of 100 based on how a player has performed in their last five matches.</Text>

                        <Text style={styles.modalTitleText}>Attack</Text>
                        <Text style={styles.modalTextRN}>Metres – the average number of metres gained from overall games started in the last two seasons.</Text>
                        <Text style={styles.modalTextRN}>Lineouts won – the average number of lineouts won from overall games started in the last two seasons.</Text>
                        <Text style={styles.modalTextRN}>Scrums won – the average number of scrums won in overall games started in the last two seasons.</Text>
                        <Text style={styles.modalTextRN}>Clean breaks – the average number of clean breaks in overall games started in the last two seasons.</Text>
                        <Text style={styles.modalTextRN}>Offloads – the average number of offloads in overall games started in the last two seasons.</Text>
                        <Text style={styles.modalTextRN}>Tries – the average number of tries scored in overall games started in the last two seasons.</Text>

                        <Text style={styles.modalTitleText}>Defence</Text>
                        <Text style={styles.modalTextRN}>Tackles – The average number of successful tackles made in overall games started in the last two seasons.</Text>
                        <Text style={styles.modalTextRN}>Turnovers won – the average number of turnovers won in overall games started in the last two seasons.</Text>
                        <Text style={styles.modalTextRN}>Collection success – the average number of intercepts, catches and loose ball off ground in overall games started in the last two seasons.</Text>
                    </ScrollView>
                )
                break
            default:
                return (
                    <View>
                    </View>
                )
        }
    }

    _mapJSON(data, colMax = 2) {
        let i = 0
        let k = 0
        let newData = []
        let items = []
        let length = data.length

        for( i = 0; i <data.length; (i += colMax)) {
            for( k = 0; k < colMax; k++ ) {
                if(data[i + k]!==undefined)
                    items.push(data[i + k])
            }

            newData.push(items)
            items = []
        }
        return newData
    }

    _replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    _reLogin() {
        removeToken()
        this.props.setAccessGranted(false)
        removeUserCustomizedSquad()
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

    _myLions(route) {
        this.props.pushNewRoute(route)
    }

    isPlainObj (value) {
      return value && (value.constructor === Object || value.constructor === undefined)
    }

    componentDidMount() {
        console.log('!!!Details componentDidMount')
        this.getPlayerProfile()
    }

    _setModalVisible=(visible,mode,title,subtitle,btn) => {
        this.setState({
            modalVisible:visible,
            modalContent:visible?this.getModalContent(mode,title,subtitle,btn):this.getModalContent()
        })
    }

    getPlayerProfile() {
        let optionsPlayerProfile = {
            url: this.PlayersProfileUrl,
            data:{player_id:this.playerid},
            onAxiosStart: () => {},
            onAxiosEnd: () => {
                this.setState({ isLoaded:true })
            },
            onSuccess: (res) => {
                let profile = ProfileListModel.fromJS([new ProfileModel()])

                if (res.data instanceof Array  && res.data.length!==0) {
                    profile=ProfileListModel.fromJS(res.data)
                } else {
                    profile = profile.update(0,value=>{
                        return value=value.update('Attack',v=>{
                            return v=FigureListModel.fromJS([new FigureModel()])
                        })
                    })
                }

                this.setState({ profile, isLoaded: true })
            },
            onError: (res) => {
                this.setState({isLoaded:true }, () => {
                    this._showError(res)
                })
            },
            onAuthorization: () => {
                this.setState({isLoaded:true }, () => {
                    this._signInRequired()
                })
            },
            isRequiredToken: true,
            channel:'EYC3'
        }

        service(optionsPlayerProfile)
    }

    render() {

        let logo = ''
        let name = this.props.detail.name ? this.props.detail.name.toUpperCase() : ''
        if (this.props.detail) {
            logo = String(this.props.detail.logo)
        }
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
                                <Image resizeMode='cover' source={{uri:this.props.detail.image}} style={styles.playerPicImg}/>
                                <Image source={require('../../../images/redCircle.png')} style={styles.playerPicCover}/>
                            </View>

                            <View style={styles.headerPlayerDetails}>
                                <Text style={styles.headerPlayerName}>{name}</Text>
                                <Text style={styles.headerPlayerPosition}>{this.props.detail.position}</Text>
                            </View>
                            <TeamPlayerEditor playerid={this.playerid} _setModalVisible={this._setModalVisible.bind(this)} removePlayer={this.state.removePlayer} detail={this.props.detail}/>
                        </View>
                        <Grid style={styles.detailsGrid}>
                            <Col style={styles.detailsGridCol} size={1}>
                                <Image transparent
                                    resizeMode='contain'
                                    source={{uri:logo}}
                                    style={styles.detailsNationLogo} />
                            </Col>
                            <Col style={styles.detailsGridCol} size={2}>
                                <Text style={styles.detailsLabel}>COUNTRY</Text>
                                <Text style={styles.detail}>{this.props.detail.country} </Text>
                            </Col>
                        </Grid>
                        <View style={[styles.detailsGridCol, styles.detailsGridColFull, styles.detailsGridGreyBackground]}>
                            <Text style={styles.detailsLabel}>CLUB</Text>
                            <Text style={styles.detail}>{this.props.detail.club} </Text>
                        </View>
                        <Grid style={styles.detailsGrid}>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>D.O.B</Text>
                                <Text style={styles.detail}>{this.props.detail.dob} </Text>
                            </Col>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>HEIGHT</Text>
                                <Text style={styles.detail}>{this.props.detail.heightm} </Text>
                            </Col>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>WEIGHT</Text>
                                <Text style={styles.detail}>{this.props.detail.weightm} </Text>
                            </Col>
                        </Grid>
                        <Grid style={[styles.detailsGrid, styles.detailsGridColFull, styles.detailsGridGreyBackground]}>
                            <Col style={styles.detailsGridCol} size={1}>
                                <Text style={styles.detailsLabel}>BIRTHPLACE</Text>
                                <Text style={styles.detail}>{this.props.detail.birthplace} </Text>
                            </Col>
                            <Col style={styles.detailsGridCol} size={1}>
                                <Text style={styles.detailsLabel}>INTERNATIONAL CAPS</Text>
                                <Text style={styles.detail}>{this.props.detail.honours} </Text>
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
                        <PlayerFigure profile={this.state.profile} isLoaded={this.state.isLoaded} pressInfo={this._setModalVisible.bind(this)}/>
                        <LionsFooter isLoaded={true} />
                    </ScrollView>
                    < EYSFooter mySquadBtn={true} />
                    <LoginRequire/>
                    <SquadModal
                        modalVisible={this.state.modalVisible}
                        callbackParent={this._setModalVisible}>
                            {this.state.modalContent}
                    </SquadModal>
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
        popToRoute: (route)=>dispatch(popToRoute(route))
    }
}

export default connect((state) => {
    return {
        detail: state.content.drillDownItem,
        isAccessGranted: state.token.isAccessGranted,
    }
}, bindAction)(MyLionsPlayerProfile)
