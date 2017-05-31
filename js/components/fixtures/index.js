'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView ,NativeModules, ActivityIndicator} from 'react-native'
import { drillDown } from '../../actions/content'
import { Container, Text } from 'native-base'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import EYSFooter from '../global/eySponsoredFooter'
import { service } from '../utility/services'
import StickyFooter from '../utility/stickyFooter'
import { actionsApi} from '../utility/urlStorage'
import loader from '../../themes/loader-position'
import FixtureInfoModel from  '../../modes/Fixtures'
import Immutable, { Map, List, Iterable } from 'immutable'
import LinearGradient from 'react-native-linear-gradient'
import styleVar from '../../themes/variable'

const  TitleCell = ({status}) => {
  let  title = 'GAME FINISHED'
  if (status==='live')  title = 'GAME NOW LIVE'
  if (status==='post')  title = 'GAME FINISHED'
  let greenBackgroundColor =  (status==='live')  ? {
    backgroundColor:'rgb(9,127,64)'
  } : {}
  return (
    <View style={[styles.titleView,greenBackgroundColor]}>
      <Text style={[styles.titleText]}>{title}</Text>
    </View>
  )
}
class Fixtures extends Component {
    constructor(props) {
         super(props)

         this.isUnMounted = false
         this._scrollView = ScrollView

         this.state = {
            getFixtureInfoURL: actionsApi.eyc3GetFixtureInfo, 
            fixtures: [],
            isLoaded: false,
        }
    }

    _drillDown(data) {
        this.props.drillDown(data, 'fixtureDetails')
    }

    componentDidMount() {
        NativeModules.One.sendInteraction("/fixtures", { emailAddress : "" })

        setTimeout(() => {
            this._getFixtures()
        }, 600)
    }

    _getFixtures() {
        service({
            url: this.state.getFixtureInfoURL,
            method: 'get',
            onSuccess: (res) => {
                if (this.isUnMounted) return // return nothing if the component is already unmounted

                if (__DEV__) console.log('resssss', res.data)
                // Sort Fixture By Date
                let fixtures = this._sortFixtures(res.data)

                if(__DEV__)console.log('sorted: ', fixtures)
                if(res.data) {
                    this.setState({
                        fixtures,
                        isLoaded: true
                    })
                } else {
                    this.setState({ isLoaded: true })
                }
            },
            onError: (res) => {
                this.setState({isLoaded:true})
            }
        })
    }

    componentWillUnmount() {
        if(__DEV__)console.log('@@@fixtures componentWillUnmount')
        this.isUnMounted = true
    }

    _sortFixtures(fixturesList, order = 'ASC') {
        return fixturesList.sort(function(a, b){
            if (order ===  'DESC')
                return new Date(b.date) - new Date(a.date)
            else
                return new Date(a.date)  - new Date(b.date)
        })
    }
    judgeStatus = (item) => {
      if (item.live!== null)  return 'live'
      if (item.post!== null)  return 'post'
      if (item.pre!== null)   return 'pre'
      return 'pre'
    }
    render() {
        let titleStyle = styleVar.deviceWidth<=320 ? {fontSize:24,lineHeight:24} : {}
        return (
            <Container theme={theme} style={styles.container}>
                <View style={styles.background}>
                    <LionsHeader 
                        title='FIXTURES AND SCORES'
                        contentLoaded={true}
                        titleStyle={titleStyle}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    {
                        this.state.isLoaded?
                            <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                                <StickyFooter>
                                    {
                                        this.state.fixtures.map(function(fixtureInfo) {
                                            let item = FixtureInfoModel.fromJS(fixtureInfo) 
                                            let status = this.judgeStatus(item)
                                            return (
                                                    <ButtonFeedback 
                                                        key={item.id}
                                                        style={styles.btn}
                                                        onPress={() => this._drillDown({details:item.toJS(), list:this.state.fixtures})}>
                                                       {status!=='pre'? <TitleCell status ={status}/> : null}
                                                        <ImagePlaceholder height={170}>
                                                            <LinearGradient style={styles.fixtureImgContainerAtList} colors={['#d9d7d8', '#FFF']}>
                                                                <Image
                                                                    resizeMode='contain'
                                                                    style={styles.fixtureImgAtList}
                                                                    source={{uri: item.banner}} />
                                                            </LinearGradient>
                                                        </ImagePlaceholder>
                                                        <View style={[shapes.triangle, {marginTop: -11}]} />
                                                        <View style={styles.fixtureBanner} >
                                                        <Text style={styles.dateText}>{item.date.toUpperCase()}</Text>
                                                        <Text style={styles.teamText}>{item.title}</Text>
                                                        </View>
                                                    </ButtonFeedback>
                                                )
                                        }, this)
                                    }
                                    <Image
                                        source={require('../../../images/footer/fixturesfooter.png')}
                                        style={styles.imgSponsor}
                                        resizeMode='cover'
                                    />
                                </StickyFooter>
                            </ScrollView>
                        :
                            <ActivityIndicator style={loader.centered} size='large'/>
                      }
                </View>
            </Container>
       )
    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect(null, bindAction)(Fixtures)
