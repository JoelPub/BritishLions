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
        // this.state = {
        //     btnDisable:false
        // }
	}    
    // componentWillReceiveProps(nextProps) {
    //     if (__DEV__)console.log('this.props.connectionInfo',this.props.connectionInfo)
        
    //     if (__DEV__)console.log('nextProps.connectionInfo',nextProps.connectionInfo)
    //     if(nextProps.connectionInfo!==this.props.connectionInfo&&(nextProps.connectionInfo===null||strToUpper(nextProps.connectionInfo)==='NONE')) {
    //         if (__DEV__)console.log('!!!!!network lost')
    //         let toast = Toast.show('Please make sure that you\'re connected to the network.', {
    //             duration: Toast.durations.LONG,
    //             position: Toast.positions.CENTER,
    //             shadow: true,
    //             animation: true,
    //             hideOnPress: true,
    //             delay: 0,
    //             onShow: () => {
    //                 // calls on toast\`s appear animation start
    //             },
    //             onShown: () => {
    //                 // calls on toast\`s appear animation end.
    //             },
    //             onHide: () => {
    //                 // calls on toast\`s hide animation start.
    //             },
    //             onHidden: () => {
    //                 // calls on toast\`s hide animation end.
    //             }
    //         })
    //         this.setState({btnDisable:true})
    //     }
    //     else {            
    //         this.setState({btnDisable:false})
    //     }
        
    // }
    _onPress() {
        if (__DEV__)console.log('_onPress this.props.connectionInfo',this.props.connectionInfo)
        if(this.props.connectionInfo===null||strToUpper(this.props.connectionInfo)==='NONE') {
            if (__DEV__)console.log('!!!!!network lost')
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
        }
        else {            
            this.props.onPress()
        }
    }
    render() {
        return (
                <ButtonFeedback {...this.props} onPress={this._onPress.bind(this)}>
                    {this.props.children}
                </ButtonFeedback>
        )
    }
}
export default connect((state) => {
    return {
        connectionInfo: state.network.connectionInfo,
    }
},  null)(ButtonNetwork)