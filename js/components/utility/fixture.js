'use strict'

import React, { Component } from 'react'
import { Image, View, Text, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import { Grid, Col, Row } from 'react-native-easy-grid'
import styleVar from '../../themes/variable'
import { strToUpper,splitName } from '../utility/helper'
import ButtonFeedback from '../utility/buttonFeedback'

const locStyle = styleSheetCreate({
    wrapper: {
        padding: styleVar.deviceWidth*0.05,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    versusWrapper: {
        alignSelf: 'stretch',
    },
    versus: {
        backgroundColor: styleVar.colorText,
        width: styleVar.deviceWidth*0.128,
        height: styleVar.deviceWidth*0.128,
        borderRadius: styleVar.deviceWidth*0.064,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: styleVar.deviceWidth*0.027,
        marginHorizontal: styleVar.deviceWidth*0.04,
        marginTop: styleVar.deviceWidth*0.067
    },
    versusText: {
        color: '#FFF',
        fontSize: 24,
        lineHeight: 24,
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        android: {
            marginTop: -6
        }
    },
    imageCircle:{
        alignSelf: 'center',
        marginTop: styleVar.deviceWidth*0.04,
        marginBottom: styleVar.deviceWidth*0.013,
        width:styleVar.deviceWidth*0.27,
        height:styleVar.deviceWidth*0.27,
        borderRadius:styleVar.deviceWidth*0.135,
        android: {
            marginBottom: styleVar.deviceWidth*0.04,
            borderRadius:styleVar.deviceWidth*0.27,
        }
    },
    circle: {
        width: styleVar.deviceWidth*0.27,
        height: styleVar.deviceWidth*0.27,
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 2,
        borderRadius: styleVar.deviceWidth*0.135,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: styleVar.deviceWidth*0.04
    },
    circleText: {
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
        color: 'rgb(255, 255, 255)',
        fontSize: 36,
        lineHeight: 36,
        textAlign: 'center',
        marginTop: 15,
        android: {
            marginTop: 5
        }
    },
    name: {
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
        color: 'rgb(255, 255, 255)',
        fontSize: 24,
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: -3,
        android: {
            marginBottom: 2
        }
    },
    roundButton: {
        height: 50,
        width:styleVar.deviceWidth*0.6,
        marginHorizontal:styleVar.deviceWidth*0.2,
        backgroundColor: '#FFF',
        flexDirection:'row',
        marginTop: 0,
        marginBottom: 30,
        paddingTop:5,
        android:{
            paddingTop: 0,
        }
    },
    roundButtonLabel: {
        backgroundColor: 'transparent',
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop:5,
        marginLeft: 5,
        color: 'rgb(175,0,30)'
    },
})

export default class Fixture extends Component {
	constructor(props){
        super(props)
        this.state = {            
    	}
    }

	render() {
        
		return (
            <LinearGradient  colors={['#af001e', '#820417']}>
                <View style={locStyle.wrapper}>
                    <View style={locStyle.circleWrapper}>
                        <Image 
                            resizeMode='cover' 
                            source={{uri: this.props.gameData.image}} 
                            style={locStyle.imageCircle} />
                        <View>
                        {
                            splitName(this.props.gameData.title,' ',10).map((value,index)=>{
                                return(
                                    <Text key={index} style={locStyle.name}>{strToUpper(value)}</Text>
                                    )
                            },this)
                        }
                        </View>
                    </View>   

                    <View style={locStyle.versusWrapper}>
                        <View style={locStyle.versus}>
                            <Text style={locStyle.versusText}>VS</Text>
                        </View> 
                    </View>
                    
                    <View style={locStyle.circleWrapper}>
                        <View style={locStyle.circle}>
                            <Text style={locStyle.circleText}>{strToUpper(this.props.userData.initName)}</Text>
                        </View>
                        <View>
                        {
                            splitName(this.props.userData.userName,' ',10).map((value,index)=>{
                                return(
                                    <Text key={index} style={locStyle.name}>{strToUpper(value)}</Text>
                                    )
                            },this)
                        }
                        </View>
                    </View>
                </View>
                <View>
                {
                    this.props.pressBtn!==undefined&&
                        <ButtonFeedback rounded style={[locStyle.roundButton]} onPress={this.props.pressBtn}>
                            <Text style={locStyle.roundButtonLabel}>
                                REVIEW OPPOSITION
                            </Text>
                        </ButtonFeedback>
                }
                </View>
            </LinearGradient>          
		)
	}
}
