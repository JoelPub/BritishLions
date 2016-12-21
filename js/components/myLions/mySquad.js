
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
                <View style={{position: 'absolute',width:styleVar.deviceWidth,top: 0,right:0, backgroundColor:'grey'}}>
                  <Text style={{color:'red',textAlign:'center'}}>Forwards</Text>
                  <Text style={{color:'red',textAlign:'right'}}>
                    {(index + 1)*4} of 17
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
                            <View ref='scorecard' style={{padding:10,backgroundColor:'grey',height:400}}>
                                <ButtonFeedback 
                                style={{height:20,width:20,borderRadius:10,backgroundColor:'white',
                                        position:'absolute',right:10,top:10}}>
                                <Text style={{color:'red',textAlign:'center'}}>i</Text>
                                </ButtonFeedback>
                                <View style={{marginTop:20,flexDirection:'row',flex:1}}>
                                    <View style={{flex:3}}>
                                        <Text>Well Done!</Text>
                                        <Text>Your squad is ranked 24 out of 31,000</Text>
                                    </View>
                                    <View style={{flex:2,backgroundColor:'white'}}>
                                        <Text style={{color:'red'}}>350</Text>
                                        <Text style={{color:'grey'}}>OVERAL RATING</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',flex:1,marginTop:10}}>
                                    <View style={{flex:3}}>
                                        <Text>COHESION</Text>
                                        <View style={{height:10,backgroundColor:'white',borderRadius:5}}></View>
                                        <View 
                                        style={{height:10,backgroundColor:'red',width:200,borderRadius:5,
                                                marginTop:-10}}></View>

                                    </View>
                                    <View style={{flex:1}}>
                                        <Text>82</Text>
                                        <Text>DEFENCE</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',flex:1}}>
                                    <View style={{flex:1}}>
                                    <Text style={{textAlign:'left'}}>ATTACK</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                    <Text style={{textAlign:'right'}}>DEFENCE</Text>
                                    </View>
                                </View>
                                <View style={{height:10,backgroundColor:'red',borderRadius:5}}></View>
                                <View style={{height:20,width:20,marginTop:-15,backgroundColor:'yellow',
                                              transform: [{rotate: '45deg'}],position:'absolute',left:100}}></View>
                                <ButtonFeedback
                                    rounded label='Share'
                                    onPress={ ()=> this.sas('scorecard') }
                                    style={{backgroundColor:'red',height:30,marginTop:20}}>
                                </ButtonFeedback>
                                <ButtonFeedback rounded label='VIEW THE EXPERTS PICKS'
                                    style={{height:30,
                                            marginTop:20}}>
                                </ButtonFeedback>
                                <View style={{marginTop:20,flexDirection: 'row',}}>
                                    <Text> Performance Statistics supplied by </Text>
                                    <Image source={require('../../../images/footer/eyLogo.png')}></Image>
                                </View>
                            </View>
                        }
                        </ButtonFeedback>
                        <ButtonFeedback rounded label='AUTO POPULATE' style={styles.button}>
                        </ButtonFeedback>
                        <ScrollView >
                            <Content>
                            <Grid>
                                    <Col style={{height:300}} >
                                        <View style={{borderWidth:1,borderColor:'rgb(216,217,218)',height:50,paddingTop:17}}>
                                            <Text style={{color:'rgb(175,0,30)',textAlign:'center',fontFamily: styleVar.fontCondensed,fontSize:24}}>CAPTAIN</Text>
                                        </View>
                                        <ButtonFeedback style={{alignSelf: 'stretch', backgroundColor: '#fff'}} >
                                            <View style={{alignSelf: 'stretch', backgroundColor: '#FFF'}}>
                                                <View style={{alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', marginBottom: -12, width: styleVar.deviceWidth / 2, height: styleVar.deviceWidth / 2, }}>
                                                    <ImagePlaceholder 
                                                        width = {styleVar.deviceWidth / 2}
                                                        height = {styleVar.deviceWidth / 2}>
                                                        <Image transparent
                                                            resizeMode='contain'
                                                            source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                            style={{backgroundColor: '#FFF', width: styleVar.deviceWidth / 2, height: styleVar.deviceWidth / 2 }} />
                                                    </ImagePlaceholder>
                                                </View>
                                                <View style={{width: styleVar.deviceWidth / 2 }}>
                                                    <View style={[shapes.triangle]} />
                                                    <View style={{alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', marginBottom: -12, width: styleVar.deviceWidth / 2, height: styleVar.deviceWidth / 2, }}>
                                                        <Text style={styles.gridBoxTitleText}>JAMES HASKELL</Text>
                                                        <Text style={styles.gridBoxTitleSupportText}>Flanker</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </ButtonFeedback>
                                    </Col>
                                    <Col style={styles.gridBoxCol} >
                                        <View style={{backgroundColor:'grey',height:30}}>
                                            <Text style={{color:'red',textAlign:'center'}}>Kicker</Text>
                                        </View>
                                        <ButtonFeedback style={[styles.gridBoxTouchable]} >
                                            <View style={styles.gridBoxTouchableView}>
                                                <View style={styles.gridBoxImgWrapper}>
                                                    <ImagePlaceholder 
                                                        width = {styleVar.deviceWidth / 2}
                                                        height = {styleVar.deviceWidth / 2}>
                                                        <Image transparent
                                                            resizeMode='contain'
                                                            source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                            style={styles.gridBoxImg} />
                                                    </ImagePlaceholder>
                                                </View>
                                                <View style={styles.gridBoxDescWrapper}>
                                                    <View style={[shapes.triangle]} />
                                                    <View style={styles.gridBoxImgWrapper}>
                                                        <Text style={styles.gridBoxTitleText}>JAMES HASKELL</Text>
                                                        <Text style={styles.gridBoxTitleSupportText}>Flanker</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </ButtonFeedback>
                                    </Col>
                                </Grid>
                                <View>
                                <Swiper
                                ref='swiper'
                                height={270}
                                renderPagination={this.renderPagination}
                                loop={false}>
                                    <Grid>
                                        <Col style={{width:styleVar.deviceWidth / 4}} >
                                        <ButtonFeedback style={[styles.gridBoxTouchable]} >
                                            <View style={styles.gridBoxTouchableView}>
                                                <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                    <ImagePlaceholder 
                                                        width = {styleVar.deviceWidth / 4}
                                                        height = {styleVar.deviceWidth / 2}>
                                                        <Image transparent
                                                            resizeMode='contain'
                                                            source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                            style={{backgroundColor: '#FFF',width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2}} />
                                                    </ImagePlaceholder>
                                                </View>
                                                <View style={{width: styleVar.deviceWidth / 4}}>
                                                    <View style={[shapes.triangle]} />
                                                    <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                            marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                        <Text style={styles.gridBoxTitleText}>JAMES HASKELL</Text>
                                                        <Text style={styles.gridBoxTitleSupportText}>Flanker</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </ButtonFeedback>
                                    </Col>
                                    <Col style={{width:styleVar.deviceWidth / 4}}>
                                        <ButtonFeedback style={[styles.gridBoxTouchable]} >
                                            <View style={styles.gridBoxTouchableView}>
                                                <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                    <ImagePlaceholder 
                                                        width = {styleVar.deviceWidth / 4}
                                                        height = {styleVar.deviceWidth / 2}>
                                                        <Image transparent
                                                            resizeMode='contain'
                                                            source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                            style={{backgroundColor: '#FFF',width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2}} />
                                                    </ImagePlaceholder>
                                                </View>
                                                <View style={{width: styleVar.deviceWidth / 4}}>
                                                    <View style={[shapes.triangle]} />
                                                    <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                            marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                        <Text style={styles.gridBoxTitleText}>JAMES HASKELL</Text>
                                                        <Text style={styles.gridBoxTitleSupportText}>Flanker</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </ButtonFeedback>
                                    </Col>
                                    <Col style={{width:styleVar.deviceWidth / 4}} >
                                        <ButtonFeedback style={[styles.gridBoxTouchable]} >
                                            <View style={styles.gridBoxTouchableView}>
                                                <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                    <ImagePlaceholder 
                                                        width = {styleVar.deviceWidth / 4}
                                                        height = {styleVar.deviceWidth / 2}>
                                                        <Image transparent
                                                            resizeMode='contain'
                                                            source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                            style={{backgroundColor: '#FFF',width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2}} />
                                                    </ImagePlaceholder>
                                                </View>
                                                <View style={{width: styleVar.deviceWidth / 4}}>
                                                    <View style={[shapes.triangle]} />
                                                    <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                            marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                        <Text style={styles.gridBoxTitleText}>JAMES HASKELL</Text>
                                                        <Text style={styles.gridBoxTitleSupportText}>Flanker</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </ButtonFeedback>
                                    </Col>
                                    <Col style={{width:styleVar.deviceWidth / 4}} >
                                        <ButtonFeedback style={[styles.gridBoxTouchable]} >
                                            <View style={styles.gridBoxTouchableView}>
                                                <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                    <ImagePlaceholder 
                                                        width = {styleVar.deviceWidth / 4}
                                                        height = {styleVar.deviceWidth / 2}>
                                                        <Image transparent
                                                            resizeMode='contain'
                                                            source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                            style={{backgroundColor: '#FFF',width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2}} />
                                                    </ImagePlaceholder>
                                                </View>
                                                <View style={{width: styleVar.deviceWidth / 4}}>
                                                    <View style={[shapes.triangle]} />
                                                    <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                            marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                        <Text style={styles.gridBoxTitleText}>JAMES HASKELL</Text>
                                                        <Text style={styles.gridBoxTitleSupportText}>Flanker</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </ButtonFeedback>
                                    </Col>
                                    </Grid>
                                    <Grid>
                                    <Col style={{width:styleVar.deviceWidth / 4}} >
                                        <ButtonFeedback style={[styles.gridBoxTouchable]} >
                                            <View style={styles.gridBoxTouchableView}>
                                                <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                    <ImagePlaceholder 
                                                        width = {styleVar.deviceWidth / 4}
                                                        height = {styleVar.deviceWidth / 2}>
                                                        <Image transparent
                                                            resizeMode='contain'
                                                            source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                            style={{backgroundColor: '#FFF',width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2}} />
                                                    </ImagePlaceholder>
                                                </View>
                                                <View style={{width: styleVar.deviceWidth / 4}}>
                                                    <View style={[shapes.triangle]} />
                                                    <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                            marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                        <Text style={styles.gridBoxTitleText}>JAMES HASKELL</Text>
                                                        <Text style={styles.gridBoxTitleSupportText}>Flanker</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </ButtonFeedback>
                                    </Col>
                                    <Col style={{width:styleVar.deviceWidth / 4}}>
                                        <ButtonFeedback style={[styles.gridBoxTouchable]} >
                                            <View style={styles.gridBoxTouchableView}>
                                                <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                    <ImagePlaceholder 
                                                        width = {styleVar.deviceWidth / 4}
                                                        height = {styleVar.deviceWidth / 2}>
                                                        <Image transparent
                                                            resizeMode='contain'
                                                            source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                            style={{backgroundColor: '#FFF',width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2}} />
                                                    </ImagePlaceholder>
                                                </View>
                                                <View style={{width: styleVar.deviceWidth / 4}}>
                                                    <View style={[shapes.triangle]} />
                                                    <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                            marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                        <Text style={styles.gridBoxTitleText}>JAMES HASKELL</Text>
                                                        <Text style={styles.gridBoxTitleSupportText}>Flanker</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </ButtonFeedback>
                                    </Col>
                                    <Col style={{width:styleVar.deviceWidth / 4}} >
                                        <ButtonFeedback style={[styles.gridBoxTouchable]} >
                                            <View style={styles.gridBoxTouchableView}>
                                                <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                    <ImagePlaceholder 
                                                        width = {styleVar.deviceWidth / 4}
                                                        height = {styleVar.deviceWidth / 2}>
                                                        <Image transparent
                                                            resizeMode='contain'
                                                            source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                            style={{backgroundColor: '#FFF',width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2}} />
                                                    </ImagePlaceholder>
                                                </View>
                                                <View style={{width: styleVar.deviceWidth / 4}}>
                                                    <View style={[shapes.triangle]} />
                                                    <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                            marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                        <Text style={styles.gridBoxTitleText}>JAMES HASKELL</Text>
                                                        <Text style={styles.gridBoxTitleSupportText}>Flanker</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </ButtonFeedback>
                                    </Col>
                                    <Col style={{width:styleVar.deviceWidth / 4}} >
                                        <ButtonFeedback style={[styles.gridBoxTouchable]} >
                                            <View style={styles.gridBoxTouchableView}>
                                                <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                    <ImagePlaceholder 
                                                        width = {styleVar.deviceWidth / 4}
                                                        height = {styleVar.deviceWidth / 2}>
                                                        <Image transparent
                                                            resizeMode='contain'
                                                            source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                            style={{backgroundColor: '#FFF',width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2}} />
                                                    </ImagePlaceholder>
                                                </View>
                                                <View style={{width: styleVar.deviceWidth / 4}}>
                                                    <View style={[shapes.triangle]} />
                                                    <View style={{alignSelf: 'stretch',alignItems: 'center',justifyContent: 'center',
                                                            marginBottom: -12,width: styleVar.deviceWidth / 4,height: styleVar.deviceWidth / 2,}}>
                                                        <Text style={styles.gridBoxTitleText}>JAMES HASKELL</Text>
                                                        <Text style={styles.gridBoxTitleSupportText}>Flanker</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </ButtonFeedback>
                                    </Col>
                                </Grid>
                                </Swiper>
                                </View>
                            <LionsFooter isLoaded={true} />
                        </Content>
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

