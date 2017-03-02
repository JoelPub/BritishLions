
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, RefreshControl, ActivityIndicator, Alert, Platform, ListView } from 'react-native'
import { Container, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../../../themes/base-theme'
import styles from './styles'
import shapes from '../../../themes/shapes'
import LoginRequire from '../../global/loginRequire'
import LionsHeader from '../../global/lionsHeader'
import EYSFooter from '../../global/eySponsoredFooter'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImageCircle from '../../utility/imageCircle'
import { replaceRoute, pushNewRoute } from '../../../actions/route'
import styleVar from '../../../themes/variable'
import { alertBox } from '../../utility/alertBox'
import refresh from '../../../themes/refresh-control'
import { drillDown } from '../../../actions/content'
import { setAccessGranted } from '../../../actions/token'
import { removeToken } from '../../utility/asyncStorageServices'
import { service } from '../../utility/services'
import { getAssembledUrl } from '../../utility/urlStorage'
import Data from '../../../../contents/unions/data'
import { globalNav } from '../../../appNavigator'
import LionsFooter from '../../global/lionsFooter'
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getUserCustomizedSquad, removeUserCustomizedSquad,getGoodFormFavoritePlayerList, removeGoodFormFavoritePlayerList } from '../../utility/apiasyncstorageservice/goodFormAsyncStorageService'
import { getEYC3FullPlayerList,removeEYC3FullPlayerList } from '../../utility/apiasyncstorageservice/eyc3AsyncStorageService'
import Storage from 'react-native-storage'
import { setPositionToAdd,setPositionToRemove } from '../../../actions/position'
import { strToUpper } from '../../utility/helper'
import SquadModel from  '../../../modes/Squad'
import {convertSquadToShow,compareShowSquad} from '../../global/squadToShow'
import { setSquadToShow,setSquadData } from '../../../actions/squad'
import Immutable, { Map, List,Iterable } from 'immutable'
import {searchPlayer} from '../components/searchPlayer'

class MyLionsSelectPlayerListing extends Component {

    constructor(props){
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.isUnMounted = false
        this.favUrl = getAssembledUrl('GoodFormFavoritePlayers')
        this.playerFullUrl = getAssembledUrl('SoticFullPlayers')
        this.squadUrl = getAssembledUrl('GoodFormUserCustomizedSquad')
        this.uniondata = Data
        this._scrollView = ScrollView

        this.state = {
            isRefreshing: false,
            isLoaded: false,
            selectPlayers: this.ds.cloneWithRows([])
        }
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        let styleGridBoxImgWrapper = (rowID%2 === 0)? [styles.gridBoxImgWrapper, styles.gridBoxImgWrapperRight] : [styles.gridBoxImgWrapper]
        let styleGridBoxTitle = (rowID %2 ===  0)? [styles.gridBoxTitle, styles.gridBoxTitleRight] : [styles.gridBoxTitle]
        
        return (
            <View style={styles.gridBoxCol} key={rowID}>
                <ButtonFeedback 
                    style={styles.gridBoxTouchable}
                    onPress={() => this._showDetail(rowData,'myLionsPlayerProfile')}>
                    <View style={styles.gridBoxTouchableView}>
                        <View style={styleGridBoxImgWrapper}>
                            <ImagePlaceholder 
                                width = {styleVar.deviceWidth / 2}
                                height = {styleVar.deviceWidth / 2}>
                                <Image transparent
                                    resizeMode='contain'
                                    source={rowData.image} 
                                    style={styles.gridBoxImg}
                                    key={rowID}/>
                            </ImagePlaceholder>
                        </View>
                        <View style={[shapes.triangle]} />
                        <View style={styleGridBoxTitle}>
                            <Text style={styles.gridBoxTitleText} numberOfLines={1}>{rowData.name.toUpperCase().substring(0, rowData.name.lastIndexOf(" "))}</Text>
                            <Text style={styles.gridBoxTitleText} numberOfLines={1}>{rowData.name.toUpperCase().substring(rowData.name.lastIndexOf(" ")+1, rowData.name.length)}</Text>
                            <Text style={styles.gridBoxTitleSupportText}>Position: {rowData.position}</Text>
                        </View>
                    </View>
                </ButtonFeedback>
            </View> 
        )
    }

    _renderFooter() {
        return(
            <View style={{width:styleVar.deviceWidth}} >
                <LionsFooter isLoaded={true} />
            </View>
        )
    }

    _showError(error) {
        alertBox(
            'An Error Occured',
            error,
            'Dismiss'
        )
    }
    componentWillUnmount() {
        this.isUnMounted = true
    }

    _replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    _reLogin() {
        removeToken()
        this.props.setAccessGranted(false)
        this._replaceRoute('login')
    }

    _signInRequired() {
        Alert.alert(
            'Your session has expired',
            'Please sign into your account.',
            [{
                text: 'SIGN IN', 
                onPress: this._reLogin.bind(this)
            }]
        )
    }

    _showDetail(item, route) {
        console.log('route',route)
        this.props.drillDown(item, route)
    }

    _mapJSON(data, colMax = 2) {
        let i = 0
        let k = 0
        let newData = []
        let items = []
        let length = data.length

        for( i = 0; i <data.length; (i += colMax)) {
            for( k = 0; k < colMax; k++ ) {
                if(data[i + k])
                    items.push(data[i + k])
            }

            newData.push(items)
            items = []
        }
        return newData
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        back={true} 
                        title='MY LIONS' 
                        contentLoaded={this.state.isLoaded}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                     <View style={styles.myLionsSharedHeader}>
                         <Text style={styles.myLionsSharedHeaderText}>
                              SELECT PLAYER
                         </Text>
                     </View>
                     <View style={{flex: 1}}>
                        {
                            this.state.isLoaded?
                                <View>
                                    {
                                        !this.state.selectPlayers.getRowCount()? 
                                            <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                                                <View style={styles.emptyPlayer}>
                                                    <Text style={styles.emptyPlayerText}>Select Players list is currently empty</Text>
                                                </View>
                                                <LionsFooter isLoaded={true} />
                                            </ScrollView>
                                        : 
                                            <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                                                <ListView 
                                                    dataSource={this.state.selectPlayers}
                                                    renderRow={this._renderRow.bind(this)}
                                                    enableEmptySections = {true} 
                                                    contentContainerStyle={styles.gridList}
                                                    renderFooter ={this._renderFooter}
                                                />
                                            </ScrollView>
                                    } 
                                </View>
                            :
                                <ActivityIndicator style={styles.loaderPos2} size='large' />
                        }
                    </View>
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
                </View>
            </Container>
        )
    }
    componentWillUnmount() {
        console.log('Unmount')
            this.props.setPositionToAdd('')

    }

    componentDidMount() {
        setTimeout(()=>{this._getSelectPlayers()},600)
    }

    _getSelectPlayers(){
      this.setState({ isLoaded: false },()=>{
          getSoticFullPlayerList().then((catchedFullPlayerList) => {
              if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                  let optionsOfficialSquad = {
                      url: 'https://api.myjson.com/bins/vq1d5',
                      data: {},
                      onAxiosStart: null,
                      onAxiosEnd: null,
                      method: 'get',
                      onSuccess: (res) => {
                          if(res.data) {
                                  console.log('res.data',res.data)
                                  this._listPlayer(res.data.data, catchedFullPlayerList)
                          }
                      },
                      onError: null,
                      onAuthorization: () => {
                              this._signInRequired()
                      },
                      isRequiredToken: true
                  }
                  service(optionsOfficialSquad)

                
              }
          }).catch((error) => {
              this.setState({ isLoaded: true }, () => {
                      this._showError(error) // prompt error
              })
          })
      })
    }

    _listPlayer(playerList, playerFeed){
        let selectPlayers = []
        let playerids = playerList.split('|')
        playerids.map((id,j) => {
                selectPlayers.push(searchPlayer(playerFeed,id,this.uniondata))
        })
        this.setState({
            isLoaded: true,
            isRefreshing: false,
            selectPlayers:this.ds.cloneWithRows(selectPlayers)
        })
    }

}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted)),
        setPositionToAdd:(position)=>dispatch(setPositionToAdd(position)),
        setPositionToRemove:(position)=>dispatch(setPositionToRemove(position)),
        setSquadToShow:(squad)=>dispatch(setSquadToShow(squad)),
        setSquadData:(squad)=>dispatch(setSquadData(squad)),
    }
}

export default connect(null, bindAction)(MyLionsSelectPlayerListing)

