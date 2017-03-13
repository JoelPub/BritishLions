
'use strict'

import React, { Component ,PropTypes} from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, Platform, Alert } from 'react-native'
import { Container, Icon } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import { Grid, Col, Row } from 'react-native-easy-grid'
import styles from '../styles'
import styleVar from '../../../themes/variable'
import { strToUpper } from '../../utility/helper'
import ButtonFeedback from '../../utility/buttonFeedback'

import { service } from '../../utility/services'
import Data from '../../../../contents/unions/data'

const locStyle = styleSheetCreate({
  btnBg: {
    height: 80,
    borderRadius:40,
    paddingLeft:10,
  },
  btn: {
    paddingTop:20,
    flexDirection:'row',
  },
  btnText: {
    fontFamily: styleVar.fontCondensed,
    fontSize: 36,
    lineHeight: 36,
    color: '#FFF',
  },
  icon: {
    fontSize:36,
    textAlign:'center',
    backgroundColor:"transparent"
  },
  iconText: {
    fontFamily: styleVar.fontCondensed,
    fontSize: 36,
    lineHeight: 36,
    color: '#FFF',
    textAlign:'center',
  },
  btnCircle:{
    height:60,
    width:60,
    borderRadius:30,
    backgroundColor:'rgb(208,7,41)',
    paddingTop:15,
    marginTop:-10,
  },
  titleText: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:-60
  }
})

class TacticsWidget extends Component {
  constructor(props){
    super(props)
    this.uniondata = Data
    this.state = {
    }
  }

  render() {
    return (
      <View>
        {
          this.props.fullTactic?
            <View style={[locStyle.btnBg,{backgroundColor:'#FFF'}]}>
              <ButtonFeedback style={locStyle.btn} onPress={this.props.onPress}>
                <View style={[locStyle.btnCircle,{backgroundColor:'rgb(10, 127, 64)'}]}>
                  <Icon name='md-checkmark' style={locStyle.icon} />
                </View>
                <View style={locStyle.titleText}>
                  <Text style={[locStyle.btnText,{color:'rgb(10, 127, 64)'}]}>
                    {this.props.title}
                  </Text>
                </View>
              </ButtonFeedback>
            </View>
            :
            <LinearGradient style={locStyle.btnBg} colors={['#af001e', '#820417']}>
              <ButtonFeedback style={locStyle.btn} onPress={this.props.onPress}>
                <View style={locStyle.btnCircle}>
                  <Text style={locStyle.iconText}>{this.props.iconText}</Text>
                </View>
                <View style={locStyle.titleText}>
                  <Text style={locStyle.btnText}>
                    {this.props.title}
                  </Text>
                </View>
              </ButtonFeedback>
            </LinearGradient>
        }
      </View>

    )
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
  }

}


export default TacticsWidget
TacticsWidget.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  fullTactic: PropTypes.bool
}
TacticsWidget.defaultProps = {
  onPress: ()=>{},
  fullTactic: false
}