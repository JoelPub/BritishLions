
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { drillDown } from '../../actions/content'
import { Container, Content, Text, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import { replaceRoute } from '../../actions/route'
import styleVar from '../../themes/variable'
import { Modal } from 'react-native'
import Swiper from 'react-native-swiper'

class MyLions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: true,
            transparent: true,
            resultVisible: false
        }  
    }

    _showList(item, route) {
        this.props.drillDown(item, route)
    }

    _myLions(){
        this._showList({}, 'myLionsFavoriteList')
    }

    prev(){
        this.refs['swiper'].scrollBy(-1,true)
    }
    next(){
        this.refs['swiper'].scrollBy(1,true)
    }
    _setModalVisible=(visible) => {
        this.setState({
            modalVisible:visible,
            resultVisible:!visible,
            transparent:visible
        })
    }
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                        <LionsHeader title='MY LIONS' />
                        <Content style={{backgroundColor:'#af001e'}}>
                            <ImagePlaceholder height={270}>
                                <Image resizeMode='cover'
                                source={require('../../../images/content/competitionsBanner.png')} style={{height: 270, justifyContent: 'flex-end'}}>
                                    <Image 
                                        transparent
                                        resizeMode='cover'
                                        source={require('../../../images/shadows/rectangle.png')}
                                        style={{width: styleVar.deviceWidth, flexDirection: 'column', justifyContent: 'flex-end', paddingLeft: 20, paddingBottom: 15, paddingRight: 20, backgroundColor: 'transparent' }}>

                                    </Image>
                                </Image>
                            </ImagePlaceholder>
                            <ButtonFeedback rounded label='MY SQUAD' style={styles.button} />
                            <ButtonFeedback rounded label='THE EXPERT PICKS' style={styles.button}  />
                            <ButtonFeedback rounded label='MY FAVOURITES' style={styles.button} onPress={() => this._myLions()} />
                             
                            <LionsFooter isLoaded={true} />
                        </Content>
                    < EYSFooter />
                    <Modal
                        visible={this.state.modalVisible}
                        transparent={this.state.transparent}
                        onRequestClose={()=>this._setModalVisible(false)}>
                        <View style={{flex:1, backgroundColor:'rgba(38,38,38,0.9)', paddingTop:20 }}>
                            <View >
                                <View style={{padding:10,backgroundColor:'white',borderRadius:5,height:50}}>
                                    <Text style={{color:'red'}}> WELCOME TO MY LIONS</Text>
                                    <ButtonFeedback onPress={()=>this._setModalVisible(false)} 
                                    style={{backgroundColor:'grey',width:16,height:16,borderRadius:8,paddingLeft:3,position:'absolute',right:10,top:15}}>
                                        <Icon name='md-close' style={{fontSize:18}}/>
                                    </ButtonFeedback>
                                </View>
                                <View style={{backgroundColor:'grey'}}>

                                        <Swiper
                                            ref='swiper'
                                            height={370}
                                            loop={false}>
                                            <View style={{paddingLeft:50,paddingTop:50}}>
                                                <Text style={{color:'black',fontSize:12}}>Our Digital Analytics partner, EY,</Text>
                                                <Text style={{color:'black',fontSize:12}}>has been busy reviewing all eligible Lions</Text>
                                                <Text style={{color:'black',fontSize:12}}>performance data from over 10,000</Text>
                                                <Text style={{color:'black',fontSize:12}}>games</Text>
                                                <Text style={{color:'black',fontSize:12}}>   </Text>
                                                <Text style={{color:'black',fontSize:12}}>EY has unlocked their analytics engine to</Text>
                                                <Text style={{color:'black',fontSize:12}}>enable you to select your ideal squad that</Text>
                                                <Text style={{color:'black',fontSize:12}}>will tour to NZ in 2017</Text>
                                            </View>
                                            <View style={{paddingLeft:50,paddingTop:50}}>
                                                <Text style={{color:'black',fontSize:12}}>Our Digital Analytics partner, EY,</Text>
                                                <Text style={{color:'black',fontSize:12}}>has been busy reviewing all eligible Lions</Text>
                                                <Text style={{color:'black',fontSize:12}}>performance data from over 10,000</Text>
                                                <Text style={{color:'black',fontSize:12}}>games</Text>
                                                <Text style={{color:'black',fontSize:12}}>   </Text>
                                                <Text style={{color:'black',fontSize:12}}>EY has unlocked their analytics engine to</Text>
                                                <Text style={{color:'black',fontSize:12}}>enable you to select your ideal squad that</Text>
                                                <Text style={{color:'black',fontSize:12}}>will tour to NZ in 2017</Text>
                                            </View>
                                            <View style={{paddingLeft:50,paddingTop:50}}>
                                                <Text style={{color:'black',fontSize:12}}>Our Digital Analytics partner, EY,</Text>
                                                <Text style={{color:'black',fontSize:12}}>has been busy reviewing all eligible Lions</Text>
                                                <Text style={{color:'black',fontSize:12}}>performance data from over 10,000</Text>
                                                <Text style={{color:'black',fontSize:12}}>games</Text>
                                                <Text style={{color:'black',fontSize:12}}>   </Text>
                                                <Text style={{color:'black',fontSize:12}}>EY has unlocked their analytics engine to</Text>
                                                <Text style={{color:'black',fontSize:12}}>enable you to select your ideal squad that</Text>
                                                <Text style={{color:'black',fontSize:12}}>will tour to NZ in 2017</Text>
                                            </View>
                                            <View style={{paddingLeft:50,paddingTop:50}}>
                                                <Text style={{color:'black',fontSize:12}}>Our Digital Analytics partner, EY,</Text>
                                                <Text style={{color:'black',fontSize:12}}>has been busy reviewing all eligible Lions</Text>
                                                <Text style={{color:'black',fontSize:12}}>performance data from over 10,000</Text>
                                                <Text style={{color:'black',fontSize:12}}>games</Text>
                                                <Text style={{color:'black',fontSize:12}}>   </Text>
                                                <Text style={{color:'black',fontSize:12}}>EY has unlocked their analytics engine to</Text>
                                                <Text style={{color:'black',fontSize:12}}>enable you to select your ideal squad that</Text>
                                                <Text style={{color:'black',fontSize:12}}>will tour to NZ in 2017</Text>
                                            </View>
                                        </Swiper>
                                        <ButtonFeedback rounded onPress={()=>this.prev()} label='prev' style={{height: 30, width:60, backgroundColor: styleVar.brandLightColor,position:'absolute',left:20,bottom:20 }} />
                                        <ButtonFeedback rounded onPress={()=>this.next()} label='next' style={{height: 30, width:60, backgroundColor: styleVar.brandLightColor,position:'absolute',right:20,bottom:20 }} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect((state) => {
    return {
        isAccessGranted: state.token.isAccessGranted
    }
},  bindAction)(MyLions)
