

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
import { replaceRoute, pushNewRoute } from '../../../actions/route'
import EYSFooter from '../../global/eySponsoredFooter'

import { drillDown } from '../../../actions/content'
import { globalNav } from '../../../appNavigator'

import HeaderTitleWithModal from '../components/HeaderTitleWithModal'
import SquadModal from '../../global/squadModal'
import Versus from '../components/versus'
import Slider from '../../global/ZxSlider'


const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];

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
      replacementsSliderValue: '0',
      playStyleSliderValue: '0'
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
      replacementsSliderValue: value,
    })
  }
  onValuesChangeOther = (value) => {
    this.setState({
      playStyleSliderValue: value,
    })
  }
  saveOnPress = () =>{

  }
  iconPress =() => {
    this.setState({
      modalResults: true,
    })
  }
  render() {
    let { isLoaded ,dropDownValue, replacementsSliderValue,playStyleSliderValue} = this.state
    let {userProfile} = this.props
    return (
      <Container theme={theme}>
        <View style={styles.container}>
          <LionsHeader
            back={true}
            title='MY LIONS'
            contentLoaded={true}
            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true })}} />
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
            <HeaderTitleWithModal title={'SELECT TACTICS'} iconPress={this.iconPress}/>
            <Versus gameData={this.state.drillDownItem} userData={userProfile} />
            <SmallBox title={'STAR PLAYER'} >
              <ModalDropdown style={styles.dropDown}
                             options={DEMO_OPTIONS_1}
                             onSelect={this.dropDownOnSelect}>
                <View style={styles.dropDownSub}>
                  <Text style={styles.dropDownText}>{dropDownValue}</Text>
                  <Icon name='md-arrow-dropdown' style={styles.dropDownIcon} />
                </View>
              </ModalDropdown>
            </SmallBox>
            <SmallBox title={'REPLACEMENTS'} height={185}>
              <Slider onValuesChange={this.onValuesChange} value={0.5}/>
              <Text style={styles.ValueText}>{replacementsSliderValue}</Text>
            </SmallBox>
            <SmallBox title={'REPLACEMENTS'} height={185}>
              <Slider onValuesChange={this.onValuesChangeOther} value={0.5}/>
              <Text style={styles.ValueText}>{playStyleSliderValue}</Text>
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
            callbackParent={() => {}}>
            <View style={[styles.modalContent]}>
              <Text style={styles.modalContentTitleText}>RESULTS</Text>
              <Text style={styles.modalContentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in elit quam. Etiam ullamcorper neque eu lorem elementum, a sagittis sem ullamcorper. Suspendisse ut dui diam.</Text>
            </View>
          </SquadModal>
          <EYSFooter mySquadBtn={true}/>
        </View>
      </Container>
    )
  }
  componentDidMount() {
  }

  componentWillUnmount() {
    this.isUnMounted = true
  }
}


function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),
    replaceRoute:(route)=>dispatch(replaceRoute(route)),
  }
}
export default connect((state) => {
  console.log(state)
  return {
    route: state.route,
    drillDownItem: state.content.drillDownItem,
    userProfile:state.squad.userProfile,
    dropDownData: state.squad.teamData
  }
}, bindAction)(TacticsManger)
TacticsManger.defaultProps = {

}
