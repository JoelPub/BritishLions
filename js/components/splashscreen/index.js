'use strict'

import React, { Component } from 'react'
import { Image, Platform } from 'react-native'

export default class SplashPage extends Component {
    componentWillMount () {
        var navigator = this.props.navigator
        setTimeout (() => {
            navigator.replace({
                id: 'news',
            })
        }, 3500)
    }

    render () {
        return (
            <Image
              source={require('../../../images/launchImages/default-portrait-736h@3x.png')}
              style={{flex: 1, height: null, width: null}} />
        )
    }
}
