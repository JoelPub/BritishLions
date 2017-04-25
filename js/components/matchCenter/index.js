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
import ManOfTheMatch from './Component/manOfTheMatch'
import loader from '../../themes/loader-position'

class MatchCenter extends Component {

    constructor(props) {
        super(props)
        this._carousel=null
        this.subjects=['MATCH SUMMARY','MOMENTUM','SET PLAYS', 'MAN OF THE MATCH']
        this.state = {
          index:0,
          swiperHeight:0,
          isLoaded:false,
          cover:true
        }


    }
    _setHeight(h,source) {
        if (__DEV__)console.log(source,'_setHeight',h)
        this.setState({swiperHeight:h},()=>{this._scrollView.scrollTo({ y: 0, animated: true })})
    }
    _setCover(isCover) {
        if(__DEV__)console.log('_setCover isCover',isCover)
        this.setState({cover:isCover})
    }
    componentDidMount() {
        if(__DEV__)console.log('this.state.isLoaded',this.state.isLoaded)
        setTimeout(()=>{this.setState({isLoaded:true})},1000)
    }
    
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader 
                        back={false} 
                        title={this.subjects[this.state.index]}
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }} scrollEnabled={this.state.index!==0} style={{backgroundColor:'grey'}}>
                    {this.state.cover&&<View style={{backgroundColor:'rgb(255,255,255)',height:styleVar.deviceHeight}}></View>}
                    {
                        this.state.isLoaded?
                            <Swiper
                                ref='swiper'
                                height={this.state.swiperHeight}
                                loop={false}
                                dotColor='rgb(255,255,255)'
                                activeDotColor='black'
                                paginationStyle={{top:-1*(this.state.swiperHeight-45),position:'absolute'}}
                                onMomentumScrollEnd={(e, state, context) => this.setState({index:state.index})}>
                                <MatchSummary isActive={this.state.index===0} setHeight={this._setHeight.bind(this)} setCover={this._setCover.bind(this)}/>
                                <Momentum  isActive={this.state.index===1} setHeight={this._setHeight.bind(this)}/>
                                <SetPlayer  isActive={this.state.index===2} setHeight={this._setHeight.bind(this)}
                                />
                                <ManOfTheMatch isActive={this.state.index===3} setHeight={this._setHeight.bind(this)}/>
                            </Swiper>
                        :
                            <ActivityIndicator style={loader.centered} size='large' />
                    }
                        <LionsFooter isLoaded={true}  />
                    </ScrollView>

                    <EYSFooter />
                </View>
            </Container>
        )
    }
}

export default connect(null, null)(MatchCenter)