'use strict'

import React, { Component } from 'react'
import { Image, View, Text, ScrollView } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from '../utility/buttonFeedback'
import ImagePlaceholder from '../utility/imagePlaceholder'
import Accordion from './accordion'
import PlayerFigure from './playerFigure'
import ProfileListModel from  'modes/Players'
import ProfileModel from 'modes/Players/Profile'
import SquadModal from './squadModal'

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
})

const LineGraph = (data) => {
    let spacer = parseFloat('0.' + (100 - parseInt(data.value)))
    let value = parseFloat('0.' + parseInt(data.value))

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
                        source={{uri: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/68811.jpg'}}
                        style={locStyle.listRowPlayerImage} />
                </ImagePlaceholder>
            </View>
            <View style={locStyle.listRowContent}>
                <View style={locStyle.detailRow}>
                    <View style={locStyle.detail}> 
                        <View style={locStyle.labels}>
                            <Text style={locStyle.order}>{index + 1}.</Text>
                            <Text style={locStyle.name}>{item.name}</Text>
                        </View>
                        <LineGraph value={item.percentage}/>
                    </View>
                    <View style={locStyle.scoreWrapper}>
                        <View style={locStyle.score}>
                                <Text style={locStyle.scoreText}>{item.percentage}%</Text>
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

        this.state = {
            ranking: [],
            modalVisible: false,
            profile: ProfileListModel.fromJS([new ProfileModel()]),
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ranking: nextProps.data
        })
    }

    _setModalVisible = (visible, info) => {
        this.setState({
            modalVisible: visible
        })
    }

    render() {
        let itemsLength = this.state.ranking.length
        let title = this.props.title || false

        return (

            <View style={locStyle.box}>
                {
                    title &&
                    <View style={locStyle.header}>
                        <Text style={locStyle.headerText}>{title}</Text>
                    </View>
                }
                <View style={locStyle.list}>
                    {
                        this.state.ranking.map((item, index)=>{
                            let isLastItem = itemsLength === (index + 1)? true : false
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
                                            profile={this.state.profile}/>
                                    </View>
                                </Accordion>
                            )
                        }, this)
                    }
                </View>
                <SquadModal
                    modalVisible={this.state.modalVisible}
                    callbackParent={this._setModalVisible}>
                        <ScrollView style={locStyle.modalWrapper}>
                            <Text style={locStyle.modalTitleText}>ATTACK / DEFENCE / KICKING</Text>
                            <Text style={locStyle.modalDescText}>Key statistics over the 2015/2016 and 2016/2017 seasons compared with average of all eligible players for their position.</Text>
                        </ScrollView>
                </SquadModal>
            </View>
        )
    }
}
