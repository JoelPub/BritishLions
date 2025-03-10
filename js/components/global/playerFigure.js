'use strict'

import React, { Component } from 'react'
import {Image, View, Text, ActivityIndicator, Platform, StyleSheet} from 'react-native'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import { strToUpper , isEmptyObject} from '../utility/helper'
import ButtonFeedback from '../utility/buttonFeedback'
import styleVar from '../../themes/variable'
import Swiper from 'react-native-swiper'
import loader from '../../themes/loader-position'
import ProfileListModel from  'modes/Players'
import ProfileModel from 'modes/Players/Profile'
import Immutable, { Map, List } from 'immutable'

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
    btnCardInfoWrapper:{
        height: 24,
        width: 24,
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 10,
        top: 8
    },
    btnCardInfo:{
        height: 24,
        width: 24,
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
    playerOverallRating:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical: 8
    },
    ratingTitle:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:32,
        paddingTop: 10,
        marginRight: 10,
        color:'rgb(255,255,255)',
        android: {
            paddingTop: 0,
        }
    },
    playerPerfromanceWrapper:{
        flexDirection:'row'
    },
    playerPerfromance:{
        flex:1,
        justifyContent:'flex-start',
        borderTopWidth:1,
        //borderLeftWidth:1,
        borderBottomWidth:1,
        borderColor:'rgb(128,127,131)',
        paddingTop: 25,
        paddingHorizontal:16,
        paddingBottom:1,
        alignItems:'center',
        android:{
            paddingBottom:5,
            paddingTop: 20
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
        marginTop: 5
    },
    summaryTextHighLight2:{
        marginTop: 20
    },
    playerFigureView:{
        backgroundColor:'rgb(255,255,255)',
        paddingTop: 0,
        paddingBottom: 20,
        paddingHorizontal:0,
        borderRadius:5,
        borderWidth:0.5,
        borderColor: styleVar.colorGrey
    },
    playerFigureTypeView:{
        flexDirection:'row',
        marginTop:0
    },
    playerFigureType:{
        flex:1,
        height:53,
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10

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
        flexWrap:'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    playerFigureUnit:{
        alignItems:'center',
        marginBottom: 30,
        width: styleVar.deviceWidth/3
    },
    playerFigureUnit2: {
        flexDirection: 'column',
        width: styleVar.deviceWidth/2
    },
    playerFigureUpperText:{
        color:'rgb(95,96,98)',
        fontFamily: styleVar.fontCondensed,
        fontSize: 18,
        lineHeight: 18,
        marginBottom: 5,
        textAlign: 'center'
    },
    ratingScore: {
        height: 70,
        width: 70,
        borderRadius:35,
        backgroundColor:'rgb(255,230,0)',
        justifyContent:'center',
        alignItems:'center',
        paddingTop: 12,
        android: {
            paddingTop: 5
        }
    },
    playerRatingScore:{
        borderWidth:1,
        borderColor:'rgb(216,217,218)',
        backgroundColor:'rgb(230,231,232)'
    },
    ratingScorePoint:{
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color:'rgb(95,96,98)'
    },
    playerFigureLowerText:{
        color:'rgb(95,96,98)',
        fontFamily: styleVar.fontGeorgia,
        fontSize: 18,
        marginTop: 5
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
        color:'rgb(255,255,255)'
    },
    performanceText2: {
        marginTop: -4,
        marginBottom: 5,
        android: {
            marginTop: 0
        }
    },
    consitencyText: {
        marginBottom: 4,
        android: {
            marginTop: 0
        }
    },
    playerFigureWrapper:{
        paddingVertical: 25,
        paddingHorizontal: 20
    },
    pagination: {
        bottom: 0
    },
    titleBorder1: {
        borderTopLeftRadius:5,
    },
    titleBorder2: {
        borderTopRightRadius:5,
    },
    statisticsText: {
        fontFamily: styleVar.fontGeorgia,
        fontSize:16,
        lineHeight:20,
        color:'rgb(255,255,255)'
    }
})

export default class PlayerFigure extends Component {
    constructor(props){
        super(props)
        this.state = {
            underlineLength: [],
            tabStatus: [],
            tabSubjects: ['Attack','Defense','Kicking'],
            profile:this.props.profile.first(),
            titleActiveIndex:0
        }
        this.currentPage = 0
    }

    changePage (page) {
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
        if (__DEV__)console.log('!!!Figure componentWillReceiveProps')
        if (__DEV__)console.log('nextProps.profile.toJS()',nextProps.profile.toJS())
        if (__DEV__)console.log('this.props.profile.toJS()',this.props.profile.toJS())
        if(!nextProps.profile.equals(this.props.profile)&&!nextProps.profile.equals(ProfileListModel.fromJS([new ProfileModel()]))) {
            if (__DEV__)console.log('not equal')
            let profile=nextProps.profile.first()
            // profile.forEach((value,index)=>{
            //     if (value.trim){
            //         if(index==='Kicking'&&value.trim()!==''&&value.trim) {
            //             profile=profile.set(index,JSON.parse(value))
            //         }
            //     }
            // })
            if (__DEV__)console.log('profile',profile.toJS())
            this.setState({profile:profile.toJS()})
        }
    }
    titleClick = (page) =>{
       this.setState({
           titleActiveIndex:page
       })
      if(this.props.onTitleClick){
          let titleStatus = page===0 ? true: false
          this.props.onTitleClick(titleStatus)
      }
    }

    render() {
        let wideLayoutStyle = this.props.wideLayout? [] : [styles.detailsGridColFull,styles.playerCardWrapper]
        let mainTitles = ['On TOUR','HISTORICAL']

        return (
            <View>
                    <View style={wideLayoutStyle}>
                        <View style={styles.fullCard}>
                            <View style={styles.playerOverallRating}>
                            </View>
                            <View style={styles.playerFigureWrapper}>
                            {!isEmptyObject(this.state.profile)?
                                <View style={styles.playerFigureView}>

                                    <View style={styles.playerFigureTypeView}>
                                        {
                                            mainTitles.map((title, page)=>{
                                                title = title.toUpperCase()
                                                let cornerStyle  = page === 0? {borderTopLeftRadius: 5} : {borderTopRightRadius: 5, borderRightColor: '#FFF', borderRightWidth: StyleSheet.hairlineWidth}
                                                
                                                return (
                                                  <ButtonFeedback
                                                    style={[styles.playerFigureType,{backgroundColor:page!=this.state.titleActiveIndex ? styleVar.colorTextDarkGrey:'white'},cornerStyle]}
                                                    onPress={()=>this.titleClick(page)}
                                                    key={page}>
                                                      <Text
                                                        style={[styles.playerFigureTypeText,{color:page===this.state.titleActiveIndex ? styleVar.colorTextDarkGrey:'white',paddingTop: 8},]}
                                                        onLayout={this.measureTab.bind(this,page)}>
                                                          { title }
                                                      </Text>
                                                  </ButtonFeedback>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={[styles.playerFigureTypeView,{marginTop:20}]}>
                                    {
                                        this.state.tabSubjects.map((node, page)=>{
                                            node = node.toUpperCase()
                                            return (
                                                <ButtonFeedback 
                                                    style={styles.playerFigureType} 
                                                    onPress={()=>this.changePage(page)}
                                                    key={page}>
                                                    <Text 
                                                        style={[styles.playerFigureTypeText,{color:this.state.tabStatus[page]?styleVar.colorTextDarkGrey:styleVar.colorGrey2}]}
                                                        onLayout={this.measureTab.bind(this,page)}>
                                                            { node === 'DEFENSE'? 'DEFENCE': node}
                                                    </Text>
                                                    <View style={{height:3,width:this.state.underlineLength[page],backgroundColor:this.state.tabStatus[page]?styleVar.colorYellow:'transparent'}} />
                                                </ButtonFeedback>
                                            )
                                        },this)
                                    }
                                    </View>
                                    <Swiper
                                        ref='swiper'
                                        height={500}
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
                                                        <View style={styles.playerFigureRow}>
                                                        {
                                                            this.state.profile[node].map((item, j) => {
                                                                if (__DEV__)console.log('node',node)
                                                                if (__DEV__)console.log('item',item)
                                                                let value = item.value === 'NaN' || !item.value? 'N/A' : item.value
                                                                if (__DEV__)console.log('value',value)
                                                                let name = strToUpper(item.name).trim()
                                                                if (__DEV__)console.log('name',name)
                                                                let playerFigureUnit = name !== 'TACKLES'? [styles.playerFigureUnit] : [styles.playerFigureUnit, styles.playerFigureUnit2]
                                                                if (__DEV__)console.log('playerFigureUnit',playerFigureUnit)
                                                                if (name != 'MISSED TACKLES') {
                                                                    return(
                                                                        <View style={playerFigureUnit} key={j}>
                                                                            <Text style={styles.playerFigureUpperText}>{ name }</Text>
                                                                            <View style={[styles.ratingScore, styles.playerRatingScore]}>
                                                                                <Text style={styles.ratingScorePoint}>{ value }</Text>
                                                                            </View>
                                                                            <Text style={styles.playerFigureLowerText}>
                                                                                {  item.average === 'NaN'? 'N/A' : item.average } avg
                                                                            </Text>
                                                                        </View>
                                                                    )
                                                                }
                                                            },this)
                                                        }
                                                        </View>
                                                    </View>
                                                    )
                                            },this)
                                        }
                                    </Swiper>
                                </View>
                                :
                                <View>
                                    <Text style={styles.statisticsText}> Sorry, no other performance data is currently available for this player.</Text>
                                </View>

                            }
                            </View>
                            <View style={styles.semiCardFooter}>
                                <Text style={styles.semiCardFooterText}> Analytics Sponsored by </Text>
                                <Image source={require('../../../images/footer/eyLogo.png')}></Image>
                            </View>
                            {
                                !isEmptyObject(this.state.profile)&&<ButtonFeedback 
                                    onPress={()=>this.props.pressInfo(true,'info')}
                                        style={styles.btnCardInfoWrapper}> 
                                    <View style={styles.btnCardInfo}>
                                        <Icon name='md-information-circle' style={styles.cardInfoIcon}/>
                                    </View>
                                </ButtonFeedback>
                            }
                        </View>
                    </View>
            </View>            
            )
    }
}
