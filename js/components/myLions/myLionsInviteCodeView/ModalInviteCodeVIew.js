'use strict'
import React, { Component, PropTypes } from 'react'
import { Image, View, TextInput } from 'react-native'
import { Container, Text, Button, Icon, Input } from 'native-base'
import SquadModal from '../../global/squadModal'
import ButtonFeedback from '../../utility/buttonFeedback'

import { shareTextWithTitle } from '../../utility/socialShare'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from '../styles'

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

class ModalInviteCodeVIew extends Component {
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
  getDetail = (description,data,groupName) =>{

    let PageData = {
      title: '' ,
      contentText: 'The group invite code for '+groupName +' is:',
      subTitle: data ? data.invitation_code : '',
      subContentText: 'Invite friends to join your league by sharing this code. You may view the code for later reference at any time within your private league view.',
    }

    return PageData
  }

  shareClick = () => {
    let { data} = this.props
    let invitation_code = data ? data.invitation_code : ''
    shareTextWithTitle(invitation_code,'')
  }
  render() {
    let { modalType ,data,groupName} = this.props
    let { title, contentText, subTitle, subContentText } =  this.getDetail(modalType,data,groupName)
    let subTitleStyle  = styles.modalCreateGroupSubTitle
    if(modalType !== 'create'){
      subTitleStyle = styles.modalErrorGroupSubTitle
    }

    return(
      <KeyboardAwareScrollView  ref={(scrollView) => { this._scrollView = scrollView }}>
        <SquadModal modalVisible={this.props.modalVisible} callbackParent = {this.callbackParent} >
          <View style={[styles.modalViewWrapper,styles.modalGropp]}>
            <Text style={styles.modalCreateGroupContent}>{contentText}</Text>
            <Text style={subTitleStyle}>{subTitle}</Text>
            <Text style={styles.modalCreateGroupContent}>{subContentText}</Text>
            <ShareButton onPress={this.shareClick } close = {this.callbackParent} />
          </View>
        </SquadModal>
      </KeyboardAwareScrollView>
    )
  }
}
ModalInviteCodeVIew.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  callbackParent: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  data : PropTypes.object,
  groupName: PropTypes.string
}
export default ModalInviteCodeVIew
