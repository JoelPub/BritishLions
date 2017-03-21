
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { drillDown } from '../../../actions/content'
import { Image, Text, View, ScrollView, ListView,ActivityIndicator } from 'react-native'
import { Container, Icon } from 'native-base'
import theme from '../../../themes/base-theme'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LoginRequire from '../../global/loginRequire'
import LionsHeader from '../../global/lionsHeader'
import EYSFooter from '../../global/eySponsoredFooter'
import LionsFooter from '../../global/lionsFooter'
import ButtonFeedback from '../../utility/buttonFeedback'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import shapes from '../../../themes/shapes'
import styles from './styles'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import { service } from '../../utility/services'
import {  getUserId } from '../../utility/asyncStorageServices'
import loader from '../../../themes/loader-position'

const locStyle = styleSheetCreate({
    gridBoxWrapper: {
        backgroundColor: styleVar.colorGrey,
        flex: 1
    },
    gridBoxTitle: {
        position: 'relative',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        paddingBottom: 15,
        paddingHorizontal: 12,
        android: {
            paddingTop: 25,
            paddingBottom: 20
        }
    },
    gridBoxTitleText: {
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        color: styleVar.colorScarlet,
        fontSize: 24,
        lineHeight: 24,
        paddingTop: 4,
        android: {
            paddingTop: 0,
            lineHeight: 30,
        }
    },
    gridBoxTitleSupportText: {
        fontSize: 18,
        lineHeight: 20,
        fontFamily: styleVar.fontGeorgia,
        color: styleVar.colorText,
        paddingHorizontal: 10,
        paddingBottom: 10,
        height: 70,
        android: {
            marginTop: 4
        }
    },
    statusBox: {
        backgroundColor: styleVar.colorScarletLight
    },
    statusBoxRight: {
        borderRightWidth: 1,
        borderRightColor: styleVar.colorGrey2
    },
    statusBoxText: {
        fontFamily: styleVar.fontCondensed,
        color: '#FFF',
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 24,
        paddingTop: 17,
        paddingBottom: 5,
        android: {
            paddingBottom: 12
        }
    },
    greenBg: {
        backgroundColor: styleVar.colorGreen
    },
    shapeGreen: {
        borderBottomColor: styleVar.colorGreen
    },
    roundButton: {
        paddingHorizontal: 20,
        marginTop: 5,
        alignSelf: 'stretch'
    }
})


class MyLionsCompetitionGameListing extends Component {

    constructor(props) {
        super(props)
        this.isUnMounted = false
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.round_id = null
        this.state = {
            isLoaded: false,
            userID:'',
            gameList: this.ds.cloneWithRows([]),
            isNetwork: true
        }
    }

    componentWillMount() {
        getUserId().then((userID) => {
            this.setState({userID})
        }).catch((error) => {})
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    _drillDown = (data, route) => {
        this.props.drillDown(data, route)
    }

    _showError(error) {
        if(!this.state.isNetwork) return

       if(error === 'Please make sure that you\'re connected to the network.') {
           this.setState({
               isNetwork: false
           })
       }
        if(error !== ''){
            Alert.alert(
                'An error occured',
                error,
                [{text: 'Dismiss'}]
            )
        }
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

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <Grid key={rowID}>
                <Row>
                    {
                        rowData.map((item, key) => {
                            let styleGridBoxImgWrapper = (key === 0)? [styles.gridBoxImgWrapper, styles.gridBoxImgWrapperRight] : [styles.gridBoxImgWrapper]
                            let triangleShape = item.IsPlayed? [shapes.triangle] : [shapes.triangle, locStyle.shapeGreen]
                            let statusBoxText = item.IsPlayed? 'VIEW RESULTS' : 'PLAY'
                            let statusBox = [locStyle.statusBox, ]
                            let statusBoxRoute = item.IsPlayed? 'myLionsCompetitionGameResults' : 'myLionsManageGame'
                            if (!item.IsPlayed) {
                                statusBox.push(locStyle.greenBg)
                            }

                            let gridBoxTouchable = (key ===  0)?[styles.gridBoxTouchable, styles.gridBoxTitleRight, locStyle.gridBoxWrapper] : [styles.gridBoxTouchable, locStyle.gridBoxWrapper]
                            return (
                                <Col key={key}>
                                    <View style={gridBoxTouchable}>
                                        <View style={[styles.gridBoxTouchableView, locStyle.gridBoxWrapper, ]}>
                                            <View style={styleGridBoxImgWrapper}>
                                                <ImagePlaceholder 
                                                    width = {styleVar.deviceWidth / 2}
                                                    height = {styleVar.deviceWidth / 2}>
                                                    <Image transparent
                                                        resizeMode='contain'
                                                        source={{uri: item.image}}
                                                        style={styles.gridBoxImg} />
                                                </ImagePlaceholder>
                                            </View>
                                            <View style={locStyle.gridBoxTitle}>
                                                <Text style={locStyle.gridBoxTitleText} numberOfLines={1}>
                                                    { item.title.toUpperCase() }
                                                </Text>
                                                <Text style={locStyle.gridBoxTitleSupportText} numberOfLines={3}>
                                                    { item.description }
                                                </Text>

                                                <ButtonFeedback rounded style={[styles.roundButton, styles.roundButtonAlt, locStyle.roundButton]} onPress={()=> { this._drillDown(item, 'myLionsOppositionSquad') }}>
                                                    <Text style={[styles.roundButtonLabel, styles.roundButtonLabelAlt]}>
                                                        VIEW TEAM
                                                    </Text>
                                                </ButtonFeedback>
                                            </View>
                                        </View>
                                        <ButtonFeedback onPress={()=> { this._drillDown(Object.assign(item,{round_id:this.round_id}), statusBoxRoute) }}>
                                            <View style={triangleShape} />
                                            <View style={statusBox}>
                                                <Text style={locStyle.statusBoxText}>
                                                    {statusBoxText}
                                                </Text>
                                            </View>
                                        </ButtonFeedback>
                                    </View>
                                </Col>
                            )
                        }, this)
                    }
                </Row>
            </Grid>
        )
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        back={true}
                        title='MY LIONS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    
                    <View style={styles.pageTitle}>
                        <Text style={styles.pageTitleText}>ROUND 1 COMPETITION</Text>
                    </View>

                    {
                        this.state.isLoaded?
                        <ListView
                        ref={(scrollView) => { this._scrollView = scrollView }}
                        dataSource={this.state.gameList}
                        renderRow={this._renderRow.bind(this)}
                        enableEmptySections = {true}
                        renderFooter={() => <LionsFooter isLoaded={true} /> } />
                        :
                        <ActivityIndicator style={loader.centered} size='large' />
                    }
                        
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
                </View>
            </Container>
        )
    }

    componentDidMount() {
        setTimeout(() => this._getList(), 600)        
    }

    _getList(){
      console.log('_getList')
      this.setState({ isLoaded: false },()=>{
            let {userProfile,drillDownItem} = this.props
            console.log('drillDownItem',drillDownItem)
            console.log('userProfile',userProfile)
            this.round_id=drillDownItem.round_id
            let optionsGameList = {
                url: 'http://biltestapp.azurewebsites.net/GetGameList',
                data: {
                  id:userProfile.userID,
                  first_name:userProfile.firstName,
                  last_name:userProfile.lastName,
                  round_id:drillDownItem.round_id
                },
                onAxiosStart: null,
                onAxiosEnd: null,
                method: 'post',
                channel: 'EYC3',
                isQsStringify:false,
                onSuccess: (res) => {
                    if(res.data) {
                        console.log('res.data',res.data)
                        this.setState({isLoaded:true,gameList:this.ds.cloneWithRows(this._mapJSON(res.data.games))})
                    }
                },
                onError: ()=>{
                    this.setState({isLoaded:true})
                },
                onAuthorization: () => {
                        this._signInRequired()
                },
                isRequiredToken: true
            }
            service(optionsGameList)        
      })
    }
}

function bindAction(dispatch) {
    return {
            drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect((state) => {
    return {
        drillDownItem: state.content.drillDownItem,
        userProfile: state.squad.userProfile,
    }
},  bindAction)(MyLionsCompetitionGameListing)