'use strict'

import React, { Component } from 'react'
import { Image, View, Text, ScrollView,ActivityIndicator } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from '../utility/buttonFeedback'
import ImagePlaceholder from '../utility/imagePlaceholder'
import PlayerFigure from './playerFigure'
import ProfileListModel from  'modes/Players'
import ProfileModel from 'modes/Players/Profile'
import SquadModal from './squadModal'
import { setMatchMan, getMatchMan } from '../utility/asyncStorageServices'
import { service } from '../utility/services'
import Data from '../../../contents/unions/data'
import { getSoticFullPlayerList} from '../utility/apiasyncstorageservice/soticAsyncStorageService'
import { searchPlayer } from '../myLions/components/searchPlayer'
import loader from '../../themes/loader-position'
import Accordion from 'react-native-collapsible/Accordion';

const locStyle = styleSheetCreate({ 
    listNoTitle: {
        borderTopWidth: 1,
        borderColor: styleVar.colorGrey2
    },
    header: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 5,
        backgroundColor: styleVar.colorGrey,
        borderWidth: 1,
        borderColor: styleVar.colorGrey2,
        borderBottomWidth: 0
    },
    headerText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        color: styleVar.colorScarlet,
        backgroundColor: 'transparent',
        android: {
            paddingBottom: 5
        }
    },
    listRow: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: styleVar.colorGrey2,
        borderTopWidth: 0,
        borderBottomWidth: 0
        //backgroundColor: 'green'
    },
    listRowWithBorderTop: {
        borderTopWidth: 1
    },
    listRowLast: {
        borderBottomWidth: 1
    },
    listRowImage: {
        width: 50
    },
    listRowContent: {
        flex: 1,
        justifyContent: 'center'
    },
    listRowPlayerImage: {
        width: 50,
        height: 50
    },

    detailRow: {
        flexDirection: 'row',
        //backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    detail: {
        flexDirection: 'column',
        flex: 1,
        marginLeft: 8,
        marginTop: 1,
        android: {
            marginTop: 0
        }
        //backgroundColor: 'yellow'
    },
    labels: {
        flexDirection: 'row',
    },
    scoreWrapper: {
        width: 60,
        //backgroundColor: 'lightgreen',
        justifyContent: 'center'
    },
    order: {
        color: styleVar.colorScarlet,
        fontSize: 21,
        lineHeight: 21,
        fontFamily: styleVar.fontCondensed,
        marginRight: 2,
        backgroundColor: 'transparent'
    },
    name: {
        color: 'rgb(29, 29, 29)',
        fontSize: 21,
        lineHeight: 21,
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
    },
    score: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 30,
        width: 50,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: styleVar.colorGrey2,
    },
    scoreText: {
        color: styleVar.colorText,
        fontSize: 18,
        lineHeight: 18,
        fontFamily: styleVar.fontCondensed,
        marginTop: 8,
        backgroundColor: 'transparent'
    },


    lineGraphWrapper: {
        height: 3,
        flexDirection: 'row',
        android: {
            marginTop: 5
        }
    },
    lineGraph: {
        backgroundColor: 'rgb(230, 231, 232)',
        height: 3,
        flex: 1/3
    },
    lineGraphSpacer: {
        flex: 1/7
    },
    lineGraphValueWrapper: {
        //backgroundColor: 'blue',
        flexDirection: 'row',
        flex: 100
    },
    lineGraphValue: {
        backgroundColor: 'rgb(208, 7, 41)',
        height: 3,
    },
    content: {
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: styleVar.colorGrey2
    },
    contentLast: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },


    modalWrapper:{
        paddingHorizontal:28,
        marginVertical:54,
        backgroundColor:'transparent',
    },
    modalTitleText:{
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        marginTop: 28,
        color: '#FFF'
    },
    modalDescText:{
        fontFamily: 'Helvetica Neue',
        fontSize:16,
        color: '#FFF'
    },
    modalBtnTitle:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:28,
        marginTop:28,
        textAlign:'center',
        color:'rgb(255,255,255)'
    },
    modalTitleTextCenter:{
        fontFamily: 'Helvetica Neue',
        fontSize:16,
        lineHeight:22,
        marginTop:28,
        textAlign:'center',
        color:'rgb(255,255,255)',
        android: {
            marginBottom: 10
        }
    },
    modalConfirmBtn:{
        height: 45,
        width:styleVar.deviceWidth*0.352,
        marginLeft:styleVar.deviceWidth*0.25,
        backgroundColor: styleVar.brandLightColor,
        marginTop:19,
        marginBottom:20
    }, 
})

const LineGraph = (data) => {
    let spacer = 1-data.value
    let value = data.value

    return (
        <View style={locStyle.lineGraphWrapper}>
            <View style={locStyle.lineGraph}>
                <View style={locStyle.lineGraphValueWrapper}>
                    <View style={[locStyle.lineGraphValue, {flex: value}]}></View>
                    <View style={[locStyle.lineGraphValueSpacer, {flex: spacer}]}></View>
                </View>
            </View>
            <View style={locStyle.lineGraphSpacer}></View>
        </View>
    )
}
export default class PlayersRankBox extends Component {
    constructor(props){
        super(props)
        this.uniondata = Data
        this.state = {
            modalVisible: false,
            players:[],            
            modalContent:this.getModalContent(),
            gameID:this.props.detail.id,
            isOn_tour:true,
            title:this.props.title,
            activeSection: false
        }
    }
    _setModalVisible=(visible,mode,title,subtitle,btn) => {
        this.setState({
            modalVisible:visible,
            modalContent:visible?this.getModalContent(mode,title,subtitle,btn):this.getModalContent()
        })
    }
    getModalContent(mode,title,subtitle,btn){
        switch(mode)  {
            case 'message' :
                return(
                    <View style={locStyle.modalWrapper}>
                        <Text style={locStyle.modalBtnTitle}>{title}</Text>
                        <Text style={locStyle.modalTitleTextCenter}>{subtitle}</Text>
                        <ButtonFeedback rounded label={btn} onPress={()=>this._setModalVisible(false)}  style={locStyle.modalConfirmBtn} />
                    </View>
                )
                break
            case 'info' :
                return (
                    <ScrollView style={locStyle.modalWrapper}>
                        <Text style={locStyle.modalTitleText}>ATTACK / DEFENCE / KICKING</Text>
                        <Text style={locStyle.modalDescText}>Key statistics over the 2015/2016 and 2016/2017 seasons compared with average of all eligible players for their position.</Text>
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
    onTiltleClick = (titleStatus) => {
        this.setState({
            isOn_tour: titleStatus
        })
    }
    componentDidMount(){
        this.setState({ isLoaded: false },()=>{
            getSoticFullPlayerList().then((catchedFullPlayerList) => {
                getMatchMan().then((data)=>{
                    let player=null
                    if(Array.isArray(JSON.parse(data))) {
                        player=JSON.parse(data).find(v=>v.id===this.state.gameID)
                    }
                    
                    if(__DEV__)console.log('rank getMatchMan player',player)
                    let optionsInfo = {
                        url: player&&player.previous!==null?'http://bilprod-livedev.azurewebsites.net/resubmitManOfMatch':'http://bilprod-livedev.azurewebsites.net/GetManOfMatchVoteResult',
                        data: player&&player.previous!==null?{id:this.state.gameID,old_man_of_match:this.props.showModal?player.previous:'0',new_man_of_match:this.props.showModal?player.current:'0' }:{id:this.state.gameID,man_of_match : this.props.showModal?player.current:'0' },
                        onAxiosStart: null,
                        onAxiosEnd: null,
                        method: 'post',
                        onSuccess: (res) => {
                            // if (__DEV__)console.log('res',res)
                            if(res.data) {
                                if(this.props.showModal) this._setModalVisible(true,'message','SUCCESS', 'Your vote for Man of the Match has been recorded. Check back to see if other fans agree. You can also come back any time prior to the end of the match to change your vote.', 'CLOSE')
                                let players=[]
                                let profiles=[]
                                if (__DEV__)console.log('res.data',res.data)
                                if(res.data.result&&res.data.result.length>0) {
                                    let l=res.data.result.length
                                    res.data.result.map((value,index)=>{
                                        if(__DEV__)console.log('player:',searchPlayer(catchedFullPlayerList,value.player_id,this.uniondata))
                                        if(searchPlayer(catchedFullPlayerList,value.player_id,this.uniondata)!==null) {
                                            players.push(Object.assign(value,{info:searchPlayer(catchedFullPlayerList,value.player_id,this.uniondata)}))
                                                    // if(index===l-1) {                                                        
                                                    //     if(__DEV__)console.log('players:',players)
                                                    //     this.setState({isLoaded:true,players:players})
                                                    // }                                            
                                        }

                                        
                                    })
                                }
                                if(players.length>0) {
                                    players.map((value,index)=>{
                                        let optionsPlayerProfile = {
                                                    url: 'https://bilprod-livedev.azurewebsites.net/getTourPlayerProfile',
                                                    data:{id:value.player_id},
                                                    isRequiredToken: false,
                                                    method: 'post',
                                                    isQsStringify:false,
                                                    onSuccess: (res) => {
                                                        if (__DEV__)console.log('profile res.data',res.data)
                                                        let profileListOn_tour = ProfileListModel.fromJS([new ProfileModel()])
                                                        let profileListHistorical = ProfileListModel.fromJS([new ProfileModel()])

                                                        if (res.data instanceof Array  && res.data.length!==0) {
                                                            if (__DEV__)console.log('valid')
                                                            profileListOn_tour=ProfileListModel.fromJS([res.data[0].on_tour])
                                                            profileListHistorical=ProfileListModel.fromJS([res.data[0].historical])
                                                        }
                                                        profiles.push({     seq:index,
                                                                            profileListOn_tour:profileListOn_tour,
                                                                            profileListHistorical:profileListHistorical})
                                                        if(profiles.length===players.length) {
                                                            profiles.map((v,i)=>{
                                                                players[v.seq]=Object.assign(players[v.seq],{profileListOn_tour:v.profileListOn_tour,profileListHistorical:v.profileListHistorical})
                                                            })
                                                            this.setState({isLoaded:true,players:players})
                                                        }
                                                    },
                                                    onError: (res) => {
                                                        let profile = ProfileListModel.fromJS([new ProfileModel()])
                                                        profiles.push({seq:index,profile:profile})
                                                        if(profiles.length===players.length) {
                                                            profiles.map((v,i)=>{
                                                                players[v.seq]=Object.assign(players[v.seq],{profile:v.profile})
                                                            })
                                                            this.setState({isLoaded:true,players:players})
                                                        }
                                                    },
                                                    channel:'EYC3'
                                                }

                                        service(optionsPlayerProfile)
                                    })

                                }
                                else {
                                    this.setState({isLoaded:true})
                                }
                            }
                        },
                        onError: ()=>{
                            if(this.props.showModal)this._setModalVisible(true,'message','ERROR','Sorry something went wrong, please try again.','CLOSE')
                            this.setState({isLoaded:true})
                        },
                        isRequiredToken: false,
                        channel: 'EYC3',
                        isQsStringify:false
                      }
                    service(optionsInfo) 
                })
            }).catch((error) => {
                this.setState({isLoaded:true})
            })
        })
    }
_renderHeader(section,i) {
    let isShowBorderTop=((!(this.state.title || false)) && (i === 0))? true : false
    let isLastItem=(i===this.state.players.length-1)? true : false
    let listRowStyle = isLastItem? [locStyle.listRow, locStyle.listRowLast] : [locStyle.listRow]
    if (isShowBorderTop) {
        listRowStyle = listRowStyle.concat([locStyle.listRowWithBorderTop])
    }
    
    return (
        <View style={listRowStyle}>
            <View style={locStyle.listRowImage}>
                <ImagePlaceholder 
                    width={50}
                    height={50}>
                    <Image transparent
                        resizeMode='contain'
                        source={{uri: section.info.thumb}}
                        style={locStyle.listRowPlayerImage} />
                </ImagePlaceholder>
            </View>
            <View style={locStyle.listRowContent}>
                <View style={locStyle.detailRow}>
                    <View style={locStyle.detail}> 
                        <View style={locStyle.labels}>
                            <Text style={locStyle.order}>{section.rank}.</Text>
                            <Text style={locStyle.name}>{section.info.name}</Text>
                        </View>
                        <LineGraph value={section.value}/>
                    </View>
                    <View style={locStyle.scoreWrapper}>
                        <View style={locStyle.score}>
                                <Text style={locStyle.scoreText}>{Math.round(section.value*100)}%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
  }
 
  _renderContent(section,i) {
    let figureData = this.state.isOn_tour ? section.profileListOn_tour : section.profileListHistorical
    return (
        <View style={(i===this.state.players.length-1)?[locStyle.content, locStyle.contentLast] : [locStyle.content]}>
        {
            this.state.activeSection===i?
            <PlayerFigure 
                pressInfo={this._setModalVisible.bind(this)}
                wideLayout={true} 
                profile={figureData}
                onTitleClick={this.onTiltleClick}/>
            :
            null
        }
        </View>
    )
  }
   _setSection(section) {
    if(__DEV__)console.log('section',section)
    this.setState({ activeSection: section });
  }
      render() {
        let title = this.props.title || false
        return (
            <View>
                {
                    this.state.isLoaded?

                    <View style={locStyle.box}>
                        {
                            title &&
                            <View style={locStyle.header}>
                                <Text style={locStyle.headerText}>{title}</Text>
                            </View>
                        }
                        <View style={locStyle.list}>
                            <Accordion
                                sections={this.state.players}
                                renderHeader={this._renderHeader.bind(this)}
                                renderContent={this._renderContent.bind(this)}
                                underlayColor={'rgb(230, 231, 232)'}
                                duration={1000}
                                activeSection={this.state.activeSection}
                                onChange={this._setSection.bind(this)}
                              />
                        </View>
                        
                        <SquadModal
                            modalVisible={this.state.modalVisible}
                            callbackParent={this._setModalVisible}>
                            {this.state.modalContent}
                                
                        </SquadModal>
                    </View>
                    :
                    <ActivityIndicator style={loader.centered} size='large' />
                }
             </View>
        )
    }
}
