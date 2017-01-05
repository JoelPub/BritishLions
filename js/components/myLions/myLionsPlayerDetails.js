
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

class MyLionsPlayerDetails extends Component {
    constructor(props){
        super(props)

        this.isUnMounted = false
        this.favAddUrl = 'https://www.api-ukchanges2.co.uk/api/protected/player/add',
        this.favRemoveUrl = 'https://www.api-ukchanges2.co.uk/api/protected/player/remove',
        this.playerid = this.props.detail.id,
        this.playerName = this.props.detail.name,
        this.state = {
            modalVisible: false,
            isFav : this.props.detail.isFav,
            isFormSubmitting: false,
            isDoneUpdatingState: false,
            modalContent:this.getModalContent()
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
            case 'update' :
                return(
                    <View style={[styles.modalViewWrapper,styles.modalUpdateView]}>
                        <Text style={styles.modalTitleTextCenter}>SELECT A POSITION</Text>
                        <ButtonFeedback rounded onPress={()=>this._setModalVisible(true,'message','CAPTAIN','SUCCESSFULLY ADDED','OK')}  style={styles.modalBtnPosition}>
                            <View style={styles.modalBtnPositionLeft}>
                                <Text style={styles.modalBtnPosLeftText}>CAPTAIN</Text>
                            </View>
                            <View style={styles.modalBtnPosRight}>
                                <Text style={styles.modalBtnPosLeftText}>1/1</Text>
                            </View>
                        </ButtonFeedback>
                        <ButtonFeedback rounded onPress={()=>this._setModalVisible(true,'message','KICKER','SUCCESSFULLY ADDED','OK')}  style={styles.modalBtnPosition}>
                            <View style={styles.modalBtnPositionLeft}>
                                <Text style={styles.modalBtnPosLeftText}>KICKER</Text>
                            </View>
                            <View style={styles.modalBtnPosRight}>
                                <Text style={styles.modalBtnPosLeftText}>0/1</Text>
                            </View>
                        </ButtonFeedback>
                        <ButtonFeedback rounded onPress={()=>this._setModalVisible(true,'message','WILDCARD','SUCCESSFULLY ADDED','OK')}  style={styles.modalBtnPosition}>
                            <View style={styles.modalBtnPositionLeft}>
                                <Text style={styles.modalBtnPosLeftText}>WILDCARD</Text>
                            </View>
                            <View style={styles.modalBtnPosRight}>
                                <Text style={styles.modalBtnPosLeftText}>0/1</Text>
                            </View>
                        </ButtonFeedback>
                        <ButtonFeedback rounded onPress={()=>this._setModalVisible(true,'message','FORWARD','SUCCESSFULLY ADDED','OK')}  style={styles.modalBtnPosition}>
                            <View style={styles.modalBtnPositionLeft}>
                                <Text style={styles.modalBtnPosLeftText}>FORWARD</Text>
                            </View>
                            <View style={styles.modalBtnPosRight}>
                                <Text style={styles.modalBtnPosLeftText}>12/16</Text>
                            </View>
                        </ButtonFeedback>
                        <ButtonFeedback rounded onPress={()=>this._setModalVisible(true,'message','BACK','SUCCESSFULLY ADDED','OK')}  style={styles.modalBtnPosition}>
                            <View style={styles.modalBtnPositionLeft}>
                                <Text style={styles.modalBtnPosLeftText}>BACK</Text>
                            </View>
                            <View style={styles.modalBtnPosRight}>
                                <Text style={styles.modalBtnPosLeftText}>5/16</Text>
                            </View>
                        </ButtonFeedback>
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
                            <Text style={styles.modalTitleText}>OVERALL RATING</Text>
                            <Text style={styles.modalTextHN}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
                    
                            <Text style={styles.modalTitleText}>OVERALL RATING</Text>
                            <Text style={styles.modalTextHN}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
                    
                            <Text style={styles.modalTitleText}>OVERALL RATING</Text>
                            <Text style={styles.modalTextHN}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
                    
                            <Text style={styles.modalTitleText}>OVERALL RATING</Text>
                            <Text style={styles.modalTextHN}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
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
    _updateInitialState(){
        // lets update 'isFav state' to avoid glitch when user
        // go to player details page then update the player (add or removed),
        // then user back then go here again
        // lets check first the player status if its favorite or not
        // this is to prevent glitch
        this.setState({ isDoneUpdatingState: false })
        getGoodFormFavoritePlayerList().then((data)=>{
            console.log('final data:', JSON.stringify(data))
            if (this.isUnMounted) return // return nothing if the component is already unmounted
            if(data.auth){
                if(data.auth === 'Sign In is Required'){
                    this.setState({ isDoneUpdatingState: false }, () => {
                        this._signInRequired.bind(this)
                    })
                }
            }else if(data.error){
                console.log('final data:', JSON.stringify(data.error))
                this.setState({ isDoneUpdatingState: false }, () => {
                    this._showError(data.error) // prompt error
                })
            }else{
                let favoritePlayers = (data.data === '')? [] : data.data.split('|')
                let isFav = (favoritePlayers.indexOf(this.playerid) !== -1)

                // re-correect/update the isFav state
                // and show the button
                this.setState({isFav, isDoneUpdatingState: true})
            }
        })
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

    _updatePlayerFavStatus(){
        this.setState({ isFormSubmitting: true })
        getGoodFormFavoritePlayerList().then((data)=>{
            if (this.isUnMounted) return // return nothing if the component is already unmounted
            if(data.auth){
                if(data.auth === 'Sign In is Required'){
                    this.setState({ isFormSubmitting: false }, () => {
                        this._signInRequired.bind(this)
                    })
                }
            }else if(data.error){
                 this.setState({ isFormSubmitting: false }, () => {
                    this._showError(data.error) // prompt error
                 })
            }else{
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
                     removeGoodFormFavoritePlayerList()
                 }
            }
        })
    }
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
                    this._showError(res)
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

    render() {
        let buttonText = ''
        
        if (this.state.isFormSubmitting) {
            buttonText = this.state.isFav === true? 'REMOVING..':'ADDING..'
        } else {
            buttonText = this.state.isFav === true? 'REMOVE':'ADD'
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
                                            onPress={()=> this._setModalVisible(true,'update')}
                                            style={[
                                                styles.btn,
                                                styles.btnLeft,
                                                this.state.isFav === true? styles.btnLeftRed : styles.btnGreen
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
                            <View style={[styles.detailsGridColFull,styles.playerCardWrapper]}>
                                <View style={styles.fullCard}>
                                    <ButtonFeedback 
                                        onPress={()=>this._setModalVisible(true,'info')}
                                        style={styles.btnCardInfo}>
                                        <Icon name='md-information-circle' style={styles.cardInfoIcon}/>
                                    </ButtonFeedback>
                                    
                                    <View style={styles.playerOverallRating}>
                                        <Text style={styles.ratingTitle}>OVERALL RATING</Text>
                                        <View style={styles.ratingScore}>
                                            <Text style={styles.ratingScorePoint}>7.8</Text>
                                        </View>
                                    </View>
                                    <View style={styles.playerPerfromanceWrapper}>
                                        <View style={styles.playerPerfromance} >
                                            <Text style={styles.performanceText} numberOfLines={2}>RECENT PERFORMANCE</Text>
                                            <Text style={styles.summaryTextHighLight}>86</Text>
                                        </View>
                                        <View style={styles.playerPerfromance}>
                                            <Text style={styles.performanceText}>CONSISTENCY</Text>
                                            <Icon name='md-trending-up' style={styles.playerPerformanceTrend}/>
                                        </View>
                                    </View>
                                    <View style={styles.playerFigureWrapper}>
                                        <PlayerFigure tabBar={this.tabBar} />
                                    </View>
                                <View style={styles.semiCardFooter}>
                                    <Text style={styles.semiCardFooterText}> Analytics Sponsored by </Text>
                                    <Image source={require('../../../images/footer/eyLogo.png')}></Image>
                                </View>
                                </View>
                            </View>
                        <LionsFooter isLoaded={true} />
                    </Content>
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
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}

export default connect((state) => {
    return {
        detail: state.content.drillDownItem,
        isAccessGranted: state.token.isAccessGranted
    }
}, bindAction)(MyLionsPlayerDetails)
