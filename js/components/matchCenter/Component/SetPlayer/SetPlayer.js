'use strict'

import React, { Component ,PropTypes} from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity,
  ActivityIndicator, ScrollView,NativeModules,DeviceEventEmitter} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import StadiumFigure from '../StadiumFigure'
import SquadModal from '../../../global/squadModal'
import Scoreboard from './Components/Scoreboard'
import Triangle from '../../..//global/Triangle'


const  IconHeader = ({onPress,modalAble}) => {
  return (
    <View style={{flexDirection:'row-reverse'}} >
      <ButtonFeedback style={{width:30,backgroundColor:'transparent'}}
                      onPress={onPress}
                      disabled={!modalAble}
      >

        <Icon name='ios-information-circle-outline' style={{color: styleVar.colorScarlet,fontSize: 22,lineHeight: 22}} />
      </ButtonFeedback>
    </View>
  )
}
const SliderHeader=({onPress,isDisplayDescription,modalAble}) => {
  return (
      <View style={styles.headerWrapper}>
      {
          isDisplayDescription === true &&
          <View style={styles.indicatorWrapper}>
              <View style={{flexDirection:'row'}}>
                <View style={styles.rect}></View>
                <Triangle
                  width={14}
                  height={14}
                  color={'rgb(132,136,139)'}
                />
                <Text style={styles.headerText}>SUCCESSFUL</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={styles.transRect}></View>
                <Triangle
                  width={14}
                  height={14}
                  color={'rgb(132,136,139)'}
                  trans={true}
                  style={{ marginTop:-1}}
                />
                <Text style={styles.headerText}>UNSUCCESSFUL</Text>
              </View>
          </View>
      }
          <IconHeader styles ={{justifyContent:'flex-end'}} onPress={onPress} modalAble={modalAble}/>
        </View>

    )
}
class SetPlayer extends Component {

  constructor(props) {
    super(props)
    this.state = {
          modalInfo:false,
          h:0,
          modalAble:true,
          page:0,
    }
    this.currentPosition=0
  }
  iconPress = () => {
      this.setState({modalInfo: !this.state.modalInfo,modalAble:false},()=>{
        setTimeout(()=>this.setState({modalAble:true}),500)
      })
  }

  SortingData = (kicks) => {
    let points = {
      redPoints:[],
      blackPoints:[],
      whitePoints:[],
      bluePoints: []
    }
    kicks.opposition.conversions.details

  }
  callApi = () =>{
   if(__DEV__)console.log('setPlayerCallApi')
  }
  render() {
    let {isActive,detail} = this.props
    let { kicks, scrums,line_outs} = this.props.set_plays
    let Widefield = styleVar.deviceWidth===320 ? 180 : 202
    let horizontalWidth = Platform.OS === 'android' ? 30 : 40
    let rightPartWidth = {
      width: styleVar.deviceWidth-Widefield-horizontalWidth,
    }
     return (
      <View style={styles.wrapper}
      >
         <View style={styles.tabBtnWrapper}>
            <View style={styles.tabBtnPos}>
              <ButtonFeedback style={[this.state.page===0?styles.activeBtn:styles.inactiveBtn,styles.tabBtn]} onPress={()=>this.setState({page:0})}>
                <Text style={styles.btnText}> KICKS</Text>
              </ButtonFeedback>
              <Triangle
                width={24}
                height={12}
                color={this.state.page===0? 'rgb(38,38,38)' : 'transparent'}
                direction={'down'}
                style={{marginTop:-1}}
              />
            </View>
            <View style={styles.tabBtnPos}>
              <ButtonFeedback style={[this.state.page===1?styles.activeBtn:styles.inactiveBtn,styles.tabBtnWide]} onPress={()=>this.setState({page:1})}>
                <Text style={styles.btnText}> SCRUMS</Text>
              </ButtonFeedback>
              <Triangle
                width={24}
                height={12}
                color={this.state.page===1? 'rgb(38,38,38)' : 'transparent'}
                direction={'down'}
                style={{marginTop:-1}}
              />
            </View>
            <View style={styles.tabBtnPos}>
              <ButtonFeedback style={[this.state.page===2?styles.activeBtn:styles.inactiveBtn,styles.tabBtnWide]} onPress={()=>this.setState({page:2})}>
                <Text style={styles.btnText}> LINEOUTS</Text>
              </ButtonFeedback>
              <Triangle
                width={24}
                height={12}
                color={this.state.page===2? 'rgb(38,38,38)' : 'transparent'}
                direction={'down'}
                style={{marginTop:-1}}
              />
            </View>
          </View>
          {
            this.state.page===0&&
            <View tabLabel='KICKS'>
                <SliderHeader onPress={this.iconPress} isDisplayDescription={true} modalAble={this.state.modalAble}/>
               <View style={[styles.itemContainer]}>
                 <StadiumFigure
                   redPoints={ kicks.bil.conversions.details}
                   orangePoints = {kicks.bil.penalties.details}
                   blackPoints = {kicks.opposition.conversions.details}
                   bluePoints = {kicks.opposition.penalties.details}
                   imageWith = {Widefield}
                   isDrawFullPoint = {false}
                 />
                 <View style={[styles.rightContainer,rightPartWidth]}>
                   <Scoreboard isWithProportion={true}
                               oppositionScore = {kicks.bil.conversions}
                               bilScore = {kicks.bil.penalties}
                               detail={detail}
                               isKick = {true}
                   />
                   <Scoreboard isWithProportion={true} isDown={true}
                               oppositionScore = {kicks.opposition.conversions}
                               bilScore = {kicks.opposition.penalties}
                               detail={detail}
                               isKick = {true}
                   />
                 </View>
               </View>
             </View>
          }
         
         {
            this.state.page===1&&
            <View tabLabel='SCRUMS'>
             <SliderHeader onPress={this.iconPress} isDisplayDescription={false} modalAble={this.state.modalAble}/>
              <View style={styles.itemContainer}>
                <StadiumFigure
                  redPoints={ scrums.bil.won.details}
                  orangePoints = {scrums.bil.lost.details}
                  blackPoints = {scrums.opposition.won.details}
                  bluePoints = {scrums.opposition.lost.details}
                  imageWith = {Widefield}
                  isDrawFullPoint = {true}
                />
                <View style={[styles.rightContainer,rightPartWidth]}>
                  <Scoreboard   titles={['WON','LOST']}
                                oppositionScore = { scrums.bil.won}
                                bilScore =  {scrums.bil.lost}
                                detail={detail}
                                isKick = {false}
                  />
                  <Scoreboard isDown={true} titles={['WON','LOST']}
                              oppositionScore = { scrums.opposition.won}
                              bilScore =  {scrums.opposition.lost}
                              detail={detail}
                              isKick = {false}
                  />
                </View>
              </View>
            </View>
          }
         
         {
            this.state.page===2&&
            <View tabLabel='LINEOUTS'>
              <SliderHeader onPress={this.iconPress} isDisplayDescription={false} modalAble={this.state.modalAble}/>
              <View style={styles.itemContainer}>
                <StadiumFigure
                  redPoints={ line_outs.bil.won.details}
                  orangePoints = {line_outs.bil.lost.details}
                  blackPoints = {line_outs.opposition.won.details}
                  bluePoints = {line_outs.opposition.lost.details}
                  imageWith = {Widefield}
                  isDrawFullPoint = {true}
                />
                <View style={[styles.rightContainer,rightPartWidth]}>
                  <Scoreboard titles={['WON','LOST']}
                              oppositionScore = { line_outs.bil.won}
                              bilScore =  {line_outs.bil.lost}
                              detail={detail}
                              isKick = {false}
                  />
                  <Scoreboard isDown={true} titles={['WON','LOST']}
                              oppositionScore = { line_outs.opposition.won}
                              bilScore =  {line_outs.opposition.lost}
                              detail={detail}
                              isKick = {false}
                  />
                </View>
              </View>
            </View>
          }
                  <SquadModal
                    modalVisible={this.state.modalInfo}
                    callbackParent={this.iconPress}>
                    <ScrollView style={[styles.modalContent]}>
                          <View>
                              <Text style={styles.modalContentTitleText}>MORE INFORMATION</Text>
                              <Text style={styles.modalContentText}>These screens will update every 2-5 minutes to indicate where various plays take place around the pitch.</Text>
                              <Text style={styles.modalContentText}>The Lions will always be running towards the top of the pitch graphic.</Text>
                              <Text style={styles.modalContentText}>Kicks: Indicates where conversions and penalties were taken.</Text>
                              <Text style={styles.modalContentText}>Scrums: Displays where each team’s scrums have taken place on the pitch and if they were won.</Text>
                              <Text style={styles.modalContentText}>Lineouts: Displays where each team’s lineouts have taken place on the pitch and if they were won.</Text>
                          </View>
                    </ScrollView>
                  </SquadModal>
      </View>
    )
  }
  componentWillReceiveProps(nextProps) {
    if (__DEV__)console.log('setPlayer componentWillReceiveProps nextProps.isActive',nextProps.isActive)
    if (__DEV__)console.log('setPlayer componentWillReceiveProps this.props.isActive',this.props.isActive)
  }
  componentDidMount() {
    this.props.setHeight(600,'SetPlayer')

  }
  componentWillUnmount() {
      if(__DEV__)console.log('@@@SetPlayers componentWillUnmount')

  }
}

export default SetPlayer
SetPlayer.propTypes = {
  isActive:PropTypes.bool,
  set_plays:PropTypes.object,
  modalAble: PropTypes.bool,
}
SetPlayer.defaultProps = {
  set_plays: {
    kicks: {
      opposition: {
        conversions: {
           value : '',
           percentage : '',
           details : [

          ]
        },
         penalties : {
           value : '',
           percentage : '',
           details : [

          ]
        }
      },
       bil : {
         conversions : {
           value :  '' ,
           percentage :  '' ,
           details : [

          ]
        },
         penalties : {
           value :  '' ,
           percentage :  '' ,
           details : [

          ]
        }
      }
    },
     scrums : {
       opposition : {
         won : {
           value :  '' ,
           percentage :  '' ,
           details : [

          ]
        },
         lost : {
           value :  '' ,
           percentage :  '' ,
           details : [

          ]
        }
      },
       bil : {
         won : {
           value :  '' ,
           percentage :  '' ,
           details : [

          ]
        },
         lost : {
           value :  '' ,
           percentage :  '' ,
           details : [

          ]
        }
      }
    },
     line_outs : {
       opposition : {
         won : {
           value :  '' ,
           percentage :  '' ,
           details : [

          ]
        },
         lost : {
           value :  '' ,
           percentage :  '' ,
           details : [

          ]
        }
      },
       bil : {
         won : {
           value :  '' ,
           percentage :  '',
           details : [

          ]
        },
         lost : {
           value :'',
           percentage : '' ,
           details : [
          ]
        }
      }
    }
  },
  isActive:false
}