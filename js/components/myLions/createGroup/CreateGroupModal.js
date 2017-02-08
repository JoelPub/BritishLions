'use strict'
import React, { Component, PropTypes } from 'react'
import { Image, View, TextInput } from 'react-native'
import { Container, Text, Button, Icon, Input } from 'native-base'
import SquadModal from '../../global/squadModal'
import ButtonFeedback from '../../utility/buttonFeedback'

import styles from '../styles'

class GreateGroupModal extends Component {
  constructor(props){
    super(props)
  }
  callbackParent = ()=> {
    this.props.callbackParent()
  }
  render() {
    let contentText = 'Create a private group and invite friends.Names must be .<insert EYC3 naming requirements/rules>'
    return(
      <SquadModal modalVisible={true} callbackParent = {this.callbackParent} >
        <View style={[styles.modalViewWrapper,styles.modalUpdateView]}>
          <Text style={styles.modalCreateGroupTitle}>MY PRIDE</Text>
          <Text style={styles.modalCreateGroupContent}>{contentText}</Text>
          <Text style={styles.modalCreateGroupSubTitle}>GROUP NAME</Text>
          <TextInput style={styles.modalCreateGroupInput}/>
          <View style={styles.createGroupFooter}>
            <ButtonFeedback
              style={styles.footerBtn}>
              <Text style={styles.footerBtnText}>CREATE</Text>
            </ButtonFeedback>
          </View>
        </View>
      </SquadModal>
    )
  }
}
GreateGroupModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  callbackParent: PropTypes.func.isRequired
}
export default GreateGroupModal
