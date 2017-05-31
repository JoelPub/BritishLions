'use strict'

import React, { Component } from 'react'
import { Platform, View } from 'react-native'

const IosUtilityHeaderBackground = () => (
    <View style={{backgroundColor: 'rgb(38, 38, 38)', height: (Platform.OS === 'android'? 0 : 20)}}></View>
)


module.exports = IosUtilityHeaderBackground
