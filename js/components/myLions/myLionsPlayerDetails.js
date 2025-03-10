//
//'use strict'
//
//import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { Image, View, Platform, Alert,  ScrollView, Modal, ActivityIndicator } from 'react-native'
//import { Container, Thumbnail, Header, Title, Text, Button, Icon } from 'native-base'
//import { Grid, Col, Row } from 'react-native-easy-grid'
//import LinearGradient from 'react-native-linear-gradient'
//import theme from '../../themes/base-theme'
//import styles from './styles'
//import shapes from '../../themes/shapes'
//import LoginRequire from '../global/loginRequire'
//import LionsHeader from '../global/lionsHeader'
//import EYSFooter from '../global/eySponsoredFooter'
//import LionsFooter from '../global/lionsFooter'
//import ImageCircle from '../utility/imageCircle'
//import ButtonFeedback from '../utility/buttonFeedback'
//import { pushNewRoute, replaceRoute } from '../../actions/route'
//import { setAccessGranted } from '../../actions/token'
//import { removeToken } from '../utility/asyncStorageServices'
//import { service } from '../utility/services'
//import HTMLView from 'react-native-htmlview'
//import htmlStyles from '../../themes/html-styles'
//import styleVar from '../../themes/variable'
//import { getGoodFormFavoritePlayerList, removeGoodFormFavoritePlayerList } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
//import SquadModal from '../global/squadModal'
//import PlayerFigure from '../global/playerFigure'
//import { getUserCustomizedSquad, removeUserCustomizedSquad } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
//import { getAssembledUrl } from '../utility/urlStorage'
//import { setPositionToAdd , setPositionToRemove} from '../../actions/position'
//import ProfileListModel from  'modes/Players'
//import ProfileModel from 'modes/Players/Profile'
//import FigureListModel from  'modes/Players/Profile/SeasonList/Season/FigureList'
//import FigureModel from 'modes/Players/Profile/SeasonList/Season/FigureList/Figure'
//import SquadModel from  'modes/Squad'
//import SquadShowModel from  'modes/Squad/SquadShowModel'
//import Immutable, { Map, List } from 'immutable'
//import { strToUpper } from '../utility/helper'
//import ImagePlaceholder from '../utility/imagePlaceholder'
//import Swiper from 'react-native-swiper'
//import SquadList from '../global/squadList'
//import { setSquadToShow,setSquadData } from '../../actions/squad'
//import {removePlayer,addPlayer,replacePlayer,checkFullSquad} from '../global/squadToShow'
//
//const AddPlayerCell = ({pos,onPress})=>(
//    <ButtonFeedback  onPress= {onPress}  style={styles.posBtn}>
//        <View style={styles.posAddWrapper}>
//            <Icon name='md-person-add' style={styles.addPlayerIcon} />
//        </View>
//        <View style={styles.playerNameTextWrapper}>
//            <View style={[shapes.triangle]} />
//            <View style={styles.titleBox}>
//                <Text style={styles.playerNameText}>ADD</Text>
//                <Text style={styles.playerNameText}>
//                    { pos.toUpperCase() === 'WILDCARD'? 'STAR' : pos.toUpperCase() }
//                </Text>
//                </View>
//        </View>
//    </ButtonFeedback>
//    )
//const PlayerImgCell =({data,onPress}) =>(
//    <ButtonFeedback onPress={onPress} style={styles.posBtn}>
//        <ImagePlaceholder
//            width = {styleVar.deviceWidth / 3}
//            height = {styleVar.deviceWidth / 3}>
//            <Image transparent
//                resizeMode='contain'
//                source={{uri:data.image}}
//                style={styles.playerImage} />
//        </ImagePlaceholder>
//        <View style={styles.playerNameTextWrapper}>
//            <View style={[shapes.triangle]} />
//            <View style={styles.titleBox}>
//                <Text style={styles.playerNameText} numberOfLines={1}>{data.name&&data.name.toUpperCase().substring(0, data.name.lastIndexOf(" "))}</Text>
//                <Text style={styles.playerNameText} numberOfLines={1}>{data.name&&data.name.toUpperCase().substring(data.name.lastIndexOf(" ")+1, data.name.length)}</Text>
//            </View>
//        </View>
//    </ButtonFeedback>
//    )
//const PositionTitle =({pos,data}) =>(
//    <View style={styles.posTitle}>
//      <Text style={styles.posTitleLeft}>{pos.toUpperCase()}</Text>
//      <Text style={styles.posTitleRight}>
//       {data.filter((value)=>value!==null).length} / {data.length}
//      </Text>
//    </View>
//)
//
//const PositionButton=({position,posToAdd,onPress,subject,data,total})=>(
//    <ButtonFeedback rounded onPress={onPress}  style={styles.modalBtnPosition}>
//        <View style={[styles.modalBtnPositionLeft,posToAdd!==''&&posToAdd!==null&&posToAdd.toString().toUpperCase()!==position.toString().toUpperCase()&&{opacity:0.7}]}>
//            <Text style={styles.modalBtnPosLeftText}>{subject.toUpperCase()}</Text>
//        </View>
//        <View style={styles.modalBtnPosRight}>
//            <Text style={styles.modalBtnPosLeftText}>{data instanceof Array ? data.length : (data===''  ? 0: data.toString().split('|').length)}/{total}</Text>
//        </View>
//    </ButtonFeedback>
//    )
//class MyLionsPlayerDetails extends Component {
//    constructor(props){
//        super(props)
//        this._scrollView = ScrollView
//        this.isUnMounted = false
//        this.favAddUrl = getAssembledUrl('AddGoodFormFavoritePlayers')
//        this.favRemoveUrl = getAssembledUrl('RemoveGoodFormFavoritePlayers')
//        this.saveSquadUrl=getAssembledUrl('SaveGoodFormUserCustomizedSquad')
//        this.PlayersProfileUrl=getAssembledUrl('EYC3GetPlayersProfile')
//        this.playerid = this.props.detail.id,
//        this.playerName = this.props.detail.name,
//        this.playerPos=null,
//        this.seq=0,
//        this.state = {
//            modalVisible: false,
//            isFav : this.props.detail.isFav,
//            inSquad: false,
//            isLoaded: false,
//            profile: ProfileListModel.fromJS([new ProfileModel()]),
//            btnSubmit:'',
//            modalContent:this.getModalContent(),
//            squadDataFeed: SquadModel().toJS(),
//            isFavPlayerUpdating: false,
//            isMySquadPlayerUpdating: false,
//            isMySquadPlayerSubmitting: false,
//            fullSquad:true
//        }
//    }
//
//    getModalContent(mode,title,subtitle,btn){
//        switch(mode)  {
//            case 'add' :
//
//                return(
//                    <View style={[styles.modalViewWrapper,styles.modalUpdateView]}>
//                        <Text style={styles.modalTitleTextCenter}>SELECT A POSITION</Text>
//                        <PositionButton position='captain' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','captain',1)} subject='CAPTAIN' data={this.state.squadDataFeed.captain} total='1'/>
//                        <PositionButton position='kicker' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','kicker',1)} subject='KICKER' data={this.state.squadDataFeed.kicker} total='1'/>
//                        <PositionButton position='wildcard' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','widecard',1)} subject='STAR' data={this.state.squadDataFeed.widecard} total='1'/>
//                        <PositionButton position='forwards' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','forwards',16)} subject='FORWARD' data={this.state.squadDataFeed.forwards} total='16'/>
//                        <PositionButton position='backs' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','backs',16)} subject='BACK' data={this.state.squadDataFeed.backs} total='16'/>
//                    </View>
//                )
//                break
//            case 'remove' :
//                return(
//                    <View style={styles.modalViewWrapper}>
//                        <Text style={styles.modalTitleTextCenter}>REMOVE PLAYER FROM YOUR SQUAD?</Text>
//                        <View style={styles.modalBtnWrapper}>
//                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='CANCEL' style={styles.modlaBtnConfirm} />
//                            <ButtonFeedback rounded onPress={()=>this._updateSquad('remove')}  label='CONFIRM' style={[styles.modlaBtnConfirm,styles.btnConfirmGreen]}  />
//                        </View>
//                    </View>
//                )
//                break
//            case 'replace' :
//                return(
//                    <View style={styles.modalViewWrapper}>
//                        <Text style={styles.modalTitleTextCenter}>{title}</Text>
//                        <Text style={[styles.modalTextCenter, styles.modalTextCenterUppCase]}>{subtitle}</Text>
//                        <View style={styles.modalBtnWrapper}>
//                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='CANCEL' style={[styles.modlaBtnConfirm,styles.btnCancelBlack]} />
//                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(true,'squad','REPLACE PLAYER')}  label='PROCEED' style={styles.modlaBtnConfirm}  />
//                        </View>
//                    </View>
//                )
//                break
//            case 'squad' :
//                return(
//                    <ScrollView style={styles.modalSquadView}>
//                        <Text style={[styles.modalTitleTextCenter, styles.modalTitleTextCenterReplacePlayer]}>{title}</Text>
//                        <SquadList squadDatafeed={this.props.squadToShow} pressImg={this._replacePlayer.bind(this)} pressAdd={this._updateSquad.bind(this)}/>
//                        <View style={styles.guther}>
//                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='CANCEL' style={[styles.modalConfirmBtn, styles.modalConfirmBtnBlack]} />
//                        </View>
//                    </ScrollView>
//                )
//                break
//            case 'confirm' :
//                return(
//                    <View style={styles.modalViewWrapper}>
//                        <Text style={styles.modalTitleTextCenter}>{title}</Text>
//                        <Text style={[styles.modalTextCenter, styles.modalTextCenterUppCase]}>{subtitle}</Text>
//                        <View style={styles.modalBtnWrapper}>
//                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='CANCEL' style={styles.modlaBtnConfirm} />
//                            <ButtonFeedback rounded onPress={()=>this._updateSquad('replace',this.playerPos,0,this.seq)}  label='CONFIRM' style={[styles.modlaBtnConfirm,styles.btnConfirmGreen]}  />
//                        </View>
//                    </View>
//                    )
//                break
//            case 'message' :
//                title = title === 'WIDECARD'? 'STAR' : title
//
//                return(
//                    <View style={styles.modalViewWrapper}>
//                        <Text style={styles.modalBtnTitle}>{title}</Text>
//                        <Text style={styles.modalTitleTextCenter}>{subtitle}</Text>
//                        <ButtonFeedback rounded label={btn} onPress={()=>this._setModalVisible(false)}  style={styles.modalConfirmBtn} />
//                    </View>
//                )
//                break
//            case 'info' :
//                return (
//                    <ScrollView style={styles.modalViewWrapper}>
//                        <Text style={styles.modalTitleText}>Overall Rating</Text>
//                        <Text style={styles.modalTextRN}>To provide an overall player rating EY took the results of more than 700 international and top tier club rugby games started by players in the 2015/2016 & 2016/2017 seasons. As new games are played, including the 2017 RBS 6 Nations Championship, a player’s performance will be updated.</Text>
//                        <Text style={[styles.modalTextRN, styles.modalTextMTop]}>For each game there are over 150 features collected on player performance. Using advanced analytic techniques, EY identified the 30 most influential factors in a team winning a game. These factors are split into Defensive and Attacking attributes and weighted by position. i.e. a fullback doesn’t have influence in scrums being won or lost but does contribute to team metres gained.</Text>
//
//                        <Text style={styles.modalTitleText}>Recent Performance</Text>
//                        <Text style={styles.modalTextRN}>Recent Performance is a score out of 100 based on how a player has performed in their last five matches.</Text>
//
//                        <Text style={styles.modalTitleText}>Attack</Text>
//                        <Text style={styles.modalTextRN}>Metres – the average number of metres gained from overall games started in the last two seasons.</Text>
//                        <Text style={styles.modalTextRN}>Lineouts won – the average number of lineouts won from overall games started in the last two seasons.</Text>
//                        <Text style={styles.modalTextRN}>Scrums won – the average number of scrums won in overall games started in the last two seasons.</Text>
//                        <Text style={styles.modalTextRN}>Clean breaks – the average number of clean breaks in overall games started in the last two seasons.</Text>
//                        <Text style={styles.modalTextRN}>Offloads – the average number of offloads in overall games started in the last two seasons.</Text>
//                        <Text style={styles.modalTextRN}>Tries – the average number of tries scored in overall games started in the last two seasons.</Text>
//
//                        <Text style={styles.modalTitleText}>Defence</Text>
//                        <Text style={styles.modalTextRN}>Tackles – The average number of successful tackles made in overall games started in the last two seasons.</Text>
//                        <Text style={styles.modalTextRN}>Turnovers won – the average number of turnovers won in overall games started in the last two seasons.</Text>
//                        <Text style={styles.modalTextRN}>Collection success – the average number of intercepts, catches and loose ball off ground in overall games started in the last two seasons.</Text>
//                    </ScrollView>
//                )
//                break
//            default:
//                return (
//                    <View>
//                    </View>
//                )
//        }
//    }
//    _replacePlayer(item, route,playerPos,max,seq) {
//        this.playerPos=playerPos
//        this.seq=seq
//        this._setModalVisible(true,'confirm','REPLACE PLAYER WITH',this.playerName)
//        // this._updateSquad('replace',playerPos,max,seq)
//    }
//
//    _mapJSON(data, colMax = 2) {
//        let i = 0
//        let k = 0
//        let newData = []
//        let items = []
//        let length = data.length
//
//        for( i = 0; i <data.length; (i += colMax)) {
//            for( k = 0; k < colMax; k++ ) {
//                if(data[i + k]!==undefined)
//                    items.push(data[i + k])
//            }
//
//            newData.push(items)
//            items = []
//        }
//        return newData
//    }
//
//    _replaceRoute(route) {
//        this.props.replaceRoute(route)
//    }
//
//    _reLogin() {
//        removeToken()
//        this.props.setAccessGranted(false)
//        removeGoodFormFavoritePlayerList()
//        removeUserCustomizedSquad()
//        this._replaceRoute('login')
//    }
//
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
//
//
//    _showError(error) {
//         if(error !== ''){
//            Alert.alert(
//                'An error occured',
//                error,
//                [{text: 'Dismiss'}]
//            )
//        }
//    }
//
//    _myLions(route) {
//        this.props.pushNewRoute(route)
//    }
//
//    isPlainObj (value) {
//      return value && (value.constructor === Object || value.constructor === undefined)
//    }
//
//    componentDidMount() {
//        // if (__DEV__)console.log('!!!Details this.props.squadToShow',this.props.squadToShow)
//        if (__DEV__)console.log('!!!Details componentDidMount')
//        // Let's have a parallel request
//
//        setTimeout(()=>{
//            // adding delay to solve the issue of LIONS-690
//            this._updateFavStatus()
//        }, 600)
//
//        this._updateMySquadStatus()
//        this.getPlayerProfile()
//    }
//
//    componentWillUnmount() {
//        this.isUnMounted = true
//    }
//
//    componentWillReceiveProps(nextProps,nextState) {
//        if (__DEV__)console.log('!!!details componentWillReceiveProps')
//        // if (__DEV__)console.log('!!!Details this.props.squadToShow',this.props.squadToShow)
//        // if (__DEV__)console.log('!!!Details nextProps.squadToShow',nextProps.squadToShow)
//    }
//
//    _updateFavStatus() {
//        // lets update 'isFav state' to avoid glitch when user
//        // go to player details page then update the player (add or removed),
//        // then user back then go here again
//        // lets check first the player status if its favorite or not
//        // this is to prevent glitch
//
//        // show loading indicator in fav star button
//        this.setState({ isFavPlayerUpdating: true })
//
//        getGoodFormFavoritePlayerList().then((data)=>{
//            if (this.isUnMounted) return // return nothing if the component is already unmounted
//            if(data.auth){
//                if(data.auth === 'Sign In is Required'){
//                    this._signInRequired.bind(this)
//                }
//            }else if(data.error){
//                this._showError(data.error) // prompt error
//            }else{
//                let favoritePlayers = (data.data === ''||data.data===undefined)? [] : data.data.split('|')
//                let isFav = (favoritePlayers.indexOf(this.playerid) !== -1)
//
//                // re-correect/update the isFav state
//                this.setState({isFavPlayerUpdating: false, isFav})
//            }
//        })
//    }
//
//    _updateMySquadStatus() {
//        // show loading in adding and removing button
//        this.setState({isMySquadPlayerUpdating: true})
//
//        getUserCustomizedSquad().then((catchedSquad)=>{
//            if(catchedSquad.error){
//                this.setState({ isMySquadPlayerUpdating: false }, () => {
//                    this._showError(catchedSquad.error) // prompt error
//                })
//            }else{
//                let squadFeed=SquadModel.format(eval(`(${catchedSquad.data})`))
//                let inSquad = false
//                if(Map.isMap(squadFeed)) squadFeed.forEach((value,index)=>{
//                    if(List.isList(value)) {
//                        if(value.indexOf(this.playerid)>-1) inSquad=true
//                    }
//                    else {
//                        if(value===this.playerid) inSquad=true
//                    }
//                })
//                this.setState({inSquad,squadDataFeed:squadFeed.toJS(), isMySquadPlayerUpdating: false})
//            }
//        })
//    }
//
//    _setModalVisible=(visible,mode,title,subtitle,btn) => {
//        this.setState({
//            modalVisible:visible,
//            modalContent:visible?this.getModalContent(mode,title,subtitle,btn):this.getModalContent()
//        })
//    }
//
//    getPlayerProfile() {
//        let optionsPlayerProfile = {
//            url: this.PlayersProfileUrl,
//            data:{player_id:this.playerid},
//            onAxiosStart: () => {},
//            onAxiosEnd: () => {
//                this.setState({ isLoaded:true })
//            },
//            onSuccess: (res) => {
//                let profile = ProfileListModel.fromJS([new ProfileModel()])
//
//                if (res.data instanceof Array  && res.data.length!==0) {
//                    profile=ProfileListModel.fromJS(res.data)
//                } else {
//                    profile = profile.update(0,value=>{
//                        return value=value.update('Attack',v=>{
//                            return v=FigureListModel.fromJS([new FigureModel()])
//                        })
//                    })
//                }
//
//                this.setState({ profile, isLoaded: true })
//            },
//            onError: (res) => {
//                this.setState({isLoaded:true }, () => {
//                    this._showError(res)
//                })
//            },
//            onAuthorization: () => {
//                this.setState({isLoaded:true }, () => {
//                    this._signInRequired()
//                })
//            },
//            isRequiredToken: true,
//            channel:'EYC3'
//        }
//
//        service(optionsPlayerProfile)
//    }
//
//    _updatePlayerFavStatus() {
//        this.setState({ isFavPlayerUpdating: true, btnSubmit:'FAV' })
//
//        getGoodFormFavoritePlayerList().then((data)=>{
//            if (this.isUnMounted) return // return nothing if the component is already unmounted
//
//            if (data.auth) {
//                if(data.auth === 'Sign In is Required'){
//                    this.setState({ isFavPlayerUpdating: false }, () => {
//                        this._signInRequired.bind(this)
//                    })
//                }
//            } else if(data.error) {
//                 this.setState({ isFavPlayerUpdating: false }, () => {
//                    this._showError(data.error) // prompt error
//                 })
//            } else {
//                 let favoritePlayers = (data.data === '')? [] : data.data.split('|')
//                 let isFav = (favoritePlayers.indexOf(this.playerid) !== -1)
//
//                 // detect conflict (glitch)
//                 if (this.state.isFav !== isFav) {
//                     // what this means?
//                     // it means we removing player that are already removed or
//                     // we adding a player that are already added
//
//                     // how this happens?
//                     // go to mylion page, check one of the country there then select any player (your in the player details now)
//                     // try to add or removed that player, example you add a player then the player is now added to your fav list
//                     // click the my lions button (it will redirect you to favorite list page), then click the last player you add
//                     // you will noticed the button of this player can be remove, then.. remove that player, it will now removed to your list
//                     // click/tap the back button in the header and you will go my favorite player list page
//                     // click/tap the back button again in the header and you will go the player details page (the player you add and removed)
//                     // remember the last action you did is removed this from my favorite list page
//                     // but as you can see the button still 'removed' instead of 'add'
//                     // that's the conflict/glitch happen because we just click/tap the back button in the header and it just
//                     // popRoute() or go to previous page, the problem here is when we back to the previous page, the component will not
//                     // re-render again, thats why what you see is 'removed' button instead of 'add'
//                     // the solution is when user tap the 'removed' or 'add' button, we will set the 'isFav state' again (re correct the state boolean value)
//                     // we will fetch the fav list from api and check if the player is included in favorites or not then
//                     // re update the state, this is to avoid error prompt that goodform response
//
//                     // what will happen now?
//                     // if user 'remove' a player that already 'removed', the process will continue
//                     // and we will not receiving any error from goodform that stating that 'we requesting to invalid api url',
//                     // because the adding and removing player url api is different, we need to make sure that if we add a player, the url will be for adding url
//                     // and if we remove player, the url will be for removing to avoid conflict in the goodform api
//                     // but lets prompt a message to the user that the player that user removing is 'already removed'
//                     // and the player that user adding is 'already addded'
//
//                     let errorDesc = ''
//                     if (this.state.isFav) {
//                         // user trying to remove a player that are already removed in the fav list
//                         errorDesc = 'is already removed from your list'
//
//                     } else {
//                         // user trying to add a player that are already added in the fav list
//                         errorDesc = 'is already added from your list'
//                     }
//
//                     // re correect the isFav state
//                     this.setState({isFav, isFavPlayerUpdating: false}, () => {
//                         // Alert.alert(
//                         //     'Player List Update',
//                         //     `${this.playerName} ${errorDesc}`,
//                         //     [{ text: 'OK' }]
//                         // )
//                        this._setModalVisible(true, 'message', 'PLAYER', `${this.playerName} ${errorDesc}`, 'OK')
//                     })
//                 } else {
//                     // no conflict, just continue
//                     this._processUpdate()
//                 }
//            }
//        })
//
//        // clear cache first to avoid conflict (glitch) in adding a player that is already added
//        // and removing player that is already removed
//        removeGoodFormFavoritePlayerList()
//    }
//
//    _processUpdate() {
//        let url = this.state.isFav? this.favRemoveUrl : this.favAddUrl
//
//        let options = {
//            url: url,
//            data: {
//                'playerId': this.playerid
//            },
//            onAxiosStart: () => {},
//            onAxiosEnd: () => {
//                if (this.isUnMounted) return // return nothing if the component is already unmounted
//                this.setState({ isFavPlayerUpdating: false })
//            },
//            onSuccess: (res) => {
//                if (this.isUnMounted) return // return nothing if the component is already unmounted
//
//                let successDesc = this.state.isFav? 'REMOVED FROM' : 'ADDED TO'
//                this.setState({ isFav: !this.state.isFav }, () => {
//                    this._setModalVisible(true,'message','PLAYER',`${successDesc}  FAVOURITES`,'OK')
//                    removeGoodFormFavoritePlayerList()
//                })
//            },
//            onError: (res) => {
//                if (this.isUnMounted) return // return nothing if the component is already unmounted
//                this.setState({ isFavPlayerUpdating: false }, () => {
//                    this._showError('An error occured, please refresh the list again.')
//                    removeGoodFormFavoritePlayerList()
//                })
//            },
//            onAuthorization: () => {
//                if (this.isUnMounted) return // return nothing if the component is already unmounted
//                this.setState({ isFavPlayerUpdating: false }, () => {
//                    this._signInRequired()
//                })
//            },
//            isRequiredToken: true
//        }
//
//        service(options)
//    }
//
//    updateSquad(){
//        if(this.state.inSquad&&this.props.positionToRemove!==null) {
//            this._setModalVisible(true,'remove')
//        }
//        else {
//            this.fullSquad=checkFullSquad(this.props.squadToShow)
//            if (__DEV__)console.log('this.fullSquad',this.fullSquad)
//            this.fullSquad?this._setModalVisible(true,'replace','SQUAD FULL','CANNOT ADD NEW PLAYER AS YOUR SQUAD IS FULL. \n\n PLEASE SELECT A PLAYER TO REPLACE.'):this._setModalVisible(true,'add')
//        }
//    }
//
//    _updateSquad(type,position,max,seq){
//        let update=true
//        // getUserCustomizedSquad().then((catchedSquad)=>{
//        //     if(catchedSquad.auth){
//        //         if(catchedSquad.auth === 'Sign In is Required'){
//        //             this.setState({ isMySquadPlayerSubmitting: false }, () => {
//        //                 this._signInRequired.bind(this)
//        //             })
//        //         }
//        //     }else if(catchedSquad.error){
//        //         this.setState({ isMySquadPlayerSubmitting: false }, () => {
//        //             this._showError(catchedSquad.error) // prompt error
//        //         })
//        //     }else{
//                    // if (__DEV__)console.log('details this.props.squadData',this.props.squadData)
//                    let tmpFeed=SquadModel.format(eval(`(${this.props.squadData})`))
//                    let inSquad = false
//                    if(Map.isMap(tmpFeed)) tmpFeed.forEach((value,index)=>{
//                        if(List.isList(value)) {
//                            if(value.indexOf(this.playerid)>-1){
//                                inSquad=true
//                                if (type==='remove'&&strToUpper(index)===strToUpper(this.props.positionToRemove)) {
//                                    tmpFeed=tmpFeed.update(index,val=>{
//                                        return value.splice(value.indexOf(this.playerid),1)
//                                    })
//                                    this.props.setSquadToShow(removePlayer(this.props.squadToShow,index,this.playerid))
//                                }
//                            }
//                        }
//                        else {
//                            if(value===this.playerid) {
//                                inSquad=true
//                                if (type==='remove'&&strToUpper(index)===strToUpper(this.props.positionToRemove==='WILDCARD'?'WIDECARD':this.props.positionToRemove)) {
//                                    if (__DEV__)console.log('!!!tmpFeed',tmpFeed.toJS())
//                                    tmpFeed=tmpFeed.set(index,'')
//                                    this.props.setSquadToShow(removePlayer(this.props.squadToShow,index))
//                                }
//                            }
//                        }
//                    })
//
//                    if(type==='add') {
//                        if(List.isList(tmpFeed.get(position))) {
//                            if(tmpFeed.get(position).count()<max) {
//                                tmpFeed=tmpFeed.set(position,tmpFeed.get(position).push(this.playerid))
//                                this.props.setSquadToShow(addPlayer(this.props.squadToShow,position,this.props.detail,this.playerid))
//                            }
//                            else {
//                                update=false
//                                this.setState({ squadDataFeed:tmpFeed.toJS(), isMySquadPlayerSubmitting: false })
//                                this._setModalVisible(true,'replace',`${position?position.toUpperCase():''} POSITION FULL`,`THE ${position?position.toUpperCase():''} POSITION IS CURRENTLY FULLY ALLOCATED. \n\n PLEASE SELECT A PLAYER TO REPLACE.`)
//                            }
//                        }
//                        else{
//                            if(tmpFeed.get(position).trim()==='') {
//                                tmpFeed=tmpFeed.set(position,this.playerid)
//                                this.props.setSquadToShow(addPlayer(this.props.squadToShow,position,this.props.detail))
//                            }
//                            else {
//                                update=false
//                                this.setState({ squadDataFeed:tmpFeed.toJS(), isMySquadPlayerSubmitting: false })
//                                let star = ''
//                                star = position ==='widecard'?'STAR':position.toUpperCase()
//                                this._setModalVisible(true,'replace',`${star} POSITION FULL`,`THE ${star} POSITION IS CURRENTLY FULLY ALLOCATED. \n\n PLEASE SELECT A PLAYER TO REPLACE.`)
//                            }
//                        }
//
//                    }
//
//
//                    if(type==='replace') {
//                        if(List.isList(tmpFeed.get(position))) {
//                            // if(tmpFeed.get(position).count()<max) {
//                                //if (__DEV__)console.log('tmpFeed',tmpFeed.toJS())
//                                //if (__DEV__)console.log('position',position)
//                                //if (__DEV__)console.log('seq',seq)
//                                tmpFeed=tmpFeed.update(position,val=>{
//                                    val=val.set(seq,this.playerid)
//                                    return val
//                                })
//                                //if (__DEV__)console.log('tmpFeed',tmpFeed.toJS())
//                                this.props.setSquadToShow(replacePlayer(this.props.squadToShow,position,this.props.detail,this.playerid,seq))
//                            // }
//                            // else {
//                            //     update=false
//                            //     this.setState({ squadDataFeed:tmpFeed.toJS(), isMySquadPlayerSubmitting: false })
//                            //     this._setModalVisible(true,'replace',`${position?position.toUpperCase():''} POSITION FULL`,`THE ${position?position.toUpperCase():''} POSITION IS CURRENTLY FULLY ALLOCATED. \n\n PLEASE SELECT A PLAYER TO REPLACE.`)
//                            // }
//                        }
//                        else{
//                            // if(tmpFeed.get(position).trim()==='') {
//                                tmpFeed=tmpFeed.set(position==='wildcard'?'widecard':position,this.playerid)
//                                this.props.setSquadToShow(replacePlayer(this.props.squadToShow,position,this.props.detail,null,seq))
//                            // }
//                            // else {
//                            //     update=false
//                            //     this.setState({ squadDataFeed:tmpFeed.toJS(), isMySquadPlayerSubmitting: false })
//                            //     this._setModalVisible(true,'replace',`${position?position.toUpperCase():''} POSITION FULL`,`THE  ${position?position.toUpperCase():''} POSITION IS CURRENTLY FULLY ALLOCATED. \n\n PLEASE SELECT A PLAYER TO REPLACE.`)
//                            // }
//                        }
//
//                    }
//                    if(update){
//                        this._updateSquadPlayer(tmpFeed,position, type)
//                    }
//
//            // }
//        // })
//    }
//
//    _updateSquadPlayer(squadData,position, type='') {
//        this.setState({ isMySquadPlayerSubmitting: true, btnSubmit:'SQUAD' },()=>{
//            this._setModalVisible(false)
//        })
//        squadData.forEach((value,index)=>{
//            if(List.isList(value)) squadData=squadData.update(index,val=>{
//                                                    return val.join('|')
//                                                })
//        })
//        let options = {
//            url: this.saveSquadUrl,
//            data: squadData.toJS(),
//            onAxiosStart: () => {},
//            onAxiosEnd: () => {
//                this.setState({ isMySquadPlayerSubmitting: false })
//            },
//            onSuccess: (res) => {
//                let successDesc = this.state.inSquad&&this.props.positionToRemove!==null? 'PLAYER SUCCESSFULLY REMOVED' : 'SUCCESSFULLY ADDED'
//                position = position?position.toUpperCase() : ''
//
//                if (type === 'replace') {
//                    successDesc = 'PLAYER SUCCESSFULLY REPLACED '
//                    position = ''
//                }
//
//                this.setState({ inSquad: !this.state.inSquad, squadDataFeed:squadData.toJS() }, () => {
//                    this._setModalVisible(true, 'message', position, successDesc, 'OK')
//                    //if (__DEV__)console.log('!!!squadData',squadData)
//                    this.props.setSquadData(JSON.stringify(squadData))
//                    removeUserCustomizedSquad()
//                    this.props.setPositionToAdd(null)
//                    this.props.setPositionToRemove(null)
//                })
//            },
//            onError: (res) => {
//                this.setState({ isMySquadPlayerSubmitting: false }, () => {
//                    this._showError(res)
//                })
//            },
//            onAuthorization: () => {
//                this.setState({ isMySquadPlayerSubmitting: false }, () => {
//                    this._signInRequired()
//                })
//            },
//            isRequiredToken: true
//        }
//
//        service(options)
//    }
//
//    render() {
//        let buttonText = ''
//
//        if (this.state.isMySquadPlayerSubmitting && this.state.btnSubmit === 'SQUAD') {
//            buttonText = this.state.inSquad === true&&this.props.positionToRemove!==null? 'REMOVING..':'UPDATING..'
//        } else {
//            buttonText = this.state.inSquad === true&&this.props.positionToRemove!==null? 'REMOVE':'ADD'
//        }
//
//        let logo = ''
//        let name = this.props.detail.name ? this.props.detail.name.toUpperCase() : ''
//        if (this.props.detail) {
//            logo = String(this.props.detail.logo)
//        }
//         return (
//            <Container theme={theme}>
//                <View style={styles.container}>
//                    <LionsHeader
//                        back={true}
//                        title='MY LIONS'
//                        contentLoaded={true}
//                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
//
//                    <ScrollView bounces={false} ref={(scrollView) => { this._scrollView = scrollView }}>
//                        <View style={styles.header}>
//                            <View style={styles.playerPic}>
//                                <Image resizeMode='cover' source={{uri:this.props.detail.image}} style={styles.playerPicImg}/>
//                                <Image source={require('../../../images/redCircle.png')} style={styles.playerPicCover}/>
//                            </View>
//
//                            <View style={styles.headerPlayerDetails}>
//                                <Text style={styles.headerPlayerName}>{name}</Text>
//                                <Text style={styles.headerPlayerPosition}>{this.props.detail.position}</Text>
//                            </View>
//                            <ButtonFeedback disabled = {this.state.isFavPlayerUpdating} onPress={()=>this._updatePlayerFavStatus()} style={styles.btnSearchPlayer}>
//                                {
//                                    this.state.isFavPlayerUpdating?
//                                        <ActivityIndicator color="white" size='small' />
//                                    :
//                                        this.state.isFav === true?
//                                            <Icon name='md-star' style={[styles.searchIcon,styles.btnFavIcon]}/>
//                                        :
//                                            <Icon name='md-star-outline' style={styles.searchIcon}/>
//                                }
//                            </ButtonFeedback>
//
//                            <View style={styles.buttons}>
//                                {
//                                    this.state.isMySquadPlayerUpdating?
//                                        <ButtonFeedback
//                                            disabled = {true}
//                                            style={[styles.btn, styles.btnLeft, styles.btnRed ]}>
//                                            <Text style={styles.btnText}>CHECKING..</Text>
//                                        </ButtonFeedback>
//                                    :
//                                        <ButtonFeedback
//                                            disabled = {this.state.isMySquadPlayerUpdating || this.state.isMySquadPlayerSubmitting}
//                                            onPress={()=> this.updateSquad()}
//                                            style={[
//                                                styles.btn,
//                                                styles.btnLeft,
//                                                this.state.inSquad === true&&this.props.positionToRemove!==null? styles.btnLeftRed : styles.btnGreen
//                                            ]}>
//                                            <Text style={styles.btnText}>{buttonText}</Text>
//                                        </ButtonFeedback>
//                                }
//                                <ButtonFeedback onPress={() => this._myLions('myLionsSquad')} style={[styles.btn, styles.btnRight, styles.btnRed]}>
//                                    <Text style={styles.btnText}>MY SQUAD</Text>
//                                </ButtonFeedback>
//                            </View>
//                        </View>
//                        <Grid style={styles.detailsGrid}>
//                            <Col style={styles.detailsGridCol} size={1}>
//                                <Image transparent
//                                    resizeMode='contain'
//                                    source={{uri:logo}}
//                                    style={styles.detailsNationLogo} />
//                            </Col>
//                            <Col style={styles.detailsGridCol} size={2}>
//                                <Text style={styles.detailsLabel}>COUNTRY</Text>
//                                <Text style={styles.detail}>{this.props.detail.country} </Text>
//                            </Col>
//                        </Grid>
//                        <View style={[styles.detailsGridCol, styles.detailsGridColFull, styles.detailsGridGreyBackground]}>
//                            <Text style={styles.detailsLabel}>CLUB</Text>
//                            <Text style={styles.detail}>{this.props.detail.club} </Text>
//                        </View>
//                        <Grid style={styles.detailsGrid}>
//                            <Col style={styles.detailsGridCol}>
//                                <Text style={styles.detailsLabel}>D.O.B</Text>
//                                <Text style={styles.detail}>{this.props.detail.dob} </Text>
//                            </Col>
//                            <Col style={styles.detailsGridCol}>
//                                <Text style={styles.detailsLabel}>HEIGHT</Text>
//                                <Text style={styles.detail}>{this.props.detail.heightm} </Text>
//                            </Col>
//                            <Col style={styles.detailsGridCol}>
//                                <Text style={styles.detailsLabel}>WEIGHT</Text>
//                                <Text style={styles.detail}>{this.props.detail.weightm} </Text>
//                            </Col>
//                        </Grid>
//                        <Grid style={[styles.detailsGrid, styles.detailsGridColFull, styles.detailsGridGreyBackground]}>
//                            <Col style={styles.detailsGridCol} size={1}>
//                                <Text style={styles.detailsLabel}>BIRTHPLACE</Text>
//                                <Text style={styles.detail}>{this.props.detail.birthplace} </Text>
//                            </Col>
//                            <Col style={styles.detailsGridCol} size={1}>
//                                <Text style={styles.detailsLabel}>INTERNATIONAL CAPS</Text>
//                                <Text style={styles.detail}>{this.props.detail.honours} </Text>
//                            </Col>
//                        </Grid>
//                        {/*
//                            this.props.detail.biog?
//                                <View style={styles.playerDesc}>
//                                    <HTMLView
//                                       value={this.props.detail.biog}
//                                       stylesheet={htmlStyles}
//                                     />
//                                </View>
//                            :
//                                null
//
//                        */}
//                        <PlayerFigure profile={this.state.profile} isLoaded={this.state.isLoaded} pressInfo={this._setModalVisible.bind(this)}/>
//                        <LionsFooter isLoaded={true} />
//                    </ScrollView>
//                    < EYSFooter mySquadBtn={true} />
//                    <LoginRequire/>
//                    <SquadModal
//                        modalVisible={this.state.modalVisible}
//                        callbackParent={this._setModalVisible}>
//                            {this.state.modalContent}
//                    </SquadModal>
//                </View>
//            </Container>
//        )
//    }
//}
//
//function bindAction(dispatch) {
//    return {
//        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
//        replaceRoute:(route)=>dispatch(replaceRoute(route)),
//        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted)),
//        setPositionToAdd:(position)=>dispatch(setPositionToAdd(position)),
//        setPositionToRemove:(position)=>dispatch(setPositionToRemove(position)),
//        setSquadToShow:(squad)=>dispatch(setSquadToShow(squad)),
//        setSquadData:(squad)=>dispatch(setSquadData(squad)),
//    }
//}
//
//export default connect((state) => {
//    return {
//        detail: state.content.drillDownItem,
//        isAccessGranted: state.token.isAccessGranted,
//        positionToAdd: state.position.positionToAdd,
//        positionToRemove: state.position.positionToRemove,
//        squadToShow: state.squad.squadToShow,
//        squadData: state.squad.squadData,
//    }
//}, bindAction)(MyLionsPlayerDetails)
