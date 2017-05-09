

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


const  TableCell = ({data,player}) => {
  let rank = data.rank + '.'
  let playerName = player ? player.name : ''
  let playerHeader = player ? player.image : ' '
  let game = data.game + 'M'
  let  ave = data.average + 'M'
  return (
    <View style={ [styles.headerView,styles.whiteBk]}>
      <Image transparent
             resizeMode='contain'
             source={{uri:playerHeader}}
             style={styles.headerImage}  />
      <Text style={[styles.blackContentText,{left:55,color:styleVar.colorScarlet}]}>{rank}</Text>
      <Text style={[styles.blackContentText,{left:70}]}>{playerName}</Text>
      <Text  style={[styles.blackContentText,{right:10}]}>
        {game}
      </Text>
      <Text style={[styles.blackContentText,{right:60}]}>
        {ave}
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
    let {isLastItem,title,data,playerData} = this.props

    return (
      <View style={[styles.box,,isLastItem ? {borderBottomWidth:1}:{}]}>
        <View style={ [styles.headerView,{ borderBottomWidth: 1}]}>
          <Text style={styles.tabText}>
            {title}
          </Text>
          <Text  style={[styles.gameAndAvgText,{right:10}]}>
            AVG
          </Text>
          <Text style={[styles.gameAndAvgText,{right:60}]}>
           GAME
          </Text>
        </View>
        {data.map((item,index)=>{
          let player = this.searchInfo(item.player)

          return (
            <TableCell key={index} data={item} player={player}/>
          )
        })
        }
      </View>
    )
  }
  componentDidMount() {

  }
  searchInfo = (playerId) => {
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

}
OnFireItem.defaultProps = {
  isLastItem:false,
  title: '',
  data: []
}