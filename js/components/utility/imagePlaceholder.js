'use strict'

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styleVar from '../../themes/variable'


export default class ImagePlaceholder extends Component {
	constructor(props){
		super(props)

        this.width = this.props.width || styleVar.deviceWidth
        this.height = this.props.height || styleVar.deviceHeight
        this.iconSize = 36
	}

    style() {
        return {
            container: {
                backgroundColor: styleVar.colorGrey2,
                height: this.height, 
                width: this.width
            },
            icon: {
                position: 'absolute',
                color: 'rgb(232, 232, 232)',
                fontSize: this.iconSize,
                top: (this.height / 2) - (this.iconSize / 2),
                left: (this.width / 2) - (this.iconSize / 2)
            }
        }
    }

    render() {
        return (
            <View style={this.style().container}>
                <Icon name='md-image' style={this.style().icon} />
                {this.props.children}
            </View>
        )
    }
}
