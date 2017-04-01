'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import Swiper from 'react-native-swiper'
import theme from '../../themes/base-theme'
import styles from './styles'
import styleVar from '../../themes/variable'
import PaginationButton from '../utility/paginationButton'
import LionsHeader from '../global/lionsHeader'
import ImagePlaceholder from '../utility/imagePlaceholder'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import Lightbox from 'react-native-lightbox'
import Slider from '../utility/imageSlider'
import Share from 'react-native-share'
import RNFetchBlob from 'react-native-fetch-blob'
import { alertBox } from '../utility/alertBox'
import loader from '../../themes/loader-position'

class Gallery extends Component {

    constructor(props) {
         super(props)
         this.state = {
              currentImg: 0,
              isSubmitting: false,
              isLoaded:false
         }
         this.content=this.props.content
    }

    renderPagination = (index, total, context) => {
        return (
            <View style={styles.swiperNumber}>
                <Text style={styles.swiperNumberText}>
                    {index + 1} of {total}
                </Text>
            </View>
        )
    }
    componentDidMount(){
        this.content.images.map((value,index)=>{
            Image.getSize(value.image,(width,height)=>{
                Object.assign(value,{'width':width,'height':height})
                if(index===this.content.images.length-1) {
                    console.log('this.content.images',this.content.images)
                    this.setState({isLoaded:true}) 
                }
                
            })
        })
        
    }
    renderContent() {
        let imgStyle=Slider.galleryPoster
        let viewStyle=null
        if(this.children.props.w<this.children.props.h) {
            imgStyle=[Slider.galleryPoster,{transform:[{scale:styleVar.deviceHeight/260}],}]
        }
        else {
            viewStyle={flex:1}
            imgStyle=[Slider.galleryPoster,{transform:[{rotateZ:'90deg'},{scale:styleVar.deviceHeight/(styleVar.deviceWidth+100)}],flex:1,flexDirection:'row'}]
        }
        
        return (
                <View style={viewStyle}>
                    <Text style={styles.galleryPosterCaption}> {this.children.props.caption}</Text>
                    <Image style={imgStyle} source={{uri:this.children.props.source.uri}} />
                </View>
            )
    }

    shareImg(context, imgUrl,callback){
        this.setState({
            isSubmitting:true
        })
        RNFetchBlob.fetch('GET',imgUrl)
        .then(
            function(res) {
                callback()
                
                Share.open({
                    title:context,
                    message:context,
                    subject:context,
                    url: `data:image/png;base64,${res.base64()}`
                }).then((info)=>{
                    //callback()
                }).catch((errorMessage)=>{
                    if(errorMessage !== 'undefined' && errorMessage.error !== 'undefined' && errorMessage.error !== 'User did not share'){
                        alertBox(
                            '',
                            'Image is not shared' + JSON.stringify(errorMessage) + statusCode,
                            'Dismiss'
                        )
                    }
                    //callback()
                })
            }
        )
        .catch((errorMessage,statusCode)=>{
            //callback()
        })
    }

    callback(){
        this.setState({
            isSubmitting:false
        })
    }
    
    render() {
        return (
            <Container theme={theme}>
                <View style={styles.background}>
                    <LionsHeader 
                        back={true} 
                        title='GALLERIES'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        <View style={styles.galleryDetailHeader}>
                            <Text style={styles.galleryDetailHeaderText}>
                                {this.content.title}
                            </Text>
                        </View>

                        <View>
                        {
                            this.state.isLoaded?
                            <Swiper
                                ref='swiper'
                                height={270}
                                renderPagination={this.renderPagination}
                                onMomentumScrollEnd={(e, state, context) => this.setState({currentImg:state.index})}
                                loop={false}>
                                {
                                    this.content.images.map((img,index)=>{
                                        return(
                                            <Lightbox key={index} navigator={this.props.navigator} renderContent={this.renderContent}>
                                                <Image style={Slider.galleryPoster} source={{uri:img.image}} caption={img.caption} w={img.width} h={img.height}/>
                                            </Lightbox>
                                        )
                                    })
                                }
                            </Swiper>:
                            <ActivityIndicator style={loader.centered} size='small' />
                        }
                            
                        </View>

                        <View style={styles.shareWrapper}>
                            <TouchableOpacity
                                disabled = {this.state.isSubmitting}
                                onPress={ ()=> this.shareImg(this.content.title,this.content.images[this.state.currentImg].image,this.callback.bind(this)) }
                                style={styles.shareLink}>
                                <Text style={styles.shareLinkText}>SHARE</Text>
                                {
                                    this.state.isSubmitting?
                                        <ActivityIndicator color={styleVar.colorScarlet} size='small' /> 
                                    :
                                        
                                        <Icon name='md-share-alt' style={styles.shareLinkIcon} />
                                }   
                            </TouchableOpacity>
                        </View>

                        <View style={styles.description}>
                            <Text style={styles.paragraph}>
                                {this.content.title}
                            </Text>
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
    content: state.content.drillDownItem
  }
}, null)(Gallery)