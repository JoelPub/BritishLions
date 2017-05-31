

'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView, ActivityIndicator, Platform} from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../themes/variable'
import loader from '../../../themes/loader-position'
import {popRoute} from '../../../actions/route'
import EYSFooter from '../../global/eySponsoredFooter'
import logo from '../../../../images/logos/british-and-irish-lions.png'
import Share from 'react-native-share'
import RNViewShot from 'react-native-view-shot'
import { strToUpper } from '../../utility/helper'
import Versus from '../components/versus'

const ShareHeaderView = ({detail}) => (
  <View style={styles.viewShareHeader}>
    <Image resizeMode='contain' style={styles.viewHeaderImage} source={logo} />
  </View>
)
const  NoteName = ({title,firstName,lastName}) => (
  <View style={styles.posWrapper}>
    <View style={styles.indivPosTitle}>
      <Text style={styles.indivPosTitleText}>{title}</Text>
    </View>
    <View style={styles.posBtn}>
      <View style={styles.playerNameTextWrapper}>
        <View style={styles.titleBox}>
          <Text style={[styles.playerNameText, styles.playerFNameText]} numberOfLines={1}>{firstName}</Text>
          <Text style={styles.playerNameText} numberOfLines={1}>{lastName}</Text>
        </View>
      </View>
    </View>
  </View>
)
const RankNubText = ({num,name,colWidth}) => (
  <View style={[styles.rankNubTextContainer]}>
      <Grid>
        <Col style={{width: Platform.OS === 'android'? colWidth + 1 : colWidth}}>
          <Text style={styles.rankNumber}>{num+'. '}</Text>
        </Col>
        <Col> 
          <Text style={styles.rankPlayerName}>{name}</Text>
        </Col>
      </Grid>
  </View>
)

const  RankingTable = ({title,array}) => {
  if (__DEV__)console.log(array)
  return(
  <View style={styles.rankTableContainer}>
    <View style={styles.rankTitleView}>
      <Text style={styles.indivPosTitleText}>{title}</Text>
    </View>
    <View style={styles.rankNubTextContainer}>
      <View style={styles.nubTextSupContainer}>
        {
          array.map((item,i)=>{
          if(i<8) return(<RankNubText key={i} num={i+1} name={strToUpper(item)} colWidth={13} />)
          })
        }
      </View>
      <View style={styles.nubTextSupContainer}>
        {
          array.map((item,i)=>{
            if(i>=8) return(<RankNubText key={i} num={i+1} name={strToUpper(item)} colWidth={18} />)
          })
        }
      </View>
    </View>
  </View>
)}

class MyLionsShareGameResult extends Component {

  constructor (props) {
    super(props)
    this._scrollView = ScrollView
    this.state = {
      isSubmitting: false
    }
  }

  _showError(error) {
    Alert.alert(
      'An error occured',
      error,
      [{text: 'Dismiss'}]
    )
  }
   getShareDescribe = () => {
     this.props.data.gameData
     let describe = ''
     if( strToUpper(this.props.data.resultInfo.is_draw)==='TRUE') {
       if (__DEV__)console.log('平')
       describe= 'I just drew my match against ' +this.props.data.gameData.title + ' ! Download the Official Lions App to play against the experts!#LionsNZ2017'

     }else {
       if ( strToUpper(this.props.data.resultInfo.is_won) ==='TRUE'){
           if (__DEV__)console.log('赢')
           describe= 'I just won my match against ' +this.props.data.gameData.title + ' ! Download the Official Lions App to play against the experts!#LionsNZ2017'
       }else {
         if (__DEV__)console.log('输')
         describe= ''
       }
     }
     if (__DEV__)console.log('描述')
     if (__DEV__)console.log(describe)
     return  describe
   }
  componentDidMount() {
    setTimeout(()=>{
      this.getShareDescribe()
      this.shareSnapshot(this.getShareDescribe() ,this.callback)
    },2000)

  }
  shareSnapshot = (context,callback) => {
    this.setState({
      isSubmitting:true
    })
    setTimeout(()=>{
      RNViewShot.takeSnapshot(this.refs['scorecard'] ,{
          format:'png',
          quality: 1,
          result: 'base64'
        })
        .then(
          res => Share.open({
            title:'LionsNZ2017',
            message:this.getShareDescribe(),
            subject:'LionsNZ2017',
            url: `data:image/png;base64,${res}`
          }).then((info)=>{
            callback()
          }).catch((errorMessage)=>{
            // if (__DEV__)console.log("error message: " + error)
            if(errorMessage !== 'undefined' && errorMessage.error !== 'undefined' && errorMessage.error !== 'User did not share'){
              alertBox(
                '',
                'Image is not shared',
                'Dismiss'
              )
            }
            callback()
          })
        )
    })
  }
  callback = () => {
    this.setState({
      isSubmitting:false
    })
    this.backNav()
  }
  backNav = () => {
    this.props.popRoute()
  }
  render() {
    let { indivPos, forwards, backs } =this.props.data.teamDatafeed
    let players=[]
    indivPos.concat(forwards).concat(backs).map((value,index)=>{
      if (value.info!==null&&value.info.name&&players.indexOf(value.info.name)===-1) players.push(value.info.name) 
    })
    return (
      <Container theme={theme}>
        <View style={styles.container}>
          <View style={styles.smallContainer} >
              <ScrollView ref={(scrollView) => { this._scrollView = scrollView }} >

                <View ref='scorecard' style={styles.wrapper}>
                  <Versus gameData={this.props.data.gameData} userData={this.props.data.userData} />
                  {
                      strToUpper(this.props.data.resultInfo.is_draw)==='TRUE'?
                          <View style={[styles.result, styles.resultDrawBg]}>
                              <Text style={styles.resultText} >
                                  {strToUpper(this.props.data.resultInfo.message)}
                              </Text>
                          </View>
                          :
                          <View>
                              {
                                  strToUpper(this.props.data.resultInfo.is_won)==='TRUE'?
                                      <View style={[styles.result, styles.resultWonBg]}>
                                          <Text style={styles.resultText} >
                                              {strToUpper(this.props.data.resultInfo.message.substring(0,this.props.data.resultInfo.message.indexOf('!')+1))}
                                          </Text>
                                          <Text style={styles.resultText} >
                                              {strToUpper(this.props.data.resultInfo.message.substring(this.props.data.resultInfo.message.indexOf('!')+1))}
                                          </Text>
                                      </View>
                                  :
                                      <View style={[styles.result]}>
                                          <Text style={styles.resultText} >
                                              {strToUpper(this.props.data.resultInfo.message.substring(0,this.props.data.resultInfo.message.indexOf(',')+1))}
                                          </Text>
                                          <Text style={styles.resultText} >
                                              {strToUpper(this.props.data.resultInfo.message.substring(this.props.data.resultInfo.message.indexOf(',')+1))}
                                          </Text>
                                      </View>
                              }
                          </View>
                  }
                  
                    <View style={[styles.summaryRow, {marginBottom: 20}]}>
                      <View style={styles.summaryCircle}>
                          <Text style={styles.summaryCircleText}>{ this.props.data.resultInfo.ai.score || 'N/A' }</Text>
                      </View> 
                      <View>
                          <Text style={styles.summaryTitle}>SCORE</Text>
                      </View> 
                      <View style={styles.summaryCircle}>
                          <Text style={styles.summaryCircleText}>{ this.props.data.resultInfo.me.score || 'N/A' }</Text>
                      </View> 
                  </View>
                  <RankingTable title={'TEAM'}  array={players} />
                  
                  <View style={styles.jobBoxContainer}>
                    {
                      indivPos.map((item,i)=>{
                        let position = strToUpper(item.position) === 'CAPTAIN'? 'MATCH CAPTAIN' : strToUpper(item.position)
                        let firstName = item.info.name.toUpperCase().substring(0, item.info.name.lastIndexOf(" "))
                        let lastName = item.info.name.toUpperCase().substring(item.info.name.lastIndexOf(" ")+1, item.info.name.length)
                        return( <NoteName firstName={firstName} title={position} lastName={lastName} key={i}/>)
                      })
                    }
                  </View>
                  <View style={styles.footer}>
                    <Text style={styles.footerText}> Analytics Sponsored by </Text>
                    <Image source={require('../../../../images/footer/eyLogo.png')}></Image>
                </View>
                </View>
              </ScrollView>
          </View>
          {this.state.isSubmitting ? <ActivityIndicator style={loader.scoreCard} size='small' /> : null }
        </View>
      </Container>
    )
  }
}

function bindAction(dispatch) {
  return {
    popRoute:(route)=>dispatch(popRoute()),
  }
}

export default connect((state) => {
  if (__DEV__)console.log(state)
  return {
    data: state.content.drillDownItemShare
  }
}, bindAction)(MyLionsShareGameResult)
MyLionsShareGameResult.propTypes = {
  data: PropTypes.any,
}
