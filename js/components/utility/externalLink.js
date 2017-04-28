'use strict'

import React, { Component,PropTypes } from 'react'
import { Linking, Alert ,NativeModules} from 'react-native'
import ButtonFeedback from './buttonFeedback'
var One = NativeModules.One;
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
        if(url==='https://tours.lionsrugby.com'){
            NativeModules.One.sendInteraction("/toursOpen",
              { emailAddress : "" });
        }
        if(url==='http://www.lionsrugby.com/fanzone/competitions.php#.V9ozFJh96rM'){
            NativeModules.One.sendInteraction("/competitionOpen",
              { emailAddress : "" });
        }
       if (this.isCorrectUrl(url)){
           One.sendInteractionForOutboundLink(url).catch(function(error) {
               if (__DEV__)console.log(error);
               alert(error);
           });

           One.getURLWithOneTid(url).then(function(urlWithOneTid) {
               if(urlWithOneTid){
                   Linking.canOpenURL(urlWithOneTid).then(supported => {
                       if (supported) {
                           Linking.openURL(urlWithOneTid)
                       } else {
                           Alert.alert(
                             'Error',
                             'This device doesnt support URI: ' + urlWithOneTid
                           )
                       }
                   })
               }
           },function(error) {
               if (__DEV__)console.log('error');
               if (__DEV__)console.log(error);
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
           });
       }else {
           if (__DEV__)console.log('it not a url ');
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
