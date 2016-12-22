
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, Alert } from 'react-native'
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

class MyLionsPlayerDetails extends Component {
    constructor(props){
        super(props)

        this.isUnMounted = false
        this.favAddUrl = 'https://www.api-ukchanges2.co.uk/api/protected/player/add',
        this.favRemoveUrl = 'https://www.api-ukchanges2.co.uk/api/protected/player/remove',
        this.favUrl = 'https://www.api-ukchanges2.co.uk/api/protected/mylionsfavourit?_=1480039224954'
        this.playerid = this.props.detail.id,
        this.playerName = this.props.detail.name,
        this.state = {
            isFav : this.props.detail.isFav,
            isFormSubmitting: false,
            isDoneUpdatingState: false,
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

    _updateState() {
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
    }

    _updatePlayer() {
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

                let successDesc = this.state.isFav? 'removed from your list.' : 'added to your list.'
                this.setState({ isFav: !this.state.isFav }, () => {
                    Alert.alert(
                        'Player List Update',
                        `${this.playerName} has been ${successDesc}`,
                        [{ text: 'OK' }]
                    )
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
        this._updateState()
    }

    componentWillUnmount() {
        this.isUnMounted = true
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

                            <View style={styles.buttons}>
                                {
                                    this.state.isDoneUpdatingState?
                                        <ButtonFeedback
                                            disabled = {this.state.isFormSubmitting}
                                            onPress={()=> this._updatePlayer()}
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
                        <View style={[styles.detailsGridCol, styles.detailsGridColFull]}>
                            <Text style={styles.detailsLabel}>BIRTHPLACE</Text>
                            <Text style={styles.detail}>{this.props.detail.birthplace}</Text>
                        </View>
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
                    </Content>
                    < EYSFooter />
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
