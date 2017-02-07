
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Text, View, ScrollView } from 'react-native'
import { Container, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import styles from './styles'
import LoginRequire from '../global/loginRequire'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import styleVar from '../../themes/variable'
import LinearGradient from 'react-native-linear-gradient'
import ProfileSummaryCard from './components/profileSummaryCard'
import { styleSheetCreate } from '../../themes/lions-stylesheet'

const styles2 = styleSheetCreate({
    round: {
        backgroundColor: 'rgb(191, 191, 191)',
        paddingHorizontal: 20,
        paddingBottom: 25,
        paddingTop: 30,
        borderRadius: 20,
        marginBottom: 30
    },
    roundStatus: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent'
    },
    roundStatusIcon: {
        fontSize: 24,
        color: '#FFF',
    },
    roundPlay: {
        backgroundColor: 'rgb(255, 230, 0)',
        height: 20,
        width: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    roundPlayIcon: {
        color: 'rgb(175, 0, 30)',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginTop: 2,
        marginLeft: 2,
        android: {
            marginTop: 0
        }
    },
    roundHeader: {
        flexDirection: 'row'
    },
    roundHeaderImg: {
        width: 34,
        height: 52,
        marginRight: 12
    },
    roundHeaderTitle: {
        flex: 1,
        justifyContent: 'center'
    },
    roundHeaderTitleText: {
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
        fontSize: 27,
        lineHeight: 27,
        color: '#FFF',
        marginTop: 14,
        android: {
            marginTop: 4,
        }
    },
    roundContent: {
        marginTop: 10
    },
    roundContentText: {
        fontFamily: styleVar.fontGeorgia,
        backgroundColor: 'transparent',
        fontSize: 18,
        lineHeight: 24,
        color: '#FFF',
    }
})

const Round = ({title, lock}) => {
    let bgColor = lock? ['#bfbfbf', '#bfbfbf'] : ['#af001e', '#820417']

    return (
        <LinearGradient style={styles2.round} colors={bgColor}>

            <View style={styles2.roundStatus}>
                {
                    lock? 
                        <Icon name='md-lock' style={styles2.roundStatusIcon} />
                    :
                        <View style={styles2.roundPlay}>
                            <Icon name='ios-play' style={styles2.roundPlayIcon} />
                        </View>
                }
            </View>

            <View style={styles2.roundHeader}>
                <View style={styles2.roundHeaderImage}>
                    <Image 
                        style={styles2.roundHeaderImg} 
                        source={require('../../../images/logo.png')}></Image>
                </View>
                <View style={styles2.roundHeaderTitle}>
                    <Text style={styles2.roundHeaderTitleText}>{ title }</Text>
                </View>
            </View>
            <View style={styles2.roundContent}>
                <Text style={styles2.roundContentText}>Donee accumsan nisi non libero faucibus, nee pharetra odio suscipit.</Text>
            </View>
        </LinearGradient>
    )
}

class MyLionsCompetitionCentre extends Component {

    constructor(props) {
        super(props)
        this.isUnMounted = false
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                        <LionsHeader 
                            back={true}
                            title='MY LIONS'
                            contentLoaded={true}
                            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                        
                        <View style={styles.pageTitle}>
                            <Text style={styles.pageTitleText}>COMPETITION CENTRE</Text>
                        </View>

                        <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                            
                            <View style={styles.guther}>
                                <ProfileSummaryCard />

                                <ButtonFeedback rounded style={[styles.roundButton, {marginBottom: 30}]}>
                                    <Icon name='ios-trophy' style={styles.roundButtonIcon} />
                                    <Text style={styles.roundButtonLabel}>
                                        COMPETITION LADDER
                                    </Text>
                                </ButtonFeedback>
                            </View>

                            <View style={{
                                backgroundColor: 'rgb(239, 239, 240)',
                                borderColor: 'rgb(216, 217, 218)',
                                borderTopWidth: 1,
                                paddingTop: 30
                            }}>
                                <View style={styles.guther}>
                                    <View style={styles.rounds}>
                                        <ButtonFeedback>
                                            <Round title='ROUND 1 COMPETITION'/>
                                        </ButtonFeedback>

                                        <ButtonFeedback>
                                            <Round title='ROUND 2 COMPETITION'/>
                                        </ButtonFeedback>

                                        <Round title='ROUND 3 COMPETITION' lock={true} />

                                        <Round title='ROUND 4 COMPETITION' lock={true} />
                                    </View>
                                </View>
                            </View>
                            <LionsFooter isLoaded={true} />
                        </ScrollView>
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
                </View>
            </Container>
        )
    }
}


export default connect(null,  null)(MyLionsCompetitionCentre)