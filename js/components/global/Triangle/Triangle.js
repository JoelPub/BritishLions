'use strict';

import React, { Component, Children, PropTypes } from 'react'
import {
  StyleSheet,
  View
} from 'react-native';
 class Triangle extends Component {

  constructor(props){
    super(props)
    this.state = {
    }
    this.r=360*Math.atan(this.props.height/(this.props.width/2))/(2*Math.PI)+'deg'
    this.l=Math.sqrt(Math.pow((this.props.width/2),2)+Math.pow(this.props.height,2))
  }

  _borderStyles =()=> {
    if(this.props.trans) {
      return {
        borderBottomWidth:1,
        borderBottomColor:this.props.color,
        width:this.props.width,
        height:this.props.height+2,
        backgroundColor:'transparent',
        top:-1,
      }
    }
    else {
      if (this.props.direction == 'up') {
        return {
          borderTopWidth: 0,
          borderRightWidth: this.props.width/2.0,
          borderBottomWidth: this.props.height,
          borderLeftWidth: this.props.width/2.0,
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: this.props.color,
          borderLeftColor: 'transparent',
        };
      } else if (this.props.direction == 'right') {
        return {
          borderTopWidth: this.props.height/2.0,
          borderRightWidth: 0,
          borderBottomWidth: this.props.height/2.0,
          borderLeftWidth: this.props.width,
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: this.props.color,
        };
      } else if (this.props.direction == 'down') {
        return {
          borderTopWidth: this.props.height,
          borderRightWidth: this.props.width/2.0,
          borderBottomWidth: 0,
          borderLeftWidth: this.props.width/2.0,
          borderTopColor: this.props.color,
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        };
      } else if (this.props.direction == 'left') {
        return {
          borderTopWidth: this.props.height/2.0,
          borderRightWidth: this.props.width,
          borderBottomWidth: this.props.height/2.0,
          borderLeftWidth: 0,
          borderTopColor: 'transparent',
          borderRightColor: this.props.color,
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        };
      } else if (this.props.direction == 'up-left') {
        return {
          borderTopWidth: this.props.height,
          borderRightWidth: this.props.width,
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          borderTopColor: this.props.color,
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        };
      } else if (this.props.direction == 'up-right') {
        return {
          borderTopWidth: 0,
          borderRightWidth: this.props.width,
          borderBottomWidth: this.props.height,
          borderLeftWidth: 0,
          borderTopColor: 'transparent',
          borderRightColor: this.props.color,
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        };
      } else if (this.props.direction == 'down-left') {
        return {
          borderTopWidth: this.props.height,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          borderLeftWidth: this.props.width,
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: this.props.color,
        };
      } else if (this.props.direction == 'down-right') {
        return {
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: this.props.height,
          borderLeftWidth: this.props.width,
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: this.props.color,
          borderLeftColor: 'transparent',
        };
      } else {
        console.error('Triangle.js wrong direction. ' + this.props.direction + ' is invalid. Must be one of: ' + ['up', 'right', 'down', 'left', 'up-right', 'up-left', 'down-right', 'down-left']);
        return {};
      }
    }
    
  }

  render(){
    let borderStyles = this._borderStyles()
    return (
      <View style={[styles.triangle, borderStyles, this.props.style]}>
        {
          this.props.trans
          &&
          <View style={{borderTopWidth:1,borderTopColor:this.props.color,height:this.props.width/2,width:this.l,position:'absolute',backgroundColor:'transparent',top:this.props.width/2,left:0,transform:[{rotateZ:this.r}]}}/>
        }
        {
          this.props.trans
          &&
          <View style={{borderTopWidth:1,borderTopColor:this.props.color,height:this.props.width/2,width:this.l,position:'absolute',backgroundColor:'transparent',top:this.props.width/2,left:-2,transform:[{rotateZ:`-${this.r}`}]}}/>
        }
      </View>

    )
  }
}

var styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
})
export  default Triangle
Triangle.propTypes = {
  direction: React.PropTypes.oneOf(['up', 'right', 'down', 'left', 'up-right', 'up-left', 'down-right', 'down-left']),
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  color: React.PropTypes.string,
  trans: React.PropTypes.bool,
}
Triangle.defaultProps = {
  direction: 'up',
  width: 0,
  height: 0,
  color: 'white',
  trans: false
}