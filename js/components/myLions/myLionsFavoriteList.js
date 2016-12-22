
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, RefreshControl, ActivityIndicator, Alert, Platform, ListView } from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import { replaceRoute, pushNewRoute } from '../../actions/route'
import styleVar from '../../themes/variable'
import loader from '../../themes/loader-position'
import { alertBox } from '../utility/alertBox'
import refresh from '../../themes/refresh-control'
import { drillDown } from '../../actions/content'
import { setAccessGranted } from '../../actions/token'
import { removeToken } from '../utility/asyncStorageServices'
import { service } from '../utility/services'
import Data from '../../../contents/unions/data'
import { globalNav } from '../../appNavigator'
import StickyFooter from '../utility/stickyFooter'

class MyLionsFavoriteList extends Component {

    constructor(props){
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.isUnMounted = false
        this.favUrl = 'https://www.api-ukchanges2.co.uk/api/protected/mylionsfavourit?_=1480039224954'
        this.playerFullUrl = 'https://f3k8a7j4.ssl.hwcdn.net/tools/feeds?id=403'
        this.uniondata = Data

        this.state = {
            isRefreshing: false,
            isLoaded: false,
            favoritePlayers: this.ds.cloneWithRows([])
        }
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <View style={styles.gridBoxCol}>
                <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                    <ImagePlaceholder 
                        width = {styleVar.deviceWidth / 2}
                        height = {styleVar.deviceWidth / 2}>
                        <Image transparent
                            resizeMode='contain'
                            source={rowData.image} 
                            style={styles.gridBoxImg} />
                    </ImagePlaceholder>
                    <View style={styles.gridBoxDescWrapper}>
                        <View style={[shapes.triangle]} />
                        <View style={styles.gridBoxTitle}>
                            <Text style={styles.gridBoxTitleText}>{rowData.name.toUpperCase()}</Text>
                            <Text style={styles.gridBoxTitleSupportText}>{rowData.position}</Text>
                        </View>
                    </View>
                </ButtonFeedback>
            </View> 
        )
    }



    handlePlayer(players) {
        players.map((item,index)=>{
            let image = item.image
            let union = this.uniondata.find((n)=> n.id===item.countryid)
            Object.assign(item, {
                logo: union.image, 
                country: union.displayname.toUpperCase(),
                countryid: union.id,
                isFav: true
            })
            if(typeof image==='string') {
               if (image.indexOf('125.gif') > 0) {
                    players[index].image = require(`../../../contents/unions/nations/125.png`)
                } else if (image.indexOf('126.gif') > 0) {
                    players[index].image = require(`../../../contents/unions/nations/126.png`)
                } else if (image.indexOf('127.gif') > 0) {
                    players[index].image = require(`../../../contents/unions/nations/127.png`)
                } else if (image.indexOf('128.gif') > 0) {
                    players[index].image = require(`../../../contents/unions/nations/128.png`)
                } else {
                    players[index].image = {uri:image}
                } 
            }
            
        })
        return players
    }

    _listPlayer(playerList, playerFeed){
        let favoritePlayers = []
        let playerids = playerList.split('|')
        
        for (var u in playerFeed) {
            if (playerFeed[u].length > 0) {
                playerFeed[u].map((player, index) => {
                    playerids.map((id,j) => {
                        if (player.id === id) {
                            Object.assign(player, {'countryid':u})
                            favoritePlayers.push(player)
                        }
                    })
                })
            }
        }

        this.setState({ 
            favoritePlayers:this.ds.cloneWithRows(this.handlePlayer(favoritePlayers))
        })
    }

    _showError(error) {
        alertBox(
            'An Error Occured',
            error,
            'Dismiss'
        )
    }

    _getFavDetail(playerList) {
        let options = {
            url: this.playerFullUrl,
            data: {},
            method: 'get',
            onAxiosStart: () => {},
            onAxiosEnd: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                    
                this.setState({ isLoaded: true, isRefreshing: false })
            },
            onSuccess: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                    
                this._listPlayer(playerList, res.data)
            },
            onError: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                    
                this.setState({ isLoaded: true, isRefreshing: false }, () => {
                    this._showError(res)
                })
            },
            onAuthorization: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                    
                this._signInRequired()
            },
            isRequiredToken: true
        }

        service(options)
    }

    _fetchFavPlayers(isInitialLoad = false) {
        let options = {
            url: this.favUrl,
            data: {},
            method: 'get',
            onAxiosStart: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                if (isInitialLoad) {
                    this.setState({ isLoaded: false })
                } else {
                    // means user refresh the page
                    this.setState({ isRefreshing: true })
                }
            },
            onAxiosEnd: () => {},
            onSuccess: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                if (res.data !== '') {
                    this._getFavDetail(res.data)
                } else {
                    // empty favorite player list
                    this.setState({ isLoaded: true, isRefreshing: false }, () => {
                        alertBox(
                            'Message',
                            'The favourite player list is currently empty, you can add a new favourite player from the player detail page.',
                            'Dismiss'
                        )
                    })
                }
            },
            onError: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                this.setState({ isLoaded: true, isRefreshing: false }, () => {
                    this._showError(res)
                })
            },
            onAuthorization: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                this.setState({ isLoaded: true, isRefreshing: false }, () => {
                    this._signInRequired()
                })
            },
            isRequiredToken: true
        }

        service(options)
    }

    componentDidMount() {
        this._fetchFavPlayers(true)
    }

    componentWillReceiveProps(nextProps) {
        let routes = globalNav.navigator.getCurrentRoutes()
        
        // re render after 'back nav' pressed
        if (!this.isUnMounted && routes[routes.length - 2].id === 'myLionsFavoriteList') {
            this.setState({
                isRefreshing: false,
                isLoaded: false,
                favoritePlayers: this.ds.cloneWithRows([])
            }, () => {
                this._fetchFavPlayers()
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    _onRefresh() {
        this.setState({ isRefreshing: true })
        this._fetchFavPlayers()
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

    _showDetail(item, route) {
        this.props.drillDown(item, 'myLionsPlayerDetails')
    }

    _mapJSON(data, colMax = 2) {
        let i = 0
        let k = 0
        let newData = []
        let items = []
        let length = data.length

        for( i = 0; i <data.length; (i += colMax)) {
            for( k = 0; k < colMax; k++ ) {
                if(data[i + k])
                    items.push(data[i + k])
            }

            newData.push(items)
            items = []
        }
        return newData
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />
                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.header}>
                        <View style={styles.viewCircle}>
                            <Image resizeMode='contain' source={require('../../../contents/my-lions/nations/lions.png')} style={styles.imageTitle}/>
                        </View>
                        <Text style={styles.headerTitle}>MY LIONS</Text>
                    </LinearGradient>
                    {
                        this.state.isLoaded?
                             <ListView 
                                dataSource={this.state.favoritePlayers}
                                renderRow={this._renderRow.bind(this)}
                                enableEmptySections = {true} 
                                contentContainerStyle={styles.gridList}
                              />
                        :
                            <ActivityIndicator style={loader.centered} size='large' />
                    }
                    <EYSFooter />
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}

export default connect((state) => {
    return {
        route: state.route,
    }
}, bindAction)(MyLionsFavoriteList)

