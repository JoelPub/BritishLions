'use strict'

import React, { Component } from 'react'
import { View,Animated,Easing, } from 'react-native'
import loadingImage from '../../../images/loading.png'

export default class LoadingAnimation extends Component {
	constructor(props){
		super(props)

		this.state = {
            bounceValue: new Animated.Value(1),
            rotateValue: new Animated.Value(0),
        }
	}

	componentDidMount() {
        this.startAnimation()
    }

    startAnimation() {
        this.state.bounceValue.setValue(1);
        this.state.rotateValue.setValue(0);
        Animated.parallel([
            Animated.spring(this.state.bounceValue, {
                toValue: 1,      
                friction: 7,   
            }),
            Animated.timing(this.state.rotateValue, {
                toValue: 1,  
                duration: 15000,  
                easing: Easing.out(Easing.linear),
            }),
        ]).start(()=>this.startAnimation());
    }


    render() {
        return (
            <Animated.Image source={loadingImage}
                                            style={{width:75,
                                            height: 75,alignSelf:'center',
                                            transform: [
                                            {scale: this.state.bounceValue},
                                            {rotateZ: this.state.rotateValue.interpolate({
                                            inputRange: [0,1],
                                            outputRange: ['0deg', '360deg'],
                                            })},
                                 ]}}>
                            </Animated.Image>
        )
    }
}
