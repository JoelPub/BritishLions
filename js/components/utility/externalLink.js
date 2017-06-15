'use strict'

import React, { Component,PropTypes } from 'react'
import { Linking, Alert } from 'react-native'
import ButtonFeedback from './buttonFeedback'
export default class ExternalLink extends Component {
	constructor(props){
		super(props)
	}
    isCorrectUrl = (url) => {
        let str=url;

        let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        let objExp=new RegExp(Expression);
        if(objExp.test(str)==true){
            return true;
        }else{
            return false;
        }
    }
    goToURL(url) {
        if(this.props.callBack){
            this.props.callBack()
        }
       if (this.isCorrectUrl(url)){
          if (__DEV__)console.log('isCorrectUrl')

               if(url){
                   Linking.canOpenURL(url).then(supported => {
                       if (supported) {
                           Linking.openURL(url)
                       } else {
                           Alert.alert(
                             'Error',
                             'This device doesnt support URI: ' + url
                           )
                       }
                   })
               }
       }else {
          if (__DEV__)console.log('it not a url ')
          if(url){
                 Linking.canOpenURL(url).then(supported => {
                     if (supported) {
                         Linking.openURL(url)
                     } else {
                         Alert.alert(
                           'Error',
                           'This device doesnt support URI: ' + url
                         )
                     }
                 })
             }
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
ExternalLink.propTypes = {
    type: PropTypes.string,
    callBack: PropTypes.func
}
ExternalLink.defaultProps = {
    type:'',
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
