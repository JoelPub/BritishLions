'use strict'

var React = require('react-native')
var { StyleSheet } = React

module.exports = StyleSheet.create({
    triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 12,
      borderRightWidth: 12,
      borderBottomWidth: 12,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#ce1030',
      alignSelf:'center'
    }
})
