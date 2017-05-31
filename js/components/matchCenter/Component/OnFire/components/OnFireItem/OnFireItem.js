

'use strict'

import React, { Component ,PropTypes} from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../../../themes/variable'

import { Grid, Col, Row } from 'react-native-easy-grid'
import { getSoticFullPlayerList} from '../../../../../utility/apiasyncstorageservice/soticAsyncStorageService'
import {searchPlayer} from '../../../../../myLions/components/searchPlayer'
import Data from '../../../../../../../contents/unions/data'


const  TableCell = ({data,player,isHaveM}) => {
  let rank = data.rank + '.'
  let playerName = player ? player.name : ''
  let playerHeader = player ? player.image : ' '
  let game = isHaveM?  data.game + 'M' : data.game
  let  ave = isHaveM? data.average + 'M' : data.average
  let isAboveAve = data.onfireflag && data.onfireflag == 1? true : false

  return (
    <View style={ [styles.headerView,styles.whiteBk]}>
      <Image transparent
             resizeMode='contain'
             source={{uri:playerHeader}}
             style={styles.headerImage}  />
      <Text style={[styles.blackContentText,{left:55,color:styleVar.colorScarlet}]}>{rank}</Text>
      <Text style={[styles.blackContentText,{left:70}]}>{playerName}</Text>
      <Text  style={[styles.blackContentText, styles.blackContentStarText]}>
        { isAboveAve && <Icon name='ios-star' style={styles.star} /> }
      </Text>
      <Text style={[styles.blackContentText,{right:60}]}>
        {game}
      </Text>
    </View>
  )
}
const  BlankCell = ({isHalfTime}) => {
  let text = isHalfTime ? 'This will be available at Half-Time.' : 'This will be available at Full-Time.'
  return (
    <View style={ [styles.noDataBackgroundView,styles.whiteBk]}>
      <Text style={[styles.noDataText]}>
        {text}
      </Text>
    </View>
  )
}
class OnFireItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      playerList: []
    }
  }
  measureTab =(page,event)=> {
    const { x, width, height, } = event.nativeEvent.layout
    let widthArray = this.state.underlineLength.slice()
    if(widthArray[page]===undefined) widthArray[page]=0
    widthArray.map((w,i)=>{
      i===page?widthArray[i]=width:widthArray[i]=w
    })
    this.setState({underlineLength:widthArray.slice()})
    this.updateStyle(page)
  }
  render() {
    let arr = [1,1,1]
    let {isLastItem,title,data,playerData,isHalfTime} = this.props
    let isHaveM = false
    isHaveM = title==='METRES' ? true : false
    if (!data) data= []
    return (
      <View style={[styles.box,,isLastItem ? {borderBottomWidth:1}:{}]}>
        <View style={ [styles.headerView,{ borderBottomWidth: 1}]}>
          <Text style={styles.tabText}>{title}</Text>
          <Text  style={[styles.gameAndAvgText,{right:10}]}> </Text>
          <Text style={[styles.gameAndAvgText,{right:60}]}>GAME</Text>
        </View>
        {data.length===0 ? <BlankCell isHalfTime={isHalfTime} /> :null}
        {data.map((item,index)=>{
          let player = this.searchInfo(item.player)

          return (
            <TableCell key={index} data={item} player={player} isHaveM={isHaveM}/>
          )
        })}
      </View>
    )
  }
  componentDidMount() {

  }
  searchInfo = (playerId) => {
    if(!playerId) playerId=''
    let result = searchPlayer(this.props.playerData,playerId,Data)
    return  result
  }
}

export default OnFireItem
OnFireItem.propTypes = {
  isLastItem: PropTypes.bool,
  title: PropTypes.string,
  on_fire:PropTypes.object,
  data: PropTypes.any,
  playerData: PropTypes.any,
  isHalfTime:PropTypes.bool,

}
OnFireItem.defaultProps = {
  isLastItem:false,
  title: '',
  isHalfTime:true,
  data: []
}