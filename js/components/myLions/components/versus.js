'use strict'

import React, { Component } from 'react'
import { Image, View, Text, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import { Grid, Col, Row } from 'react-native-easy-grid'
import styles from '../styles'
import styleVar from '../../../themes/variable'
import { strToUpper,splitName } from '../../utility/helper'
import ButtonFeedback from '../../utility/buttonFeedback'

const locStyle = styleSheetCreate({
    wrapper: {
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    versusWrapper: {
        alignSelf: 'stretch',
    },
    versus: {
        backgroundColor: styleVar.colorText,
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginHorizontal: 15,
        marginTop: 25
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
    imageCircle: {
        marginTop: 0,
        marginBottom: 15
    },
    circle: {
        width: 100,
        height: 100,
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
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

export default class Versus extends Component {
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
                            style={[styles.imageCircle, locStyle.imageCircle]} />
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
