
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Modal, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import { pushNewRoute } from '../../actions/route'
import styleVar from '../../themes/variable'
import { drillDown } from '../../actions/content'
import { getFavDetail } from '../../actions/player'
import loader from '../../themes/loader-position'
import { alertBox } from '../utility/alertBox'
import Data from '../../../contents/unions/data'
import refresh from '../../themes/refresh-control'

class MyLionsFavoriteList extends Component {

    constructor(props){
        super(props)
        this.favUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/protected/mylionsfavourit?_=1480039224954'
        this.playerFullUrl = 'https://f3k8a7j4.ssl.hwcdn.net/tools/feeds?id=403'
        this.unionFeed=Data
        this.playerids =[]
        this.playerFeed=[]
        this.state = {
            isRefreshing: false,
            isLoaded: false
        }    
    }
    componentDidMount() {
        this.props.getFavDetail(this.favUrl,this.playerFullUrl,this.errCallback)
    }
    _onRefresh() {
        this.setState({isRefreshing: true})
        this.props.getFavDetail(this.favUrl,this.playerFullUrl,this.errCallback)
    }
    errCallback() {
        alertBox(
                    'An Error Occured',
                    'Please login',
                    'Dismiss'
                )

    }
    componentWillUnmount() {
        this.setState({
            isLoaded: false
        })
    }
    componentWillReceiveProps(nextProps) {
        
        if(nextProps.playerFeed!== undefined&&nextProps.playerFeed.tokenData!== undefined) {
            
            this.setState({
                isLoaded: true,
                isRefreshing: this.props.isRefreshing,
            })
            this.playerFeed=[]
            this.playerids=nextProps.playerFeed.tokenData.split('|')
            for (var u in nextProps.playerFeed.soticData) {
                if(nextProps.playerFeed.soticData[u].length>0) {
                    nextProps.playerFeed.soticData[u].map((player,index)=>{
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
 

    }

    _drillDown(item, route) {
        this.props.drillDown(item,route)
        this.setState({
            isLoaded: false
        })
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
                    <Image resizeMode='cover' source={require('../../../images/gradient-bg.jpg')} style={styles.header}>
                        <ImageCircle
                            size={100}
                            containerStyle={styles.imageCircle}
                            containerBgColor='#fff'
                            containerPadding={20}
                            src={require('../../../contents/my-lions/nations/lions.png')} />

                        <Text style={styles.headerTitle}>MY LIONS</Text>
                    </Image>

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
                                                let stylesArr = (key === 0)? [styles.gridBoxTouchable, styles.gridBoxTouchableLeft] : [styles.gridBoxTouchable]
                                                let union=this.unionFeed.find((n)=> n.id===item.countryid)
                                                Object.assign(item,{logo:union.image,country:union.displayname.toUpperCase(),isFav:true})
                                                return (
                                                    <Col style={styles.gridBoxCol} key={key}>
                                                        <ButtonFeedback style={[styles.gridBoxTouchable, styles.gridBoxTouchableLeft]} onPress={() => this._drillDown(item,'myLionsPlayerDetails')}>
                                                            <View style={styles.gridBoxTouchableView}>
                                                                <View style={styles.gridBoxImgWrapper}>
                                                                    <ImagePlaceholder 
                                                                        width = {styleVar.deviceWidth / 2 - 1}
                                                                        height = {styleVar.deviceWidth / 2}>
                                                                        <Image transparent
                                                                            resizeMode='contain'
                                                                            source={{uri:item.image}}
                                                                            style={styles.gridBoxImg} />
                                                                    </ImagePlaceholder>
                                                                </View>
                                                                <View style={styles.gridBoxDescWrapper}>
                                                                    <View style={[shapes.triangle]} />
                                                                    <View style={styles.gridBoxTitle}>
                                                                        <Text style={styles.gridBoxTitleText}>{item.name}</Text>
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
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect((state) => {
    return {
        unionFeed: state.content.drillDownItem,
        playerFeed: state.player.contentState,
        isLoaded: state.player.isLoaded,
        isRefreshing: state.player.isRefreshing
    }
}, bindAction)(MyLionsFavoriteList)
