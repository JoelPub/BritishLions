
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushNewRoute } from '../../../actions/route'
import { drillDown } from '../../../actions/content'
import { Image, Text, View, ScrollView, ListView,ActivityIndicator } from 'react-native'
import { Container, Icon } from 'native-base'
import theme from '../../../themes/base-theme'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LoginRequire from '../../global/loginRequire'
import LionsHeader from '../../global/lionsHeader'
import EYSFooter from '../../global/eySponsoredFooter'
import LionsFooter from '../../global/lionsFooter'
import ImagePlaceholder from '../../utility/imagePlaceholder'
import ButtonFeedback from '../../utility/buttonFeedback'
import Versus from '../components/versus'
import TeamWidget from '../components/teamWidget'
import LinearGradient from 'react-native-linear-gradient'
import { setTacticsToRemove } from '../../../actions/tactics'

import SquadModal from '../../global/squadModal'
import shapes from '../../../themes/shapes'
import styles from './styles'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import loader from '../../../themes/loader-position'
import { service } from '../../utility/services'
import { strToUpper } from '../../utility/helper'
import GamePlayBtn from '../components/gamePlayBtn'
import loadingImage from '../../../../images/loading.gif'
const locStyle = styleSheetCreate({
    headerStadium: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    headerStadiumText: {
        color: 'rgb(38,38,38)',
        fontSize: 18,
        lineHeight: 20,
        textAlign: 'center',
        fontFamily: styleVar.fontGeorgia
    },
    header: {
        backgroundColor: styleVar.colorText,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    headerText: {
        color: '#FFF',
        fontSize: 18,
        lineHeight: 20,
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed
    },
    gridBoxTitle: {
        position: 'relative',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: styleVar.colorGrey2,
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 12,
        backgroundColor: styleVar.colorGrey
        
    },
    gridBoxTitleText: {
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        color: styleVar.colorScarlet,
        fontSize: 24,
        lineHeight: 24
    },
    headerText2: {
        fontFamily: styleVar.fontCondensed,
        marginBottom: -8
    },
})


const dummyData = [
    {
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2015/lions/125/250x250/114146.jpg',
        headerLabel: 'weather'     

    },
    {
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2015/lions/125/250x250/19930.jpg',
        headerLabel: 'referees'    
    }
]


class MyLionsCompetitionGameResults extends Component {

    constructor(props) {
        super(props)
        this.isUnMounted = false
        this.state = {
            modalResults: false,
            isLoaded:false,
            gameInfo:{},
            drillDownItem:this.props.drillDownItem,
            isNetwork: true,
            modalContent:this.getModalContent(),
            modalVisible: false,
        }
    }
    getModalContent(mode,title,subtitle,btn){
        switch(mode)  {
            case 'loading' :
                return(
                    <View style={[styles.modalContent]}>
                        <Text style={styles.modalContentTitleText}>PLAYING...</Text>
                        <Image style={{width:50,height:50,alignSelf:'center',}} source={loadingImage} />    
                    </View>
                )
                break
            case 'message' :
                return(
                    <View style={styles.modalContent}>
                        <Text style={styles.modalContentTitleText}>{title}</Text>
                        <Text style={styles.modalContentText}>{subtitle}</Text>
                        <ButtonFeedback rounded label={btn} onPress={()=>this._setModalVisible(false)}  style={styles.modalConfirmBtn} />
                    </View>
                )
                break
            case 'info' :
                return (
                    <View style={[styles.modalContent]}>
                        <Text style={styles.modalContentTitleText}>MANAGE GAME</Text>
                        <Text style={styles.modalContentText}>Lorem ipsum doloramet, conse tetur adipiscing elit. Vestibulum in elit quam. Etiam ullamcorper neque eu lorem elementum, a sagittis sem ullamcorper. Suspendisse ut dui diam.</Text>
                    </View>
                )
                break
            default:
                return (
                    <View>
                    </View>
                )
        }
    }

    _setModalVisible=(visible,mode,title,subtitle,btn) => {
        this.setState({
            modalVisible:visible,
            modalContent:visible?this.getModalContent(mode,title,subtitle,btn):this.getModalContent()
        })
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        back={true}
                        title='MY LIONS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    
                    <View style={styles.pageTitle}>
                        <Text style={styles.pageTitleText}>MANAGE GAME</Text>
                        <ButtonFeedback 
                            style={styles.pageTitleBtnIconRight} 
                            onPress={() => this._setModalVisible(true,'info')}>
                            <Icon name='ios-information-circle-outline' style={styles.pageTitleBtnIcon} />
                        </ButtonFeedback>
                    </View>
                    {
                    this.state.isLoaded?
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>

                        <Versus gameData={this.state.drillDownItem} userData={this.props.userProfile} />
                        <View style={[locStyle.headerStadium]}>
                            <Text style={locStyle.headerStadiumText}>{this.state.gameInfo.grounds[Math.trunc(Math.random()*this.state.gameInfo.grounds.length)].name}</Text>
                        </View>
                        
                        <Grid>
                            <Row>
                                {
                                    dummyData.map((item, key) => {
                                        let styleGridBoxImgWrapper = (key === 0)? [styles.gridBoxImgWrapper, styles.gridBoxImgWrapperRight] : [styles.gridBoxImgWrapper]
                                        let gridBoxTouchable = (key ===  0)?[styles.gridBoxTouchable, styles.gridBoxTitleRight, locStyle.gridBoxWrapper] : [styles.gridBoxTouchable, locStyle.gridBoxWrapper]
                                        let randomNumber=Math.trunc(Math.random()*this.state.gameInfo[item.headerLabel].length)
                                        return (
                                            <Col key={key}>
                                                <View style={gridBoxTouchable}>
                                                    <View style={[locStyle.header]}>
                                                        <Text style={[locStyle.headerText, locStyle.headerText2]}>
                                                            {strToUpper(item.headerLabel)}
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.gridBoxTouchableView, locStyle.gridBoxWrapper, ]}>
                                                        
                                                        <View style={locStyle.gridBoxTitle}>
                                                            <Text style={locStyle.gridBoxTitleText} numberOfLines={2}>
                                                                {strToUpper(this.state.gameInfo[item.headerLabel][randomNumber].name)}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Col>
                                        )
                                    }, this)
                                }
                            </Row>
                        </Grid>

                        
                        <View style={[styles.btns,styles.manageTeam,this.props.teamStatus&&styles.greenBackground]}>
                            <TeamWidget text={'TEAM'} iconText={'1'} onPress={()=>this.props.drillDown(this.state.drillDownItem, 'myLionsManageTeam')}  />
                        </View>
                        <View style={[styles.btns,this.props.tactics&&styles.greenBackground]}>
                            <TeamWidget text={'TACTICS'}  iconText={'2'} onPress={()=>this.props.drillDown(this.state.drillDownItem, 'myLionsTactics')}  />
                        </View>
                        <View style={[styles.btns,this.props.teamStatus&&styles.greenBackground]} >
                             <GamePlayBtn _setModalVisible={this._setModalVisible.bind(this)}/>    
                        </View>
                        <LionsFooter isLoaded={true} />
                    </ScrollView>
                    :
                    <ActivityIndicator style={loader.centered} size='large' />
                    }
                        
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
                    <SquadModal
                        modalVisible={this.state.modalVisible}
                        callbackParent={this._setModalVisible}>
                            {this.state.modalContent}
                    </SquadModal>
                </View>
            </Container>
        )
    }


    componentDidMount() {
        this.props.setTacticsToRemove('')
        this.setState({isLoaded:false},()=>{
            this.getInfo()
        })
    }
    _showError(error) {
        if(!this.state.isNetwork) return

       if(error === 'Please make sure that you\'re connected to the network.') {
           this.setState({
               isNetwork: false
           })
       }
        if(error !== ''){
            Alert.alert(
                'An error occured',
                error,
                [{text: 'Dismiss'}]
            )
        }
    }
    getInfo(){
        let optionsInfo = {
            url: 'http://biltestapp.azurewebsites.net/GetGameElements',
            data: {id:this.props.userProfile.userID},
            onAxiosStart: null,
            onAxiosEnd: null,
            method: 'post',
            onSuccess: (res) => {
                console.log('res',res)
                if(res.data) {
                    console.log('res.data',res.data)
                    this.setState({isLoaded:true,gameInfo:res.data})
                }
            },
            onError: ()=>{
                this.setState({isLoaded:true})
            },
            onAuthorization: () => {
                    this._signInRequired()
            },
            isRequiredToken: true,
            channel: 'EYC3',
            isQsStringify:false
        }
        service(optionsInfo)     
    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        setTacticsToRemove: (tactics)=>dispatch(setTacticsToRemove(tactics)),
    }
}

export default connect((state) => {
    console.log(state)
    return {
        drillDownItem: state.content.drillDownItem,
        isAccessGranted: state.token.isAccessGranted,
        userProfile: state.squad.userProfile,
        teamStatus: state.squad.teamStatus,
        netWork: state.network,
        tactics: state.tactics.tacticsData
    }
},  bindAction)(MyLionsCompetitionGameResults)