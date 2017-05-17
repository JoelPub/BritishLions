'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, NativeModules, ScrollView, ActivityIndicator } from 'react-native'
import { Container, Header, Title, Text, Icon } from 'native-base'
import { alertBox } from '../utility/alertBox'
import EYSFooter from '../global/eySponsoredFooter'
import theme from '../../themes/base-theme'
import styles from './styles'
import LionsHeader from '../global/lionsHeader'
import Countdown from '../global/countdown'
import { drillDown } from '../../actions/content'
import { pushNewRoute, replaceRoute } from '../../actions/route'
import { setJumpTo } from '../../actions/jump'
import LionsFooter from '../global/lionsFooter'
import LiveGame from './components/liveGame'
import PreGame from './components/preGame'
import PostGame from './components/postGame'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import {getAddedToCalanderCheck,setAddedToCalanderCheck} from '../utility/asyncStorageServices'
import moment from 'moment'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import { strToLower } from '../utility/helper'
import { getUserId,getRefreshToken } from '../utility/asyncStorageServices'
import LinearGradient from 'react-native-linear-gradient'
import { strToUpper, isEmptyObject } from '../utility/helper'

const Banner = ({data, gameStatus}) => (
    <View>
        <View style={[styles.fixtureBanner, styles.fixtureBannerDetail]}>
            <Text style={[styles.dateText, styles.dateTextDetail]}>{strToUpper(data.date)}</Text>
            <Text style={[styles.teamText, styles.teamTextDetail]}>{data.title}</Text>
        </View>
        <ImagePlaceholder height={200}>
            <LinearGradient style={styles.fixtureImgContainer} colors={['#d9d7d8', '#FFF']}>
                <Image
                    resizeMode='contain'
                    style={styles.fixtureImg}
                    source={{uri: data.banner}} />
            </LinearGradient>
        </ImagePlaceholder>
        <View style={styles.titleBar}>
            <Text style={styles.titleBarText}>{data.stadiumlocation}</Text>
            {
                gameStatus !== 'live' && <Text style={[styles.titleBarText, styles.titleBarText2]}>{data.stadiumtime}</Text>
            }
        </View>
    </View>
)

class FixtureDetails extends Component {

    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.isUnMounted = false

        this.state = {
            details: this.props.details,
            isLoaded: false,
            gameStatus: null
        }
    }

   calendarAddEvent(params) {
        let  {date} = this.state.details
        let dateNoSpace   = date.replace(/\s+/g, '')
        let  reallyDate = dateNoSpace.toLowerCase()

        let  interaction = "/fixtures/" + reallyDate + '/calendar'
        if (__DEV__)console.log(interaction)
        NativeModules.One.sendInteraction(interaction, { emailAddress : "" });

        let dateOfEvent = new Date(`${params.details.date} ${params.details.time}`) // UTC Format
        let isDyLightSaving = moment.utc(dateOfEvent).isDST()
        console.warn("dateOfEvent",dateOfEvent)
        console.warn("isDyLightSaving",isDyLightSaving)
        dateOfEvent = moment.utc(dateOfEvent).local().format("YYYY-MM-DD HH:mm:ss")
        console.warn("datessssss",dateOfEvent)
        //   let endDateOfEvent = new Date(`${params.details.date} ${params.details.time}`)
        //   endDateOfEvent.setHours(endDateOfEvent.getHours() + 2) // Add 2 hour for Event, to provide time range display
        //   let endTime = endDateOfEvent.toISOString() // UTC Format
        console.warn("dddddd", dateOfEvent)

        if (Platform.OS === 'android') {
            // Used third party for Calendar Event
            // On Function Params : String eventTitle, String descEvent, String locationEvent, String dateOfEvent
            NativeModules.CalendarMAndroid.addCalendarEvent(params.details.title, params.details.description, params.details.stadium, dateOfEvent)
        } else{
            getAddedToCalanderCheck().then((status) =>{
            console.warn("status", status)
                if (status && status === "added") {
                    alertBox('Warning','You have added the events to the calendar')
                } else{ 
                    let addedSuccess = true
                    data.map(function(item) {
                        let errorcode = 0
                        let params = {}
                        params.details = item
                        let dateOfEvent = new Date(`${params.details.date} ${params.details.time}`).toISOString() // UTC Format
                        let endDateOfEvent = new Date(`${params.details.date} ${params.details.time}`)
                        endDateOfEvent.setHours(endDateOfEvent.getHours() + 2) // Add 1 hour for Event, to provide time range display
                        let endTime = endDateOfEvent.toISOString() // UTC Format

                        // Used Native Module access for iOS
                        NativeModules.CalendarManager.authorizeEventStore()
                                .then(status => {
                                    // handle status
                                    if (status === 'authorized') {
                                        NativeModules.CalendarManager.saveEvent(params.details.title, {
                                            location: params.details.stadium,
                                            notes: params.details.description,
                                            startDate: dateOfEvent,
                                            endDate: endTime
                                        })
                                        .then(id => {
                                            // handle success
                                            //alertBox('Success','Saved to Calendar')
                                        })
                                        .catch(error => {
                                            // handle error
                                            addedSuccess = false
                                            errorcode = 1
                                            alertBox('Error','Event cannot be saved to Calendar. Please try again later')
                                        })
                                    }else{
                                        addedSuccess = false
                                        errorcode = 2
                                        alertBox('No Access','Please authorize Calendar Access in the Device Settings')
                                    }
                                })
                                .catch(error => {
                                    // handle error
                                    addedSuccess = false
                                    errorcode = 2
                                    alertBox('No Access','Please authorize Calendar Access in the Device Settings')
                                })

                    })

                    if(addedSuccess){
                        console.warn("all logged successfully")
                        setAddedToCalanderCheck()
                        alertBox('','All events have been added to calendar successfully')
                    }else{
                        switch(errorcode){
                            case 1:
                            alertBox('Error','Event cannot be saved to Calendar. Please try again later')
                            break;

                            case 2:
                            alertBox('No Access','Please authorize Calendar Access in the Device Settings')
                            break;
                        }
                    }
                }
            })
        }
    }

    Trim =(m)=>{
        while((m.length>0)&&(m.charAt(0)==' '))
            m   =   m.substring(1, m.length);

        while((m.length>0)&&(m.charAt(m.length-1)==' '))
            m = m.substring(0, m.length-1);
        return m;
    }

    componentDidMount() {
        let  {date} = this.state.details
        let dateNoSpace   = date.replace(/\s+/g, '')
        let  reallyDate = dateNoSpace.toLowerCase()

        let  interaction = "/fixtures/" +reallyDate
        //if (__DEV__)console.log(interaction)
        NativeModules.One.sendInteraction(interaction,{ emailAddress : "" })
        //if (__DEV__)console.log('this.state.details',this.state.details)

        this._analyzeGameStatus()
    }

    _analyzeGameStatus() {
        let fixture = this.state.details
        
        if (fixture.live) {
            this.setState({
                isLoaded: true,
                gameStatus: 'live'
            })
        } else if (fixture.pre) {
            this.setState({
                isLoaded: true,
                gameStatus: 'pre'
            })
        } else if (fixture.post) {
            this.setState({
                isLoaded: true,
                gameStatus: 'post'
            })
        } else {
            this.setState({
                isLoaded: true,
                gameStatus: null
            })
        }
    }

    _gameMode() {
        let fixtureDetails = this.state.details
        let gameStatus = this.state.gameStatus

        switch (gameStatus) {
            case 'live':
                return <LiveGame 
                            details={fixtureDetails} />
                break;
            case 'pre':
                return <PreGame 
                            details={fixtureDetails} 
                            pressAddCalendar={()=>this.calendarAddEvent(this.props)}
                            onPress={this.pickYourXVClick}/>
                break;
            case 'post':
                return <PostGame 
                            details={fixtureDetails} />
                break;
            default:
                return <View></View>
        }
    }

    _isSignIn(route) {
        getRefreshToken().then((refreshToken) => {
            if(refreshToken){
            this._navigateTo(route)
              this.props.setJumpTo('isFixtures')
            }
            else{
            this.props.setJumpTo(route)
            this._navigateTo('login')
            }
        }).catch((error) => {
            if (this.isUnMounted) return // return nothing if the component is already unmounted
            this._navigateTo('login')
        })
    }

    _navigateTo(route) {
        this.props.pushNewRoute(route)
    }

    pickYourXVClick = () =>{
        this._isSignIn('myLionsCompetitionCentre')
    }

    componentWillUnmount() {
        if(__DEV__)console.log('@@@fixturedetail componentWillUnmount')
        this.isUnMounted = true
    }

    render() {
        return (
            <Container theme={theme} style={styles.container}>
                <View style={styles.background}>
                    <LionsHeader 
                        back={true} 
                        title='FIXTURES'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        <View style={styles.content}>
                            <Banner data={this.state.details} gameStatus={this.state.gameStatus} />
                            {
                                this.state.isLoaded?
                                    this._gameMode()
                                :
                                    <View style={styles.activityIndicatorWrapper}>
                                        <ActivityIndicator size='small' /> 
                                    </View>
                            }
                        </View>
                        <LionsFooter isLoaded={true} />
                    </ScrollView>
                    <EYSFooter />
                </View>
            </Container>
        )
    }
}
function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),
    pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
    setJumpTo:(jumpRoute)=>dispatch(setJumpTo(jumpRoute)),
  }
}

export default connect((state) => {
    return {
        details: state.content.drillDownItem,
    }
}, bindAction)(FixtureDetails)
