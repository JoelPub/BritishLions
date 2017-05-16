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

const  IconHeader = ({onPress}) => {
  return (
    <View style={{flexDirection:'row-reverse', paddingHorizontal: 8,marginTop:5}} >
      <ButtonFeedback style={{width:30}}
                      onPress={onPress}>
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
          playerList: []
    }
  }
  iconPress = () => {
      this.setState({modalInfo: !this.state.modalInfo})
  }
  updateMadal = () =>{
    this.setState({
      modalInfo: !this.state.modalInfo
    })
  }
  mathHeight = (half_time,full_time,index) => {
   let  countHalf =  half_time.metres.length + half_time.passes.length + half_time.breaks.length + half_time.breaks.length
   let  countFull =  full_time.metres.length + full_time.passes.length + full_time.breaks.length + full_time.breaks.length
   //let  realyCount =  countHalf>= countFull ? countHalf : countFull
    let realCount = index ===0 ? countHalf : countFull
    return  realCount*50
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
          locked={false}
          initialPage={0}
          renderTabBar={() => <SetPlayerTabBar  style={{ paddingHorizontal:20}} />}
          tabBarActiveTextColor={'black'}
          onChangeTab = {this.onChangeTab}
        >
          <View tabLabel='HALF-TIME'>
            <IconHeader onPress={this.iconPress} />
            <View style={{ padding: 20,paddingTop:3}}>
              <OnFireItem title={'METRES'} data={on_fire.half_time.metres} playerData={playerList}/>
              <OnFireItem title={'PASSES'} data={on_fire.half_time.passes} playerData={playerList}/>
              <OnFireItem title={'BREAKS'} data={on_fire.half_time.breaks} playerData={playerList}/>
              <OnFireItem isLastItem={true} title={'TACKLES'} data={on_fire.half_time.tackles} playerData={playerList}/>
            </View>
          </View>
          <View tabLabel='FULL-TIME'>
            <IconHeader onPress={this.iconPress} />
            <View style={{ padding: 20,paddingTop:3}}>
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
      metres: [

      ],
      passes:[

      ],
      breaks:[

      ],
      tackles:[

      ],
    }
  }
}
