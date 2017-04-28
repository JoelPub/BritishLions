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
              currentPage:0
         }
    }
    pressSubmit(n) {
        this.setState({currentPage:n})
    }
    componentDidMount(){
        if (__DEV__)console.log('index componentDidMount')

        this.setState({currentPage:1})

    }
    
    componentWillReceiveProps(nextProps) {
        if (__DEV__)console.log('index componentWillReceiveProps nextProps.isActive',nextProps.isActive)
        if (__DEV__)console.log('index componentWillReceiveProps this.props.isActive',this.props.isActive)
        if(nextProps.isActive&&!this.props.isActive) {
        if (__DEV__)console.log('this.state.currentPage',this.state.currentPage)
             this.setState({currentPage:this.state.currentPage===0?1:this.state.currentPage})
        }
    }
    
    
    render() {
        return (<View>
            {
                this.props.isActive?
                <View>
                    <ManOfTheMatchLanding  isActive={this.props.isActive} setHeight={this.props.setHeight} currentPage={this.state.currentPage} pressSubmit={this.pressSubmit.bind(this)}/>
                    <ManOfTheMatchPostSubission isActive={this.props.isActive} setHeight={this.props.setHeight} currentPage={this.state.currentPage} pressSubmit={this.pressSubmit.bind(this)}/>
                    <ManOfTheMatchFinal isActive={this.props.isActive} setHeight={this.props.setHeight} currentPage={this.state.currentPage} />
                </View>
                :
                null

            }
            </View>
        )
    }
}



export default connect(null, null)(ManOfTheMatch)