'use strict'

import React, { Component } from 'react'
import { View} from 'react-native'
import ButtonFeedback from './buttonFeedback'
import Toast from 'react-native-root-toast'
import { connect } from 'react-redux'
import { strToUpper } from '../utility/helper'
import styleVar from '../../themes/variable'


class ButtonNetwork extends Component {
	constructor(props){
		super(props)
        this.state = {
            btnDisable:false
        }
	}    
    componentWillReceiveProps(nextProps) {
        console.log('this.props.connectionInfo',this.props.connectionInfo)
        
        console.log('nextProps.connectionInfo',nextProps.connectionInfo)
        if(nextProps.connectionInfo!==this.props.connectionInfo&&(nextProps.connectionInfo===null||strToUpper(nextProps.connectionInfo)==='NONE')) {
            console.log('!!!!!network lost')
            let toast = Toast.show('Please make sure that you\'re connected to the network.', {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                onShow: () => {
                    // calls on toast\`s appear animation start
                },
                onShown: () => {
                    // calls on toast\`s appear animation end.
                },
                onHide: () => {
                    // calls on toast\`s hide animation start.
                },
                onHidden: () => {
                    // calls on toast\`s hide animation end.
                }
            })
            this.setState({btnDisable:true})
        }
        else {            
            this.setState({btnDisable:false})
        }
        
    }

    render() {
        return (
            <View>
                <ButtonFeedback {...this.props} disabled = {this.state.btnDisable} style={this.state.btnDisable&&{backgroundColor: styleVar.brandSecondary}}>
                    {this.props.children}
                </ButtonFeedback>
            </View>
        )
    }
}
export default connect((state) => {
    return {
        connectionInfo: state.network.connectionInfo,
    }
},  null)(ButtonNetwork)