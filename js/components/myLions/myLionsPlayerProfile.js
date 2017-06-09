
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
            profileHistorical: ProfileListModel.fromJS([new ProfileModel()]),
            profileOn_tour: ProfileListModel.fromJS([new ProfileModel()]),
            modalContent:this.getModalContent(),
            removePlayer:false,
            isOn_tour:true
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
                        <ButtonFeedback rounded label={btn} onPress={()=>this.props.popToRoute(this.props.viewDetailFrom)}  style={styles.modalConfirmBtn} />
                    </View>
                )
                break
            case 'info' :
                return (
                    <ScrollView style={styles.modalViewWrapper}>
                        <Text style={styles.modalTitleText}>ATTACK / DEFENCE / KICKING</Text>
                        <Text style={styles.modalTextRN}>Key statistics over the 2015/2016 and 2016/2017 seasons compared with average of all eligible players for their position.</Text>
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

//    _signInRequired() {
//        Alert.alert(
//            'Your session has expired',
//            'Please sign into your account.',
//            [{
//                text: 'SIGN IN',
//                onPress: this._reLogin.bind(this)
//            }]
//        )
//    }


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
        if (__DEV__)console.log('!!!Details componentDidMount')
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
            // url: this.PlayersProfileUrl,
            url: 'https://bilwebapp.azurewebsites.net/getTourPlayerProfile',
            data:{id:this.playerid},
            onAxiosStart: () => {},
            method: 'post',
            isQsStringify:false,
            onAxiosEnd: () => {
                this.setState({ isLoaded:true })
            },
            isRequiredToken: false,
            onSuccess: (res) => {
                if (__DEV__)console.log('profile res.data',res.data)
                if(__DEV__)console.log('什么鬼1')
                let profileListOn_tour = ProfileListModel.fromJS([new ProfileModel()])
                let profileListHistorical = ProfileListModel.fromJS([new ProfileModel()])
                //console.log('什么鬼2')

                if (res.data instanceof Array  && res.data.length!==0) {
                    if (__DEV__)console.log('valid')
                    profileListOn_tour=ProfileListModel.fromJS([res.data[0].on_tour])
                    profileListHistorical=ProfileListModel.fromJS([res.data[0].historical])
                }

                this.setState({
                    profileHistorical:profileListHistorical,
                    profileOn_tour:profileListOn_tour,
                    isLoaded: true
                })
            },
            onError: (res) => {
                let profile = ProfileListModel.fromJS([new ProfileModel()])
                // profile = profile.update(0,value=>{
                //     return value=value.update('Attack',v=>{
                //         return v=FigureListModel.fromJS([new FigureModel()])
                //     })
                // })

                this.setState({ profile, isLoaded: true })
            },
            onAuthorization: () => {
                //this.setState({isLoaded:true }, () => {
                    //this._signInRequired()
                //})
            },
            channel:'EYC3'
        }

        service(optionsPlayerProfile)
    }
     handleHtml = (html) => {
      let newHtml =  html.replace(/<\/p>\r\n/g, "</p>")
         return newHtml
     }
     onTiltleClick = (titleStatus) => {

        this.setState({
            isOn_tour: titleStatus
          })
     }
    render() {
        let logo = ''
        let name = this.props.detail.name ? this.props.detail.name.toUpperCase() : ''
        if (this.props.detail) {
            logo = String(this.props.detail.logo)
        }
        let figureData = this.state.isOn_tour ? this.state.profileOn_tour : this.state.profileHistorical
        if(__DEV__)console.log('*********************')
        if(__DEV__)console.log(JSON.stringify(figureData))
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
                            <TeamPlayerEditor playerid={this.playerid} _setModalVisible={this._setModalVisible.bind(this)} removePlayer={this.state.removePlayer} detail={this.props.detail} viewDetailFrom={this.props.viewDetailFrom}/>
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
                        <Grid style={styles.detailsGrid}>
                            <Col style={styles.detailsGridCol} >
                                <Text style={styles.detailsLabel}>BIRTHPLACE</Text>
                                <Text style={styles.detail}>{this.props.detail.birthplace} </Text>
                            </Col>
                            <Col style={styles.detailsGridCol} >
                                <Text style={styles.detailsLabel}>INTERNATIONAL CAPS</Text>
                                <Text style={styles.detail}>{this.props.detail.honours}</Text>
                            </Col>
                        </Grid>
                        {
                            this.props.detail.biog?
                                <View style={styles.playerDesc}>
                                    <HTMLView
                                       value={this.handleHtml(this.props.detail.biog)}
                                       stylesheet={htmlStyles}
                                     />
                                </View>
                            :
                                null

                        }
                        {this.state.isLoaded&&<PlayerFigure profile={figureData} pressInfo={this._setModalVisible.bind(this)} onTitleClick={this.onTiltleClick}/>}
                        <LionsFooter isLoaded={true} />
                    </ScrollView>
                    < EYSFooter mySquadBtn={true} />
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
        viewDetailFrom: state.position.viewDetailFrom,
    }
}, bindAction)(MyLionsPlayerProfile)
