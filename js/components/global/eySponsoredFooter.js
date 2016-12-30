'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import { pushNewRoute } from '../../actions/route'

const styles = styleSheetCreate({
  sponsoredEYContainer:{
      width: null,
      backgroundColor: 'rgba(0,0,0,0.85)',
      flexDirection: 'row',
      height: 50,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      opacity: 0.95,
  },
  sponsoredEYLogo:{
      height: 30,
      width: 29,
      marginRight: 15,
      marginBottom: 11
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
      paddingBottom: 8
  },
  mySquadBtn:{
       flexDirection:'row',
       borderRightWidth:1,
       height:50,
       paddingTop:8,
       paddingRight:15,
       paddingBottom: 8,
       borderRightColor:'rgba(255,255,255,0.15)'
  }
})

export class EYFooter extends Component {
      _mySquad(){
             this.props.pushNewRoute('mySquad')
      }

	  render() {
        return (

              <View style={styles.sponsoredEYContainer}>
                {this.props.mySquadBtn&&
                <TouchableOpacity style={styles.mySquadBtn} onPress={() => this._mySquad()}>
                    <Image
                        resizeMode='contain'
                        transparent
                        source={require('../../../images/header/logo.png')}
                        style={{width: 27, height: 34, marginLeft: 10,  backgroundColor: 'transparent', }} />
                        <Text style={{fontFamily: styleVar.fontCondensed,color:'rgb(255,255,255)',fontSize:24,marginTop:8,paddingLeft:5}}>MY SQUAD</Text>
                </TouchableOpacity>
                }
                <Text style={styles.sponsoredEYText}>Sponsored by</Text>
                <Image source={require('../../../images/footer/eyLogo.png')} style={styles.sponsoredEYLogo}></Image>
              </View>


        )
    }
}
function bindAction(dispatch) {
    return {
        pushNewRoute: (route)=>dispatch(pushNewRoute(route))
    }
}

export default connect((state) => {
    return {
    }
},  bindAction)(EYFooter)

