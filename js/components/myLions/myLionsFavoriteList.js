
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
import LoginRequire from '../global/loginRequire'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import { replaceRoute, pushNewRoute } from '../../actions/route'
import styleVar from '../../themes/variable'
import { alertBox } from '../utility/alertBox'
import refresh from '../../themes/refresh-control'
import { drillDown } from '../../actions/content'
import { setAccessGranted } from '../../actions/token'
import { removeToken } from '../utility/asyncStorageServices'
import { service } from '../utility/services'
import { getAssembledUrl } from '../utility/urlStorage'
import Data from '../../../contents/unions/data'
import { globalNav } from '../../appNavigator'
import LionsFooter from '../global/lionsFooter'
import { getSoticFullPlayerList} from '../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getGoodFormFavoritePlayerList, removeGoodFormFavoritePlayerList } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import { getEYC3FullPlayerList,removeEYC3FullPlayerList } from '../utility/apiasyncstorageservice/eyc3AsyncStorageService'
import Storage from 'react-native-storage'

class MyLionsFavoriteList extends Component {

    constructor(props){
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.isUnMounted = false
        this.favUrl = getAssembledUrl('GoodFormFavoritePlayers')
        this.playerFullUrl = getAssembledUrl('SoticFullPlayers')
        this.uniondata = Data

        this.state = {
            isRefreshing: false,
            isLoaded: false,
            favoritePlayers: this.ds.cloneWithRows([])
        }
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        let styleGridBoxImgWrapper = (rowID%2 === 0)? [styles.gridBoxImgWrapper, styles.gridBoxImgWrapperRight] : [styles.gridBoxImgWrapper]
        let styleGridBoxTitle = (rowID %2 ===  0)? [styles.gridBoxTitle, styles.gridBoxTitleRight] : [styles.gridBoxTitle]
        
        return (
            <View style={styles.gridBoxCol} key={rowID}>
                <ButtonFeedback 
                    style={styles.gridBoxTouchable}
                    onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                    <View style={styles.gridBoxTouchableView}>
                        <View style={styleGridBoxImgWrapper}>
                            <ImagePlaceholder 
                                width = {styleVar.deviceWidth / 2}
                                height = {styleVar.deviceWidth / 2}>
                                <Image transparent
                                    resizeMode='contain'
                                    source={rowData.image} 
                                    style={styles.gridBoxImg}
                                    key={rowID}/>
                            </ImagePlaceholder>
                        </View>
                        <View style={[shapes.triangle]} />
                        <View style={styleGridBoxTitle}>
                            <Text style={styles.gridBoxTitleText} numberOfLines={1}>{rowData.name.toUpperCase().substring(0, rowData.name.lastIndexOf(" "))}</Text>
                            <Text style={styles.gridBoxTitleText} numberOfLines={1}>{rowData.name.toUpperCase().substring(rowData.name.lastIndexOf(" ")+1, rowData.name.length)}</Text>
                            <Text style={styles.gridBoxTitleSupportText}>Overall Rating: {rowData.eyc3PlayerScore}</Text>
                        </View>
                    </View>
                </ButtonFeedback>
            </View> 
        )
    }

    _renderFooter() {
        return(
            <View style={{width:styleVar.deviceWidth}} >
                <LionsFooter isLoaded={true} />
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
        getEYC3FullPlayerList().then((eyc3CatchedFullPlayerList) => {
            if (this.isUnMounted) return // return nothing if the component is already unmounted

            if (eyc3CatchedFullPlayerList !== null && eyc3CatchedFullPlayerList !== 0 && eyc3CatchedFullPlayerList !== -1) {
                this._mergeEYC3Player(favoritePlayers, eyc3CatchedFullPlayerList)
            }
        }).catch((error) => {
            console.log('Error when try to get the EYC3 full player list: ', error)
        })
    }

    _mergeEYC3Player(playerList, eyc3Players){
        let mergedFavoritePlayers = []
        playerList.map((player,j) => {
            for (var u in eyc3Players) {
                if (eyc3Players[u].length > 0) {
                    eyc3Players[u].map((eyc3player, index) => {
                        if (eyc3player.id.toString() === player.id.toString()) {
                            player.eyc3PlayerScore = eyc3player.overall_score
                        }
                    })
                }
            }
            mergedFavoritePlayers.push(player)
        })


        this.setState({
            isLoaded: true,
            isRefreshing: false,
            favoritePlayers:this.ds.cloneWithRows(this.handlePlayer(mergedFavoritePlayers))
        })
    }

    _showError(error) {
        alertBox(
            'An Error Occured',
            error,
            'Dismiss'
        )
    }

    /*_fetchFavPlayers(isInitialLoad = false) {
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
                    getSoticFullPlayerList().then((catchedFullPlayerList) => {
                        if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                            this._listPlayer(res.data, catchedFullPlayerList)
                        }
                    }).catch((error) => {
                        console.log('Error when try to get the sotic full player list', error)
                    })
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
    }*/

    _getFavoritePlayers(isInitialLoad = false){
        if (this.isUnMounted) return // return nothing if the component is already unmounted

        if (isInitialLoad) {
            this.setState({ isLoaded: false })
        } else {
            // means user refresh the page
            this.setState({ isRefreshing: true })
        }
        
        getGoodFormFavoritePlayerList().then((data)=>{
            // console.log('final data:', JSON.stringify(data))
            if (this.isUnMounted) return // return nothing if the component is already unmounted
            
            if(data.auth){
                if(data.auth === 'Sign In is Required'){
                    this.setState({ isLoaded: true, isRefreshing: false }, () => {
                        this._signInRequired()
                    })
                }
            }else if(data.error){
                // console.log('final data:', JSON.stringify(data.error))
                this.setState({ isLoaded: true, isRefreshing: false }, () => {
                    this._showError(data.error)
                })
            }else{
                if (data.data !== '') {
                    getSoticFullPlayerList().then((catchedFullPlayerList) => {
                        if (this.isUnMounted) return // return nothing if the component is already unmounted

                        if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                            this._listPlayer(data.data, catchedFullPlayerList)
                        }
                    }).catch((error) => {
                        console.log('Error when try to get the sotic full player list', error)
                    })
                } else {
                    // empty favorite player list
                    this.setState({
                        isLoaded: true, 
                        isRefreshing: false,
                        favoritePlayers: this.ds.cloneWithRows([])
                    })
                }
            }
        })
    }

    componentDidMount() {
        //removeGoodFormFavoritePlayerList()
        //removeEYC3FullPlayerList()
        setTimeout(()=>{this._getFavoritePlayers(true)},600)
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
                setTimeout(()=>{this._getFavoritePlayers(true)}, 600)
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
        this._getFavoritePlayers()
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
                     <View style={styles.myLionsSharedHeader}>
                         <Text style={styles.myLionsSharedHeaderText}>
                              MY FAVOURITES
                         </Text>
                     </View>
                     <View style={{flex: 1}}>
                        {
                            this.state.isLoaded?
                                <View>
                                    {
                                        !this.state.favoritePlayers.getRowCount()? 
                                            <ScrollView>
                                                <View style={styles.emptyPlayer}>
                                                    <Text style={styles.emptyPlayerText}>The favourite player list is currently empty, you can add a new favourite player from the player detail page.</Text>
                                                </View>
                                                <LionsFooter isLoaded={true} />
                                            </ScrollView>
                                        : 
                                            <ScrollView>
                                                <ListView 
                                                    dataSource={this.state.favoritePlayers}
                                                    renderRow={this._renderRow.bind(this)}
                                                    enableEmptySections = {true} 
                                                    contentContainerStyle={styles.gridList}
                                                    renderFooter ={this._renderFooter}
                                                />
                                            </ScrollView>
                                    } 
                                </View>
                            :
                                <ActivityIndicator style={styles.loaderPos2} size='large' />
                        }
                    </View>
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
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

