

'use strict'

import React, { Component } from 'react'
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
import ImagePlaceholder from '../../utility/imagePlaceholder'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImageCircle from '../../utility/imageCircle'
import { getAccessToken} from '../../utility/asyncStorageServices'
import {actionsApi} from  '../../utility/urlStorage'
import { service } from '../../utility/services'

import { getGroupInfo } from '../../utility/apiasyncstorageservice/eyc3GroupsActions'
import { replaceRoute, pushNewRoute ,popRoute} from '../../../actions/route'
import EYSFooter from '../../global/eySponsoredFooter'

import HeaderTitleWithModal from '../components/HeaderTitleWithModal'
import GrayContainer from '../../global/GrayContainer'
import ExpertRank from  '../../global/ExpertRank'
import RankList from  '../../global/RankingList'
import SquadModal from '../../global/squadModal'


import defaultData from './defaultData'

import { drillDown } from '../../../actions/content'
import { globalNav } from '../../../appNavigator'
const ButtonWithIcon = (props) => {
  let {iconName,title,style,onPress} = props
  let styleMore = style ? style : null
  return (
    <ButtonFeedback rounded style={[styles.button,styles.btnFavourites,styleMore]} onPress={onPress}>
      <Icon name={iconName} style={styles.btnFavouritesIcon} />
      <Text style={styles.btnFavouritesLabel}>
        {title}
      </Text>
    </ButtonFeedback>
  )
}


class MyLionsGroupView extends Component {

  constructor (props) {
    super(props)
    this._scrollView = ScrollView
    this.isUnMounted = false
    this.state = {
      data:defaultData,
      modalInfo: false
    }
  }

  _showError(error) {
    Alert.alert(
      'An error occured',
      error,
      [{text: 'Dismiss'}]
    )
  }
  _showSuccess(message) {
    Alert.alert(
      'success',
      message,
      [{text: 'Dismiss'}]
    )
  }
  /*get Data*/
  fetchData = (access_token,userId,group_id) => {
    this.setState({
      isLoaded: true,
    })
    let query = {
      aceess_token: access_token,
      id: userId,
      group_id:group_id
    }
    console.log(JSON.stringify(query))
    let optionsInfo = {
      url: actionsApi.eyc3GroupInfo,
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
      onError: ()=>{
        this.setState({isLoaded:false})

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
  leaveGroupApi = (aceess_token,userID,group_id )=> {
    let query = {
      aceess_token: aceess_token,
      id: userID,
      group_id: group_id
    }
    if(group_id===''||!group_id) {
      this._showError("group_id Can't be empty")
      return
    }
    console.log(JSON.stringify(query))
    let optionsInfo = {
      url: actionsApi.eyc3LeaveGroup,
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
        if(res.data.success){
          this.props.popRoute()
        }else {
          this.setState({
            joinType: 'error',
          })
        }
      },
      onError: (error)=>{
        console.log(error)
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

  leaveGroup = () => {
    let {userProfile,drillDownItem} = this.props
    getAccessToken().then(token=>{
      this.leaveGroupApi(token,userProfile.userID,drillDownItem.id)
    })
  }
  iconPress = () => {
    this.setState({modalInfo: !this.state.modalInfo})
  }
  render() {
    let {data} = this.state
    let {userProfile,drillDownItem} = this.props
    let group_name = drillDownItem.name ? drillDownItem.name : ''
    return (
      <Container theme={theme}>
        <View style={styles.container}>
          <LionsHeader
            back={true}
            title='MY LIONS'
            contentLoaded={true}
            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true })}} />
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
            <HeaderTitleWithModal title={group_name}  iconPress={this.iconPress}/>
            <GrayContainer >
              <ExpertRank data={userProfile}  />
              <RankList data={data} title={'GROUP LADDER'} />
            </GrayContainer>
            <View style={styles.groupAction}>
              <ButtonWithIcon  iconName  = {'md-barcode'} title = {'INVITE CODE'} style={styles.grayBackgroundColor}  />
              <ButtonWithIcon  iconName  = {'md-exit'} title = {'LEAVE GROUP'} style={styles.grayBackgroundColor} onPress={this.leaveGroup}/>
            </View>
            <LionsFooter isLoaded={true} />
          </ScrollView>
          <SquadModal
            modalVisible={this.state.modalInfo}
            callbackParent={this.iconPress}>
            <View style={[styles.modalContent]}>
              <Text style={styles.modalContentTitleText}>PRIVATE LEAGUES</Text>
              <Text style={styles.modalContentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan vehicula ex non commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
            </View>
          </SquadModal>
          <EYSFooter mySquadBtn={true}/>
        </View>
      </Container>
    )
  }
  componentDidMount() {
    let {userProfile,drillDownItem} = this.props
    getAccessToken().then(token=>{
      this.fetchData(token,userProfile.userID,drillDownItem.id)
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
    popRoute: (route)=>dispatch(popRoute(route)),
  }
}

export default connect((state) => {
  console.log(state)
  return {
    route: state.route,
    userProfile:state.squad.userProfile,
    drillDownItem: state.content.drillDownItem
  }
}, bindAction)(MyLionsGroupView)
