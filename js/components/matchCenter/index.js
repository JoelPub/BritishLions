'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import Swiper from 'react-native-swiper'
import theme from '../../themes/base-theme'
import styles from './styles'
import styleVar from '../../themes/variable'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import MatchSummary from './Component/matchSummary'
import Momentum from './Component/momentum'
import StadiumFigure from './Component/StadiumFigure'
import Carousel from '../global/Carousel'

class MatchCenter extends Component {

    constructor(props) {
         super(props)
        this._carousel=null
    }
    
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader 
                        back={true} 
                        title='MATCH CENTER'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        
                        <View style={{backgroundColor:'grey'}}>
                            <Swiper
                                ref='swiper'
                                height={1480}
                                loop={false}
                                dotColor='rgb(255,255,255)'
                                activeDotColor='black'
                                paginationStyle={{top:-1410,position:'absolute'}}>
                                <MatchSummary />
                                <Momentum />
                                <StadiumFigure />
                                <Carousel />
                            </Swiper>
                        </View>

                        <LionsFooter isLoaded={true} />
                    </ScrollView>

                    <EYSFooter />
                </View>
            </Container>
        )
    }
}

export default connect(null, null)(MatchCenter)