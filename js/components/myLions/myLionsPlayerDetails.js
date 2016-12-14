
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
import { pushNewRoute, replaceRoute } from '../../actions/route'
import { setAccessGranted } from '../../actions/token'
import { removeToken } from '../utility/asyncStorageServices'
import { service } from '../utility/services'

class MyLionsPlayerDetails extends Component {
    constructor(props){
        super(props)
        this.favAddUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/protected/player/add',
        this.favRemoveUrl = 'https://api-ukchanges.co.uk/lionsrugby/api/protected/player/remove',
        this.playerid = this.props.detail.id,
        this.playerName = this.props.detail.name,
        this.state = {
            isFav : this.props.detail.isFav,
            isFormSubmitting: false
        }
    }

    _replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    _reLogin() {
        removeToken()
        this.props.setAccessGranted(false)
        this._replaceRoute('login')
    }

    _signInRequired() {
        Alert.alert(
            'An error occured',
            'Please sign in your account.',
            [{
                text: 'SIGN IN', 
                onPress: this._reLogin.bind(this)
            }]
        )
    }

    errCallback(error) {
        this.setState({
            isFormSubmitting: false
        })
        if(error===INVALID_TOKEN||error&&error.response&&error.response.status=== 401) {
            this._signInRequired()
        }
        else {
            alertBox(
                        'An Error Occured',
                        'Something went wrong with processing your request. Please try again later.',
                        'Dismiss'
                    )
        }
    }

    _showError(error) {
        Alert.alert(
            'An error occured',
            error,
            [{text: 'Dismiss'}]
        )
    }

    _editPlayer() {  
        let url = this.state.isFav? this.favRemoveUrl : this.favAddUrl
        let options = {
            url: url,
            data: {
                'playerId': this.playerid
            },
            onAxiosStart: () => {
                this.setState({ isFormSubmitting: true })
            },
            onAxiosEnd: () => {
                this.setState({ isFormSubmitting: false })
            },
            onSuccess: (res) => {
                let successDesc = this.state.isFav? 'removed from your list' : 'added to your list'
                this.setState({ isFav: !this.state.isFav }, () => {
                    Alert.alert(
                        'Player List Update',
                        `${this.playerName} has been ${successDesc}`,
                        [{ text: 'OK' }]
                    )
                })
            },
            onError: (res) => {
                this.setState({ isFormSubmitting: false }, () => {
                    this._showError(res)
                })
            },
            onAuthorization: () => {
                this.setState({ isFormSubmitting: false }, () => {
                    this._signInRequired()
                })
            },
            isRequiredToken: true
        }

        service(options)
    }

    _myLions(route) {
        this.props.pushNewRoute(route)
    }

    render() {
        let buttonText = ''

        if (this.state.isFormSubmitting) {
            buttonText = this.state.isFav === true? 'REMOVING..':'ADDING..'
        } else {
            buttonText = this.state.isFav === true? 'REMOVE':'ADD'
        }

        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />

                    <LinearGradient colors={['#AF001E', '#81071C']} style={styles.header}>
                        <Image source={{uri:this.props.detail.image}} style={styles.imageCircle}/>
                        <View style={styles.headerPlayerDetails}>
                            <Text style={styles.headerPlayerName}>{this.props.detail.name.toUpperCase()}</Text>
                            <Text style={styles.headerPlayerPosition}>{this.props.detail.position}</Text>
                        </View>

                        <View style={styles.buttons}>
                            <ButtonFeedback
                                disabled = {this.state.isFormSubmitting} 
                                onPress={()=> this._editPlayer()} 
                                style={[
                                    styles.btn,
                                    styles.btnLeft,
                                    this.state.isFav === true? styles.btnLeftRed : styles.btnGreen
                                ]}>
                                <Text style={styles.btnText}>{buttonText}</Text>
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
                                {this.props.detail.desc? this.props.detail.desc : ''}
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
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        setAccessGranted:(isAccessGranted)=>dispatch(setAccessGranted(isAccessGranted))
    }
}

export default connect((state) => {
    return {
        detail: state.content.drillDownItem,
        isAccessGranted: state.token.isAccessGranted
    }
}, bindAction)(MyLionsPlayerDetails)
