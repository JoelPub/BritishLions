'use strict'

import React, { Component } from 'react'
import {View,ActivityIndicator,Image,Text, Alert } from 'react-native'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import { connect } from 'react-redux'
import loader from '../../../themes/loader-position'
import { drillDown } from '../../../actions/content'
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getEYC3OfficialSquad,removeEYC3OfficialSquad} from '../../utility/apiasyncstorageservice/eyc3AsyncStorageService'
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


const styles = styleSheetCreate({    
    individaulPositionRow:{
        flexDirection:'row'
    },
    posBtn:{
        borderLeftWidth:1,
        borderColor:'rgb(255,255,255)'
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
        borderWidth:1,
        borderColor:'rgb(216,217,218)',
        height:50,
        paddingHorizontal:12,
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
        lineHeight:24,
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
        height:styleVar.deviceWidth*0.6
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
    }
})

const PlayerImgCell =({data,onPress}) =>(
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
			console.log('item',item)
			console.log('route',route)
			console.log('this.state.details',this.state.details)
			this.props.drillDown(item, route)
    }

    componentDidMount() {
        setTimeout(() => this._getSquad(), 600)
    }

    _getSquad(){
      console.log('_getSquad')
      this.setState({ isLoaded: false },()=>{
          getSoticFullPlayerList().then((catchedFullPlayerList) => {
              if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                  getEYC3OfficialSquad().then((catchedOfficialSquad) => {
                        console.log('catchedOfficialSquad',catchedOfficialSquad)
                        if(catchedOfficialSquad !== null && catchedOfficialSquad !== 0 && catchedOfficialSquad !== -1) {
                            let showSquadFeed=convertSquadToShow(GamedayTeamModel(catchedOfficialSquad),catchedFullPlayerList,this.uniondata)
                            console.log('showSquadFeed',showSquadFeed.toJS())
                            // this.props.setOfficialSquadToShow(showSquadFeed.toJS())
                            this.setState({gameDayTeam:showSquadFeed.toJS()},()=>{
                                this.setState({isLoaded:true})
                            })
                            
                        }
                        else {
                            this.setState({ isLoaded: true })
                        }
                  }).catch((error) => {
                        this.setState({ isLoaded: true }, () => {
                                this._showError(error) // prompt error
                        })
                  })

              }
          }).catch((error) => {
              this.setState({ isLoaded: true }, () => {
                      this._showError(error) // prompt error
              })
          })
      })
    }


	render() {
		return (
			<View>
				<View style={styles.subject}>
			      <Text style={styles.subjectText}>GAME-DAY TEAM</Text>
			    </View>
				{
	                this.state.isLoaded?
	                <View>
		                <PositionTitle pos='FORWARDS' data={this.state.gameDayTeam.forwards}/>
		                <Swiper
		                height={styleVar.deviceWidth*0.6}
		                loop={false}
		                dotColor='rgba(255,255,255,0.3)'
		                activeDotColor='rgb(239,239,244)'
		                paginationStyle={{bottom:styleVar.deviceWidth/20}}>
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
		                height={styleVar.deviceWidth*0.6}
		                loop={false}
		                dotColor='rgba(255,255,255,0.3)'
		                activeDotColor='rgb(239,239,244)'
		                paginationStyle={{bottom:styleVar.deviceWidth/20}}>
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
		                height={styleVar.deviceWidth*0.6}
		                loop={false}
		                dotColor='rgba(255,255,255,0.3)'
		                activeDotColor='rgb(239,239,244)'
		                paginationStyle={{bottom:styleVar.deviceWidth/20}}>
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
	                <ActivityIndicator style={loader.centered} size='large' />
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
