

'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ActivityIndicator,Alert,TouchableHighlight} from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import Swiper from 'react-native-swiper'

import theme from '../../../themes/base-theme'
import styles from './styles'
import shapes from '../../../themes/shapes'
import styleVar from '../../../themes/variable'
import loader from '../../../themes/loader-position'

import LoginRequire from '../../global/loginRequire'
import LionsHeader from '../../global/lionsHeader'
import LionsFooter from '../../global/lionsFooter'

import ModalDropdown from 'react-native-modal-dropdown';
import ImagePlaceholder from '../../utility/imagePlaceholder'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImageCircle from '../../utility/imageCircle'
import {getEYC3FullPlayerList} from '../../utility/apiasyncstorageservice/eyc3AsyncStorageService'
import { replaceRoute, pushNewRoute,popRoute } from '../../../actions/route'
import { setTacticsToSave } from '../../../actions/tactics'


import EYSFooter from '../../global/eySponsoredFooter'

import { drillDown } from '../../../actions/content'
import { globalNav } from '../../../appNavigator'

import HeaderTitleWithModal from '../components/HeaderTitleWithModal'
import SquadModal from '../../global/squadModal'
import Versus from '../components/versus'
import Slider from '../../global/ZxSlider'


const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];

const localDataTactics = [
  {
    name:'Running' ,
    value: 'running'
  }
  ,{
    name:'Balanced' ,
    value: 'balanced'
  },
  {
    name:'10-Man' ,
    value: '10-man'
  }
]
const localDataReplacements= [
  {
    name:'50 Minutes' ,
    value: '50'
  },{
    name:'55 Minutes' ,
    value: '55'
  },{
    name:'60 Minutes' ,
    value: '60'
  }, {
    name:'65 Minutes' ,
    value: '65'
  }, {
    name:'70 Minutes' ,
    value: '70'
  },{
    name:'75 Minutes' ,
    value: '75'
  },{
    name:'No Replacements' ,
    value: '80'
  }

]

class SmallBox extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
    render (){
      let{height}=this.props
      const dimensions = { height };
      return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{this.props.title}</Text>
          </View>
          <View style={[styles.smallBoxContent,dimensions]}>
            {this.props.children}
          </View>
        </View>
      )
    }
}
SmallBox.propTypes = {
  title: PropTypes.string.isRequired,
  height: React.PropTypes.number,
}

SmallBox.defaultProps = {
  height: 120,
};
class TacticsManger extends Component {
  constructor (props) {
    super(props)
    this._scrollView = ScrollView
    let dropDownValue = 'Select Player'
    let playStyleSliderValue = 1
    let replacementsSliderValue = 3
    if (__DEV__)console.log('this.props.tactics',this.props.tactics)
    if (this.props.tactics===null) {
      dropDownValue ='Select Player'
      playStyleSliderValue = 1
      replacementsSliderValue = 3

    }else {
      dropDownValue =this.props.tactics.starPlayer.info&&this.props.tactics.starPlayer.info.name?this.props.tactics.starPlayer.info.name:'Select Player'
      playStyleSliderValue = this.findDataTacticsLocation(this.props.tactics.tactic)
      replacementsSliderValue = this.findReplacementsLocation(this.props.tactics.replacements)
    }
    if (__DEV__)console.log(this.props.tactics)

    this.state = {
      isLoaded: false,
      modalResults:false,
      drillDownItem: this.props.drillDownItem,
      dropDownValue: dropDownValue,
      replacementsSliderValue: replacementsSliderValue,
      playStyleSliderValue: playStyleSliderValue
    }
  }
  /*get Data*/

  /*router logic*/

  dropDownOnSelect = (index,value) => {
    this.setState({
      dropDownValue: value,
    })
  }
  onValuesChange = (value) => {
    this.setState({
      replacementsSliderValue: Number(value),
    })
  }
  onValuesChangeOther = (value) => {
    this.setState({
      playStyleSliderValue: Number(value),
    })
  }
  findDataTacticsLocation =(value) => {
    switch(value)
    {
      case 'running':

        return 0
      case 'balanced':

        return 1
      case '10-man':

        return 2
      default:
        break
    }
  }
  findReplacementsLocation =(value) => {
    switch(value)
    {
      case '50':
        return 0
      case '55':
        return 1
      case '60':
        return 2
      case '65':
        return 3
      case '70':
        return 4
      case '75':
        return 5
      case '80':
        return 6
      default:
        break
    }
  }
  saveOnPress = () =>{

    let { dropDownValue, replacementsSliderValue,playStyleSliderValue} = this.state
    let {userProfile,teamToShow} = this.props
    let TacticData = localDataTactics[playStyleSliderValue]
    let ReplacementsData = localDataReplacements[replacementsSliderValue]
    let resultArr = this.handStartData(teamToShow)
    let starPlayer = null
    if (dropDownValue==='Select Player') {
      Alert.alert(
        'Warning',
        'Please select a star player',
        [{text: 'Dismiss'}]
      )
      return
    }else {
      if (__DEV__)console.log(resultArr)
      starPlayer = resultArr.find((item)=>item.info!==null&&item.info.name===dropDownValue)
      if (__DEV__)console.log('11111111111')
    }

   let pacticsData = {
      starPlayer: starPlayer,
      tactic: TacticData.value,
      replacements: ReplacementsData.value
    }
    this.props.setTacticsToSave (pacticsData)
    this.props.popRoute()

  }
  iconPress =() => {
    this.setState({
      modalResults: !this.state.modalResults,
    })
  }
  handleDropDownData = (teamToShow) => {
    if (__DEV__)console.log('***************************8')
    if (__DEV__)console.log(teamToShow)

    let result = []
    if(!teamToShow.backs) return result
    teamToShow.backs.map(
      (item)=>{
        if(item.info&&item.info.name) result.push(item.info.name)
      }
    )
    teamToShow.forwards.map((item)=>{
       if(item.info&&item.info.name) result.push(item.info.name)
     })
     return result

  }
  _showError(error) {
    if(!this.state.isNetwork) return

    if(error === 'Please make sure that you\'re connected to the network.') {
      this.setState({
        isNetwork: false
      })
    }
    if(error !== ''){
      Alert.alert(
        'An error occured',
        error,
        [{text: 'Dismiss'}]
      )
    }
  }
  handStartData = (teamToShow) => {
    let result = []
    if(!teamToShow.backs) return result
    teamToShow.backs.map(
      (item)=>{
        result.push(item)
      }
    )
    teamToShow.forwards.map((item)=>{
      result.push(item)
    })
    return result
  }
  renderRow =(rowData, rowID, highlighted) =>{
    let evenRow = rowID % 2;
    return (
      <View>
          <Text style={[styles.rowText, highlighted && styles.highlightedRowText]}>
            {rowData}
          </Text>
        </View>
    )
  }
  render() {
    let { isLoaded ,dropDownValue, replacementsSliderValue,playStyleSliderValue} = this.state
    let {userProfile,teamToShow,tactics} = this.props
    let TacticData = localDataTactics[playStyleSliderValue]
    let ReplacementsData = localDataReplacements[replacementsSliderValue]
    let dropDownData = this.handleDropDownData(teamToShow)
    let TacticDataValue = playStyleSliderValue/2
    let ReplacementsDataValue = replacementsSliderValue/6
    return (
      <Container theme={theme}>
        <View style={styles.container}>
          <LionsHeader
            back={true}
            title='MY LIONS'
            contentLoaded={true}
            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true })}} />

          <View style={styles.pageTitle}>
            <Text style={styles.pageTitleText}>SELECT TACTICS</Text>
            <ButtonFeedback
              style={styles.pageTitleBtnIconRight}
              onPress={this.iconPress}>
              <Icon name='ios-information-circle-outline' style={styles.pageTitleBtnIcon} />
            </ButtonFeedback>
          </View>
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
            <Versus gameData={this.state.drillDownItem} userData={userProfile} />
            <SmallBox title={'STAR PLAYER'} >
              <ModalDropdown style={styles.dropDown}
                             options={dropDownData}
                             onSelect={this.dropDownOnSelect}
                             dropdownStyle={styles.dropDownList}
                             renderRow={this.renderRow}
              >
                <View style={styles.dropDownSub}>
                  <Text style={styles.dropDownText}>{dropDownValue}</Text>
                  <Icon name='md-arrow-dropdown' style={styles.dropDownIcon} />
                </View>
              </ModalDropdown>
            </SmallBox>
            <SmallBox title={'REPLACEMENTS'} height={185}>
              <Slider onValuesChange={this.onValuesChange} value={ReplacementsDataValue}  valuesCount={6}/>
              <Text style={styles.ValueText}>{ReplacementsData.name.toUpperCase()}</Text>
            </SmallBox>
            <SmallBox title={'PLAY STYLE'} height={185}>
              <Slider onValuesChange={this.onValuesChangeOther} value={TacticDataValue} valuesCount={2}/>
              <Text style={styles.ValueText}>{TacticData.name.toUpperCase()}</Text>
            </SmallBox>
            <View style={styles.saveContainer}>
              <ButtonFeedback style={styles.saveBtn} onPress={this.saveOnPress}>
                <Text style={styles.saveText}>SAVE</Text>
              </ButtonFeedback>
            </View>
            <LionsFooter isLoaded={true} />
          </ScrollView>
          <LoginRequire/>
          <SquadModal
            modalVisible={this.state.modalResults}
            callbackParent={this.iconPress}>
            <View style={[styles.modalContent]}>
              <Text style={styles.modalContentTitleText}>SELECT TACTICS</Text>
              
              <Text style={styles.modalContentText}>Select your tactics to best defeat your opponent.</Text>

              <Text style={styles.modalContentText}>Boost Player – Select your player of the match.</Text>

              <Text style={styles.modalContentText}>Replacements – Indicate the time you would like to use your replacements.</Text>
              
              <Text style={styles.modalContentText}>Playing Style – Select the style of rugby you would like to play in this match.</Text>

              <Text style={[styles.modalContentText, styles.modalContentText2]}>Select the type of Rugby you wish to play in this match these are: </Text>
              <Text style={styles.modalContentText}>Running - Using pace and fitness to keep the ball alive through continuous and quick phases</Text>
              <Text style={styles.modalContentText}>10-man - Utilising the strength of the forwards and kickers to keep ball possession up front</Text>
              <Text style={styles.modalContentText}>Balanced - a mixture of the other two</Text>
            </View>
          </SquadModal>
          <EYSFooter mySquadBtn={true}/>
        </View>
      </Container>
    )
  }
}


function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),
    replaceRoute:(route)=>dispatch(replaceRoute(route)),
    setTacticsToSave: (tactics)=>dispatch(setTacticsToSave(tactics)),
    popRoute :(route)=>dispatch(popRoute(route))
  }
}
export default connect((state) => {
  if (__DEV__)console.log(state)
  return {
    route: state.route,
    drillDownItem: state.content.drillDownItem,
    userProfile:state.squad.userProfile,
    dropDownData: state.squad.teamData,
    teamToShow: state.squad.teamToShow,
    tactics: state.tactics.tacticsData
  }
}, bindAction)(TacticsManger)
TacticsManger.defaultProps = {

}
