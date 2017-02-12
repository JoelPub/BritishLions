
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
import loader from '../../themes/loader-position'
import { alertBox } from '../utility/alertBox'
import refresh from '../../themes/refresh-control'
import { drillDown } from '../../actions/content'
import { setAccessGranted } from '../../actions/token'
import { removeToken, getUserId } from '../utility/asyncStorageServices'
import { service } from '../utility/services'
import Data from '../../../contents/unions/data'
import { globalNav } from '../../appNavigator'
import SquadModal from '../global/squadModal'
import { getSoticFullPlayerList} from '../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getEYC3FullPlayerList, removeEYC3FullPlayerList } from '../utility/apiasyncstorageservice/eyc3AsyncStorageService'
import { getUserCustomizedSquad, removeUserCustomizedSquad } from '../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import { setPositionToAdd,setPositionToRemove } from '../../actions/position'
import { setSquadToShow,setSquadData } from '../../actions/squad'
import { getAssembledUrl } from '../utility/urlStorage'
import PlayerScore from '../global/playerScore'
import SquadPopModel from  'modes/SquadPop'
import Rating from  'modes/SquadPop/Rating'
import SquadModel from  'modes/Squad'
import SquadRatingModel from 'modes/Squad/Rating'
import Immutable, { Map, List,Iterable } from 'immutable'
import Cursor from 'immutable/contrib/cursor'
import SquadList from '../global/squadList'
import {convertSquadToShow,compareShowSquad} from '../global/squadToShow'
import SquadShowModel from  'modes/Squad/SquadShowModel'

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
            modalContent:this.getModalContent(),
            rating:Rating().toJS(),
            userID:'',
        }
        // this.isUnMounted = false
        this.uniondata = Data
        this.fullPlayerList={}
        this.catchedSquad={}
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
                        <Text style={styles.modalTitleText}>Squad rating</Text>
                            <Text style={styles.modalText}>A score out of 500 based on your selected players, cohesion rating, individual player performances over the last two years and their most recent five games. Your squad rating will take into account all the ratings of your individual players and allows you to choose which players’ ratings you want to boost by nominating a Captain, Kicker and a Star player i.e the player you nominate as your best performer.</Text>

                            <Text style={styles.modalTitleText}>Squad rating percentage</Text>
                            <Text style={styles.modalText}>Whether your squad is in the top five, 10, 25, 50 per cent of squads submitted.</Text>

                            <Text style={styles.modalTitleText}>Cohesion</Text>
                            <Text style={styles.modalText}>Rugby is a team sport, the more familiar your players are with each other the better they will perform in a game. EY has developed an algorithm to decide the cohesion of your squad based on international and top tier club rugby games in the last two years. A rating out of 100 where 100 means all of your squad have started at least one game with every other player in your squad. There is an assumption that professional players will gel together in training camp so a baseline score of 50 is given.</Text>

                            <Text style={styles.modalTitleText}>Attack & Defence</Text>
                            <Text style={styles.modalText}>Players are individually rated on their defensive and attacking abilities. Your team will be analysed to see its balance and if it is weighted towards attack or defence.</Text>
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

    // componentWillUnmount() {
    //     this.isUnMounted = true
    // }

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

    _showDetail(item, route,playerPos) {
        this.props.setPositionToAdd('')
        this.props.setPositionToRemove(playerPos)
        this.props.drillDown(item, route)
    }

    _addPlayer(playerPos) {
        this.props.setPositionToAdd(playerPos)
        this.props.setPositionToRemove('')
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
                                    <SquadList squadDatafeed={this.props.squadToShow} pressImg={this._showDetail.bind(this)} pressAdd={this._addPlayer.bind(this)}/>
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
        console.log('!!!mySquad componentDidMount')
        setTimeout(() => this._getSquad(), 600)        
    }

    componentWillReceiveProps(nextProps) {
        console.log('!!!mySquad componentWillReceiveProps')
        // console.log('!!!this.props.squadToShow',JSON.stringify(this.props.squadToShow)!=='{}'?this.props.squadToShow.indivPos:'null')
        // console.log('!!!nextProps.squadToShow',JSON.stringify(nextProps.squadToShow)!=='{}'?nextProps.squadToShow.indivPos:'null')
        // console.log('!!!this.props.squadToShow=nextProps.squadToShow',Map(this.props.squadToShow).equals(Map(nextProps.squadToShow))?'true':'false')
        // console.log('!!!this.props.squadData',this.props.squadData)
        console.log('!!!nextProps.squadData',nextProps.squadData)
        // console.log('!!!this.props.squadData=nextProps.squadData',this.props.squadData===nextProps.squadData?'true':'false')
        // let routes = globalNav.navigator.getCurrentRoutes()
        
        // re render after 'back nav' pressed
            // if (!this.isUnMounted && nextProps.route.routes[nextProps.route.routes.length-1]==='myLionsSquad') {
            // console.log('!!!!!',nextProps.route.routes)
                // if(JSON.stringify(nextProps.squadToShow)!=='{}'&&nextProps.squadData!==null&&(!Map(this.props.squadToShow).equals(Map(nextProps.squadToShow))||this.props.squadData!==nextProps.squadData)) {
                if(nextProps.squadData!==null) {
                    // console.log('pass')
                    this.setSquadData(SquadModel.format(eval(`(${nextProps.squadData})`)))  
                }                
            // }
            // else {
            //     this.setState({
            //         isLoaded: false,
            //     }, () => {
            //         setTimeout(()=>{this._getSquad()},600)
            //     })
            // }
        // }
    }

    _getSquad(){
        // if (this.isUnMounted) return 
            
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
                        // this.catchedSquad=catchedSquad.data
                        this.setSquadData(SquadModel.format(eval(`(${catchedSquad.data})`)),false,true)
                    }
                }).catch((error) => {
                    this.setState({ isLoaded: true }, () => {
                        this._showError(error) // prompt error
                    })
                })
            }
        })      
    }

    setSquadData(squad,isPop,mounted){
        console.log('!!!setSquadData mounted',mounted)
        let tmpSquad=new SquadModel()
        let emptyFeed=true
        let fullFeed=true
        // console.log('1')
        let showSquadFeed=convertSquadToShow(squad,this.fullPlayerList,isPop,this.uniondata)
        // console.log('1.1')
        showSquadFeed.forEach((value,index)=>{
            if(index==='backs'||index==='forwards') {
                value.map((v,i)=>{
                    if(showSquadFeed.get(index)[i]===null) {
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
                    if(showSquadFeed.get(index)[i].info===null) {
                        squad=squad.set(p,'')
                        if(!isPop) fullFeed=false
                    }
                    else {
                        emptyFeed=false
                    }
                })
            }
        })
        // console.log('2')
        tmpSquad.forEach((value,index)=>{
            if(List.isList(squad.get(index))) {
                if(squad.get(index).count()>0)   tmpSquad=tmpSquad.set(index,squad.get(index).join('|'))
                else tmpSquad=tmpSquad.set(index,'')
            }
            else tmpSquad=tmpSquad.set(index,squad.get(isPop?index==='widecard'?'wildcard':index:index))
        })
        // console.log('3')
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
                this.setState({
                    isLoaded:true,
                    isScoreLoaded: isPop||!fullFeed?true:false,
                    showScoreCard:emptyFeed?'empty':fullFeed?'full':'semi',
                    rating:isPop?rating.toJS():this.state.rating
                },()=>{
                    this._setModalVisible(false)
                    if(fullFeed&&!isPop) {
                        this.getRating(squad)
                    }
                    else {
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
        // console.log('!!!compare')
        // console.log('!!!showSquadFeed',JSON.stringify(showSquadFeed.toJS())!=='{}'?showSquadFeed.toJS().indivPos:'null')
        // console.log('!!!this.props.squadToSHow',JSON.stringify(this.props.squadToShow)!=='{}'?this.props.squadToShow.indivPos:'null')
        // if(compareShowSquad(showSquadFeed,this.props.squadToShow)) {
        //     console.log('!!!show equal')
        //     service(optionsSaveList)
        // } else {
        //     console.log('!!!show not equal')
        //     if (JSON.stringify(this.props.squadToShow)!=='{}'&&this.props.squadData!==null) this.setState({isLoaded:true})
        //     this.props.setSquadToShow(showSquadFeed.toJS())
        // }
        console.log('!!!tmpSquad',JSON.stringify(tmpSquad))
        console.log('!!!this.props.squadData',this.props.squadData)
        if(JSON.stringify(tmpSquad)!==this.props.squadData) {
            console.log('!!!squad not equal')
            this.props.setSquadData(JSON.stringify(tmpSquad))
            this.props.setSquadToShow(showSquadFeed.toJS())
        }
        else {
            console.log('!!!squad equal')
            service(optionsSaveList)
        }
        

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
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted)),
        setPositionToAdd:(position)=>dispatch(setPositionToAdd(position)),
        setPositionToRemove:(position)=>dispatch(setPositionToRemove(position)),
        setSquadToShow:(squad)=>dispatch(setSquadToShow(squad)),
        setSquadData:(squad)=>dispatch(setSquadData(squad)),
    }
}

export default connect((state) => {
    return {
        squadToShow: state.squad.squadToShow,
        squadData: state.squad.squadData,
    }
}, bindAction)(MyLionsSquad)

