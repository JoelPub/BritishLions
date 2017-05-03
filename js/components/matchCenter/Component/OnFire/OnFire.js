'use strict'

import React, { Component ,PropTypes} from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules,DeviceEventEmitter} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import SetPlayerTabBar from  '../SetPlayer/Components/SetPlayerTabBar'

import OnFireItem from  './components/OnFireItem'

const  IconHeader = ({onPress}) => {
  return (
    <View style={{flexDirection:'row-reverse'}} >
      <ButtonFeedback style={{width:30}}
                      onPress={onPress}>
        <Icon name='ios-information-circle-outline' style={{color: styleVar.colorScarlet,fontSize: 22,lineHeight: 22}} />
      </ButtonFeedback>
    </View>
  )
}

class OnFire extends Component {

  constructor(props) {
    super(props)
    this.state = {
      h:0
    }
  }

  iconPress = () =>{
    DeviceEventEmitter.emit('matchCenter', 'onFire');
  }
  mathHeight = (half_time,full_time) => {
   let  countHalf =  half_time.metres.length + half_time.passes.length + half_time.breaks.length + half_time.breaks.length
   let  countFull =  full_time.metres.length + full_time.passes.length + full_time.breaks.length + full_time.breaks.length
   let  realyCount =  countHalf>= countFull ? countHalf : countFull
    console.log('mathHeight')
    console.log(realyCount)
    return  realyCount*50
  }
  render() {
   let { on_fire } =this.props
    return (
      <View style={{marginTop:50,paddingTop:10,backgroundColor:'rgb(255,255,255)',  flex: 1,}}
      >
        <ScrollableTabView
          locked={true}
          initialPage={0}
          renderTabBar={() => <SetPlayerTabBar />}
          tabBarActiveTextColor={'black'}
        >
          <View tabLabel='HALF-TIME'>
            <IconHeader onPress={this.iconPress} />
            <View style={{ padding: 20}}>
              <OnFireItem title={'METRES'} data={on_fire.half_time.metres}/>
              <OnFireItem title={'PASSES'} data={on_fire.half_time.passes}/>
              <OnFireItem title={'BREAKS'} data={on_fire.half_time.breaks}/>
              <OnFireItem isLastItem={true} title={'TACKLES'} data={on_fire.half_time.tackles}/>
            </View>
          </View>
          <View tabLabel='FULL-TIME'>
            <IconHeader />
            <View style={{ padding: 20}}>
              <OnFireItem title={'METRES'} data={on_fire.full_time.metres}/>
              <OnFireItem title={'PASSES'} data={on_fire.full_time.passes} />
              <OnFireItem title={'BREAKS'} data={on_fire.full_time.breaks}/>
              <OnFireItem isLastItem={true} title={'TACKLES'} data={on_fire.full_time.tackles} />
            </View>
          </View>
        </ScrollableTabView>
      </View>
    )
  }
  componentDidMount() {
    let { on_fire } =this.props
    let height = this.mathHeight(on_fire.half_time,on_fire.full_time)
    console.log('componentDidMount')
    console.log(height)
    this.props.setHeight(height+80+320,'OnFire')

  }
  componentWillReceiveProps(nextProps) {
    if (__DEV__)console.log('onFire componentWillReceiveProps nextProps.isActive',nextProps.isActive)
    if (__DEV__)console.log('onFire componentWillReceiveProps this.props.isActive',this.props.isActive)

  }
}
export default OnFire

OnFire.propTypes = {
  on_fire:PropTypes.object,
}
OnFire.defaultProps = {
  on_fire: {
    half_time: {
      metres: [
        {
          player: 23124,
          rank: 1,
          game: 80,
          average: 50
        },
        {
          player: 3342,
          rank: 2,
          game: 22,
          average: 87
        },
        {
          player: 3342,
          rank: 2,
          game: 22,
          average: 87
        },
        {
          player: 3342,
          rank: 2,
          game: 22,
          average: 87
        },
        {
          player: 3342,
          rank: 2,
          game: 22,
          average: 87
        },
      ],
      passes:[
        {
          player: 23124,
          rank: 1,
          game: 80,
          average: 50
        },
        {
          player: 3342,
          rank: 2,
          game: 22,
          average: 87
        },
      ],
      breaks:[
        {
          player: 23124,
          rank: 1,
          game: 80,
          average: 50
        },
        {
          player: 3342,
          rank: 2,
          game: 22,
          average: 87
        },
      ],
      tackles:[
        {
          player: 36,
          rank: 1,
          game: 80,
          average: 50
        },
        {
          player: 4326,
          rank: 2,
          game: 22,
          average: 87
        },
      ],
    },
    full_time: {
      metres: [
        {
          player: 23124,
          rank: 1,
          game: 80,
          average: 50
        },
        {
          player: 3342,
          rank: 2,
          game: 22,
          average: 87
        },
      ],
      passes:[
        {
          player: 23124,
          rank: 1,
          game: 80,
          average: 50
        },
        {
          player: 3342,
          rank: 2,
          game: 22,
          average: 87
        },
      ],
      breaks:[
        {
          player: 23124,
          rank: 1,
          game: 80,
          average: 50
        },
        {
          player: 3342,
          rank: 2,
          game: 22,
          average: 87
        },
      ],
      tackles:[
        {
          player: 36,
          rank: 1,
          game: 80,
          average: 50
        },
        {
          player: 4326,
          rank: 2,
          game: 22,
          average: 87
        },
      ],
    }
  }
}