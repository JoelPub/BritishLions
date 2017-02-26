
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
import { pushNewRoute, replaceRoute } from '../../actions/route'
import { setAccessGranted } from '../../actions/token'
import { removeToken } from '../utility/asyncStorageServices'
import { service } from '../utility/services'
import HTMLView from 'react-native-htmlview'
import htmlStyles from '../../themes/html-styles'
import styleVar from '../../themes/variable'
import { getGoodFormFavoritePlayerList, removeGoodFormFavoritePlayerList } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import SquadModal from '../global/squadModal'
import PlayerFigure from '../global/playerFigure'
import { getUserCustomizedSquad, removeUserCustomizedSquad } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import { getAssembledUrl } from '../utility/urlStorage'
import { setPositionToAdd , setPositionToRemove} from '../../actions/position'
import ProfileListModel from  'modes/Players'
import ProfileModel from 'modes/Players/Profile'
import FigureListModel from  'modes/Players/Profile/SeasonList/Season/FigureList'
import FigureModel from 'modes/Players/Profile/SeasonList/Season/FigureList/Figure'
import SquadModel from  'modes/Squad'
import SquadShowModel from  'modes/Squad/SquadShowModel'
import Immutable, { Map, List } from 'immutable'
import { strToUpper } from '../utility/helper'
import ImagePlaceholder from '../utility/imagePlaceholder'
import Swiper from 'react-native-swiper'
import SquadList from '../global/squadList'
import { setSquadToShow,setSquadData } from '../../actions/squad'
import {removePlayer,addPlayer,replacePlayer,checkFullSquad} from '../global/squadToShow'

const AddPlayerCell = ({pos,onPress})=>(
    <ButtonFeedback  onPress= {onPress}  style={styles.posBtn}>
        <View style={styles.posAddWrapper}>
            <Icon name='md-person-add' style={styles.addPlayerIcon} />
        </View>
        <View style={styles.playerNameTextWrapper}>
            <View style={[shapes.triangle]} />
            <View style={styles.titleBox}>
                <Text style={styles.playerNameText}>ADD</Text>
                <Text style={styles.playerNameText}>
                    { pos.toUpperCase() === 'WILDCARD'? 'STAR' : pos.toUpperCase() }
                </Text>
                </View>
        </View>
    </ButtonFeedback>
    )
const PlayerImgCell =({data,onPress}) =>(
    <ButtonFeedback onPress={onPress} style={styles.posBtn}>
        <ImagePlaceholder
            width = {styleVar.deviceWidth / 3}
            height = {styleVar.deviceWidth / 3}>
            <Image transparent
                resizeMode='contain'
                source={data.image}
                style={styles.playerImage} />
        </ImagePlaceholder>
        <View style={styles.playerNameTextWrapper}>
            <View style={[shapes.triangle]} />
            <View style={styles.titleBox}>
                <Text style={styles.playerNameText} numberOfLines={1}>{data.name&&data.name.toUpperCase().substring(0, data.name.lastIndexOf(" "))}</Text>
                <Text style={styles.playerNameText} numberOfLines={1}>{data.name&&data.name.toUpperCase().substring(data.name.lastIndexOf(" ")+1, data.name.length)}</Text>
            </View>
        </View>
    </ButtonFeedback>
    )
const PositionTitle =({pos,data}) =>(
    <View style={styles.posTitle}>
      <Text style={styles.posTitleLeft}>{pos.toUpperCase()}</Text>
      <Text style={styles.posTitleRight}>
       {data.filter((value)=>value!==null).length} / {data.length}
      </Text>
    </View>
)

const PositionButton=({position,posToAdd,onPress,subject,data,total})=>(
    <ButtonFeedback rounded onPress={onPress}  style={styles.modalBtnPosition}>
        <View style={[styles.modalBtnPositionLeft,posToAdd!==''&&posToAdd!==null&&posToAdd.toString().toUpperCase()!==position.toString().toUpperCase()&&{opacity:0.7}]}>
            <Text style={styles.modalBtnPosLeftText}>{subject.toUpperCase()}</Text>
        </View>
        <View style={styles.modalBtnPosRight}>
            <Text style={styles.modalBtnPosLeftText}>{data instanceof Array ? data.length : (data===''  ? 0: data.toString().split('|').length)}/{total}</Text>
        </View>
    </ButtonFeedback>
    )
class MyLionsPlayerProfile extends Component {
    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.isUnMounted = false
        this.saveSquadUrl=getAssembledUrl('SaveGoodFormUserCustomizedSquad')
        this.PlayersProfileUrl=getAssembledUrl('EYC3GetPlayersProfile')
        this.playerid = this.props.detail.id,
        this.playerName = this.props.detail.name,
        this.isShowAddBtn = this.props.isShowAddBtn,
        this.playerPos=null,
        this.seq=0,
        this.state = {
            modalVisible: false,
            inSquad: false,
            isLoaded: false,
            profile: ProfileListModel.fromJS([new ProfileModel()]),
            btnSubmit:'',
            modalContent:this.getModalContent(),
            squadDataFeed: SquadModel().toJS(),
            isMySquadPlayerUpdating: false,
            isMySquadPlayerSubmitting: false,
            fullSquad:true
        }
    }

    getModalContent(mode,title,subtitle,btn){
        switch(mode)  {
            case 'add' :

                return(
                    <View style={[styles.modalViewWrapper,styles.modalUpdateView]}>
                        <Text style={styles.modalTitleTextCenter}>SELECT A POSITION</Text>
                        <PositionButton position='captain' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','captain',1)} subject='CAPTAIN' data={this.state.squadDataFeed.captain} total='1'/>
                        <PositionButton position='kicker' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','kicker',1)} subject='KICKER' data={this.state.squadDataFeed.kicker} total='1'/>
                        <PositionButton position='wildcard' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','widecard',1)} subject='STAR' data={this.state.squadDataFeed.widecard} total='1'/>
                        <PositionButton position='forwards' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','forwards',16)} subject='FORWARD' data={this.state.squadDataFeed.forwards} total='16'/>
                        <PositionButton position='backs' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','backs',16)} subject='BACK' data={this.state.squadDataFeed.backs} total='16'/>
                    </View>
                )
                break
            case 'remove' :
                return(
                    <View style={styles.modalViewWrapper}>
                        <Text style={styles.modalTitleTextCenter}>REMOVE PLAYER FROM YOUR SQUAD?</Text>
                        <View style={styles.modalBtnWrapper}>
                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='CANCEL' style={styles.modlaBtnConfirm} />
                            <ButtonFeedback rounded onPress={()=>this._updateSquad('remove')}  label='CONFIRM' style={[styles.modlaBtnConfirm,styles.btnConfirmGreen]}  />
                        </View>
                    </View>
                )
                break
            case 'replace' :
                return(
                    <View style={styles.modalViewWrapper}>
                        <Text style={styles.modalTitleTextCenter}>{title}</Text>
                        <Text style={[styles.modalTextCenter, styles.modalTextCenterUppCase]}>{subtitle}</Text>
                        <View style={styles.modalBtnWrapper}>
                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='CANCEL' style={[styles.modlaBtnConfirm,styles.btnCancelBlack]} />
                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(true,'squad','REPLACE PLAYER')}  label='PROCEED' style={styles.modlaBtnConfirm}  />
                        </View>
                    </View>
                )
                break
            case 'squad' :
                return(
                    <ScrollView style={styles.modalSquadView}>
                        <Text style={[styles.modalTitleTextCenter, styles.modalTitleTextCenterReplacePlayer]}>{title}</Text>
                        <SquadList squadDatafeed={this.props.squadToShow} pressImg={this._replacePlayer.bind(this)} pressAdd={this._updateSquad.bind(this)}/>
                        <View style={styles.guther}>
                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='CANCEL' style={[styles.modalConfirmBtn, styles.modalConfirmBtnBlack]} />
                        </View>
                    </ScrollView>
                )
                break
            case 'confirm' :
                return(
                    <View style={styles.modalViewWrapper}>
                        <Text style={styles.modalTitleTextCenter}>{title}</Text>
                        <Text style={[styles.modalTextCenter, styles.modalTextCenterUppCase]}>{subtitle}</Text>
                        <View style={styles.modalBtnWrapper}>
                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='CANCEL' style={styles.modlaBtnConfirm} />
                            <ButtonFeedback rounded onPress={()=>this._updateSquad('replace',this.playerPos,0,this.seq)}  label='CONFIRM' style={[styles.modlaBtnConfirm,styles.btnConfirmGreen]}  />
                        </View>
                    </View>
                    )
                break
            case 'message' :
                title = title === 'WIDECARD'? 'STAR' : title

                return(
                    <View style={styles.modalViewWrapper}>
                        <Text style={styles.modalBtnTitle}>{title}</Text>
                        <Text style={styles.modalTitleTextCenter}>{subtitle}</Text>
                        <ButtonFeedback rounded label={btn} onPress={()=>this._setModalVisible(false)}  style={styles.modalConfirmBtn} />
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
        // console.log('!!!Details this.props.squadToShow',this.props.squadToShow)
        console.log('!!!Details componentDidMount')
        // Let's have a parallel request

        this._updateMySquadStatus()
        this.getPlayerProfile()
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    componentWillReceiveProps(nextProps,nextState) {
        console.log('!!!details componentWillReceiveProps')
        // console.log('!!!Details this.props.squadToShow',this.props.squadToShow)
        // console.log('!!!Details nextProps.squadToShow',nextProps.squadToShow)
    }

    _updateMySquadStatus() {
        // show loading in adding and removing button
        this.setState({isMySquadPlayerUpdating: true})

        getUserCustomizedSquad().then((catchedSquad)=>{
            if(catchedSquad.error){
                this.setState({ isMySquadPlayerUpdating: false }, () => {
                    this._showError(catchedSquad.error) // prompt error
                })
            }else{
                let squadFeed=SquadModel.format(eval(`(${catchedSquad.data})`))
                let inSquad = false
                if(Map.isMap(squadFeed)) squadFeed.forEach((value,index)=>{
                    if(List.isList(value)) {
                        if(value.indexOf(this.playerid)>-1) inSquad=true
                    }
                    else {
                        if(value===this.playerid) inSquad=true
                    }
                })
                this.setState({inSquad,squadDataFeed:squadFeed.toJS(), isMySquadPlayerUpdating: false})
            }
        })
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

    updateSquad(){
       if(this.isShowAddBtn){
            if(this.state.inSquad&&this.props.positionToRemove!=='') {
                this._setModalVisible(true,'remove')
            }
            else {
                this.fullSquad=checkFullSquad(this.props.squadToShow)
                console.log('this.fullSquad',this.fullSquad)
            }
       }
    }

    _updateSquad(type,position,max,seq){
        let update=true
        // getUserCustomizedSquad().then((catchedSquad)=>{
        //     if(catchedSquad.auth){
        //         if(catchedSquad.auth === 'Sign In is Required'){
        //             this.setState({ isMySquadPlayerSubmitting: false }, () => {
        //                 this._signInRequired.bind(this)
        //             })
        //         }
        //     }else if(catchedSquad.error){
        //         this.setState({ isMySquadPlayerSubmitting: false }, () => {
        //             this._showError(catchedSquad.error) // prompt error
        //         })
        //     }else{
                    // console.log('details this.props.squadData',this.props.squadData)
                    let tmpFeed=SquadModel.format(eval(`(${this.props.squadData})`))
                    let inSquad = false
                    if(Map.isMap(tmpFeed)) tmpFeed.forEach((value,index)=>{
                        if(List.isList(value)) {
                            if(value.indexOf(this.playerid)>-1){
                                inSquad=true
                                if (type==='remove'&&strToUpper(index)===strToUpper(this.props.positionToRemove)) {
                                    tmpFeed=tmpFeed.update(index,val=>{
                                        return value.splice(value.indexOf(this.playerid),1)
                                    })
                                    this.props.setSquadToShow(removePlayer(this.props.squadToShow,index,this.playerid))
                                }
                            }
                        }
                        else {
                            if(value===this.playerid) {
                                inSquad=true
                                if (type==='remove'&&strToUpper(index)===strToUpper(this.props.positionToRemove==='WILDCARD'?'WIDECARD':this.props.positionToRemove)) {
                                    console.log('!!!tmpFeed',tmpFeed.toJS())
                                    tmpFeed=tmpFeed.set(index,'')
                                    this.props.setSquadToShow(removePlayer(this.props.squadToShow,index))
                                }
                            }
                        }
                    })

                    if(type==='add') {
                        if(List.isList(tmpFeed.get(position))) {
                            if(tmpFeed.get(position).count()<max) {
                                tmpFeed=tmpFeed.set(position,tmpFeed.get(position).push(this.playerid))
                                this.props.setSquadToShow(addPlayer(this.props.squadToShow,position,this.props.detail,this.playerid))
                            }
                            else {
                                update=false
                                this.setState({ squadDataFeed:tmpFeed.toJS(), isMySquadPlayerSubmitting: false })
                            }
                        }
                        else{
                            if(tmpFeed.get(position).trim()==='') {
                                tmpFeed=tmpFeed.set(position,this.playerid)
                                this.props.setSquadToShow(addPlayer(this.props.squadToShow,position,this.props.detail))
                            }
                            else {
                                update=false
                                this.setState({ squadDataFeed:tmpFeed.toJS(), isMySquadPlayerSubmitting: false })
                                let star = ''
                                star = position ==='widecard'?'STAR':position.toUpperCase()
                             }
                        }

                    }
    }

    _updateSquadPlayer(squadData,position, type='') {
        this.setState({ isMySquadPlayerSubmitting: true, btnSubmit:'SQUAD' },()=>{
            this._setModalVisible(false)
        })
        squadData.forEach((value,index)=>{
            if(List.isList(value)) squadData=squadData.update(index,val=>{
                                                    return val.join('|')
                                                })
        })
        let options = {
            url: this.saveSquadUrl,
            data: squadData.toJS(),
            onAxiosStart: () => {},
            onAxiosEnd: () => {
                this.setState({ isMySquadPlayerSubmitting: false })
            },
            onSuccess: (res) => {
                let successDesc = this.state.inSquad&&this.props.positionToRemove!==''? 'PLAYER SUCCESSFULLY REMOVED' : 'SUCCESSFULLY ADDED'
                position = position?position.toUpperCase() : ''

                this.setState({ inSquad: !this.state.inSquad, squadDataFeed:squadData.toJS() }, () => {
                    this._setModalVisible(true, 'message', position, successDesc, 'OK')
                    //console.log('!!!squadData',squadData)
                    this.props.setSquadData(JSON.stringify(squadData))
                    removeUserCustomizedSquad()
                    this.props.setPositionToAdd('')
                    this.props.setPositionToRemove('')
                })
            },
            onError: (res) => {
                this.setState({ isMySquadPlayerSubmitting: false }, () => {
                    this._showError(res)
                })
            },
            onAuthorization: () => {
                this.setState({ isMySquadPlayerSubmitting: false }, () => {
                    this._signInRequired()
                })
            },
            isRequiredToken: true
        }

        service(options)
    }

    render() {
        let buttonText = ''

        if (this.state.isMySquadPlayerSubmitting && this.state.btnSubmit === 'SQUAD') {
            buttonText = this.state.inSquad === true&&this.props.positionToRemove!==''? 'REMOVING..':'UPDATING..'
        } else {
            buttonText = this.state.inSquad === true&&this.props.positionToRemove!==''? 'REMOVE':'ADD'
        }

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
                                <Image resizeMode='cover' source={this.props.detail.image} style={styles.playerPicImg}/>
                                <Image source={require('../../../images/redCircle.png')} style={styles.playerPicCover}/>
                            </View>

                            <View style={styles.headerPlayerDetails}>
                                <Text style={styles.headerPlayerName}>{name}</Text>
                                <Text style={styles.headerPlayerPosition}>{this.props.detail.position}</Text>
                            </View>

                            <View style={styles.buttons}>
                                {
                                    this.state.isMySquadPlayerUpdating?
                                        <ButtonFeedback
                                            disabled = {true}
                                            style={[styles.btn, styles.btnLeft, styles.btnRed ]}>
                                            <Text style={styles.btnText}>CHECKING..</Text>
                                        </ButtonFeedback>
                                    :
                                        <ButtonFeedback
                                            disabled = {this.state.isMySquadPlayerUpdating || this.state.isMySquadPlayerSubmitting}
                                            onPress={()=> this.updateSquad()}
                                            style={[
                                                styles.btn,
                                                styles.btnLeft,
                                                this.state.inSquad === true&&this.props.positionToRemove!==''? styles.btnLeftRed : styles.btnGreen
                                            ]}>
                                            <Text style={styles.btnText}>{buttonText}</Text>
                                        </ButtonFeedback>
                                }
                                <ButtonFeedback onPress={() => this._myLions('myLionsSquad')} style={[styles.btn, styles.btnRight, styles.btnRed]}>
                                    <Text style={styles.btnText}>MY SQUAD</Text>
                                </ButtonFeedback>
                            </View>
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
}, bindAction)(MyLionsPlayerProfile)
