'use strict'
import React, { Component, PropTypes } from 'react'
import { Image, View, TextInput } from 'react-native'
import { Container, Text, Button, Icon, Input } from 'native-base'
import SquadModal from '../../global/squadModal'
import ButtonFeedback from '../../utility/buttonFeedback'

import { shareTextWithTitle } from '../../utility/socialShare'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from '../styles'

const CreateButton = ({onPress}) => (
  <View style={styles.createGroupFooter}>
    <ButtonFeedback
      style={styles.footerBtn} onPress= {onPress}>
      <Text style={styles.footerBtnText}>CREATE</Text>
    </ButtonFeedback>
  </View>
)
const ErrorButton = ({onPress}) => (
  <View style={styles.createGroupFooter}>
    <ButtonFeedback
      style={styles.footerErrorBtn} onPress= {onPress}>
      <Text style={styles.footerBtnText}>GO BACK</Text>
    </ButtonFeedback>
  </View>
)
const ShareButton = ({onPress,close}) => (
  <View style={styles.createGroupFooter}>
    <ButtonFeedback
      style={styles.footerShareBtn} onPress= {onPress}>
      <Text style={styles.footerShareText}>SHARE</Text>
      <Icon name='ios-share-alt' style={styles.footerBtnIcon} />
    </ButtonFeedback>
    <ButtonFeedback
      style={styles.footerCloseBtn} onPress= {close}>
      <Text style={styles.footerBtnText}>CLOSE</Text>
    </ButtonFeedback>
  </View>
)
class GreateGroupModal extends Component {
  constructor(props){
    super(props)
    this._scrollView = KeyboardAwareScrollView
    this.state = {
      modalType: 'success'
    };
  }
  callbackParent = ()=> {
    this.props.callbackParent()
  }
  getDetail = (description,data) =>{
    let PageData = {
      title: '' ,
      contentText: '',
      subTitle: '',
      subContentText: '',
      text: ''
    }
    switch(description)
    {
      case 'create':
      {
        PageData.title = 'CREATE PRIVATE LEAGUE'
        PageData.contentText =  'Create a private group and invite friends. Names must be . <insert EYC3 naming requirements/rules>'
        PageData.subTitle = 'LEAGUE NAME'
        PageData.subContentText = ''
      }
        break;
      case 'error':
      {
        PageData.title = 'ERROR'
        PageData.contentText =  'Unfortunatelyt the following error occured when attempting to create your group.'
        PageData.subTitle = 'INVALID GROUP NAME'
        PageData.subContentText = 'Please choose a valid group name and try again.'
      }
        break;
      case 'success':
      {
        PageData.title = 'SUCCESS'
        PageData.contentText =  data.message
        PageData.subTitle = data.invitation_code
        PageData.subContentText = 'Invite friends to join your group by sharing this code. You may view the code for later reference at any time within your private group view.'
      }
        break;

      default:
        break
    }
    return PageData
  }
  createGroupClick = () => {
   this.props.createButtonClick(this.state.text)
  }
  goBackClick = () => {
    this.props.errorBackButtonClick()
  }
  shareClick = () => {
    shareTextWithTitle('INVITE CODE','')
  }
  render() {
    let { modalType } = this.props
    let { title, contentText, subTitle, subContentText } =  this.getDetail(modalType)
    let subTitleStyle  = styles.modalCreateGroupSubTitle
    if(modalType !== 'create'){
      subTitleStyle = styles.modalErrorGroupSubTitle
    }

    return(
      <SquadModal modalVisible={this.props.modalVisible} callbackParent = {this.callbackParent} >
        <KeyboardAwareScrollView  ref={(scrollView) => { this._scrollView = scrollView }}>
           <View style={[styles.modalViewWrapper,styles.modalGropp]}>
              <Text style={styles.modalCreateGroupTitle}>{title}</Text>
              <Text style={styles.modalCreateGroupContent}>{contentText}</Text>
              <Text style={subTitleStyle}>{subTitle}</Text>
              {modalType==='create' ? <TextInput style={styles.modalCreateGroupInput}   onChangeText={ (text) => this.setState({text})}/> : null}
              {modalType==='create' ? <CreateButton onPress={this.createGroupClick} /> : null}
              {modalType==='error' ? <Text style={styles.modalCreateGroupContent}>{subContentText}</Text> : null}
              {modalType==='error' ? <ErrorButton  onPress={this.goBackClick} /> : null}
              {modalType==='success' ? <Text style={styles.modalCreateGroupContent}>{subContentText}</Text> : null}
              {modalType==='success' ? <ShareButton onPress={this.shareClick } close = {this.callbackParent} /> : null}
            </View>
        </KeyboardAwareScrollView>
      </SquadModal>
    )
  }
}
GreateGroupModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  callbackParent: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  createButtonClick: PropTypes.func.isRequired,
  errorBackButtonClick: PropTypes.func.isRequired,
  data : PropTypes.object
}
export default GreateGroupModal
