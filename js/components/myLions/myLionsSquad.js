
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, RefreshControl, ActivityIndicator, Alert, Modal } from 'react-native'
import { Container, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LoginRequire from '../global/loginRequire'
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
import { removeToken, getUserId } from '../utility/asyncStorageServices'
import { service } from '../utility/services'
import Data from '../../../contents/unions/data'
import { globalNav } from '../../appNavigator'
import Swiper from 'react-native-swiper'
import SquadModal from '../global/squadModal'
import { getSoticFullPlayerList} from '../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getEYC3FullPlayerList, removeEYC3FullPlayerList } from '../utility/apiasyncstorageservice/eyc3AsyncStorageService'
import { getUserCustomizedSquad, removeUserCustomizedSquad } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import { setPositionToAdd } from '../../actions/position'
import { getAssembledUrl } from '../utility/urlStorage'
import PlayerScore from '../global/playerScore'
import SquadPopModel from  'modes/SquadPop'
import Rating from  'modes/SquadPop/Rating'
import SquadModel from  'modes/Squad'
import SquadShowModel from  'modes/Squad/SquadShowModel'
import SquadRatingModel from 'modes/Squad/Rating'
import Immutable, { Map, List } from 'immutable'
import Cursor from 'immutable/contrib/cursor'

const AddPlayerCell = ({pos,onPress})=>(
    <ButtonFeedback  onPress= {onPress}  style={styles.posBtn}>
        <View style={styles.posAddWrapper}>
            <Icon name='md-person-add' style={styles.addPlayerIcon} />
        </View>
        <View style={styles.playerNameTextWrapper}>
            <View style={[shapes.triangle]} />
            <View style={styles.titleBox}>
                <Text style={styles.playerNameText}>ADD</Text>
                <Text style={styles.playerNameText}>
                    { pos.toUpperCase() === 'WILDCARD'? 'STAR' : pos.toUpperCase() }
                </Text>
                </View>
        </View>
    </ButtonFeedback>
    )
const PlayerImgCell =({data,onPress}) =>(
    <ButtonFeedback onPress={onPress} style={styles.posBtn}>
        <ImagePlaceholder 
            width = {styleVar.deviceWidth / 3}
            height = {styleVar.deviceWidth / 3}>
            <Image transparent
                resizeMode='contain'
                source={data.image}
                style={styles.playerImage} />
        </ImagePlaceholder>
        <View style={styles.playerNameTextWrapper}>
            <View style={[shapes.triangle]} />
            <View style={styles.titleBox}>
                <Text style={styles.playerNameText} numberOfLines={1}>{data.name&&data.name.toUpperCase().substring(0, data.name.lastIndexOf(" "))}</Text>
                <Text style={styles.playerNameText} numberOfLines={1}>{data.name&&data.name.toUpperCase().substring(data.name.lastIndexOf(" ")+1, data.name.length)}</Text>
            </View>
        </View>
    </ButtonFeedback>
    )
const PositionTitle =({pos,data}) =>(
    <View style={styles.posTitle}>
      <Text style={styles.posTitleLeft}>{pos.toUpperCase()}</Text>
      <Text style={styles.posTitleRight}>
       {data.filter((value)=>value!==null).length} / {data.length}
      </Text>
    </View>
)
class MyLionsSquad extends Component {

    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.state={
            isLoaded: false,
            isScoreLoaded: false,
            modalVisible: false,
            modalClear:false,
            modalPopulate:false,
            showScoreCard:'semi',
            isSubmitting: false,
            squadDatafeed:SquadShowModel().toJS(),            
            modalContent:this.getModalContent(),
            rating:Rating().toJS(),
            userID:'',
        }
        this.isUnMounted = false
        this.uniondata = Data
        this.fullPlayerList={}
        this.saveSquadUrl=getAssembledUrl('SaveGoodFormUserCustomizedSquad')
        this.autoPopulatedSquadUrl=getAssembledUrl('EYC3AutoPopulatedSquad')
        this.getMySquadRatingUrl=getAssembledUrl('EYC3GetMySquadRating')
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
                            <ButtonFeedback rounded onPress={()=>this.clearSelection()} label='CONFIRM' style={styles.modlaBtnConfirm}  />
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
                            <ButtonFeedback rounded onPress={()=>this.autoPop()}  label='PROCEED' style={styles.modlaBtnConfirm}  />
                        </View>
                    </ScrollView>
                )
                break
            case 'info' :
                return (
                    <ScrollView style={styles.modalViewWrapper}>
                        <Text style={styles.modalTitleText}>Overall Rating</Text>
                        <Text style={styles.modalTextRN}>To provide an overall rating for the players EYC3 took the results of 720 games played in 2015/2016 looking at Internationals and top tier club rugby. In addition, as new games are played including the 6 Nations Tournament, player performance will actively update their rating.</Text>
                            
                        <Text style={[styles.modalTextRN, styles.modalTextMTop]}>For each of these games there are over 150 features collected on player performance. Using advanced analytic techniques EYC3 identified the 30 most influential factors in a team winning a game. These factors were split into Defensive and Attacking attributes and weighted by position. i.e. A fullback doesn’t have influence in scrums being won or lost but does contribute to team metres gained.</Text>
                        
                        <Text style={styles.modalTitleText}>Your Squad Ranking</Text>
                        <Text style={styles.modalTextRN}>Your squad score will take into account all the ratings of your individual players and allows you to choose which players ratings you want to boost by nominating a Captain, Kicker and a Star player (the player you nominate as your best performer).</Text>
                
                        <Text style={styles.modalTitleText}>Cohesion</Text>
                        <Text style={styles.modalTextRN}>Rugby is a team sport, the more familiar your player’s are with each other the better they will perform in a game. EYC3 has developed an algorithim to rate the cohesion of your squad based on international and top tier club rugby games over the last two years.</Text>
                
                        <Text style={styles.modalTitleText}>Attack / Defence</Text>
                        <Text style={styles.modalTextRN}>Players are individually rated on their defensive and attacking abilities. Your team will be analysed to see if it’s strength lies in attack or defense or you have created a more balanced team.</Text>
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

    _setModalVisible=(visible,mode) => {
        this.setState({
            modalVisible:visible,
            modalContent:visible?this.getModalContent(mode):this.getModalContent()
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

    componentWillUnmount() {
        this.isUnMounted = true
    }

    componentWillMount() {
        getUserId().then((userID) => {
            this.setState({userID})
        }).catch((error) => {})
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

    _myExpertsPick = () => {
        this.props.drillDown({}, 'myLionsExpertsList')
    }

    isPlainObj (value) {
      return value && (value.constructor === Object || value.constructor === undefined)
    }


    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        back={true} 
                        title='MY LIONS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    {
                        this.state.isLoaded?
                            <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                                <Text style={[styles.headerTitle,styles.squadTitle]}>MY SQUAD</Text>
                                <PlayerScore isLoaded={this.state.isScoreLoaded} rating={this.state.rating} showScoreCard={this.state.showScoreCard} pressInfo={this._setModalVisible.bind(this)} pressExpert={this._myExpertsPick.bind(this)}/>
                                {
                                    this.state.showScoreCard==='empty'?
                                    <ButtonFeedback rounded label='AUTO POPULATE' style={styles.button} onPress={()=>this._setModalVisible(true,'populate')} />
                                    :
                                    <ButtonFeedback rounded label='CLEAR ALL SELECTIONS' style={styles.button} onPress={()=>this._setModalVisible(true,'clear')} />
                                }
                                <View>
                                    <View style={styles.individaulPositionRow}>
                                    {
                                        this.state.squadDatafeed.indivPos.map((item,index)=>{
                                            let position = item.position.toUpperCase()
                                            return (
                                                <View style={styles.indivPosition} key={index}>
                                                    <View style={styles.indivPosTitle}>
                                                        <Text style={styles.indivPosTitleText}>
                                                            { position === 'WILDCARD'? 'STAR' : position }
                                                        </Text>
                                                    </View>
                                                    {
                                                    item.info===null?
                                                    <AddPlayerCell pos={item.position} onPress = {() => this._addPlayer(item.position)}/>
                                                    :
                                                    <PlayerImgCell data={item.info} onPress = {() => this._showDetail(item.info,'myLionsPlayerDetails')}/>
                                                    }
                                                </View>
                                            )
                                        },this) 
                                    }                                
                                    </View>

                                    <PositionTitle pos='FORWARDS' data={this.state.squadDatafeed.forwards}/>
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
                                                                        <View style={styles.posWrapper} key={index}>
                                                                            {   
                                                                                item===null?
                                                                                <AddPlayerCell pos='FORWARDS' onPress = {() => this._addPlayer('forwards')}/>
                                                                                :
                                                                                <PlayerImgCell data={item} onPress = {() => this._showDetail(item,'myLionsPlayerDetails')}/>
                                                                            }
                                                                        </View>
                                                                    )
                                                            }, this)
                                                        }
                                                    </View>
                                                )

                                            },this)
                                        }

                                    </Swiper>
                                    
                                    <PositionTitle pos='BACKS' data={this.state.squadDatafeed.backs}/>
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
                                                                    <View style={styles.posWrapper} key={index}>
                                                                    {
                                                                        item===null?                                                        
                                                                           <AddPlayerCell pos='BACKS' onPress = {() => this._addPlayer('backs')}/>
                                                                        :
                                                                            <PlayerImgCell data={item} onPress = {() => this._showDetail(item,'myLionsPlayerDetails')}/>
                                                                    }
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
                                </View>
                            </ScrollView>
                        :
                            <ActivityIndicator style={loader.centered} size='large' />
                    }
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
                    <SquadModal
                        modalVisible={this.state.modalVisible}
                        callbackParent={this._setModalVisible}>
                            {this.state.modalContent}
                    </SquadModal>
                </View>
            </Container>
        )
    }

    componentDidMount() {
        setTimeout(() => this._getSquad(), 600)        
    }

    componentWillReceiveProps(nextProps) {
        let routes = globalNav.navigator.getCurrentRoutes()
        
        // re render after 'back nav' pressed
            if (!this.isUnMounted && nextProps.route.routes[nextProps.route.routes.length-1]==='myLionsSquad') {
            this.setState({
                isLoaded: false,
            }, () => {
                setTimeout(()=>{this._getSquad()},600)
            })
        }
    }

    _getSquad(){
        if (this.isUnMounted) return // return nothing if the component is already unmounted
            
        this.setState({ isLoaded: false })
        getUserCustomizedSquad().then((catchedSquad)=>{
            if(catchedSquad.auth) {
                if(catchedSquad.auth === 'Sign In is Required'){
                    this.setState({ isLoaded: true }, () => {
                        this._signInRequired()
                    })
                }
            }else if(catchedSquad.error){
                this.setState({ isLoaded: true }, () => {
                    this._showError(catchedSquad.error)
                })
            }else{
                getSoticFullPlayerList().then((catchedFullPlayerList) => {
                    if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                        this.fullPlayerList=catchedFullPlayerList
                                this.setSquadData(SquadModel.format(eval(`(${catchedSquad.data})`)))
                    }
                }).catch((error) => {
                    this.setState({ isLoaded: true }, () => {
                        this._showError(error) // prompt error
                    })
                })
            }
        })      
    }

    setSquadData(squad,isPop){
        let tempFeed=new SquadShowModel()
        let tmpSquad=new SquadModel()
        let emptyFeed=true
        let fullFeed=true
        tempFeed.forEach((value,index)=>{
            if(index==='backs'||index==='forwards') {
                value.map((v,i)=>{
                    if(squad.get(index).get(i)!==undefined) {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i]=this.searchPlayer(this.fullPlayerList,squad.get(index).get(i))
                            return val
                        })
                    }
                    else {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i]=null
                            return val
                        })
                    }
                    if(tempFeed.get(index)[i]===null) {
                        squad=squad.update(index,val=>{
                            val[i]=null
                            return val
                        })
                        if(!isPop) fullFeed=false
                    }
                    else {
                        emptyFeed=false
                    }
                })
            }
            else {
                value.map((v,i)=>{
                    let p=isPop?v.position:v.position==='wildcard'?'widecard':v.position
                    if(squad.get(p)&&squad.get(p).trim()!=='') {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].info=this.searchPlayer(this.fullPlayerList,squad.get(p))
                            return val
                        })
                    }
                    else {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].info=null
                            return val
                        })
                    }
                    if(tempFeed.get(index)[i].info===null) {
                        squad=squad.set(p,'')
                        if(!isPop) fullFeed=false
                    }
                    else {
                        emptyFeed=false
                    }
                })
            }
        })
        tmpSquad.forEach((value,index)=>{
            if(List.isList(squad.get(index))) {
                if(squad.get(index).count()>0)   tmpSquad=tmpSquad.set(index,squad.get(index).join('|'))
                else tmpSquad=tmpSquad.set(index,'')
            }
            else tmpSquad=tmpSquad.set(index,squad.get(isPop?index==='widecard'?'wildcard':index:index))
        })
        let rating=Rating()
        if (isPop)    rating.forEach((value,index)=>{
                        rating=rating.set(index,squad.get(index))
                    })
        let optionsSaveList = {
            url: this.saveSquadUrl,
            data:tmpSquad.toJS(),
            onAxiosStart: () => {
            },
            onAxiosEnd: () => {
                this.setState({ isLoaded: true })
            },
            onSuccess: (res) => {
                //console.warn("fedd1: ", JSON.stringify(fullFeed))
                this.setState({
                    isLoaded: true,
                    isScoreLoaded: isPop||!fullFeed?true:false,
                    squadDatafeed:tempFeed.toJS(),
                    showScoreCard:emptyFeed?'empty':fullFeed?'full':'semi',
                    rating:isPop?rating.toJS():this.state.rating
                },()=>{
                    if(fullFeed&&!isPop) {
                        this._setModalVisible(false)
                        this.getRating(squad)
                    }
                    else {
                        this._setModalVisible(false)
                        removeUserCustomizedSquad()
                    }
                })
            },
            onError: (res) => {
                this.setState({isLoaded: true }, () => {
                    this._showError(res)
                })
            },
            onAuthorization: () => {
                this.setState({isLoaded: true }, () => {
                    this._signInRequired()
                })
            },
            isRequiredToken: true
        }

        service(optionsSaveList)

    }

    autoPop() {
        let optionsAutoPop = {
            url: this.autoPopulatedSquadUrl,
            data:{id:this.state.userID},
            onAxiosStart: () => {},
            onAxiosEnd: () => {
                this.setState({ isLoaded:true })
            },
            onSuccess: (res) => {
                 this.setState({
                    isLoaded:true
                },()=>{
                    this.setSquadData(SquadPopModel.format(SquadPopModel(res.data)),true)
                })
            },
            onError: (res) => {
                this.setState({ isLoaded:true }, () => {
                    this._showError(res)
                })
            },
            onAuthorization: () => {
                this.setState({ isLoaded:true }, () => {
                    this._signInRequired()
                })
            },
            isRequiredToken: true,
            channel: 'EYC3'
        }
        this._setModalVisible(false)
        this.setState({
            isLoaded:false
        },()=>{
                service(optionsAutoPop)
        })
    }

    clearSelection() {        
        this._setModalVisible(false)
        this.setState({
            isLoaded:false
        },()=>{
            this.setSquadData(SquadModel.format(SquadModel().toJS()))
        })
    }

    getRating(squadList){
        let tempSquad=SquadRatingModel()
        squadList.forEach((value,index)=>{
            if(List.isList(value)) {
                value.forEach((v,i)=>{
                    tempSquad=tempSquad.update(index,val=>{
                        val[i]=parseInt(v)
                        return val
                    })
                })
            }
            else {
                tempSquad=tempSquad.set(index,parseInt(value))
            }
        })
        let optionsSquadRating = {
            url: this.getMySquadRatingUrl,
            data: {id:this.state.userID,squad:JSON.stringify(tempSquad)},
            onAxiosStart: () => {
                },
            onAxiosEnd: () => {
                },
            onSuccess: (res) => {
                    let rating=Rating()
                    rating.forEach((value,index)=>{
                        rating=rating.set(index,res.data[index])
                    })
                    this.setState({
                        isLoaded: true,
                        isScoreLoaded:true,
                        rating
                    },()=>{                            
                            removeUserCustomizedSquad()
                    })
            },
            onError: (res) => {
                    this._showError(res)
            },
            onAuthorization: () => {
                    this._signInRequired()
            },
            isRequiredToken: true,
            channel: 'EYC3'
        }
        service(optionsSquadRating)        
    }

    searchPlayer(player,id) {
        let result=null
        for(let union in player) {
            result=player[union].find((item)=>item.id===id.toString())
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

