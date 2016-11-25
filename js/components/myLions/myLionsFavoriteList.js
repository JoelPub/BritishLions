
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Modal, ScrollView, Alert, ActivityIndicator } from 'react-native'
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
import { getAccessToken } from '../utility/JWT'
import { fetchContent, drillDown } from '../../actions/content'
import axios from 'axios'
import loader from '../../themes/loader-position'

class MyLionsFavoriteList extends Component {

    constructor(props){
        super(props)
        this.favurl = 'https://api-ukchanges.co.uk/lionsrugby/api/protected/mylionsfavourit?_=1480039224954'
        this.playerid =[]
        this.url = `https://f3k8a7j4.ssl.hwcdn.net/tools/feeds?id=403`
        this.unionFeed=this.props.unionFeed
        this.playerFeed=[]
        this.state = {
            isLoaded: false
        }    
    }
    componentDidMount() {
        getAccessToken().then((token) => {
            if(token!=='') {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                axios.get(
                    this.favurl
                )
                .then(function(response) {
                    if (response.data) {
                        this.playerid=response.data.split('|')
                        this.playerid.map((p,i)=>{
                        })
                        this.props.fetchContent(this.url)
                    } else {
                        Alert.alert(
                            'Access not granted',
                            'Please try again later.',
                            [{text: 'DISMISS'}]
                        )
                    }
                }.bind(this))
                .catch(function(error) {
                        if(error.response.status===401) {
                            Alert.alert(
                                'Your login session expired, please login again',
                                ''+error,
                                [{text:'DISMISS'}]
                                )
                        }
                        else {
                            Alert.alert(
                                'An error occured',
                                '' + error,
                                [{text: 'DISMISS'}]
                            )
                    }
                })

            }
            else {                
                    Alert.alert(
                        'please login',
                        [{text:'DISMISS'}]
                        )
            }
        }).catch((err) => {
                            Alert.alert(
                                'An error occured',
                                '' + error,
                                [{text: 'DISMISS'}]
                            )
        })

    }
    componentWillReceiveProps(nextProps) {
        this.playerFeed=[]
        for (var u in nextProps.playerFeed) {
            if(nextProps.playerFeed[u].length>0) {
                nextProps.playerFeed[u].map((player,index)=>{
                    this.playerid.map((id,j)=>{
                        if(player.id===id) {
                        Object.assign(player,{'countryid':u})
                        this.playerFeed.push(player)
                        }
                    })
                })
            }
        }
 
        this.setState({
            isLoaded: true
        })

    }

    _drillDown(item, route) {
        this.props.drillDown(item,route)
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
                    <Content>
                        {
                            this._mapJSON(this.playerFeed).map((rowData, index) => {
                                return (
                                    <Grid key={index}>
                                        {
                                            rowData.map((item, key) => {
                                                let stylesArr = (key === 0)? [styles.gridBoxTouchable, styles.gridBoxTouchableLeft] : [styles.gridBoxTouchable]
                                                let union=this.unionFeed.find((n)=> n.id==='125')
                                                Object.assign(item,{logo:union.image,country:union.displayname.toUpperCase()})
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
                    </Content>:
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
        fetchContent: (url)=>dispatch(fetchContent(url)),
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect((state) => {
    return {
        unionFeed: state.content.drillDownItem,
        playerFeed: state.content.contentState,
        isLoaded: state.content.isLoaded
    }
}, bindAction)(MyLionsFavoriteList)
