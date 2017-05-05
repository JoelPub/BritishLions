'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View,ActivityIndicator, Platform, Text } from 'react-native'
import { Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import PlayerListSlider from '../../../global/playerListSlider'
import loader from '../../../../themes/loader-position'
import MatchMan from './matchMan'
import Toast from 'react-native-root-toast'

class ManOfTheMatchLanding extends Component {

    constructor(props) {
         super(props)
         this.selectedMan=null
    }
    _measurePage(page,event) {
        if (__DEV__)console.log('_measurePage')
        const { x, y, width, height, } = event.nativeEvent.layout
        if (__DEV__)console.log('page',page)
        if (__DEV__)console.log('x',x)
        if (__DEV__)console.log('y',y)
        if (__DEV__)console.log('width',width)
        if (__DEV__)console.log('height',height)
        this.props.setHeight(y+50,'Landing')
    }

    _onPressPlayer(info) {
        if (__DEV__)console.log('_onPressPlayer: ', info)
        this.selectedMan=info
        if (__DEV__)console.log('this.selectedMan: ', this.selectedMan)
    }
    _onPressSubmit(){
        if(this.selectedMan===null) {
            let toast = Toast.show('Choose Player', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                        onShow: () => {
                            // calls on toast\`s appear animation start
                        },
                        onShown: () => {
                            // calls on toast\`s appear animation end.
                        },
                        onHide: () => {
                            // calls on toast\`s hide animation start.
                        },
                        onHidden: () => {
                            // calls on toast\`s hide animation start.
                        }
                    })
        }
        else {
            this.props.setSubPage(2,this.selectedMan)
        }
    }
    
    render() {
        return (
                           <View style={styles.wrapper}>
                                <View style={styles.title}>
                                    <Text style={styles.titleText}>WHO'S YOUR MAN OF THE MATCH?</Text>
                                </View>
                                <View style={styles.desc}>
                                    <Text style={styles.descText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt asperiores officiis reprehenderit atque illum itaque, maxime ducimus esse enim.</Text>
                                </View>
                                <MatchMan selectMan={this._onPressPlayer.bind(this)}/>
                                <View style={styles.guther}>
                                    <Text style={styles.noteText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab reprehenderit iste aliquid, ullam velit ut temporibus repellendus totam earum facere id, nam omnis accusamus asperiores ipsum, placeat hic laudantium distinctio.</Text>
                                </View>

                                <View style={styles.roundButtonBg}>
                                    <ButtonFeedback rounded style={styles.roundButton} onPress={this._onPressSubmit.bind(this)}>
                                        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.roundButtonLabel}>
                                            SUBMIT
                                        </Text>
                                    </ButtonFeedback>
                                </View>
                                <View onLayout={this._measurePage.bind(this,'Landing')} />
                            </View>
            
        )
    }
}

export default connect(null, null)(ManOfTheMatchLanding)