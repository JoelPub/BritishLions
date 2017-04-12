'use strict'

import React, { Component } from 'react'
import { View} from 'react-native'
import ButtonFeedback from './buttonFeedback'
import Toast from 'react-native-root-toast'
import { connect } from 'react-redux'
import { strToUpper } from '../utility/helper'


class ButtonNetwork extends Component {
	constructor(props){
		super(props)
        this.state = {
            toastVisible: false,
            btnDisable:false
        }
	}    
    componentWillReceiveProps(nextProps) {
        console.log('this.props.connectionInfo',this.props.connectionInfo)
        
        console.log('nextProps.connectionInfo',nextProps.connectionInfo)
        if(nextProps.connectionInfo!==this.props.connectionInfo&&(nextProps.connectionInfo===null||strToUpper(nextProps.connectionInfo)==='NONE')) {
                console.log('!!!!!network lost')
                console.log('this.submitting',this.submitting)
            if(!this.state.toastVisible) {
                console.log('!!!!!show network error')
               this.setState({toastVisible:true})
            }
            this.setState({btnDisable:true})
        }
        else {            
            this.setState({btnDisable:false})
        }
        
    }

    render() {
        return (
            <View>
                <ButtonFeedback {...this.props} disabled = {this.state.btnDisable} >
                    {this.props.children}
                </ButtonFeedback>
                <Toast
                    visible={this.state.toastVisible}
                    position={Toast.positions.CENTER}
                    shadow={true}
                    animation={true}
                    hideOnPress={true}
                >Please make sure that you're connected to the network.</Toast>
            </View>
        )
    }
}
export default connect((state) => {
    return {
        connectionInfo: state.network.connectionInfo,
    }
},  null)(ButtonNetwork)