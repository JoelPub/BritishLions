'use strict'

import React, { Component } from 'react'
import { Modal,ScrollView } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import LinearGradient from 'react-native-linear-gradient'
import ButtonFeedback from '../utility/buttonFeedback'
import {Icon} from 'native-base'

const styles = styleSheetCreate({
    onboarding: {
        flex:1,
        marginTop:20,
        android: {
            marginTop:0
        }
    },
    btnClose: {
        backgroundColor:'rgb(130,4,23)',
        width:50,
        height:49,
        position:'absolute',
        right:0,
        top:0,
        paddingTop:10,
        android: {
            top:0
        }
    },
    btnCloseIcon: {
        fontSize:24,
        textAlign:'center'
    },
})

export default class  SquadModal extends Component {
	constructor(props){
        super(props)
        this.state = {
            modalVisible: false
    	}  
    }

    _setModalVisible=(visible) => {
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

	render() {
		return (
			<Modal
                visible={this.state.modalVisible}
                transparent={true}
                onRequestClose={()=>this._setModalVisible(false)}>
                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.onboarding}>
                        <ButtonFeedback onPress={()=>this._setModalVisible(false)} 
                        style={styles.btnClose}>
                            <Icon name='md-close' style={styles.btnCloseIcon}/>
                        </ButtonFeedback>
        				    {this.props.children}
                    </LinearGradient>
            </Modal>
			)
	}

}
