'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, NativeModules, ScrollView } from 'react-native'
import { Container, Header, Title, Text, Icon } from 'native-base'
import { alertBox } from '../utility/alertBox'
import EYSFooter from '../global/eySponsoredFooter'
import theme from '../../themes/base-theme'
import styles from './styles'
import LionsHeader from '../global/lionsHeader'
import Countdown from '../global/countdown'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import data from '../../../contents/fixtures/data.json'
import {getAddedToCalanderCheck,setAddedToCalanderCheck} from '../utility/asyncStorageServices'

// For mapping a static image only, since require() is not working with concatenating a dynamic variable
// should be delete this code once api is ready.
import images from '../../../contents/fixtures/images'

class FixtureDetails extends Component {

    constructor(props){
        super(props)
        this._scrollView = ScrollView
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
     let  date = this.props.details.date
     let dateNoSpace   = date.replace(/\s+/g, '')
     let  reallyDate = dateNoSpace.toLowerCase()

     let  interaction = "/fixtures/" + reallyDate + '/calendar'
     console.log(interaction)
     NativeModules.One.sendInteraction(interaction,
       { emailAddress : "" });

     let dateOfEvent = new Date(`${params.details.date} ${params.details.time}`).toISOString() // UTC Format
   let endDateOfEvent = new Date(`${params.details.date} ${params.details.time}`)
   endDateOfEvent.setHours(endDateOfEvent.getHours() + 2) // Add 2 hour for Event, to provide time range display
   let endTime = endDateOfEvent.toISOString() // UTC Format

   if (Platform.OS === 'android') {
       // Used third party for Calendar Event
       // On Function Params : String eventTitle, String descEvent, String locationEvent, String dateOfEvent
       NativeModules.CalendarMAndroid.addCalendarEvent(params.details.title, params.details.description, params.details.stadium, dateOfEvent)
   } else{
       getAddedToCalanderCheck().then((status) =>{
       console.warn("status", status)
           if(status && status === "added"){
               alertBox('Warning','You have added the events to the calendar')
            }else{
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
                    alertBox('','All the events have been added to calendar successfully')
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
      let  date = this.props.details.date
      let dateNoSpace   = date.replace(/\s+/g, '')
      let  reallyDate = dateNoSpace.toLowerCase()

      let  interaction = "/fixtures/" +reallyDate
      console.log(interaction)
        NativeModules.One.sendInteraction(interaction,
          { emailAddress : "" });
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
                            <View style={[styles.fixtureBanner, styles.fixtureBannerDetail]}>
                                <Text style={[styles.dateText, styles.dateTextDetail]}>{this.props.details.date.toUpperCase()}</Text>
                                <Text style={[styles.teamText, styles.teamTextDetail]}>{this.props.details.title}</Text>
                            </View>
                            <ImagePlaceholder height={170}>
                                <Image
                                    resizeMode='cover' 
                                    style={styles.fixtureImg}
                                    source={images[this.props.details.id]} />
                            </ImagePlaceholder>
                            <View style={styles.titleBar}>
                                <Text style={styles.titleBarText}>{this.props.details.stadiumlocation}</Text>
                                <Text style={[styles.titleBarText, styles.titleBarText2]}>{this.props.details.stadiumtime}</Text>
                            </View>
                            <Countdown endDate={`${this.props.details.date} ${this.props.details.time}`}/> 
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
                    </ScrollView>
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
