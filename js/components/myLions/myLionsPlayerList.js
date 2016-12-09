
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Modal, ScrollView, ActivityIndicator } from 'react-native'
import { getUnionDetail,showDetail} from '../../actions/player'
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
import styleVar from '../../themes/variable'
import FilterListingModal from '../global/filterListingModal'
import loader from '../../themes/loader-position'
import { alertBox } from './../utility/alertBox'
import {getNetinfo} from '../utility/network'


class MyLionsPlayerList extends Component {

    constructor(props){
        super(props)
        this.unionFeed=this.props.unionFeed
        this.unionUrl = `https://f3k8a7j4.ssl.hwcdn.net/tools/feeds?id=401&team=${this.unionFeed.unionId}`
        this.favUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/protected/mylionsfavourit?_=1480039224954'
        this.playerFeed=[]
        this.searchResult=[]
        this.playerList = []
        this.state = {
            isLoaded: false,
            modalVisible: false,
            transparent: true,
            resultVisible: false
        }

    }

    _showDetail(item, route) {
        this.props.showDetail(item,route)
    }

    getUnionDetail(connectionInfo) {
                if(connectionInfo==='NONE') {
                    this.setState({
                        isLoaded:true,
                        isRefreshing:false
                    })
                    alertBox(
                      'An Error Occured',
                      'Please make sure the network is connected and reload the app. ',
                      'Dismiss'
                    )
                }
                else {
                    this.props.getUnionDetail(this.unionUrl,this.favUrl)
                }
               
    }

    componentDidMount() {
        if(this.props.connectionInfo===null||this.props.connectionInfo==='NONE') {
            getNetinfo(this.getUnionDetail.bind(this))
        } 
        else {       
            this.getUnionDetail(this.props.connectionInfo)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.playerFeed=nextProps.playerFeed[this.unionFeed.unionId]
        this.setState({
            isLoaded: true
        })
        
        this.playerList=nextProps.playerList.split('|')

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

    searchPlayer = (keywords) => {
        this.searchResult=[]
        let tempArr=this.playerFeed
            if(keywords.trim()!=='') {
            this.searchResult=this.searchResult.concat(this.playerFeed.filter((player)=>player.name.toLowerCase().indexOf(keywords.trim().toLowerCase())===0) )
            this.searchResult=this.searchResult.concat(this.playerFeed.filter((player)=>player.name.toLowerCase().indexOf(keywords.trim().toLowerCase())!==-1) )
            for (let i=0;i<keywords.length;i++ ) {
                if(keywords.charAt(i).match(/[A-Z]/gi)) {
                    tempArr=tempArr.filter((player)=>player.name.toLowerCase().indexOf(keywords.charAt(i).toLowerCase())!==-1) 
                }               
            }
            if (tempArr.length>0) {
                this.searchResult=this.searchResult.concat(tempArr)
            }

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
            this.searchResult.length>0?  
                this.setState({
                    resultVisible:true,
                    transparent:false
                }) 
                :this.setState({
                    resultVisible:false,
                    transparent:true
                })
        }
        else {
            this.searchResult=[]
            this.setState({
                    resultVisible:false,
                    transparent:true
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

    render() {
      // Later on in your styles..

        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />
                    {this.state.isLoaded&&

                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.header}>
                        <Image source={this.unionFeed.logo} style={styles.imageCircle}/>
                        <Text style={styles.headerTitle}>{this.name}</Text>
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
                                    <Input placeholder='Search for Player' autoFocus={true} onChangeText={(text) =>this.searchPlayer(text)} placeholderTextColor='rgb(128,127,131)' style={styles.searchInput}/>
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
                    </FilterListingModal >
                {
                    this.state.isLoaded?
                    <Content>

                    {
                            this._mapJSON(this.playerFeed).map((rowData, index) => {
                                return (
                                    <Grid key={index}>
                                        {
                                            rowData.map((item, key) => {
                                                let styleGridBoxImgWrapper = (key === 0)? [styles.gridBoxImgWrapper, styles.gridBoxImgWrapperRight] : [styles.gridBoxImgWrapper]
                                                let styleGridBoxTitle = (key ===  0)? [styles.gridBoxTitle, styles.gridBoxTitleRight] : [styles.gridBoxTitle]
                                                let union=this.unionFeed.uniondata.find((n)=> n.id===this.unionFeed.unionId)
                                                Object.assign(item, {
                                                    logo: union.image, 
                                                    country: union.displayname.toUpperCase(),
                                                    isFav: (this.playerList.indexOf(item.id)!==-1)
                                                })

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
                    </Content>:
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
        getUnionDetail: (unionUrl,favUrl)=>dispatch(getUnionDetail(unionUrl,favUrl)),
        showDetail: (data, route)=>dispatch(showDetail(data, route)),
    }
}

export default connect((state) => {
    return {
        unionFeed: state.player.union,
        playerList: state.player.playerList,
        playerFeed: state.player.playerDetail,
        isLoaded: state.player.isLoaded,
        connectionInfo: state.network.connectionInfo
    }
}, bindAction)(MyLionsPlayerList)
