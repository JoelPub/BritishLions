'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import GamedayTeam from '../../../fixtures/components/gamedayTeam'
import styleVar from '../../../../themes/variable'
import styles from './styles'

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
    
    measurePage(page,event) {
        // if (__DEV__)console.log('momentum')
        const { x, y, width, height, } = event.nativeEvent.layout
        // if (__DEV__)console.log('page',page)
        // if (__DEV__)console.log('x',x)
        // if (__DEV__)console.log('y',y)
        // if (__DEV__)console.log('width',width)
        // if (__DEV__)console.log('height',height)
        let h=y+55>styleVar.deviceHeight-345?y+55:styleVar.deviceHeight-345
        this.props.setHeight(h,'team')
        
    }
    render() {
        return (
                <View  style={styles.wrapper}>
                    <GamedayTeam gameID={this.props.detail.id} isHideTitle={true} />
                    <View onLayout={this.measurePage.bind(this,'team')} />
                </View>
        )
    }
}



export default connect(null, null)(Team)