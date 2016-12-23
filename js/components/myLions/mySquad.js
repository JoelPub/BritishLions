
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, RefreshControl, ActivityIndicator, Alert } from 'react-native'
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

class MySquad extends Component {

    constructor(props){
        super(props)
        this.state={
            showScoreCard:false
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
    renderPagination = (index, total, context) => {
            return (
                <View style={{position: 'absolute',flexDirection:'row',justifyContent:'space-between',width:styleVar.deviceWidth,top: 0,right:0, borderWidth:1,borderColor:'rgb(216,217,218)',height:50,paddingTop:17}}>
                  <Text style={{color:'rgb(175,0,30)',textAlign:'left',fontFamily: styleVar.fontCondensed,fontSize:24}}>Forwards</Text>
                  <Text style={{color:'rgb(175,0,30)',textAlign:'right',fontFamily: styleVar.fontCondensed,fontSize:24}}>
                    {(index + 1)*3} / 16
                  </Text>
                </View>
            )
    }
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />
                    <ScrollView>
                        <Text style={[styles.headerTitle,{color:'rgb(175,0,30)',marginTop:20,fontSize:28}]}>MY SQUAD</Text>
                        <ButtonFeedback 
                        style={{marginVertical:10,borderTopWidth:1,borderBottomWidth:2,borderColor:'rgb(216,217,218)',padding:20}}
                        onPress={()=>this.setState({showScoreCard:!this.state.showScoreCard})}>
                        {this.state.showScoreCard?
                            <View style={{paddingTop:29, marginBottom:10,backgroundColor:'rgb(95,96,98)'}}>
                                <Text style={{fontFamily: styleVar.fontGeorgia,fontSize:18,paddingHorizontal:20,marginBottom:24,textAlign:'center'}}>
                                Complete your full squad of 35 players to receive a real-time squad rating from EY
                                </Text>
                                <View style={{flexDirection: 'row',alignItems:'flex-end',justifyContent:'flex-end',backgroundColor:'rgb(128,128,128)',height:50,paddingBottom:9,paddingRight:11}}>
                                    <Text style={{fontFamily: styleVar.fontGeorgia,fontSize:13,marginRight:5}}> Performance Statistics supplied by </Text>
                                    <Image source={require('../../../images/footer/eyLogo.png')}></Image>
                                </View>
                            </View>
                            :
                            <View ref='scorecard' style={{paddingTop:30,backgroundColor:'rgb(95,96,98)',height:619}}>
                                <ButtonFeedback 
                                    style={{height:28,width:28,borderRadius:14,backgroundColor:'rgb(255,255,255)',
                                            position:'absolute',right:4,top:4}}>
                                    <Icon name='md-information-circle' style={{fontSize:28, textAlign:'center',color:'rgb(95,96,98)',}}/>
                                </ButtonFeedback>
                                <View style={{paddingHorizontal:10}}>
                                    <Text style={{fontFamily: styleVar.fontGeorgia,fontSize:18,textAlign:'center'}}>Congratulations. Your squad has earned the following rating.</Text>
                                    <Text style={{fontFamily: styleVar.fontGeorgia,fontSize:18,textAlign:'center'}}>Check back tomorrow for your individual ranking.</Text>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderTopWidth:1,borderColor:'rgb(216,217,218)',
                                            marginTop:45,paddingVertical:19}}>
                                    <Text style={{fontFamily: styleVar.fontCondensed,fontSize:28}}>OVERALL RATING</Text>
                                    <View style={{marginLeft:10,height:70,width:70,borderRadius:35,backgroundColor:'rgb(255,230,0)',justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontFamily: styleVar.fontCondensed,fontSize:28,color:'rgb(95,96,98)'}}>350</Text>
                                    </View>
                                </View>
                                <View style={{height:105,borderTopWidth:1,borderColor:'rgb(216,217,218)',padding:25}}>
                                    <Text style={{fontFamily: styleVar.fontCondensed,fontSize:18,textAlign:'left'}}>COHESION</Text>
                                    <View style={{flexDirection:'row',flex:1,alignItems:'center',height:50}}>
                                        <View style={{flex:4}}>
                                            <View style={{height:8,backgroundColor:'rgb(128,128,128)',width:220}}></View>
                                            <View style={{height:8,backgroundColor:'rgb(255,230,0)',width:177,borderRadius:4,marginTop:-8}}></View>
                                        </View>
                                        <Text style={{fontFamily: styleVar.fontCondensed,fontSize:44,lineHeight:48,color:'rgb(255,230,0)',}}>86</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',borderTopWidth:1,borderColor:'rgb(216,217,218)',paddingHorizontal:25,paddingTop:25}}>
                                    <Text style={{fontFamily: styleVar.fontCondensed,fontSize:18,lineHeight:18,}}>ATTACK</Text>
                                    <Text style={{fontFamily: styleVar.fontCondensed,fontSize:18,lineHeight:18,}}>DEFENCE</Text>
                                </View>
                                <View style={{height:8,backgroundColor:'rgb(128,128,128)',borderRadius:4,marginHorizontal:25}} />
                                <View style={{marginHorizontal:25,marginTop:-20,marginLeft:72}}>
                                    <Icon name='md-disc' style={{fontSize:32,color:'rgb(255,230,0)'}}/>    
                                </View>
                                <View style={{borderTopWidth:1,borderColor:'rgb(216,217,218)',marginTop:30,paddingHorizontal:20}}>
                                    <ButtonFeedback
                                        rounded label='Share'
                                        onPress={ ()=> this.sas('scorecard') }
                                        style={[styles.button,{backgroundColor:'rgb(255,230,0)', flexDirection:'row'}]}>
                                        <Text
                                        style={{textAlign:'left', fontFamily: styleVar.fontCondensed, fontSize: 24, lineHeight: 24,color: 'rgb(95,96,98)', paddingTop:5 }}>
                                        SHARE
                                        </Text>
                                        <Icon name='md-share-alt' style={{marginLeft: 20, width: 34, color: 'rgb(95,96,98)', fontSize:24 }} />
                                    </ButtonFeedback>
                                </View>
                                <View style={{backgroundColor:'rgb(128,128,128)',height:50,alignItems:'flex-end',padding:10}}>
                                    <Image source={require('../../../images/footer/eyLogo.png')} style={{height:30,width:29}}></Image>
                                </View>
                            </View>
                        }
                        </ButtonFeedback>
                        <ButtonFeedback rounded label='AUTO POPULATE' style={styles.button}>
                        </ButtonFeedback>
                        <ScrollView >
                            <ScrollView horizontal={true}>
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <View style={{borderWidth:1,borderColor:'rgb(216,217,218)',height:50,paddingTop:17}}>
                                        <Text style={{color:'rgb(175,0,30)',textAlign:'center',fontFamily: styleVar.fontCondensed,fontSize:24}}>CAPTAIN</Text>
                                    </View>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-10 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View>
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <View style={{borderWidth:1,borderColor:'rgb(216,217,218)',height:50,paddingTop:17}}>
                                        <Text style={{color:'rgb(175,0,30)',textAlign:'center',fontFamily: styleVar.fontCondensed,fontSize:24}}>CAPTAIN</Text>
                                    </View>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-10 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View> 
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <View style={{borderWidth:1,borderColor:'rgb(216,217,218)',height:50,paddingTop:17}}>
                                        <Text style={{color:'rgb(175,0,30)',textAlign:'center',fontFamily: styleVar.fontCondensed,fontSize:24}}>CAPTAIN</Text>
                                    </View>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-10 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View>
                            </ScrollView> 
                            <View style={{flexDirection:'row',justifyContent:'space-between',width:styleVar.deviceWidth,borderWidth:1,borderColor:'rgb(216,217,218)',height:50,paddingTop:17}}>
                              <Text style={{color:'rgb(175,0,30)',textAlign:'left',fontFamily: styleVar.fontCondensed,fontSize:24}}>FORWARDS</Text>
                              <Text style={{color:'rgb(175,0,30)',textAlign:'right',fontFamily: styleVar.fontCondensed,fontSize:24}}>
                               4 / 16
                              </Text>
                            </View>
                            <Swiper
                            ref='swiper'
                            height={220}
                            loop={false}
                            dotColor='rgba(255,255,255,0.3)'
                            activeDotColor='rgb(239,239,244)'>
                               
                            <View style={{flexDirection:'row',backgroundColor:'black',height:220}}>
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View>
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View> 
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View> 
                            </View>
                               
                            <View style={{flexDirection:'row',backgroundColor:'black',height:220}}>
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View>
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View> 
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View> 
                            </View>

                        </Swiper>
                            <View style={{flexDirection:'row',justifyContent:'space-between',width:styleVar.deviceWidth,borderWidth:1,borderColor:'rgb(216,217,218)',height:50,paddingTop:17}}>
                              <Text style={{color:'rgb(175,0,30)',textAlign:'left',fontFamily: styleVar.fontCondensed,fontSize:24}}>FORWARDS</Text>
                              <Text style={{color:'rgb(175,0,30)',textAlign:'right',fontFamily: styleVar.fontCondensed,fontSize:24}}>
                               4 / 16
                              </Text>
                            </View>
                            <Swiper
                            ref='swiper'
                            height={220}
                            loop={false}
                            dotColor='rgba(255,255,255,0.3)'
                            activeDotColor='rgb(239,239,244)'>
                               
                            <View style={{flexDirection:'row',backgroundColor:'black',height:220}}>
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View>
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View> 
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View> 
                            </View>
                               
                            <View style={{flexDirection:'row',backgroundColor:'black',height:220}}>
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View>
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View> 
                                <View style={{width:styleVar.deviceWidth/3}}>
                                    <ButtonFeedback onPress={() => this._showDetail(rowData,'myLionsPlayerDetails')}>
                                        <ImagePlaceholder 
                                            width = {styleVar.deviceWidth / 3}
                                            height = {styleVar.deviceWidth / 3}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')} 
                                                style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 3, height: styleVar.deviceWidth / 3 }} />
                                        </ImagePlaceholder>
                                    </ButtonFeedback>
                                    <View style={{width: styleVar.deviceWidth / 3, marginTop:-12 }}>
                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>JAMES</Text>
                                            <Text style={{textAlign: 'center', fontFamily: styleVar.fontCondensed, fontSize: 18, lineHeight: 18, paddingTop: 4, marginTop: -6 }}>HASKELL</Text>
                                            </View>
                                    </View>
                                </View> 
                            </View>

                        </Swiper>
                            <LionsFooter isLoaded={true} />
                    </ScrollView>
                    </ScrollView>
                    <EYSFooter />
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

