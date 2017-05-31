import React, {
  Component,
  PropTypes,
  Children
} from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Content, Text, Icon, Input } from 'native-base'
import  styles from './styles'
import ButtonFeedback from '../../../utility/buttonFeedback'


class HeaderTitleWithModal extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render (){
    let { title } = this.props
    return (
      <ButtonFeedback style={styles.container}>
        <Text style={styles.groupTitle}>{title}</Text>
        <Icon name='ios-information-circle-outline' style={styles.headerIcon} onPress={this.props.iconPress}/>
      </ButtonFeedback>

    )
  }
}
export default HeaderTitleWithModal
HeaderTitleWithModal.propTypes = {
  title: PropTypes.string.isRequired,
  iconPress: PropTypes.func
}
HeaderTitleWithModal.defaultProps = {
  iconPress: ()=>{}
}