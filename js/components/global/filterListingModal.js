'use strict'

import React, { Component } from 'react'
import { Modal } from 'react-native'

export default class FilterListingModal extends Component {
	constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            transparent: false,
            resultVisible: false
    	}  
    }

    _setModalVisible=(visible) => {
        this.setState({
            modalVisible:visible,
            resultVisible:!visible,
            transparent:visible
        })
        if(!visible) {
        	this.props.callbackParent(visible)
        }
    }

    componentWillReceiveProps(nextProps) {
    	if(nextProps.modalVisible!==this.state.modalVisible) {
    		this.setState({
    			modalVisible: nextProps.modalVisible,
            	transparent: nextProps.transparent,
            	resultVisible: nextProps.resultVisible
    		})
    	}  	
    }

	render() {
		return (
			<Modal
                visible={this.state.modalVisible}
                transparent={this.state.transparent}
                onRequestClose={()=>this._setModalVisible(false)}>
				{this.props.children}
            </Modal>
			)
	}

}
