'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { drillDown } from '../../actions/content'
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
        paddingBottom: 40,
        backgroundColor: styleVar.colorText,
    },
    infoBoxText: {
        marginBottom: 20,
        fontFamily: styleVar.fontGeorgia,
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',
        color: '#FFF',
    },
    bannerDetails: {
        backgroundColor: styleVar.colorText,
        paddingTop: 18,
        paddingBottom: 5
    },
    logoIcon: {
        width: 21,
        height: 32,
        backgroundColor: 'transparent',
        marginTop: -5,
        android: {
            marginTop: 0
        }
    },
})

class PlayerFigure extends Component {
    constructor(props){
        super(props)

        this.state = {
            fixturesList: [],
            fixturesLeft: [],
            isGameLive: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this._fetchFixture()
        }, 600)
    }

    _drillDown(data, route) {
        this.props.drillDown(data, route)
    }

    _fetchFixture() {
        let fixturesLeft = []
        let dateNow = new Date
        //dateNow = 'Tue Jun 23 2017 14:25:22 GMT+0800 (PHT)'
        dateNow = Date.parse(dateNow)
       
        fixturesList.map(function(item, index) {
            let dateSched = Date.parse(new Date(`${item.date} ${item.time}`))
            //console.log(dateSched, new Date(`${item.date} ${item.time}`))
            
            if (dateSched > dateNow) {
                fixturesLeft.push(item)
            }
        })

        this.setState({
            fixturesList: fixturesLeft,
            fixturesLeft: limitArrayList(fixturesLeft, 1)
        })
    }

    _goToCoachBox = () => {
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
                            
                            <LiveBox data={{}} inverse={true}/>
                            
                            <ButtonFeedback 
                                style={styles.banner}
                                onPress={() => this._drillDown(fixturesList[0], 'fixtureDetails')}>
                                <ImagePlaceholder height={200}>
                                    <LinearGradient style={styles.fixtureImgContainer} colors={['#d9d7d8', '#FFF']}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.bannerImg}
                                            source={fixturesImages[1]} />
                                    </LinearGradient>
                                </ImagePlaceholder>
                            </ButtonFeedback>
                            <View style={[styles.bannerDetails, locStyle.bannerDetails]}>
                                <Text style={[styles.bannerDesc, locStyle.bannerDesc]}>Provincial Union vs British & Irish Lions</Text>
                            </View>
                            <View style={locStyle.infoBox}>
                                <Text style={locStyle.infoBoxText}>
                                    Visit the British & Irish Lions Coach's Box for live match coverage and statistics.
                                </Text>
                                <ButtonFeedback 
                                    rounded 
                                    style={[styles.roundButton]}
                                    onPress={this._goToCoachBox}
                                >
                                    <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                                        style={locStyle.logoIcon}/>
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
                                            {
                                                this.state.fixturesList.length === 1? 'LAST FIXTURE' : 'UPCOMING FIXTURE'
                                            }
                                        </Text>
                                    </View>
                                    {
                                        this.state.fixturesLeft.map(function(item, index) {
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

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect(null, bindAction)(PlayerFigure)