'use strict'

import React, { Component } from 'react'
import { Linking, Image, View, Text ,NativeModules} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from '../utility/buttonFeedback'
var One = NativeModules.One;

const styles = styleSheetCreate({
    container: {
        height: 230,
        width: null,
    },
    primary:{
        height: 170,
        width: null
    },
    backgroundHidden:{
        opacity:0
    },
    logosRow: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    logosRight: {
        paddingRight:20
    },
    logoFooter: {
        width: 120,
        height: 40,
        marginLeft: 10,
        marginTop: 20
    },
    logowhiteFooter: {
        width: 20,
        height: 28,
        marginTop: 25,
        android: {
            marginTop: 30
        }
    },
    textFooter: {
        fontFamily: styleVar.fontGeorgia,
        fontSize: 13,
        opacity: 0.75,
        marginTop: 33,
        marginRight: 7,
        android: {
          marginTop: 40
        }
    },
    socialFooterRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20
    },
    socialFooterIcon: {
        fontSize: 24,
        color: '#FFF',
        backgroundColor: 'transparent'
    },
    socialFooterImgIcon: {
        marginTop: 2,
        height: 19,
        width: 19,
    },
    textCorpRow: {
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: 'transparent'
    },
    textCorp: {
        alignSelf: 'center',
        fontFamily: styleVar.fontGeorgia,
        color: '#FFF',
        fontSize: 13,
        opacity: 0.75,
        paddingBottom: 33,
        android: {
            paddingBottom: 37
        }
    },
    secondary: {
        height: 70,
        width: null
    }
})

export default class Footer extends Component {
	constructor(props) {
      super(props)
	}

	goToURL(url, platformName) {
      NativeModules.One.sendInteraction("/social/"+platformName,null)
      console.log("!!!!!!!!!!!/social/"+platformName)
      One.sendInteractionForOutboundLink(url).catch(function(error) {
          console.log(error);
          alert(error);
      });

      One.getURLWithOneTid(url).then(function(urlWithOneTid) {
          console.log('urlWithOneTid',urlWithOneTid)
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
          console.log('error');
          console.log(error);
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

  }

  render(){
        return (
            this.props.isLoaded === true ?
                <View style={styles.container}>
                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.header}>

                        <View style={styles.logosRow}>
                            <View style={styles.logosLeft}>
                                <Image
                                    transparent
                                    source={require('../../../images/lions-logofull.png')}
                                    style={styles.logoFooter}
                                    resizeMode={Image.resizeMode.contain} />
                            </View>

                            <View style={styles.logosRight}>
                                <Image
                                    transparent
                                    source={require('../../../images/footer/nzlogo.png')}
                                    style={styles.logowhiteFooter}
                                    resizeMode={Image.resizeMode.contain} />
                            </View>
                        </View>

                        <View style={styles.socialFooterRow}>
                            <ButtonFeedback onPress={() => this.goToURL('https://www.facebook.com/BritishandIrishLions', 'facebook')} style={styles.socialFooter }>
                                <Icon name="logo-facebook" swipeException style={styles.socialFooterIcon} />
                            </ButtonFeedback>
                            <ButtonFeedback onPress={() => this.goToURL('https://twitter.com/lionsofficial','twitter')} style={styles.socialFooter }>
                                <Icon name="logo-twitter" swipeException style={styles.socialFooterIcon} />
                            </ButtonFeedback>
                            <ButtonFeedback onPress={() => this.goToURL('https://www.youtube.com/channel/UC5Pw6iUW8Dgmb_JSEqzXH3w?&ab_channel=TheBritish&IrishLions','youtube')} style={styles.socialFooter }>
                                <Icon name="logo-youtube" swipeException style={styles.socialFooterIcon} />
                            </ButtonFeedback>
                            <ButtonFeedback onPress={() => this.goToURL('https://www.linkedin.com/company/the-british-and-irish-lions','linkedin')} style={styles.socialFooter }>
                                <Icon name="logo-linkedin" swipeException style={styles.socialFooterIcon} />
                            </ButtonFeedback>
                            <ButtonFeedback onPress={() => this.goToURL('https://www.instagram.com/britishandirishlions/','instagram')} style={styles.socialFooter }>
                                <Icon name="logo-instagram" swipeException style={styles.socialFooterIcon} />
                            </ButtonFeedback>
                            <ButtonFeedback onPress={() => this.goToURL('https://www.periscope.tv/LionsOfficial/','periscope')} style={styles.socialFooter}>
                                <Image style={styles.socialFooterImgIcon} swipeException resizeMode='contain' source={require('../../../images/periscopeIcon.png')} />
                            </ButtonFeedback>
                        </View>

                        <View style={styles.textCorpRow}>
                            <Text style={styles.textCorp}>© 2017 British Irish Lions Limited.</Text>
                        </View>

                    </LinearGradient>
                    <Image source={require('../../../images/footer/allforone.png')} style={styles.secondary}></Image>
                </View>
            : null
        )
    }
}
