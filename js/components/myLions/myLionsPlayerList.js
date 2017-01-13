
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Modal, ScrollView, ActivityIndicator, Alert, Platform, ListView,TouchableOpacity } from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { replaceRoute } from '../../actions/route'
import { drillDown } from '../../actions/content'
import { setAccessGranted } from '../../actions/token'
import { removeToken } from '../utility/asyncStorageServices'
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
import styleVar from '../../themes/variable'
import FilterListingModal from '../global/filterListingModal'
import loader from '../../themes/loader-position'
import { service } from '../utility/services'
import { ucWords } from '../utility/helper'
import LionsFooter from '../global/lionsFooter'
import MyLionsPlayerListFilter from '../myLions/myLionsPlayerListFilter'
import { getSoticFullPlayerList} from '../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getGoodFormFavoritePlayerList, removeGoodFormFavoritePlayerList } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import { getEYC3FullPlayerList } from '../utility/apiasyncstorageservice/eyc3AsyncStorageService'
import IosUtilityHeaderBackground from '../utility/iosUtilityHeaderBackground'

class MyLionsPlayerList extends Component {

    constructor(props){
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.isUnMounted = false
        this.unionFeed = this.props.unionFeed
        this.union=this.unionFeed.uniondata.find((n)=> n.id === this.unionFeed.unionId)
        //this.unionUrl = `https://f3k8a7j4.ssl.hwcdn.net/tools/feeds?id=401&team=${this.unionFeed.unionId}`
        //this.favUrl = 'https://www.api-ukchanges2.co.uk/api/protected/mylionsfavourit?_=1480039224954'
        this.state = {
            isLoaded: false,
            modalVisible: false,
            filterModalVisible: false,
            transparent: true,
            resultVisible: false,
            playerListFeeds: this.ds.cloneWithRows([]),
            favoritePlayers: [],
            searchResult:this.ds.cloneWithRows([]),
            isEmptyResult: false,
        }
        this.playerListFeeds=[]
        this.nameFilter = ''
        this.filterBy = ''
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

    _renderSearch(rowData, sectionID, rowID, highlightRow) {
        return (
            <View style={styles.resultRow}>
                <ButtonFeedback style={styles.resultRowBtn} onPress={() => {this._setSearchModalVisible(false),this._showDetail(rowData,'myLionsPlayerDetails')}}>
                    <View style={styles.searchImg}>
                        <Image transparent
                            resizeMode='stretch'
                            source={rowData.image}
                            style={styles.playerImg}
                            key={rowID}
                             />
                    </View>
                    <View style={styles.resultDesc}>
                        <Text style={styles.resultRowTitleText}>{rowData.name.toUpperCase()}</Text>
                        <Text style={styles.resultRowSubtitleText}>{rowData.position}</Text>
                    </View>
                </ButtonFeedback>
            </View>
        )
    }

    _showDetail(item, route) {
        this.props.drillDown(item, route)
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

    _getFilteredPosition=(value)=>{
        value = value.toLowerCase()

        if(value !== this.filterBy){
            this.filterBy = value
        }else{
            this.filterBy = ''
        }

        if(this.filterBy !== ''){
            let filteredResult = []
            filteredResult = filteredResult.concat(this.playerListFeeds.filter((player)=>player.position.toLowerCase().indexOf(this.filterBy)===0) )
            filteredResult.length > 0?
                this.setState({
                    filterModalVisible: false,
                    transparent: true,
                    playerListFeeds: this.ds.cloneWithRows(filteredResult)
                })
            :
                this.setState({
                    filterModalVisible: false,
                    transparent: true,
                    playerListFeeds: this.ds.cloneWithRows([])
                })
        }else{
            this.setState({
                filterModalVisible: false,
                transparent: true,
                playerListFeeds: this.ds.cloneWithRows(this.playerListFeeds)
            })
        }
    }

    handlePlayer(players) {
        console.log('merged players：', players)
        players.map((item,index)=>{
            let image = item.image
            Object.assign(item, {
                logo: this.union.image, 
                country: this.union.displayname.toUpperCase(),
                countryid: this.union.id,
                isFav: (this.state.favoritePlayers.indexOf(item.id)!==-1)
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

    _getFavoritePlayers(playersByNation){
        this.playerListFeeds = this.handlePlayer(playersByNation)
        this.setState({ isLoaded: false })
        getGoodFormFavoritePlayerList().then((data)=>{
            console.log('final data:', JSON.stringify(data))
            if (this.isUnMounted) return // return nothing if the component is already unmounted
            if(data.auth){
                if(data.auth === 'Sign In is Required'){
                   this._signInRequired()
                }
            }else if(data.error){
                this.setState({ isLoaded: true }, () => {
                    this._showError(data.error) // prompt error
                })
            }else{
               let favoritePlayers = (data.data === '')? [] : data.data.split('|')

               this.setState({
                   playerListFeeds: this.ds.cloneWithRows(this.playerListFeeds),
                   favoritePlayers:favoritePlayers
               })
            }
            this.setState({ isLoaded: true })
        })
    }

     _mergeEYC3Player(playerList, eyc3Players){
         let mergedPlayers = []
         // console.log('eyc3Players:', eyc3Players)
         // console.log('playerList:', playerList)
         // if (eyc3Players.length > 0) {
         //     eyc3Players.map((eyc3player, index) => {
         //         playerList.map((player,j) => {
         //             if (eyc3player.id === player.id) {
         //                 player.eyc3PlayerScore = eyc3player.heightm
         //                 mergedPlayers.push(player)
         //             }
         //         })
         //     })
         // }
         playerList.map((item,index)=>{
            let r=eyc3Players.find((node)=>node.id.toString()===item.id)
            mergedPlayers.push(Object.assign(item,{eycsPlayerScore:r===undefined?'N/A':r.overall_score}))
         })
         // console.log('mergedPlayers:', mergedPlayers)
        this._getFavoritePlayers(mergedPlayers)
     }

    /*_getFavoritePlayers(playersByNation) {
        this.playerListFeeds = this.handlePlayer(playersByNation[this.unionFeed.unionId])
        let options = {
            url: this.favUrl,
            data: {},
            method: 'get',
            onAxiosStart: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isLoaded: false })
            },
            onAxiosEnd: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isLoaded: true })
            },
            onSuccess: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                let favoritePlayers = (res.data === '')? [] : res.data.split('|')
                
                this.setState({ 
                    playerListFeeds: this.ds.cloneWithRows(this.playerListFeeds),
                    favoritePlayers:favoritePlayers
                })
            },
            onError: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isLoaded: true }, () => {
                    this._showError(res) // prompt error
                })
            },
            onAuthorization: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this._signInRequired()
            },
            isRequiredToken: true
        }

        service(options)
    }*/

    _setSearchModalVisible=(visible) => {
        this.setState({
            modalVisible:visible,
            resultVisible:!visible,
            isEmptyResult: false,
            transparent:visible
        })
    }

    _setFilterModalVisible=(visible) => {
        this.setState({
            filterModalVisible:visible,
            transparent:visible
        })
    }
    
    onCloseFilter = () => {
        this.setState({
            modalVisible:false,
            transparent: true,
            resultVisible: false,
            filterModalVisible:false,
        })
    }

    _searchPlayer = (keywords) => {
        let searchResult=[]
        //strip out non alpha characters
        let strSearch = keywords.replace(/[^A-Za-z\^\s]/g,'').toLowerCase()
        let strArr = strSearch.split(' ')
        let tempArr = this.playerListFeeds.slice()
       
        function filterName(player) {
            let nameArr = player.name.toLowerCase().split(' ')
            let result = false

            if(nameArr.length>0) {
                nameArr.map((name,i)=>{
                    if(name===this.nameFilter) {
                        result=true
                    }
                })
            }
            else {
                if( player.name.toLowerCase()===this.nameFilte ) {
                    result=true
                }
            }
            return result
        }

        if (strSearch.trim() !== '') {
            //search exactly same name
            searchResult = searchResult.concat(this.playerListFeeds.filter((player)=>player.name.toLowerCase().indexOf(strSearch.trim().toLowerCase())===0) )
            
            //split words
            if(strArr.length>0) {
                strArr.map((item,index)=>{
                    this.nameFilter=item            
                    searchResult=searchResult.concat(
                        this.playerListFeeds.filter(filterName.bind(this))
                    )
                })
            }
            

            //name contain keywords
            searchResult=searchResult.concat(this.playerListFeeds.filter((player)=>player.name.toLowerCase().indexOf(strSearch.trim().toLowerCase())!==-1) )
            searchResult=searchResult.concat(this.playerListFeeds.filter((player)=>player.position.toLowerCase().indexOf(strSearch.trim().toLowerCase())!==-1) )
            //searchResult=searchResult.concat(this.playerListFeeds.filter((player)=>player.club.toLowerCase().indexOf(strSearch.trim().toLowerCase())!==-1) )

            //break keywords to single characters and match
            for (let i=0;i<strSearch.length;i++ ) {
                if(strSearch.charAt(i).match(/[A-Z]/gi)) {
                    tempArr=tempArr.filter((player)=>player.name.toLowerCase().indexOf(strSearch.charAt(i).toLowerCase())!==-1)
                }               
            }

            if (tempArr.length>0) {
                searchResult = searchResult.concat(tempArr)
            }

            //remove duplicate
            searchResult.map((item,index)=>{
                let arr=[]
                for(let j=index+1; j<searchResult.length; j++) {                    
                    if(item.id===searchResult[j].id){
                        arr=arr.concat(j)
                    }
                }
                if (arr.length>0) {
                    arr.reverse().map((start,index)=>{
                        searchResult.splice(start,1)
                    })
                }
            })

            searchResult.length > 0?  
                this.setState({
                    resultVisible: true,
                    transparent: false,
                    isEmptyResult:false,
                    searchResult: this.ds.cloneWithRows(searchResult)
                })
            :
                this.setState({
                    resultVisible: false,
                    transparent: true,
                    isEmptyResult:true,
                    searchResult: this.ds.cloneWithRows([])
                })
        } else {
            this.setState({
                resultVisible: false,
                transparent: true,
                isEmptyResult:false,
                searchResult: this.ds.cloneWithRows([])
            })
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
                if(data[i + k])
                    items.push(data[i + k])
            }

            newData.push(items)
            items = []
        }
        return newData
    }

    _getPlayersListByUnion(){
        this.setState({ isLoaded: false })
        getSoticFullPlayerList().then((catchedFullPlayerList) => {
            if (this.isUnMounted) return // return nothing if the component is already unmounted
            if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                //this._getFavoritePlayers(catchedFullPlayerList[this.unionFeed.unionId])
                getEYC3FullPlayerList().then((eyc3CatchedFullPlayerList) => {
                     if (eyc3CatchedFullPlayerList !== null && eyc3CatchedFullPlayerList !== 0 && eyc3CatchedFullPlayerList !== -1) {
                        this._mergeEYC3Player(catchedFullPlayerList[this.unionFeed.unionId],eyc3CatchedFullPlayerList[0]['PlayerList'][this.unionFeed.unionId])
                     }
                 }).catch((error) => {
                     console.log('Error when try to get the EYC3 full player list: ', error)
                 })
            }
        }).catch((error) => {
            this.setState({ isLoaded: true }, () => {
                this._showError(error) // prompt error
            })
        })
    }

    componentDidMount() {
        setTimeout(() => this._getPlayersListByUnion(), 600)
        /*let options = {
            url: this.unionUrl,
            data: {},
            method: 'get',
            onAxiosStart: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isLoaded: false })
            },
            onSuccess: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this._getFavoritePlayers(res.data)
            },
            onError: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                this.setState({ isLoaded: true }, () => {
                    this._showError(res) // prompt error
                })
            }
        }

        service(options)*/
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />
                    {
                        this.state.isLoaded&&
                        <View>
                            <View style={styles.unionsPlayerListingBar}>
                                <ButtonFeedback rounded onPress={()=>this._setSearchModalVisible(true)} label='SEARCH' style={styles.unionsPlayerListingSearchButton} />
                                <ButtonFeedback rounded onPress={()=>{this._setFilterModalVisible(true)}} label='FILTER' style={styles.unionsPlayerListingFilterButton} />
                            </View>
                            {
                                (this.filterBy !== '')&&
                                <View style={styles.unionsPlayerListingFilterByBar}>
                                    <View style={styles.unionsPlayerListingFilterTextView}>
                                        <Text style={styles.unionsPlayerListingFilterByText}>Filter by: {ucWords(this.filterBy)}</Text>
                                        <TouchableOpacity onPress={()=>this._getFilteredPosition('')} style={styles.unionsPlayerListingFilterByCancelButton}>
                                            <Icon name='md-close-circle' style={styles.btnFilterCancelIcon}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </View>
                    }
                    <Content bounces={false}>
                        <FilterListingModal
                            modalVisible={this.state.filterModalVisible}
                            resultVisible={this.state.filteResultVisible}
                            transparent={this.state.transparent}
                            callbackParent={this.onCloseFilter}>
                            <View style={styles.filterResultContainer}>
                                <LinearGradient colors={['#AF001E', '#820417']} style={styles.filterContainer}>
                                    <IosUtilityHeaderBackground />
                                    <MyLionsPlayerListFilter getFilteredPosition={this._getFilteredPosition} filterBy = {this.filterBy}/>
                                </LinearGradient>
                                <ButtonFeedback onPress={()=>this._setFilterModalVisible(false)} style={styles.btnClose}>
                                    <Icon name='md-close' style={styles.btnCloseIcon}/>
                                </ButtonFeedback>
                           </View>
                        </FilterListingModal>

                        <FilterListingModal
                            modalVisible={this.state.modalVisible}
                            resultVisible={this.state.resultVisible}
                            transparent={this.state.transparent}
                            callbackParent={this.onCloseFilter}>

                            <View style={styles.resultContainer}>
                                <View style={styles.resultHeader}>
                                    <IosUtilityHeaderBackground />
                                    <View style={styles.searchContainer}>
                                        <View style={styles.searchBox}>
                                            <Input placeholder='Search for Player' autoCorrect={false} autoFocus={true} onChangeText={(text) =>this._searchPlayer(text)} placeholderTextColor='rgb(128,127,131)' style={styles.searchInput}/>
                                        </View>
                                        <View style={styles.searchBtnBox}>
                                            <ButtonFeedback onPress={()=>this._setSearchModalVisible(false)} style={styles.btnCancel}>
                                                <Icon name='md-close' style={styles.rtnIcon}/>
                                            </ButtonFeedback>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.resultContent}>
                                    {
                                        this.state.isEmptyResult?
                                            <View syles={styles.unionsPlayerEmptySearchMsg}>
                                                <Text style={styles.unionsPlayerEmptySearchTitle}>NO RESULTS FOUND</Text>
                                                <Text style={styles.unionsPlayerEmptySearchSubTitle}>Try entering a different search criteria.</Text>
                                            </View>
                                        :
                                            this.state.resultVisible&&
                                            <ListView
                                                dataSource={this.state.searchResult}
                                                renderRow={this._renderSearch.bind(this)}
                                                enableEmptySections = {true}
                                              />
                                    }
                                </View>
                            </View>
                        </FilterListingModal>
                        {
                            this.state.isLoaded?
                                <View>
                                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.header}>
                                        <Image source={this.unionFeed.logo} style={styles.imageCircle}/>
                                        <Text style={styles.headerTitle}>{this.unionFeed.name}</Text>
                                    </LinearGradient>
                                    <ListView
                                        dataSource={this.state.playerListFeeds}
                                        renderRow={this._renderRow.bind(this)}
                                        enableEmptySections = {true}
                                        contentContainerStyle={styles.gridList}
                                        renderFooter ={this._renderFooter}
                                      />
                                </View>
                            :
                                <ActivityIndicator style={loader.centered} size='large' />
                        }
                    </Content>
                    <EYSFooter mySquadBtn={true}/>
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
        unionFeed: state.content.drillDownItem
    }
}, bindAction)(MyLionsPlayerList)
