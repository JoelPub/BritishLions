'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ActivityIndicator } from 'react-native'
import ManOfTheMatchLanding from './landing'
import ManOfTheMatchPostSubission from './postSubmission'
import ManOfTheMatchFinal from './final'
import styleVar from '../../../../themes/variable'
import loader from '../../../../themes/loader-position'

class ManOfTheMatch extends Component {

    constructor(props) {
         super(props)
         this.state = {
              h: 0,
              isLoaded: false,
              isChanged: false
         }
    }
    
    measurePage(page,event) {
        const { x, y, width, height, } = event.nativeEvent.layout
        let h = (y + 200) > (styleVar.deviceHeight - 370)? (y+200) : (styleVar.deviceHeight-370)

        this.setState({h}, ()=>{
            if (this.state.isChanged&&this.props.isActive) {
                this.props.setHeight(this.state.h, 'ManOfTheMatch')
                this.setState({isChanged:false})
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (__DEV__)console.log('momentum componentWillReceiveProps nextProps.isActive',nextProps.isActive)
        if (__DEV__)console.log('momentum componentWillReceiveProps this.props.isActive',this.props.isActive)
        if(nextProps.isActive&&!this.props.isActive) this.props.setHeight(this.state.h, 'ManOfTheMatch')
    }

    componentDidMount(){
       this.setState({
           isLoaded: true,
           isChanged:true
        })
    }

    render() {
        return (
            <View>
                {
                    this.state.isLoaded?
                        //<ManOfTheMatchLanding />
                        <ManOfTheMatchPostSubission />
                        //<ManOfTheMatchFinal />
                    :
                        <ActivityIndicator style={[loader.centered]} size='small' />
                }

                <View onLayout={this.measurePage.bind(this, 'ManOfTheMatch')} />
            </View>
        )
    }
}



export default connect(null, null)(ManOfTheMatch)