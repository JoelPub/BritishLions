'use strict'

import React, { Component } from 'react'
import { Image, Platform } from 'react-native'

export default class SplashPage extends Component {
    componentWillMount () {
        var navigator = this.props.navigator
        setTimeout (() => {
            navigator.replace({
                id: 'landing',
            })
        }, 3500)
    }

    render () {
        return (
            <Image
              source={require('../../../images/launchImages/Default-Portrait-736h@3x.png')}
              style={{flex: 1, height: null, width: null}} />
        )
    }
}
