
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
// const squadDataMode={indivPos:[{position:'captain',info:null},{position:'kicker',info:null},{position:'wildcard',info:null}], forwards:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null], backs:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null], }
// const emptyDataFeed='{backs: "", captain: "", wildcard: "", forwards: "", kicker: ""}'
// const fullDataFeed='{backs: "114146|9351|4986|62298|92503|90007|62075|114875|100873|62278|62237|107144|5062|115391|62241|90226", captain: "8759", wildcard: "88878", forwards: "19930|113227|99843|106742|112534|5061|99064|113014|4955|84780|73050|92346|99808|115498|9072|112599", kicker: "88434"}'

const AddPlayerCell = ({pos,onPress})=>(
    <ButtonFeedback  onPress= {onPress}  style={styles.posBtn}>
        <View style={styles.posAddWrapper}>
            <Icon name='md-person-add' style={styles.addPlayerIcon} />
        </View>
        <View style={styles.playerNameTextWrapper}>
            <View style={[shapes.triangle]} />
            <View style={styles.titleBox}>
                <Text style={styles.playerNameText}>ADD</Text>
                <Text style={styles.playerNameText}>{pos.toUpperCase()}</Text>
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
       {data.filter((value)=>value!==null).length} / 16
      </Text>
    </View>
)
class MyLionsSquad extends Component {

    constructor(props){
        super(props)
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
                        <Text style={styles.modalTextRN}>A score out of 500 based on your selected players, cohesion rating, individual player performances over the last two years and their most recent five games.</Text>
                
                        <Text style={styles.modalTitleText}>Your Squad Ranking</Text>
                        <Text style={styles.modalTextRN}>Percentile ranking in relation to other fan’s selected squads.</Text>
                
                        <Text style={styles.modalTitleText}>Cohesion</Text>
                        <Text style={styles.modalTextRN}>A rating out of 100 where 0 means that your squad has played no games together and 100 means that your squad has played all their games together over the last two years.</Text>
                
                        <Text style={styles.modalTitleText}>Attack / Defence</Text>
                        <Text style={styles.modalTextRN}>Assessment of the balance of the attacking and defensive capabilities of your squad.</Text>
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
        // console.log('!!!componentWillMount')
        // get user id
        getUserId().then((userID) => {
            // console.log('!!!userID',userID)
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
                    <LionsHeader back={true} title='MY LIONS' />
                    {
                        this.state.isLoaded?
                            <ScrollView>
                                <Text style={[styles.headerTitle,styles.squadTitle]}>MY SQUAD</Text>
                                <PlayerScore isLoaded={this.state.isScoreLoaded} rating={this.state.rating} showScoreCard={this.state.showScoreCard} pressInfo={this._setModalVisible.bind(this)} pressExpert={this._myExpertsPick.bind(this)}/>
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
                                </ScrollView>
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
        // console.log('!!!componentDidMount')
        setTimeout(() => this._getSquad(), 600)        
    }

    componentWillReceiveProps(nextProps) {
        // console.log('!!!componentWillReceiveProps')
        // console.log('!!!nextProps.route',nextProps.route)
        let routes = globalNav.navigator.getCurrentRoutes()
        // console.log('!!!routes',routes)
        
        // re render after 'back nav' pressed
        // if (!this.isUnMounted && routes[routes.length - 2].id === 'myLionsSquad') {
            if (!this.isUnMounted && nextProps.route.routes[nextProps.route.routes.length-1]==='myLionsSquad') {
            this.setState({
                isLoaded: false,
            }, () => {
                setTimeout(()=>{this._getSquad()},600)
            })
        }
    }

    _getSquad(){
        // console.log('!!!_getSquad')
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
                // console.log('final catchedSquad:', JSON.stringify(catchedSquad.error))
                this.setState({ isLoaded: true }, () => {
                    this._showError(catchedSquad.error)
                })
            }else{
                // console.log('!!!!final catchedSquad:', JSON.stringify(catchedSquad.data))
                getSoticFullPlayerList().then((catchedFullPlayerList) => {
                    if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                        this.fullPlayerList=catchedFullPlayerList
                        // console.log('fullPlayerlist is plainobj?',this.isPlainObj(this.fullPlayerList)?'true':'false')
                        // getEYC3FullPlayerList().then((eyc3CatchedFullPlayerList) => {
                        //      if (eyc3CatchedFullPlayerList !== null && eyc3CatchedFullPlayerList !== 0 && eyc3CatchedFullPlayerList !== -1) {
                        //         console.log('catchedFullPlayerList',catchedFullPlayerList['125'].length)
                        //         console.log('eyc3CatchedFullPlayerList',eyc3CatchedFullPlayerList)
                        //         console.log('!!!!catchedSquad.data:', catchedSquad.data)
                        //         let t=SquadModel.format(eval(`(${catchedSquad.data})`))
                        //         console.log('!!!t',t.toJS())
                                this.setSquadData(SquadModel.format(eval(`(${catchedSquad.data})`)))
                        //     }
                        // }).catch((error) => {
                        //     console.log('Error when try to get the EYC3 full player list: ', error)
                        // })
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
        // console.log('!!!squad.toJS()',squad.toJS())
        // console.log('!!!tempFeed.toJS()',tempFeed.toJS())
        // console.log('!!!tmpSquad.toJS()',tmpSquad.toJS())
        let emptyFeed=true
        let fullFeed=true
        tempFeed.forEach((value,index)=>{
            // console.log('index',index)
            if(index==='backs'||index==='forwards') {
                value.map((v,i)=>{
                    // console.log('i',i)
                    // console.log('squad.get(index).get(i)',squad.get(index).get(i))
                    if(squad.get(index).get(i)!==undefined) {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i]=this.searchPlayer(this.fullPlayerList,squad.get(index).get(i))
                            return val
                        })
                        // console.log('tempFeed.get(index)[i].id',tempFeed.get(index)[i].id)
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
                    }
                    else {
                        emptyFeed=false
                    }
                })
            }
            else {
                value.map((v,i)=>{
                    // console.log('i',i)
                    // console.log('v.position',v.position)
                    // console.log('squad.get(v.position)',squad.get(v.position))
                    let p=isPop?v.position:v.position==='wildcard'?'widecard':v.position
                    if(squad.get(p)&&squad.get(p).trim()!=='') {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].info=this.searchPlayer(this.fullPlayerList,squad.get(p))
                            return val
                        })
                        // console.log('tempFeed.get(index)[i].info.id',tempFeed.get(index)[i].info.id)
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
        // console.log('!!!final squad',squad.toJS())
        // console.log('!!!fullFeed',fullFeed?'true':'false')
        // console.log('!!!isPop',isPop?'true':'false')
        tmpSquad.forEach((value,index)=>{
            // console.log('index',index)
            if(List.isList(squad.get(index))) {
                // console.log('is list')
                if(squad.get(index).count()>0)   tmpSquad=tmpSquad.set(index,squad.get(index).join('|'))
                else tmpSquad=tmpSquad.set(index,'')
            }
            else tmpSquad=tmpSquad.set(index,squad.get(isPop?index==='widecard'?'wildcard':index:index))
        })
        // console.log('!!!tmpSquad.toJS()',tmpSquad.toJS())
        let rating=Rating()
        if (isPop)    rating.forEach((value,index)=>{
                        rating=rating.set(index,squad.get(index))
                    })
        let optionsSaveList = {
            url: this.saveSquadUrl,
            data:tmpSquad.toJS(),
            onAxiosStart: () => {
                // console.log('!!!onAxiosStart')
            },
            onAxiosEnd: () => {
                // console.log('!!!onAxiosEnd')
                this.setState({ isLoaded: true })
            },
            onSuccess: (res) => {
                // console.log('!!!onSuccess')
                this.setState({
                    isLoaded: true,
                    isScoreLoaded: isPop||!fullFeed?true:false,
                    squadDatafeed:tempFeed.toJS(),
                    showScoreCard:emptyFeed?'empty':fullFeed?'full':'semi',
                    rating:isPop?rating.toJS():this.state.rating
                },()=>{
                    // console.log('!!!fullFeed',fullFeed)
                    // console.log('!!!isPop',isPop)
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
                // console.log('!!!onError')
                this.setState({isLoaded: true }, () => {
                    this._showError(res)
                })
            },
            onAuthorization: () => {
                // console.log('!!!onAuthorization')
                this.setState({isLoaded: true }, () => {
                    this._signInRequired()
                })
            },
            isRequiredToken: true
        }

        service(optionsSaveList)

    }

    autoPop() {
        // console.log('!!!autoPop')
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
                    // console.log('!!!!res',res.data)
                    // let t=SquadPopModel.format(SquadPopModel(res.data))
                    // console.log('!!!!t.toJS()',t.toJS())
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
            // let t=SquadModel.format(SquadModel().toJS())
            // console.log('!t',t.toJS())
            this.setSquadData(SquadModel.format(SquadModel().toJS()))
        })
    }

    getRating(squadList){
        // console.log('!!!getRating',squadList.toJS())
        let tempSquad=SquadRatingModel()
        // console.log('!!!tempSquad.toJS()',tempSquad.toJS())
        squadList.forEach((value,index)=>{
            // console.log('index',index)
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

        // console.log('!!!id',this.state.userID)
        // console.log('!!!tempSquad.toJS()',tempSquad.toJS())
        // console.log('!!!tempSquad.toString()',JSON.stringify(tempSquad))
        let optionsSquadRating = {
            url: this.getMySquadRatingUrl,
            data: {id:this.state.userID,squad:JSON.stringify(tempSquad)},
            onAxiosStart: () => {
                    // console.log('!!!!onAxiosStart')
                },
            onAxiosEnd: () => {
                    // console.log('!!!!onAxiosEnd')
                },
            onSuccess: (res) => {
                    // console.log('!!!!res.data',res.data)
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
                    // console.log('!!!!onError',res)
                
                    this._showError(res)
            },
            onAuthorization: () => {
                    // console.log('!!!!onAuthorization')
                
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

