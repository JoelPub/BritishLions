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
              h:0,
              isLoaded:false,
              bottomView:true
         }
    }
    
    componentWillReceiveProps(nextProps) {
        if (__DEV__)console.log('postSubmission componentWillReceiveProps nextProps.isActive',nextProps.isActive)
        if (__DEV__)console.log('postSubmission componentWillReceiveProps this.props.isActive',this.props.isActive)
        if (__DEV__)console.log('postSubmission componentWillReceiveProps nextProps.currentPage',nextProps.currentPage)
        if (__DEV__)console.log('postSubmission componentWillReceiveProps this.props.currentPage',this.props.currentPage)
        if(nextProps.isActive&&!this.props.isActive||nextProps.isActive&&this.props.isActive&&nextProps.currentPage===2&&this.props.currentPage!==2) {
            this.props.setHeight(this.state.h,'PostSubission')
             this.setState({isLoaded:true,isChanged:true})
        }
    }
    componentDidMount(){

        if(this.props.currentPage===2) {
            this.props.setHeight(this.state.h,'PostSubission')
            this.setState({isLoaded:true,isChanged:true})
        }

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
            if(this.state.isChanged&&this.props.isActive) {
                this.props.setHeight(this.state.h,'PostSubission')
                this.setState({isChanged:false})
            }
        })
    }
    _measureSlider(event) {
        if (__DEV__)console.log('_measureSlider')
        const { x, y, width, height, } = event.nativeEvent.layout
        if (__DEV__)console.log('x',x)
        if (__DEV__)console.log('y',y)
        if (__DEV__)console.log('width',width)
        if (__DEV__)console.log('height',height)
        if(height>0) 
            {
                if(Platform.OS==='ios') this.setState({bottomView:false},()=>this.setState({isChanged:true,bottomView:true}))
                else this.setState({isChanged:true})
            }
    }

    _onPressPlayer(item) {
        if (__DEV__)console.log('Callback: ', item)
    }
    
    render() {
        return (
            <View>
            {
                this.props.currentPage===2?
                <View>
                    {
                        this.state.isLoaded&&this.props.isActive?
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

                                <View onLayout={this._measureSlider.bind(this)}>
                                    <PlayerListSlider title="FORWARDS" data={dummyPlayerData} callbackPress={this._onPressPlayer.bind(this)} />
                                    <PlayerListSlider title="BACKS" data={dummyPlayerData} callbackPress={this._onPressPlayer.bind(this)} />
                                </View>
                                <View style={styles.guther}>
                                    <Text style={styles.noteText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab reprehenderit iste aliquid, ullam velit ut temporibus repellendus totam earum facere id, nam omnis accusamus asperiores ipsum, placeat hic laudantium distinctio.</Text>
                                </View>

                                <View style={styles.roundButtonBg}>
                                    <ButtonFeedback rounded style={styles.roundButton} onPress={() => this.props.pressSubmit(3)}>
                                        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.roundButtonLabel}>
                                            RESUBMIT
                                        </Text>
                                    </ButtonFeedback>
                                </View>
                                {
                                    this.state.bottomView&&
                                    <View onLayout={this._measurePage.bind(this,'PostSubission')} />
                                }
                                
                            </View>
                        :
                        <View>
                            <ActivityIndicator style={[loader.centered,{height:100}]} size='small' />
                            <View onLayout={this._measurePage.bind(this,'PostSubission')} />
                        </View>
                    }
                </View>
                :
                null

            }
            </View>
        )
    }
}

export default connect(null, null)(ManOfTheMatchPostSubission)