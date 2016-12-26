'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

const styles = styleSheetCreate({
  sponsoredEYContainer:{
      width: null,
      backgroundColor: 'rgba(0,0,0,0.85)',
      flexDirection: 'row',
      height: 50,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      opacity: 0.95,
      paddingBottom: 8
  },
  sponsoredEYLogo:{
      height: 30,
      width: 29,
      marginRight: 15,
      marginBottom: 3
  },
  sponsoredEYText: {
      textAlign: 'right',
      paddingRight: 7,
      flex: 1,
      fontFamily: styleVar.fontGeorgia,
      fontSize: 13,
      width: 100,
      opacity: 0.75,
      color: '#FFF',

  }
})

export default class EYFooter extends Component {
	  render() {
        return (

              <View style={styles.sponsoredEYContainer}>
                {this.props.mySquadBtn&&
                <View style={{flexDirection:'row'}}>
                    <Image
                        resizeMode='contain'
                        transparent
                        source={require('../../../images/header/logo.png')}
                        style={{width: 27, height: 34, marginLeft: 10,  backgroundColor: 'transparent', }} />
                        <Text style={{fontFamily: styleVar.fontCondensed,color:'rgb(255,255,255)',fontSize:24,marginTop:5,paddingLeft:5}}>MY SQUAD</Text>
                </View>
                }
                <Text style={styles.sponsoredEYText}>Sponsored by</Text>
                <Image source={require('../../../images/footer/eyLogo.png')} style={styles.sponsoredEYLogo}></Image>
              </View>


        )
    }
}
