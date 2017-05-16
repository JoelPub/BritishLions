'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View,ActivityIndicator, Platform, Text } from 'react-native'
import { Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import loader from '../../../../themes/loader-position'
import MatchMan from './matchMan'
import Toast from 'react-native-root-toast'
import { setMatchMan, getMatchMan } from '../../../utility/asyncStorageServices'
import ButtonNetwork from '../../../utility/buttonNetwork'

class ManOfTheMatchLanding extends Component {

    constructor(props) {
         super(props)
         this.selectedMan=null
         this.savedVote=null
         this.state={
            savedMan:null
         }
    }
    _measurePage(page,event) {
        if (__DEV__)console.log('_measurePage')
        const { x, y, width, height, } = event.nativeEvent.layout
        if (__DEV__)console.log('page',page)
        if (__DEV__)console.log('x',x)
        if (__DEV__)console.log('y',y)
        if (__DEV__)console.log('width',width)
        if (__DEV__)console.log('height',height)
        this.props.setHeight(y+50,'Landing')
    }

    _onPressPlayer(info) {
        if (__DEV__)console.log('_onPressPlayer: ', info)
        this.selectedMan=info
        if (__DEV__)console.log('this.selectedMan: ', this.selectedMan)
    }
    _onPressSubmit(){
        if(this.selectedMan===null) {
            let toast = Toast.show('PLEASE SELECT PLAYER', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
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
                            
                        }
                    })
        }
        else {
            

            if(Array.isArray(this.savedVote)){
                let i=this.savedVote.findIndex(v=>v.id===this.props.detail.id)
                if(i<0) {
                    this.savedVote.push({id:this.props.detail.id,current:this.selectedMan.id,previous:null})
                }
                else{
                    this.savedVote[i].current=this.selectedMan.id
                }
            }
            else {
                this.savedVote=[{id:this.props.detail.id,current:this.selectedMan.id,previous:null}]
            }
            this.props.setShowModal(true)
            setMatchMan(this.savedVote).then(()=>{
                this.props.setSubPage('post')
              })
        }
    }

    componentDidMount(){
        getMatchMan().then((data)=>{
            this.savedVote=JSON.parse(data)
            if(__DEV__)console.log('landing getMatchMan player',this.savedVote)
                if(Array.isArray(this.savedVote)) {
                    this.setState({
                        savedMan:this.savedVote.find(v=>v.id===this.props.detail.id)
                    })
                }            
        })
    }
    componentWillUnmount() {
      if(__DEV__)console.log('@@@landing componentWillUnmount')
    }
    
    render() {
        return (
               <View style={styles.wrapper}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>WHO'S YOUR MAN OF THE MATCH?</Text>
                    </View>
                    <View style={styles.desc}>
                        <Text style={styles.descText}>Vote for the player you think has been the stand out performer for the Lions in this match. After you have voted you will see the top 3 overall fan picks.</Text>
                    </View>
                    <MatchMan selectMan={this._onPressPlayer.bind(this)} preSelect={this.state.savedMan} detail={this.props.detail} />
                    <View style={styles.guther}>
                        <Text style={styles.noteText}>You get one vote for man of the match. But you may change your vote by resubmitting up until the end of the match.</Text>
                    </View>

                    <View style={styles.roundButtonBg}>
                        <ButtonNetwork rounded style={styles.roundButton} onPress={this._onPressSubmit.bind(this)}>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.roundButtonLabel}>
                                SUBMIT
                            </Text>
                        </ButtonNetwork>
                    </View>
                    <View onLayout={this._measurePage.bind(this,'Landing')} />
                </View>
            
        )
    }
}

export default connect(null, null)(ManOfTheMatchLanding)