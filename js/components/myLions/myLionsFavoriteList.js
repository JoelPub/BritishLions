
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Modal, ScrollView, RefreshControl, ActivityIndicator, Alert } from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import { replaceRoute,pushNewRoute } from '../../actions/route'
import styleVar from '../../themes/variable'
import { getFavDetail , showDetail, INVALID_TOKEN} from '../../actions/player'
import loader from '../../themes/loader-position'
import { alertBox } from '../utility/alertBox'
import refresh from '../../themes/refresh-control'
import { setAccessGranted } from '../../actions/token'
import { removeToken } from '../utility/asyncStorageServices'

class MyLionsFavoriteList extends Component {

    constructor(props){
        super(props)
        this.favUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/protected/mylionsfavourit?_=1480039224954'
        this.playerFullUrl = 'https://f3k8a7j4.ssl.hwcdn.net/tools/feeds?id=403'
        this.unionFeed=this.props.unionFeed
        this.playerids =[]
        this.playerFeed=[]
        this.state = {
            isRefreshing: false,
            isLoaded: false
        }
    }
    componentDidMount() {
        this.props.getFavDetail(this.favUrl,this.playerFullUrl,this.errCallback.bind(this))
    }
    _onRefresh() {
        this.setState({isRefreshing: true})
        this.props.getFavDetail(this.favUrl,this.playerFullUrl,this.errCallback.bind(this))
    }
    _reLogin() {
        removeToken()
        this.props.setAccessGranted(false)
        this.replaceRoute('login')
    }

    replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    _signInRequired() {
        Alert.alert(
            'An error occured',
            'Please sign in your account first.',
            [{
                text: 'SIGN IN', 
                onPress: this._reLogin.bind(this)
            }]
        )
    }

    errCallback(error) {
    if(error===INVALID_TOKEN||error&&error.response&&error.response.status=== 401) {
        this._signInRequired()
    }
    else {
        alertBox(
                    'An Error Occured',
                    'Something went wrong with your request. Please try again later.',
                    'Dismiss'
                )
    }
        this.setState({
                isLoaded: true,
                isRefreshing: false,
            })

    }

    componentWillReceiveProps(nextProps) {
            this.setState({
                isLoaded: true,
                isRefreshing: this.props.isRefreshing,
            })
            this.playerFeed=[]
            this.playerids=nextProps.playerList.split('|')
            for (var u in nextProps.playerFeed) {
                if(nextProps.playerFeed[u].length>0) {
                    nextProps.playerFeed[u].map((player,index)=>{
                        this.playerids.map((id,j)=>{
                            if(player.id===id) {
                            Object.assign(player,{'countryid':u})
                            this.playerFeed.push(player)
                            }
                        })
                    })
                }
            }
    }

    _showDetail(item, route) {
        this.props.showDetail(item,route)
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
                    <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={()=> { this._onRefresh() }}
                                        tintColor = {refresh.tintColor}
                                        title = {refresh.title}
                                        titleColor = {refresh.titleColor}
                                        colors = {refresh.colors}
                                        progressBackgroundColor = {refresh.background}
                                    />
                            }>
                            <Content>
                        {
                            this._mapJSON(this.playerFeed).map((rowData, index) => {
                                return (
                                    <Grid key={index}>
                                        {
                                            rowData.map((item, key) => {
                                                let styleGridBoxImgWrapper = (key === 0)? [styles.gridBoxImgWrapper, styles.gridBoxImgWrapperRight] : [styles.gridBoxImgWrapper]
                                                let styleGridBoxTitle = (key ===  0)? [styles.gridBoxTitle, styles.gridBoxTitleRight] : [styles.gridBoxTitle]
                                                let union=this.unionFeed.uniondata.find((n)=> n.id===item.countryid)
                                                Object.assign(item, {
                                                    logo: union.image, 
                                                    country: union.displayname.toUpperCase(),
                                                    isFav: true
                                                })
                                                
                                                return (
                                                    <Col style={styles.gridBoxCol} key={key}>
                                                        <ButtonFeedback style={[styles.gridBoxTouchable, styles.gridBoxTouchableLeft]} onPress={() => this._showDetail(item,'myLionsPlayerDetails')}>
                                                            <View style={styles.gridBoxTouchableView}>
                                                                <View style={styleGridBoxImgWrapper}>
                                                                    <ImagePlaceholder 
                                                                        width = {styleVar.deviceWidth / 2}
                                                                        height = {styleVar.deviceWidth / 2}>
                                                                        <Image transparent
                                                                            resizeMode='contain'
                                                                            source={{uri:item.image}}
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
                        <LionsFooter isLoaded={true} />
                    </Content>
                    </ScrollView>:
                        <ActivityIndicator style={loader.centered} size='large' />
                    }
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        getFavDetail: (favUrl,playerFullUrl,errorCallbck) =>dispatch(getFavDetail(favUrl,playerFullUrl,errorCallbck)),
        showDetail: (data, route)=>dispatch(showDetail(data, route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}

export default connect((state) => {
    return {
        unionFeed: state.player.union,
        playerList: state.player.playerList,
        playerFeed: state.player.playerDetail,
        isLoaded: state.player.isLoaded,
        isRefreshing: state.player.isRefreshing
    }
}, bindAction)(MyLionsFavoriteList)
