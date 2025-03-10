'use strict'
import React, { Component, PropTypes } from 'react'
import { Image, View, TextInput,ActivityIndicator } from 'react-native'
import { Container, Text, Button, Icon, Input } from 'native-base'
import SquadModal from '../../global/squadModal'
import ButtonFeedback from '../../utility/buttonFeedback'

import { shareTextWithTitle } from '../../utility/socialShare'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from '../styles'
import loader from '../../../themes/loader-position'

const CreateButton = ({onPress,isSubmitting}) => (
  <View style={styles.createGroupFooter}>
    <ButtonFeedback
      style={styles.footerBtn} onPress= {onPress} disabled={isSubmitting}>
      <Text style={[styles.footerBtnCreateText,isSubmitting&&{opacity:0.5}]}>CREATE</Text>
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
      isSubmitting: false
    };
  }
  callbackParent = ()=> {
    this.state = {
      text: ''
    };
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
        PageData.contentText =  'Create a private league and invite friends. Names must be between 7 and 14 characters long, contain only letters and numbers and no spaces.'
        PageData.subTitle = 'LEAGUE NAME'
        PageData.subContentText = ''
      }
        break;
      case 'error':
      {
        PageData.title = 'ERROR'
        PageData.contentText =  'Unfortunately the following error occured when attempting to create your league.'
        PageData.subTitle = data ? data.message : ""
        PageData.subContentText = 'Please choose a valid league name and try again.'
      }
        break;
      case 'success':
      {
        PageData.title = 'SUCCESS'
        PageData.contentText =   'Your private league ' +this.state.text + ' has been successfully created.'
        PageData.subTitle = data ? data.invitation_code : ''
        PageData.subContentText = 'Invite friends to join your league by sharing this code. You may view the code for later reference at any time within your private league view.'
      }
        break;

      default:
        break
    }
    return PageData
  }
  createGroupClick = () => {
    this.setState({isSubmitting:true},()=>{
      this._scrollView.scrollToPosition(0,0,false)
      this.props.createButtonClick(this.state.text)
    })
    
  }
  goBackClick = () => {
    this.state = {
      text: ''
    };
    this.props.errorBackButtonClick()
  }
  shareClick = () => {
    let  describe = ' I’ve created a private league on the Lions Official App. Use my code: ' + this.props.data.invitation_code+' to join! #LionsNZ2017 '
    shareTextWithTitle(describe,'')
  }
  componentWillReceiveProps(nextProps,nextState) {
    console.log('nextProps.modalType',nextProps.modalType)
    if(nextProps.modalType!==this.props.modalType&&nextProps.modalType!=='create') this.setState({isSubmitting:false})
  }
  render() {
    let { modalType ,data} = this.props
    let { title, contentText, subTitle, subContentText } =  this.getDetail(modalType,data)
    let subTitleStyle  = styles.modalCreateGroupSubTitle
    if(modalType !== 'create'){
      subTitleStyle = styles.modalErrorGroupSubTitle
    }

    return(
        <SquadModal modalVisible={this.props.modalVisible} callbackParent = {this.callbackParent} >
          <View style={{height:64, width:100}}>
          </View>
          <KeyboardAwareScrollView  ref={(scrollView) => { this._scrollView = scrollView }}>
            <View style={[styles.modalViewWrapper,styles.modalGropp]}>
                <Text style={styles.modalCreateGroupTitle}>{title}</Text>
                <Text style={styles.modalCreateGroupContent}>{contentText}</Text>
                <Text style={subTitleStyle}>{subTitle}</Text>
                {modalType==='create' ? <TextInput style={styles.modalCreateGroupInput} underlineColorAndroid='transparent'  onChangeText={ (text) => this.setState({text})}/> : null}
                {this.state.isSubmitting&&<ActivityIndicator style={[loader.centered,{height:50}]} size='small' />}
                {modalType==='create' ? <CreateButton onPress={this.createGroupClick} isSubmitting={this.state.isSubmitting}/> : null}
                {modalType==='error' ? <Text style={styles.modalCreateGroupContent}>{subContentText}</Text> : null}
                {modalType==='error' ? <ErrorButton  onPress={this.goBackClick} /> : null}
                {modalType==='success' ? <Text style={styles.modalCreateGroupContent}>{subContentText}</Text> : null}
                {modalType==='success' ? <ShareButton onPress={this.shareClick} close = {this.callbackParent} /> : null}
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
  data : PropTypes.object,
  groupName: PropTypes.string,

}
export default GreateGroupModal
