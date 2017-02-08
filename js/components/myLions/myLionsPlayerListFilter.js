
'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { Container, Text, Icon} from 'native-base'
import styles from './styles'
import ButtonFeedback from '../utility/buttonFeedback'
import LinearGradient from 'react-native-linear-gradient'

export default class MyLionsPlayerListFilter extends Component {
    constructor(props){
        super(props)
    }
    _setStyle = (isActive) =>{
        if(isActive)
            return styles.btnFilterActive
        else
            return styles.btnFilter
    }
    render(){
        return  (
            <View style={styles.filterContent}>
                <ScrollView bounces={false}>
                   <Text style={styles.filterTitle}>FILTER BY POSITION</Text>
                   <View style={styles.filterBtns}>
                       <View>
                           <Text style={[styles.filterSubTitle, styles.filterSubTitleLeft]}>FORWARDS</Text>
                           <View style={[styles.filterBtnsGroup]}>
                               <ButtonFeedback onPress={()=>this.props.getFilteredPosition('prop')} style={[styles.btnFilterLeft, this._setStyle(this.props.filterBy === 'prop')]}>
                                   <Text style={styles.btnFilterTxt}>PROP</Text>
                               </ButtonFeedback>
                               <ButtonFeedback onPress={()=>this.props.getFilteredPosition('hooker')}  style={[styles.btnFilterLeft, this._setStyle(this.props.filterBy === 'hooker')]}>
                                   <Text style={styles.btnFilterTxt}>HOOKER</Text>
                               </ButtonFeedback>
                               <ButtonFeedback onPress={()=>this.props.getFilteredPosition('lock')}  style={[styles.btnFilterLeft, this._setStyle(this.props.filterBy === 'lock')]}>
                                   <Text style={styles.btnFilterTxt}>LOCK</Text>
                               </ButtonFeedback>
                              <ButtonFeedback onPress={()=>this.props.getFilteredPosition('back row')}  style={[styles.btnFilterLeft, this._setStyle(this.props.filterBy === 'back row')]}>
                                   <Text style={styles.btnFilterTxt}>BACK ROW</Text>
                              </ButtonFeedback>
                           </View>
                       </View>
                       <View>
                           <Text style={[styles.filterSubTitle, styles.filterSubTitleRight]}>BACKS</Text>
                           <View style={[styles.filterBtnsGroup]}>
                              <ButtonFeedback onPress={()=>this.props.getFilteredPosition('scrum half')} style={[styles.btnFilterRight, this._setStyle(this.props.filterBy === 'scrum half')]}>
                                  <Text style={styles.btnFilterTxt}>SCRUM-HALF</Text>
                              </ButtonFeedback>
                              <ButtonFeedback onPress={()=>this.props.getFilteredPosition('fly half')}  style={[styles.btnFilterRight, this._setStyle(this.props.filterBy === 'fly half')]}>
                                  <Text style={styles.btnFilterTxt}>FLY-HALF</Text>
                              </ButtonFeedback>
                              <ButtonFeedback onPress={()=>this.props.getFilteredPosition('winger')}  style={[styles.btnFilterRight, this._setStyle(this.props.filterBy === 'winger')]}>
                                  <Text style={styles.btnFilterTxt}>WINGER</Text>
                              </ButtonFeedback>
                              <ButtonFeedback onPress={()=>this.props.getFilteredPosition('centre')}  style={[styles.btnFilterRight, this._setStyle(this.props.filterBy === 'centre')]}>
                                   <Text style={styles.btnFilterTxt}>CENTRE</Text>
                              </ButtonFeedback>
                              <ButtonFeedback onPress={()=>this.props.getFilteredPosition('full back')}  style={[styles.btnFilterRight, this._setStyle(this.props.filterBy === 'full back')]}>
                                   <Text style={styles.btnFilterTxt}>FULL-BACK</Text>
                              </ButtonFeedback>
                           </View>
                       </View>
                   </View>
                </ScrollView>
           </View>
        )
    }
}