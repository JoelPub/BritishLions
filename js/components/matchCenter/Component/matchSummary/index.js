'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Platform, PanResponder,TouchableOpacity, ActivityIndicator, ScrollView,NativeModules} from 'react-native'
import { Container, Header, Text, Button, Icon } from 'native-base'
import theme from '../../../../themes/base-theme'
import styles from './styles'
import styleVar from '../../../../themes/variable'
import ButtonFeedback from '../../../utility/buttonFeedback'
import Timeline from 'react-native-timeline-listview'
import LiveBox from '../../../global/liveBox'
import _fetch from '../../../utility/fetch'
import loader from '../../../../themes/loader-position'
import Triangle from '../../..//global/Triangle'

class MatchSummary extends Component {

    constructor(props) {
         super(props)
         this.state={
          page:1,
          isHost:false
         }
    }
    _renderCircle(rowData,sectionID,rowID) {
      return (
        <View style={styles.timeWrapper}>
          <Text style={styles.timeText}>{rowData.time}</Text>
          <Text style={styles.minText}>MIN</Text>
        </View>)
    }
    _onEndReached(){
      if(__DEV__)console.log('end reached')
      this.props.setEndReached()
    }
    render() {
        let {summaryData}=this.props
        let {timeline, statics}=summaryData
        let {opposition,bil}=statics
        let {isHost}=this.state
        return (
                <View style={styles.scroll} scrollEnabled={false}>
                    <LiveBox data={Object.assign({feededData:true,hasTitle:true},summaryData)}/>
                    <View style={styles.tabBtnWrapper}>
                      <View style={styles.tabBtnPos}>
                        <ButtonFeedback style={[this.state.page===0?styles.activeBtn:styles.inactiveBtn,styles.tabBtn]} onPress={()=>this.setState({page:0})}>
                          <Text style={styles.btnText}> LIVE COMMENTARY</Text>
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
                        <ButtonFeedback style={[this.state.page===1?styles.activeBtn:styles.inactiveBtn,styles.tabBtn]} onPress={()=>this.setState({page:1})}>
                          <Text style={styles.btnText}> MATCH STATISTICS</Text>
                        </ButtonFeedback>
                        <Triangle
                          width={24}
                          height={12}
                          color={this.state.page===1? 'rgb(38,38,38)' : 'transparent'}
                          direction={'down'}
                          style={{marginTop:-1}}
                        />
                      </View>
                    </View>
                    <View style={styles.timelineWrapper} >
                    {
                      this.state.page===0?
                          <Timeline
                            data={timeline}
                            lineColor='rgb(216,217,218)'
                            timeContainerStyle={{minWidth: 6}}
                            timeStyle={{width:0, height:0}}
                            descriptionStyle={styles.descripton}
                            separator={false}
                            options={{
                              style:{paddingTop:25, marginLeft: 0},
                              scrollEnabled: true,
                              enableEmptySections: true,
                              onEndReached:this._onEndReached.bind(this),
                              onEndReachedThreshold: 15
                            }}
                            renderCircle={this._renderCircle}
                          />
                          :
                          <ScrollView style={styles.statWrapper}>
                            <View style={styles.statEntry}>
                                <Text style={styles.leftCol}>{isHost?bil&&bil.tries:opposition&&opposition.tries}</Text>
                                <Text style={styles.midCol}>TRIES</Text>
                                <Text style={styles.rightCol}>{isHost?opposition&&opposition.tries:bil&&bil.tries}</Text>
                            </View>
                            <View style={styles.statEntry}>
                                <Text style={styles.leftCol}>{isHost?bil&&bil.conversions:opposition&&opposition.conversions}</Text>
                                <Text style={styles.midCol}>CONVERSIONS</Text>
                                <Text style={styles.rightCol}>{isHost?opposition&&opposition.conversions:bil&&bil.conversions}</Text>
                            </View>

                            <View style={styles.statEntry}>
                                <Text style={styles.leftCol}>{isHost?bil&&bil.penalties:opposition&&opposition.penalties}</Text>
                                <Text style={styles.midCol}>PENALTIES</Text>
                                <Text style={styles.rightCol}>{isHost?opposition&&opposition.penalties:bil&&bil.penalties}</Text>
                            </View>

                            <View style={styles.statEntry}>
                                <Text style={styles.leftCol}>{isHost?bil&&bil.dropped_goals:opposition&&opposition.dropped_goals}</Text>
                                <Text style={styles.midCol}>DROP GOALS</Text>
                                <Text style={styles.rightCol}>{isHost?opposition&&opposition.dropped_goals:bil&&bil.dropped_goals}</Text>
                            </View>

                            <View style={styles.statEntry}>
                                <Text style={styles.leftCol}>{isHost?bil&&bil.possession:opposition&&opposition.possession}%</Text>
                                <Text style={styles.midCol}>POSSESSION</Text>
                                <Text style={styles.rightCol}>{isHost?opposition&&opposition.possession:bil&&bil.possession}%</Text>
                            </View>

                            <View style={styles.statEntry}>
                                <Text style={styles.leftCol}>{isHost?bil&&bil.breaks:opposition&&opposition.breaks}</Text>
                                <Text style={styles.midCol}>BREAKS</Text>
                                <Text style={styles.rightCol}>{isHost?opposition&&opposition.breaks:bil&&bil.breaks}</Text>
                            </View>

                            <View style={styles.statEntry}>
                                <Text style={styles.leftCol}>{isHost?bil&&bil.metres:opposition&&opposition.metres}</Text>
                                <Text style={styles.midCol}>METRES</Text>
                                <Text style={styles.rightCol}>{isHost?opposition&&opposition.metres:bil&&bil.metres}</Text>
                            </View>

                            <View style={styles.statEntry}>
                                <Text style={styles.leftCol}>{isHost?bil&&bil.scrums:opposition&&opposition.scrums}</Text>
                                <Text style={styles.midCol}>SCRUMS WON</Text>
                                <Text style={styles.rightCol}>{isHost?opposition&&opposition.scrums:bil&&bil.scrums}</Text>
                            </View>

                            <View style={styles.statEntry}>
                                <Text style={styles.leftCol}>{isHost?bil&&bil.line_outs:opposition&&opposition.line_outs}</Text>
                                <Text style={styles.midCol}>LINE-OUTS WON</Text>
                                <Text style={styles.rightCol}>{isHost?opposition&&opposition.line_outs:bil&&bil.line_outs}</Text>
                            </View>

                            <View style={styles.statEntry}>
                                <Text style={styles.leftCol}>{isHost?bil&&bil.pen_con:opposition&&opposition.pen_con}%</Text>
                                <Text style={styles.midCol}>PEN/CON.</Text>
                                <Text style={styles.rightCol}>{isHost?opposition&&opposition.pen_con:bil&&bil.pen_con}%</Text>
                            </View>

                          </ScrollView>    
                    }                    
                                  
                    </View>
              </View>
        )
    }
}

export default connect(null, null)(MatchSummary)