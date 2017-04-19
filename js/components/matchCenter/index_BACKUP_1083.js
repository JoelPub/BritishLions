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
import SetPlayer from './Component/SetPlayer'
import Carousel from '../global/Carousel'
var ScrollableTabView = require('react-native-scrollable-tab-view');

class MatchCenter extends Component {

    constructor(props) {
        super(props)
        this._carousel=null
         this.state = {
              index:0,
              swiperHeight:0
         }

    }
    _setHeight(h) {
        console.log('_setHeight',h)
        this.setState({swiperHeight:h})
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
                                height={this.state.swiperHeight}
                                loop={false}
                                dotColor='rgb(255,255,255)'
                                activeDotColor='black'
<<<<<<< HEAD
                                paginationStyle={{top:-630,position:'absolute'}}>
                                <MatchSummary />
                                <Momentum />
                                <SetPlayer />
                                <ScrollableTabView locked={true}>
                                    <Carousel tabLabel="React" />
                                    <Carousel tabLabel="Flow" />
                                    <Carousel tabLabel="Jest" />
                                </ScrollableTabView>
=======
                                paginationStyle={{top:-1*(this.state.swiperHeight-70),position:'absolute'}}
                                onMomentumScrollEnd={(e, state, context) => this.setState({index:state.index})}>
                                <MatchSummary isActive={this.state.index===0} setHeight={this._setHeight.bind(this)}/>
                                <Momentum  isActive={this.state.index===1} setHeight={this._setHeight.bind(this)}/>
                                <StadiumFigure  isActive={this.state.index===2}/>
                                <Carousel  isActive={this.state.index===3}/>
>>>>>>> 3c4badb3e7d0839949e35d17d8af9f09016059eb
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