'use strict'

import React, { Component } from 'react'
import { Image, View, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { drillDown } from '../../actions/content'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import styles from './styles'
import { limitArrayList, strToLower, strToUpper } from '../utility/helper'
import ButtonFeedback from '../utility/buttonFeedback'
import ImagePlaceholder from '../utility/imagePlaceholder'
import LinearGradient from 'react-native-linear-gradient'
import LiveBox from '../global/liveBox'
import shapes from '../../themes/shapes'
import { service } from '../utility/services'
import FixtureInfoModel from  '../../modes/Fixtures'
import Immutable, { Map, List, Iterable } from 'immutable'

// For mapping a static image only, since require() is not working with concatenating a dynamic variable
// should be delete this code once api is ready.
//import fixturesList from '../../../contents/fixtures/data.json'
import fixturesImages from '../../../contents/fixtures/images'

const locStyle = styleSheetCreate({ 
    activityIndicatorWrapper: {
        padding: 20
    },
    bannerDesc: {
        paddingTop: 7
    },
    infoBox: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: styleVar.colorText,
    },
    infoBoxText: {
        marginBottom: 20,
        fontFamily: styleVar.fontGeorgia,
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',
        color: '#FFF',
    },
    bannerDetails: {
        backgroundColor: styleVar.colorText,
        paddingTop: 18,
        paddingBottom: 5
    },
    logoIcon: {
        width: 21,
        height: 32,
        backgroundColor: 'transparent',
        marginTop: -5,
        android: {
            marginTop: 0
        }
    },
})

const PageTitle = ({title}) => (
    <View style={styles.pageTitle}>
        <Text style={styles.pageTitleText}>
            {title}
        </Text>
    </View>
)

const Banner = ({data, pressBanner}) => {
    // TEMPORARY: get image FROM LOCAL UNTIL API IS NOT DONE
    let image = fixturesImages[data.id]
    
    return (
        <ButtonFeedback
            style={styles.banner}
            onPress={pressBanner}>
            <ImagePlaceholder height={200}>
                <LinearGradient style={styles.fixtureImgContainer} colors={['#d9d7d8', '#FFF']}>
                    <Image
                        resizeMode='contain'
                        style={styles.bannerImg}
                        source={image} />
                </LinearGradient>
            </ImagePlaceholder>
            <View style={[shapes.triangle, {marginTop: -12}]} />
            <View style={styles.bannerDetails}>
                <Text style={styles.bannerTitle}>{ strToUpper(data.date) }</Text>
                <Text style={styles.bannerDesc}>{ data.title }</Text>
            </View>
        </ButtonFeedback>
    )
}

const LiveGame = ({data, pressCoachBox, pressBanner}) => (
    <View>
        <PageTitle title='GAME NOW LIVE' />
        
        <LiveBox data={data} inverse={true}/>
        
        <Banner data={data} pressBanner={pressBanner}/>
        
        <View style={[styles.bannerDetails, locStyle.bannerDetails]}>
            <Text style={[styles.bannerDesc, locStyle.bannerDesc]}>Provincial Union vs British & Irish Lions</Text>
        </View>
        <View style={locStyle.infoBox}>
            <Text style={locStyle.infoBoxText}>
                Visit the British & Irish Lions Coach's Box for live match coverage and statistics.
            </Text>
            <ButtonFeedback 
                rounded 
                style={[styles.roundButton]}
                onPress={pressCoachBox}
            >
                <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                    style={locStyle.logoIcon}/>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.roundButtonLabel} >
                    COACH'S BOX
                </Text>
            </ButtonFeedback>
        </View>
    </View>
)

const PreGame = ({data, pressBanner}) => (
    <View>
        <PageTitle title='UPCOMING FIXTURE' />
        <Banner data={data} pressBanner={pressBanner}/>
    </View>
)

const PostGame = ({data, pressBanner}) => (
    <View>
        <PageTitle title='LAST FIXTURE' />
        <Banner data={data} pressBanner={pressBanner}/>
    </View>
)

class PlayerFigure extends Component {
    constructor(props){
        super(props)

        this.isUnMounted = false

        this.state = {
            getFixtureInfoURL: 'http://bilprod-r4dummyapi.azurewebsites.net/GetFixturesInfo', // dummy
            //getFixtureInfoURL: 'https://api.myjson.com/bins/qwn91', // dummy
            fixture: FixtureInfoModel().toJS(),
            gameStatus: null,
            isLoaded: false,
        }

    }

    componentDidMount() {
        setTimeout(() => {
            //this._fetchFixture()
            this._getFixturesInfo()
        }, 600)
    }

    _drillDown(data, route) {
        this.props.drillDown(data, route)
    }

    // _fetchFixture() {
    //     let fixturesLeft = []
    //     let dateNow = new Date
    //     //dateNow = 'Tue Jun 23 2017 14:25:22 GMT+0800 (PHT)'
    //     dateNow = Date.parse(dateNow)
       
    //     fixturesList.map(function(item, index) {
    //         let dateSched = Date.parse(new Date(`${item.date} ${item.time}`))
    //         //if (__DEV__)console.log(dateSched, new Date(`${item.date} ${item.time}`))
            
    //         if (dateSched > dateNow) {
    //             fixturesLeft.push(item)
    //         }
    //     })

    //     this.setState({
    //         fixturesList: fixturesLeft,
    //         fixturesLeft: limitArrayList(fixturesLeft, 1)
    //     })
    // }

    _getFixturesInfo() {
        service({
            url: this.state.getFixtureInfoURL,
            method: 'get',
            onSuccess: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                //if (__DEV__) console.log('res', res.data)
                if(res.data) {
                    this._analyzeFixtures(res.data)
                } else {
                    this.setState({ isLoaded: true })
                }
            }
        })
    }

    _analyzeFixtures(fixtures) {
        // logic: check if there's a 'live' then show it
        // if no 'live', the show the first 'pre'
        // if no 'live' and 'pre' then show the last 'post'

        let preFixturesArr = []
        let liveFixturesArr = []
        let postFixturesArr = []
        
        fixtures.map(function(fixture, index){
            let fixtureInfo = FixtureInfoModel.fromJS(fixture)

            if (fixtureInfo.pre) {
                preFixturesArr.push(fixtureInfo)
            }
            
            if (fixtureInfo.live) {
                liveFixturesArr.push(fixtureInfo)
            }

            if (fixtureInfo.post) {
                postFixturesArr.push(fixtureInfo)
            }
        })

        //if (__DEV__) console.log('preFixturesArr: ', preFixturesArr, preFixturesArr.length)
        //if (__DEV__) console.log('liveFixturesArr: ', liveFixturesArr)
        //if (__DEV__) console.log('postFixturesArr: ', postFixturesArr)

        if (liveFixturesArr.length > 0) {
            // it means, there's a current live game
            // show live game
            this.setState({
                fixture: liveFixturesArr[0].toJS(),
                gameStatus: 'live',
                isLoaded: true
            })
        } else if (preFixturesArr.length > 0) {
            // there's no current live game but there's upcoming fixture
            // show the the upcoming fixture
            this.setState({
                fixture: preFixturesArr[0].toJS(),
                gameStatus: 'pre',
                isLoaded: true
            })
        } else if (postFixturesArr.length > 0) {
            // there's no current live game and no upcoming fixture
            // show the last post game 
            let postLength = postFixturesArr.length
            
            this.setState({
                fixture: postFixturesArr[postLength - 1].toJS(), // get the last post
                gameStatus: 'post',
                isLoaded: true
            })
        } else {
            // no 'pre', 'live', 'post'
            this.setState({ isLoaded: true })
        }
    }

    _getAppropriateFixture(fixturesList) {
        let fixturesLeft = []
        let dateNow = new Date
        //dateNow = 'Tue Jun 23 2017 14:25:22 GMT+0800 (PHT)'
        dateNow = Date.parse(dateNow)
       
        fixturesList.map(function(item, index) {
            let dateSched = Date.parse(new Date(`${item.date} ${item.time}`))
            //if (__DEV__)console.log(dateSched, new Date(`${item.date} ${item.time}`))
            
            if (dateSched > dateNow) {
                fixturesLeft.push(item)
            }
        })

        this.setState({
            fixturesList: fixturesLeft,
            fixturesLeft: limitArrayList(fixturesLeft, 1)
        })
    }

    _goToCoachBox = () => {
        this._drillDown('', 'coachBox')
    }

    _gameMode(data) {
        let fixture = this.state.fixture
        let gameStatus = strToLower(this.state.gameStatus)
        //if (__DEV__) console.log('gameStatus: ', gameStatus, fixture)

        switch (gameStatus) {
            case 'live':
                return <LiveGame data={fixture} pressBanner={()=> this._drillDown(fixture, 'fixtureDetails')} pressCoachBox={this._goToCoachBox}/>
                break;
            case 'pre':
                return <PreGame data={fixture} pressBanner={()=> this._drillDown(fixture, 'fixtureDetails')}/>
                break;
            case 'post':
                return <PostGame data={fixture} pressBanner={()=> this._drillDown(fixture, 'fixtureDetails')}/>
                break;
            default:
                return <View></View>
        }
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    render() {
        return (
            <View>
                {
                    this.state.isLoaded?
                        this._gameMode()
                    :
                        <View style={locStyle.activityIndicatorWrapper}>
                            <ActivityIndicator size='small' /> 
                        </View>
                }
            </View>           
        )
    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect(null, bindAction)(PlayerFigure)