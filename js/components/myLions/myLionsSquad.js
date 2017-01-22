
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
                        <Text style={styles.modalTextRN}>A score out of 500 based on their selected position, cohesion rating, individual player performance over the last two years and their most recent five games.</Text>
                
                        <Text style={styles.modalTitleText}>Your Squad Ranking</Text>
                        <Text style={styles.modalTextRN}>Percentile ranking in relation at other fans selecting squads.</Text>
                
                        <Text style={styles.modalTitleText}>Cohesion</Text>
                        <Text style={styles.modalTextRN}>Rating out of 100 where 0 means that your squad have played no games together and 100 means that your quad have player all their games together over the last two years.</Text>
                
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
        console.log('!!!componentWillMount')
        // get user id
        getUserId().then((userID) => {
            console.log('!!!userID',userID)
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
            if(this.isUnMounted) return
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
                            // console.log('fullPlayerlist is plainobj?',this.isPlainObj(this.fullPlayerList)?'true':'false')
                            this.fullPlayerList=catchedFullPlayerList
                            // console.log('fullPlayerlist is plainobj?',this.isPlainObj(this.fullPlayerList)?'true':'false')
                            // getEYC3FullPlayerList().then((eyc3CatchedFullPlayerList) => {
                            //      if (eyc3CatchedFullPlayerList !== null && eyc3CatchedFullPlayerList !== 0 && eyc3CatchedFullPlayerList !== -1) {
                            //         console.log('catchedFullPlayerList',catchedFullPlayerList['125'].length)
                            //         console.log('eyc3CatchedFullPlayerList',eyc3CatchedFullPlayerList)
                                    console.log('!!!!catchedSquad.data:', catchedSquad.data)
                                    // let t=SquadModel.format(eval(`(${catchedSquad.data})`))
                                    // console.log('!!!t',t.toJS())
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
        // console.log('!!!squad.toJS()',squad.toJS())
        let tempFeed=new SquadShowModel()
        // console.log('!!!tempFeed.toJS()',tempFeed.toJS())
        let tmpSquad=new SquadModel()
        // console.log('!!!tmpSquad.toJS()',tmpSquad.toJS())
        let emptyFeed=true
        let fullFeed=true

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
                        this.getRating(squad.toJS())
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

        squad.forEach((value,index)=>{
            // console.log('index',index)
            if(List.isList(value)) {
                // console.log('value.toJS()',value.toJS())
                // console.log('is List')
                if (value.count()>0) {
                    // console.log('not empty List')
                    value.forEach((node,i)=>{
                        // console.log('node',node)
                        tempFeed=tempFeed.update(index,value=>{
                            value[i]=this.searchPlayer(this.fullPlayerList,node)
                            return value
                        })
                        // console.log('!!!tempFeed[index][i].id',tempFeed.get(index)[i].id)
                        if(tempFeed.get(index)[i]===null) {
                            squad=squad.setIn([index,i],null)
                            squad=squad.update(index,value=>{
                                value[i]=null
                                return value
                            })
                        }
                        else {
                            emptyFeed=false
                        }
                    })                                            
                    if (!isPop&&tempFeed.get(index).indexOf(null)!==-1) fullFeed=false
                }
                else {
                    // console.log('empty List')
                    tempFeed.get(index).forEach((v,i)=>{
                        tempFeed=tempFeed.update(index,value=>{
                            value[i]=null
                            return value
                        })
                    })
                    if (!isPop) fullFeed=false
                }
            }
            else if(!Map.isMap(value)) {
                // console.log('value',value)
                // console.log('is not List or Map')
                // let cursor = Cursor.from(tempFeed,['indivPos'],newData => {data = newData})
                let i =tempFeed.get('indivPos').findIndex((node)=>node.position===index)
                // let i =cursor.findIndex((node)=>node.position===index)
                if(i>-1) {
                    // console.log('found i',i)
                    // console.log('tempFeed',tempFeed.get('indivPos')[i])
                    // tempFeed.get('indivPos')[i].info=this.searchPlayer(this.fullPlayerList,value) 
                    tempFeed=tempFeed.update('indivPos',v=>{
                        v[i].info=this.searchPlayer(this.fullPlayerList,value)
                        return v
                    })                   
                    // console.log('tempFeed',tempFeed.get('indivPos')[i])
                    // cursor=cursor.set(i,cursor.get(i).position=this.searchPlayer(this.fullPlayerList,value))
                    // tempFeed=tempFeed.setIn(['indivPos',i,'info'],this.searchPlayer(this.fullPlayerList,value))
                    // tempFeed['indivPos'][tempFeed['indivPos'].findIndex((element)=>element.position===index)].info=this.searchPlayer(this.fullPlayerList,value)
                    // if(tempFeed['indivPos'][tempFeed['indivPos'].findIndex((element)=>element.position===index)].info===null) {
                    // if(tempFeed.getIn(['indivPos',i,'info'])===null) {
                    if(tempFeed.get('indivPos')[i].info===null) {
                        squad=squad.set(index,'')
                        if(!isPop) fullFeed=false
                    }
                    else {
                        emptyFeed=false
                    }
                }
            }

        })
        // console.log('!!!final squad',squad.toJS())
        // console.log('!!!fullFeed',fullFeed?'true':'false')
        // console.log('!!!tmpSquad.toJS()',tmpSquad.toJS())
        tmpSquad.forEach((value,index)=>{
            if(List.isList(squad.get(index))) {
                if(squad.get(index).count()>0)   tmpSquad=tmpSquad.set(index,squad.get(index).join('|'))
                else tmpSquad=tmpSquad.set(index,'')
            }
            else tmpSquad=tmpSquad.set(index,squad.get(index))
        })
        // for (let pos in tmpSquad) {
        //     if(tmpSquad[pos] instanceof Array) {
        //         tmpSquad[pos]=tmpSquad[pos].join('|')
        //     }
        // }
        // console.log('!!!tmpSquad.toJS()',tmpSquad.toJS())
        let rating=Rating()
        if (isPop)    rating.forEach((value,index)=>{
                        rating=rating.set(index,squad.get(index))
                    })

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
        let optionsSquadRating = {
            url: this.getMySquadRatingUrl,
            data: squadList,
            onAxiosStart: () => {},
            onAxiosEnd: () => {},
            onSuccess: (res) => {
                    // console.log('!!!!res',res.data[0])
                    this.setState({
                        isLoaded: true,
                        isScoreLoaded:true,
                        rating:res.data[0]
                    },()=>{                            
                            removeUserCustomizedSquad()
                    })
            },
            onError: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                    this._showError(res)
            },
            onAuthorization: () => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted
                    this._signInRequired()
            },
            isRequiredToken: true
        }
        // console.log('!!!getRating')
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

