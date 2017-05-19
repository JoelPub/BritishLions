'use strict'

import React, { Component ,PropTypes} from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules,DeviceEventEmitter} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import { getSoticFullPlayerList} from '../../../utility/apiasyncstorageservice/soticAsyncStorageService'
import {searchPlayer} from '../../../myLions/components/searchPlayer'
import Data from '../../../../../contents/unions/data'
import SquadModal from '../../../global/squadModal'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import SetPlayerTabBar from  '../SetPlayer/Components/SetPlayerTabBar'

import OnFireItem from  './components/OnFireItem'

const  IconHeader = ({onPress,modalAble}) => {
  return (
    <View style={{flexDirection:'row-reverse', paddingHorizontal: 8,marginTop:5}} >
      <ButtonFeedback style={{width:30,backgroundColor:'transparent'}}
                      onPress={onPress}
                      disabled={!modalAble}>
        <Icon name='ios-information-circle-outline' style={{color: styleVar.colorScarlet,fontSize: 22,lineHeight: 22}} />
      </ButtonFeedback>
    </View>
  )
}

class OnFire extends Component {

  constructor(props) {
    super(props)
    this.state = {
          modalInfo:false,
          h:0,
          playerList: [],
          modalAble:true
    }
    this.currentPosition=0
  }
  iconPress = () => {
      this.setState({modalInfo: !this.state.modalInfo,modalAble:false},()=>{
        setTimeout(()=>this.setState({modalAble:true}),500)
      })
  }
  mathHeight = (half_time,full_time,index) => {
    let halfLength  = half_time.metres ? half_time.metres.length : 0
    let halfLength2  = half_time.passes ? half_time.passes.length : 0
    let halfLength3  = half_time.breaks ? half_time.breaks.length : 0
    let halfLength4  = half_time.tackles ? half_time.tackles.length : 0

    let fullLength  = full_time.metres ? full_time.metres.length : 0
    let fullLength2  = full_time.passes ? full_time.passes.length : 0
    let fullLength3  = full_time.breaks ? full_time.breaks.length : 0
    let fullLength4  = full_time.tackles ? full_time.tackles.length : 0

   let  countHalf =  this.dellLength(halfLength) + this.dellLength(halfLength2) +this.dellLength(halfLength3)+this.dellLength(halfLength4)
   let  countFull =  this.dellLength(fullLength)+  + this.dellLength(fullLength2) + this.dellLength(fullLength3) + this.dellLength(fullLength4)
   //let  realyCount =  countHalf>= countFull ? countHalf : countFull
    let realCount = index ===0 ? countHalf : countFull
    return  realCount*50
  }
  dellLength = (length) =>{
    let realLength = length === 0 ? 1 : length
    return realLength
  }
  onChangeTab = (item) =>{
    let { on_fire } =this.props
    let height = this.mathHeight(on_fire.half_time,on_fire.full_time,item.i)
   if(item.i===0){

     this.props.setHeight(height+80+320,'OnFire')
   }
    if(item.i===1){
      this.props.setHeight(height+80+320,'OnFire')
    }
  }
  render() {
   let { on_fire } =this.props
    let {playerList} =  this.state
    return (
      <View style={{marginTop:50,paddingTop:10,backgroundColor:'rgb(255,255,255)',  flex: 1,}}
      >
        <ScrollableTabView
          locked={true}
          initialPage={0}
          renderTabBar={() => <SetPlayerTabBar  style={{ paddingHorizontal:20}} />}
          tabBarActiveTextColor={'black'}
          onChangeTab = {this.onChangeTab}
        >
          <View tabLabel='HALF-TIME'>
            <IconHeader onPress={this.iconPress} modalAble={this.state.modalAble}/>
            <View style={{ padding: 20,paddingTop:3}}    {...this._panResponder.panHandlers}>
              <OnFireItem title={'METRES'} data={on_fire.half_time.metres} playerData={playerList}/>
              <OnFireItem title={'PASSES'} data={on_fire.half_time.passes} playerData={playerList}/>
              <OnFireItem title={'BREAKS'} data={on_fire.half_time.breaks} playerData={playerList}/>
              <OnFireItem isLastItem={true} title={'TACKLES'} data={on_fire.half_time.tackles} playerData={playerList}/>
            </View>
          </View>
          <View tabLabel='FULL-TIME'>
            <IconHeader onPress={this.iconPress} modalAble={this.state.modalAble}/>
            <View style={{ padding: 20,paddingTop:3}}    {...this._panResponder.panHandlers}>
              <OnFireItem title={'METRES'} data={on_fire.full_time.metres} playerData={playerList}/>
              <OnFireItem title={'PASSES'} data={on_fire.full_time.passes} playerData={playerList}/>
              <OnFireItem title={'BREAKS'} data={on_fire.full_time.breaks} playerData={playerList}/>
              <OnFireItem isLastItem={true} title={'TACKLES'} data={on_fire.full_time.tackles} playerData={playerList} />
            </View>
          </View>
        </ScrollableTabView>
                  <SquadModal
                    modalVisible={this.state.modalInfo}
                    callbackParent={this.iconPress}>
                    <ScrollView style={[styles.modalContent]}>
                          <View>
                              <Text style={styles.modalContentTitleText}>MORE INFORMATION</Text>
                              <Text style={styles.modalContentText}>On-fire displays the top three players from the Lions team based on their performance in the following categories; Metres gained, Successful passes, Successful breaks, and Tackles made. A player who is performing above their historical average is marked with a red star.</Text>
                          </View>
                    </ScrollView>
                  </SquadModal>
      </View>
    )
  }
  componentDidMount() {
    let { on_fire } =this.props
    let height = this.mathHeight(on_fire.half_time,on_fire.full_time,0)
    if(__DEV__)console.log('componentDidMount')
    if(__DEV__)console.log(height)
    this.props.setHeight(height+80+320,'OnFire')
    getSoticFullPlayerList().then((playerList)=>{
      if(__DEV__)console.log('**************************8')
      if(__DEV__)console.log(playerList)
      this.setState({
        playerList:playerList
      })
    })

    if(__DEV__)console.log('ROY OF FIRE:', on_fire)
  }
  componentWillMount() {
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponderCapture: this._handleStartShouldSetPanResponderCapture,
        // onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        // onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        // onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handlePanResponderMove.bind(this),
        onPanResponderRelease: this._handlePanResponderEnd.bind(this),
        onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
        
      })
  }
  _handleStartShouldSetPanResponderCapture(e, gestureState) {
     if (__DEV__)console.log('_handleStartShouldSetPanResponderCapture e',e.target)     
     if (__DEV__)console.log('return true')
        return true
  }
  _handlePanResponderMove(e, gestureState) {
       if (__DEV__)console.log('@@@@@_handlePanResponderMove gestureState',gestureState)
       if(Math.abs(gestureState.dy)>0&&Platform.OS==='android') {
            this.currentPosition=this.currentPosition-gestureState.dy/10
            if (__DEV__)console.log('@@@@@this.currentPosition',this.currentPosition)
            this.props.scrollView.scrollTo({y:this.currentPosition,animated:true})
       }
       if (__DEV__)console.log('return true')
        return true
    }
  _handlePanResponderEnd(e, gestureState) {
     if (__DEV__)console.log('_handlePanResponderEnd gestureState',gestureState)
     if(Math.abs(gestureState.dx)>Math.abs(gestureState.dy)) {
     //      let index = this._findID(this._items, this.props.article.id)
          // let rtl=gestureState.dx<0?false:true
          // if (__DEV__)console.log('rtl',rtl)
          this.props.changePage(gestureState.dx<0?1:-1)
     //      let item = rtl?this._items[index - 1]:this._items[index+1]
     //      if(item) {
     //          this.props.drillReplace(item, 'newsDetailsSub', false,false,rtl)
     //      }  
     }
     if (__DEV__)console.log('return true')
      return true
  }
  componentWillUnmount() {
      if(__DEV__)console.log('@@@OnFire componentWillUnmount')

  }

  componentWillReceiveProps(nextProps) {
   // if (__DEV__)console.log('onFire componentWillReceiveProps nextProps.isActive',nextProps.isActive)
   // if (__DEV__)console.log('onFire componentWillReceiveProps this.props.isActive',this.props.isActive)
    if(nextProps.on_fire!==this.props.on_fire){

    }

  }
}
export default OnFire

OnFire.propTypes = {
  on_fire:PropTypes.object,
}
OnFire.defaultProps = {
  on_fire: {
    half_time: {
      metres: [

      ],
      passes:[

      ],
      breaks:[

      ],
      tackles:[

      ],
    },
    full_time: {

    }
  }
}
