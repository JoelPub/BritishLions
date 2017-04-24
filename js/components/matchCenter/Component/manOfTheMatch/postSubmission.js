'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, ActivityIndicator, ScrollView} from 'react-native'
import { Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import PlayerListSlider from '../../../global/playerListSlider'
import PlayersRankBox from '../../../global/playersRankBox'

// please remove this dummy data when api is availble
let dummyPlayerData = [
    {
        id: '1',
        name: 'Rory Best',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/750.jpg'
    },
    {
        id: '2',
        name: 'Moren Ipsum Aber',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/68811.jpg'
    },
    {
        id: '3',
        name: 'Lerom Dolor',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/90373.jpg'
    },
    {
        id: '4',
        name: 'Rory Best',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/750.jpg'
    },
    {
        id: '5',
        name: 'Moren Ipsum Aber',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/68811.jpg'
    },
    {
        id: '6',
        name: 'Lerom Dolor',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/90373.jpg'
    },
    {
        id: '7',
        name: 'Rory Best',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/750.jpg'
    },
    {
        id: '8',
        name: 'Moren Ipsum Aber',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/68811.jpg'
    },
    {
        id: '9',
        name: 'Lerom Dolor',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/90373.jpg'
    },
]

// please remove this dummy data when api is availble
let dummyRankingData = [
    {
        id: '1',
        name: 'Rory Best',
        percentage: 40,
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/750.jpg'
    },
    {
        id: '2',
        name: 'Moren Ipsum Aber',
        percentage: 24,
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/68811.jpg'
    },
    {
        id: '3',
        name: 'Lerom Dolor',
        percentage: 21,
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/90373.jpg'
    }
]

class ManOfTheMatchPostSubission extends Component {

    constructor(props) {
         super(props)
         this.state = {
              h:0
         }
    }
    
    componentWillReceiveProps(nextProps) {
        if (__DEV__)console.log('momentum componentWillReceiveProps nextProps.isActive',nextProps.isActive)
        if (__DEV__)console.log('momentum componentWillReceiveProps this.props.isActive',this.props.isActive)
        if(nextProps.isActive&&!this.props.isActive) this.props.setHeight(this.state.h)
    }

    _measurePage(page,event) {
        if (__DEV__)console.log('momentum')
        const { x, y, width, height, } = event.nativeEvent.layout
        if (__DEV__)console.log('page',page)
        if (__DEV__)console.log('x',x)
        if (__DEV__)console.log('y',y)
        if (__DEV__)console.log('width',width)
        if (__DEV__)console.log('height',height)
        this.setState({ h:y+200 })
    }

    _onPressPlayer(item) {
        if (__DEV__)console.log('Callback: ', item)
    }

    _navigateTo(route) {
        this.props.pushNewRoute(route)
    }
    
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.guther}>
                    <PlayersRankBox data={dummyRankingData} />
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>ARE YOU HAPPY WITH YOUR MAN OF THE MATCH?</Text>
                </View>
                <View style={styles.desc}>
                    <Text style={styles.descText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt asperiores officiis reprehenderit atque illum itaque, maxime ducimus esse enim.</Text>
                </View>

                <PlayerListSlider data={dummyPlayerData} callbackPress={this._onPressPlayer.bind(this)} />

                <View style={styles.guther}>
                    <Text style={styles.noteText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab reprehenderit iste aliquid, ullam velit ut temporibus repellendus totam earum facere id, nam omnis accusamus asperiores ipsum, placeat hic laudantium distinctio.</Text>
                </View>

                <View style={styles.roundButtonBg}>
                    <ButtonFeedback rounded style={styles.roundButton} onPress={() => this._navigateTo('landing')}>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.roundButtonLabel}>
                            RESUBMIT
                        </Text>
                    </ButtonFeedback>
                </View>

                <View onLayout={this._measurePage.bind(this,'ManOfTheMatch')} />
            </View>
        )
    }
}

export default connect(null, null)(ManOfTheMatchPostSubission)