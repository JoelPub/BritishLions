'use strict'

import React, { Component, Children, PropTypes } from 'react'
import {Image, View, Text, ActivityIndicator, ScrollView} from 'react-native'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import stadiumImage from './stadium.png'
import Triangle from '../../../../components/global/Triangle'
import styleVar from '../../../../themes/variable'
import {strToLower} from '../../../utility/helper'
const styles = styleSheetCreate({
  container: {
    flex: 1,
    width: 202,
    height: 416,
    backgroundColor: '#fff',

  },
  image: {
    width:202,
    height:416,
    resizeMode: 'stretch',
    borderWidth:1,
    borderColor:styleVar.colorGrey2
  }
})
class StadiumFigure extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  countPoint = (point,extraHeight,imageWith) => {
    let extraWidth = imageWith*0.04
    let newX = point.x *(imageWith-extraWidth*2) /50
    let newY = point.y *(416-extraHeight*2) /100
    let newPoint = {
      x : newX+extraWidth,
      y :newY+extraHeight
    }
    return newPoint
  }


  render() {
    let {redPoints, blackPoints, orangePoints, bluePoints ,titles,imageWith,isDrawFullPoint} = this.props
    let pointWidth = 14
    let extraHeight = 98
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
                  style={[{width:pointWidth,height:pointWidth,borderWidth:1,borderColor:'rgb(208,7,41)'},(isDrawFullPoint || (item.is_successful&&strToLower(item.is_successful)==='true'))&&{backgroundColor:'rgb(208,7,41)'},loactionStyle]}
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
                  style={[{width:pointWidth,height:pointWidth,borderWidth:1,borderColor:'rgb(0,0,0)'},(isDrawFullPoint||(item.is_successful&&strToLower(item.is_successful)==='true'))&&{backgroundColor:'rgb(0,0,0)'},loactionStyle]}
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
                  trans={!isDrawFullPoint && item.is_successful&&strToLower(item.is_successful)==='false'}
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
                  trans={!isDrawFullPoint && item.is_successful&&strToLower(item.is_successful)==='false'}
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
