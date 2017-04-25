'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import Swiper from 'react-native-swiper'
import ButtonFeedback from '../utility/buttonFeedback'
import ImagePlaceholder from '../utility/imagePlaceholder'
import { mapJSON } from '../utility/helper'
import shapes from '../../themes/shapes'

const styles = styleSheetCreate({ 
     posSwiperRow: {
        flexDirection:'row',
        backgroundColor:'black',
        height: styleVar.deviceWidth*0.63
    },
    title:{
        flexDirection:'row',
        justifyContent:'center',
        borderWidth: 1,
        borderColor: 'rgb(216,217,218)',
        height: 50,
        paddingTop: 15,
        backgroundColor: 'rgb(239,239,240)',
        android:{
            paddingHorizontal: 12,
        }
    },
    titleText:{
        color:'rgb(175,0,30)',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
    },
    posWrapper: {
        width: styleVar.deviceWidth/3+1,
        marginLeft: -1
    },
    posBtn: {
        borderLeftWidth: 1,
        borderColor: 'rgb(255,255,255)'
    },
    playerNameTextWrapper: {
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
        color: '#FFF',
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
    }
})

const PlayerImgCell = ({data, onPress}) => (
    <ButtonFeedback onPress={onPress} style={styles.posBtn}>
        <ImagePlaceholder 
            width = {styleVar.deviceWidth / 3}
            height = {styleVar.deviceWidth / 3}>
            <Image transparent
                resizeMode='contain'
                source={{uri: data.image}}
                style={styles.playerImage} />
        </ImagePlaceholder>
        <View style={styles.playerNameTextWrapper}>
            <View style={[shapes.triangle]} />
            <View style={styles.titleBox}>
                <Text style={styles.playerNameText} numberOfLines={1}>
                    { data.name && data.name.toUpperCase().substring(0, data.name.lastIndexOf(" ")) }
                </Text>
                <Text style={styles.playerNameText} numberOfLines={1}>
                    { data.name && data.name.toUpperCase().substring(data.name.lastIndexOf(" ")+1, data.name.length) }
                </Text>
            </View>
        </View>
    </ButtonFeedback>
)

const Title = ({title}) => (
    <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
    </View>
)

export default class PlayersListSlider extends Component {
    constructor(props){
        super(props)

        this.state = {
            players: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            players: nextProps.data
        })
    }

    render() {
        return (
            <View>
                {
                    this.props.title&& <Title title={this.props.title} />
                }
                
                <Swiper
                    height={styleVar.deviceWidth*0.63}
                    loop={false}
                    dot={<View style={styles.paginationDot} />}
                    activeDot={<View style={[styles.paginationDot, styles.paginationDotActive]} />}
                    paginationStyle={{bottom: styleVar.deviceWidth/20}}>
                    {
                        mapJSON(this.state.players, 3).map((rowData, i)=>{
                            return(
                                <View style={styles.posSwiperRow} key={i}>
                                    {
                                        rowData.map((item, index)=>{
                                            return(
                                                <View style={styles.posWrapper} key={index}>
                                                    <PlayerImgCell data={item} onPress={() => this.props.callbackPress(item)} />
                                                </View>
                                            )
                                        }, this)
                                    }
                                </View>
                            )
                        }, this)
                    }
                </Swiper>
            </View>
        )
    }
}
