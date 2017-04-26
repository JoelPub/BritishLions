'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import ManOfTheMatchLanding from './landing'
import ManOfTheMatchPostSubission from './postSubmission'
import ManOfTheMatchFinal from './final'

class ManOfTheMatch extends Component {

    constructor(props) {
         super(props)
         this.state = {
              h: 0
         }
    }
    
    _measurePage(page, event) {
        const { x, y, width, height, } = event.nativeEvent.layout
        if (__DEV__)console.log('momentum')
        if (__DEV__)console.log('page',page)
        if (__DEV__)console.log('x',x)
        if (__DEV__)console.log('y',y)
        if (__DEV__)console.log('width',width)
        if (__DEV__)console.log('height',height)
        this.setState({ h: y + 200 })
    }

    componentWillReceiveProps(nextProps) {
        if (__DEV__)console.log('momentum componentWillReceiveProps nextProps.isActive',nextProps.isActive)
        if (__DEV__)console.log('momentum componentWillReceiveProps this.props.isActive',this.props.isActive)
        if(nextProps.isActive&&!this.props.isActive) this.props.setHeight(this.state.h)
    }

    render() {
        return (
            <View>
                <ManOfTheMatchLanding />
                {/*<ManOfTheMatchPostSubission />*/}
                {/*<ManOfTheMatchFinal />*/}

                <View onLayout={this._measurePage.bind(this, 'ManOfTheMatch')} />
            </View>
        )
    }
}



export default connect(null, null)(ManOfTheMatch)