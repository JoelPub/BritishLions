'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, ActivityIndicator, ScrollView, Platform} from 'react-native'
import { Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import PlayersRankBox from '../../../global/playersRankBox'
import MatchMan from './matchMan'

class ManOfTheMatchPostSubission extends Component {

    constructor(props) {
         super(props)
         this.selectedMan=null
    }
    _measurePage(page,event) {
        if (__DEV__)console.log('PostSubission')
        const { x, y, width, height, } = event.nativeEvent.layout
        if (__DEV__)console.log('page',page)
        if (__DEV__)console.log('x',x)
        if (__DEV__)console.log('y',y)
        if (__DEV__)console.log('width',width)
        if (__DEV__)console.log('height',height)
        this.props.setHeight(y+50,'PostSubission')
    }

    _onPressPlayer(info) {
        if (__DEV__)console.log('_onPressPlayer: ', info)
        this.selectedMan=info
        if (__DEV__)console.log('this.selectedMan: ', this.selectedMan)
    }
    _onPressSubmit(){
        if(this.selectedMan===null) {
            this.props.setSubPage(3,'0')
        }
        else {
            this.props.setSubPage(3,this.selectedMan.id)
        }
    }
    
    render() {
        return (
                <View style={styles.wrapper}>
                    <View style={styles.guther}>
                        <PlayersRankBox title='CURRENT FAN FAVOURITES' />
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>ARE YOU HAPPY WITH YOUR MAN OF THE MATCH?</Text>
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
                                RESUBMIT
                            </Text>
                        </ButtonFeedback>
                    </View>
                    <View onLayout={this._measurePage.bind(this,'PostSubission')} />
                    
                </View>
        )
    }
}

export default connect(null, null)(ManOfTheMatchPostSubission)