
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Modal, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native'
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
import StickyFooter from '../utility/stickyFooter'

class MyLionsPlayerList extends Component {

    constructor(props){
        super(props)

        this.isUnMounted = false
        this.unionFeed = this.props.unionFeed
        this.unionUrl = `https://f3k8a7j4.ssl.hwcdn.net/tools/feeds?id=401&team=${this.unionFeed.unionId}`
        this.favUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/protected/mylionsfavourit?_=1480039224954'
        this.searchResult = []
        this.state = {
            isLoaded: false,
            modalVisible: false,
            transparent: true,
            resultVisible: false,
            playerListFeeds: [],
            favoritePlayers: [],
        }
        this.nameFilter = ''
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
            'An error occured',
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

    _getFavoritePlayers(playersByNation) {
        let playersFeed = playersByNation[this.unionFeed.unionId]
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
                    playerListFeeds: playersFeed,
                    favoritePlayers
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
    }

    _setModalVisible=(visible) => {
        this.setState({
            modalVisible:visible,
            resultVisible:!visible,
            transparent:visible
        })
    }

    onCloseFilter = () => {
        this.setState({
            modalVisible:false,
            transparent: true,
            resultVisible: false
        })
    }

    _searchPlayer = (keywords) => {
        this.searchResult=[]
        //strip out non alpha characters
        let strSearch = keywords.replace(/[^A-Za-z\^\s]/g,'').toLowerCase()
        let strArr = strSearch.split(' ')
        let playerFeeds = this.state.playerListFeeds
        let tempArr = playerFeeds
       
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
            this.searchResult = this.searchResult.concat(playerFeeds.filter((player)=>player.name.toLowerCase().indexOf(strSearch.trim().toLowerCase())===0) )
            
            //split words
            if(strArr.length>0) {
                strArr.map((item,index)=>{
                    this.nameFilter=item
                    console.log('!!!this.nameFilter',this.nameFilter)
            
                    this.searchResult=this.searchResult.concat(
                        playerFeeds.filter(filterName.bind(this))
                    )
                })
            }
            

            //name contain keywords
            this.searchResult=this.searchResult.concat(playerFeeds.filter((player)=>player.name.toLowerCase().indexOf(strSearch.trim().toLowerCase())!==-1) )
            
            //break keywords to single characters and match
            for (let i=0;i<strSearch.length;i++ ) {
                if(strSearch.charAt(i).match(/[A-Z]/gi)) {
                    tempArr=tempArr.filter((player)=>player.name.toLowerCase().indexOf(strSearch.charAt(i).toLowerCase())!==-1) 
                }               
            }

            if (tempArr.length>0) {
                this.searchResult = this.searchResult.concat(tempArr)
            }

            //remove duplicate
            this.searchResult.map((item,index)=>{
                let arr=[]
                for(let j=index+1; j<this.searchResult.length; j++) {                    
                    if(item.id===this.searchResult[j].id){
                        arr=arr.concat(j)
                    }
                }
                if (arr.length>0) {
                    arr.reverse().map((start,index)=>{
                        this.searchResult.splice(start,1)
                    })
                }
            })

            this.searchResult.length > 0?  
                this.setState({
                    resultVisible: true,
                    transparent: false
                }) 
            :
                this.setState({
                    resultVisible: false,
                    transparent: true
                })
        } else {
            this.searchResult = []
            this.setState({
                resultVisible: false,
                transparent: true
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

    componentDidMount() {
        let options = {
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

        service(options)
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    render() {
      // Later on in your styles..

        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />
                    {this.state.isLoaded&&

                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.header}>
                        <Image source={this.unionFeed.logo} style={styles.imageCircle}/>
                        <Text style={styles.headerTitle}>{this.unionFeed.name}</Text>
                        <ButtonFeedback onPress={()=>this._setModalVisible(true)} style={styles.btnSearchPlayer}>
                            <Icon name='md-search' style={styles.searchIcon}/>
                        </ButtonFeedback>
                    </LinearGradient>
                    }

                    <FilterListingModal
                        modalVisible={this.state.modalVisible}
                        resultVisible={this.state.resultVisible}
                        transparent={this.state.transparent}
                        callbackParent={this.onCloseFilter}>

                        <View style={styles.resultContainer}>
                            <View style={styles.searchContainer}>
                                <View style={styles.searchBox}>
                                    <Input placeholder='Search for Player' autoCorrect ={false} autoFocus={true} onChangeText={(text) =>this._searchPlayer(text)} placeholderTextColor='rgb(128,127,131)' style={styles.searchInput}/>
                                </View>
                                <View style={{flex:1}}>
                                    <ButtonFeedback onPress={()=>this._setModalVisible(false)} style={styles.btnCancel}>
                                        <Icon name='md-close' style={styles.rtnIcon}/>
                                    </ButtonFeedback>
                                </View>
                            </View>
                            {this.state.resultVisible&&
                            <ScrollView>
                                {this.searchResult.map((item,index)=>{
                                    return(
                                        <View style={styles.resultRow} key={index}>
                                            <ButtonFeedback style={styles.resultRowBtn} onPress={() => {this._setModalVisible(false),this._showDetail(item,'myLionsPlayerDetails')}}>
                                                <View style={styles.searchImg}>
                                                    <Image transparent
                                                        resizeMode='stretch'
                                                        source={{uri:item.image}}
                                                        style={styles.playerImg}
                                                         />
                                                </View>
                                                <View style={styles.resultDesc}>
                                                    <Text style={styles.resultRowTitleText}>{item.name.toUpperCase()}</Text>
                                                    <Text style={styles.resultRowSubtitleText}>{item.position}</Text>
                                                </View>
                                            </ButtonFeedback>
                                        </View>
                                        )
                                    }, this)
                                }
                            </ScrollView>
                        }
                        </View>
                    </FilterListingModal>
                    {
                        this.state.isLoaded?
                            <Content>
                                <StickyFooter reduceHeight={Platform.OS === 'android'? 370 : 400}>
                                    {
                                        this._mapJSON(this.state.playerListFeeds).map((rowData, index) => {
                                            return (
                                                <Grid key={index}>
                                                    {
                                                        rowData.map((item, key) => {
                                                            let styleGridBoxImgWrapper = (key === 0)? [styles.gridBoxImgWrapper, styles.gridBoxImgWrapperRight] : [styles.gridBoxImgWrapper]
                                                            let styleGridBoxTitle = (key ===  0)? [styles.gridBoxTitle, styles.gridBoxTitleRight] : [styles.gridBoxTitle]
                                                            let union = this.unionFeed.uniondata.find((n)=> n.id === this.unionFeed.unionId)
                                                            Object.assign(item, {
                                                                logo: union.image, 
                                                                country: union.displayname.toUpperCase(),
                                                                countryid: union.id,
                                                                isFav: (this.state.favoritePlayers.indexOf(item.id)!==-1)
                                                            })

                                                            // check if they provide a gif image logo, then convert it to png
                                                            let image = item.image
                                                            if (image.indexOf('125.gif') > 0) {
                                                                image = require(`../../../contents/unions/nations/125.png`)
                                                            } else if (image.indexOf('126.gif') > 0) {
                                                                image = require(`../../../contents/unions/nations/126.png`)
                                                            } else if (image.indexOf('127.gif') > 0) {
                                                                image = require(`../../../contents/unions/nations/127.png`)
                                                            } else if (image.indexOf('128.gif') > 0) {
                                                                image = require(`../../../contents/unions/nations/128.png`)
                                                            } else {
                                                                image = {uri:image}
                                                            } 

                                                            return (
                                                                <Col style={styles.gridBoxCol} key={key}>
                                                                    <ButtonFeedback style={[styles.gridBoxTouchable, styles.gridBoxTouchable]} onPress={() => this._showDetail(item,'myLionsPlayerDetails')}>
                                                                        <View style={styles.gridBoxTouchableView}>
                                                                            <View style={styleGridBoxImgWrapper}>
                                                                                <ImagePlaceholder 
                                                                                    width = {styleVar.deviceWidth / 2}
                                                                                    height = {styleVar.deviceWidth / 2}>
                                                                                    <Image transparent
                                                                                        resizeMode='contain'
                                                                                        source={image}
                                                                                        style={styles.gridBoxImg} />
                                                                                </ImagePlaceholder>
                                                                            </View>
                                                                            <View style={styles.gridBoxDescWrapper}>
                                                                                <View style={[shapes.triangle]} />
                                                                                <View style={styleGridBoxTitle}>
                                                                                    <Text style={styles.gridBoxTitleText}>{item.name.toUpperCase()}</Text>
                                                                                    <Text style={styles.gridBoxTitleSupportText}>{item.position}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </ButtonFeedback>
                                                                </Col>
                                                            )
                                                        }, this)
                                                    }
                                                </Grid>
                                            )
                                        }, this)
                                    }
                                </StickyFooter>
                            </Content>
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
        unionFeed: state.content.drillDownItem
    }
}, bindAction)(MyLionsPlayerList)
