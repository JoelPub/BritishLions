
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushNewRoute } from '../../../actions/route'
import { drillDown } from '../../../actions/content'
import { Image, Text, View, ScrollView, ListView,ActivityIndicator,DeviceEventEmitter } from 'react-native'
import { Container, Icon } from 'native-base'
import theme from '../../../themes/base-theme'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LoginRequire from '../../global/loginRequire'
import LionsHeader from '../../global/lionsHeader'
import EYSFooter from '../../global/eySponsoredFooter'
import LionsFooter from '../../global/lionsFooter'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import LoadingAnimation from '../../utility/loadingAnimation'
import ButtonFeedback from '../../utility/buttonFeedback'
import Versus from '../components/versus'
import TeamWidget from '../components/teamWidget'
import Tactics from '../components/TacticWidget'
import LinearGradient from 'react-native-linear-gradient'
import { setTacticsToRemove } from '../../../actions/tactics'

import SquadModal from '../../global/squadModal'
import shapes from '../../../themes/shapes'
import styles from './styles'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import loader from '../../../themes/loader-position'
import { service } from '../../utility/services'
import { strToUpper } from '../../utility/helper'
import GamePlayBtn from '../components/gamePlayBtn'
const locStyle = styleSheetCreate({
    headerStadium: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    headerStadiumText: {
        color: 'rgb(38,38,38)',
        fontSize: 18,
        lineHeight: 20,
        textAlign: 'center',
        fontFamily: styleVar.fontGeorgia
    },
    header: {
        backgroundColor: styleVar.colorText,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    headerText: {
        color: '#FFF',
        fontSize: 18,
        lineHeight: 20,
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed
    },
    gridBoxTitle: {
        position: 'relative',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: styleVar.colorGrey2,
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 12,
        backgroundColor: styleVar.colorGrey
        
    },
    gridBoxTitleText: {
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        color: styleVar.colorScarlet,
        fontSize: 24,
        lineHeight: 24
    },
    headerText2: {
        fontFamily: styleVar.fontCondensed,
        marginBottom: -8
    },
})



class MyLionsManageGame extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalResults: false,
            isLoaded:false,
            gameInfo:{},
            drillDownItem:this.props.drillDownItem,
            isNetwork: true,
            modalContent:this.getModalContent(),
            modalVisible: false,
            isGameOver: false
        }
        this.subscription = null
    }
    getModalContent(mode,title,subtitle,btn){
        switch(mode)  {
            case 'loading' :
                return(
                    <View style={[styles.modalContent]}>
                        <Text style={styles.modalContentTitleText}>PLAYING...</Text>
                           <LoadingAnimation />
                    </View>
                )
                break
            case 'message' :
                return(
                    <View style={styles.modalContent}>
                        <Text style={styles.modalContentTitleText}>{title}</Text>
                        <Text style={styles.modalContentText}>{subtitle}</Text>
                        <ButtonFeedback rounded label={btn} onPress={()=>this._setModalVisible(false)}  style={styles.modalConfirmBtn} />
                    </View>
                )
                break
            case 'info' :
                return (
                    <View style={[styles.modalContent]}>
                        <Text style={styles.modalContentTitleTextLeft}>MANAGE GAME</Text>
                        <Text style={styles.modalContentTextLeft}>Welcome to the Lions Fantasy Rugby Game, where you select a XV to take on the Experts XV. Like a real rugby match, you will be subject to factors outside of your control including the weather, stadium and referee. You can overcome these factors and emerge victorious by selecting the appropriate team and tactics.</Text>
                    </View>
                )
                break
            default:
                return (
                    <View>
                    </View>
                )
        }
    }

    _setModalVisible=(visible,mode,title,subtitle,btn) => {
        this.setState({
            modalVisible:visible,
            modalContent:visible?this.getModalContent(mode,title,subtitle,btn):this.getModalContent()
        })
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
                        <Text style={styles.pageTitleText}>MANAGE GAME</Text>
                        <ButtonFeedback 
                            style={styles.pageTitleBtnIconRight} 
                            onPress={() => this._setModalVisible(true,'info')}>
                            <Icon name='ios-information-circle-outline' style={styles.pageTitleBtnIcon} />
                        </ButtonFeedback>
                    </View>
                    {
                    this.state.isLoaded?
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>

                        <Versus gameData={this.state.drillDownItem} userData={this.props.userProfile} />
                        <View style={[locStyle.headerStadium]}>
                            <Text style={locStyle.headerStadiumText}>{this.grounds_name}</Text>
                        </View>
                        
                        <Grid>
                            <Row>                                
                                <Col >
                                    <View style={[styles.gridBoxTouchable, styles.gridBoxTitleRight, locStyle.gridBoxWrapper]}>
                                        <View style={[locStyle.header]}>
                                            <Text style={[locStyle.headerText, locStyle.headerText2]}>
                                                WEATHER
                                            </Text>
                                        </View>
                                        <View style={[styles.gridBoxTouchableView, locStyle.gridBoxWrapper, ]}>
                                            
                                            <View style={locStyle.gridBoxTitle}>
                                                <Text style={locStyle.gridBoxTitleText} numberOfLines={2}>
                                                    {strToUpper(this.weather_name)}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </Col>

                                <Col >
                                    <View style={[styles.gridBoxTouchable, locStyle.gridBoxWrapper]}>
                                        <View style={[locStyle.header]}>
                                            <Text style={[locStyle.headerText, locStyle.headerText2]}>
                                                REFEREE
                                            </Text>
                                        </View>
                                        <View style={[styles.gridBoxTouchableView, locStyle.gridBoxWrapper, ]}>
                                            
                                            <View style={locStyle.gridBoxTitle}>
                                                <Text style={locStyle.gridBoxTitleText} numberOfLines={2}>
                                                    {strToUpper(this.referees_name)}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </Col>
                            </Row>
                        </Grid>

                        
                        <View style={[styles.btns,styles.manageTeam,this.props.teamStatus&&(this.props.tactics!==null)&&styles.greenBackground]}>
                            <TeamWidget text={'TEAM'} iconText={'1'} onPress={()=>this.props.drillDown(this.state.drillDownItem, 'myLionsManageTeam')}  round_id={this.round_id} game={this.game}/>
                        </View>
                        <View style={[styles.btns,this.props.teamStatus&&(this.props.tactics!==null)&&styles.greenBackground]}>
                            <Tactics title={'TACTICS'} fullTactic={this.props.tactics}  iconText={'2'} onPress={()=>this.props.drillDown(this.state.drillDownItem, 'myLionsTactics')}  />
                        </View>
                        <View style={[styles.btns,this.props.teamStatus&&(this.props.tactics!==null)&&styles.greenBackground]} >
                             <GamePlayBtn _setModalVisible={this._setModalVisible.bind(this)} grounds_id={this.grounds_id} weather_id={this.weather_id} referees_id={this.referees_id}
                                          round_id={this.round_id} game={this.game}
                                          image={this.image} title={this.title}
                                          isGameOver={this.props.drillDownItem.isLiveResult}
                             />
                        </View>
                        <LionsFooter isLoaded={true} />
                    </ScrollView>
                    :
                    <ActivityIndicator style={loader.centered} size='large' />
                    }
                        
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
                    <SquadModal
                        modalVisible={this.state.modalVisible}
                        callbackParent={this._setModalVisible}>
                            {this.state.modalContent}
                    </SquadModal>
                </View>
            </Container>
        )
    }


    componentDidMount() {
        this.props.setTacticsToRemove('')
        this.setState({isLoaded:false},()=>{
            this.getInfo()
        })
      //  this.subscription = DeviceEventEmitter.addListener('leaveLeague',this.updatePlayButtonStatus);
    }
    updatePlayButtonStatus = () => {
        this.setState(
          {
             isGameOver:true
          })
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
    getInfo(){
        console.log('!!!this.props.drillDownItem',this.props.drillDownItem)

        let {drillDownItem} = this.state
        this.round_id=drillDownItem.round_id
        this.title=drillDownItem.title
        this.image=drillDownItem.image
        this.game=drillDownItem.game
        let optionsInfo = {
            url: 'http://bilprod.azurewebsites.net/GetGameElements',
            data: {id:this.props.userProfile.userID},
            onAxiosStart: null,
            onAxiosEnd: null,
            method: 'post',
            onSuccess: (res) => {
                console.log('res',res)
                if(res.data) {
                    console.log('res.data',res.data)
                    this.grounds_id=res.data[0].grounds[Math.trunc(Math.random()*res.data[0].grounds.length)].id
                    this.grounds_name=res.data[0].grounds[Math.trunc(Math.random()*res.data[0].grounds.length)].name
                    this.weather_id=res.data[0].weather[Math.trunc(Math.random()*res.data[0].weather.length)].id
                    this.weather_name=res.data[0].weather[Math.trunc(Math.random()*res.data[0].weather.length)].name
                    this.referees_id=res.data[0].referees[Math.trunc(Math.random()*res.data[0].referees.length)].id
                    this.referees_name=res.data[0].referees[Math.trunc(Math.random()*res.data[0].referees.length)].name
                    this.setState({isLoaded:true,gameInfo:res.data[0]})
                }
            },
            onError: ()=>{
                this.setState({isLoaded:true})
            },
            onAuthorization: () => {
                    this._signInRequired()
            },
            isRequiredToken: true,
            channel: 'EYC3',
            isQsStringify:false
        }
        service(optionsInfo)     
    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        setTacticsToRemove: (tactics)=>dispatch(setTacticsToRemove(tactics)),
    }
}

export default connect((state) => {
    console.log(state)
    return {
        drillDownItem: state.content.drillDownItem,
        isAccessGranted: state.token.isAccessGranted,
        userProfile: state.squad.userProfile,
        teamStatus: state.squad.teamStatus,
        netWork: state.network,
        tactics: state.tactics.tacticsData
    }
},  bindAction)(MyLionsManageGame)