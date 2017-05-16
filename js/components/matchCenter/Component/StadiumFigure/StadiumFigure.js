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
    resizeMode: 'stretch'
  }
})
class StadiumFigure extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  countPoint = (point,extraHeight,imageWith) => {

    let newX = point.x *imageWith /50
    let newY = point.y *(416-extraHeight*2) /100
    let newPoint = {
      x : newX,
      y :newY+extraHeight
    }
    return newPoint
  }


  render() {
    let {redPoints, blackPoints, orangePoints, bluePoints ,titles,imageWith} = this.props
    let pointWidth = 14
    let extraHeight = 90
    return (
      <View style={[styles.container,{width:imageWith}]} >
        <Image style={[styles.image,{width:imageWith}]} source={stadiumImage} >
          {
            redPoints.map((item,index)=>{
              if(item.x===null || item.y===null) return null
              let newItem = this.countPoint(item,extraHeight,imageWith)
              let loactionStyle = {
                left:newItem.x-7,
                top:416-(newItem.y+7),
                position:'absolute'

              }
              return(
                <View
                  style={[{width:pointWidth,height:pointWidth,backgroundColor:'rgb(208,7,41)'},loactionStyle]}
                  key={index}
                />
                )
            })
          }
          {
            blackPoints.map((item,index)=>{
              if(item.x===null || item.y===null) return null

              let newItem = this.countPoint(item,extraHeight,imageWith)
              let loactionStyle = {
                left:newItem.x-7,
                top:416-(newItem.y+7),
                position:'absolute'
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
              if(item.x===null || item.y===null) return null

              let newItem = this.countPoint(item,extraHeight,imageWith)
              let loactionStyle = {
                left:newItem.x-7,
                top:416-(newItem.y+7),
                position:'absolute'
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
              if(item.x===null || item.y===null) return null

              let newItem = this.countPoint(item,extraHeight,imageWith)
              let loactionStyle = {
                left:newItem.x-7,
                top:416-(newItem.y+7),
                position:'absolute'
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
  imageWidth: PropTypes.number,
}
StadiumFigure.defaultProps = {
  imageWidth: 202,
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