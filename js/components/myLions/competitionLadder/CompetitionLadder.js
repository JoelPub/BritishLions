

'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ActivityIndicator,Alert,DeviceEventEmitter} from 'react-native'
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
import SquadModal from '../../global/squadModal'
import CreateWithModal from '../createGroup'
import JoinModal from '../joinGroup'
import PlayerScore from '../../global/playerScore'
import fetch from '../../utility/fetch'
import { shareTextWithTitle } from '../../utility/socialShare'
import { setPrivateLeagues} from '../../../actions/squad'
import RatingPopUp from '../../global/ratingPopUp'
import Toast from 'react-native-root-toast'



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
const  ShareButton = ({onPress}) => {
  return (
    <ButtonFeedback
      rounded label='Share'
      style={[styles.button,styles.scoreCardShare]} onPress={onPress}>
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
        <Text style={styles.prideTitleText}>PRIVATE LEAGUES</Text>
      </View>
      <GroupAction createGroupOnPress={createGroupOnPress} joinGroupOnPress={joinGroupOnPress} />
      {
        data.my_groups&&data.my_groups.length!==0 ?
          <GroupNameList onPress={groupNameOnPress} data={data} /> :null

      }
    </View>
  )
}
const GroupAction = ({createGroupOnPress,joinGroupOnPress}) => {
  return (
    <View style={styles.groupActionView}>
      <ButtonWithIcon  iconName  = {'md-people'} title = {'CREATE LEAGUE'} style={styles.grayBackgroundColor}
                       onPress={createGroupOnPress}/>
      <ButtonWithIcon  iconName  = {'md-person'} title = {'JOIN LEAGUE'} style={styles.grayBackgroundColor}
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
const CompetitionCenter = ({onPress}) => {
  return (
    <View style={styles.CompetitionCenterView} >
      <ButtonWithIcon  iconName  = {'md-analytics'} title = {'COMPETITION CENTRE'} onPress={onPress} />
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
      modalData: null,
      joinModalData:null,
      modalInfo: false,
      modalRate: false
    }
    this.subscription = null
    this.subscriptionRate = null
  }
  _showError(error) {
    if(!this.state.isNetwork) return

    if(error === 'Please make sure that you\'re connected to the network.') {
      this.setState({
        isNetwork: false
      })
    }
    let toast = Toast.show('An error occured', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
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
  /*get Data*/
  fetchData = (aceess_token,userID) => {
    let {userProfile} = this.props
    let query = {
      aceess_token: aceess_token,
      id: userID,
      first_name:userProfile.firstName,
      last_name:userProfile.lastName,
    }
    if (__DEV__)console.log(JSON.stringify(query))
    let optionsInfo = {
      url: actionsApi.eyc3CompetitionLadder,
      data: query,
      onAxiosStart: null,
      onAxiosEnd: null,
      method: 'post',
      channel: 'EYC3',
      isQsStringify:false,
      onSuccess: (res) => {
        if (__DEV__)console.log(res)
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
    if (__DEV__)console.log('**********')
    if (__DEV__)console.log(data)
    this.props.drillDown(data,'myLionsGroupView')
  }

  /*groupAction*/
  createGroupOnPress = () => {
    if (__DEV__)console.log('createGroupOnPress')
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
    if (__DEV__)console.log('dissMissModel')
    this.setState({
      isCreating: false,
      isJoining: false,
      createType: 'ladder',
      joinType: 'ladder'
    })
  }
  iconPress = () => {
    this.setState({modalInfo: !this.state.modalInfo})
  }
  popupRating = (v) => {
    if(__DEV__)console.log('popupRating',v)
    if(v===false) {
      this.setState({modalRate:false})
    }
    else if(v===true){
      this.setState({modalRate:false},()=>{
        this.setState({modalRate:true})
      })
    }
  }
  /*modelInActions*/
  createGroupApi = (aceess_token,userID,group_name) => {
    let query = {
      aceess_token: aceess_token,
      id: userID,
      group_name: group_name,
      first_name:this.props.userProfile.firstName,
      last_name:this.props.userProfile.lastName,
    }
    if(group_name===''||!group_name) {
      this._showError("League Name can't be empty")
      return
    }
    if (__DEV__)console.log(JSON.stringify(query))
    let optionsInfo = {
      url: actionsApi.eyc3CreateGroup,
      data: query,
      onAxiosStart: null,
      onAxiosEnd: null,
      method: 'post',
      channel: 'EYC3',
      isQsStringify:false,
      onSuccess: (res) => {
        if (__DEV__)console.log(res)
        this.setState({
          isLoaded:false,
        })
        if(res.data){
          if(res.data.success === "true"){
              this.setState({
                createType: 'success',
                modalData: res.data
              })
          }else{
              this.setState({
                createType: 'error',
                modalData: res.data
              })
          }
          if (__DEV__)console.log('去更新UI')
          this.updateDataAndUI()
        }else {
          this.setState({
            createType: 'error',

          })
        }
      },
      onError: (error)=>{
        if (__DEV__)console.log(error)
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
  /*modelInActions*/
  joinGroupApi = (aceess_token,userID,invitation_code) => {
    let query = {
      aceess_token: aceess_token,
      id: userID,
      invitation_code: invitation_code,
      first_name:this.props.userProfile.firstName,
      last_name:this.props.userProfile.lastName,
    }
    if(invitation_code===''||!invitation_code) {
      this._showError("invitation code Can't be empty")
      return
    }
    if (__DEV__)console.log(JSON.stringify(query))
    let optionsInfo = {
      url: actionsApi.eyc3JoinGroup,
      data: query,
      onAxiosStart: null,
      onAxiosEnd: null,
      method: 'post',
      channel: 'EYC3',
      isQsStringify:false,
      onSuccess: (res) => {
        if (__DEV__)console.log(res)
        this.setState({
          isLoaded:false,
        })
        if(res.data.success ==='true'){
          this.setState({
              joinType: 'success',
            joinModalData: res.data
          })
          this.updateDataAndUI()
        }else {
          this.setState({
            joinType: 'error',
            joinModalData:res.data
          })
        }
      },
      onError: (error)=>{
        if (__DEV__)console.log(error)
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
      if (__DEV__)console.log(token)
      this.createGroupApi(token,userProfile.userID,inputText)
    })
  }
  joinButtonClick = (inputText) => {
    let {userProfile,netWork} = this.props
    if(netWork.connectionInfo==='NONE'){
      this.showNetError()
      return
    }
    getAccessToken().then(token=>{
      if (__DEV__)console.log(token)
      this.joinGroupApi(token,userProfile.userID,inputText)
    })
  }
  shareClick = () => {
    let { data } = this.state
    this.props.drillDown(data,'myLionsCompetitionCentreShare')
  }
    measurePage(event) {
        if (__DEV__)console.log('measurePage')
        // if (__DEV__)console.log('event',event)
        const { x, y, width, height, } = event.nativeEvent.layout
        // if (__DEV__)console.log('x',x)
        // if (__DEV__)console.log('y',y)
        // if (__DEV__)console.log('width',width)
        // if (__DEV__)console.log('height',height)
        if(this.props.privateLeagues) {
          this._scrollView.scrollTo({ y: y, animated: true })
          this.props.setPrivateLeagues(false)
        }


    }
  navToCompetitionCentre = () => {
    if (__DEV__)console.log('navToCompetitionCentre')
    this.props.pushNewRoute('myLionsCompetitionCentre')
  }
  showNetError  = ()=> {
    Alert.alert(
      'An error occured',
      'Please make sure that you\'re connected to the network.',
      [{text: 'Dismiss'}]
    )
  }
  errorBackButtonClick = () => {
    this.setState({
      isCreating: true,
      createType: 'create',
    })
  }
  render() {
    let { data ,isCreating, createType, isJoining, joinType ,modalData,joinModalData} = this.state
    let {userProfile} = this.props
   // if (__DEV__)console.log(userProfile)
     if (__DEV__)console.log(data)
    return (
      <Container theme={theme}>
        <View style={styles.container} >
          <LionsHeader
            back={true}
            title='MY LIONS'
            contentLoaded={true}
            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true })}} />
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
            <HeaderTitleWithModal title={'LEADERBOARD'} iconPress={this.iconPress}/>
            <GrayContainer >
              <ExpertRank data={userProfile}/>
              <RankList data={data} />
              <ShareButton onPress={this.shareClick} />
            </GrayContainer>
            <View onLayout={this.measurePage.bind(this)}>
              <MyPride  data= {data} groupNameOnPress={this.groupNameOnPress}
                        createGroupOnPress={this.createGroupOnPress}
                        joinGroupOnPress={this.joinGroupOnPress}/>
            </View>
            <CompetitionCenter onPress={this.navToCompetitionCentre}/>
            <LionsFooter isLoaded={true} />
          </ScrollView>
          <SquadModal
            modalVisible={this.state.modalInfo}
            callbackParent={this.iconPress}>
            <ScrollView style={[styles.modalContent]}>
              <Text style={styles.modalContentTitleText}>LEADERBOARD</Text>
              <Text style={styles.modalContentText}>This Leaderboard displays your rank against all other users. Your rank and point score will be displayed alongside the Top 5 Global users. Please note the rank will not refresh in real time.</Text>
              <Text style={styles.modalContentText}>Share your rank on social media using the ‘Share’ button.</Text>
              <Text style={styles.modalContentText}>Create a private league for you and your friends by selecting “Create Private League” to receive a personalised code to share. If you have received a join code from a friend or one of the Lions sponsors you can join their league by selecting “Join Private League.”</Text>
              <Text style={styles.modalContentText}>Access your private leagues at the bottom of this screen.</Text>
            </ScrollView>
          </SquadModal>
          {this.state.modalRate&&<RatingPopUp callbackParent={this.popupRating}/>}
          <EYSFooter mySquadBtn={true}/>
          <CreateWithModal modalVisible = {isCreating } callbackParent ={this.dissMissModel} modalType={createType}
                           createButtonClick = {this.createButtonClick} errorBackButtonClick={this.errorBackButtonClick}
                           data = {modalData}
          />
          <JoinModal modalVisible = {isJoining} callbackParent ={this.dissMissModel}  modalType={joinType}
                     joinButtonClick = {this.joinButtonClick}
                     okButtonClick ={this.dissMissModel}
                     data={joinModalData}

          />
        </View>
      </Container>
    )
  }
  updateDataAndUI = () =>{
    let {userProfile} = this.props
    getAccessToken().then(token=>{
      if (__DEV__)console.log(token)
      this.fetchData(token,userProfile.userID)
    })
  }
  componentDidMount() {
    let {userProfile} = this.props
    getAccessToken().then(token=>{
      if (__DEV__)console.log(token)
       this.fetchData(token,userProfile.userID)
    })
    this.subscription = DeviceEventEmitter.addListener('leaveLeague',this.updateDataAndUI)
    this.subscriptionRate = DeviceEventEmitter.addListener('ladderratingpopup',this.popupRating)
  }
  componentWillUnmount() {
    this.isUnMounted = true
    this.subscription.remove()
    this.subscriptionRate.remove()
  }
}
function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),
    replaceRoute:(route)=>dispatch(replaceRoute(route)),
    setPrivateLeagues:(privateLeagues)=>dispatch(setPrivateLeagues(privateLeagues)),
    pushNewRoute: (route)=>dispatch(pushNewRoute(route)),
  }
}
export default connect((state) => {
  if (__DEV__)console.log(state)
  return {
    route: state.route,
    privateLeagues: state.squad.privateLeagues,
    userProfile:state.squad.userProfile,
    netWork: state.network,
  }
}, bindAction)(CompetitionLadder)
CompetitionLadder.defaultProps = {

}
