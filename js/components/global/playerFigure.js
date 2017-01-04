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
        this.state = {
            underlineLength:[],
            tabStatus:[],
    	},
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

	render() {
		return (
            <View style={styles.playerFigureView}>
                <View style={styles.playerFigureTypeView}>
                {
                    this.props.tabBar.map((node,page)=>{
                        return (
                        <ButtonFeedback 
                        style={styles.playerFigureType} 
                        onPress={()=>this.changePage(page)}
                        key={page}>
                            <Text 
                            style={[styles.playerFigureTypeText,{color:this.state.tabStatus[page]?styleVar.colorTextDarkGrey:styleVar.colorGrey2}]}
                            onLayout={this.measureTab.bind(this,page)}>{node.subject}</Text>
                            <View style={{height:3,width:this.state.underlineLength[page],backgroundColor:this.state.tabStatus[page]?styleVar.colorYellow:'transparent'}} />
                        </ButtonFeedback>
                        )
                    },this)
                }
                </View>
               <Swiper
                ref='swiper'
                height={styleVar.deviceWidth}
                width={styleVar.deviceWidth-100}
                loop={false}
                dotColor='rgb(95,96,98)'
                activeDotColor='rgb(255,230,0)'
                onMomentumScrollEnd={(e, state, context) => this.swiperScroll(e, state, context)}>
                {
                    this.props.tabBar.map((node,i)=>{
                        return(
                            <View style={styles.playerFigurePageWrapper}>
                                {
                                    this._mapJSON(node.content).map((rowData,index)=>{
                                        return(
                                            <View style={styles.playerFigureRow}>
                                            {
                                                rowData.map((item, key) => {
                                                    return(
                                                        <View style={styles.playerFigureUnit}>
                                                            <Text style={styles.playerFigureUpperText}>{item.title}</Text>
                                                            <View style={[styles.ratingScore,styles.playerRatingScore]}>
                                                                <Text style={styles.ratingScorePoint}>{item.score}</Text>
                                                            </View>
                                                            <Text style={styles.playerFigureLowerText}>{item.average}</Text>
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
			)
	}

}
