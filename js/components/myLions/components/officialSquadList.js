'use strict'

import React, { Component } from 'react'
import { View,Image, } from 'react-native'
import { Text, Icon } from 'native-base'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import shapes from '../../../themes/shapes'
import Swiper from 'react-native-swiper'
import styleVar from '../../../themes/variable'
import Immutable, { Map, List,Iterable } from 'immutable'

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
        textAlign: 'center',
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
        paddingTop:15,
        backgroundColor:'rgb(239,239,240)',
        android:{
            paddingHorizontal:12,
        }
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
})

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
                    { pos.toUpperCase() }
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
const IndivPlayerImgCell =({data,onPress}) =>(
    <ButtonFeedback onPress={onPress} style={styles.posBtn}>
        <ImagePlaceholder 
            width = {styleVar.deviceWidth / 2}
            height = {styleVar.deviceWidth / 2}>
            <Image transparent
                resizeMode='contain'
                source={data.image}
                style={styles.indivPlayerImage} />
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
      <Text style={styles.posTitleCenter}>{pos.toUpperCase()}</Text>
    </View>
)


export default class OfficialSquadList extends Component {
	constructor(props){
        super(props)
    }

	render() {
		return (

            <View>

                <View style={styles.individaulPositionRow}>
                {
                    this.props.squadDatafeed.indivPos.map((item,index)=>{
                        let position = item.position.toUpperCase()
                        return (
                            <View style={styles.indivPosition} key={index}>
                                <View style={styles.indivPosTitle}>
                                    <Text style={styles.indivPosTitleText}>
                                        { position}
                                    </Text>
                                </View>
                                {
                                item.info===null?
                                <AddPlayerCell pos={item.position}/>
                                :
                                <IndivPlayerImgCell data={item.info} onPress = {() => this.props.pressImg(item.info,item.position==='coach'?'myLionsCoachProfile':'myLionsPlayerDetails',item.position,1,0)}/>
                                }
                            </View>
                        )
                    },this) 
                }                                
                </View>

                <PositionTitle pos='FORWARDS' data={this.props.squadDatafeed.forwards}/>
                <Swiper
                height={styleVar.deviceWidth*0.63}
                loop={false}
                dotColor='rgba(255,255,255,0.3)'
                activeDotColor='rgb(239,239,244)'
                paginationStyle={{bottom:styleVar.deviceWidth/20}}>
                    {
                        this._mapJSON(this.props.squadDatafeed.forwards,3).map((rowData,i)=>{
                            return(
                                <View style={styles.posSwiperRow} key={i}>
                                    {
                                        rowData.map((item,index)=>{
                                            return(
                                                    <View style={styles.posWrapper} key={index}>
                                                        {   
                                                            item===null?
                                                            <AddPlayerCell pos='FORWARDS'/>
                                                            :
                                                            <PlayerImgCell data={item} onPress = {() => this.props.pressImg(item,'myLionsPlayerDetails','forwards',16,index)}/>
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
                
                <PositionTitle pos='BACKS' data={this.props.squadDatafeed.backs}/>
                <Swiper
                height={styleVar.deviceWidth*0.63}
                loop={false}
                dotColor='rgba(255,255,255,0.3)'
                activeDotColor='rgb(239,239,244)'
                paginationStyle={{bottom:styleVar.deviceWidth/20}}>
                    {
                        this._mapJSON(this.props.squadDatafeed.backs,3).map((rowData,i)=>{
                            return(
                                <View style={styles.posSwiperRow} key={i}>
                                    {
                                        rowData.map((item,index)=>{
                                            return(
                                                <View style={styles.posWrapper} key={index}>
                                                {
                                                    item===null?                                                        
                                                       <AddPlayerCell pos='BACKS'/>
                                                    :
                                                        <PlayerImgCell data={item} onPress = {() => this.props.pressImg(item,'myLionsPlayerDetails','backs',16,index)}/>
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

            </View>
			
			)
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
}
