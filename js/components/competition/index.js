'use strict'

import React, { Component,PropTypes } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView ,NativeModules} from 'react-native'
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
class Competition extends Component {
    constructor(props) {
         super(props)
         this._scrollView = ScrollView
         this.state = {
                  isImage: false,
                  imageUrl:''
              }

         }
         _setUpImage(){
             getSoticSuppliedImage("Competitions").then((imageUrl)=>{
             if (this.isUnMounted) return // return nothing if the component is already unmounted
                 if (imageUrl !== null && imageUrl !== 0 && imageUrl !== -1) {
                     this.setState({
                         isImage:(imageUrl !== '') ? true : false,
                         imageUrl:imageUrl
                     })
                 }
             }).catch((error) => {
                 if (__DEV__)console.log("A error occured while trying to get the header image: ", error)
             })
         }

         componentDidMount() {
           NativeModules.One.sendInteraction("/competition",
             { emailAddress : "" });
             setTimeout(()=>{this._setUpImage()},600)
         }

    render() {
        return (
            <Container theme={theme} style={styles.container}>
                <View style={styles.container}>
                    <LionsHeader 
                        title='COMPETITIONS'
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
                            <ExternalLink url='http://www.lionsrugby.com/fanzone/competitions.php#.V9ozFJh96rM'>
                                <Text style={styles.pageLinkText}>
                                     <Icon name='md-open' style={styles.pageLinkIcon} /> COMPETITIONS LINK
                                </Text>
                            </ExternalLink>
                        </View>
                        <View style={styles.pageContent}>
                            <Text style={[styles.pageHeader, styles.pageText]}>
                                Welcome to the official competitions page of The British & Irish Lions!
                            </Text>
                            <Text style={[styles.pageText]}>
                                Our special competitions are your chance to win unique prizes including signed clothing, equipment and memorabilia. You can also win opportunities to attend special Lions events.
                            </Text>
                            <Text style={[styles.pageText]}>
                                To keep up to date with all our competitions, make sure you have signed up to receive our emails and follow us on Social Media.
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

export default connect(null, null)(Competition)
