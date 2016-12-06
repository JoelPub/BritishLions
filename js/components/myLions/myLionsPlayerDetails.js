
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, Alert } from 'react-native'
import { Container, Thumbnail, Header, Title, Content, Text, Button, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImageCircle from '../utility/imageCircle'
import ButtonFeedback from '../utility/buttonFeedback'
import { editFavList, getFavList, INVALID_TOKEN } from '../../actions/player'
import { pushNewRoute, replaceRoute } from '../../actions/route'
import { alertBox } from '../utility/alertBox'
import { setAccessGranted } from '../../actions/token'
import { removeToken } from '../utility/asyncStorageServices'

class MyLionsPlayerDetails extends Component {
    constructor(props){
        super(props)
        this.favAddUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/protected/player/add',
        this.favRemoveUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/protected/player/remove',
        this.favUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/protected/mylionsfavourit?_=1480039224954',
        this.playerid = this.props.detail.id
        this.playerList = []
        this.edit =false
        this.state ={
            isFav : this.props.detail.isFav
        }
    }
    componentWillMount() {
        // this.props.getFavList(this.favUrl)
    }

    replaceRoute(route) {
        this.props.replaceRoute(route)
    }

   _reLogin() {
        removeToken()
        this.props.setAccessGranted(false)
        this.replaceRoute('login')
    }

    _signInRequired() {
        Alert.alert(
            'An error occured',
            'Please sign in your account first.',
            [{
                text: 'SIGN IN', 
                onPress: this._reLogin.bind(this)
            }]
        )
    }

    errCallback(error) {
    if(error===INVALID_TOKEN||error&&error.response&&error.response.status=== 401) {
        this._signInRequired()
    }
    else {
        alertBox(
                    'An Error Occured',
                    'Something went wrong with your request. Please try again later.',
                    'Dismiss'
                )
    }

    }

    _editPlayer() {
        this.edit = true
        this.props.isAccessGranted?
            (
                this.state.isFav? 
                    this.props.editFavList(this.favRemoveUrl,this.favUrl,this.playerid,this.errCallback.bind(this))
                :
                    this.props.editFavList(this.favAddUrl,this.favUrl,this.playerid,this.errCallback.bind(this))
            )
        :
            this._requireLogin()     
    }

    componentWillReceiveProps(nextProps) {
            this.playerList=nextProps.playerList.split('|')
            this.setState({
                isFav:(this.playerList.indexOf(this.playerid)!==-1)
            })
            if (this.edit) {
                alertBox('Player List Update',this.playerList.indexOf(this.playerid)!==-1?'Added':'Removed')
                this.edit=false
            }
    }

    _myLions(route) {
        this.props.isAccessGranted? this.props.pushNewRoute(route) : this._signInRequired()         
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>

                    <LionsHeader back={true} title='MY LIONS' />


                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.header}>
                        <Image source={{uri:this.props.detail.image}} style={styles.imageCircle}/>
                        <View style={styles.headerPlayerDetails}>
                            <Text style={styles.headerPlayerName}>{this.props.detail.name}</Text>
                            <Text style={styles.headerPlayerPosition}>{this.props.detail.position}</Text>
                        </View>

                        <View style={styles.buttons}>
                            <ButtonFeedback onPress={()=> this._editPlayer()} style={[styles.btn, styles.btnLeft, this.state.isFav===true?styles.btnLeftRed:styles.btnGreen]}>
                                <Text style={styles.btnText}>{this.state.isFav===true?'REMOVE':'ADD'}</Text>
                            </ButtonFeedback>
                            <ButtonFeedback onPress={() => this._myLions('myLionsFavoriteList')} style={[styles.btn, styles.btnRight, styles.btnRed]}>
                                <Text style={styles.btnText}>MY LIONS</Text>
                            </ButtonFeedback>
                        </View>
                    </LinearGradient>

                    <Content>
                        <Grid style={styles.detailsGrid}>
                            <Col style={styles.detailsGridCol} size={1}>
                                <Image transparent
                                    resizeMode='contain'
                                    source={{uri:this.props.detail.logo}}
                                    style={styles.detailsNationLogo} />
                            </Col>
                            <Col style={styles.detailsGridCol} size={2}>
                                <Text style={styles.detailsLabel}>COUNTRY</Text>
                                <Text style={styles.detail}>{this.props.detail.country}</Text>
                            </Col>
                        </Grid>
                        <View style={[styles.detailsGridCol, styles.detailsGridColFull]}>
                            <Text style={styles.detailsLabel}>CLUB</Text>
                            <Text style={styles.detail}>{this.props.detail.honours}</Text>
                        </View>
                        <Grid style={styles.detailsGrid}>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>D.O.B</Text>
                                <Text style={styles.detail}>{this.props.detail.dob}</Text>
                            </Col>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>HEIGHT</Text>
                                <Text style={styles.detail}>{this.props.detail.heightm}</Text>
                            </Col>
                            <Col style={styles.detailsGridCol}>
                                <Text style={styles.detailsLabel}>WEIGHT</Text>
                                <Text style={styles.detail}>{this.props.detail.weightm}</Text>
                            </Col>
                        </Grid>
                        <View style={[styles.detailsGridCol, styles.detailsGridColFull]}>
                            <Text style={styles.detailsLabel}>BIRTHPLACE</Text>
                            <Text style={styles.detail}>{this.props.detail.birthplace}</Text>
                        </View>
                        <View style={styles.playerDesc}>
                            <Text style={styles.paragraph}>
                                {this.props.detail.desc?this.props.detail.desc:''}
                            </Text>
                        </View>
                        <LionsFooter isLoaded={true} />
                    </Content>
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}
function bindAction(dispatch) {
    return {
        getFavList: (favUrl) =>dispatch(getFavList(favUrl)),
        editFavList: (favEditUrl,favUrl,playerid,errorCallbck) =>dispatch(editFavList(favEditUrl,favUrl,playerid,errorCallbck)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}

export default connect((state) => {
    return {
        detail: state.player.detail,
        playerList: state.player.playerList,
        isLoaded: state.player.isLoaded,
        isAccessGranted: state.token.isAccessGranted
    }
}, bindAction)(MyLionsPlayerDetails)
