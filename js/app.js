'use strict'

import React, { Component } from 'React'
import AppNavigator from './appNavigator'
import configureStore from './configureStore'
import { Provider } from 'react-redux'
import { StyleSheet, View } from 'react-native'

function app():React.Component {
    class Root extends Component {
        constructor() {
            super()
            this.state = {
                isLoading: false,
                store: configureStore(()=> this.setState({isLoading: false}))
            }
        }
        render() {
            return (
                <Provider store={this.state.store}>
                    <AppNavigator store={this.state.store} />
                </Provider>
            )
        }
    }
    return Root
}

export default app
