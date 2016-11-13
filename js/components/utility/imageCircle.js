'use strict'

import React, { Component } from 'react'
import { View, Image, Platform } from 'react-native'

export default class ImageCircle extends Component {
	constructor(props){
		super(props)

		this.containerStyle = this.props.containerStyle || {}
	}

	getStyle() {
		const bgColor = this.props.containerBgColor
		const containerPadding = this.props.containerPadding? this.props.containerPadding : 0
		const size = this.props.size - containerPadding

		let borderRadius = Platform.OS === 'ios'? (size + containerPadding) / 2 : 0

	    return {
	        circle: {
	            width: size + containerPadding,
                height: size + containerPadding,
                borderRadius: borderRadius,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: bgColor
	        },

	        image: {
	        	width: size,
	        	height: size
	        },

	        fixCircleClipping: {
	            position: 'absolute',
	            top: - (size + containerPadding),
	            bottom: - (size + containerPadding),
	            right: - (size + containerPadding),
	            left: - (size + containerPadding),
	            borderRadius: (size + containerPadding),
	            borderWidth: (size + containerPadding),
	            borderColor: 'green'
	        },
	    }
	}

    render() {
        return (
            <View style={[this.getStyle().circle, this.containerStyle]}>
            	<Image style={this.getStyle().image}
                	resizeMode='contain'
                	source={this.props.src} />
                {/*<View style={this.getStyle().fixCircleClipping}/>*/}
            </View>
        )
    }
}
