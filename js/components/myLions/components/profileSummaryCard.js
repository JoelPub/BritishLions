'use strict'

import React, { Component } from 'react'
import { Image, View, Text, Platform } from 'react-native'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import { Grid, Col, Row } from 'react-native-easy-grid'
import SummaryCardWrapper from './summaryCardWrapper'
import styleVar from '../../../themes/variable'

const styles = styleSheetCreate({
    cardContent: {
        paddingVertical: 20
    },
    cardRow1: {
        marginBottom: 15
    },
    cardCol: {
        flex: 1,
        justifyContent: 'center'
    },

    cardFigure: {
        flex: 1,
        alignItems: 'center'
    },
    cardCircle: {
        width: 70,
        height: 70,
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 2,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardCircleShaded: {
        borderWidth: 0,
        backgroundColor: 'rgb(71, 72, 73)'
    },
    cardCircleText: {
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
    cardCircleSmallText: {
        fontSize: 18,
        lineHeight: 18,
        marginTop: 0,
        alignItems: 'center',
    },
    cardCircleRankText: { 
        marginTop: 8,
    },
    cardName: {
        marginTop: 12,
        android: {
            marginTop: 5,
            marginBottom: 4
        }
    },
    cardNameText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 21,
        lineHeight: 21,
        color: 'rgb(255, 255, 255)',
    },


    cardTable: {
        flexDirection: 'row',
        marginTop: 10,
        android: {
            marginTop: 0,
        }
    },
    cardTableCol: {
        marginRight: 10,
        alignItems: 'center'
    },
    cardTableText: {
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
        fontSize: 18,
        lineHeight: 18,
        color: 'rgb(255, 255, 255)',
        android: {
            marginTop: 4,
        }
    },
    yellowText: {
        color: 'rgb(255, 230, 0)'
    }
})

export default class ProfileSummaryCard extends Component {
	constructor(props){
        super(props)
    }

	render() {
        const CardTabular = () => (
            <View style={styles.cardTable}>
                <View style={styles.cardTableCol}>
                    <Text style={styles.cardTableText}>W</Text>
                    <Text style={[styles.cardTableText, styles.yellowText]}>22</Text>
                </View>
                <View style={styles.cardTableCol}>
                    <Text style={styles.cardTableText}>L</Text>
                    <Text style={[styles.cardTableText, styles.yellowText]}>12</Text>
                </View>
                <View style={styles.cardTableCol}>
                    <Text style={styles.cardTableText}>D</Text>
                    <Text style={[styles.cardTableText, styles.yellowText]}>45</Text>
                </View>
                <View style={styles.cardTableCol}>
                    <Text style={styles.cardTableText}>F</Text>
                    <Text style={[styles.cardTableText, styles.yellowText]}>18</Text>
                </View>
                <View style={styles.cardTableCol}>
                    <Text style={styles.cardTableText}>A</Text>
                    <Text style={[styles.cardTableText, styles.yellowText]}>62</Text>
                </View>
                <View style={styles.cardTableCol}>
                    <Text style={styles.cardTableText}>BP</Text>
                    <Text style={[styles.cardTableText, styles.yellowText]}>78</Text>
                </View>
                <View style={styles.cardTableCol}>
                    <Text style={styles.cardTableText}>PTS</Text>
                    <Text style={[styles.cardTableText, styles.yellowText]}>1235</Text>
                </View>
            </View>
        )

		return (
            <SummaryCardWrapper>
                <View style={styles.cardContent}>
                    <Grid style={[styles.cardRow, styles.cardRow1]}>
                        <Col style={{width: Platform.OS === 'android'? 95 : 98}}>
                            <View style={styles.cardFigure}>
                                <View style={styles.cardCircle}>
                                    <Text style={styles.cardCircleText}>KE</Text>
                                </View>
                            </View>
                        </Col>
                        <Col style={styles.cardCol}>
                            <View style={styles.cardName}>
                                <Text style={styles.cardNameText}>KENNETH ERICKSON</Text>
                            </View>
                            <Text style={[styles.cardNameText, styles.yellowText]}>EXPERT SELECTOR</Text>
                        </Col>
                    </Grid>
                    <Grid style={styles.cardRow}>
                        <Col style={{width: Platform.OS === 'android'? 95 : 98}}>
                            <View style={styles.cardFigure}>
                                <View style={[styles.cardCircle, styles.cardCircleShaded]}>
                                    <View style={styles.cardCircleRankText}>
                                        <Text style={[styles.cardCircleText, styles.cardCircleSmallText]}>RANK</Text>
                                    </View>    
                                    <Text style={[styles.cardCircleText, styles.cardCircleSmallText, styles.yellowText]}>234</Text>
                                </View>
                            </View>
                        </Col>
                        <Col style={styles.cardCol}>
                            <CardTabular />
                        </Col>
                    </Grid>
                </View>
            </SummaryCardWrapper>          
		)
	}
}
