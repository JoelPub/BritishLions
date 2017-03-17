'use strict'

import React, { Component } from 'React'
import AppNavigator from './appNavigator'
import configureStore from './configureStore'
import { Provider } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
//import codePush from "react-native-code-push"

function app():React.Component {
    //let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
    class Root extends Component {
        constructor() {
            super()
            this.state = {
                isLoading: false,
                store: configureStore(()=> this.setState({isLoading: false}))
            }
            Text.defaultProps.allowFontScaling = false
        }
        render() {
            return (
                <Provider store={this.state.store}>
                    <AppNavigator store={this.state.store} />
                </Provider>
            )
        }
    }
    //Root = codePush(codePushOptions)(Root)
    return Root
}

export default app
