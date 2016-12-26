
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, RefreshControl, ActivityIndicator, Alert, Modal } from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import { replaceRoute, pushNewRoute } from '../../actions/route'
import styleVar from '../../themes/variable'
import loader from '../../themes/loader-position'
import { alertBox } from '../utility/alertBox'
import refresh from '../../themes/refresh-control'
import { drillDown } from '../../actions/content'
import { setAccessGranted } from '../../actions/token'
import { removeToken } from '../utility/asyncStorageServices'
import { service } from '../utility/services'
import Data from '../../../contents/unions/data'
import { globalNav } from '../../appNavigator'
import Share from 'react-native-share'
import RNViewShot from 'react-native-view-shot'
import Swiper from 'react-native-swiper'
import BarGraph from '../utility/barGraph'
import BarSlider from '../utility/barSlider'

class MySquad extends Component {

    constructor(props){
        super(props)
        this.state={
            modalVisible: false,
            modalClear:false,
            modalPopulate:false,
            showScoreCard:'semi',
            squadData:{
                    captain:123,
                    kicker:null,
                    wildcard:123,
                    forwards:[null,123,null,null,null,null,123,null,null,null,null,null,null,null,null,null],
                    backs:[123,123,null,123,null,123,null,null,null,null,null,null,null,null,null,null],
            }
        }
        this.emptyFeed={
                    captain:null,
                    kicker:null,
                    wildcard:null,
                    forwards:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    backs:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                }
        this.semiFeed={
                    captain:123,
                    kicker:null,
                    wildcard:123,
                    forwards:[null,123,null,null,null,null,123,null,null,null,null,null,null,null,null,null],
                    backs:[123,123,null,123,null,123,null,null,null,null,null,null,null,null,null,null],
        }
        this.fullFeed={
                    captain:123,
                    kicker:123,
                    wildcard:123,
                    forwards:[123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123],
                    backs:[123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123]
        }
    }
    sas(context){
        setTimeout(()=>{
            RNViewShot.takeSnapshot(this.refs['scorecard'],{
                format:'png',
                quality: 1,
                result: 'base64'
            })
            .then(
                res => Share.open({
                    title:context,
                    message:context,
                    subject:context,
                    url: `data:image/png;base64,${res}`
                })
            )          
        })

    }
    _setModalVisible=(visible) => {
        this.setState({
            modalVisible:visible,
        })
    }
    _setModalClear=(visible) => {
        this.setState({
            modalClear:visible,
        })
    }
    _setModalPopulate=(visible) => {
        this.setState({
            modalPopulate:visible,
        })
    }
    changeMode(mode) {
        if(mode===undefined) {
            this.setState({
                showScoreCard:this.state.showScoreCard==='empty'?'semi':this.state.showScoreCard==='semi'?'full':'empty',
                squadData:this.state.showScoreCard==='empty'?this.semiFeed:this.state.showScoreCard==='semi'?this.fullFeed:this.emptyFeed
            })
        }
        else {
            this.setState({
                showScoreCard:mode==='empty'?'empty':mode==='semi'?'semi':'full',
                squadData:mode==='empty'?this.emptyFeed:mode==='semi'?this.semiFeed:this.fullFeed
            })
            this._setModalClear(false)
            this._setModalPopulate(false)
        }
    }

    _mapJSON(data, colMax = 2) {
        let i = 0
        let k = 0
        let newData = []
        let items = []
        let length = data.length

        for( i = 0; i <data.length; (i += colMax)) {
            for( k = 0; k < colMax; k++ ) {
                if(data[i + k]!==undefined)
                    items.push(data[i + k])
            }

            newData.push(items)
            items = []
        }
        return newData
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />
                    <ScrollView>
                        <Text style={[styles.headerTitle,styles.squadTitle]}>MY SQUAD</Text>
                        <ButtonFeedback style={styles.scoreCard}  onPress={()=>this.changeMode()}>
                        {this.state.showScoreCard!=='full'?
                            <View style={styles.semiCard}>
                                <Text style={styles.semiCardText}>
                                Complete your full squad of 35 players to receive a real-time squad rating from EY
                                </Text>
                                <View style={styles.semiCardFooter}>
                                    <Text style={styles.semiCardFooterText}> Performance Statistics supplied by </Text>
                                    <Image source={require('../../../images/footer/eyLogo.png')}></Image>
                                </View>
                            </View>
                            :
                            <View>
                                <View ref='scorecard' style={styles.fullCard}>
                                    <ButtonFeedback 
                                        onPress={()=>this._setModalVisible(true)}
                                        style={styles.btnCardInfo}>
                                        <Icon name='md-information-circle' style={styles.cardInfoIcon}/>
                                    </ButtonFeedback>
                                    <View style={styles.summaryWrapper}>
                                        <Text style={styles.summaryText}>Congratulations. Your squad has earned the following rating.</Text>
                                        <Text style={styles.summaryTextHighLight}>TOP 5%</Text>
                                    </View>
                                    <View style={styles.ratingWrapper}>
                                        <Text style={styles.ratingTitle}>OVERALL RATING</Text>
                                        <View style={styles.ratingScore}>
                                            <Text style={styles.ratingScorePoint}>350</Text>
                                        </View>
                                    </View>
                                    <View style={{height:105,borderTopWidth:1,borderColor:'rgb(216,217,218)',paddingHorizontal:25,paddingTop:15}}>
                                        <Text style={{fontFamily: styleVar.fontCondensed,fontSize:18,textAlign:'left'}}>COHESION</Text>
                                        <BarGraph score={86} fullWidth={220} />
                                    </View>
                                    <View style={{height:110}}>
                                        <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',borderTopWidth:1,borderColor:'rgb(216,217,218)',paddingHorizontal:25,paddingTop:25}}>
                                            <Text style={{fontFamily: styleVar.fontCondensed,fontSize:18,lineHeight:18,}}>ATTACK</Text>
                                            <Text style={{fontFamily: styleVar.fontCondensed,fontSize:18,lineHeight:18,}}>DEFENCE</Text>
                                        </View>
                                        <BarSlider score={30} fullWidth={270} />
                                    </View>
                                    <View style={{borderTopWidth:1,borderColor:'rgb(216,217,218)',marginTop:10,paddingHorizontal:20}}>
                                        <ButtonFeedback
                                            rounded label='Share'
                                            onPress={ ()=> this.sas('scorecard') }
                                            style={[styles.button,{backgroundColor:'rgb(255,230,0)', flexDirection:'row'}]}>
                                            <Text
                                            style={{textAlign:'left', fontFamily: styleVar.fontCondensed, fontSize: 24, lineHeight: 24,color: 'rgb(95,96,98)', paddingTop:5 }}>
                                            SHARE
                                            </Text>
                                            <Icon name='md-share-alt' style={{marginLeft: 5, width: 34, color: 'rgb(95,96,98)', fontSize:24 }} />
                                        </ButtonFeedback>
                                    </View>
                                    <View style={{backgroundColor:'rgb(128,128,128)',height:50,alignItems:'flex-end',padding:10}}>
                                        <Image source={require('../../../images/footer/eyLogo.png')} style={{height:30,width:29}}></Image>
                                    </View>
                                </View>

                                <ButtonFeedback rounded style={[styles.button,{backgroundColor:'rgb(38,38,38)', flexDirection:'row', marginTop:20,marginBottom:0,marginLeft:10,marginRight:10 }]}>
                                    <Icon name='md-contact' style={styles.btnExpertIcon} />
                                    <Text style={styles.btnExpertLabel}>THE EXPERTS' SQUADS</Text>
                                </ButtonFeedback>
                            </View>
                        }
                        </ButtonFeedback>
                        {
                            this.state.showScoreCard==='empty'?
                            <ButtonFeedback rounded label='AUTO POPULATE' style={styles.button} onPress={()=>this._setModalPopulate(true)} />
                            :
                            <ButtonFeedback rounded label='CLEAR ALL SELECTIONS' style={styles.button} onPress={()=>this._setModalClear(true)} />
                        }
                        <ScrollView >
                            <View style={{flexDirection:'row'}}>
                                <View style={{width:styleVar.deviceWidth/3,backgroundColor:'rgb(255,255,255)',paddingLeft:1}}>
                                    <View style={{borderTopWidth:1,borderLeftWidth:1,borderBottomWidth:1,borderColor:'rgb(216,217,218)',height:50,paddingTop:17}}>
                                        <Text style={{color:'rgb(175,0,30)',textAlign:'center',fontFamily: styleVar.fontCondensed,fontSize:24}}>CAPTAIN</Text>
                                    </View>
                                    {
                                    this.state.squadData.captain===null?
                                    <ButtonFeedback>
                                        <View style={{width:styleVar.deviceWidth / 3,height:styleVar.deviceWidth / 3,backgroundColor:'rgb(175,0,30)',justifyContent:'center',alignItems:'center'}}>
                                            <Icon name='md-person-add' style={{fontSize:60,color:'rgb(255,255,255)'}} />
                                        </View>
                                        <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                            <View style={[shapes.triangle]} />
                                            <View style={styles.gridBoxTitle}>
                                                <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>ADD</Text>
                                                <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>CAPTAIN</Text>
                                                </View>
                                        </View>
                                    </ButtonFeedback>
                                    :
                                    <ButtonFeedback>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                        <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                            <View style={[shapes.triangle]} />
                                            <View style={styles.gridBoxTitle}>
                                                <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                                <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                                </View>
                                        </View>
                                    </ButtonFeedback>
                                    }
                                </View>
                                <View style={{width:styleVar.deviceWidth/3,backgroundColor:'rgb(255,255,255)',paddingLeft:1}}>
                                    <View style={{borderTopWidth:1,borderLeftWidth:1,borderBottomWidth:1,borderColor:'rgb(216,217,218)',height:50,paddingTop:17}}>
                                        <Text style={{color:'rgb(175,0,30)',textAlign:'center',fontFamily: styleVar.fontCondensed,fontSize:24}}>KICKER</Text>
                                    </View>
                                    {
                                    this.state.squadData.kicker===null?
                                    <ButtonFeedback>
                                        <View style={{width:styleVar.deviceWidth / 3,height:styleVar.deviceWidth / 3,backgroundColor:'rgb(175,0,30)',justifyContent:'center',alignItems:'center'}}>
                                            <Icon name='md-person-add' style={{fontSize:60,color:'rgb(255,255,255)'}} />
                                        </View>
                                        <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                            <View style={[shapes.triangle]} />
                                            <View style={styles.gridBoxTitle}>
                                                <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>ADD</Text>
                                                <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>KICKER</Text>
                                                </View>
                                        </View>
                                    </ButtonFeedback>
                                    :
                                    <ButtonFeedback>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                        <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                            <View style={[shapes.triangle]} />
                                            <View style={styles.gridBoxTitle}>
                                                <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                                <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                                </View>
                                        </View>
                                    </ButtonFeedback>
                                    }
                                </View>
                                <View style={{width:styleVar.deviceWidth/3,backgroundColor:'rgb(255,255,255)',paddingLeft:1}}>
                                    <View style={{borderTopWidth:1,borderLeftWidth:1,borderBottomWidth:1,borderColor:'rgb(216,217,218)',height:50,paddingTop:17}}>
                                        <Text style={{color:'rgb(175,0,30)',textAlign:'center',fontFamily: styleVar.fontCondensed,fontSize:24}}>WILDCARD</Text>
                                    </View>
                                    {
                                    this.state.squadData.wildcard===null?
                                    <ButtonFeedback>
                                        <View style={{width:styleVar.deviceWidth / 3,height:styleVar.deviceWidth / 3,backgroundColor:'rgb(175,0,30)',justifyContent:'center',alignItems:'center'}}>
                                            <Icon name='md-person-add' style={{fontSize:60,color:'rgb(255,255,255)'}} />
                                        </View>
                                        <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                            <View style={[shapes.triangle]} />
                                            <View style={styles.gridBoxTitle}>
                                                <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>ADD</Text>
                                                <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>WILDCARD</Text>
                                                </View>
                                        </View>
                                    </ButtonFeedback>
                                    :
                                    <ButtonFeedback>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                        <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                            <View style={[shapes.triangle]} />
                                            <View style={styles.gridBoxTitle}>
                                                <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                                <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                                </View>
                                        </View>
                                    </ButtonFeedback>
                                    }
                                </View>
                            </View> 
                            <View style={{flexDirection:'row',justifyContent:'space-between',width:styleVar.deviceWidth,borderWidth:1,borderColor:'rgb(216,217,218)',height:50,padding:12}}>
                              <Text style={{color:'rgb(175,0,30)',textAlign:'left',fontFamily: styleVar.fontCondensed,fontSize:24}}>FORWARDS</Text>
                              <Text style={{color:'rgb(175,0,30)',textAlign:'right',fontFamily: styleVar.fontCondensed,fontSize:24}}>
                               {this.state.squadData.forwards.filter((value)=>value!==null).length} / 16
                              </Text>
                            </View>
                            <Swiper
                            ref='swiper'
                            height={220}
                            loop={false}
                            dotColor='rgba(255,255,255,0.3)'
                            activeDotColor='rgb(239,239,244)'>
                            {
                            this._mapJSON(this.state.squadData.forwards,3).map((rowData,i)=>{
                                return(
                                    <View style={{flexDirection:'row',backgroundColor:'black',height:220}} key={i}>
                                        {
                                            rowData.map((item,index)=>{
                                                return(
                                                        item===null?
                                                        <View style={{width:styleVar.deviceWidth/3}} key={index}>
                                                            <ButtonFeedback>
                                                                <View style={{width:styleVar.deviceWidth / 3,height:styleVar.deviceWidth / 3,backgroundColor:'rgb(175,0,30)',justifyContent:'center',alignItems:'center',borderLeftWidth:1,borderColor:'rgb(255,255,255)'}}>
                                                                    <Icon name='md-person-add' style={{fontSize:60,color:'rgb(255,255,255)'}} />
                                                                </View>
                                                                <View style={{width: styleVar.deviceWidth / 3, marginTop:-12,borderLeftWidth:1,borderColor:'rgb(255,255,255)' }}>
                                                                    <View style={[shapes.triangle]} />
                                                                    <View style={styles.gridBoxTitle}>
                                                                        <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>ADD</Text>
                                                                        <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>FORWARD</Text>
                                                                        </View>
                                                                </View>
                                                            </ButtonFeedback>
                                                        </View>
                                                        :
                                                        <View style={{width:styleVar.deviceWidth/3}} key={index}>
                                                            <ButtonFeedback>
                                                                <ImagePlaceholder 
                                                                    width = {styleVar.deviceWidth / 3}
                                                                    height = {styleVar.deviceWidth / 3}>
                                                                    <Image transparent
                                                                        resizeMode='contain'
                                                                        source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                                        style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                                                </ImagePlaceholder>
                                                                <View style={{width: styleVar.deviceWidth / 3, marginTop:-12,borderLeftWidth:1,borderColor:'rgb(255,255,255)'  }}>
                                                                    <View style={[shapes.triangle]} />
                                                                    <View style={styles.gridBoxTitle}>
                                                                        <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                                                        <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                                                        </View>
                                                                </View>
                                                            </ButtonFeedback>
                                                        </View>
                                                    )
                                            }, this)
                                        }
                                    </View>
                                )

                            },this)
                            }

                        </Swiper>
                            
                            <View style={{flexDirection:'row',justifyContent:'space-between',width:styleVar.deviceWidth,borderWidth:1,borderColor:'rgb(216,217,218)',height:50,padding:12}}>
                              <Text style={{color:'rgb(175,0,30)',textAlign:'left',fontFamily: styleVar.fontCondensed,fontSize:24}}>BACKS</Text>
                              <Text style={{color:'rgb(175,0,30)',textAlign:'right',fontFamily: styleVar.fontCondensed,fontSize:24}}>
                               {this.state.squadData.backs.filter((value)=>value!==null).length} / 16
                              </Text>
                            </View>
                            <Swiper
                            ref='swiper'
                            height={220}
                            loop={false}
                            dotColor='rgba(255,255,255,0.3)'
                            activeDotColor='rgb(239,239,244)'>
                            {
                            this._mapJSON(this.state.squadData.backs,3).map((rowData,i)=>{
                                return(
                                    <View style={{flexDirection:'row',backgroundColor:'black',height:220}} key={i}>
                                        {
                                            rowData.map((item,index)=>{
                                                return(
                                                        item===null?
                                                        <View style={{width:styleVar.deviceWidth/3}} key={index}>
                                                            <ButtonFeedback>
                                                                <View style={{width:styleVar.deviceWidth / 3,height:styleVar.deviceWidth / 3,backgroundColor:'rgb(175,0,30)',justifyContent:'center',alignItems:'center',borderLeftWidth:1,borderColor:'rgb(255,255,255)' }}>
                                                                    <Icon name='md-person-add' style={{fontSize:60,color:'rgb(255,255,255)'}} />
                                                                </View>
                                                                <View style={{width: styleVar.deviceWidth / 3, marginTop:-12,borderLeftWidth:1,borderColor:'rgb(255,255,255)'  }}>
                                                                    <View style={[shapes.triangle]} />
                                                                    <View style={styles.gridBoxTitle}>
                                                                        <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>ADD</Text>
                                                                        <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>BACK</Text>
                                                                        </View>
                                                                </View>
                                                            </ButtonFeedback>
                                                        </View>
                                                        :
                                                        <View style={{width:styleVar.deviceWidth/3}} key={index}>
                                                            <ButtonFeedback>
                                                                <ImagePlaceholder 
                                                                    width = {styleVar.deviceWidth / 3}
                                                                    height = {styleVar.deviceWidth / 3}>
                                                                    <Image transparent
                                                                        resizeMode='contain'
                                                                        source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                                        style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                                                </ImagePlaceholder>
                                                                <View style={{width: styleVar.deviceWidth / 3, marginTop:-12,borderLeftWidth:1,borderColor:'rgb(255,255,255)'  }}>
                                                                    <View style={[shapes.triangle]} />
                                                                    <View style={styles.gridBoxTitle}>
                                                                        <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                                                        <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                                                        </View>
                                                                </View>
                                                            </ButtonFeedback>
                                                        </View>
                                                    )
                                            }, this)
                                        }
                                    </View>
                                )

                            },this)
                            }

                        </Swiper>
                            <LionsFooter isLoaded={true} />
                    </ScrollView>
                    </ScrollView>
                    <EYSFooter mySquadBtn={true}/>

                    <Modal
                        visible={this.state.modalVisible}
                        onRequestClose={()=>this._setModalVisible(false)}>
                        <LinearGradient colors={['#AF001E', '#81071C']} style={styles.onboarding}>
                            <ButtonFeedback onPress={()=>this._setModalVisible(false)} 
                            style={styles.btnClose}>
                                <Icon name='md-close' style={styles.btnCloseIcon}/>
                            </ButtonFeedback>
                                <ScrollView style={{paddingHorizontal:28,marginVertical:54}}>
                                        <Text style={{fontFamily: styleVar.fontCondensed,fontSize:28,marginTop:28}}>OVERALL RATING</Text>
                                        <Text style={{fontFamily: styleVar.fontGeorgia,fontSize:16,}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
                                
                                        <Text style={{fontFamily: styleVar.fontCondensed,fontSize:28,marginTop:28}}>OVERALL RATING</Text>
                                        <Text style={{fontFamily: styleVar.fontGeorgia,fontSize:16,}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
                                
                                        <Text style={{fontFamily: styleVar.fontCondensed,fontSize:28,marginTop:28}}>OVERALL RATING</Text>
                                        <Text style={{fontFamily: styleVar.fontGeorgia,fontSize:16,}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
                                
                                        <Text style={{fontFamily: styleVar.fontCondensed,fontSize:28,marginTop:28}}>OVERALL RATING</Text>
                                        <Text style={{fontFamily: styleVar.fontGeorgia,fontSize:16,}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
                                </ScrollView>
                        </LinearGradient>
                    </Modal>
                    <Modal
                        visible={this.state.modalClear}
                        onRequestClose={()=>this._setModalClear(false)}>
                        <LinearGradient colors={['#AF001E', '#81071C']} style={styles.onboarding}>
                            <ButtonFeedback onPress={()=>this._setModalClear(false)} 
                            style={styles.btnClose}>
                                <Icon name='md-close' style={styles.btnCloseIcon}/>
                            </ButtonFeedback>
                                <View style={{paddingHorizontal:28,marginVertical:54}}>
                                    <Text style={{fontFamily: styleVar.fontCondensed,fontSize:28,marginTop:28,textAlign:'center'}}>CLEAR ALL SELECTIONS</Text>
                                    <Text style={{fontFamily: styleVar.fontGeorgia,fontSize:16,textAlign:'center'}}>This will remove all currently assigned players from your squad.</Text>
                                    <View style={{marginTop:15,height:50,flexDirection:'row',justifyContent:'space-between'}}>
                                        <ButtonFeedback rounded onPress={()=>this._setModalClear(false)} label='CANCEL' style={{height: 50, width:132, backgroundColor: 'rgb(38,38,38)', }} />
                                        <ButtonFeedback rounded onPress={()=>this.changeMode('empty')} label='CONFIRM' style={{height: 50, width:132, backgroundColor: styleVar.brandLightColor,  }}  />
                                    </View>
                                </View>
                        </LinearGradient>
                    </Modal>
                    <Modal
                        visible={this.state.modalPopulate}
                        onRequestClose={()=>this._setModalPopulate(false)}>
                        <LinearGradient colors={['#AF001E', '#81071C']} style={styles.onboarding}>
                            <ButtonFeedback onPress={()=>this._setModalPopulate(false)} 
                            style={styles.btnClose}>
                                <Icon name='md-close' style={styles.btnCloseIcon}/>
                            </ButtonFeedback>
                                <View style={{paddingHorizontal:28,marginVertical:54}}>
                                    <Text style={{fontFamily: styleVar.fontCondensed,fontSize:28,marginTop:28,textAlign:'center'}}>AUTO POPULATE</Text>
                                    <Text style={{fontFamily: styleVar.fontGeorgia,fontSize:16,textAlign:'center'}}>This will auto-populate your squad with a random selection of players.</Text>
                                    <View style={{marginTop:15,height:50,flexDirection:'row',justifyContent:'space-between'}}>
                                        <ButtonFeedback rounded onPress={()=>this._setModalPopulate(false)} label='CANCEL' style={{height: 50, width:132, backgroundColor: 'rgb(38,38,38)', }} />
                                        <ButtonFeedback rounded onPress={()=>this.changeMode('full')}  label='PROCEED' style={{height: 50, width:132, backgroundColor: styleVar.brandLightColor,  }}  />
                                    </View>
                                </View>
                        </LinearGradient>
                    </Modal>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}

export default connect((state) => {
    return {
        route: state.route,
    }
}, bindAction)(MySquad)

