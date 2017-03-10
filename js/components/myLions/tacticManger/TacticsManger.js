

'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ActivityIndicator} from 'react-native'
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
import { replaceRoute, pushNewRoute } from '../../../actions/route'
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
   name:'10-Man' ,
   value: '10-man'
  },{
    name:'Balanced' ,
    value: 'balanced'
  },{
    name:'Running' ,
    value: 'running'
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
    this.isUnMounted = false
    this.state = {
      isLoaded: false,
      modalResults:false,
      drillDownItem: this.props.drillDownItem,
      dropDownValue: 'Select Player',
      replacementsSliderValue: 3,
      playStyleSliderValue: 1
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
  saveOnPress = () =>{

    let { dropDownValue, replacementsSliderValue,playStyleSliderValue} = this.state
    let {userProfile,teamToShow} = this.props
    let TacticData = localDataTactics[playStyleSliderValue]
    let ReplacementsData = localDataReplacements[replacementsSliderValue]

    
   let pacticsData = {
      starPlayer: dropDownValue,
      tactic: TacticData.value,
      replacements: ReplacementsData.value
    }
    this.props.setTacticsToSave (pacticsData)
  }
  iconPress =() => {
    this.setState({
      modalResults: !this.state.modalResults,
    })
  }
  handleDropDownData = (teamToShow) => {
    console.log('***************************8')
    console.log(teamToShow)

    let result = []
    if(!teamToShow.backs) return result
    teamToShow.backs.map(
      (item)=>{
        result.push(item.name)
      }
    )
    teamToShow.forwards.map((item)=>{
       result.push(item.name)
     })
     return result

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
  render() {
    let { isLoaded ,dropDownValue, replacementsSliderValue,playStyleSliderValue} = this.state
    let {userProfile,teamToShow} = this.props
    let TacticData = localDataTactics[playStyleSliderValue]
    let ReplacementsData = localDataReplacements[replacementsSliderValue]
    let dropDownData = this.handleDropDownData(teamToShow)
    return (
      <Container theme={theme}>
        <View style={styles.container}>
          <LionsHeader
            back={true}
            title='MY LIONS'
            contentLoaded={true}
            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true })}} />
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
            <HeaderTitleWithModal title={'SELECT TACTICS'} iconPress={this.iconPress} />
            <Versus gameData={this.state.drillDownItem} userData={userProfile} />
            <SmallBox title={'STAR PLAYER'} >
              <ModalDropdown style={styles.dropDown}
                             options={dropDownData}
                             onSelect={this.dropDownOnSelect}>
                <View style={styles.dropDownSub}>
                  <Text style={styles.dropDownText}>{dropDownValue}</Text>
                  <Icon name='md-arrow-dropdown' style={styles.dropDownIcon} />
                </View>
              </ModalDropdown>
            </SmallBox>
            <SmallBox title={'REPLACEMENTS'} height={185}>
              <Slider onValuesChange={this.onValuesChange} value={0.5}  valuesCount={6}/>
              <Text style={styles.ValueText}>{ReplacementsData.name}</Text>
            </SmallBox>
            <SmallBox title={'PLAY STYLE'} height={185}>
              <Slider onValuesChange={this.onValuesChangeOther} value={0.5} valuesCount={2}/>
              <Text style={styles.ValueText}>{TacticData.name}</Text>
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
              <Text style={styles.modalContentTitleText}>RESULTS</Text>
              <Text style={styles.modalContentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </Text>
            </View>
          </SquadModal>
          <EYSFooter mySquadBtn={true}/>
        </View>
      </Container>
    )
  }
  componentDidMount() {
    getEYC3FullPlayerList().then((data)=>{

    })
  }

  componentWillUnmount() {
    this.isUnMounted = true
  }
}


function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),
    replaceRoute:(route)=>dispatch(replaceRoute(route)),
    setTacticsToSave: (tactics)=>dispatch(setTacticsToSave(tactics)),
  }
}
export default connect((state) => {
  return {
    route: state.route,
    drillDownItem: state.content.drillDownItem,
    userProfile:state.squad.userProfile,
    dropDownData: state.squad.teamData,
    teamToShow: state.squad.teamToShow,
  }
}, bindAction)(TacticsManger)
TacticsManger.defaultProps = {

}
