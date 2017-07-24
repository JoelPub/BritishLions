'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, TouchableHighlight } from 'react-native'
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
import { NativeModules} from 'react-native'

class LionsStore extends Component {
    constructor(props) {
         super(props)
         this._scrollView = ScrollView
         this.state = {
             isImage: false,
             imageUrl:''
         }

    }
    _setUpImage(){
        getSoticSuppliedImage('Store').then((imageUrl)=>{
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
        setTimeout(()=>{this._setUpImage()},600)
    }
    nativeAndroid(){
        var sign = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCObG1l8i0tmmgOO+137QN+pfvZ4D9v24EaTyeVJWiPvtVdIfBkG8LjS7sI70zfqWeHEdBISWxSsUdFbtkTF9aqdF3APH+6EhVkG2+2rY4OD6+Xiyrl0CsJSMn6n3/k9JkhWHp0kPGIayk4LEFff5wtXaUQAy+wyCzefc3OHdxViQIDAQAB'
        if(sign){
            NativeModules.MyNativeModule.rnCallNative(sign)
        }
    }
    render() {
        return (
            <Container theme={theme} style={styles.container}>
                <View style={styles.container}>
                    <LionsHeader
                        title='OFFICIAL STORE'
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
                            <ExternalLink url='http://store.lionsrugby.com'>
                                <Text style={styles.pageLinkText}>
                                    <Icon name='md-open' style={styles.pageLinkIcon} />  SHOP AT THE LIONS OFFICIAL SHOP
                                </Text>
                            </ExternalLink>
                        </View>
                        <View style={styles.pageContent}>
                            <Text style={[styles.pageHeader, styles.pageText]}>
                                Whether you are travelling with the squad or supporting the team at home, you can wear the colours and display your passion for The British & Irish Lions!
                            </Text>
                            <Text style={styles.pageText}>
                                At the official Shop, you can take your pick from our full range of clothing or accessories to accompany your wardrobe, including the iconic British & Irish Lions jersey.
                            </Text>
                            <Text style={styles.pageText}>
                                  We also have a range of classic jerseys, t-shirts, gifts, leisure-wear and more. No matter what kind of rugby fan you are, the official Lions Shop has something to help you show your support for the 2017 squad.
                            </Text>
                            <Text style={styles.pageText}>
                                Ordering with the official Shop couldn’t be easier, with fast delivery options available to most locations across the globe, and hassle free returns to ensure your seamless shopping experience with us no matter where you are supporting the team.
                            </Text>
                            <ExternalLink url='http://store.lionsrugby.com'>
                                <Text style={styles.pageLink}>
                                    Shop at the Lions Official Shop <Icon name='md-open' style={styles.icon} />
                                </Text>
                            </ExternalLink>
                            <TouchableHighlight style={{width:80,height:40,alignItems:'center',marginTop:50}} underlayColor='#28780b'
                                                                onPress={()=>this.nativeAndroid()}>
                            <View style={{width:80,height:40,alignItems:'center',justifyContent:'center',
                                backgroundColor:'#35a40c',borderRadius:5}}>
                                <Text style={{color:'white',fontSize:17}}>确定</Text>
                            </View>
                            </TouchableHighlight>
                        </View>
                        <LionsFooter isLoaded={true} />
                    </ScrollView>
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}

export default connect(null, null)(LionsStore)
