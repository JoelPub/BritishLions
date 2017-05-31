'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View,ActivityIndicator, Text } from 'react-native'
import { Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import PlayersRankBox from '../../../global/playersRankBox'
import loader from '../../../../themes/loader-position'


class ManOfTheMatchFinal extends Component {

    constructor(props) {
         super(props)
    }
    _measurePage(page,event) {
        if (__DEV__)console.log('Final')
        const { x, y, width, height, } = event.nativeEvent.layout
        if (__DEV__)console.log('page',page)
        if (__DEV__)console.log('x',x)
        if (__DEV__)console.log('y',y)
        if (__DEV__)console.log('width',width)
        if (__DEV__)console.log('height',height)
        this.props.setHeight(y+50,'Final')
    }
    
    render() {
        return (
               <View style={styles.wrapper}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>WHO WAS YOUR MAN OF THE MATCH?</Text>
                    </View>
                    <View style={styles.desc}>
                        <Text style={styles.descText}>The Lions Man of the Match as voted by you.</Text>
                    </View>

                    <View style={styles.guther}>
                        <PlayersRankBox  showModal={this.props.showModal}   detail={this.props.detail}/>
                    </View>

                    <View onLayout={this._measurePage.bind(this,'Final')} />
                </View>
            
        )
    }
}

export default connect(null, null)(ManOfTheMatchFinal)