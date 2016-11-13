'use strict'

import React, { Component } from 'react'
import { Linking, Alert } from 'react-native'
import ButtonFeedback from './buttonFeedback'

export default class ExternalLink extends Component {
	constructor(props){
		super(props)
	}

    goToURL(url) {
        if(url){
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url)
                } else {
                    Alert.alert(
                        'Error',
                        'This device doesnt support URI: ' + url,
                    )
                }
            })
        }
    }

    render() {

        let styles = this.props.style || {}

        return (
            <ButtonFeedback style={styles} onPress={() => this.goToURL(this.props.url)}>
                {this.props.children}
            </ButtonFeedback>
        )
    }
}


export function goToURL(url) {
    if(url){
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url)
            } else {
                Alert.alert(
                    'Error',
                    'This device doesnt support URI: ' + url,
                )
            }
        })
    }
}
