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
              showModal:true
         }
    }
    componentDidMount(){
        // if (__DEV__)console.log('index componentDidMount')
        if(this.props.subPage!=='landing') this.setState({showModal:false})
    }
    
    componentWillReceiveProps(nextProps) {
        // if (__DEV__)console.log('index componentWillReceiveProps nextProps.subPage',nextProps.subPage)
        // if (__DEV__)console.log('index componentWillReceiveProps this.props.subPage',this.props.subPage)
        if(nextProps.subPage!==this.props.subPage) {
             this.setState({showModal:true})
        }
    }
    setShowModal(v){
        this.setState({showModal:v})
    }
    
    render() {
        return (
                <View>
                    {
                        this.props.subPage==='landing'&&<ManOfTheMatchLanding setHeight={this.props.setHeight} setSubPage={this.props.setSubPage} detail={this.props.detail} setShowModal={this.setShowModal.bind(this)}/>
                    }
                    {
                        this.props.subPage==='post'&&<ManOfTheMatchPostSubission setHeight={this.props.setHeight} setSubPage={this.props.setSubPage} showModal={this.state.showModal} detail={this.props.detail} setShowModal={this.setShowModal.bind(this)}/>
                    }
                    {
                        this.props.subPage==='final'&&<ManOfTheMatchFinal setHeight={this.props.setHeight} showModal={this.state.showModal} detail={this.props.detail} />
                    }
                    
                    
                    
                </View>
        )
    }
}



export default connect(null, null)(ManOfTheMatch)