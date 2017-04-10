'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView,NativeModules } from 'react-native'
import { Container, Text, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import styles from '../../themes/static-page'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ExternalLink from '../utility/externalLink'
import styleVar from '../../themes/variable'
import {getSoticSuppliedImage} from '../utility/apiasyncstorageservice/soticAsyncStorageService'

class Tours extends Component {
    constructor(props) {
         super(props)
         this._scrollView = ScrollView
         this.state = {
             isImage: false,
             imageUrl:''
         }

    }
    _setUpImage(){
        getSoticSuppliedImage("Tours").then((imageUrl)=>{
        if (this.isUnMounted) return // return nothing if the component is already unmounted
            if (imageUrl !== null && imageUrl !== 0 && imageUrl !== -1) {
                this.setState({
                    isImage:(imageUrl !== '') ? true : false,
                    imageUrl:imageUrl
                })
            }
        }).catch((error) => {
            console.log("A error occured while trying to get the header image: ", error)
        })
    }

    componentDidMount() {
        NativeModules.One.sendInteraction("/tours",
          { emailAddress : "" });
        setTimeout(()=>{this._setUpImage()},600)
    }


    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        title='SUPPORTER TOURS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        <ImagePlaceholder height={styleVar.deviceHeight / 3.4}>
                            {this.state.isImage ?
                               <Image source={{uri:this.state.imageUrl}} style={styles.pagePoster} />
                               :
                               null
                            }
                        </ImagePlaceholder>
                        <View style={styles.linkWrapper}>
                            <ExternalLink url='https://tours.lionsrugby.com'>
                                <Text style={styles.pageLinkText}>
                                    <Icon name='md-open' style={styles.pageLinkIcon} />  SUPPORTER TOURS LINK
                                </Text>
                            </ExternalLink>
                        </View>
                        <View style={styles.pageContent}>
                            <Text style={[styles.pageHeader, styles.pageText]}>
                                The British & Irish Lions is the last of the great rugby tours bringing together the best players from the four home unions and support that is unique in world sport.
                            </Text>
                            <Text style={styles.pageText}>
                                From Leicester to Limerick, Cardiff to Caledonia, fans unite under one banner – The Lions. A Lions Tour is not just about great rugby, it’s also the holiday of a lifetime, great experiences and special memories.
                            </Text>
                            <Text style={styles.pageText}>
                                Lions Supporter Tours provide fans with a direct and unbeatable link to the team. From the legends who have made their marks in Lions history to the head coach and team manager, nothing else gets you closer.
                            </Text>
                            <Text style={styles.pageText}>
                                An official Supporter Tour guarantees that genuine fans have the best possible access to official tickets, flights and accommodation as well as many other incredible supporter experiences.
                            </Text>
                            <Text style={styles.pageText}>
                                From watching the team train, to eve of Test events with a glittering array of former players and legends, to supporter villages on the day of the Test matches and so much more, an official Supporter Tour offers the very best fan experiences.
                            </Text>
                            <Text style={styles.pageText}>
                                Staff will be with you every step of the way – from the moment you make contact until the moment you land – it’s our commitment to you that makes us different.
                            </Text>
                            <Text style={styles.pageText}>
                                An official Tour means you are assured of quality, security and a service that means 98% of clients would recommend us and 95% of past bookers book again in the future.
                            </Text>
                            <Text style={styles.pageText}>
                                The Lions exist to Tour – we will make it a reality.
                            </Text>
                        </View>
                        <LionsFooter isLoaded={true} />
                    </ScrollView>
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}

export default connect(null, null)(Tours)
