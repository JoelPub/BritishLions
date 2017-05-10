'use strict'

import React, { Component } from 'react'
import { Image, View, Text, ScrollView,ActivityIndicator } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from '../utility/buttonFeedback'
import ImagePlaceholder from '../utility/imagePlaceholder'
import Accordion from './accordion'
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
        marginHorizontal:100,
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

const Player = ({item, index, isLastItem, isShowBorderTop}) => {
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
                        source={{uri: item.info.thumb}}
                        style={locStyle.listRowPlayerImage} />
                </ImagePlaceholder>
            </View>
            <View style={locStyle.listRowContent}>
                <View style={locStyle.detailRow}>
                    <View style={locStyle.detail}> 
                        <View style={locStyle.labels}>
                            <Text style={locStyle.order}>{item.rank}.</Text>
                            <Text style={locStyle.name}>{item.info.name}</Text>
                        </View>
                        <LineGraph value={item.value}/>
                    </View>
                    <View style={locStyle.scoreWrapper}>
                        <View style={locStyle.score}>
                                <Text style={locStyle.scoreText}>{item.value*100}%</Text>
                        </View>
                    </View>
                </View>
            </View>
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

    componentDidMount(){
        this.setState({ isLoaded: false },()=>{
            getSoticFullPlayerList().then((catchedFullPlayerList) => {
                getMatchMan().then((data)=>{
                    let player=JSON.parse(data)
                    if(__DEV__)console.log('rank getMatchMan player',player)
                    let optionsInfo = {
                        url: player&&player.previous!==null?'http://bilprod-r4dummyapi.azurewebsites.net/resubmitManOfMatch':'http://bilprod-r4dummyapi.azurewebsites.net/GetManOfMatchVoteResult',
                        data: player&&player.previous!==null?{id:1,old_man_of_match:this.props.showModal?player.previous:'0',new_man_of_match:this.props.showModal?player.current:'0' }:{id:1,man_of_match : this.props.showModal?player.current:'0' },
                        onAxiosStart: null,
                        onAxiosEnd: null,
                        method: 'post',
                        onSuccess: (res) => {
                            // if (__DEV__)console.log('res',res)
                            if(res.data) {
                                if(this.props.showModal) this._setModalVisible(true,'message','SUCCESS','ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida mauris ac tincidunt interdum. Duis et urna nec mi commodo efficitur ut at nisi.\n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit.','CLOSE')
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
                                                    url: 'http://bilprod.azurewebsites.net/getOfficialSquadPlayerProfile',
                                                    data:{player_id:value.player_id},
                                                    isRequiredToken: false,
                                                    onSuccess: (res) => {
                                                        if (__DEV__)console.log('profile res.data',res.data)
                                                        let profile = ProfileListModel.fromJS([new ProfileModel()])
                                                        if (res.data instanceof Array  && res.data.length!==0) {
                                                            if (__DEV__)console.log('valid')
                                                            profile=ProfileListModel.fromJS(res.data)
                                                        }
                                                        profiles.push({seq:index,profile:profile})
                                                        if(profiles.length===players.length) {
                                                            profiles.map((v,i)=>{
                                                                players[v.seq]=Object.assign(players[v.seq],{profile:v.profile})
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
                            if(this.props.showModal)this._setModalVisible(true,'message','ERROR','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida mauris ac tincidunt interdum. Duis et urna nec mi commodo efficitur ut at nisi. ','CLOSE')
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
                            {
                                this.state.players.map((item, index)=>{
                                    let isLastItem = this.state.players.length === (index + 1)? true : false
                                    let contentStyle = isLastItem? [locStyle.content, locStyle.contentLast] : [locStyle.content]
                                    let isShowBorderTop = !title && index === 0? true : false

                                    return (
                                        <Accordion
                                            key={index}
                                            header={<Player item={item} isShowBorderTop={isShowBorderTop} key={index} index={index} isLastItem={isLastItem}/>}
                                        >
                                            <View style={contentStyle}>
                                                <PlayerFigure 
                                                    pressInfo={this._setModalVisible.bind(this)}
                                                    wideLayout={true} 
                                                    profile={item.profile}/>
                                            </View>
                                        </Accordion>
                                    )
                                }, this)
                            }
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
