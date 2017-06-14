'use strict'

import React, { Component } from 'react'
import {View,ActivityIndicator,Image,Text, Alert } from 'react-native'
import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import { connect } from 'react-redux'
import loader from '../../../../themes/loader-position'
import { drillDown } from '../../../../actions/content'
import { getSoticFullPlayerList} from '../../../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getEYC3OfficialSquad,removeEYC3OfficialSquad} from '../../../utility/apiasyncstorageservice/eyc3AsyncStorageService'
import {convertSquadToShow} from '../../../myLions/components/matchManToShow'
import MatchManModel from  '../../../../modes/Squad/matchManModel'
import Data from '../../../../../contents/unions/data'
import ButtonFeedback from '../../../utility/buttonFeedback'
import ImagePlaceholder from '../../../utility/imagePlaceholder'
import shapes from '../../../../themes/shapes'
import Swiper from 'react-native-swiper'
import styleVar from '../../../../themes/variable'
import Immutable, { Map, List,Iterable } from 'immutable'
import { strToUpper,splitName,mapJSON } from '../../../utility/helper'
import { service } from '../../../utility/services'
import Toast from 'react-native-root-toast'


const styles = styleSheetCreate({
    posBtn:{
        borderLeftWidth:1,
        borderColor:'rgb(239, 239, 240)',
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
    posSwiperRow:{
        flexDirection:'row',
        backgroundColor:'black',
        height:styleVar.deviceWidth*0.63
    },
    posWrapper:{
        width:styleVar.deviceWidth/3+1,
        marginLeft:-1
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
    }
})

const PlayerImgCell =({data,selected,onPress}) =>(
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
            <View style={[shapes.triangle,selected&&{borderBottomColor:'rgb(9,127,64)'}]} />
            <View style={[styles.titleBox,selected&&{backgroundColor:'rgb(9,127,64)'}]}>
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


class MatchMan extends Component {
    constructor(props){
            super(props)
            this.uniondata = Data
            this.state = {
                isLoaded: false,
                matchMan: {},
                isNetwork: true,
                selectedPosition:null,
                selectedSequence:null,
                gameID:this.props.detail.id

            }
    }

    _showError(error) {
        if(!this.state.isNetwork) return

        if(error === 'Please make sure that you\'re connected to the network.') {
           this.setState({
               isNetwork: false
           })
        }
        let toast = Toast.show('An error occured', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                
            }
        })
    }

    componentDidMount() {
        setTimeout(() => this._getSquad(), 600)
    }

    _getSquad(){
      if (__DEV__)console.log('_getSquad')
      this.setState({ isLoaded: false },()=>{
          getSoticFullPlayerList().then((catchedFullPlayerList) => {
              if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                  // getEYC3OfficialSquad().then((catchedOfficialSquad) => {
                  //       if (__DEV__)console.log('catchedOfficialSquad',catchedOfficialSquad)
                  //       if(catchedOfficialSquad !== null && catchedOfficialSquad !== 0 && catchedOfficialSquad !== -1) {
                  //           let showSquadFeed=convertSquadToShow(MatchManModel(catchedOfficialSquad),catchedFullPlayerList,this.uniondata)
                  //           if (__DEV__)console.log('showSquadFeed',showSquadFeed.toJS())
                  //           // this.props.setOfficialSquadToShow(showSquadFeed.toJS())
                  //           this.setState({matchMan:showSquadFeed.toJS()},()=>{
                  //               this.setState({isLoaded:true})
                  //           })
                            
                  //       }
                  //       else {
                  //           this.setState({ isLoaded: true })
                  //       }
                  // }).catch((error) => {
                  //       this.setState({ isLoaded: true }, () => {
                  //               this._showError(error) // prompt error
                  //       })
                  // })

                    let optionsInfo = {
                        url: 'https://bilprod.azurewebsites.net/GetManOfMatchInfo',
                        data: {id:this.state.gameID},
                        onAxiosStart: null,
                        onAxiosEnd: null,
                        method: 'post',
                        onSuccess: (json)=>{
                                        if(json.data) {
                                                    if (__DEV__)console.log('json.data',json.data)
                                                    let showSquadFeed=convertSquadToShow(MatchManModel(json.data),catchedFullPlayerList,this.uniondata)
                                                    if (__DEV__)console.log('showSquadFeed',showSquadFeed.toJS())
                                                    // this.props.setOfficialSquadToShow(showSquadFeed.toJS())
                                                    if (__DEV__)console.log('this.props.preSelect',this.props.preSelect)
                                                    if(this.props.preSelect&&this.props.preSelect.current) {
                                                        showSquadFeed.forEach((value,index)=>{
                                                            if (__DEV__)console.log('index',index)
                                                            value.map((v,i)=>{
                                                                if (__DEV__)console.log('i',i)
                                                                if(v.info.id===this.props.preSelect.current) {
                                                                    if (__DEV__)console.log('v',v)
                                                                    this.setState({selectedPosition:index,selectedSequence:i},()=>{
                                                                                        this.props.selectMan(v.info)
                                                                                    })
                                                                }
                                                            })
                                                        })                                                        
                                                    }
                                                    this.setState({matchMan:showSquadFeed.toJS()},()=>{
                                                        this.setState({isLoaded:true})
                                                    })
                                        }
                                        else {
                                            this.setState({ isLoaded: true })
                                        }
                                      },
                        onError: (error) => {
                                        this.setState({ isLoaded: true }, () => {
                                                this._showError(error) // prompt error
                                            })
                                        },

                        isRequiredToken: false,
                        channel: 'EYC3',
                        isQsStringify:false
                      }
                        service(optionsInfo)

              }
          }).catch((error) => {
              this.setState({ isLoaded: true }, () => {
                      this._showError(error) // prompt error
              })
          })
      })
    }

    _selectMan(position,seq,info) {
            if (__DEV__)console.log('position',position)
            if (__DEV__)console.log('seq',seq)
            let p=null
            let s=null
            let i=null
            if(position!==this.state.selectedPosition||seq!==this.state.selectedSequence) {
                p=position
                s=seq
                i=info
            }
            this.setState({selectedPosition:p,selectedSequence:s},()=>{
                this.props.selectMan(i)
            })
    }

	render() {
		return (
			<View>
				{
	                (this.state.isLoaded && this.state.matchMan.is_available)?
	                <View>
		                <PositionTitle pos='FORWARDS' data={this.state.matchMan.forwards}/>
		                <Swiper
		                height={this.state.matchMan.forwards.length>3?styleVar.deviceWidth*0.63:styleVar.deviceWidth*0.49}
                        loop={true}
                        dot={<View style={styles.paginationDot} />}
                        activeDot={<View style={[styles.paginationDot, styles.paginationDotActive]} />}
                        paginationStyle={styles.paginationBottom}>
		                    {
		                        mapJSON(this.state.matchMan.forwards,3).map((rowData,i)=>{
		                            return(
		                                <View style={styles.posSwiperRow} key={i}>
		                                    {
		                                        rowData.map((item,index)=>{
		                                            return(
		                                                    <View style={styles.posWrapper} key={index}>
		                                                            <PlayerImgCell data={item} selected={this.state.selectedPosition==='forwards'&&this.state.selectedSequence===(3*i+index)} onPress = {() => this._selectMan('forwards',(3*i+index),item.info)}/>
		                                                    </View>
		                                                )
		                                        }, this)
		                                    }
		                                </View>
		                            )

		                        },this)
		                    }
		                </Swiper>
		                
		                <PositionTitle pos='BACKS' data={this.state.matchMan.backs}/>
		                <Swiper
		                height={this.state.matchMan.backs.length>3?styleVar.deviceWidth*0.63:styleVar.deviceWidth*0.49}
                        loop={true}
                        dot={<View style={styles.paginationDot} />}
                        activeDot={<View style={[styles.paginationDot, styles.paginationDotActive]} />}
                        paginationStyle={styles.paginationBottom}>
		                    {
		                        mapJSON(this.state.matchMan.backs,3).map((rowData,i)=>{
		                            return(
		                                <View style={styles.posSwiperRow} key={i}>
		                                    {
		                                        rowData.map((item,index)=>{
		                                            return(
		                                                <View style={styles.posWrapper} key={index}>
		                                                        <PlayerImgCell data={item} selected={this.state.selectedPosition==='backs'&&this.state.selectedSequence===(3*i+index)} onPress = {() => this._selectMan('backs',(3*i+index),item.info)}/>
		                                                </View>
		                                                )
		                                        }, this)
		                                    }
		                                </View>
		                            )

		                        },this)
		                    }
		                </Swiper>
                    <PositionTitle pos='REPLACEMENT' data={this.state.matchMan.reserves}/>
                    <Swiper
                      height={this.state.matchMan.reserves.length>3?styleVar.deviceWidth*0.63:styleVar.deviceWidth*0.49}
                      loop={true}
                      dot={<View style={styles.paginationDot} />}
                      activeDot={<View style={[styles.paginationDot, styles.paginationDotActive]} />}
                      paginationStyle={styles.paginationBottom}>
                      {
                        mapJSON(this.state.matchMan.reserves,3).map((rowData,i)=>{
                          return(
                            <View style={styles.posSwiperRow} key={i}>
                              {
                                rowData.map((item,index)=>{
                                  return(
                                    <View style={styles.posWrapper} key={index}>
                                      <PlayerImgCell data={item} selected={this.state.selectedPosition==='replacements'&&this.state.selectedSequence===(3*i+index)} onPress = {() => this._selectMan('replacements',(3*i+index),item.info)}/>
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

export default connect(null, bindAction)(MatchMan)