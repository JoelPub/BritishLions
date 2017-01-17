
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, Alert,  ScrollView, Modal } from 'react-native'
import { Container, Thumbnail, Header, Title, Content, Text, Button, Icon } from 'native-base'
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
import { setPositionToAdd } from '../../actions/position'
import ProfileListModel from  'modes/Players'
import ProfileModel from 'modes/Players/Profile'

const PositionButton=({position,posToAdd,onPress,subject,data,total})=>(
    <ButtonFeedback rounded onPress={onPress}  style={styles.modalBtnPosition}>
        <View style={[styles.modalBtnPositionLeft,posToAdd!==''&&posToAdd.toUpperCase()!==position.toUpperCase()&&{opacity:0.7}]}>
            <Text style={styles.modalBtnPosLeftText}>{subject.toUpperCase()}</Text>
        </View>
        <View style={styles.modalBtnPosRight}>
            <Text style={styles.modalBtnPosLeftText}>{data.length}/{total}</Text>
        </View>
    </ButtonFeedback>
    )
class MyLionsPlayerDetails extends Component {
    constructor(props){
        super(props)

        this.isUnMounted = false
        this.favAddUrl = getAssembledUrl('AddGoodFormFavoritePlayers')
        this.favRemoveUrl = getAssembledUrl('RemoveGoodFormFavoritePlayers')
        this.saveSquadUrl=getAssembledUrl('SaveGoodFormUserCustomizedSquad')
        this.PlayersProfileUrl=getAssembledUrl('EYC3GetPlayersProfile')
        this.playerid = this.props.detail.id,
        this.playerName = this.props.detail.name,
        this.state = {
            modalVisible: false,
            isFav : this.props.detail.isFav,
            inSquad: false,
            isLoaded: false,
            profile: ProfileListModel.fromJS([new ProfileModel()]),
            isFormSubmitting: false,
            isDoneUpdatingState: false,
            btnSubmit:'',
            modalContent:this.getModalContent(),
            squadDataFeed: {backs:[],
                            captain: [], 
                            widecard: [], 
                            forwards: [], 
                            kicker: []
                            }
        },
        this.tabBar = [{subject:'ATTACK',
                        content:[  
                            {title:'TRIES',score:'35',average:'20 avg'},
                            {title:'ASSISTS',score:'12',average:'10 avg'},
                            {title:'METRES RUN',score:'38',average:'7 avg'},
                            {title:'LINE BREAKS',score:'7',average:'15 avg'}
                            ]
                        },
                        {subject:'DEFENSE',
                        content:[  
                            {title:'TACKLES',score:'18',average:'20 avg'},
                            {title:'RUCKS',score:'12',average:'10 avg'},
                            {title:'LINE-IN',score:'22',average:'24 avg'},
                            {title:'TITLE',score:'14',average:'15 avg'}
                            ]
                        },
                        {subject:'KICKING',
                        content:[  
                            {title:'KICKING',score:'12',average:'10 avg'}
                            ]
                        }]
    }

    getModalContent(mode,title,subtitle,btn){
        switch(mode)  {
            case 'add' :
                return(
                    <View style={[styles.modalViewWrapper,styles.modalUpdateView]}>
                        <Text style={styles.modalTitleTextCenter}>SELECT A POSITION</Text>
                        <PositionButton position='captain' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','captain',1)} subject='CAPTAIN' data={this.state.squadDataFeed.captain} total='1'/>
                        <PositionButton position='kicker' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','kicker',1)} subject='KICKER' data={this.state.squadDataFeed.kicker} total='1'/>
                        <PositionButton position='widecard' posToAdd={this.props.positionToAdd} onPress = {()=>this._updateSquad('add','widecard',1)} subject='WIDECARD' data={this.state.squadDataFeed.widecard} total='1'/>
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
            case 'message' :
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
                        <Text style={styles.modalTextRN}>A score out of 10 based on recent player performance compared to all other eligible players for their position over the last two years and their most recent five games.</Text>
                
                        <Text style={styles.modalTitleText}>Recent Performance</Text>
                        <Text style={styles.modalTextRN}>Average rating of player performance over the last five games based on their attack and defence statistics.</Text>
                
                        <Text style={styles.modalTitleText}>Trend</Text>
                        <Text style={styles.modalTextRN}>Trend rating of player performance over the last five games compared with their performance over the last two years.</Text>
                
                        <Text style={styles.modalTitleText}>Attack / Defence / Kicking</Text>
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

    _replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    _reLogin() {
        removeToken()
        this.props.setAccessGranted(false)
        removeGoodFormFavoritePlayerList()
        removeUserCustomizedSquad()
        this._replaceRoute('login')
    }

    _signInRequired() {
        Alert.alert(
            'Your session has expired',
            'Please sign in your account.',
            [{
                text: 'SIGN IN', 
                onPress: this._reLogin.bind(this)
            }]
        )
    }

    _showError(error) {
        Alert.alert(
            'An error occured',
            error,
            [{text: 'Dismiss'}]
        )
    }

   /*_updateState() {
        // lets update 'isFav state' to avoid glitch when user
        // go to player details page then update the player (add or removed),
        // then user back then go here again
        // lets check first the player status if its favorite or not
        // this is to prevent glitch
        let options = {
            url: this.favUrl,
            data: {},
            method: 'get',
            onAxiosStart: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isDoneUpdatingState: false })
            },
            onAxiosEnd: () => {},
            onSuccess: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                let favoritePlayers = (res.data === '')? [] : res.data.split('|')
                let isFav = (favoritePlayers.indexOf(this.playerid) !== -1)
                
                // re-correect/update the isFav state
                // and show the button
                this.setState({isFav, isDoneUpdatingState: true})
            },
            onError: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isDoneUpdatingState: false }, () => {
                    this._showError(res) // prompt error
                })
            },
            onAuthorization: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isDoneUpdatingState: false }, () => {
                    this._signInRequired.bind(this)
                })
            },
            isRequiredToken: true
        }

        service(options)
    }*/

    /*_updatePlayer() {
        // lets check first the player status if its favorite or not
        // this is to prevent glitch
        let options = {
            url: this.favUrl,
            data: {},
            method: 'get',
            onAxiosStart: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isFormSubmitting: true })
            },
            onAxiosEnd: () => {},
            onSuccess: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                let favoritePlayers = (res.data === '')? [] : res.data.split('|')
                let isFav = (favoritePlayers.indexOf(this.playerid) !== -1)
                

                // detect conflict (glitch)
                if (this.state.isFav !== isFav) {
                    // what this means?
                    // it means we removing player that are already removed or
                    // we adding a player that are already added

                    // how this happens?
                    // go to mylion page, check one of the country there then select any player (your in the player details now)
                    // try to add or removed that player, example you add a player then the player is now added to your fav list
                    // click the my lions button (it will redirect you to favorite list page), then click the last player you add
                    // you will noticed the button of this player can be remove, then.. remove that player, it will now removed to your list
                    // click/tap the back button in the header and you will go my favorite player list page
                    // click/tap the back button again in the header and you will go the player details page (the player you add and removed)
                    // remember the last action you did is removed this from my favorite list page
                    // but as you can see the button still 'removed' instead of 'add'
                    // that's the conflict/glitch happen because we just click/tap the back button in the header and it just
                    // popRoute() or go to previous page, the problem here is when we back to the previous page, the component will not 
                    // re-render again, thats why what you see is 'removed' button instead of 'add'
                    // the solution is when user tap the 'removed' or 'add' button, we will set the 'isFav state' again (re correct the state boolean value)
                    // we will fetch the fav list from api and check if the player is included in favorites or not then
                    // re update the state, this is to avoid error prompt that goodform response

                    // what will happen now?
                    // if user 'remove' a player that already 'removed', the process will continue 
                    // and we will not receiving any error from goodform that stating that 'we requesting to invalid api url', 
                    // because the adding and removing player url api is different, we need to make sure that if we add a player, the url will be for adding url
                    // and if we remove player, the url will be for removing to avoid conflict in the goodform api 
                    // but lets prompt a message to the user that the player that user removing is 'already removed' 
                    // and the player that user adding is 'already addded' 

                    let errorDesc = ''
                    if (this.state.isFav) {
                        // user trying to remove a player that are already removed in the fav list
                        errorDesc = 'is already removed from your list.'
            
                    } else {
                        // user trying to add a player that are already added in the fav list
                        errorDesc = 'is already added from your list.'
                    }

                    // re correect the isFav state
                    this.setState({isFav, isFormSubmitting: false}, () => {
                        Alert.alert(
                            'Player List Update',
                            `${this.playerName} ${errorDesc}`,
                            [{ text: 'OK' }]
                        )
                    })
                } else {
                    // no conflict, just continue
                    this._processUpdate()
                }
            },
            onError: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isFormSubmitting: false }, () => {
                    this._showError(res) // prompt error
                })
            },
            onAuthorization: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isFormSubmitting: false }, () => {
                    this._signInRequired.bind(this)
                })
            },
            isRequiredToken: true
        }

        service(options)
    }*/

    _myLions(route) {
        this.props.pushNewRoute(route)
    }
    
    componentDidMount() {
        this._updateInitialState()
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    _setModalVisible=(visible,mode,title,subtitle,btn) => {
        this.setState({
            modalVisible:visible,
            modalContent:visible?this.getModalContent(mode,title,subtitle,btn):this.getModalContent()
        })
    }

<<<<<<< HEAD
    _updateInitialState() {
=======
    render() {
        let buttonText = ''
        
        if (this.state.isFormSubmitting&&this.state.btnSubmit==='SQUAD') {
            buttonText = this.state.inSquad === true? 'REMOVING..':'ADDING..'
        } else {
            buttonText = this.state.inSquad === true? 'REMOVE':'ADD'
        }

        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />

                    <Content bounces={false}>
                        <LinearGradient colors={['#AF001E', '#81071C']} style={styles.header}>
                            <Image source={this.props.detail.image} style={styles.imageCircle}/>
                            <View style={styles.headerPlayerDetails}>
                                <Text style={styles.headerPlayerName}>{this.props.detail.name.toUpperCase()}</Text>
                                <Text style={styles.headerPlayerPosition}>{this.props.detail.position}</Text>
                            </View>
                            <ButtonFeedback disabled = {this.state.isFormSubmitting} onPress={()=>this._updatePlayerFavStatus()} style={styles.btnSearchPlayer}>
                                {
                                    this.state.isFav === true?
                                    <Icon name='md-star' style={[styles.searchIcon,styles.btnFavIcon]}/>
                                    :
                                    <Icon name='md-star-outline' style={styles.searchIcon}/>
                                }
                            </ButtonFeedback>

                            <View style={styles.buttons}>
                                {
                                    this.state.isDoneUpdatingState?
                                        <ButtonFeedback
                                            disabled = {this.state.isFormSubmitting}
                                            onPress={()=> this.updateSquad()}
                                            style={[
                                                styles.btn,
                                                styles.btnLeft,
                                                this.state.inSquad === true? styles.btnLeftRed : styles.btnGreen
                                            ]}>
                                            <Text style={styles.btnText}>{buttonText}</Text>
                                        </ButtonFeedback>
                                    :
                                        <ButtonFeedback
                                            disabled = {true}
                                            style={[styles.btn, styles.btnLeft, styles.btnRed ]}>
                                            <Text style={styles.btnText}>CHECKING..</Text>
                                        </ButtonFeedback>
                                }
                                <ButtonFeedback onPress={() => this._myLions('myLionsFavoriteList')} style={[styles.btn, styles.btnRight, styles.btnRed]}>
                                    <Text style={styles.btnText}>MY LIONS</Text>
                                </ButtonFeedback>
                            </View>
                        </LinearGradient>
                        <Grid style={styles.detailsGrid}>
                            <Col style={styles.detailsGridCol} size={1}>
                                <Image transparent
                                    resizeMode='contain'
                                    source={{uri:this.props.detail.logo}}
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
                        <PlayerFigure tabBar={this.tabBar} profile={this.state.profile} isLoaded={this.state.isLoaded} pressInfo={this._setModalVisible.bind(this)}/>
                        <LionsFooter isLoaded={true} />
                    </Content>
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
    _updateInitialState(){
        // lets update 'isFav state' to avoid glitch when user
        // go to player details page then update the player (add or removed),
        // then user back then go here again
        // lets check first the player status if its favorite or not
        // this is to prevent glitch
        this.setState({ isDoneUpdatingState: false })
        removeGoodFormFavoritePlayerList() 
        
        getGoodFormFavoritePlayerList().then((data)=>{
            // console.log('final data:', JSON.stringify(data))
            if (this.isUnMounted) return // return nothing if the component is already unmounted
            if(data.auth){
                if(data.auth === 'Sign In is Required'){
                    this._signInRequired.bind(this)
                }
            }else if(data.error){
                // console.log('final data:', JSON.stringify(data.error))
                this._showError(data.error) // prompt error
            }else{
                let favoritePlayers = (data.data === '')? [] : data.data.split('|')
                let isFav = (favoritePlayers.indexOf(this.playerid) !== -1)

                // re-correect/update the isFav state
                this.setState({isFav},()=>{                    
                    getUserCustomizedSquad().then((catchedSquad)=>{
                        // console.log('final catchedSquad:', JSON.stringify(catchedSquad))
                        if(catchedSquad.error){
                            // console.log('final catchedSquad:', JSON.stringify(catchedSquad.error))
                            this.setState({ isDoneUpdatingState: false }, () => {
                                this._showError(catchedSquad.error) // prompt error
                            })
                        }else{
                            let squadFeed=eval(`(${catchedSquad.data})`)
                            let inSquad = false
                            let squadFeedTemp={backs:[], captain: [], widecard: [], forwards: [], kicker: [] }
                            for (let pos in squadFeed) {
                                squadFeedTemp[pos]=squadFeed[pos].trim()!==''?squadFeed[pos].split('|'):squadFeedTemp[pos]
                                if(squadFeedTemp[pos].indexOf(this.playerid) !== -1) inSquad=true
                            }
                            // console.log('@@@squadFeedTemp',squadFeedTemp)

                            // re-correect/update the Squad state
                            // and show the button
                            this.setState({inSquad,squadDataFeed:squadFeedTemp,isDoneUpdatingState: true},()=>{
                                this.getPlayerProfile()
                            })
                        }
                    })
                })
            }
        })
    }

    getPlayerProfile() {
        let optionsPlayerProfile = {
            url: this.PlayersProfileUrl,
            // data:{id:''},
            onAxiosStart: () => {},
            onAxiosEnd: () => {
                this.setState({ isLoaded:true })
            },
            onSuccess: (res) => {
                 this.setState({
                    isLoaded:true
                },()=>{
                    console.log('@@@res.data',res.data)
                    // let t=ProfileListModel.fromJS(res.data)
                    // console.log('@@@t',t)
                    this.setState({ isLoaded:true, profile:ProfileListModel.fromJS(res.data) })
                    // this._setModalVisible(false)
                    // this.setSquadData(this.fullPlayerList,res.data[0],'pop')
                    // removeUserCustomizedSquad()
                })
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
            isRequiredToken: true
        }

        service(optionsPlayerProfile)
    }

    _updatePlayerFavStatus() {
        this.setState({ isFormSubmitting: true, btnSubmit:'FAV' })
        
        // clear cache first to avoid conflict (glitch) in adding a player that is already added
        // and removing player that is already removed
        removeGoodFormFavoritePlayerList() 

        getGoodFormFavoritePlayerList().then((data)=>{
            if (this.isUnMounted) return // return nothing if the component is already unmounted
            
            if (data.auth) {
                if(data.auth === 'Sign In is Required'){
                    this.setState({ isFormSubmitting: false }, () => {
                        this._signInRequired.bind(this)
                    })
                }
            } else if(data.error) {
                 this.setState({ isFormSubmitting: false }, () => {
                    this._showError(data.error) // prompt error
                 })
            } else {
                 let favoritePlayers = (data.data === '')? [] : data.data.split('|')
                 let isFav = (favoritePlayers.indexOf(this.playerid) !== -1)

                 // detect conflict (glitch)
                 if (this.state.isFav !== isFav) {
                     // what this means?
                     // it means we removing player that are already removed or
                     // we adding a player that are already added

                     // how this happens?
                     // go to mylion page, check one of the country there then select any player (your in the player details now)
                     // try to add or removed that player, example you add a player then the player is now added to your fav list
                     // click the my lions button (it will redirect you to favorite list page), then click the last player you add
                     // you will noticed the button of this player can be remove, then.. remove that player, it will now removed to your list
                     // click/tap the back button in the header and you will go my favorite player list page
                     // click/tap the back button again in the header and you will go the player details page (the player you add and removed)
                     // remember the last action you did is removed this from my favorite list page
                     // but as you can see the button still 'removed' instead of 'add'
                     // that's the conflict/glitch happen because we just click/tap the back button in the header and it just
                     // popRoute() or go to previous page, the problem here is when we back to the previous page, the component will not
                     // re-render again, thats why what you see is 'removed' button instead of 'add'
                     // the solution is when user tap the 'removed' or 'add' button, we will set the 'isFav state' again (re correct the state boolean value)
                     // we will fetch the fav list from api and check if the player is included in favorites or not then
                     // re update the state, this is to avoid error prompt that goodform response

                     // what will happen now?
                     // if user 'remove' a player that already 'removed', the process will continue
                     // and we will not receiving any error from goodform that stating that 'we requesting to invalid api url',
                     // because the adding and removing player url api is different, we need to make sure that if we add a player, the url will be for adding url
                     // and if we remove player, the url will be for removing to avoid conflict in the goodform api
                     // but lets prompt a message to the user that the player that user removing is 'already removed'
                     // and the player that user adding is 'already addded'
                     
                     let errorDesc = ''
                     if (this.state.isFav) {
                         // user trying to remove a player that are already removed in the fav list
                         errorDesc = 'is already removed from your list'

                     } else {
                         // user trying to add a player that are already added in the fav list
                         errorDesc = 'is already added from your list'
                     }

                     // re correect the isFav state
                     this.setState({isFav, isFormSubmitting: false}, () => {
                         // Alert.alert(
                         //     'Player List Update',
                         //     `${this.playerName} ${errorDesc}`,
                         //     [{ text: 'OK' }]
                         // )

                         this._setModalVisible(true, 'message', 'PLAYER', `${this.playerName} ${errorDesc}`, 'OK')
                     })
                 } else {
                     // no conflict, just continue
                     this._processUpdate()
                 }
            }
        })
    }

    _processUpdate() {  
        let url = this.state.isFav? this.favRemoveUrl : this.favAddUrl

        let options = {
            url: url,
            data: {
                'playerId': this.playerid
            },
            onAxiosStart: () => {},
            onAxiosEnd: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isFormSubmitting: false })
            },
            onSuccess: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                let successDesc = this.state.isFav? 'REMOVED FROM' : 'ADDED TO'
                this.setState({ isFav: !this.state.isFav }, () => {
                    this._setModalVisible(true,'message','PLAYER',`${successDesc}  FAVOURITES`,'OK')
                })
            },
            onError: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isFormSubmitting: false }, () => {
                    this._showError('There is something going wrong, please refresh the list again.')
                })
            },
            onAuthorization: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isFormSubmitting: false }, () => {
                    this._signInRequired()
                })
            },
            isRequiredToken: true
        }

        service(options)
    }

    updateSquad(){
        this.state.inSquad?this._setModalVisible(true,'remove'):this._setModalVisible(true,'add')
    }

    _updateSquad(type,position,max){
        this.setState({ isFormSubmitting: true,btnSubmit:'SQUAD' },()=>{
            this._setModalVisible(false)
        })
        let update=true
        getUserCustomizedSquad().then((catchedSquad)=>{
            if (this.isUnMounted) return // return nothing if the component is already unmounted
            // console.log('final catchedSquad:', JSON.stringify(catchedSquad))
            if(catchedSquad.auth){
                if(catchedSquad.auth === 'Sign In is Required'){
                    this.setState({ isFormSubmitting: false }, () => {
                        this._signInRequired.bind(this)
                    })
                }
            }else if(catchedSquad.error){
                // console.log('final catchedSquad:', JSON.stringify(catchedSquad.error))
                this.setState({ isFormSubmitting: false }, () => {
                    this._showError(catchedSquad.error) // prompt error
                })
            }else{
                let squadFeed=eval(`(${catchedSquad.data})`)
                let inSquad = false
                let squadFeedTemp={backs:[], captain: [], widecard: [], forwards: [], kicker: [] }
                for (let pos in squadFeed) {
                    squadFeedTemp[pos]=squadFeed[pos].trim()!==''?squadFeed[pos].split('|'):squadFeedTemp[pos]
                    if(squadFeedTemp[pos].indexOf(this.playerid) !== -1) {
                        inSquad=true
                        if (type==='remove')  squadFeedTemp[pos].splice(squadFeedTemp[pos].indexOf(this.playerid),1)
                    }
                }

                if (this.state.inSquad !== inSquad) {
                     let errorDesc = ''
                     if (this.state.inSquad) {
                         errorDesc = 'is already removed from my squad list.'

                     } else {
                         errorDesc = 'is already added to my squad list.'
                     }

                     this.setState({inSquad, squadDataFeed:squadFeedTemp, isFormSubmitting: false}, () => {
                         Alert.alert(
                             'MySquad List Update',
                             `${errorDesc}`,
                             [{ text: 'OK' }]
                         )
                     })
                 } else {
                    // console.log('$$$$inSquad',inSquad)
                    // console.log('$$$$type',type)
                        
                    if(!inSquad&&type==='add') {
                        // console.log('$$$$squadFeedTemp',squadFeedTemp)
                        if(squadFeedTemp[position].length<max) {
                            squadFeedTemp[position].push(this.playerid)
                        }
                        else {
                            update=false
                            this.setState({ squadDataFeed:squadFeedTemp, isFormSubmitting: false })
                            Alert.alert(
                             'MySquad List Update',
                             'Position Is Full',
                             [{ text: 'OK' }]
                            )
                        }
                        // console.log('$$$$squadFeedTemp',squadFeedTemp)
                        
                    }
                    if(update) this._updateSquadPlayer(squadFeedTemp,position)
                 }

            }
        })
    }

    _updateSquadPlayer(squadData,position) {
        // console.log('@@@@squadData',squadData)
        let tmpSquadData = {backs:"", captain: "", widecard: "", forwards: "", kicker: "" }
        for (let pos in squadData) {
            // squadData[pos].map((node,index)=>{
            //     tmpSquadData[pos]=index===0?node:`${tmpSquadData[pos]}|${node}`
            // })
            tmpSquadData[pos]=squadData[pos].join('|')
        }
        // console.log('@@@@tmpSquadData',tmpSquadData)
        let options = {
            url: this.saveSquadUrl,
            data: tmpSquadData,
            onAxiosStart: () => {},
            onAxiosEnd: () => {
                this.setState({ isFormSubmitting: false })
            },
            onSuccess: (res) => {

                let successDesc = this.state.inSquad? 'PLAYER SUCCESSFULLY REMOVED' : 'SUCCESSFULLY ADDED'
                this.setState({ inSquad: !this.state.inSquad, squadDataFeed:squadData }, () => {
                    this._setModalVisible(true,'message',position?position.toUpperCase():'',successDesc,'OK')
                    removeUserCustomizedSquad()                    
                    this.props.setPositionToAdd('')
                })
            },
            onError: (res) => {
                this.setState({ isFormSubmitting: false }, () => {
                    this._showError(res)
                })
            },
            onAuthorization: () => {
                this.setState({ isFormSubmitting: false }, () => {
                    this._signInRequired()
                })
            },
            isRequiredToken: true
        }

        service(options)
    }
    
    render() {
        let buttonText = ''
        
        if (this.state.isFormSubmitting&&this.state.btnSubmit==='SQUAD') {
            buttonText = this.state.inSquad === true? 'REMOVING..':'ADDING..'
        } else {
            buttonText = this.state.inSquad === true? 'REMOVE':'ADD'
        }

        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />

                    <Content bounces={false}>
                        <LinearGradient colors={['#AF001E', '#81071C']} style={styles.header}>
                            <Image source={this.props.detail.image} style={styles.imageCircle}/>
                            <View style={styles.headerPlayerDetails}>
                                <Text style={styles.headerPlayerName}>{this.props.detail.name.toUpperCase()}</Text>
                                <Text style={styles.headerPlayerPosition}>{this.props.detail.position}</Text>
                            </View>
                            <ButtonFeedback disabled = {this.state.isFormSubmitting} onPress={()=>this._updatePlayerFavStatus()} style={styles.btnSearchPlayer}>
                                {
                                    this.state.isFav === true?
                                        <Icon name='md-star' style={[styles.searchIcon,styles.btnFavIcon]}/>
                                    :
                                        <Icon name='md-star-outline' style={styles.searchIcon}/>
                                }
                            </ButtonFeedback>

                            <View style={styles.buttons}>
                                {
                                    this.state.isDoneUpdatingState?
                                        <ButtonFeedback
                                            disabled = {this.state.isFormSubmitting}
                                            onPress={()=> this.updateSquad()}
                                            style={[
                                                styles.btn,
                                                styles.btnLeft,
                                                this.state.inSquad === true? styles.btnLeftRed : styles.btnGreen
                                            ]}>
                                            <Text style={styles.btnText}>{buttonText}</Text>
                                        </ButtonFeedback>
                                    :
                                        <ButtonFeedback
                                            disabled = {true}
                                            style={[styles.btn, styles.btnLeft, styles.btnRed ]}>
                                            <Text style={styles.btnText}>CHECKING..</Text>
                                        </ButtonFeedback>
                                }
                                <ButtonFeedback onPress={() => this._myLions('myLionsFavoriteList')} style={[styles.btn, styles.btnRight, styles.btnRed]}>
                                    <Text style={styles.btnText}>MY LIONS</Text>
                                </ButtonFeedback>
                            </View>
                        </LinearGradient>
                        <Grid style={styles.detailsGrid}>
                            <Col style={styles.detailsGridCol} size={1}>
                                <Image transparent
                                    resizeMode='contain'
                                    source={{uri:this.props.detail.logo}}
                                    style={styles.detailsNationLogo} />
                            </Col>
                            <Col style={styles.detailsGridCol} size={2}>
                                <Text style={styles.detailsLabel}>COUNTRY</Text>
                                <Text style={styles.detail}>{this.props.detail.country}</Text>
                            </Col>
                        </Grid>
                        <View style={[styles.detailsGridCol, styles.detailsGridColFull, styles.detailsGridGreyBackground]}>
                            <Text style={styles.detailsLabel}>CLUB</Text>
                            <Text style={styles.detail}>Northhampton Saints</Text>
                        </View>
                        <Grid style={styles.detailsGrid}>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>D.O.B</Text>
                                <Text style={styles.detail}>{this.props.detail.dob}</Text>
                            </Col>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>HEIGHT</Text>
                                <Text style={styles.detail}>{this.props.detail.heightm}</Text>
                            </Col>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>WEIGHT</Text>
                                <Text style={styles.detail}>{this.props.detail.weightm}</Text>
                            </Col>
                        </Grid>
                        <Grid style={[styles.detailsGrid, styles.detailsGridColFull, styles.detailsGridGreyBackground]}>
                            <Col style={styles.detailsGridCol} size={1}>
                                <Text style={styles.detailsLabel}>BIRTHPLACE</Text>
                                <Text style={styles.detail}>{this.props.detail.birthplace}</Text>
                            </Col>
                            <Col style={styles.detailsGridCol} size={1}>
                                <Text style={styles.detailsLabel}>INTERNATIONAL CAPS</Text>
                                <Text style={styles.detail}>80</Text>
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
                        <PlayerFigure tabBar={this.tabBar} profile={this.state.profile} isLoaded={this.state.isLoaded} pressInfo={this._setModalVisible.bind(this)}/>
                        <LionsFooter isLoaded={true} />
                    </Content>
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
        setPositionToAdd:(position)=>dispatch(setPositionToAdd(position))
    }
}

export default connect((state) => {
    return {
        detail: state.content.drillDownItem,
        isAccessGranted: state.token.isAccessGranted,
        positionToAdd: state.position.positionToAdd
    }
}, bindAction)(MyLionsPlayerDetails)
