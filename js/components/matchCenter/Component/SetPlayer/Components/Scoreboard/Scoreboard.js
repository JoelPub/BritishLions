
'use strict'

import React, { Component ,PropTypes} from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../../../themes/variable'
import Triangle from '../../../../../../components/global/Triangle'
import lionsCopyImage from  './images/lionsCopy2.png'
import barbarinasCopyImage from  './images/barbariansCopy.png'

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
   let {isWithProportion,isDown ,titles,oppositionScore,bilScore} = this.props
   let  proportionMargin =  isWithProportion ? {marginLeft :10} : {}
    let iconImage = !isDown ?  lionsCopyImage: barbarinasCopyImage
    let colorConversions = !isDown ? styleVar.brandPrimary : 'black'
    let colorPenalties = !isDown ? 'rgb(255,204,40)' : 'rgb(31,188,210)'
    let deviveFiveStyle = styleVar.deviceWidth ===320 ? {fontSize: 14,lineHeight: 14} : {}

    return (
      <View style={ [styles.container]}>
        <View style={styles.titleView}>
          <Image   source={iconImage}/>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentContainerWithBox}>
            <View style={{width:14,height:14,backgroundColor:colorConversions}}></View>
            <Text style={[styles.scoreboardContentTitle,deviveFiveStyle]}>{titles[0]}</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:4}}>
            {this.props.isWithProportion ?
              <View style={styles.proportionTextView}>
                <Text style={[styles.proportionText]}>{oppositionScore.value}</Text>
              </View> : null
            }
            <View style={[styles.ratioTestView,proportionMargin]}>
              <Text style={[styles.ratioTest]}>{oppositionScore.percentage}</Text>
            </View>
          </View>
          <View style={styles.contentContainerWithBox}>
            <Triangle
              width={14}
              height={14}
              color={colorPenalties}
            />
            <Text style={[styles.scoreboardContentTitle,deviveFiveStyle]}>{titles[1]}</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:4}}>
            {this.props.isWithProportion ?
              <View style={styles.proportionTextView}>
                <Text style={[styles.proportionText]}>{bilScore.value}</Text>
              </View> : null
            }
            <View style={[styles.ratioTestView,proportionMargin]}>
              <Text style={[styles.ratioTest]}>{bilScore.percentage}</Text>
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
  titles: PropTypes.array,
  oppositionScore: PropTypes.object,
  bilScore: PropTypes.object,
}
Scoreboard.defaultProps = {
  titles: ['CONVERSIONS','PENALTIES'],
  isWithProportion:false,
  isDown: false,
  oppositionScore:{
    value:'',
    percentage:''
  },
  bilScore: {
    value:'',
    percentage:''
  }
}