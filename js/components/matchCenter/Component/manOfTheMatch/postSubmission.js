'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, ActivityIndicator, ScrollView, Platform} from 'react-native'
import { Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import PlayersRankBox from '../../../global/playersRankBox'
import MatchMan from './matchMan'
import Toast from 'react-native-root-toast'
import { setMatchMan, getMatchMan } from '../../../utility/asyncStorageServices'
import ButtonNetwork from '../../../utility/buttonNetwork'

class ManOfTheMatchPostSubission extends Component {

    constructor(props) {
         super(props)
         this.selectedMan=null
         this.state = {
              savedMan:null,
              resubmit:false
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
        this.props.setHeight(y+50,'PostSubission')
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
                if(__DEV__)console.log('this.state.savedMan',this.state.savedMan)
                let i=this.savedVote.findIndex(v=>v.id===this.props.detail.id)
                if(__DEV__)console.log('i',i)
                if(i<0) {
                    this.savedVote.push({id:this.props.detail.id,current:this.selectedMan.id,previous:this.state.savedMan.current})
                }
                else{
                    this.savedVote.splice(i,1,{id:this.props.detail.id,current:this.selectedMan.id,previous:this.state.savedMan.current})
                }
            }
            else {
                this.savedVote=[{id:this.props.detail.id,current:this.selectedMan.id,previous:this.state.savedMan.current}]
            }
                if(__DEV__)console.log('this.savedVote',this.savedVote)

            this.props.setShowModal(true)

            setMatchMan(this.savedVote).then(()=>{
                this.setState({resubmit:true,savedMan:this.savedVote.find(v=>v.id===this.props.detail.id)},()=>{
                    this.setState({resubmit:false})
                })
            })
        }
    }
    componentDidMount(){
        getMatchMan().then((data)=>{
            this.savedVote=JSON.parse(data)
            if(__DEV__)console.log('post getMatchMan player',this.savedVote)
                if(Array.isArray(this.savedVote)) {
                    this.setState({
                        savedMan:this.savedVote.find(v=>v.id===this.props.detail.id)
                    })
                }
        })
    }

    render() {
        return (
                <View style={styles.wrapper}>
                    <View style={styles.guther}>
                        {
                            !this.state.resubmit&&<PlayersRankBox title='CURRENT FAN FAVOURITES' showModal={this.props.showModal}  detail={this.props.detail}/>
                        }
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>ARE YOU HAPPY WITH YOUR MAN OF THE MATCH?</Text>
                    </View>
                    <View style={styles.desc}>
                        <Text style={styles.descText}>The Lions Man of the Match as voted by you.</Text>
                    </View>
                    <MatchMan selectMan={this._onPressPlayer.bind(this)} preSelect={this.state.savedMan}   detail={this.props.detail} setSubPage={this.props.setSubPage} setShowModal={this.props.setShowModal}/>
                    <View style={styles.guther}>
                        <Text style={styles.noteText}>Vote for your man of the match now! You may change your vote by resubmitting up until the end of the match.</Text>
                    </View>

                    <View style={styles.roundButtonBg}>
                        <ButtonNetwork rounded style={styles.roundButton} onPress={this._onPressSubmit.bind(this)}>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.roundButtonLabel}>
                                RESUBMIT
                            </Text>
                        </ButtonNetwork>
                    </View>
                    <View onLayout={this._measurePage.bind(this,'PostSubission')} />

                </View>
        )
    }
}

export default connect(null, null)(ManOfTheMatchPostSubission)
