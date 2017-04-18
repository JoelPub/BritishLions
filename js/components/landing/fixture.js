'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import styles from './styles'
import { limitArrayList } from '../utility/helper'
import ButtonFeedback from '../utility/buttonFeedback'
import ImagePlaceholder from '../utility/imagePlaceholder'
import LinearGradient from 'react-native-linear-gradient'
import LiveBox from '../global/liveBox'
import shapes from '../../themes/shapes'

// For mapping a static image only, since require() is not working with concatenating a dynamic variable
// should be delete this code once api is ready.
import fixturesList from '../../../contents/fixtures/data.json'
import fixturesImages from '../../../contents/fixtures/images'

const locStyle = styleSheetCreate({ 
    bannerDesc: {
        paddingTop: 7
    },
    infoBox: {
        padding: 20,
        backgroundColor: styleVar.colorGrey,
    },
    infoBoxText: {
        marginBottom: 10,
        fontFamily: styleVar.fontCondensed,
        fontSize: 18,
        lineHeight: 18,
        textAlign: 'center',
        color: styleVar.colorText
    }
})

export default class PlayerFigure extends Component {
    constructor(props){
        super(props)

        this.state = {
            fixturesList: [],
            isGameLive: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this._fetchFixture()
        }, 600)
    }

    _fetchFixture() {
        let fixturesLeft = []
        let dateNow = new Date
        //dateNow = 'Wed Jun 03 2017 17:34:00 GMT+0800 (PHT)'
        dateNow = Date.parse(dateNow)

        fixturesList.map(function(item, index) {
            let dateSched = Date.parse(new Date(`${item.date} ${item.time}`))
            //console.log(dateSched, new Date(`${item.date} ${item.time}`))
            
            if (dateSched > dateNow) {
                fixturesLeft.push(item)
            }
        })

        this.setState({
            fixturesList: limitArrayList(fixturesLeft, 1)
        })
    }

    render() {
        return (
            <View>
                {
                    this.state.isGameLive?
                        <View>
                            <View style={styles.pageTitle}>
                                <Text style={styles.pageTitleText}>
                                    GAME NOW LIVE
                                </Text>
                            </View>
                            
                            <LiveBox data={{}} />

                            <View style={styles.bannerDetails}>
                                <Text style={[styles.bannerDesc, locStyle.bannerDesc]}>Provincial Union VS Bristish Dummy</Text>
                            </View>
                            <View style={locStyle.infoBox}>
                                <Text style={locStyle.infoBoxText}>
                                    Visit the British & Irish Lions Coach's Box for live match coverage and statistics.
                                </Text>
                                <ButtonFeedback 
                                    rounded 
                                    style={[styles.roundButton]}>
                                    <Icon name='md-analytics' style={styles.roundButtonIcon} />
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.roundButtonLabel} >
                                        COACH'S BOX
                                    </Text>
                                </ButtonFeedback>
                            </View>
                        </View>
                    :
                        <View>
                            {
                                this.state.fixturesList.length !== 0 && 
                                <View>
                                    <View style={styles.pageTitle}>
                                        <Text style={styles.pageTitleText}>
                                            UPCOMING FIXTURE
                                        </Text>
                                    </View>
                                    {
                                        this.state.fixturesList.map(function(item, index) {
                                            let date = item.date.toUpperCase() || ''
                                            let title = item.title || ''
                                            let image = fixturesImages[item.id]

                                            return (
                                                <ButtonFeedback key={index}
                                                    style={styles.banner}
                                                    onPress={() => this._drillDown(item, 'fixtureDetails')}>
                                                    <ImagePlaceholder height={200}>
                                                        <LinearGradient style={styles.fixtureImgContainer} colors={['#d9d7d8', '#FFF']}>
                                                            <Image
                                                                resizeMode='contain'
                                                                style={styles.bannerImg}
                                                                source={image} />
                                                        </LinearGradient>
                                                    </ImagePlaceholder>
                                                    <View style={[shapes.triangle, {marginTop: -12}]} />
                                                    <View style={styles.bannerDetails}>
                                                        <Text style={styles.bannerTitle}>{ date }</Text>
                                                        <Text style={styles.bannerDesc}>{ title }</Text>
                                                    </View>
                                                </ButtonFeedback>
                                            )
                                        }, this)
                                    }
                                </View>
                            }
                        </View>
                }
            </View>           
        )
    }
}
