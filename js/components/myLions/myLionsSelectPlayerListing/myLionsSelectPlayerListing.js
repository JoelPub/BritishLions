
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
import { actionsApi } from '../../utility/urlStorage'
import Data from '../../../../contents/unions/data'
import { globalNav } from '../../../appNavigator'
import LionsFooter from '../../global/lionsFooter'
import { getSoticFullPlayerList} from '../../utility/apiasyncstorageservice/soticAsyncStorageService'
import { getEYC3OfficialSquad,removeEYC3OfficialSquad} from '../../utility/apiasyncstorageservice/eyc3AsyncStorageService'
import { setPositionToAdd } from '../../../actions/position'
import { strToUpper , strToLower,splitName} from '../../utility/helper'
import Immutable, { Map, List,Iterable } from 'immutable'
import {searchPlayer} from '../components/searchPlayer'
import {mapFShow} from '../components/teamToShow'

class MyLionsSelectPlayerListing extends Component {

    constructor(props){
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.uniondata = Data
        this._scrollView = ScrollView

        this.state = {
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
                                    source={{uri:rowData.image}} 
                                    style={styles.gridBoxImg}
                                    key={rowID}/>
                            </ImagePlaceholder>
                        </View>
                        <View style={[shapes.triangle]} />
                        <View style={[styleGridBoxTitle]}>
                            {
                                splitName(rowData.name, ' ', 7, true).map((value,index)=>{
                                    return(
                                        <Text key={index} style={styles.gridBoxTitleText}>{strToUpper(value)}</Text>
                                    )
                                },this)
                            }
                            <Text style={styles.gridBoxTitleSupportText}>{rowData.position}</Text>
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
            this.props.setPositionToAdd(null)
    }

    componentDidMount() {
        // removeEYC3OfficialSquad()
        setTimeout(()=>{this._getSelectPlayers()},600)
    }

    _getSelectPlayers(){
      this.setState({ isLoaded: false },()=>{
          getSoticFullPlayerList().then((catchedFullPlayerList) => {
              if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
                //   let optionsOfficialSquad = {
                //     url: actionsApi.eyc3GetOfficalSquad,
                //     data: {},
                //     onAxiosStart: null,
                //     onAxiosEnd: null,
                //     method: 'post',
                //     onSuccess: (res) => {
                //         console.log('res.data',res.data)
                //         if(res.data) {
                //             let playerList=[]
                //             for (let node in res.data) {
                //                 if(node==='backs'||node==='forwards') {
                //                     res.data[node].map((value,index)=>{
                //                         if (playerList.indexOf(value)===-1) {playerList.push(value)}
                //                     })
                //                 }
                //                 else {
                //                     if (playerList.indexOf(res.data[node])===-1) {playerList.push(res.data[node])}
                //                 }
                //             }
                //             this._listPlayer(playerList, catchedFullPlayerList)
                //         }
                        
                //     },
                //     isRequiredToken: true,
                //     channel: 'EYC3',
                //     isQsStringify:false
                // }
                // service(optionsOfficialSquad)
                getEYC3OfficialSquad().then((catchedOfficialSquad) => {
                        // console.log('catchedOfficialSquad',catchedOfficialSquad)
                        if(catchedOfficialSquad !== null && catchedOfficialSquad !== 0 && catchedOfficialSquad !== -1) {
                            let playerList=[]
                            for (let node in catchedOfficialSquad) {
                                if(node==='backs'||node==='forwards') {
                                    catchedOfficialSquad[node].map((value,index)=>{
                                        if (playerList.indexOf(value)===-1) {playerList.push(value)}
                                    })
                                }
                                else {
                                    if (playerList.indexOf(catchedOfficialSquad[node])===-1) {playerList.push(catchedOfficialSquad[node])}
                                }
                            }
                            this._listPlayer(playerList, catchedFullPlayerList)
                        }
                        else {                            
                            this.setState({ isLoaded: true })
                        }
                }).catch((error) => {
                      this.setState({ isLoaded: true }, () => {
                              this._showError(error) // prompt error
                      })
                })
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
        let filter=this.props.positionToAdd.split('|')[1]
        playerList.map((id,j) => {
                if(searchPlayer(playerFeed,id,this.uniondata)!==null) selectPlayers.push(searchPlayer(playerFeed,id,this.uniondata))
        })
        // console.log('filter',filter.replace(/\s/g,''))
        // console.log('selectPlayers',selectPlayers)
        // console.log('filter',filter)
        // console.log('this.props.teamToShow',this.props.teamToShow)
        if(filter===undefined) {
            selectPlayers=selectPlayers.filter(x=>{
                return this.props.teamToShow.forwards.findIndex(v=>v.info&&v.info.id&&v.info.id===x.id)>-1 || this.props.teamToShow.backs.findIndex(v=>v.info&&v.info.id&&v.info.id===x.id)>-1
            })
        }
        else {
               selectPlayers=selectPlayers.filter(x=>{
                        let result=false
                        if(typeof x.position==='string') {
                            x.position.split('/').map((value,index)=>{
                                // console.log('value',value)
                                // console.log('mapFShow(filter)',mapFShow(filter))
                                if(mapFShow(filter).split('-').indexOf(strToLower(value).trim())>-1 ) {
                                    // console.log('found')
                                    result=this.props.teamToShow.forwards.findIndex(v=>v.info&&v.info.id&&v.info.id===x.id)===-1 && this.props.teamToShow.backs.findIndex(v=>v.info&&v.info.id&&v.info.id===x.id)===-1
                                }
                            })
                        }
                        
                        return result
                    }
                ) 
        }
        // console.log('selectPlayers',selectPlayers)
        this.setState({
            isLoaded: true,
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
    }
}

export default connect((state) => {
    return {
        positionToAdd: state.position.positionToAdd,
        teamToShow: state.squad.teamToShow,
    }
}, bindAction)(MyLionsSelectPlayerListing)

