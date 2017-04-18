'use strict'

import React, { Component, Children, PropTypes } from 'react'
import {Image, View, Text, ActivityIndicator, ScrollView} from 'react-native'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import stadiumImage from './stadium.png'
import Triangle from '../../../../components/global/Triangle'
const styles = styleSheetCreate({
  container: {
    flex: 1,
    width: 180,
    height: 320,
    backgroundColor: '#fff'
  },
  image: {
    width:180,
    height:320,
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
    let {redPoints, blackPoints, whitePoints, bluePoints} = this.props
    return (
      <View style={[styles.container]} >
        <Image style={styles.image} source={stadiumImage} >
          {
            redPoints.map((item,index)=>{
              let loactionStyle = {
                left:item.x,
                top:item.y
              }
              return(
                <Triangle
                  width={20}
                  height={20}
                  color={'#D80016'}
                  style={loactionStyle}
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
  whitePoints: PropTypes.array,
  bluePoints: PropTypes.array,
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
  blackPoints: [],
  whitePoints: [],
  bluePoints: []
}