'use strict'

import AppNavigator from './appNavigator'
import React, { Component } from 'react'
import { NetInfo } from 'react-native'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNetworkAvailable: false
        }
    }

    _networkCheck() {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({
                isNetworkAvailable: isConnected
            })
        })
    }

    componentWillMount () {
        this._networkCheck()
    }

    render() {
        return <AppNavigator store={this.props.store} />
    }
}

export default App
