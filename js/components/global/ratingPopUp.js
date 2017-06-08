'use strict'

import React, { Component ,PropTypes} from 'react'
import {Image,View, Modal, Text } from 'react-native'
import ButtonFeedback from '../utility/buttonFeedback'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import LinearGradient from 'react-native-linear-gradient'
import {Icon} from 'native-base'
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
    }

    _setModalVisible=(visible) => {
        console.log('visible',visible)
        this.setState({
            modalVisible:visible
        })
        if(!visible) {
            this.props.callbackParent(visible)
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.modalVisible!==this.state.modalVisible) {
            this.setState({
                modalVisible: nextProps.modalVisible
            })
        }   
    }

    buttonClick(name){
        switch(name){
            case 'rate':
            return

            case 'dismiss':
            return

            case 'later':
            return

            default:
            return

        }
    }
    render() {
        return (
            <Modal
                animationType={"slide"}
                visible={this.state.modalVisible}
                transparent={true}
                onRequestClose={()=>this._setModalVisible(false)}>
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
                        <ButtonFeedback onPress={()=>this._setModalVisible(false)}  style={styles.btnClose}>
                            <Icon name='md-close' style={styles.btnCloseIcon}/>
                        </ButtonFeedback>
                        
                    </View>
            </Modal>
            )
    }
}