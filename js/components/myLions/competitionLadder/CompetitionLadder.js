

'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ActivityIndicator,Alert} from 'react-native'
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
import GrayContainer from '../../global/GrayContainer'
import ExpertRank from  '../../global/ExpertRank'
import RankList from  '../../global/RankingList'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImageCircle from '../../utility/imageCircle'
import { replaceRoute, pushNewRoute } from '../../../actions/route'
import EYSFooter from '../../global/eySponsoredFooter'
import {getUserFullName} from  '../../utility/asyncStorageServices'
import { getAccessToken} from '../../utility/asyncStorageServices'
import {actionsApi} from  '../../utility/urlStorage'
import { service } from '../../utility/services'

import {createGroup,joinGroup,leaveGroup} from  '../../utility/apiasyncstorageservice/eyc3GroupsActions'
import { drillDown } from '../../../actions/content'
import { globalNav } from '../../../appNavigator'

import HeaderTitleWithModal from '../components/HeaderTitleWithModal'
import CreateWithModal from '../createGroup'
import JoinModal from '../joinGroup'
import PlayerScore from '../../global/playerScore'
import fetch from '../../utility/fetch'
import { shareTextWithTitle } from '../../utility/socialShare'
import { setPrivateLeagues} from '../../../actions/squad'

import DataModel from './defaultData'
const ButtonWithIcon = (props) => {
  let {iconName,title,style,onPress} = props
  let styleMore = style ? style : null
  return (
    <ButtonFeedback rounded style={[styles.button,styles.btnFavourites,styleMore]} onPress={onPress} >
      <Icon name={iconName} style={styles.btnFavouritesIcon} />
      <Text style={styles.btnFavouritesLabel}>
        {title}
      </Text>
    </ButtonFeedback>
  )
}
const  ShareButton = () => {
  return (
    <ButtonFeedback
      rounded label='Share'
      disabled = {true}
      style={[styles.button,styles.scoreCardShare]}>
      <Text  style={styles.scoreCardShareText}>SHARE</Text>
      <Icon name='md-share-alt' style={styles.scoreCardShareIcon} />
    </ButtonFeedback>
  )
}
const MyPride = (props) => {
  let { groupNameOnPress,createGroupOnPress,joinGroupOnPress,data} =props
  return (
    <View style={styles.prideContainer} >
      <View style={styles.prideTitleView}>
        <Text style={styles.prideTitleText}>MY PRIDE</Text>
      </View>
      <GroupAction createGroupOnPress={createGroupOnPress} joinGroupOnPress={joinGroupOnPress} />
      <GroupNameList onPress={groupNameOnPress} data={data} />
    </View>
  )
}
const GroupAction = ({createGroupOnPress,joinGroupOnPress}) => {
  return (
    <View style={styles.groupActionView}>
      <ButtonWithIcon  iconName  = {'md-people'} title = {'CREATE GROUP'} style={styles.grayBackgroundColor}
                       onPress={createGroupOnPress}/>
      <ButtonWithIcon  iconName  = {'md-person'} title = {'JOIN GROUP'} style={styles.grayBackgroundColor}
                       onPress={joinGroupOnPress}/>
    </View>
  )
}
class GroupName extends Component {
  btnClick = () => {
    this.props.onPress(this.props.data)
  }
  render() {
    let {data} = this.props
    return (
      <ButtonFeedback style={styles.groupName} onPress={this.btnClick}>
        <Text style={styles.groupNameText}>{data.name}</Text>
        <Icon name='md-arrow-dropright-circle' style={styles.playIcon} />
      </ButtonFeedback>
    )
  }
}
const GroupNameList = ({data,onPress}) => {
  return (
    <View style={styles.groupList}>
      {
        data.my_groups.map((item,index)=>{
          return(
            <GroupName onPress ={onPress} key={index} data={item} />
          )
        })
      }
    </View>
  )
}
const CompetitionCenter = () => {
  return (
    <View style={styles.CompetitionCenterView}>
      <ButtonWithIcon  iconName  = {'md-analytics'} title = {'COMPETITION CENTRE'} />
    </View>
  )
}

class CompetitionLadder extends Component {
  constructor (props) {
    super(props)
    this._scrollView = ScrollView
    this.isUnMounted = false
    this.state = {
      isLoaded: false,
      data: DataModel,
      isCreating:false,
      isJoining: false,
      createType:'ladder',
      joinType: 'ladder',
      isNetwork: true,
      modalData: null
    }
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
  /*get Data*/
  fetchData = (aceess_token,userID) => {
    let query = {
      aceess_token: aceess_token,
      id: userID
    }
    console.log(JSON.stringify(query))
    let optionsInfo = {
      url: actionsApi.eyc3CompetitionLadder,
      data: query,
      onAxiosStart: null,
      onAxiosEnd: null,
      method: 'post',
      channel: 'EYC3',
      isQsStringify:false,
      onSuccess: (res) => {
        console.log(res)
        if(res.data){
          this.setState({
            isLoaded:false,
            data:res.data
          })
        }
      },
      onError: (error)=>{
        this.setState({isLoaded:false})
        this._showError(error)
      },
      onAuthorization: () => {

      },
      isRequiredToken: true
    }
    this.setState({
      isLoaded:true,
    })
    service(optionsInfo)

  }
  /*call  api */

  /*router logic*/
  groupNameOnPress = (data) => {
    console.log('**********')
    console.log(data)
    this.props.drillDown(data,'myLionsGroupView')
  }

  /*groupAction*/
  createGroupOnPress = () => {
    console.log('createGroupOnPress')
    this.setState({
      isCreating: true,
      createType: 'create',
    })
  }
  joinGroupOnPress = () => {
    this.setState({
      isJoining: true,
      joinType: 'join',
    })
  }
  dissMissModel = () =>{
    this.setState({
      isCreating: false,
      isJoining: false,
      createType: 'ladder',
      joinType: 'ladder'
    })
  }
  /*modelInActions*/
  createGroupApi = (aceess_token,userID,group_name) => {
    let query = {
      aceess_token: aceess_token,
      id: userID,
      group_name: group_name
    }
    if(group_name===''||!group_name) {
      this._showError("group name Can't be empty")
      return
    }
    console.log(JSON.stringify(query))
    let optionsInfo = {
      url: actionsApi.eyc3CreateGroup,
      data: query,
      onAxiosStart: null,
      onAxiosEnd: null,
      method: 'post',
      channel: 'EYC3',
      isQsStringify:false,
      onSuccess: (res) => {
        console.log(res)
        this.setState({
          isLoaded:false,
        })
        if(res.data){
          this.setState({
            createType: 'success',
            modalData: res.data
          })
        }
      },
      onError: (error)=>{
        this.setState({isLoaded:false})
        this._showError(error)
      },
      onAuthorization: () => {

      },
      isRequiredToken: true
    }
    this.setState({
      isLoaded:true,
    })
    service(optionsInfo)
  }
  createButtonClick = (inputText) => {
    let {userProfile} = this.props
    getAccessToken().then(token=>{
      console.log(token)
      this.createGroupApi(token,userProfile.userID,inputText)
    })
  }
  joinButtonClick = () => {
    this.setState({
      joinType: 'success',
    })
  }

    measurePage(event) {
        console.log('measurePage')
        // console.log('event',event)
        const { x, y, width, height, } = event.nativeEvent.layout
        // console.log('x',x)
        // console.log('y',y)
        // console.log('width',width)
        // console.log('height',height)
        if(this.props.privateLeagues) {
          this._scrollView.scrollTo({ y: y, animated: true })
          this.props.setPrivateLeagues(false)
        }


    }

  render() {
    let { data ,isCreating, createType, isJoining, joinType ,modalData} = this.state
    let {userProfile} = this.props
    return (
      <Container theme={theme}>
        <View style={styles.container} >
          <LionsHeader
            back={true}
            title='MY LIONS'
            contentLoaded={true}
            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true })}} />
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
            <HeaderTitleWithModal title={'COMPETITION LADDER'}/>
            <GrayContainer >
              <ExpertRank data={userProfile}/>
              <RankList data={data} />
              <ShareButton />
            </GrayContainer>
            <View onLayout={this.measurePage.bind(this)}>
              <MyPride  data= {data} groupNameOnPress={this.groupNameOnPress}
                        createGroupOnPress={this.createGroupOnPress}
                        joinGroupOnPress={this.joinGroupOnPress}/>
            </View>
            <CompetitionCenter />
            <LionsFooter isLoaded={true} />
          </ScrollView>
          <LoginRequire/>
          <EYSFooter mySquadBtn={true}/>
          <CreateWithModal modalVisible = {isCreating } callbackParent ={this.dissMissModel} modalType={createType}
                           createButtonClick = {this.createButtonClick} errorBackButtonClick={this.dissMissModel}
                           data = {modalData}
          />
          <JoinModal modalVisible = {isJoining} callbackParent ={this.dissMissModel}  modalType={joinType}
                     joinButtonClick = {this.joinButtonClick} okButtonClick ={this.dissMissModel} />
        </View>
      </Container>
    )
  }
  componentDidMount() {
    let {userProfile} = this.props

    getAccessToken().then(token=>{
      console.log(token)
       this.fetchData(token,userProfile.userID)
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
    setPrivateLeagues:(privateLeagues)=>dispatch(setPrivateLeagues(privateLeagues)),
  }
}
export default connect((state) => {

  return {
    route: state.route,
    privateLeagues: state.squad.privateLeagues,
    userProfile:state.squad.userProfile
  }
}, bindAction)(CompetitionLadder)
CompetitionLadder.defaultProps = {

}
