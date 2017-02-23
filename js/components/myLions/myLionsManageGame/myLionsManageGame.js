
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushNewRoute } from '../../../actions/route'
import { drillDown } from '../../../actions/content'
import { Image, Text, View, ScrollView, ListView,ActivityIndicator } from 'react-native'
import { Container, Icon } from 'native-base'
import theme from '../../../themes/base-theme'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LoginRequire from '../../global/loginRequire'
import LionsHeader from '../../global/lionsHeader'
import EYSFooter from '../../global/eySponsoredFooter'
import LionsFooter from '../../global/lionsFooter'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import ButtonFeedback from '../../utility/buttonFeedback'
import Versus from '../components/versus'
import LinearGradient from 'react-native-linear-gradient'
import SquadModal from '../../global/squadModal'
import shapes from '../../../themes/shapes'
import styles from './styles'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import loader from '../../../themes/loader-position'
import { service } from '../../utility/services'
import { strToUpper } from '../../utility/helper'
import SquadModel from  '../../../modes/Squad'
import {convertSquadToShow} from '../../global/squadToShow'
import Data from '../../../../contents/unions/data'
import Immutable, { Map, List,Iterable } from 'immutable'
import { setSquadToShow,setSquadData } from '../../../actions/squad'
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'

const locStyle = styleSheetCreate({
    header: {
        backgroundColor: styleVar.colorText,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    headerText: {
        color: '#FFF',
        fontSize: 18,
        lineHeight: 20,
        textAlign: 'center',
        fontFamily: styleVar.fontGeorgia
    },
    gridBoxTitle: {
        position: 'relative',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: styleVar.colorGrey2,
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 12,
        backgroundColor: styleVar.colorGrey
        
    },
    gridBoxTitleText: {
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        color: styleVar.colorScarlet,
        fontSize: 24,
        lineHeight: 24
    },
    headerText2: {
        fontFamily: styleVar.fontCondensed,
        marginBottom: -8
    },

    btns: {
        padding: 30,
        backgroundColor: 'rgb(103, 3, 20)'
    },
    btn: {
    },
    btnBg: {
        height: 80
    },
    btnText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 36,
        lineHeight: 36,
        color: '#FFF',
    }
})


const dummyData = [
    {
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2015/lions/125/250x250/114146.jpg',
        headerLabel: 'weather'     

    },
    {
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2015/lions/125/250x250/19930.jpg',
        headerLabel: 'referees'    
    }
]


class MyLionsCompetitionGameResults extends Component {

    constructor(props) {
        super(props)
        this.isUnMounted = false
        this.uniondata = Data
        this.state = {
            modalResults: false,
            isLoaded:false,
            gameInfo:{},
            drillDownItem:this.props.drillDownItem,
            isNetwork: true

        }
    }

    componentWillUnmount() {
        this.isUnMounted = true
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
                    
                    <View style={styles.pageTitle}>
                        <Text style={styles.pageTitleText}>MANAGE GAME</Text>
                        <ButtonFeedback 
                            style={styles.pageTitleBtnIconRight} 
                            onPress={() => { this.setState({modalResults: true}) }}>
                            <Icon name='ios-information-circle-outline' style={styles.pageTitleBtnIcon} />
                        </ButtonFeedback>
                    </View>
                    {
                    this.state.isLoaded?
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        <View style={[locStyle.header]}>
                            <Text style={locStyle.headerText}>{this.state.gameInfo.grounds[Math.trunc(Math.random()*this.state.gameInfo.grounds.length)].name}</Text>
                        </View>

                        <Versus gameData={this.state.drillDownItem} userData={this.props.userProfile} />
                        
                        <Grid>
                            <Row>
                                {
                                    dummyData.map((item, key) => {
                                        let styleGridBoxImgWrapper = (key === 0)? [styles.gridBoxImgWrapper, styles.gridBoxImgWrapperRight] : [styles.gridBoxImgWrapper]
                                        let gridBoxTouchable = (key ===  0)?[styles.gridBoxTouchable, styles.gridBoxTitleRight, locStyle.gridBoxWrapper] : [styles.gridBoxTouchable, locStyle.gridBoxWrapper]
                                        let randomNumber=Math.trunc(Math.random()*this.state.gameInfo[item.headerLabel].length)
                                        return (
                                            <Col key={key}>
                                                <View style={gridBoxTouchable}>
                                                    <View style={[locStyle.header]}>
                                                        <Text style={[locStyle.headerText, locStyle.headerText2]}>
                                                            {strToUpper(item.headerLabel)}
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.gridBoxTouchableView, locStyle.gridBoxWrapper, ]}>
                                                        <View style={styleGridBoxImgWrapper}>
                                                            <ImagePlaceholder 
                                                                width = {styleVar.deviceWidth / 2}
                                                                height = {styleVar.deviceWidth / 2}>
                                                                <Image transparent
                                                                    resizeMode='contain'
                                                                    source={{uri: this.state.gameInfo[item.headerLabel][randomNumber].image}}
                                                                    style={styles.gridBoxImg} />
                                                            </ImagePlaceholder>
                                                        </View>
                                                        <View style={locStyle.gridBoxTitle}>
                                                            <Text style={locStyle.gridBoxTitleText} numberOfLines={1}>
                                                                {strToUpper(this.state.gameInfo[item.headerLabel][randomNumber].name.split(' ')[0])}
                                                            </Text>
                                                            <Text style={[locStyle.gridBoxTitleText, {marginTop: -5}]} numberOfLines={1}>
                                                                {strToUpper(this.state.gameInfo[item.headerLabel][randomNumber].name.split(' ')[1])}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Col>
                                        )
                                    }, this)
                                }
                            </Row>
                        </Grid>

                        <View style={[locStyle.btns]}>
                            <LinearGradient style={locStyle.btnBg} colors={['#af001e', '#820417']}>
                                 <ButtonFeedback style={locStyle.btn} onPress={()=> {  this.props.drillDown(this.state.drillDownItem, 'myLionsManageTeam') }}>
                                    <Text style={locStyle.btnText}>
                                        TEAM
                                    </Text>
                                </ButtonFeedback>
                            </LinearGradient>
                            

                                
                            
                        </View>

                    </ScrollView>
                    :
                    <ActivityIndicator style={loader.centered} size='large' />
                    }
                    <SquadModal 
                        modalVisible={this.state.modalResults}
                        callbackParent={() => {}}>
                            <View style={[styles.modalContent]}>
                                <Text style={styles.modalContentTitleText}>MANAGE GAME</Text>
                                <Text style={styles.modalContentText}>Lorem ipsum doloramet, conse tetur adipiscing elit. Vestibulum in elit quam. Etiam ullamcorper neque eu lorem elementum, a sagittis sem ullamcorper. Suspendisse ut dui diam.</Text>
                            </View>
                    </SquadModal>
                        
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
                </View>
            </Container>
        )
    }


    componentWillMount() {
        this.setState({isLoaded:false},()=>{
            this.getInfo()
            this._getSquad()
        })
    }
    _showError(error) {
        if(!this.state.isNetwork) return

       if(error === 'Please make sure that you\'re connected to the network.') {
           this.setState({
               isNetwork: false
           })
       }
        if(error !== ''){
            Alert.alert(
                'An error occured',
                error,
                [{text: 'Dismiss'}]
            )
        }
    }
    getInfo(){
        console.log('getInfo')
        let optionsInfo = {
            url: 'https://api.myjson.com/bins/z5bk5',
            data: {},
            onAxiosStart: null,
            onAxiosEnd: null,
            method: 'get',
            onSuccess: (res) => {
                if(res.data) {
                    console.log('res.data',res.data)
                    this.setState({isLoaded:true,gameInfo:res.data})
                }
            },
            onError: ()=>{
                this.setState({isLoaded:true})
            },
            onAuthorization: () => {
                    this._signInRequired()
            },
            isRequiredToken: true
        }
        service(optionsInfo)        
    }
    _getSquad(){
                getSoticFullPlayerList().then((catchedFullPlayerList) => {                        
                    if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                        this.fullPlayerList=catchedFullPlayerList
                        let optionsSquad = {
                            url: 'https://www.api-ukchanges2.co.uk/api/protected/squad/get?_=1483928168053',
                            method: 'get',
                            onSuccess: (res) => {
                                if(res.data) {
                                    this.setSquadData(SquadModel.format(eval(`(${res.data})`)))
                                }
                                
                            },
                            isRequiredToken: true
                        }
                        service(optionsSquad)
                    }
                }).catch((error) => {
                            this._showError(error) 
                })
    }
    setSquadData(squad){
        console.log('!!!setSquadData')
        let tmpSquad=new SquadModel()
        let fullFeed=true
        let showSquadFeed=convertSquadToShow(squad,this.fullPlayerList,false,this.uniondata)
        console.log('showSquadFeed',showSquadFeed.toJS())
        showSquadFeed.forEach((value,index)=>{
            if(index==='backs'||index==='forwards') {
                value.map((v,i)=>{
                    if(showSquadFeed.get(index)[i]===null) {
                        squad=squad.update(index,val=>{
                            val[i]=null
                            return val
                        })
                        fullFeed=false
                    }
                })
            }
            else {
                value.map((v,i)=>{
                    let p=v.position==='wildcard'?'widecard':v.position
                    if(showSquadFeed.get(index)[i].info===null) {
                        squad=squad.set(p,'')
                        fullFeed=false
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
            else tmpSquad=tmpSquad.set(index,squad.get(index))
        })
        let optionsSaveList = {
            url: 'https://www.api-ukchanges2.co.uk/api/protected/squad/save',
            data:tmpSquad.toJS(),
            onAxiosStart: () => {
            },
            onAxiosEnd: () => {
            },
            onSuccess: (res) => {
                        
            },
            onError: (res) => {
                    this._showError(res)
            },
            onAuthorization: () => {
            },
            isRequiredToken: true
        }
        console.log('this.props.squadData',this.props.squadData)
            this.props.setSquadData(JSON.stringify(tmpSquad))
            this.props.setSquadToShow(showSquadFeed.toJS())
            service(optionsSaveList)
        

    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        setSquadToShow:(squad)=>dispatch(setSquadToShow(squad)),
        setSquadData:(squad)=>dispatch(setSquadData(squad)),
    }
}

export default connect((state) => {
    return {
        drillDownItem: state.content.drillDownItem,
        isAccessGranted: state.token.isAccessGranted,
        userProfile: state.squad.userProfile,
        netWork: state.network,
        squadToShow: state.squad.squadToShow,
        squadData: state.squad.squadData,
    }
},  bindAction)(MyLionsCompetitionGameResults)