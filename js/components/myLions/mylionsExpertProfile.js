

'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ActivityIndicator} from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LinearGradient from 'react-native-linear-gradient'
import Swiper from 'react-native-swiper'

import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import styleVar from '../../themes/variable'
import loader from '../../themes/loader-position'

import LoginRequire from '../global/loginRequire'
import LionsHeader from '../global/lionsHeader'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import { replaceRoute, pushNewRoute } from '../../actions/route'
import RatingCardView from './components/RatingCardView'
import ExpertCard from './components/ExpertCard'
import EYSFooter from '../global/eySponsoredFooter'
import PlayerScore from '../global/playerScore'
import { getSoticFullPlayerList} from '../utility/apiasyncstorageservice/soticAsyncStorageService'
import Data from '../../../contents/unions/data'
import SquadModel from  'modes/Experts/One/Squad'
//import imageJameshaskel from '../../../contents/my-lions/players/jameshaskell.png'

import { drillDown } from '../../actions/content'
import { globalNav } from '../../appNavigator'


const PosTitle = ({squadData,title}) => (
  <View style={styles.posExpertTitle}>
    <Text style={styles.posTitleCenter}>{title}</Text>
  </View>
)
const ExpertsHeaderView = ({detail}) => (
    <View style={styles.viewExpertHeader}>
        <Image style={styles.viewExpertHeaderImage} source={{uri: detail.image}} />

        <View style={styles.headerPlayerDetails}>
            <Text style={styles.viewExpertProfileName}>{detail.name.toUpperCase()}</Text>
        </View>

        <View style={styles.headerPlayerDetails}>
            <Text style={styles.viewExpertProfileDescription}>{detail.description}</Text>
        </View>
    </View>
)
class MyLionsExpertProfile extends Component {

  constructor (props) {
    super(props)
    this._scrollView = ScrollView
    this.uniondata = Data
    let squad = SquadModel.fromJS(this.props.detail.squad)
    this.isUnMounted = false
    if (__DEV__)console.log("squad, ", JSON.stringify(squad))
    this.state = {
      jobTitle: ['CAPTAIN', 'KICKER', 'STAR'],
      squadData:{
        //TODO :this.props.detail.squad.captain,this.props.detail.squad.kicker,this.props.detail.squad.wildcard,
        //forwards: [114146,33315,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759],
        //backs: [120154,8357,118708,88083,4145,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759,8759],
        
        indivPos: [
            {position:'captain', id: [squad.captain]},
            {position:'kicker', id: [squad.kicker]},
            {position:'wildcard', id: [squad.wildcard]}
        ],
        forwards: squad.forwards.toArray(),
        backs: squad.backs.toArray(),
      },
      ratingData:{
          fan_ranking: this.props.detail.fan_ranking,
          overall_rating: this.props.detail.squad_rating,
          cohesion_rating: this.props.detail.cohesion_rating,
          attack_defence_rating: this.props.detail.attack_defence_rating
      },
      showScoreCard:'full',
      soticFullPlayers: [],
      isSquadLoaded: false
    }
  }

  _mapSoticData(data, soticData, isHeroCard) {
      let items = []
      data.map((playerId)=>{
        if(playerId){
            for (var u in this.state.soticFullPlayers) {
                 if (this.state.soticFullPlayers[u].length > 0) {
                     this.state.soticFullPlayers[u].map((player, index) => {
                         if (player.id === playerId.toString()) {
                             let union = this.uniondata.find((n)=> n.id===u)
                             Object.assign(player, {'countryid':u,
                                                    logo: union.image,
                                                    country: union.displayname.toUpperCase()})
                             
                             items.push(player)
                         }
                     })
                 }
             }
        }
      })
      if(isHeroCard && items.length>0) return items[0]
      return items
  }

  _mapJSON(data, colMax = 2) {
      let i = 0
      let k = 0
      let newData = []
      let items = []
      let length = data.length

      for( i = 0; i <data.length; (i += colMax)) {
        for( k = 0; k < colMax; k++ ) {
          if(data[i + k]!==undefined)
            items.push(data[i + k])
        }

        newData.push(items)
        items = []
      }
      return newData
   }

  _getSquadDetail(){
      this.setState({ isSquadLoaded: false })

      getSoticFullPlayerList().then((catchedFullPlayerList) => {
          if (this.isUnMounted) return // return nothing if the component is already unmounted
            
          if (catchedFullPlayerList !== null && catchedFullPlayerList !== 0 && catchedFullPlayerList !== -1) {
              this.setState({
                soticFullPlayers: catchedFullPlayerList,
                isSquadLoaded:true
              })
          }
      }).catch((error) => {
          this.setState({ isSquadLoaded: true }, () => {
              this._showError(error) // prompt error
          })
      })
  }

   _showError(error) {
      if(error !== ''){
          Alert.alert(
              'An error occured',
              error,
              [{text: 'Dismiss'}]
          )
      }
   }

  ratingViewClick = () => {
    if (__DEV__)console.log('icon被点击')
  }

  changeMode = () => {
    if (__DEV__)console.log('ratingView被点击')
  }

  componentDidMount() {
    setTimeout(()=>{this._getSquadDetail()},600)
  }

  componentWillUnmount() {
      this.isUnMounted = true
  }

  render() {
    let {jobTitle, squadData, ratingData,showScoreCard} = this.state
    
    return (
      <Container theme={theme}>
        <View style={styles.container}>

          <LionsHeader 
              back={true} 
              title='MY LIONS'
              contentLoaded={true}
              scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
          
          <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
            <ExpertsHeaderView detail={this.props.detail}/>
            <PlayerScore isLoaded={true} rating={ratingData} showScoreCard={showScoreCard} isExpertPage={true} pressInfo={()=>{}} pressExpert={()=>{}}/>
            {
                this.state.isSquadLoaded ?
                <View>
                    <View style={styles.individaulPositionRow}>
                      {
                        jobTitle.map((item,index)=>{
                          return (
                            <ExpertCard title={item}  data={this._mapSoticData(squadData.indivPos[index].id, this.state.soticFullPlayers, true)} key={index} hasTitle={true}/>
                          )
                        })
                      }
                    </View>
                    <PosTitle squadData={squadData} title={'FORWARDS'} />
                    <Swiper
                      ref='swiper'
                      height={styleVar.deviceWidth*0.63}
                      loop={false}
                      dotColor='rgba(255,255,255,0.3)'
                      activeDotColor='rgb(239,239,244)'
                      paginationStyle={{bottom:styleVar.deviceWidth/20}}>
                      {
                        this._mapJSON(this._mapSoticData(squadData.forwards, this.state.soticFullPlayers, false),3).map((rowData,index)=>{
                          return (
                            <View style={styles.posSwiperRow} key={index}>
                              {
                                rowData.map((expert,i)=>{
                                  return( <ExpertCard data={expert} key={i}/>)
                                })
                              }
                            </View>
                          )
                        })
                      }
                    </Swiper>
                    <PosTitle squadData={squadData} title={'BACKS'} />
                    <Swiper
                      ref='swiper'
                      height={styleVar.deviceWidth*0.63}
                      loop={false}
                      dotColor='rgba(255,255,255,0.3)'
                      activeDotColor='rgb(239,239,244)'
                      paginationStyle={{bottom:styleVar.deviceWidth/20}}>

                      {
                        this._mapJSON(this._mapSoticData(squadData.backs, this.state.soticFullPlayers, false),3).map((rowData,index)=>{
                          return (
                            <View style={styles.posSwiperRow} key={index}>
                              {
                                rowData.map((expert,i)=>{
                                  return( <ExpertCard data={expert} key={i}/>)
                                })
                              }
                            </View>
                          )
                        })
                      }
                    </Swiper>
                </View>
                :
                    <ActivityIndicator style={loader.centered} size='large' />
            }
            <LionsFooter isLoaded={true} />
          </ScrollView>
          <LoginRequire/>
          <EYSFooter mySquadBtn={true}/>
        </View>
      </Container>
    )
  }
}

function bindAction(dispatch) {
  return {
    drillDown: (data, route)=>dispatch(drillDown(data, route)),
    replaceRoute:(route)=>dispatch(replaceRoute(route)),
  }
}

export default connect((state) => {
  return {
    detail: state.content.drillDownItemSub,
    route: state.route,
  }
}, bindAction)(MyLionsExpertProfile)
