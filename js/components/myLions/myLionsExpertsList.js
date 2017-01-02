
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ListView} from 'react-native'
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

const ExpertsHeader = () => (
      <Image source={imageJameshaskel} style={[styles.newsImage]} />
)
const ExpertDescription = () => (
  <View style={styles.cellExpertInfo}>
    <Text style={styles.textName}  >JOHN SMITH</Text>
    <Text style={styles.textDecoration} numberOfLines={2} >Lorem ipsum dolor sitamet, consectetur.</Text>
    <Text style={styles.textRating}>SQAD RATING: 350</Text>
  </View>

)
const ExpertsCell = ({rowData,onPress}) => (
 <ButtonFeedback onPress= {onPress}>
   <View  style={[styles.cellExpert]}>
     <ExpertsHeader />
     <ExpertDescription />
   </View>
</ButtonFeedback>
)

class MyLionsExpertsList extends Component {

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3','row 4','row 5']),
    };
  }
  _navToDetail = () => {
    this.props.drillDown({}, 'mylionsExpertProfile')
  }
  render() {
    return (
      <Container theme={theme}>
        <View style={styles.container}>
          <LionsHeader back={true} title='MY LIONS' />
          <ScrollView>
            <Text style={[styles.headerTitle,styles.squadTitle]}>THE EXPERTS' SQUADS</Text>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) =><ExpertsCell rowData={rowData} onPress = {this._navToDetail} />}
            />
            <LionsFooter isLoaded={true} />
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
}, bindAction)(MyLionsExpertsList)
