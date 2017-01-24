'use strict'

import React, { Component } from 'react'
import {Image, View, Text, ActivityIndicator} from 'react-native'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import ButtonFeedback from '../utility/buttonFeedback'
import styleVar from '../../themes/variable'
import Swiper from 'react-native-swiper'
import loader from '../../themes/loader-position'
import ProfileListModel from  'modes/Players'
import ProfileModel from 'modes/Players/Profile'

const gridBorderColor = 'rgb(216, 217, 218)'

const styles = styleSheetCreate({ 
    detailsGridColFull: {
        borderWidth: 1,
        borderColor: gridBorderColor,
    },
    playerCardWrapper:{
        padding:20
    },
    fullCard:{
        marginTop:3,
        backgroundColor:'rgb(95,96,98)',
        borderRadius:5,
    },
    btnCardInfo:{
        height:24,
        width:24,
        borderRadius:12,
        backgroundColor:'rgb(255,255,255)',
        position:'absolute',
        right:5,
        top:5
    },
    cardInfoIcon:{
        fontSize:24,
        textAlign:'center',
        color:'rgb(95,96,98)',
        backgroundColor:'transparent'
    },
    playerOverallRating:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:20,
        marginTop:20,
    },
    ratingTitle:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:32,
        paddingTop:8,
        color:'rgb(255,255,255)'
    },
    playerPerfromanceWrapper:{
        flexDirection:'row',
    },
    playerPerfromance:{
        flex:1,
        justifyContent:'flex-start',
        borderTopWidth:1,
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderColor:'rgb(128,127,131)',
        paddingTop:18,
        paddingHorizontal:16,
        paddingBottom:1,
        alignItems:'center',
        android:{
            paddingBottom:5,
        }
    },
    playerPerformanceTrend:{
        fontSize:44,
        lineHeight:44,
        textAlign:'center',
        color:'rgb(255,230,0)',
        flex:1,
    },
    summaryTextHighLight:{
        fontFamily: styleVar.fontCondensed,
        fontSize:44,
        lineHeight:44,
        textAlign:'center',
        color:'rgb(255,230,0)',
        flex:1,
    },
    playerFigureView:{
        backgroundColor:'rgb(255,255,255)',
        paddingTop: 30,
        paddingBottom: 20,
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
        color:'rgb(255,255,255)'
    },
    playerFigurePageWrapper:{
        justifyContent: 'center'
    },
    playerFigureRow:{
        flexDirection:'row',
        marginTop: 20,
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
        marginRight: 4,
        marginBottom: -2,
        color:'rgb(255,255,255)'
    },
    performanceText:{
        fontFamily: styleVar.fontCondensed,
        fontSize:18,
        textAlign:'center',
        lineHeight:18,
        flex:1,
        marginBottom:10,
        color:'rgb(255,255,255)'
    },
    playerFigureWrapper:{
        paddingVertical: 25,
        paddingHorizontal: 20,
    },
    pagination: {
        bottom: 0
    }
})

export default class PlayerFigure extends Component {
	constructor(props){
        super(props)
        this.state = {
            underlineLength:[],
            tabStatus:[],
            tabSubjects:['Attack','Defense','Kicking'],
            profile:{},
            isLoaded:false
    	}
        this.currentPage = 0
    }

    changePage(page) {
        this.updateStyle(page) 
        this.refs['swiper'].scrollBy(page-this.currentPage,true)
        this.currentPage=page
    }

    updateStyle(page) {
        let activeArray = this.state.tabStatus.slice()
        if(activeArray[page]===undefined) activeArray[page]=false
        activeArray.map((a,j)=>{
            j===this.currentPage?activeArray[j]=true:activeArray[j]=false
        })
        this.setState({tabStatus:activeArray.slice()})
    }

    swiperScroll(e, state, context) {  
        this.currentPage=state.index
        this.updateStyle(state.index) 
    }

    measureTab(page,event) {
        const { x, width, height, } = event.nativeEvent.layout
        let widthArray = this.state.underlineLength.slice()
        if(widthArray[page]===undefined) widthArray[page]=0
        widthArray.map((w,i)=>{
            i===page?widthArray[i]=width:widthArray[i]=w
        })
        this.setState({underlineLength:widthArray.slice()})
        this.updateStyle(page) 

    }

    _mapJSON(data, colMax = 2) {
        let i = 0
        let k = 0
        let newData = []
        let items = []
        let length = data.length

        for( i = 0; i <data.length; (i += colMax)) {
            for( k = 0; k < colMax; k++ ) {
                if(data[i + k])
                    items.push(data[i + k])
            }

            newData.push(items)
            items = []
        }
        return newData
    }

    componentWillReceiveProps(nextProps,nextState) {
        // console.log('@@@nextProps',nextProps.profile.toJS())
        // console.log('@@@thisProps',this.props.profile.toJS())
        // console.log('@@@equal?',nextProps.profile.equals(this.props.profile)?'true':'false')
        // console.log('@@@isnull?',nextProps.profile.equals(ProfileListModel.fromJS([new ProfileModel()]))?'true':'false')
        if(!nextProps.profile.equals(this.props.profile)&&!nextProps.profile.equals(ProfileListModel.fromJS([new ProfileModel()]))) {
            // console.log('@@Attack',nextProps.profile.first().get('Attack').first().toJS())
            let profile=nextProps.profile.first().toJS()
            // let season=nextProps.profile.first().get('seasons').first().toJS()
            // let tabSubjects=[]
            // for (let v in season) {
            //     if(v!=='season name') tabSubjects.push(v)
            // }

            this.setState({isLoaded:true,profile})
        }

    }

	render() {
		return (
            <View>
            {
                this.state.isLoaded?
                    <View style={[styles.detailsGridColFull,styles.playerCardWrapper]}>
                        <View style={styles.fullCard}>
                            <ButtonFeedback 
                                onPress={()=>this.props.pressInfo(true,'info')}
                                style={styles.btnCardInfo}>
                                <Icon name='md-information-circle' style={styles.cardInfoIcon}/>
                            </ButtonFeedback>
                            
                            <View style={styles.playerOverallRating}>
                                <Text style={styles.ratingTitle}>OVERALL RATING</Text>
                                <View style={styles.ratingScore}>
                                    <Text style={styles.ratingScorePoint}>{this.state.profile.overall_score||'NA'}</Text>
                                </View>
                            </View>
                            <View style={styles.playerPerfromanceWrapper}>
                                <View style={styles.playerPerfromance} >
                                    <Text style={styles.performanceText} numberOfLines={2}>RECENT PERFORMANCE</Text>
                                    <Text style={styles.summaryTextHighLight}>{this.state.profile.performance_score}</Text>
                                </View>
                                <View style={styles.playerPerfromance}>
                                    <Text style={styles.performanceText}>CONSISTENCY</Text>
                                    {
                                        this.state.profile.player_consistency>0&&
                                        <Icon name='md-trending-up' style={styles.playerPerformanceTrend}/>
                                    }
                                    {
                                        this.state.profile.player_consistency==0&&
                                        <Icon name='md-arrow-forward' style={styles.playerPerformanceTrend}/>
                                    }
                                    {

                                        this.state.profile.player_consistency<0&&
                                        <Icon name='md-trending-down' style={styles.playerPerformanceTrend}/>
                                    }
                                </View>
                            </View>
                            <View style={styles.playerFigureWrapper}>
                                <View style={styles.playerFigureView}>
                                    <View style={styles.playerFigureTypeView}>
                                    {
                                        this.state.tabSubjects.map((node,page)=>{
                                            return (
                                            <ButtonFeedback 
                                            style={styles.playerFigureType} 
                                            onPress={()=>this.changePage(page)}
                                            key={page}>
                                                <Text 
                                                style={[styles.playerFigureTypeText,{color:this.state.tabStatus[page]?styleVar.colorTextDarkGrey:styleVar.colorGrey2}]}
                                                onLayout={this.measureTab.bind(this,page)}>{node.toUpperCase()}</Text>
                                                <View style={{height:3,width:this.state.underlineLength[page],backgroundColor:this.state.tabStatus[page]?styleVar.colorYellow:'transparent'}} />
                                            </ButtonFeedback>
                                            )
                                        },this)
                                    }
                                    </View>
                                    <Swiper
                                        ref='swiper'
                                        height={320}
                                        width={styleVar.deviceWidth-100}
                                        loop={false}
                                        paginationStyle={styles.pagination}
                                        dotColor='rgb(95,96,98)'
                                        activeDotColor='rgb(255,230,0)'
                                        onMomentumScrollEnd={(e, state, context) => this.swiperScroll(e, state, context)}>
                                        {
                                            this.state.tabSubjects.map((node,i)=>{
                                                return(
                                                    <View style={styles.playerFigurePageWrapper} key={i}>
                                                        {
                                                            this._mapJSON(this.state.profile[node]).map((rowData,index)=>{
                                                                return(
                                                                    <View style={styles.playerFigureRow} key={index}>
                                                                    {
                                                                        rowData.map((item, j) => {
                                                                            return(
                                                                                <View style={styles.playerFigureUnit} key={j}>
                                                                                    <Text style={styles.playerFigureUpperText}>{item.name}</Text>
                                                                                    <View style={[styles.ratingScore,styles.playerRatingScore]}>
                                                                                        <Text style={styles.ratingScorePoint}>{item.value}</Text>
                                                                                    </View>
                                                                                    <Text style={styles.playerFigureLowerText}>{item.average} avg</Text>
                                                                                </View>
                                                                                )
                                                                        },this)
                                                                    }
                                                                    </View>
                                                                    )
                                                            },this)
                                                        }
                                                    </View>
                                                    )
                                            },this)
                                        }
                                    </Swiper>
                                </View>
                            </View>
                            <View style={styles.semiCardFooter}>
                                <Text style={styles.semiCardFooterText}> Analytics Sponsored by </Text>
                                <Image source={require('../../../images/footer/eyLogo.png')}></Image>
                            </View>
                        </View>
                    </View>
                :
                    <ActivityIndicator style={loader.scoreCard} size='small' /> 
            }
            </View>            
			)
	}

}
