
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ListView, ActivityIndicator} from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import styleVar from '../../themes/variable'
import LoginRequire from '../global/loginRequire'
import LionsHeader from '../global/lionsHeader'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import EYSFooter from '../global/eySponsoredFooter'
import loader from '../../themes/loader-position'
import { replaceRoute, pushNewRoute } from '../../actions/route'
import imageJameshaskel from '../../../contents/my-lions/players/jameshaskell.png'
import { drillDown } from '../../actions/content'
import { globalNav } from '../../appNavigator'
import ExpertmModel from  'modes/Experts'
import{ getEYC3ExpertsSquads, removeEYC3ExpertsSquads } from '../utility/apiasyncstorageservice/eyc3AsyncStorageService'


//import ExpertsDataJSON from  '../../mockDataJson/expertsJson.json'


const ExpertsHeader = ({rowData}) => (
    <View style={styles.searchImg}>
        {<Image transparent resizeMode='stretch' source={{uri:rowData.image}} style={styles.cellExpertHeader} />}
    </View>
)
const ExpertDescription = ({rowData}) => (
    <View style={styles.cellExpertInfo}>
        <Text style={styles.textName}>{rowData.name}</Text>
        <Text style={styles.textDescription} numberOfLines={2} >{rowData.description}</Text>
        <Text style={styles.textRating}>SQUAD RATING: {rowData.squad_rating}</Text>
    </View>

)
const ExpertsCell = ({rowData, onPress}) => (
    <ButtonFeedback onPress= {onPress}>
        <View style={[styles.cellExpert]}>
            <ExpertsHeader rowData={rowData}  />
            <ExpertDescription rowData={rowData} />
        </View> 
    </ButtonFeedback>
)

class MyLionsExpertsList extends Component {

  constructor(props) {
    super(props)
    this.isUnMounted = false
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      experts: [],
      isLoaded: false
    };
  }
  _navToDetail = (item) => {
    this.props.drillDown(item, 'mylionsExpertProfile')
  }
  handdleData = () => {
    getEYC3ExpertsSquads().then((ExpertsData) => {
        if (this.isUnMounted) return // return nothing if the component is already unmounted
        
        if (ExpertsData !== null && ExpertsData !== 0 && ExpertsData !== -1) {
            let experts = ExpertmModel.fromJS(ExpertsData.experts)
            
            this.setState({
                experts: ExpertsData,
                dataSource: this.ds.cloneWithRows(experts.toArray()),
                isLoaded: true
            })
        }
    }).catch((error) => {
        console.log('Error when try to get the EYC3 full player list: ', error)
    })
  }

  handleComponentUpdate = (props, firstRun) => {
    setTimeout(this.handdleData,500)
  }

  componentWillReceiveProps (nextProps) {
    this.handleComponentUpdate(nextProps, false)
  }

  componentWillUnmount() {
      this.isUnMounted = true
  }

  componentDidMount () {
    removeEYC3ExpertsSquads()
    this.handleComponentUpdate(this.props, true)
  }

  _renderFooter() {
    return ( 
      <LionsFooter isLoaded={true} />
    )
  }

  render() {
    return (
      <Container theme={theme}>
        <View style={styles.container}>
          <LionsHeader back={true} title='MY LIONS' />
          <View style={{flex: 1}}>
            <Text style={[styles.headerTitle,styles.squadTitle]}>THE EXPERTS' SQUADS</Text>
            {
              this.state.isLoaded?
                <ListView
                  dataSource={this.state.dataSource}
                  enableEmptySections={true}
                  renderRow={(rowData) => <ExpertsCell rowData={rowData} onPress = {() => this._navToDetail(rowData)} />}
                  style={styles.squadListView}
                  renderFooter ={this._renderFooter}
                />

              :
                <ActivityIndicator style={styles.loaderPos} size='large' />
            }
          </View>
          <EYSFooter mySquadBtn={true}/>
          <LoginRequire/>
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
