'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, NativeModules } from 'react-native'
import { Container, Header, Title, Content, Text, Icon } from 'native-base'
import { alertBox } from '../utility/alertBox'
import EYSFooter from '../global/eySponsoredFooter'
import theme from '../../themes/base-theme'
import styles from './styles'
import LionsHeader from '../global/lionsHeader'
import Countdown from '../global/countdown'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'


// For mapping a static image only, since require() is not working with concatenating a dynamic variable
// should be delete this code once api is ready.
import images from './images'

class FixtureDetails extends Component {

    constructor(props){
        super(props)

        this.state = {
            isGameIsOn: false
        }
    }

    componentWillReceiveProps() {
        this.state = {
            isGameIsOn: this.props.isGameIsOn
        }
    }

    calendarAddEvent(params){
        let dateOfEvent = new Date(params.details.date).toISOString() // UTC Format
        let endDateOfEvent = new Date(params.details.date)
        endDateOfEvent.setHours(endDateOfEvent.getHours() + 1) // Add 1 hour for Event, to provide time range display
        let endTime = endDateOfEvent.toISOString() // UTC Format

        if (Platform.OS === 'android') { 
            // Used third party for Calendar Event
            // On Function Params : String eventTitle, String descEvent, String locationEvent, String dateOfEvent
            NativeModules.CalendarMAndroid.addCalendarEvent(params.details.title, params.details.description, params.details.stadium, dateOfEvent)
        } else { 
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
                            alertBox('Sucess','Saved to Calendar')
                        })
                        .catch(error => {
                            // handle error
                            alertBox('Error','Event cannot be saved to Calendar. Please try again later')
                        })
                    }else{
                        alertBox('No Access','Please authorize Calendar Access in the Device Settings')
                    }
                })
                .catch(error => {
                    // handle error
                    alertBox('No Access','Please authorize Calendar Access in the Device Settings')
                })
        }
    }

    render() {
        

        return (
            <Container theme={theme} style={styles.container}>
                <View style={styles.background}>
                    <LionsHeader back={true} title='FIXTURES' />
                    <Content>
                        <View style={styles.content}>
                            <View style={[styles.fixtureBanner, styles.fixtureBannerDetail]}>
                                <Text style={[styles.dateText, styles.dateTextDetail]}>{this.props.details.date.toUpperCase()}</Text>
                                <Text style={[styles.teamText, styles.teamTextDetail]}>{this.props.details.title}</Text>
                            </View>
                            <Image
                                resizeMode='cover' 
                                style={styles.fixtureImg}
                                source={images[this.props.details.id]} />
                            <View style={styles.titleBar}>
                                <Text style={styles.titleBarText}>{this.props.details.stadium}</Text>
                            </View>
                            <Countdown endDate={this.props.details.date}/> 
                            <View style={styles.titleBarLink}>
                                {
                                    this.state.isGameIsOn?
                                       
                                        <Text style={styles.titleBarLinkText}>
                                            THE GAME IS TODAY!
                                        </Text>
                                    :
                                        <ButtonFeedback onPress={()=>this.calendarAddEvent(this.props)}>
                                            <Text style={styles.titleBarLinkText}>
                                                <Icon name='md-calendar' style={styles.icon} /> ADD TO CALENDAR
                                            </Text>
                                        </ButtonFeedback>
                                }
                            </View>
                            <Text style={styles.pageText}>{this.props.details.description}</Text>
                        </View>
                        <LionsFooter isLoaded={true} />
                    </Content>
                    <EYSFooter />
                </View>
            </Container>
        )
    }
}

export default connect((state) => {
    return {
        details: state.content.drillDownItem,
        isGameIsOn: !state.timer.isCountDownTimerEnd
    }
}, null)(FixtureDetails)

