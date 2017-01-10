
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, RefreshControl, ActivityIndicator, Alert, Modal } from 'react-native'
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
import Share from 'react-native-share'
import RNViewShot from 'react-native-view-shot'
import Swiper from 'react-native-swiper'
import BarGraph from '../utility/barGraph'
import BarSlider from '../utility/barSlider'
import SquadModal from '../global/squadModal'
import { getSoticFullPlayerList} from '../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getEYC3FullPlayerList } from '../utility/apiasyncstorageservice/eyc3AsyncStorageService'
import { setPositionToAdd } from '../../actions/position'
import { getUserCustomizedSquad, removeUserCustomizedSquad } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'

class MyLionsSquad extends Component {

    constructor(props){
        super(props)
        this.state={
            isLoaded: false,
            modalVisible: false,
            modalClear:false,
            modalPopulate:false,
            showScoreCard:'semi',
            isSubmitting: false,
            squadDatafeed:{
                    indivPos:[{position:'captain',info:{}},{position:'kicker',info:null},{position:'widecard',info:{}}],
                    forwards:[null,{},null,null,null,null,{},null,null,null,null,null,null,null,null,null],
                    backs:[{},{},null,{},null,{},null,null,null,null,null,null,null,null,null,null],
            },            
            modalContent:this.getModalContent()
        }
        this.isUnMounted = false
        this.uniondata = Data
        this.emptyFeed={
                    indivPos:[{position:'captain',id:null},{position:'kicker',id:null},{position:'widecard',id:null}],
                    forwards:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    backs:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                }
        this.semiFeed={
                    indivPos:[{position:'captain',id:123},{position:'kicker',id:null},{position:'widecard',id:123}],
                    forwards:[null,123,null,null,null,null,123,null,null,null,null,null,null,null,null,null],
                    backs:[123,123,null,123,null,123,null,null,null,null,null,null,null,null,null,null],
        }
        this.fullFeed={
                    indivPos:[{position:'captain',id:123},{position:'kicker',id:123},{position:'widecard',id:123}],
                    forwards:[123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123],
                    backs:[123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123]
        }
    }
    getModalContent(mode){
        switch(mode)  {
            case 'clear' :
                return(
                    <ScrollView style={styles.modalViewWrapper}>
                        <Text style={styles.modalTitleTextCenter}>CLEAR ALL SELECTIONS</Text>
                        <Text style={styles.modalTextCenter}>This will remove all currently assigned players from your squad.</Text>
                        <View style={styles.modalBtnWrapper}>
                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='CANCEL' style={styles.modlaBtnCancel} />
                            <ButtonFeedback rounded onPress={()=>this.changeMode('empty')} label='CONFIRM' style={styles.modlaBtnConfirm}  />
                        </View>
                    </ScrollView>
                )
                break
            case 'populate' :
                return(
                    <ScrollView style={styles.modalViewWrapper}>
                        <Text style={styles.modalTitleTextCenter}>AUTO POPULATE</Text>
                        <Text style={styles.modalTextCenter}>This will auto-populate your squad with a random selection of players.</Text>
                        <View style={styles.modalBtnWrapper}>
                            <ButtonFeedback rounded onPress={()=>this._setModalVisible(false)} label='CANCEL' style={styles.modlaBtnCancel} />
                            <ButtonFeedback rounded onPress={()=>this.changeMode('full')}  label='PROCEED' style={styles.modlaBtnConfirm}  />
                        </View>
                    </ScrollView>
                )
                break
            case 'info' :
                return (
                    <ScrollView style={styles.modalViewWrapper}>
                        <Text style={styles.modalTitleText}>OVERALL RATING</Text>
                        <Text style={styles.modalTextRN}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
                
                        <Text style={styles.modalTitleText}>OVERALL RATING</Text>
                        <Text style={styles.modalTextRN}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
                
                        <Text style={styles.modalTitleText}>OVERALL RATING</Text>
                        <Text style={styles.modalTextRN}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
                
                        <Text style={styles.modalTitleText}>OVERALL RATING</Text>
                        <Text style={styles.modalTextRN}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
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
    shareSnapshot(context,callback){
        this.setState({
            isSubmitting:true
        })
        setTimeout(()=>{
            RNViewShot.takeSnapshot(this.refs['scorecard'],{
                format:'png',
                quality: 1,
                result: 'base64'
            })
            .then(
                res => Share.open({
                    title:context,
                    message:context,
                    subject:context,
                    url: `data:image/png;base64,${res}`
                }).then((info)=>{
                    callback()
                }).catch((errorMessage)=>{
                    console.log("error message: " + error)
                     if(errorMessage !== 'undefined' && errorMessage.error !== 'undefined' && errorMessage.error !== 'User did not share'){
                        alertBox(
                            '',
                            'Image is not shared',
                            'Dismiss'
                        )
                    }
                    callback()
                })
            )
        })
    }

    callback(){
        this.setState({
            isSubmitting:false
        })
    }

    _setModalVisible=(visible,mode) => {
        this.setState({
            modalVisible:visible,
            modalContent:visible?this.getModalContent(mode):this.getModalContent()
        })
    }
    changeMode(mode) {
        this.setState({
            showScoreCard:mode==='empty'?'empty':mode==='semi'?'semi':'full'
        },()=>{            
        this._setModalVisible(false)        
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
                if(data[i + k]!==undefined)
                    items.push(data[i + k])
            }

            newData.push(items)
            items = []
        }
        return newData
    }

    componentDidMount() {
        setTimeout(() => this._getSquad(), 600)
    }

    setSquadData(player,squad){
        console.log('!!!squad',squad)
        squad=squad.replace(/ /g,'').replace(/{/g,'{"').replace(/:/g,'":').replace(/,/g,',"')
        console.log('!!!squad',squad)
        let squadFeed=JSON.parse(squad)
        console.log('!!!squadFeed',squadFeed)
        let tempFeed={
                    indivPos:[{position:'captain',info:null},{position:'kicker',info:null},{position:'widecard',info:null}],
                    forwards:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    backs:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                }
        for(let pos in squadFeed) {
            console.log('!!!pos',pos)
            if(pos==='forwards'||pos==='backs') {
            console.log('!!!forwardsbacks',squadFeed[pos])
                let tempArr=squadFeed[pos].split('|')
                tempArr.map((item,index)=>{
                    tempFeed[pos][index]=this.searchPlayer(player,item)
                })
            }
            else {
                console.log('!!!squadFeed[pos]',squadFeed[pos])
                console.log('!!!index',tempFeed['indivPos'].findIndex((element)=>element.position===pos))
                tempFeed['indivPos'][tempFeed['indivPos'].findIndex((element)=>element.position===pos)].info=this.searchPlayer(player,squadFeed[pos])
            }
        }
        console.log('!!!tempFeed',tempFeed)
        this.setState({
            squadDatafeed:tempFeed
        })
    }

    searchPlayer(player,id) {
        let result=null
        for(let union in player) {
            result=player[union].find((item)=>item.id===id)
            if(result !== undefined) {
                let unionInfo = this.uniondata.find((n)=> n.id===union)
                Object.assign(result, {
                    logo: unionInfo.image, 
                    country: unionInfo.displayname.toUpperCase(),
                    countryid: unionInfo.id
                })

                if(typeof result.image==='string') {
                   if (result.image.indexOf('125.gif') > 0) {
                        result.image = require(`../../../contents/unions/nations/125.png`)
                    } else if (result.image.indexOf('126.gif') > 0) {
                        result.image = require(`../../../contents/unions/nations/126.png`)
                    } else if (result.image.indexOf('127.gif') > 0) {
                        result.image = require(`../../../contents/unions/nations/127.png`)
                    } else if (result.image.indexOf('128.gif') > 0) {
                        result.image = require(`../../../contents/unions/nations/128.png`)
                    } else {
                        result.image = {uri:result.image}
                    } 
                }
                return result
            }
        }
        return result===undefined?null:result
    }

    _getSquad(){
        this.setState({ isLoaded: false })
        getUserCustomizedSquad().then((catchedSquad)=>{
            if(this.isUnMounted) return
            if(catchedSquad.auth) {
                if(catchedSquad.auth === 'Sign In is Required'){
                    this.setState({ isLoaded: true }, () => {
                        this._signInRequired()
                    })
                }
            }else if(catchedSquad.error){
                console.log('final catchedSquad:', JSON.stringify(catchedSquad.error))
                this.setState({ isLoaded: true }, () => {
                    this._showError(catchedSquad.error)
                })
            }else{
                console.log('final catchedSquad:', JSON.stringify(catchedSquad.data))
                    getSoticFullPlayerList().then((catchedFullPlayerList) => {
                        if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                            getEYC3FullPlayerList().then((eyc3CatchedFullPlayerList) => {
                                 if (eyc3CatchedFullPlayerList !== null && eyc3CatchedFullPlayerList !== 0 && eyc3CatchedFullPlayerList !== -1) {
                                    //this._mergeEYC3Player(catchedFullPlayerList[this.unionFeed.unionId],eyc3CatchedFullPlayerList[this.unionFeed.unionId])
                                    console.log('catchedFullPlayerList',catchedFullPlayerList['125'].length)
                                    console.log('eyc3CatchedFullPlayerList',eyc3CatchedFullPlayerList['125'].length)
                                    this.setSquadData(catchedFullPlayerList,catchedSquad.data)
                                    this.setState({ isLoaded: true })
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
        })
        
    }


    componentWillReceiveProps(nextProps) {
        let routes = globalNav.navigator.getCurrentRoutes()
        
        // re render after 'back nav' pressed
        if (!this.isUnMounted && routes[routes.length - 2].id === 'myLionsSquad') {
            this.setState({
                isLoaded: false,
            }, () => {
                setTimeout(()=>{this._getSquad()},600)
            })
        }
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    _showError(error) {
        Alert.alert(
            'An error occured',
            error,
            [{text: 'Dismiss'}]
        )
    }

    _showDetail(item, route) {
        this.props.drillDown(item, route)
    }

    _addPlayer(playerPos) {
        this.props.setPositionToAdd(playerPos)
        this.props.pushNewRoute('myLionsUnionsList')
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />
                    {this.state.isLoaded?
                    <ScrollView>
                        <Text style={[styles.headerTitle,styles.squadTitle]}>MY SQUAD</Text>
                        <ButtonFeedback style={styles.scoreCard} >
                        {this.state.showScoreCard!=='full'?
                            <View style={styles.semiCard}>
                                <Text style={styles.semiCardText}>
                                Complete your full squad of 35 players to receive a real-time squad rating from EY
                                </Text>
                                <View style={styles.semiCardFooter}>
                                    <Text style={styles.semiCardFooterText}> Analytics Sponsored by </Text>
                                    <Image source={require('../../../images/footer/eyLogo.png')}></Image>
                                </View>
                            </View>
                            :
                            <View>
                                <View ref='scorecard' style={styles.fullCard}>
                                    <ButtonFeedback 
                                        onPress={()=>this._setModalVisible(true,'info')}
                                        style={styles.btnCardInfo}>
                                        <Icon name='md-information-circle' style={styles.cardInfoIcon}/>
                                    </ButtonFeedback>
                                    <View style={styles.summaryWrapper}>
                                        <Text style={styles.summaryText}>Congratulations. Your squad has earned the following rating.</Text>
                                        <Text style={styles.summaryTextHighLight}>TOP 5%</Text>
                                    </View>
                                    <View style={styles.ratingWrapper}>
                                        <Text style={styles.ratingTitle}>OVERALL RATING</Text>
                                        <View style={styles.ratingScore}>
                                            <Text style={styles.ratingScorePoint}>350</Text>
                                        </View>
                                    </View>
                                    <View style={styles.barGraphWrapper}>
                                        <Text style={styles.barGraphText}>COHESION</Text>
                                        <BarGraph score={86} fullWidth={styleVar.deviceWidth-150} />
                                    </View>
                                    <View style={styles.barSliderWrapper}>
                                        <View style={styles.barSliderTextWrapper}>
                                            <Text style={styles.barSliderText}>ATTACK</Text>
                                            <Text style={styles.barSliderText}>DEFENCE</Text>
                                        </View>
                                        <BarSlider score={30} fullWidth={styleVar.deviceWidth-100} />
                                    </View>
                                    <View style={styles.scoreCardShareWrapper}>
                                        <ButtonFeedback
                                            rounded label='Share'
                                            disabled = {this.state.isSubmitting}
                                            onPress={ ()=> this.shareSnapshot('scorecard',this.callback.bind(this)) }
                                            style={[styles.button,styles.scoreCardShare]}>
                                            <Text  style={styles.scoreCardShareText}>SHARE</Text>
                                            <Icon name='md-share-alt' style={styles.scoreCardShareIcon} />
                                        </ButtonFeedback>
                                    </View>
                                    <View style={styles.scoreCardFooter}>
                                        <Image source={require('../../../images/footer/eyLogo.png')} style={styles.scoreCardFooterImg}></Image>
                                    </View>
                                </View>

                                <ButtonFeedback rounded style={[styles.button,styles.btnExpertSquad]}>
                                    <Icon name='md-contact' style={styles.btnExpertIcon} />
                                    <Text style={styles.btnExpertLabel}>THE EXPERTS' SQUADS</Text>
                                </ButtonFeedback>
                            </View>
                        }
                        </ButtonFeedback>
                        {
                            this.state.showScoreCard==='empty'?
                            <ButtonFeedback rounded label='AUTO POPULATE' style={styles.button} onPress={()=>this._setModalVisible(true,'populate')} />
                            :
                            <ButtonFeedback rounded label='CLEAR ALL SELECTIONS' style={styles.button} onPress={()=>this._setModalVisible(true,'clear')} />
                        }
                        <ScrollView >
                            <View style={styles.individaulPositionRow}>
                            {
                                this.state.squadDatafeed.indivPos.map((item,index)=>{
                                    return (
                                        <View style={styles.indivPosition} key={index}>
                                            <View style={styles.indivPosTitle}>
                                                <Text style={styles.indivPosTitleText}>{item.position.toUpperCase()}</Text>
                                            </View>
                                            {
                                            item.info===null?
                                            <ButtonFeedback onPress={() => this._addPlayer(item.position)}  style={styles.posBtn}>
                                                <View style={styles.addIndivPlayerWrapper}>
                                                    <Icon name='md-person-add' style={styles.addPlayerIcon} />
                                                </View>
                                                <View style={styles.indivPlayerNameWrapper}>
                                                    <View style={[shapes.triangle]} />
                                                    <View style={styles.titleBox}>
                                                        <Text style={styles.playerNameText}>ADD</Text>
                                                        <Text style={styles.playerNameText}>{item.position.toUpperCase()}</Text>
                                                        </View>
                                                </View>
                                            </ButtonFeedback>
                                            :
                                            <ButtonFeedback onPress={() => this._showDetail(item.info,'myLionsPlayerDetails')}  style={styles.posBtn}>
                                                <ImagePlaceholder 
                                                    width = {styleVar.deviceWidth / 3}
                                                    height = {styleVar.deviceWidth / 3}>
                                                    <Image transparent
                                                        resizeMode='contain'
                                                        source={item.info.image} 
                                                        style={styles.playerImage} />
                                                </ImagePlaceholder>
                                                <View style={styles.indivPlayerNameWrapper}>
                                                    <View style={[shapes.triangle]} />
                                                    <View style={styles.titleBox}>
                                                        <Text numberOfLines={2} style={styles.playerNameText}>{item.info.name.toUpperCase()}</Text>
                                                    </View>
                                                </View>
                                            </ButtonFeedback>
                                            }
                                        </View>
                                    )
                                },this) 
                            }                                
                            </View> 
                            <View style={styles.posTitle}>
                              <Text style={styles.posTitleLeft}>FORWARDS</Text>
                              <Text style={styles.posTitleRight}>
                               {this.state.squadDatafeed.forwards.filter((value)=>value!==null).length} / 16
                              </Text>
                            </View>
                            <Swiper
                            ref='swiper'
                            height={styleVar.deviceWidth*0.63}
                            loop={false}
                            dotColor='rgba(255,255,255,0.3)'
                            activeDotColor='rgb(239,239,244)'
                            paginationStyle={{bottom:styleVar.deviceWidth/20}}>
                            {
                            this._mapJSON(this.state.squadDatafeed.forwards,3).map((rowData,i)=>{
                                return(
                                    <View style={styles.posSwiperRow} key={i}>
                                        {
                                            rowData.map((item,index)=>{
                                                return(
                                                        item===null?
                                                        <View style={styles.posWrapper} key={index}>
                                                            <ButtonFeedback onPress={() => this._addPlayer('forwards')}  style={styles.posBtn}>
                                                                <View style={styles.posAddWrapper}>
                                                                    <Icon name='md-person-add' style={styles.addPlayerIcon} />
                                                                </View>
                                                                <View style={styles.posAddTextWrapper}>
                                                                    <View style={[shapes.triangle]} />
                                                                    <View style={styles.titleBox}>
                                                                        <Text style={styles.playerNameText}>ADD</Text>
                                                                        <Text style={styles.playerNameText}>FORWARD</Text>
                                                                        </View>
                                                                </View>
                                                            </ButtonFeedback>
                                                        </View>
                                                        :
                                                        <View style={styles.posWrapper} key={index}>
                                                            <ButtonFeedback onPress={() => this._showDetail(item,'myLionsPlayerDetails')} style={styles.posBtn}>
                                                                <ImagePlaceholder 
                                                                    width = {styleVar.deviceWidth / 3}
                                                                    height = {styleVar.deviceWidth / 3}>
                                                                    <Image transparent
                                                                        resizeMode='contain'
                                                                        source={item.image}
                                                                        style={styles.playerImage} />
                                                                </ImagePlaceholder>
                                                                <View style={styles.playerNameTextWrapper}>
                                                                    <View style={[shapes.triangle]} />
                                                                    <View style={styles.titleBox}>
                                                                         <Text numberOfLines={2} style={styles.playerNameText}>{item.name.toUpperCase()}</Text>
                                                                        </View>
                                                                </View>
                                                            </ButtonFeedback>
                                                        </View>
                                                    )
                                            }, this)
                                        }
                                    </View>
                                )

                            },this)
                            }

                        </Swiper>
                            
                            <View style={styles.posTitle}>
                              <Text style={styles.posTitleLeft}>BACKS</Text>
                              <Text style={styles.posTitleRight}>
                               {this.state.squadDatafeed.backs.filter((value)=>value!==null).length} / 16
                              </Text>
                            </View>
                            <Swiper
                            ref='swiper'
                            height={styleVar.deviceWidth*0.63}
                            loop={false}
                            dotColor='rgba(255,255,255,0.3)'
                            activeDotColor='rgb(239,239,244)'
                            paginationStyle={{bottom:styleVar.deviceWidth/20}}>
                            {
                            this._mapJSON(this.state.squadDatafeed.backs,3).map((rowData,i)=>{
                                return(
                                    <View style={styles.posSwiperRow} key={i}>
                                        {
                                            rowData.map((item,index)=>{
                                                return(
                                                        item===null?
                                                        <View style={styles.posWrapper} key={index}>
                                                            <ButtonFeedback onPress={() => this._addPlayer('backs')} style={styles.posBtn}>
                                                                <View style={styles.posAddWrapper}>
                                                                    <Icon name='md-person-add' style={styles.addPlayerIcon} />
                                                                </View>
                                                                <View style={styles.playerNameTextWrapper}>
                                                                    <View style={[shapes.triangle]} />
                                                                    <View style={styles.titleBox}>
                                                                        <Text style={styles.playerNameText}>ADD</Text>
                                                                        <Text style={styles.playerNameText}>BACK</Text>
                                                                        </View>
                                                                </View>
                                                            </ButtonFeedback>
                                                        </View>
                                                        :
                                                        <View style={styles.posWrapper} key={index}>
                                                            <ButtonFeedback onPress={() => this._showDetail(item,'myLionsPlayerDetails')} style={styles.posBtn}>
                                                                <ImagePlaceholder 
                                                                    width = {styleVar.deviceWidth / 3}
                                                                    height = {styleVar.deviceWidth / 3}>
                                                                    <Image transparent
                                                                        resizeMode='contain'
                                                                        source={item.image}
                                                                        style={styles.playerImage} />
                                                                </ImagePlaceholder>
                                                                <View style={styles.playerNameTextWrapper}>
                                                                    <View style={[shapes.triangle]} />
                                                                    <View style={styles.titleBox}>
                                                                         <Text numberOfLines={2} style={styles.playerNameText}>{item.name.toUpperCase()}</Text>
                                                                        </View>
                                                                </View>
                                                            </ButtonFeedback>
                                                        </View>
                                                    )
                                            }, this)
                                        }
                                    </View>
                                )

                            },this)
                            }

                        </Swiper>
                            <LionsFooter isLoaded={true} />
                    </ScrollView>
                    </ScrollView>
                    :
                        <ActivityIndicator style={loader.centered} size='large' />
                }
                    <EYSFooter mySquadBtn={true}/>
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
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted)),
        setPositionToAdd:(position)=>dispatch(setPositionToAdd(position))
    }
}

export default connect((state) => {
    return {
        route: state.route,
    }
}, bindAction)(MyLionsSquad)

