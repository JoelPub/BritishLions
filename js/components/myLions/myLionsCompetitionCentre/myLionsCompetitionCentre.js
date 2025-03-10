'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { drillDown } from '../../../actions/content'
import { setAccessGranted } from '../../../actions/token'
import { Image, Text, View, ScrollView, ActivityIndicator, Alert ,DeviceEventEmitter} from 'react-native'
import { Container, Icon } from 'native-base'
import theme from '../../../themes/base-theme'
import styles from './styles'
import LoginRequire from '../../global/loginRequire'
import LionsHeader from '../../global/lionsHeader'
import EYSFooter from '../../global/eySponsoredFooter'
import LionsFooter from '../../global/lionsFooter'
import ButtonFeedback from '../../utility/buttonFeedback'
import styleVar from '../../../themes/variable'
import LinearGradient from 'react-native-linear-gradient'
import ProfileSummaryCard from '../components/profileSummaryCard'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import loader from '../../../themes/loader-position'
import { service } from '../../utility/services'
import { setUserProfile } from '../../../actions/squad'
import { setJumpTo } from '../../../actions/jump'
import { getUserId, removeToken ,getAccessToken,getUserFullName} from '../../utility/asyncStorageServices'
import { actionsApi } from '../../utility/urlStorage'
import { pushNewRoute } from '../../../actions/route'
import { setTeamDataTemp,setTeamData,setTeamToShow } from '../../../actions/squad'
import { strToUpper,strToLower } from '../../utility/helper'
import RatingPopUp from '../../global/ratingPopUp'

const locStyle = styleSheetCreate({
    round: {
        backgroundColor: 'rgb(191, 191, 191)',
        paddingHorizontal: 20,
        paddingBottom: 25,
        paddingTop: 30,
        borderRadius: 20,
        marginBottom: 30
    },
    roundStatus: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent'
    },
    roundStatusIcon: {
        fontSize: 24,
        color: '#FFF',
    },
    roundPlay: {
        backgroundColor: 'rgb(255, 230, 0)',
        height: 20,
        width: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    roundPlayIcon: {
        color: 'rgb(175, 0, 30)',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginTop: 2,
        marginLeft: 2,
        android: {
            marginTop: 0
        }
    },
    roundHeader: {
        flexDirection: 'row'
    },
    roundHeaderImg: {
        width: 34,
        height: 52,
        marginRight: 12
    },
    roundHeaderTitle: {
        flex: 1,
        justifyContent: 'center'
    },
    roundHeaderTitleText: {
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
        fontSize: 28,
        lineHeight: 28,
        color: '#FFF',
        marginTop: 14,
        android: {
            marginTop: 4,
        }
    },
    roundContent: {
        marginTop: 10
    },
    roundContentText: {
        fontFamily: styleVar.fontGeorgia,
        backgroundColor: 'transparent',
        fontSize: 18,
        lineHeight: 24,
        color: '#FFF',
    }
})

const Round = ({title, lock, detail}) => {
    let bgColor = lock? ['#bfbfbf', '#bfbfbf'] : ['#af001e', '#820417']

    return (
        <LinearGradient style={locStyle.round} colors={bgColor}>

            <View style={locStyle.roundStatus}>
                {
                    lock? 
                        <Icon name='md-lock' style={locStyle.roundStatusIcon} />
                    :
                        <View style={locStyle.roundPlay}>
                            <Icon name='ios-play' style={locStyle.roundPlayIcon} />
                        </View>
                }
            </View>

            <View style={locStyle.roundHeader}>
                <View style={locStyle.roundHeaderImage}>
                    <Image 
                        style={locStyle.roundHeaderImg} 
                        source={require('../../../../images/logo.png')}></Image>
                </View>
                <View style={locStyle.roundHeaderTitle}>
                    <Text style={locStyle.roundHeaderTitleText}>{ title }</Text>
                </View>
            </View>
            <View style={locStyle.roundContent}>
                <Text style={locStyle.roundContentText}>{detail.description}</Text>
            </View>
        </LinearGradient>
    )
}

class MyLionsCompetitionCentre extends Component {

    constructor(props) {
        super(props)
        this.state={
            isLoaded: false,
            competitionInfo:[],
            needReflash: false,
            userProfile: this.props.userProfile,
            modalRate: false
        }
        this.subscription = null
        this.subscriptionRate = null
    }

    componentDidMount() {
        setTimeout(()=>{
            this.props.setTeamDataTemp()
            this.props.setTeamData()
            this.props.setTeamToShow()            
        },1000)
        if(__DEV__)console.log('***************')
        if(__DEV__)console.log(this.props.jumpRoute)            
        this.subscriptionRate = DeviceEventEmitter.addListener('centerratingpopup',this.popupRating)
    }
    componentWillUnmount() {
        this.subscriptionRate.remove()
    }
    popupRating = (v) => {
        if(__DEV__)console.log('popupRating',v)
        if(v===false) {
          this.setState({modalRate:false})
        }
        else if(v===true) {
          this.setState({modalRate:false},()=>{

            this.setState({modalRate:true})
          })
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (__DEV__)console.log('componentWillReceiveProps')
        // if (__DEV__)console.log(this.props.userProfile)
        // if (__DEV__)console.log(nextProps.userProfile)
        if(this.props.userProfile!==nextProps.userProfile){
            // if (__DEV__)console.log('这里调用')
            // if (__DEV__)console.log(this.props.userProfile)
            // if (__DEV__)console.log(nextProps.userProfile)
            this.setState({
                userProfile: nextProps.userProfile
            })
        }

    }
    _drillDown = (data) => {
        data.is_test_round?data.is_active?this.props.drillDown(data, 'myLionsTestRound'):this.props.drillDown(data,'myLionsTestRoundSubmit'):this.props.drillDown(data, 'myLionsCompetitionGameListing')
    }
    measurePage = (event) => {
        if (__DEV__)console.log('measurePage')
        // if (__DEV__)console.log('event',event)
        const { x, y, width, height, } = event.nativeEvent.layout
        if (__DEV__)console.log(this.props.jumpRoute)
      if(this.props.jumpRoute === 'isFixtures'){
          this._scrollView.scrollTo({ y: y, animated: true })
          this.props.setJumpTo()
      }


    }
    render() {
        // if (__DEV__)console.log('render')
        let inintTestRound = false
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                        <LionsHeader 
                            back={true}
                            title='MY LIONS'
                            contentLoaded={true}
                            scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                        
                        <View style={styles.pageTitle}>
                            <Text style={styles.pageTitleText}>COMPETITION CENTRE</Text>
                        </View>

                        <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                            
                            <View style={styles.guther}>
                                <ProfileSummaryCard profile={this.state.userProfile}/>

                                <ButtonFeedback rounded style={[styles.roundButton, {marginBottom: 30}]} onPress={() => this.props.pushNewRoute('competitionLadder')}>
                                    <Icon name='ios-trophy' style={styles.roundButtonIcon} />
                                    <Text style={styles.roundButtonLabel}>
                                        LEADERBOARD
                                    </Text>
                                </ButtonFeedback>
                            </View>
                            {
                            this.state.isLoaded?
                            <View style={{
                                backgroundColor: styleVar.colorGrey,
                                borderColor: styleVar.colorGrey2,
                                borderTopWidth: 1,
                                paddingTop: 30
                            }}
                                  onLayout={this.measurePage}
                            >
                                <View style={styles.guther}>
                                    <View style={styles.rounds} >
                                    {
                                        this.state.competitionInfo.map((value,index)=>{
                                            return (
                                                <ButtonFeedback disabled={!value.is_available} onPress={()=>{this._drillDown(value)}} key={index} style={{backgroundColor:'transparent'}}>
                                                    <Round title={strToUpper(value.name)} lock={!value.is_available} detail={value}/>
                                                </ButtonFeedback>
                                            )
                                        })
                                    }
                                    </View>
                                </View>
                            </View>
                            :
                            <ActivityIndicator style={loader.centered} size='large' />
                            }
                            <LionsFooter isLoaded={true} />
                            {this.state.modalRate&&<RatingPopUp callbackParent={this.popupRating}/>}
                        </ScrollView>
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire onFinish={this._renderLogic.bind(this)} />
                </View>
            </Container>
        )
    }

    _renderLogic(isLogin) {
        if (isLogin) { // user is logged in
            this.setState({isLoaded:false},()=>{
                // let {userProfile} = this.props
                // getAccessToken().then(token=>{
                //     this.getInfo(token,userProfile)
                // })
                getUserId().then((userID) => {
                        getUserFullName().then((userName) => {
                            let firstName=''
                            let lastName=''
                            let initName = ''
                            if(typeof userName==='string') {
                                let u=userName.trim().replace(/\s+/g,' ')
                                // if (__DEV__)console.log('userName',userName)
                                firstName=u.split(' ')[0]||''
                                lastName=u.split(' ')[1]||''
                                initName = ''
                                u.split(' ').map((value, index)=>{
                                    initName = initName + value[0]
                                })
                                // if (__DEV__)console.log('firstName',firstName)
                                // if (__DEV__)console.log('lastName',lastName)
                                // if (__DEV__)console.log('initName',initName)
                            }
                            this.getInfo(userID,userName,firstName,lastName,initName)
                        }).catch((error) => {})
                }).catch((error) => {})
            })
        }
    }

    getInfo(userID,userName,firstName,lastName,initName){
        // if (__DEV__)console.log('getInfo')
        let optionsInfo = {
            url: actionsApi.eyc3GetCompetitionCentreInfo,
            data: {
              id:userID,
              first_name:firstName,
              last_name:lastName
            },
            onAxiosStart: null,
            onAxiosEnd: null,
            method: 'post',
            channel: 'EYC3',
            isQsStringify:false,
            onSuccess: (res) => {
                if(res.data&&res.data.rounds) {
                    // if (__DEV__)console.log('res.data',res.data)
                    this.setState({isLoaded:true,competitionInfo:res.data.rounds},()=>{
                        let userInfo = Object.assign(res.data, {
                        userName: userName, 
                        initName: initName, 
                        firstName: firstName,
                        lastName: lastName, 
                        userID: userID
                    })
                        this.props.setUserProfile(userInfo)
                    })
                }
                else {
                    this.setState({isLoaded:true})
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
        service(optionsInfo)        
    }

    _replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    reLogin() {
        removeToken()
        this.props.setAccessGranted(false)
        this._replaceRoute('login')
    }

    _signInRequired() {
        Alert.alert(
            'Warning',
            'Please sign into your account.',
            [{
                text: 'SIGN IN', 
                onPress: this._reLogin.bind(this)
            }]
        )
    }
}


function bindAction(dispatch) {
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        setUserProfile:(profile)=>dispatch(setUserProfile(profile)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted)),
        setTeamDataTemp:(team)=>dispatch(setTeamDataTemp(team)),
        setTeamData:(team)=>dispatch(setTeamData(team)),
        setTeamToShow:(teamToShow)=>dispatch(setTeamToShow(teamToShow)),
        setJumpTo:(jumpRoute)=>dispatch(setJumpTo(jumpRoute)),
    }
}

export default connect((state) => {
    let user = state.squad.userProfile
    return {
        isAccessGranted: state.token.isAccessGranted,
        userProfile: state.squad.userProfile,
        w:user.w,
        l:user.l,
        d:user.d,
        f:user.f,
        a:user.a,
        bp:user.bp,
        pts:user.pts,
        netWork: state.network,
        jumpRoute: state.jump.jumpRoute,
    }
},  bindAction)(MyLionsCompetitionCentre)