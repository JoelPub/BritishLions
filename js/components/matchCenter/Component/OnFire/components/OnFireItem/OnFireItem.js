

'use strict'

import React, { Component ,PropTypes} from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../../../themes/variable'

import { Grid, Col, Row } from 'react-native-easy-grid'



const  TableCell = ({data}) => {
  let rank = data.rank + '.'
  return (
    <View style={ [styles.headerView,styles.whiteBk]}>
      <Image transparent
             resizeMode='contain'
             source={{uri: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/68811.jpg'}}
             style={styles.headerImage}  />
      <Text style={[styles.blackContentText,{left:55,color:styleVar.colorScarlet}]}>{rank}</Text>
      <Text style={[styles.blackContentText,{left:70}]}>{data.player}</Text>
      <Text  style={[styles.blackContentText,{right:10}]}>
        {data.game}
      </Text>
      <Text style={[styles.blackContentText,{right:60}]}>
        {data.average}
      </Text>
    </View>
  )
}

class OnFireItem extends Component {

  constructor(props) {
    super(props)
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
    let {isLastItem,title,data} = this.props

    return (
      <View style={[styles.box,,isLastItem ? {borderBottomWidth:1}:{}]}>
        <View style={ [styles.headerView,{ borderBottomWidth: 1}]}>
          <Text style={styles.tabText}>
            {title}
          </Text>
          <Text  style={[styles.gameAndAvgText,{right:10}]}>
            GAME
          </Text>
          <Text style={[styles.gameAndAvgText,{right:60}]}>
            AVG
          </Text>
        </View>
        {data.map((item,index)=>{
          return (
            <TableCell key={index} data={item}/>
          )
        })
        }
      </View>
    )
  }
}

export default OnFireItem
OnFireItem.propTypes = {
  isLastItem: PropTypes.bool,
  title: PropTypes.string,
  on_fire:PropTypes.object,
  data: PropTypes.any,
}
OnFireItem.defaultProps = {
  isLastItem:false,
  title: '',
  data: []
}