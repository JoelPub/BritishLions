'use strict'

import React, { Component } from 'react'
import { Image, View, Text, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import { Grid, Col, Row } from 'react-native-easy-grid'
import styles from '../styles'
import styleVar from '../../../themes/variable'

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
    }
})

export default class Versus extends Component {
	constructor(props){
        super(props)
        this.state = {            
    	}
    }

	render() {
		return (
            <LinearGradient style={locStyle.wrapper} colors={['#af001e', '#820417']}>
                <View style={locStyle.circleWrapper}>
                    <Image 
                        resizeMode='cover' 
                        source={{uri: 'https://cdn.soticservers.net/tools/images/players/photos/2015/lions/125/250x250/114146.jpg'}} 
                        style={[styles.imageCircle, locStyle.imageCircle]} />
                    
                    <Text style={locStyle.name}>GAME TITLE</Text>
                </View>   

                <View style={locStyle.versusWrapper}>
                    <View style={locStyle.versus}>
                        <Text style={locStyle.versusText}>VS</Text>
                    </View> 
                </View>
                
                <View style={locStyle.circleWrapper}>
                    <View style={locStyle.circle}>
                        <Text style={locStyle.circleText}>KE</Text>
                    </View> 

                    <Text style={locStyle.name}>KENNETH</Text>
                    <Text style={locStyle.name}>ERICKSON</Text>
                </View>  
            </LinearGradient>          
		)
	}
}
