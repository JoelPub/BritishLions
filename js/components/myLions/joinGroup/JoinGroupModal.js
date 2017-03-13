'use strict'
import React, { Component, PropTypes } from 'react'
import { Image, View, TextInput } from 'react-native'
import { Container, Text, Button, Icon, Input } from 'native-base'
import SquadModal from '../../global/squadModal'
import ButtonFeedback from '../../utility/buttonFeedback'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import styles from '../styles'

const CreateButton = ({onPress}) => (
  <View style={styles.createGroupFooter}>
    <ButtonFeedback
      style={styles.footerBtn} onPress= {onPress}>
      <Text style={styles.footerBtnText}>SUBMIT</Text>
    </ButtonFeedback>
  </View>
)
const ErrorButton = ({onPress}) => (
  <View style={styles.createGroupFooter}>
    <ButtonFeedback
      style={styles.footerErrorBtn} onPress= {onPress}>
      <Text style={styles.footerBtnText}>OK</Text>
    </ButtonFeedback>
  </View>
)
const ShareButton = ({onPress}) => (
  <View style={styles.createGroupFooter}>
    <ButtonFeedback
      style={styles.footerCloseBtn} onPress= {onPress}>
      <Text style={styles.footerBtnText}>OK</Text>
    </ButtonFeedback>
  </View>
)
class JoinGroupModal extends Component {
  constructor(props){
    super(props)
    this.state = {
        invitation_code: '',
    }
    this._scrollView = KeyboardAwareScrollView
  }
  callbackParent = ()=> {
    this.props.callbackParent()
  }
  getDetail = (description) =>{
    let PageData = {
      title: '' ,
      contentText: '',
      subTitle: '',
      subContentText: '',
    }
    switch(description)
    {
      case 'join':
      {
        PageData.title = 'JOIN LEAGUE'
        PageData.contentText =  'Enter your league invite code below to join.'
        PageData.subTitle = ''
        PageData.subContentText = ''
      }
        break;
      case 'error':
      {
        PageData.title = 'ERROR'
        PageData.contentText =  'Something went wrong when trying to join the league. Please try again later.'
        PageData.subTitle = ''
        PageData.subContentText = ''
      }
        break;
      case 'success':
      {
        PageData.title = 'SUCCESS'
        PageData.contentText =  'You are now a member of .'
        PageData.subTitle = ''
        PageData.subContentText = ''
      }
        break;
      default:
        break
    }
    return PageData
  }
  joinGroupClick = () => {
    if(this.props.joinButtonClick){
      this.props.joinButtonClick(this.state.invitation_code)
    }
  }
  goBackClick = () => {

  }
  okClick = () => {
   if(this.props.okButtonClick){
     this.props.okButtonClick(this.state.invitation_code)
   }
  }
  render() {
    let { modalType } = this.props
    let { title, contentText, subTitle, subContentText } =  this.getDetail(modalType)
    let subTitleStyle  = styles.modalCreateGroupSubTitle
    if(modalType !== 'join'){
      subTitleStyle = styles.modalErrorGroupSubTitle
    }

    return(
      <KeyboardAwareScrollView  ref={(scrollView) => { this._scrollView = scrollView }}>
        <SquadModal modalVisible={this.props.modalVisible} callbackParent = {this.callbackParent} >
          <View style={[styles.modalViewWrapper,styles.modalGropp]}>
            <Text style={styles.modalCreateGroupTitle}>{title}</Text>
            <Text style={styles.modalCreateGroupContent}>{contentText}</Text>
            {modalType==='join' ? <TextInput style={styles.modalCreateGroupInput}
             onChangeText={ (invitation_code) => this.setState({invitation_code}) }/> : null}
            {modalType==='join' ? <CreateButton onPress={this.joinGroupClick} /> : null}
            {modalType==='error' ? <ErrorButton  onPress={this.goBackClick} /> : null}
            {modalType==='success' ? <ShareButton onPress={this.okClick } close = {this.callbackParent} /> : null}
          </View>
        </SquadModal>
      </KeyboardAwareScrollView>
    )
  }
}
JoinGroupModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  callbackParent: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  joinButtonClick: PropTypes.func.isRequired,
  okButtonClick: PropTypes.func

}
export default JoinGroupModal
