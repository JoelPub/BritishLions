'use strict'

import React, { Component, Children, PropTypes } from 'react'
import {Image, View, Text, ActivityIndicator, ScrollView} from 'react-native'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import stadiumImage from './stadium.png'
import Triangle from '../../../../components/global/Triangle'
const styles = styleSheetCreate({
  container: {
    flex: 1,
    width: 202,
    height: 416,
    backgroundColor: '#fff'
  },
  image: {
    width:202,
    height:416,
    position:'absolute',

  }
})
class StadiumFigure extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    let {redPoints, blackPoints, orangePoints, bluePoints ,titles} = this.props
    let pointWidth = 14
    return (
      <View style={[styles.container]} >
        <Image style={styles.image} source={stadiumImage} >
          {
            redPoints.map((item,index)=>{
              let loactionStyle = {
                left:item.x+7,
                top:item.y+7
              }
              return(
                <View
                  style={[{width:pointWidth,height:pointWidth,backgroundColor:'red'},loactionStyle]}
                  key={index}
                />
                )
            })
          }
          {
            blackPoints.map((item,index)=>{
              let loactionStyle = {
                left:item.x+7,
                top:item.y+7
              }
              return(
                <View
                  style={[{width:pointWidth,height:pointWidth,backgroundColor:'black'},loactionStyle]}
                  key={index}
                />
              )
            })
          }
          {
            orangePoints.map((item,index)=>{
              let loactionStyle = {
                left:item.x+7,
                top:item.y+7
              }
              return(
                <Triangle
                  width={pointWidth}
                  height={pointWidth}
                  color={'rgb(255,204,40)'}
                  style={[loactionStyle]}
                  key={index}
                />
              )
            })
          }
          {
            bluePoints.map((item,index)=>{
              let loactionStyle = {
                left:item.x+7,
                top:item.y+7
              }
              return(
                <Triangle
                  width={pointWidth}
                  height={pointWidth}
                  color={'rgb(31,188,210)'}
                  style={[loactionStyle]}
                  key={index}
                />
              )
            })
          }
        </Image>
      </View>
    )
  }
}
export default StadiumFigure
StadiumFigure.propTypes = {
  redPoints: PropTypes.array,
  blackPoints: PropTypes.array,
  orangePoints: PropTypes.array,
  bluePoints: PropTypes.array,
  titles:PropTypes.array,
}
StadiumFigure.defaultProps = {
  redPoints: [
    {
    x: 100,
    y: 50
     },
    {
      x: 130,
      y: 80
    }
  ],
  blackPoints: [
    {
      x: 33,
      y: 55
    },
    {
      x: 20,
      y: 80
    }
  ],
  orangePoints: [
    {
      x: 40,
      y: 50
    },
  ],
  bluePoints: [
    {
      x: 60,
      y: 80
    },
  ]
}