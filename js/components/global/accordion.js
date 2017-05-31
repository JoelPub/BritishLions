'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import ButtonFeedback from '../utility/buttonFeedback'
import Collapsible from 'react-native-collapsible'


export default class Accordion extends Component {
    constructor(props){
        super(props)

        this.state = {
            collapsed: true
        }
    }

    _toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    render() {
        return (
            <View>
                <ButtonFeedback onPress={this._toggleExpanded}>
                    { this.props.header }
                </ButtonFeedback>
                <Collapsible collapsed={this.state.collapsed}>
                    { this.props.children }
                </Collapsible>
            </View>
        )
    }
}
