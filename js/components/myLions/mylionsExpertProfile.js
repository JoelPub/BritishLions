

'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView} from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'

import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import styleVar from '../../themes/variable'

import LionsHeader from '../global/lionsHeader'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import { replaceRoute, pushNewRoute } from '../../actions/route'

import imageJameshaskel from '../../../contents/my-lions/players/jameshaskell.png'

import { drillDown } from '../../actions/content'
import { globalNav } from '../../appNavigator'


const ExpertsHeaderView = () => (
  <LinearGradient colors={['#AF001E', '#820417']} style={styles.viewExpertHeader}>
    <Image style={styles.viewExpertHeaderImage} source={imageJameshaskel} />
    <View style={styles.headerPlayerDetails}>
      <Text style={styles.viewExpertProfileName}>JAMES HASKELL</Text>
    </View>
    <View style={styles.headerPlayerDetails}>
      <Text style={styles.viewExpertProfileDescription}>Lorem ipsum dolor sit amet, consectetur.</Text>
    </View>
  </LinearGradient>
)
class MyLionsExpertProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
    };
  }

  render() {
    return (
      <Container theme={theme}>
        <View style={styles.container}>
          <LionsHeader back={true} title='MY LIONS' />
          <ScrollView>
            <ExpertsHeaderView />
          </ScrollView>
        </View>
      </Container>
    )
  }
}

function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),
    replaceRoute:(route)=>dispatch(replaceRoute(route)),
  }
}

export default connect((state) => {
  return {
    route: state.route,
  }
}, bindAction)(MyLionsExpertProfile)
