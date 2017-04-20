'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import Swiper from 'react-native-swiper'
import ButtonFeedback from '../utility/buttonFeedback'
import ImagePlaceholder from '../utility/imagePlaceholder'
import shapes from '../../themes/shapes'

const styles = styleSheetCreate({ 
     posSwiperRow: {
        flexDirection:'row',
        backgroundColor:'black',
        height: styleVar.deviceWidth*0.63
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

    render() {
        return (
            <View>
                <Swiper
                    height={styleVar.deviceWidth*0.63}
                    loop={false}
                    dotColor='rgba(255,255,255,0.3)'
                    activeDotColor='rgb(239,239,244)'
                    paginationStyle={{bottom:styleVar.deviceWidth/20}}>
                    {
                        this._mapJSON(this.state.players, 3).map((rowData, i)=>{
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
