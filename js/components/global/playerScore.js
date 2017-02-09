'use strict'

import React, { Component } from 'react'
import {Image, View, Text, ActivityIndicator, ScrollView} from 'react-native'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import ButtonFeedback from '../utility/buttonFeedback'
import styleVar from '../../themes/variable'
import BarGraph from '../utility/barGraph'
import BarSlider from '../utility/barSlider'
import loader from '../../themes/loader-position'
import Share from 'react-native-share'
import RNViewShot from 'react-native-view-shot'
import PushNotification from 'react-native-push-notification'
import SquadModal from './squadModal'

const styles = styleSheetCreate({
    scoreCard:{
        marginVertical:2,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'rgb(216,217,218)',
        padding:20,
    },
    scoreCardExpert:{
        marginVertical:0,
        borderTopWidth:0,
        borderBottomWidth:1,
        borderColor:'rgb(216,217,218)',
        padding:20,
    },
    semiCard:{
        paddingTop:29,
        marginBottom:10,
        backgroundColor:'rgb(95,96,98)',
        borderRadius:5,
    },
    semiCardText:{
        fontFamily: styleVar.fontGeorgia,
        fontSize:18,
        lineHeight:24,
        paddingHorizontal:20,
        marginBottom:24,
        textAlign:'center',
        color:'rgb(255,255,255)',
    },
    semiCardFooter:{
        flexDirection: 'row',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        backgroundColor:'rgb(128,128,128)',
        height:50,
        paddingBottom:9,
        paddingRight:11,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
    },
    semiCardFooterText:{
        fontFamily: styleVar.fontGeorgia,
        fontSize:13,
        marginRight:5,
        color:'rgb(255,255,255)',
    },
    fullCard:{
        marginTop:3,
        backgroundColor:'rgb(95,96,98)',
        borderRadius:5,
    },
    btnCardInfoWrapper:{
        height: 48,
        width: 48,
        backgroundColor:'transparent',
        position:'absolute',
        right: 6,
        top: 6
    },
    btnCardInfoWrapper2: {
        right: 4,
        top: 8
    },
    btnCardInfo:{
        height:24,
        width:24,
        borderRadius:12,
        backgroundColor:'rgb(255,255,255)',
        position:'absolute',
        right: 0,
        top: 0
    },
    cardInfoIcon:{
        fontSize:24,
        textAlign:'center',
        color:'rgb(95,96,98)',
        backgroundColor:'transparent'
    },
    summaryWrapper: {
        paddingHorizontal: 20,
        paddingTop: 30
    },
    summaryText:{
        fontFamily: styleVar.fontGeorgia,
        fontSize:18,
        textAlign:'center',
        lineHeight:22,
        flex:1,
        marginBottom: 10,
        color:'rgb(255,255,255)',
    },
    summaryTextHighLight:{
        fontFamily: styleVar.fontCondensed,
        fontSize: 44,
        lineHeight: 44,
        textAlign:'center',
        color:'rgb(255,230,0)',
        marginTop: 1,
    },
    ratingWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderTopWidth:1,
        borderColor:'rgb(128,127,131)',
        marginTop: 10,
        paddingVertical:19
    },
    ratingWrapperExpert:{
        borderTopWidth:0,
        marginTop:0,
    },
    ratingTitle:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:32,
        paddingTop: 12,
        color:'rgb(255,255,255)',
        android: {
            paddingTop: 0
        }
    },
    ratingScore:{
        marginLeft:10,
        height:70,
        width:70,
        borderRadius:35,
        backgroundColor:'rgb(255,230,0)',
        justifyContent:'center',
        alignItems:'center',
        paddingTop: 15,
        android: {
            paddingTop: 6
        }
    },
    ratingScorePoint:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:28,
        color:'rgb(95,96,98)',
        backgroundColor:'transparent'
    },
    barGraphWrapper:{
        height: 105,
        borderTopWidth:1,
        borderColor: 'rgb(128, 127, 131)',
        paddingHorizontal:25,
        paddingTop:15
    },
    barGraphText:{
        fontFamily: styleVar.fontCondensed,
        fontSize:18,
        textAlign:'left',
        marginTop: 12,
        color:'rgb(255,255,255)',
        android: {
            marginTop: 8,
        }
    },
    barSliderWrapper:{
        height: 112,
        borderTopWidth:1,
        borderColor:'rgb(128,127,131)'
    },
    barSliderTextWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 25,
    },
    barSliderText:{
        fontFamily: styleVar.fontCondensed,
        fontSize:18,
        marginTop: 25,
        color:'rgb(255,255,255)',
    },
    scoreCardShareWrapper:{
        borderTopWidth:1,
        borderColor:'rgb(128,127,131)',
        marginTop: 0,
        paddingVertical: 5
    },
    scoreCardShare:{
        backgroundColor:'rgb(255,230,0)',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 24
    },
    scoreCardShareText:{
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        color: 'rgb(95,96,98)',
        paddingTop:5
    },
    scoreCardShareIcon:{
        marginLeft: 5,
        width: 34,
        color: 'rgb(95,96,98)',
        fontSize: 26,
        marginTop: -3
    },
    scoreCardFooter:{
        backgroundColor:'rgb(128,128,128)',
        height:50,
        alignItems:'flex-end',
        padding:10
    },
    scoreCardFooterImg:{
        height:30,
        width:29
    },
    btnExpertSquad: {
        height:50,
        backgroundColor:'rgb(38,38,38)',
        flexDirection:'row',
        marginTop:20,
        marginBottom:0,
        marginLeft:10,
        marginRight:10,
        paddingTop: 5,
        android: {
            paddingTop: 9
        }
    },
    btnExpertIcon: {
        marginBottom: 3,
        color: 'rgb(208,7,42)',
        fontSize: 24,
        backgroundColor:'transparent',
        android:{
            marginBottom: 4,
        }
    },
    btnExpertLabel: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop: 5,
        color:'rgb(255,255,255)',
        backgroundColor:'transparent',
        marginLeft: 6,
        android:{
            marginTop: -7,
        }
    },
    button: {
        height: 50,
        backgroundColor: styleVar.brandLightColor,
        marginTop: 19,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    modalViewWrapper:{
        paddingHorizontal:28,
        marginVertical:54,
        backgroundColor:'transparent',
    },
    modalTitleText:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:28,
        marginTop:28,
        color: '#FFF'
    },
    modalText:{
        fontFamily: 'Helvetica Neue',
        fontSize:16,
        color: '#FFF'
    },
})

export default class PlayerScore extends Component {
	constructor(props){
        super(props)
        this.state = {            
            isSubmitting: false,
            isModalExpertSquadVisible: false
    	}
    }

    shareSnapshot(context,callback){
        this.setState({
            isSubmitting:true
        })
        setTimeout(()=>{
            RNViewShot.takeSnapshot(this.refs['scorecard'],{
                format:'png',
                quality: 1,
                result: 'base64'
            })
            .then(
                res => Share.open({
                    title:"I\'ve picked my players for the @lionsofficial squad. Download the official App to pick yours. #lionswatch",
                    message:"I\'ve picked my players for the @lionsofficial squad. Download the official App to pick yours. #lionswatch",
                    subject:context,
                    url: `data:image/png;base64,${res}`
                }).then((info)=>{
                    callback()
                }).catch((errorMessage)=>{
                    // console.log("error message: " + error)
                     if(errorMessage !== 'undefined' && errorMessage.error !== 'undefined' && errorMessage.error !== 'User did not share'){
                        alertBox(
                            '',
                            'Image is not shared',
                            'Dismiss'
                        )
                    }
                    callback()
                })
            )
        })
    }

    callback(){
        this.setState({
            isSubmitting:false
        })
    }

    _toExpert(){
        PushNotification.localNotificationSchedule({
          message: "My Notification Message", 
          date: new Date(Date.now() + (10 * 1000)) 
        });
    }

    _toRating(rate) {
        let finalRate = 0
        rate = parseInt(rate)

        switch(rate) {
            case 1:
                finalRate = 5
                break
            case 2:
                finalRate = 10
                break
            case 3:
                finalRate = 25
                break
            case 4:
                finalRate = 50
                break
        }

        return finalRate + '%'
    }

    _setModalExpertSquadVisible(isModalExpertSquadVisible) {
        this.setState({ isModalExpertSquadVisible })
    }

	render() {
        let styleParent = this.props.style || {}
		return (

            <View style={[styles.scoreCard,this.props.isExpertPage&&styles.scoreCardExpert]} >
                {this.props.showScoreCard!=='full'?
                    <View style={styles.semiCard}>
                        <Text style={styles.semiCardText}>
                        Complete your full squad of 35 players to receive a real-time squad rating from EY
                        </Text>
                        <View style={styles.semiCardFooter}>
                            <Text style={styles.semiCardFooterText}> Analytics Sponsored by </Text>
                            <Image source={require('../../../images/footer/eyLogo.png')}></Image>
                        </View>
                    </View>
                    :
                    <View>
                    {
                    this.props.isLoaded? 
                        <View>
                            <View ref='scorecard' style={styles.fullCard}>
                                {
                                    !this.props.isExpertPage &&
                                        <View>
                                            {
                                                parseInt(this.props.rating.fan_ranking) < 5?
                                                    <View style={styles.summaryWrapper}>
                                                            <Text style={styles.summaryText}>Congratulations. Your squad has earned the following rating.</Text>
                                                            <Text style={styles.summaryText}>Your squad score is ranked in the</Text>
                                                            <Text style={styles.summaryTextHighLight}>
                                                                TOP {this._toRating(this.props.rating.fan_ranking)}</Text>
                                                    </View>
                                                :
                                                    <View style={styles.summaryWrapper}>
                                                            <Text style={styles.summaryText}>There’s room to improve your squad!</Text>
                                                            <Text style={styles.summaryTextHighLight}>MORE THAN 50%</Text>
                                                            <Text style={styles.summaryText}>of scores are higher than yours.</Text>
                                                    </View>
                                            }
                                            <ButtonFeedback
                                                onPress={()=>this.props.pressInfo(true,'info')}
                                                style={styles.btnCardInfoWrapper}>
                                                <View style={styles.btnCardInfo}>
                                                    <Icon name='md-information-circle' style={styles.cardInfoIcon}/>
                                                </View>
                                            </ButtonFeedback>
                                        </View>
                                }
                                <View style={[styles.ratingWrapper,this.props.isExpertPage&&styles.ratingWrapperExpert]}>
                                    <Text style={styles.ratingTitle}>OVERALL RATING</Text>
                                    <View style={styles.ratingScore}>
                                         <Text style={styles.ratingScorePoint}>{this.props.rating.overall_rating}</Text>
                                    </View>
                                </View>
                                <View style={styles.barGraphWrapper}>
                                    <Text style={styles.barGraphText}>COHESION</Text>
                                     <BarGraph score={this.props.rating.cohesion_rating} fullWidth={styleVar.deviceWidth-150} />
                                </View>
                                <View style={styles.barSliderWrapper}>
                                    <View style={styles.barSliderTextWrapper}>
                                        <Text style={styles.barSliderText}>ATTACK</Text>
                                        <Text style={styles.barSliderText}>DEFENCE</Text>
                                    </View>
                                    <BarSlider score={this.props.rating.attack_defence_rating} fullWidth={styleVar.deviceWidth-100} /> 
                                </View>
                                {
                                    !this.props.isExpertPage &&
                                    <View style={styles.scoreCardShareWrapper}>
                                        <ButtonFeedback
                                            rounded label='Share'
                                            disabled = {this.state.isSubmitting}
                                            onPress={ ()=> this.shareSnapshot('scorecard',this.callback.bind(this)) }
                                            style={[styles.button,styles.scoreCardShare]}>
                                            <Text  style={styles.scoreCardShareText}>SHARE</Text>
                                            <Icon name='md-share-alt' style={styles.scoreCardShareIcon} />
                                        </ButtonFeedback>
                                    </View>
                                }
                                {
                                    this.props.isExpertPage?
                                    <View style={styles.semiCardFooter}>
                                        <Text style={styles.semiCardFooterText}> Analytics Sponsored by </Text>
                                        <Image source={require('../../../images/footer/eyLogo.png')}></Image>
                                    </View>
                                    :
                                    <View style={styles.scoreCardFooter}>
                                        <Image source={require('../../../images/footer/eyLogo.png')} style={styles.scoreCardFooterImg}></Image>
                                    </View>
                                }
                            </View>
                            {
                                this.props.isExpertPage?
                                    <ButtonFeedback 
                                        onPress={() => this._setModalExpertSquadVisible(true)} 
                                        style={[styles.btnCardInfoWrapper, styles.btnCardInfoWrapper2]}> 
                                        <View style={styles.btnCardInfo}>
                                            <Icon name='md-information-circle' style={styles.cardInfoIcon}/>
                                        </View>
                                    </ButtonFeedback>
                                :
                                    <ButtonFeedback rounded onPress={()=>this.props.pressExpert()}   style={[styles.button,styles.btnExpertSquad]}>
                                        <Icon name='md-list-box' style={styles.btnExpertIcon} />
                                        <Text style={styles.btnExpertLabel}>THE EXPERTS' SQUADS</Text>
                                    </ButtonFeedback>
                            }
                        </View>
                        :
                        <ActivityIndicator style={loader.scoreCard} size='small' /> 
                    }
                    </View>
                }
                <SquadModal
                    modalVisible={this.state.isModalExpertSquadVisible}
                    callbackParent={() => this._setModalExpertSquadVisible(false)}>
                        <ScrollView style={styles.modalViewWrapper}>
                            <Text style={styles.modalTitleText}>Squad rating</Text>
                            <Text style={styles.modalText}>A score out of 500 based on your selected players, cohesion rating, individual player performances over the last two years and their most recent five games. Your squad rating will take into account all the ratings of your individual players and allows you to choose which players’ ratings you want to boost by nominating a Captain, Kicker and a Star player i.e the player you nominate as your best performer.</Text>

                            <Text style={styles.modalTitleText}>Squad rating percentage</Text>
                            <Text style={styles.modalText}>Whether your squad is in the top five, 10, 25, 50 per cent of squads submitted.</Text>

                            <Text style={styles.modalTitleText}>Cohesion</Text>
                            <Text style={styles.modalText}>Rugby is a team sport, the more familiar your players are with each other the better they will perform in a game. EY has developed an algorithm to decide the cohesion of your squad based on international and top tier club rugby games in the last two years. A rating out of 100 where 100 means all of your squad have started at least one game with every other player in your squad. There is an assumption that professional players will gel together in training camp so a baseline score of 50 is given.</Text>

                            <Text style={styles.modalTitleText}>Attack & Defence</Text>
                            <Text style={styles.modalText}>Players are individually rated on their defensive and attacking abilities. Your team will be analysed to see its balance and if it is weighted towards attack or defence.</Text>
                        </ScrollView>
                </SquadModal>
            </View>            
			)
	}

}
