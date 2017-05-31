'use strict'

import React, { Component } from 'react'
import { Image, Platform } from 'react-native'
import { pushNewRoute } from '../../actions/route'
import { connect } from 'react-redux'

class SplashPage extends Component {
    componentWillMount () {
        var navigator = this.props.navigator
        setTimeout (() => {
            // navigator.replace({
            //     id: 'landing',
            // })
            this.props.pushNewRoute('landing')
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
function bindActions(dispatch) {
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}


export default connect(null, bindActions)(SplashPage)
