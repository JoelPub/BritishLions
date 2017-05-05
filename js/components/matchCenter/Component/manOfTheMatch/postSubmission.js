'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, ActivityIndicator, ScrollView, Platform} from 'react-native'
import { Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import PlayerListSlider from '../../../global/playerListSlider'
import PlayersRankBox from '../../../global/playersRankBox'
import loader from '../../../../themes/loader-position'
import MatchMan from './matchMan'
import Toast from 'react-native-root-toast'

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
              h:0,
              isLoaded:false,
              bottomView:true
         }
         this.selectedMan=null
    }
    
    // componentWillReceiveProps(nextProps) {
    //     if (__DEV__)console.log('postSubmission componentWillReceiveProps nextProps.isActive',nextProps.isActive)
    //     if (__DEV__)console.log('postSubmission componentWillReceiveProps this.props.isActive',this.props.isActive)
    //     if (__DEV__)console.log('postSubmission componentWillReceiveProps nextProps.currentPage',nextProps.currentPage)
    //     if (__DEV__)console.log('postSubmission componentWillReceiveProps this.props.currentPage',this.props.currentPage)
    //     if(nextProps.isActive&&!this.props.isActive||nextProps.isActive&&this.props.isActive&&nextProps.currentPage===2&&this.props.currentPage!==2) {
    //         this.props.setHeight(this.state.h,'PostSubission')
    //          this.setState({isLoaded:true,isChanged:true})
    //     }
    // }
    componentDidMount(){

        // if(this.props.currentPage===2) {
        //     this.props.setHeight(this.state.h,'PostSubission')
        //     this.setState({isLoaded:true,isChanged:true})
        // }

    }
    _measurePage(page,event) {
        if (__DEV__)console.log('PostSubission')
        const { x, y, width, height, } = event.nativeEvent.layout
        if (__DEV__)console.log('page',page)
        if (__DEV__)console.log('x',x)
        if (__DEV__)console.log('y',y)
        if (__DEV__)console.log('width',width)
        if (__DEV__)console.log('height',height)
        this.setState({ h:y+50 },()=>{
            // if(this.state.isChanged&&this.props.isActive) {
                this.props.setHeight(this.state.h,'PostSubission')
                // this.setState({isChanged:false})
            // }
        })
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
            this.props.setSubPage(3,this.selectedMan.id)
        }
    }
    
    render() {
        return (
                            <View style={styles.wrapper}>
                                <View style={styles.guther}>
                                    <PlayersRankBox data={dummyRankingData} title='CURRENT FAN FAVOURITES' />
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