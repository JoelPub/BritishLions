'use strict'

import React, { Component } from 'react'
import { Image, View, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { drillDown } from '../../actions/content'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import styles from './styles'
import { limitArrayList, strToLower, strToUpper, findObjByID } from '../utility/helper'
import { actionsApi} from '../utility/urlStorage'
import ButtonFeedback from '../utility/buttonFeedback'
import ImagePlaceholder from '../utility/imagePlaceholder'
import LinearGradient from 'react-native-linear-gradient'
import LiveBox from '../global/liveBox'
import shapes from '../../themes/shapes'
import { service } from '../utility/services'
import FixtureInfoModel from  '../../modes/Fixtures'
import Immutable, { Map, List, Iterable } from 'immutable'
import Countdown from '../global/countdown'

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

const Banner = ({data, pressBanner, gameStatus}) => (
    <ButtonFeedback
        style={styles.banner}
        onPress={pressBanner}>
        <ImagePlaceholder height={200}>
            <LinearGradient style={styles.fixtureImgContainer} colors={['#d9d7d8', '#FFF']}>
                <Image
                    resizeMode='contain'
                    style={styles.bannerImg}
                    source={{uri: data.banner}} />
            </LinearGradient>
        </ImagePlaceholder>
        
        {
            gameStatus !== 'live' &&
            <View>
                <View style={[shapes.triangle, {marginTop: -12}]} />
                <View style={styles.bannerDetails}>
                    <Text style={styles.bannerTitle}>{ strToUpper(data.date) }</Text>
                    <Text style={styles.bannerDesc}>{ data.title }</Text>
                </View>
            </View>
        }
    </ButtonFeedback>
)

const LiveGame = ({data, pressCoachBox, pressBanner, gameStatus}) => (
    <View>
        <PageTitle title='GAME NOW LIVE' />
        
        <LiveBox data={Object.assign({feededData:false,hasTitle:false,title:data.title},data)} inverse={true}/>
        
        <Banner data={data} pressBanner={pressBanner} gameStatus={gameStatus}/>
        
        <View style={[styles.bannerDetails, locStyle.bannerDetails]}>
            <Text style={[styles.bannerDesc, locStyle.bannerDesc]}>Provincial Union vs British & Irish Lions</Text>
        </View>
        <View style={locStyle.infoBox}>
            <Text style={locStyle.infoBoxText}>
                Visit the British & Irish Lions Coaches' Box for live match coverage and statistics.
            </Text>
            <ButtonFeedback 
                rounded 
                style={[styles.roundButton]}
                onPress={pressCoachBox}
            >
                <Image resizeMode='contain' source={require('../../../contents/my-lions/squadLogo.png')}
                    style={locStyle.logoIcon}/>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.roundButtonLabel} >
                    COACHES' BOX
                </Text>
            </ButtonFeedback>
        </View>
    </View>
)

const PreGame = ({data, pressBanner, onCountDownEnd, gameStatus}) => (
    <View>
        <PageTitle title='UPCOMING FIXTURE' />
        <Banner data={data} pressBanner={pressBanner} gameStatus={gameStatus}/>
        <Countdown 
            isHideUI={true}
            endDate={`${data.date} ${data.time}`} 
            onCountDownEnd={onCountDownEnd}/>
    </View>
)

const PostGame = ({data, pressBanner, isLastFixture, gameStatus}) => (
    <View>
        <PageTitle title={isLastFixture? 'LAST FIXTURE' : 'UPCOMING FIXTURE'} />
        <Banner data={data} pressBanner={pressBanner} gameStatus={gameStatus}/>
    </View>
)

class PlayerFigure extends Component {
    constructor(props){
        super(props)

        this.isUnMounted = false
        this._timer = null
        this.state = {
            getFixtureInfoURL: actionsApi.eyc3GetFixtureInfo,
            fixture: FixtureInfoModel().toJS(),
            isLastFixture: false,
            gameStatus: null,
            isLoaded: false,
            isTimerStarted: false,
            seconds: 0,
            maximumSeconds: 300 // 5 minutes
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

    _sortFixtures(fixturesList, order = 'ASC', isImmutable = false) {
        let fixtures = []

        if (isImmutable) {
            fixturesList.map(function(item, index) {
                let fixture = item.toJS()
                fixtures.push(fixture)
            })
        } else {
            fixtures = fixturesList
        }

        return fixtures.sort(function(a, b){
            if (order ===  'DESC')
                return new Date(b.date) - new Date(a.date)
            else
                return new Date(a.date)  - new Date(b.date)
        })
    }

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
            },
            onError: (res) => {
                this.setState({isLoaded:true})
            }
        })
    }

    _analyzeFixtures(fixtures) {
        // if (__DEV__) console.log('analyzing...')
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

        // let dummyArray = [
        //     { date: "24 June 2017" },
        //     { date: "21 June 2017" },
        //     { date: "4 June 2017" },
        //     { date: "2 July 2017" },
        //     { date: "14 Aug 2017" },
        //     { date: "4 May 2017" },
        //     { date: "10 July 2017" },
        //     { date: "8 July 2017" },
        //     { date: "3 June 2017" },
        // ]

        // sort fixture by date (jsut to make sure)
        preFixturesArr = this._sortFixtures(preFixturesArr, 'ASC', true)
        liveFixturesArr = this._sortFixtures(liveFixturesArr, 'ASC', true)
        postFixturesArr = this._sortFixtures(postFixturesArr, 'ASC', true)

        //if (__DEV__) console.log('preFixturesArr: ', preFixturesArr, preFixturesArr.length)
        //if (__DEV__) console.log('liveFixturesArr: ', liveFixturesArr)
        //if (__DEV__) console.log('postFixturesArr: ', postFixturesArr)

        if (liveFixturesArr.length > 0) {
            // it means, there's a current live game
            // show live game
            this.setState({
                fixture: liveFixturesArr[0],
                gameStatus: 'live',
                isLoaded: true
            })
        } else if (preFixturesArr.length > 0) {
            // there's no current live game but there's upcoming fixture
            // show the the upcoming fixture
            this.setState({
                fixture: preFixturesArr[0],
                gameStatus: 'pre',
                isLoaded: true
            })
        } else if (postFixturesArr.length > 0) {
            // there's no current live game and no upcoming fixture
            // show the last post game 
            let postLength = postFixturesArr.length
            let isLastFixture = true
            let fixture = postFixturesArr[postLength - 1]

            // get the last fixtures
            // let sortedFixtures = this._sortFixtures(fixtures, 'DESC')
            // let lastFixture = sortedFixtures[0]

            // if(lastFixture.id === fixture.id) {
            //     // isLastFixture = true
            // }
                

            this.setState({
                fixture: fixture, // get the last post
                gameStatus: 'post',
                isLoaded: true,
                isLastFixture
            })
        } else {
            // no 'pre', 'live', 'post'
            this.setState({ isLoaded: true })
        }
    }

    _goToCoachBox = (data) => {
        this._drillDown(data, 'coachBox')
    }

    _onCountDownEnd() {
        if (__DEV__) console.log('COUNTDOWN END!!!!!!')
        if (this.state.isTimerStarted === false) {
            if (__DEV__) console.log('start timer')
            this.setState({ isTimerStarted: true })

            // if we never rerequested then start the timer
            this._timer = setInterval(() => {
                let seconds = this.state.seconds + 1
                this.setState({ seconds })
            }, 1000)
        }

        // re request to api to get the lates live data until no exceeds to 5 mins
        if (this.state.seconds < this.state.maximumSeconds) {
            this._reGetFixturesInfo()
        } else {
            clearInterval(this._timer)
            if (__DEV__) console.log('CLEAR/END TIMER: ', this.state.seconds)
        }
    }

    _reGetFixturesInfo(){
        // send request every 5 seconds
        setTimeout(() => {
            service({
                url: this.state.getFixtureInfoURL,
                method: 'get',
                onSuccess: (res) => {
                    if (this.isUnMounted) return // return nothing if the component is already unmounted

                    if(res.data) {
                        let fixtureID = this.state.fixture.id // get the current fuxture id we targeted
                        let item = findObjByID(res.data, fixtureID) // map the array and get specific object 
                        
                        if (__DEV__) console.log('REGET RES: ', fixtureID, res.data)
                        if (__DEV__) console.log('REGET ITEM: ', fixtureID, item)
                       
                        if (item) {
                            // check if the api is now updated to 'live' from 'pre'
                            if (item.live) {
                                // clear the timer
                                clearInterval(this._timer) 

                                // analyze the fixture and rerender the compoenents
                                this._analyzeFixtures(res.data)
                            } else {
                                this._onCountDownEnd()
                            }
                        }
                    }
                }
            })
        }, 5000)
    }

    _gameMode(data) {
        let fixture = this.state.fixture
        let gameStatus = strToLower(this.state.gameStatus)
        //if (__DEV__) console.log('_gameMode Status: ', gameStatus, fixture)

        switch (gameStatus) {
            case 'live':
                return <LiveGame
                            gameStatus={gameStatus}
                            data={fixture}
                            pressBanner={()=> this._drillDown({details: fixture}, 'fixtureDetails')}
                            pressCoachBox={()=>this._goToCoachBox(fixture)}/>
                break;
            case 'pre':
                return <PreGame 
                            gameStatus={gameStatus}
                            data={fixture} 
                            pressBanner={()=> this._drillDown({details: fixture}, 'fixtureDetails')}
                            onCountDownEnd={() => this._onCountDownEnd()}/>
                break;
            case 'post':
                return <PostGame 
                            gameStatus={gameStatus}
                            isLastFixture={this.state.isLastFixture}
                            data={fixture} 
                            pressBanner={()=> this._drillDown({details: fixture}, 'fixtureDetails')}/>
                break;
            default:
                return <View></View>
        }
    }

    componentWillUnmount() {
        this.isUnMounted = true
        clearInterval(this._timer)
    }

    render() {
        //if (__DEV__)  console.log('seconds', this.state.seconds)
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