'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { drillDown } from '../../../actions/content'
import { setAccessGranted } from '../../../actions/token'
import { Image, Text, View, ScrollView, ActivityIndicator, Alert } from 'react-native'
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
import { getUserId, removeToken ,getAccessToken} from '../../utility/asyncStorageServices'
import { actionsApi } from '../../utility/urlStorage'
import { pushNewRoute } from '../../../actions/route'

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
        fontSize: 27,
        lineHeight: 27,
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
        this.isUnMounted = false
        this.state={
            isLoaded: false,
            competitionInfo:[]
        }
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    _drillDown = (data) => {
        this.props.drillDown(data, 'myLionsCompetitionGameListing')
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
                            <Text style={styles.pageTitleText}>COMPETITION CENTRE</Text>
                        </View>

                        <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                            
                            <View style={styles.guther}>
                                <ProfileSummaryCard profile={this.props.userProfile}/>

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
                            }}>
                                <View style={styles.guther}>
                                    <View style={styles.rounds}>
                                    {
                                        this.state.competitionInfo.map((value,index)=>{
                                            return (
                                                <ButtonFeedback disabled={!value.is_available} onPress={()=>{this._drillDown([])}} key={index} style={{backgroundColor:'transparent'}}>
                                                    <Round title={`ROUND ${value.round_id} COMPETITION`} lock={!value.is_available} detail={value}/>
                                                </ButtonFeedback>
                                            )
                                        })
                                    } 
                                    <ButtonFeedback onPress={() => this.props.pushNewRoute('myLionsTestRound')} style={{backgroundColor:'transparent'}}>
                                        <Round title={'TEST ROUND'} lock={false} detail={{description:'Test Round'}}/>
                                    </ButtonFeedback>
                                    </View>
                                </View>
                            </View>
                            :
                            <ActivityIndicator style={loader.centered} size='large' />
                            }
                            <LionsFooter isLoaded={true} />
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
                let {userProfile} = this.props
                getAccessToken().then(token=>{
                    this.getInfo(token,userProfile.userID)
                })
            })
        }
    }


    componentWillMount() {
        // this.setState({isLoaded:false},()=>{
        //     this.getInfo()
        // })id
    }

    getInfo(token,userId){
        console.log('getInfo')
        let optionsInfo = {
            url: actionsApi.eyc3GetCompetitionCentreInfo,
            data: {
              access_token:token,
              id:userId
            },
            onAxiosStart: null,
            onAxiosEnd: null,
            method: 'post',
            channel: 'EYC3',
            isQsStringify:false,
            onSuccess: (res) => {
                if(res.data) {
                    console.log('res.data',res.data)
                    this.setState({isLoaded:true,competitionInfo:res.data.rounds},()=>{
                        this.props.setUserProfile(Object.assign(res.data,{userName:this.props.userProfile.userName,initName:this.props.userProfile.initName,userID:this.props.userProfile.userID}))
                    })
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
            'Your session has expired',
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
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}

export default connect((state) => {
    return {
        isAccessGranted: state.token.isAccessGranted,
        userProfile: state.squad.userProfile,
        netWork: state.network
    }
},  bindAction)(MyLionsCompetitionCentre)