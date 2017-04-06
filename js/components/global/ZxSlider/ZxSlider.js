'use strict'

import React, { Component, Children, PropTypes } from 'react'
import {Image, View, Text, ActivityIndicator, ScrollView, PanResponder} from 'react-native'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import ButtonFeedback from '../../utility/buttonFeedback'
import styleVar from '../../../themes/variable'

import ruby from './toggle.png'
const styles = styleSheetCreate({
  container:{
    marginTop:40,
  },
  trackStyle:{
    backgroundColor: 'rgb(255,255,255)',
    height:60,
    borderRadius:30,
    borderWidth:1,
    borderColor:'rgb(216,217,218)',
    paddingHorizontal:30,

  },
  lineStyle: {
    backgroundColor:'rgb(216,217,218)',
    height:1,
    marginTop:30
  },
  markerStyle:{
    position: 'absolute',
    left: 0,
    top: 0,
    width: 60,
    height: 60,
    borderRadius:30,
  },
  icon:{
    borderRadius:30,
    width: 60,
    height: 60,
  }
})


class ZxSlider extends Component {
  constructor(props){
    super(props)
    let left = this.props.value ? (styleVar.deviceWidth-112)*this.props.value : 0
    this.state = {
      left: left
    }
  }

  componentWillMount(){
    var left ;
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: ()=> true,
      onPanResponderGrant: ()=>{
        //滑动开始时，获取矩形的左边坐标
        left = this.state.left
      },
      onPanResponderMove: (evt,gs)=>{
        console.log(gs.dx+' '+gs.dy)
        //随着手势滑动，相应的改变矩形的位置

        this.setState({
          left: this.countSize(left+gs.dx)
        })
      },
      onPanResponderTerminationRequest: (evt, gs) => true,
      onPanResponderTerminate: (evt, gs) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
        console.log('这里被调用')
        let endLeft = this.countSize(left+gs.dx)
        if(this.props.valuesCount){
          this.setState({
            left: this.countComplexSize(endLeft)
          })
          let widthItem = ( styleVar.deviceWidth-112) /this.props.valuesCount
          let index = Math.round(this.state.left /widthItem)
          this.props.onValuesChange(index)
        }else {
          this.setState({
            left: endLeft
          })
          this.props.onValuesChange((this.state.left/(styleVar.deviceWidth-112)).toFixed(2))
        }

      },
      onPanResponderRelease: (evt,gs)=>{
        //活动结束后
        let endLeft = this.countSize(left+gs.dx)
        if(this.props.valuesCount){
          this.setState({
            left: this.countComplexSize(endLeft)
          })
          let widthItem = ( styleVar.deviceWidth-112) /this.props.valuesCount
          let index = Math.round(this.state.left /widthItem)
          this.props.onValuesChange(index)
        }else {
          this.setState({
            left: endLeft
          })
          this.props.onValuesChange((this.state.left/(styleVar.deviceWidth-112)).toFixed(2))
        }
      }
    })
  }
  countSize = (left) => {
    let cleft
    left = left>styleVar.deviceWidth-112 ? styleVar.deviceWidth-112 : left
    cleft = left < 0 ? 0 : left
    return cleft
  }
  countComplexSize = (left) =>{
    console.log('崩溃中')
    let widthItem = ( styleVar.deviceWidth-112) /this.props.valuesCount
    let index = Math.round(left /widthItem)
    console.log(index)
    let result = index* widthItem
    console.log(result)
    return  result
  }

  render() {

    let {left} = this.state

    var touchStyle = {
      left: left
    };
    return (
      <View style={[styles.container]} >
         <View style={[styles.trackStyle,this.props.trackStyle]} >
           <View style={[styles.lineStyle]}>
           </View>
         </View>
         <Image style={[styles.markerStyle,touchStyle]} {...this._panResponder.panHandlers} source={ruby} >
         </Image>
      </View>
    )
  }
}
export default ZxSlider
ZxSlider.propTypes = {
  containerStyle: View.propTypes.style,
  trackStyle: View.propTypes.style,
  selectedStyle: View.propTypes.style,
  unselectedStyle: View.propTypes.style,
  markerStyle: View.propTypes.style,
  pressedMarkerStyle: View.propTypes.style,
  values: PropTypes.number,
  onValuesChange: PropTypes.func,
  valuesCount: PropTypes.number,
}
ZxSlider.defaultProps = {

}