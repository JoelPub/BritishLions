
'use strict'

import React, { Component ,PropTypes} from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../../../themes/variable'
import Triangle from '../../../../../../components/global/Triangle'


class Scoreboard extends Component {

  constructor(props) {
    super(props)
  }
  measureTab =(page,event)=> {
    const { x, width, height, } = event.nativeEvent.layout
    let widthArray = this.state.underlineLength.slice()
    if(widthArray[page]===undefined) widthArray[page]=0
    widthArray.map((w,i)=>{
      i===page?widthArray[i]=width:widthArray[i]=w
    })
    this.setState({underlineLength:widthArray.slice()})
    this.updateStyle(page)
  }
  render() {
   let {isWithProportion,isDown} = this.props
   let  proportionMargin =  isWithProportion ? {marginLeft :10} : {}
    let line = isDown ? {borderTopWidth:2,borderTopColor:styleVar.colorGrey3} : {}
    return (
      <View style={ [styles.container,line]}>
        <View style={styles.titleView}>
          <View style={{borderBottomColor:'red',borderBottomWidth:2}}>
            <Text style={styles.scoreboardTitle}>LIONS</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentContainerWithBox}>
            <View style={{width:10,height:10,backgroundColor:'red'}}></View>
            <Text style={[styles.scoreboardContentTitle]}>CONVERSIONS</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:10}}>
            {this.props.isWithProportion ?
              <View style={styles.proportionTextView}>
                <Text style={[styles.proportionText]}>2/2</Text>
              </View> : null
            }

            <View style={[styles.ratioTestView,proportionMargin]}>
              <Text style={[styles.ratioTest]}>100%</Text>
            </View>
          </View>
          <View style={styles.contentContainerWithBox}>
            <View style={{width:10,height:10,backgroundColor:'red'}}></View>
            <Text style={[styles.scoreboardContentTitle]}>PENALTIES</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:10}}>
            {this.props.isWithProportion ?
              <View style={styles.proportionTextView}>
                <Text style={[styles.proportionText]}>2/2</Text>
              </View> : null
            }

            <View style={[styles.ratioTestView,proportionMargin]}>
              <Text style={[styles.ratioTest]}>100%</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Scoreboard
Scoreboard.propTypes = {
  isWithProportion: PropTypes.bool,
  isDown: PropTypes.bool,
}
Scoreboard.defaultProps = {
  isWithProportion:false,
  isDown: false
}