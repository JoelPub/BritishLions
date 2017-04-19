'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import PlayerListSlider from '../../../global/playerListSlider'

class ManOfTheMatch extends Component {

    constructor(props) {
         super(props)
         this.state = {
              h:0
         }
    }
    
    componentWillReceiveProps(nextProps) {
        console.log('momentum componentWillReceiveProps nextProps.isActive',nextProps.isActive)
        console.log('momentum componentWillReceiveProps this.props.isActive',this.props.isActive)
        if(nextProps.isActive&&!this.props.isActive) this.props.setHeight(this.state.h)
    }

    measurePage(page,event) {
        console.log('momentum')
        const { x, y, width, height, } = event.nativeEvent.layout
        console.log('page',page)
        console.log('x',x)
        console.log('y',y)
        console.log('width',width)
        console.log('height',height)
        this.setState({ h:y+200 })
    }
    
    render() {
        return (
            <View style={styles.wrapperBG}>
                <View style={styles.wrapper}>
                    <View style={styles.guther}>
                        <Text style={styles.title}>WHO'S YOUR MAN OF THE MATCH?</Text>
                        <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt asperiores officiis reprehenderit atque illum itaque, maxime ducimus esse enim.</Text>
                    </View>

                    <PlayerListSlider/>

                    <View style={styles.guther}>
                        <Text style={styles.noteText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab reprehenderit iste aliquid, ullam velit ut temporibus repellendus totam earum facere id, nam omnis accusamus asperiores ipsum, placeat hic laudantium distinctio.</Text>

                        <ButtonFeedback 
                            rounded 
                            style={[styles.roundButton]}>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.roundButtonLabel}>
                                SUBMIT
                            </Text>
                        </ButtonFeedback>
                    </View>

                    <View onLayout={this.measurePage.bind(this,'ManOfTheMatch')} />
                </View>
            </View>
        )
    }
}

export default connect(null, null)(ManOfTheMatch)