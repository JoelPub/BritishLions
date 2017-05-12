'use strict'

import React, { Component } from 'react'
import {View,ActivityIndicator,Image,Text, Alert } from 'react-native'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import { connect } from 'react-redux'
import loader from '../../../themes/loader-position'
import { drillDown } from '../../../actions/content'
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getEYC3OfficialSquad, removeEYC3OfficialSquad, getEYC3GameDayTeam, removeEYC3GameDayTeam} from '../../utility/apiasyncstorageservice/eyc3AsyncStorageService'
import {convertSquadToShow} from '../../myLions/components/gamedayTeamToShow'
import GamedayTeamModel from  '../../../modes/Squad/gamedayTeamModel'
import Data from '../../../../contents/unions/data'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import shapes from '../../../themes/shapes'
import Swiper from 'react-native-swiper'
import styleVar from '../../../themes/variable'
import Immutable, { Map, List,Iterable } from 'immutable'
import { strToUpper,splitName,mapJSON } from '../../utility/helper'
import { isEmptyObject } from '../../utility/helper'

const styles = styleSheetCreate({    
    individaulPositionRow:{
        flexDirection:'row',
    },
    posBtn:{
        borderLeftWidth:1,
        borderColor:'rgb(239, 239, 240)',
    },
    addPlayerIcon:{
        fontSize:60,
        color:'rgb(255,255,255)'
    },
    playerPositionTextWrapper:{
        height:styleVar.deviceWidth*0.16,
        justifyContent: 'center',
        paddingTop:5
    },
    playerNameTextWrapper:{
        marginTop:-12,
    },
    titleBox: {
        position: 'relative',
        backgroundColor: styleVar.brandLightColor,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 14,
        height:styleVar.deviceWidth*0.16,
        paddingHorizontal: 2,
        android: {
            paddingTop: 12,
            paddingBottom: 6
        }
    },
    playerPositionText: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 18,
        lineHeight: 18,
        backgroundColor: 'transparent',
    },
    playerNameText: {
        color: '#FFF',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 18,
        lineHeight: 18,
        paddingBottom: 2,
        marginTop: -6,
        backgroundColor: 'transparent',
        android: {
            marginTop: -2,
            paddingBottom: 3,
        }
    },
    playerImage:{
        backgroundColor: '#FFF',
        width: styleVar.deviceWidth / 3,
        height: styleVar.deviceWidth / 3
    },
    indivPlayerImage:{
        backgroundColor: '#FFF',
        width: styleVar.deviceWidth / 2,
        height: styleVar.deviceWidth / 2
    },
    posTitle:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:styleVar.deviceWidth,
        borderBottomWidth:1,
        borderTopWidth:1,
        borderColor:'rgb(216,217,218)',
        height:50,
        paddingTop:15,
        backgroundColor:'rgb(239,239,240)',
    },
    posTitleCenter:{
        color:'rgb(175,0,30)',
        textAlign:'center',
        justifyContent:'center',
        width:styleVar.deviceWidth,
        fontFamily: styleVar.fontCondensed,
        fontSize:24,
        lineHeight:24
    },
    posTitleLeft:{
        color:'rgb(175,0,30)',
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize:24,
        lineHeight:24,
    },
    posTitleRight:{
        color:'rgb(175,0,30)',
        textAlign:'right',
        fontFamily: styleVar.fontCondensed,
        fontSize:24,
        lineHeight:24,
    },
    indivPosition:{
        width:styleVar.deviceWidth/2+1,
        backgroundColor:'rgb(255,255,255)',
        marginLeft:-1
    },
    indivPosTitle:{
        borderTopWidth:1,
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderColor:'rgb(216,217,218)',
        height:50,
        paddingTop:17,
        backgroundColor:'rgb(239,239,240)',
        borderRightWidth:1
    },
    indivPosTitleText:{
        color:'rgb(175,0,30)',
        textAlign:'center',
        fontFamily: styleVar.fontCondensed,
        fontSize:24,
        lineHeight:24,
    },
    posSwiperRow:{
        flexDirection:'row',
        backgroundColor:'black',
        height:styleVar.deviceWidth*0.63
    },
    posWrapper:{
        width:styleVar.deviceWidth/3+1,
        marginLeft:-1
    },
    posAddWrapper:{
        width:styleVar.deviceWidth / 3,
        height:styleVar.deviceWidth / 3,
        backgroundColor:'rgb(175,0,30)',
        justifyContent:'center',
        alignItems:'center',
    },
    subject:{
    	backgroundColor: styleVar.colorText,
        paddingTop: 20,
        paddingBottom: 6,
    },
    subjectText: {
    	alignSelf: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: '#FFF',
        backgroundColor: 'transparent',
        textAlign:'center',
        android: {
            paddingBottom: 5
        }
    },
    paginationDot: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        width: 10, 
        height: 10,
        borderRadius: 5, 
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 3
    },
    paginationDotActive: {
        backgroundColor: 'rgb(239,239,244)', 
    },
    paginationBottom: {
        bottom: styleVar.deviceWidth/21
    },
    paginationBottomLast: {
        bottom: styleVar.deviceWidth/23
    },
    tag: {
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        top: 0
    },
    tagBG: {
        
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',

        borderRightWidth: 70,
        borderTopWidth: 70,
        borderRightColor: 'transparent',
        borderTopColor: 'rgb(9, 127, 64)',
    },
    tagTextWrapper: {
        position: 'absolute',
        left: 8,
        top: 10,
        transform: [
            {
                rotate: '-45deg'
            }
        ],

        android: {
            top: 13,
            left: 7
        }
    },
    tagText: {
        backgroundColor: 'transparent',
        color: '#FFF',
        fontSize: 13,
        lineHeight: 13,
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
    },
    tagText2: {
        marginTop: -2
    }
})

const CaptainTag = () => (
    <View style={styles.tag}>
        <View style={styles.tagBG}></View>
        <View style={styles.tagTextWrapper}>
            <Text style={styles.tagText}>MATCH</Text>
            <Text style={[styles.tagText, styles.tagText2]}>CAPTAIN</Text>
        </View>
    </View>
)

const PlayerImgCell =({data, onPress}) =>(
    <ButtonFeedback onPress={onPress} style={styles.posBtn}>
        <ImagePlaceholder 
            width = {styleVar.deviceWidth / 3}
            height = {styleVar.deviceWidth / 3}>
            <Image transparent
                resizeMode='contain'
                source={{uri:data.info.image}}
                style={styles.playerImage} />
        </ImagePlaceholder>
        <View style={styles.playerNameTextWrapper}>
            <View style={[shapes.triangle]} />
            <View style={styles.titleBox}>
                <Text style={styles.playerNameText} numberOfLines={1}>{data.info.name&&data.info.name.toUpperCase().substring(0, data.info.name.lastIndexOf(" "))}</Text>
                <Text style={styles.playerNameText} numberOfLines={1}>{data.info.name&&data.info.name.toUpperCase().substring(data.info.name.lastIndexOf(" ")+1, data.info.name.length)}</Text>
            </View>
        </View>
        {
            data.info.isMatchedCaptain && <CaptainTag/>
        }
    </ButtonFeedback>
)

const PositionTitle =({pos,data}) =>(
    <View style={styles.posTitle}>
      <Text style={styles.posTitleCenter}>{pos.toUpperCase()}</Text>
    </View>
)


class GamedayTeam extends Component {
	constructor(props){
        	super(props)
			this.uniondata = Data
			this.state = {
			    isLoaded: false,
			    gameDayTeam: {},
			    isNetwork: true,
			}
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

    _showDetail(item, route,playerPos,max,seq) {
        if (__DEV__)console.log('item',item)
        if (__DEV__)console.log('route',route)
        if (__DEV__)console.log('this.state.details',this.state.details)
        this.props.drillDown(item, route)
    }

    componentDidMount() {
        //setTimeout(() => this._getSquad(), 600) // OLD
        setTimeout(() => this._getDayTeam(), 600) // R4
    }

    // _getSquad(){
    //   if (__DEV__)console.log('_getSquad')
    //   this.setState({ isLoaded: false },()=>{
    //       getSoticFullPlayerList().then((catchedFullPlayerList) => {
    //           if (__DEV__)console.log('catchedFullPlayerList', catchedFullPlayerList)
    //           if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
    //               getEYC3OfficialSquad().then((catchedOfficialSquad) => {
    //                     if (__DEV__)console.log('catchedOfficialSquad',catchedOfficialSquad)
    //                     if(catchedOfficialSquad !== null && catchedOfficialSquad !== 0 && catchedOfficialSquad !== -1) {
    //                         let showSquadFeed=convertSquadToShow(GamedayTeamModel(catchedOfficialSquad),catchedFullPlayerList,this.uniondata)
    //                         if (__DEV__)console.log('showSquadFeed',showSquadFeed.toJS())
    //                         // this.props.setOfficialSquadToShow(showSquadFeed.toJS())
    //                         this.setState({gameDayTeam:showSquadFeed.toJS()},()=>{
    //                             this.setState({isLoaded:true})
    //                         })
                            
    //                     }
    //                     else {
    //                         this.setState({ isLoaded: true })
    //                     }
    //               }).catch((error) => {
    //                     this.setState({ isLoaded: true }, () => {
    //                             this._showError(error) // prompt error
    //                     })
    //               })

    //           }
    //       }).catch((error) => {
    //           this.setState({ isLoaded: true }, () => {
    //                   this._showError(error) // prompt error
    //           })
    //       })
    //   })
    // }

    _callbackIsTeamAvailable(isAvailable) {
        console.log('_callbackIsTeamAvailable: ', isAvailable)
        if (this.props.isGameTeamAvailable) {
            this.props.isGameTeamAvailable(isAvailable)
        }
    }

    _getDayTeam() {
        let gameID = this.props.gameID || null

        this.setState({ isLoaded: false }, () => {
            getSoticFullPlayerList().then((catchedFullPlayerList) => {
                if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                    removeEYC3GameDayTeam()
                    getEYC3GameDayTeam(gameID).then((catchedGameDayTeam) => {
                        if (__DEV__) console.log('catchedGameDayTeam', catchedGameDayTeam)

                        if(catchedGameDayTeam !== null && catchedGameDayTeam !== 0 && catchedGameDayTeam !== -1) {
                            // check if team is available or not
                            if (catchedGameDayTeam.success && catchedGameDayTeam.success === 'false') {
                                // set team availability
                                this._callbackIsTeamAvailable(false)
                            } else {
                                let showSquadFeed = convertSquadToShow(GamedayTeamModel(catchedGameDayTeam),catchedFullPlayerList,this.uniondata)
                                //if (__DEV__)console.log('showSquadFeed', showSquadFeed)

                                // match captain tag
                                showSquadFeed = this._getMatchCaptianTag(showSquadFeed.toJS())

                                // this.props.setOfficialSquadToShow(showSquadFeed.toJS())
                                this.setState({gameDayTeam: showSquadFeed}, ()=>{
                                    this.setState({isLoaded: true})

                                    // set team availability
                                    this._callbackIsTeamAvailable(true)
                                })
                            }
                        } else {
                            // set team availability
                            this._callbackIsTeamAvailable(false)
                        }
                    }).catch((error) => {
                        // set team availability
                        // this._callbackIsTeamAvailable(false)

                        // this.setState({ isLoaded: true }, () => {
                        //     this._showError(error) // prompt error
                        // })
                    })
                }
            }).catch((error) => {
                // this.setState({ isLoaded: true }, () => {
                //     this._showError(error) // prompt error
                // })
            })
        })
    }

    _getMatchCaptianTag(squadList) {
        // check if there's captain, then match captain tag
        if (squadList.captain && !isEmptyObject(squadList.captain) && squadList.captain.id) {
            let captainID = squadList.captain.id
            // forwards
            if (Array.isArray(squadList.forwards)) {
                squadList.forwards.map((player, playerIndex) => {
                    let info = player.info
                    let playerID = info.id
                    
                    info.isMatchedCaptain = (playerID === captainID)? true : false
                })
            }

            // backs
            if (Array.isArray(squadList.backs)) {
                squadList.backs.map((player, playerIndex) => {
                    let info = player.info
                    let playerID = info.id
                    
                    info.isMatchedCaptain = (playerID === captainID)? true : false
                })
            }

            // reserves
            if (Array.isArray(squadList.reserves)) {
                squadList.reserves.map((player, playerIndex) => {
                    let info = player.info
                    let playerID = info.id
                    
                    info.isMatchedCaptain = (playerID === captainID)? true : false
                })
            }
        } 
        
        return squadList
    }

	render() {
		return (
			<View>
				{
	                this.state.isLoaded?
                        <View>
                            {
                                this.props.isHideTitle? null :
                                    <View style={styles.subject}>
                                        <Text style={styles.subjectText}>GAME-DAY TEAM</Text>
                                    </View>
                            }
                            <PositionTitle pos='FORWARDS' data={this.state.gameDayTeam.forwards}/>
                            <Swiper
                            height={this.state.gameDayTeam.forwards.length>3?styleVar.deviceWidth*0.63:styleVar.deviceWidth*0.49}
                            loop={false}
                            dot={<View style={styles.paginationDot} />}
                            activeDot={<View style={[styles.paginationDot, styles.paginationDotActive]} />}
                            paginationStyle={styles.paginationBottom}>
                                {
                                    mapJSON(this.state.gameDayTeam.forwards,3).map((rowData,i)=>{
                                        return(
                                            <View style={styles.posSwiperRow} key={i}>
                                                {
                                                    rowData.map((item,index)=>{
                                                        return(
                                                                <View style={styles.posWrapper} key={index}>
                                                                        <PlayerImgCell data={item} onPress = {() => this._showDetail(item.info,'myLionsPlayerProfile')}/>
                                                                </View>
                                                            )
                                                    }, this)
                                                }
                                            </View>
                                        )

                                    },this)
                                }
                            </Swiper>
                            
                            <PositionTitle pos='BACKS' data={this.state.gameDayTeam.backs}/>
                            <Swiper
                            height={this.state.gameDayTeam.backs.length>3?styleVar.deviceWidth*0.63:styleVar.deviceWidth*0.49}
                            loop={false}
                            dot={<View style={styles.paginationDot} />}
                            activeDot={<View style={[styles.paginationDot, styles.paginationDotActive]} />}
                            paginationStyle={styles.paginationBottom}>
                                {
                                    mapJSON(this.state.gameDayTeam.backs,3).map((rowData,i)=>{
                                        return(
                                            <View style={styles.posSwiperRow} key={i}>
                                                {
                                                    rowData.map((item,index)=>{
                                                        return(
                                                            <View style={styles.posWrapper} key={index}>
                                                                    <PlayerImgCell data={item} onPress = {() => this._showDetail(item.info,'myLionsPlayerProfile')}/>
                                                            </View>
                                                            )
                                                    }, this)
                                                }
                                            </View>
                                        )

                                    },this)
                                }
                            </Swiper>

                            
                            <PositionTitle pos='RESERVES' data={this.state.gameDayTeam.reserves}/>
                            <Swiper
                            height={this.state.gameDayTeam.reserves.length>3?styleVar.deviceWidth*0.63:styleVar.deviceWidth*0.49}
                            loop={false}
                            dot={<View style={styles.paginationDot} />}
                            activeDot={<View style={[styles.paginationDot, styles.paginationDotActive]} />}
                            paginationStyle={[styles.paginationBottom, styles.paginationBottomLast]}>
                                {
                                    mapJSON(this.state.gameDayTeam.reserves,3).map((rowData,i)=>{
                                        return(
                                            <View style={styles.posSwiperRow} key={i}>
                                                {
                                                    rowData.map((item,index)=>{
                                                        return(
                                                            <View style={styles.posWrapper} key={index}>
                                                                <PlayerImgCell data={item} onPress = {() => this._showDetail(item.info,'myLionsPlayerProfile')}/>
                                                            </View>
                                                        )
                                                    }, this)
                                                }
                                            </View>
                                        )

                                    },this)
                                }
                            </Swiper>

                        </View>
	                :
	                    <ActivityIndicator style={[loader.centered,{height:2*styleVar.deviceWidth}]} size='small' />
	            }
	         </View>
            )
	}
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
    }
}

export default connect(null, bindAction)(GamedayTeam)