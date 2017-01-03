'use strict'

import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import ButtonFeedback from '../utility/buttonFeedback'
import styleVar from '../../themes/variable'
import Swiper from 'react-native-swiper'

const styles = styleSheetCreate({    
    playerFigureView:{
        backgroundColor:'rgb(255,255,255)',
        paddingVertical:30,
        paddingHorizontal:10,
        borderRadius:5,
    },
    playerFigureTypeView:{
        flexDirection:'row'
    },
    playerFigureType:{
        flex:1,
        height:40,
        alignItems:'center',
    },
    playerFigureTypeText:{
        fontFamily: styleVar.fontCondensed,
        fontSize:24,
        lineHeight:24,
        textAlign:'center',
    },
    playerFigurePageWrapper:{
        justifyContent:'center',
        height:styleVar.deviceWidth-65,
    },
    playerFigureRow:{
        flexDirection:'row',
        marginTop:35,
    },
    playerFigureUnit:{
        flex:1,
        alignItems:'center'
    },
    playerFigureUpperText:{
        color:'rgb(95,96,98)',
        fontFamily: styleVar.fontCondensed,
        fontSize:18,
        marginBottom:5
    },
    ratingScore:{
        marginLeft:10,
        height:70,
        width:70,
        borderRadius:35,
        backgroundColor:'rgb(255,230,0)',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
    },
    playerRatingScore:{
        borderWidth:1,
        borderColor:'rgb(216,217,218)',
        backgroundColor:'rgb(230,231,232)'
    },
    ratingScorePoint:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:28,
        color:'rgb(95,96,98)'
    },
    playerFigureLowerText:{
        color:'rgb(95,96,98)',
        fontFamily: styleVar.fontGeorgia,
        fontSize:18,
        marginTop:5
    }
})

export default class PlayerFigure extends Component {
	constructor(props){
        super(props)
        this.pageStyle = {
                            active:{textColor:styleVar.colorTextDarkGrey,underlineColor:styleVar.colorYellow},
                            inactive:{textColor:styleVar.colorGrey2,underlineColor:'transparent'}
                         }
        this.state = {
            currentProfile: 0,
            attackStyle:this.pageStyle.active,
            defenceStyle:this.pageStyle.inactive,
            kickingStyle:this.pageStyle.inactive,
            attackUnderline: 0,
            defenceUnderline: 0,
            kickingUnderline: 0,
    	}  
    }

    changeProfile(profile) {
        this.changeStyle(profile) 
        this.refs['swiper'].scrollBy(profile-this.state.currentProfile,true)
    }

    changeStyle(style) {
        switch(style) {
            case 1:
                this.setState({
                    attackStyle:this.pageStyle.inactive,
                    defenceStyle:this.pageStyle.active,
                    kickingStyle:this.pageStyle.inactive
                })
                break
            case 2:
                this.setState({
                    attackStyle:this.pageStyle.inactive,
                    defenceStyle:this.pageStyle.inactive,
                    kickingStyle:this.pageStyle.active
                })
                break
            default:
                this.setState({                    
                    attackStyle:this.pageStyle.active,
                    defenceStyle:this.pageStyle.inactive,
                    kickingStyle:this.pageStyle.inactive
                })
                break
        }        
    }

    swiperScroll(e, state, context) {
        this.setState({currentProfile:state.index})        
        this.changeStyle(state.index) 

    }

    measureATab(event) {
        const { x, width, height, } = event.nativeEvent.layout;
        // this._tabsMeasurements[page] = {left: x, right: x + width, width, height, };
        // this.updateView({value: this.props.scrollValue._value, });
        this.setState({attackUnderline:width})
      }
    measureDTab(event) {
        const { x, width, height, } = event.nativeEvent.layout;
        // this._tabsMeasurements[page] = {left: x, right: x + width, width, height, };
        // this.updateView({value: this.props.scrollValue._value, });
        this.setState({defenceUnderline:width})
      }
    measureKTab(event) {
        const { x, width, height, } = event.nativeEvent.layout;
        // this._tabsMeasurements[page] = {left: x, right: x + width, width, height, };
        // this.updateView({value: this.props.scrollValue._value, });
        this.setState({kickingUnderline:width})
      }

	render() {
		return (
            <View style={styles.playerFigureView}>
                <View style={styles.playerFigureTypeView}>
                    <ButtonFeedback 
                        style={styles.playerFigureType} 
                        onPress={()=>this.changeProfile(0)}>
                        <Text 
                        style={[styles.playerFigureTypeText,{color:this.state.attackStyle.textColor}]}
                        onLayout={this.measureATab.bind(this)}>ATTACK</Text>
                        <View style={{height:3,width:this.state.attackUnderline,backgroundColor:this.state.attackStyle.underlineColor}} />
                    </ButtonFeedback>
                    <ButtonFeedback 
                        style={styles.playerFigureType}  
                        onPress={()=>this.changeProfile(1)}>
                        <Text 
                        style={[styles.playerFigureTypeText,{color:this.state.defenceStyle.textColor}]}
                        onLayout={this.measureDTab.bind(this)}>DEFENSE</Text>
                        <View style={{height:3,width:this.state.defenceUnderline,backgroundColor:this.state.defenceStyle.underlineColor}} />
                    </ButtonFeedback>
                    <ButtonFeedback 
                        style={styles.playerFigureType}  
                        onPress={()=>this.changeProfile(2)}>
                        <Text 
                        style={[styles.playerFigureTypeText,{color:this.state.kickingStyle.textColor}]}
                        onLayout={this.measureKTab.bind(this)}>KICKING</Text>
                        <View style={{height:3,width:this.state.kickingUnderline,backgroundColor:this.state.kickingStyle.underlineColor}} />
                    </ButtonFeedback>
                </View>
               <Swiper
                ref='swiper'
                height={styleVar.deviceWidth}
                width={styleVar.deviceWidth-100}
                loop={false}
                dotColor='rgb(95,96,98)'
                activeDotColor='rgb(255,230,0)'
                onMomentumScrollEnd={(e, state, context) => this.swiperScroll(e, state, context)}>
                <View style={styles.playerFigurePageWrapper}>
                    <View style={styles.playerFigureRow}>
                        <View style={styles.playerFigureUnit}>
                            <Text style={styles.playerFigureUpperText}>TRIES</Text>
                            <View style={[styles.ratingScore,styles.playerRatingScore]}>
                                <Text style={styles.ratingScorePoint}>35</Text>
                            </View>
                            <Text style={styles.playerFigureLowerText}> 20 avg</Text>
                        </View>
                        <View style={styles.playerFigureUnit}>
                            <Text style={styles.playerFigureUpperText}>ASSISTS</Text>
                            <View style={[styles.ratingScore,styles.playerRatingScore]}>
                                <Text style={styles.ratingScorePoint}>12</Text>
                            </View>
                            <Text style={styles.playerFigureLowerText}> 10 avg</Text>
                        </View>
                    </View>
                    <View style={styles.playerFigureRow}>
                        <View style={styles.playerFigureUnit}>
                            <Text style={styles.playerFigureUpperText}>METRES RUN</Text>
                            <View style={[styles.ratingScore,styles.playerRatingScore]}>
                                <Text style={styles.ratingScorePoint}>38</Text>
                            </View>
                            <Text style={styles.playerFigureLowerText}> 7 avg</Text>
                        </View>
                        <View style={styles.playerFigureUnit}>
                            <Text style={styles.playerFigureUpperText}>LINE BREAKS</Text>
                            <View style={[styles.ratingScore,styles.playerRatingScore]}>
                                <Text style={styles.ratingScorePoint}>7</Text>
                            </View>
                            <Text style={styles.playerFigureLowerText}> 15 avg</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.playerFigurePageWrapper}>
                    <View style={styles.playerFigureRow}>
                        <View style={styles.playerFigureUnit}>
                            <Text style={styles.playerFigureUpperText}>TACKLES</Text>
                            <View style={[styles.ratingScore,styles.playerRatingScore]}>
                                <Text style={styles.ratingScorePoint}>18</Text>
                            </View>
                            <Text style={styles.playerFigureLowerText}> 20 avg</Text>
                        </View>
                        <View style={styles.playerFigureUnit}>
                            <Text style={styles.playerFigureUpperText}>RUCKS</Text>
                            <View style={[styles.ratingScore,styles.playerRatingScore]}>
                                <Text style={styles.ratingScorePoint}>12</Text>
                            </View>
                            <Text style={styles.playerFigureLowerText}> 10 avg</Text>
                        </View>
                    </View>
                    <View style={styles.playerFigureRow}>
                        <View style={styles.playerFigureUnit}>
                            <Text style={styles.playerFigureUpperText}>LINE-IN</Text>
                            <View style={[styles.ratingScore,styles.playerRatingScore]}>
                                <Text style={styles.ratingScorePoint}>22</Text>
                            </View>
                            <Text style={styles.playerFigureLowerText}> 24 avg</Text>
                        </View>
                        <View style={styles.playerFigureUnit}>
                            <Text style={styles.playerFigureUpperText}>TITLE</Text>
                            <View style={[styles.ratingScore,styles.playerRatingScore]}>
                                <Text style={styles.ratingScorePoint}>14</Text>
                            </View>
                            <Text style={styles.playerFigureLowerText}> 15 avg</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.playerFigurePageWrapper}>
                    <View style={styles.playerFigureRow}>
                        <View style={styles.playerFigureUnit}>
                            <Text style={styles.playerFigureUpperText}>KICKING</Text>
                            <View style={[styles.ratingScore,styles.playerRatingScore]}>
                                <Text style={styles.ratingScorePoint}>12</Text>
                            </View>
                            <Text style={styles.playerFigureLowerText}> 10 avg</Text>
                        </View>
                    </View>
                </View>
            </Swiper>
            </View>
			)
	}

}
