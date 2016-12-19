'use strict'

import React, { Component } from 'react'
import { View } from 'react-native'
import styleVar from '../../themes/variable'
import LionsFooter from '../global/lionsFooter'

export default class StickyFooter extends Component {
    render() {
        let height = this.props.reduceHeight || styleVar.deviceHeight - 118 // Formula: 118 = header + footer
        return (
            <View style={{flex: 1, minHeight: height}}>
                <View style={{flex: 1}}>
                    {this.props.children}
                </View>
                <LionsFooter isLoaded={true} />
            </View>
        )
    }
}
