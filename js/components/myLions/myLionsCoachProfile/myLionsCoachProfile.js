
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, Alert,  ScrollView, Modal, ActivityIndicator,WebView } from 'react-native'
import { Container, Thumbnail, Header, Title, Text, Button, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../../../themes/base-theme'
import styles from './styles'
import shapes from '../../../themes/shapes'
import LionsHeader from '../../global/lionsHeader'
import EYSFooter from '../../global/eySponsoredFooter'
import LionsFooter from '../../global/lionsFooter'
import ImageCircle from '../../utility/imageCircle'
import ButtonFeedback from '../../utility/buttonFeedback'
import { pushNewRoute, replaceRoute } from '../../../actions/route'
import styleVar from '../../../themes/variable'
import { strToUpper } from '../../utility/helper'
import ImagePlaceholder from '../../utility/imagePlaceholder'


const  TitleAndDescribe = ({title,describe}) => {
    return (
      <View >
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textDetail}>{describe}</Text>
      </View>
    )
}
class MyLionsCoachProfile extends Component {
    constructor(props){
        super(props)
        this._scrollView = ScrollView
        this.state={
          height:0,
        }
    }

    render() {
        let name = this.props.detail.name ? this.props.detail.name.toUpperCase() : ''
        let role = this.props.detail.name ? this.props.detail.role : ''
        let bio = `<!DOCTYPE html>
            <html>
                <head>
                    <style>
                        body { width: ${parseInt(styleVar.deviceWidth)-50}px; font-size: 18px; font-family: 'Georgia'; line-height: 22px; color: rgb(38,38,38); }
                        h1 { font-size: 18px;font-family: 'Georgia';line-height: 18px; color: rgb(38,38,38);margin-top: 20px;margin_bottom:0;font-weight:bold }
                        p{ font-size: 18px; font-family: 'Georgia'; line-height: 22px; color: rgb(38,38,38); } 
                        ul { font-size: 18px; line-height: 24px; font-family: 'Georgia'; }
                        li { font-size: 18px; font-family: 'Georgia'; line-height: 24px; color: rgb(38,38,38); }
                    </style>
                </head>
                <body>
                    ${this.props.detail.bio}
                    <script>window.onload=function(){
                        window.location.hash = 1;document.title = document.body.clientHeight;}
                    </script>
                </body>
            </html>`

         return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        back={true} 
                        title='MY LIONS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />

                    <ScrollView bounces={false} ref={(scrollView) => { this._scrollView = scrollView }}>
                        <View style={styles.header}>
                            <View style={styles.playerPic}>
                                <Image resizeMode='cover' source={{uri:this.props.detail.image}} style={styles.playerPicImg}/>
                                <Image source={require('../../../../images/redCircle.png')} style={styles.playerPicCover}/>
                            </View>
                            
                            <View style={styles.headerPlayerDetails}>
                                <Text style={styles.headerPlayerName}>{name}</Text>
                                <Text style={styles.headerPlayerPosition}>{role}</Text>
                            </View>
                        </View>
                        <Grid style={styles.detailsGrid}>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>D.O.B</Text>
                                <Text style={styles.detail}>{this.props.detail.dob} </Text>
                            </Col>
                            <Col style={styles.detailsGridCol} size={1}>
                                <Text style={styles.detailsLabel}>BIRTHPLACE</Text>
                                <Text style={styles.detail}>{this.props.detail.birthplace} </Text>
                            </Col>
                        </Grid>
                        <Grid style={[styles.detailsGrid, styles.detailsGridColFull]}>
                            <Col style={[styles.detailsGridGreyBackground, styles.detailsGridCol]} size={1}>
                                <Text style={styles.detailsLabel}>UNION</Text>
                                <Text style={styles.detail}>{this.props.detail.union} </Text>
                            </Col>
                        </Grid>
                        <View style={styles.textView}>
                            <TitleAndDescribe title={'Playing Career'} describe={this.props.detail.playcareer} />
                            <TitleAndDescribe title={'Coaching Career'} describe={this.props.detail.coachcareer} />

                        </View>
                        <View style={[styles.webView,{height:this.state.height+20}]}>
                            <WebView
                              style={styles.webViewStyle}
                              bounces={false}
                              scrollEnabled={false}
                              source={{html: bio}}
                              onNavigationStateChange={(title)=>{
                                    if(title.title!== undefined && title.title.trim()!==''&&isNaN(title.title)===false) {
                                        this.setState({
                                            height:(parseInt(title.title)+60)
                                        })
                                    }
                                }}
                            />
                        </View>

                            <LionsFooter isLoaded={true} />
                    </ScrollView>
                    < EYSFooter mySquadBtn={true} />
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
    }
}

export default connect((state) => {
    return {
        detail: state.content.drillDownItem,
    }
}, bindAction)(MyLionsCoachProfile)
