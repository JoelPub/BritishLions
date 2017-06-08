'use strict'

import React, { Component ,PropTypes} from 'react'
import {View, Modal, Text } from 'react-native'
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
                        <LinearGradient colors={['#AF001E', '#81071C']} >
                                <ButtonFeedback onPress={()=>this.buttonClick('rate')}>
                                    <Text style={styles.btnText}> OKAY, SURE</Text>
                                </ButtonFeedback>
                                <ButtonFeedback onPress={()=>this.buttonClick('dismiss')}>
                                    <Text style={styles.btnText}> NO, THANK YOU</Text>
                                </ButtonFeedback>
                                <ButtonFeedback onPress={()=>this.buttonClick('later')}>
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