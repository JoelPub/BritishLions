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
import SquadModal from '../../../global/squadModal'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Scoreboard from './Components/Scoreboard'
import SetPlayerTabBar from  './Components/SetPlayerTabBar'


const  IconHeader = ({onPress,modalAble}) => {
  return (
    <View style={{flexDirection:'row-reverse'}} >
      <ButtonFeedback style={{width:30}}
                      onPress={onPress}
                      disabled={!modalAble}
      >

        <Icon name='ios-information-circle-outline' style={{color: styleVar.colorScarlet,fontSize: 22,lineHeight: 22}} />
      </ButtonFeedback>
    </View>
  )
}

class SetPlayer extends Component {

  constructor(props) {
    super(props)
    this.state = {
          modalInfo:false,
          h:0
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

  SortingData = (kicks) => {
    let points = {
      redPoints:[],
      blackPoints:[],
      whitePoints:[],
      bluePoints: []
    }
    kicks.opposition.conversions.details

  }
  callApi = () =>{
   if(__DEV__)console.log('setPlayerCallApi')
  }
  render() {
    let {isActive,modalAble} = this.props
   let { kicks, scrums,line_outs} = this.props.set_plays
    let Widefield = styleVar.deviceWidth===320 ? 180 : 202
    let rightPartWidth = {
      width: styleVar.deviceWidth-Widefield-40,
    }
     return (
      <View style={{marginTop:50,paddingTop:10,marginHorizontal:10,borderRadius:0,backgroundColor:'rgb(255,255,255)',  flex: 1,}}
      >
        <ScrollableTabView
          locked={false}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          initialPage={0}
          renderTabBar={() => <SetPlayerTabBar />}
          tabBarActiveTextColor={'black'}
        >
         <View tabLabel='KICKS'>
           <IconHeader onPress={this.iconPress} modalAble={modalAble}/>
           <View style={[styles.itemContainer]}  >
             <StadiumFigure
               redPoints={ kicks.bil.conversions.details}
               orangePoints = {kicks.bil.penalties.details}
               blackPoints = {kicks.opposition.conversions.details}
               bluePoints = {kicks.opposition.penalties.details}
               imageWith = {Widefield}
             />
             <View style={[styles.rightContainer,rightPartWidth]}>
               <Scoreboard isWithProportion={true}
                           oppositionScore = {kicks.bil.conversions}
                           bilScore = {kicks.bil.penalties}
               />
               <Scoreboard isWithProportion={true} isDown={true}
                           oppositionScore = {kicks.opposition.conversions}
                           bilScore = {kicks.opposition.penalties}
               />
             </View>
           </View>
         </View>
         <View tabLabel='SCRUMS'>
           <IconHeader onPress={this.iconPress} modalAble={modalAble}/>
            <View style={styles.itemContainer}  >
              <StadiumFigure
                redPoints={ scrums.bil.won.details}
                orangePoints = {scrums.bil.lost.details}
                blackPoints = {scrums.opposition.won.details}
                bluePoints = {scrums.opposition.lost.details}
                imageWith = {Widefield}

              />
              <View style={[styles.rightContainer,rightPartWidth]}>
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
            <IconHeader onPress={this.iconPress}  modalAble={modalAble} />
            <View style={styles.itemContainer}  >
              <StadiumFigure
                redPoints={ line_outs.bil.won.details}
                orangePoints = {line_outs.bil.lost.details}
                blackPoints = {line_outs.opposition.won.details}
                bluePoints = {line_outs.opposition.lost.details}
                imageWith = {Widefield}
              />
              <View style={[styles.rightContainer,rightPartWidth]}>
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
                  <SquadModal
                    modalVisible={this.state.modalInfo}
                    callbackParent={this.iconPress}>
                    <ScrollView style={[styles.modalContent]}>
                          <View>
                              <Text style={styles.modalContentTitleText}>MORE INFORMATION</Text>
                              <Text style={styles.modalContentText}>These screens will update every 2-5 minutes to indicate where various plays take place around the pitch.</Text>
                              <Text style={styles.modalContentText}>The Lions will always be running towards the top of the pitch graphic.</Text>
                              <Text style={styles.modalContentText}>Kicks: Indicates where Conversions and Penalties were taken, and if they were successful.</Text>
                              <Text style={styles.modalContentText}>Scrums: Displays where each team’s scrums have taken place on the pitch and if they were won.</Text>
                              <Text style={styles.modalContentText}>Lineouts: Displays where each team’s lineouts have taken place on the pitch and if they were won.</Text>
                          </View>
                    </ScrollView>
                  </SquadModal>
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
  modalAble: PropTypes.bool,
}
SetPlayer.defaultProps = {
  set_plays: {},
  isActive:false
}