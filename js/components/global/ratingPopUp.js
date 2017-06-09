'use strict'

import React, { Component ,PropTypes} from 'react'
import {Image,View, Modal, Text,Linking } from 'react-native'
import ButtonFeedback from '../utility/buttonFeedback'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import LinearGradient from 'react-native-linear-gradient'
import {Icon} from 'native-base'
import { setVote, getVote } from '../utility/asyncStorageServices'
const styles = styleSheetCreate({
    onboarding: {
        flex:1,
        marginTop:20,
        android: {
            marginTop:0
        },
        backgroundColor:'rgba(0,0,0,0.5)',
        paddingTop:styleVar.deviceHeight*0.1,
        paddingHorizontal:styleVar.deviceWidth*0.1
    },
    btnClose: {
        backgroundColor:'rgb(130,4,23)',
        width:50,
        height:49,
        position:'absolute',
        right:styleVar.deviceWidth*0.1,
        top:styleVar.deviceHeight*0.1,
        paddingTop:10,
    },
    btnCloseIcon: {
        fontSize:24,
        textAlign:'center'
    },
    logoImg:{
        height: styleVar.deviceWidth*0.4, 
        width: styleVar.deviceWidth*0.4,
        marginBottom:10
    },
    subjectText:{
        fontFamily: 'Helvetica Neue',
        color:'rgb(255,255,255)',
        fontSize:18,
        lineHeight:24,
        marginBottom:10
    },
    descText: {
        fontFamily: styleVar.fontGeorgia,
        color:'rgb(255,255,255)',
        fontSize:14,
        lineHeight:16
    },
    btn:{
        borderColor:'rgb(255,255,255)',
        borderWidth:2,
        borderRadius:styleVar.deviceWidth*0.1,
        width:styleVar.deviceWidth*0.6,
        padding:10,
        marginVertical:10
    },
    btnText:{
        fontFamily: 'Helvetica Neue',
        color:'rgb(255,255,255)',
        fontSize:14,
        lineHeight:16,
        textAlign:'center'
    }
})

export default class RatingPopUp extends Component{
    constructor(props) {
        super(props)
        this.state = {
              modalVisible: false,
        }
        this.savedVote=null
    }

    componentWillMount() {
        getVote().then((data)=>{
            this.savedVote=JSON.parse(data)
            if(__DEV__)console.log('savedvote',this.savedVote)
            if(this.savedVote===null) {
                this.setState({
                    modalVisible:true
                })
            }
            else {
                if(this.savedVote.type==='later') {
                    let gap=new Date()-new Date(this.savedVote.time)
                    if(__DEV__)console.log('time gap',gap/3600000)
                    if(gap/3600000>(1/60)) this.setState({modalVisible:true})
                }
            }
        })
    }
    goToURL(url) {
        Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url)
                } else {
                    if (__DEV__)console.log('This device doesnt support URI: ' + url)
                }
            })
    }

    buttonClick(name){
        this.savedVote={type:name,time:new Date()}
        setVote(this.savedVote).then(()=>{
            this.setState({modalVisible:false},()=>{                    
                switch(name){
                    case 'rate':
                        if(Platform.OS==='android') {
                            this.goToURL('https://play.google.com/store/apps/details?id=com.lionsofficial')
                        }
                        else if(PlatformOS==='ios') {
                            this.goToURL('https://itunes.apple.com/ie/app/british-irish-lions-official/id1166469622?mt=8')
                        }
                    return

                    case 'dismiss':
                    return

                    case 'later':
                    return

                    default:
                    return

                }
                this.props.callbackParent(false)
            })
        })
        
    }
    render() {
        return (
            <Modal
                animationType={"slide"}
                visible={this.state.modalVisible}
                transparent={true}
                onRequestClose={()=>this.buttonClick('later')}>
                    <View style={styles.onboarding}>
                        <LinearGradient colors={['#AF001E', '#81071C']} style={{alignItems:'center',padding:styleVar.deviceWidth*0.1}}>
                                <Image
                                  source={require('../../../images/logo.png')}
                                  resizeMode='contain'
                                  style={styles.logoImg} />
                                <Text style={styles.subjectText}> RATE THE APP </Text>
                                <Text style={styles.descText}> If you're enjoying the Official Lions app, would you mind taking a moment to rate us?</Text>
                                <ButtonFeedback onPress={()=>this.buttonClick('rate')} style={styles.btn}>
                                    <Text style={styles.btnText}> OKAY, SURE</Text>
                                </ButtonFeedback>
                                <ButtonFeedback onPress={()=>this.buttonClick('dismiss')} style={styles.btn}>
                                    <Text style={styles.btnText}> NO, THANK YOU</Text>
                                </ButtonFeedback>
                                <ButtonFeedback onPress={()=>this.buttonClick('later')} style={styles.btn}>
                                    <Text style={styles.btnText}> MAYBE LATER</Text>
                                </ButtonFeedback>
                        </LinearGradient>
                        <ButtonFeedback onPress={()=>this.buttonClick('later')}  style={styles.btnClose}>
                            <Icon name='md-close' style={styles.btnCloseIcon}/>
                        </ButtonFeedback>
                        
                    </View>
            </Modal>
            )
    }
}