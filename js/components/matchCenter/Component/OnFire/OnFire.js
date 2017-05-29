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
import Triangle from '../../..//global/Triangle'
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
          modalAble:true,
          page:0,
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
          <View style={styles.tabBtnWrapper}>
            <View style={styles.tabBtnPos}>
              <ButtonFeedback style={[this.state.page===0?styles.activeBtn:styles.inactiveBtn,styles.tabBtn]} onPress={()=>this.setState({page:0})}>
                <Text style={styles.btnText}> HALF-TIME</Text>
              </ButtonFeedback>
              <Triangle
                width={24}
                height={12}
                color={this.state.page===0? 'rgb(38,38,38)' : 'transparent'}
                direction={'down'}
                style={{marginTop:-1}}
              />
            </View>
            <View style={styles.tabBtnPos}>
              <ButtonFeedback style={[this.state.page===1?styles.activeBtn:styles.inactiveBtn,styles.tabBtn]} onPress={()=>this.setState({page:1})}>
                <Text style={styles.btnText}> FULL-TIME</Text>
              </ButtonFeedback>
              <Triangle
                width={24}
                height={12}
                color={this.state.page===1? 'rgb(38,38,38)' : 'transparent'}
                direction={'down'}
                style={{marginTop:-1}}
              />
            </View>
          </View>
          
          {
            this.state.page===0&&
            <View tabLabel='HALF-TIME'>
              <IconHeader onPress={this.iconPress} modalAble={this.state.modalAble}/>
              <View style={{ padding: 20,paddingTop:3}}>
                <OnFireItem title={'METRES'} data={on_fire.half_time.metres} playerData={playerList}/>
                <OnFireItem title={'PASSES'} data={on_fire.half_time.passes} playerData={playerList}/>
                <OnFireItem title={'BREAKS'} data={on_fire.half_time.breaks} playerData={playerList}/>
                <OnFireItem isLastItem={true} title={'TACKLES'} data={on_fire.half_time.tackles} playerData={playerList}/>
              </View>
            </View>
          }         
          {
            this.state.page===1&&            
            <View tabLabel='FULL-TIME'>
              <IconHeader onPress={this.iconPress} modalAble={this.state.modalAble}/>
              <View style={{ padding: 20,paddingTop:3}}>
                <OnFireItem title={'METRES'} data={on_fire.full_time.metres} playerData={playerList} isHalfTime={false}/>
                <OnFireItem title={'PASSES'} data={on_fire.full_time.passes} playerData={playerList} isHalfTime={false}/>
                <OnFireItem title={'BREAKS'} data={on_fire.full_time.breaks} playerData={playerList} isHalfTime={false}/>
                <OnFireItem isLastItem={true} title={'TACKLES'} data={on_fire.full_time.tackles} playerData={playerList} isHalfTime={false}/>
              </View>
            </View>
          }
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
