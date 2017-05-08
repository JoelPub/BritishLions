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
    // pressSubmit(n) {
    //     this.setState({currentPage:n})
    // }
    componentDidMount(){
        if (__DEV__)console.log('index componentDidMount')

       if(this.props.subPage!==1) this.setState({showModal:false})

    }
    
    componentWillReceiveProps(nextProps) {
        if (__DEV__)console.log('index componentWillReceiveProps nextProps.subPage',nextProps.subPage)
        if (__DEV__)console.log('index componentWillReceiveProps this.props.subPage',this.props.subPage)
        if(nextProps.subPage!==this.props.subPage) {
             this.setState({showModal:true})
        }
    }
    
    
    render() {
        return (
                <View>
                    {
                        this.props.subPage===1&&<ManOfTheMatchLanding setHeight={this.props.setHeight} setSubPage={this.props.setSubPage}/>
                    }
                    {
                        this.props.subPage===2&&<ManOfTheMatchPostSubission setHeight={this.props.setHeight} setSubPage={this.props.setSubPage} showModal={this.state.showModal}/>
                    }
                    {
                        this.props.subPage===3&&<ManOfTheMatchFinal setHeight={this.props.setHeight} showModal={this.state.showModal}/>
                    }
                    
                    
                    
                </View>
        )
    }
}



export default connect(null, null)(ManOfTheMatch)