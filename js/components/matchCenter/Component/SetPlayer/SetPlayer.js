'use strict'

import React, { Component ,PropTypes} from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity,
  ActivityIndicator, ScrollView,NativeModules,DeviceEventEmitter} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import StadiumFigure from '../StadiumFigure'



import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Scoreboard from './Components/Scoreboard'
import SetPlayerTabBar from  './Components/SetPlayerTabBar'


const  IconHeader = ({onPress}) => {
  return (
    <View style={{flexDirection:'row-reverse'}} >
      <ButtonFeedback style={{width:30}}
                      onPress={onPress}>
        <Icon name='ios-information-circle-outline' style={{color: styleVar.colorScarlet,fontSize: 22,lineHeight: 22}} />
      </ButtonFeedback>
    </View>
  )
}

class SetPlayer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      h:0
    }
  }

  SortingData = (kicks) => {
    let points = {
      redPoints:[],
      blackPoints:[],
      whitePoints:[],
      bluePoints: []
    }
    kicks.opposition.conversions.details

  }
  iconPress = () =>{
    DeviceEventEmitter.emit('matchCenter', 'setPlayer');
  }
  callApi = () =>{
   console.log('setPlayerCallApi')
  }
  render() {
    let {isActive} = this.props
   let { kicks, scrums,line_outs} = this.props.set_plays

    return (
      <View style={{marginTop:50,paddingTop:10,marginHorizontal:10,borderRadius:5,backgroundColor:'rgb(255,255,255)',  flex: 1,}}
      >
        <ScrollableTabView
          locked={false}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          initialPage={0}
          renderTabBar={() => <SetPlayerTabBar />}
          tabBarActiveTextColor={'black'}
        >
         <View tabLabel='KICKS'>
           <IconHeader onPress={this.iconPress} />
           <View style={styles.itemContainer}  >
             <StadiumFigure
               redPoints={ kicks.opposition.conversions.details}
               orangePoints = {kicks.opposition.penalties.details}
               blackPoints = {kicks.bil.conversions.details}
               bluePoints = {kicks.bil.penalties.details}
             />
             <View style={styles.rightContainer}>
               <Scoreboard isWithProportion={true}
                           oppositionScore = {kicks.opposition.conversions}
                           bilScore = {kicks.opposition.penalties}
               />
               <Scoreboard isWithProportion={true} isDown={true}
                           oppositionScore = {kicks.bil.conversions}
                           bilScore = {kicks.bil.penalties}

               />
             </View>
           </View>
         </View>
         <View tabLabel='SCRUMS'>
           <IconHeader />
            <View style={styles.itemContainer}  >
              <StadiumFigure
                redPoints={ scrums.opposition.won.details}
                orangePoints = {scrums.opposition.lost.details}
                blackPoints = {scrums.bil.won.details}
                bluePoints = {scrums.bil.lost.details}

              />
              <View style={styles.rightContainer}>
                <Scoreboard   titles={['WON','LOST']}
                              oppositionScore = { scrums.opposition.won}
                              bilScore =  {scrums.opposition.lost}
                />
                <Scoreboard isDown={true} titles={['WON','LOST']}
                            oppositionScore = { scrums.bil.won}
                            bilScore =  {scrums.bil.lost}
                />
              </View>
            </View>
         </View>
          <View tabLabel='LINEOUTS'>
            <IconHeader />
            <View style={styles.itemContainer}  >
              <StadiumFigure
                redPoints={ line_outs.opposition.won.details}
                orangePoints = {line_outs.opposition.lost.details}
                blackPoints = {line_outs.bil.won.details}
                bluePoints = {line_outs.bil.lost.details}
              />
              <View style={styles.rightContainer}>
                <Scoreboard titles={['WON','LOST']}
                            oppositionScore = { line_outs.opposition.won}
                            bilScore =  {line_outs.opposition.lost}
                />
                <Scoreboard isDown={true} titles={['WON','LOST']}
                            oppositionScore = { line_outs.bil.won}
                            bilScore =  {line_outs.bil.lost}
                />
              </View>
            </View>
          </View>
        </ScrollableTabView>
      </View>
    )
  }
  componentWillReceiveProps(nextProps) {
    if (__DEV__)console.log('setPlayer componentWillReceiveProps nextProps.isActive',nextProps.isActive)
    if (__DEV__)console.log('setPlayer componentWillReceiveProps this.props.isActive',this.props.isActive)
  }
  componentDidMount() {
    this.props.setHeight(600,'SetPlayer')

  }
  componentWillUnmount() {

  }
}

export default SetPlayer
SetPlayer.propTypes = {
  isActive:PropTypes.bool,
  set_plays:PropTypes.object,
}
SetPlayer.defaultProps = {
  set_plays: {},
  isActive:false
}