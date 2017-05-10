
'use strict'

import React, { Component ,PropTypes} from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../../../themes/variable'
import Triangle from '../../../../../../components/global/Triangle'


class SetPlayerBar extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let deviveFiveStyle = styleVar.deviceWidth ===320 ? {fontSize: 18,lineHeight: 18} : {}
    return (
      <View style={[styles.tabs, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => {
          let colorStyle = this.props.activeTab === i ? {backgroundColor: 'rgb(38,38,38)'} : {backgroundColor: styleVar.brandPrimary}
          return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
            <View style={styles.tabContainer} >
              <View style={[styles.tabTextView,colorStyle]}>
                <Text style={[styles.tabText,deviveFiveStyle]}>
                  {tab}
                </Text>
              </View>
              <Triangle
                width={24}
                height={12}
                color={this.props.activeTab === i ? 'rgb(38,38,38)' : 'white'}
                direction={'down'}
                style={{marginTop:0}}
              />
            </View>
          </TouchableOpacity>;
        })}
      </View>
    )
  }
  componentDidMount() {

  }
}

export default SetPlayerBar
SetPlayerBar.propTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
  tabs: React.PropTypes.array,
}
SetPlayerBar.defaultProps = {

}