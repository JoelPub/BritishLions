'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import GamedayTeam from '../../../fixtures/components/gamedayTeam'

class Team extends Component {

    constructor(props) {
         super(props)
         // this.state = {
         //      showModal:true
         // }
    }
    // componentDidMount(){
    //     // if (__DEV__)console.log('index componentDidMount')
    //     if(this.props.subPage!=='landing') this.setState({showModal:false})
    // }
    
    // componentWillReceiveProps(nextProps) {
    //     // if (__DEV__)console.log('index componentWillReceiveProps nextProps.subPage',nextProps.subPage)
    //     // if (__DEV__)console.log('index componentWillReceiveProps this.props.subPage',this.props.subPage)
    //     if(nextProps.subPage!==this.props.subPage) {
    //          this.setState({showModal:true})
    //     }
    // }
    // setShowModal(v){
    //     this.setState({showModal:v})
    // }
    
    render() {
        return (
                <View>
                    <GamedayTeam gameID={this.props.detail.id} isHideTitle={true} />
                    
                </View>
        )
    }
}



export default connect(null, null)(Team)