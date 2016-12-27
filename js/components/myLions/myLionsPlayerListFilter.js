
'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Container, Text, Content, Icon} from 'native-base'
import { replaceRoute } from '../../actions/route'
import { drillDown } from '../../actions/content'
import styleVar from '../../themes/variable'
import styles from './styles'
import theme from '../../themes/base-theme'
import ButtonFeedback from '../utility/buttonFeedback'
import LinearGradient from 'react-native-linear-gradient'

class MyLionsPlayerListFilter extends Component {
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
            <View>
               <Text style={styles.filterTitle}>FILTER BY POSITION</Text>
               <View style={styles.filterBtns}>
                   <View>
                       <Text style={styles.filterSubTitle}>FORWARDS</Text>
                       <View style={styles.filterBtnsGroup}>
                           <ButtonFeedback onPress={()=>this.props.getFilteredPosition('prop')} style={this._setStyle(this.props.filterBy === 'prop')}>
                               <Text style={styles.btnFilterTxt}>PROP</Text>
                           </ButtonFeedback>
                           <ButtonFeedback onPress={()=>this.props.getFilteredPosition('hooker')}  style={this._setStyle(this.props.filterBy === 'hooker')}>
                               <Text style={styles.btnFilterTxt}>HOOKER</Text>
                           </ButtonFeedback>
                           <ButtonFeedback onPress={()=>this.props.getFilteredPosition('lock')}  style={this._setStyle(this.props.filterBy === 'lock')}>
                               <Text style={styles.btnFilterTxt}>LOCK</Text>
                           </ButtonFeedback>
                           <ButtonFeedback onPress={()=>this.props.getFilteredPosition('flanker')}  style={this._setStyle(this.props.filterBy === 'flanker')}>
                                <Text style={styles.btnFilterTxt}>FLANKER</Text>
                           </ButtonFeedback>
                           <ButtonFeedback onPress={()=>this.props.getFilteredPosition('number 8')}  style={this._setStyle(this.props.filterBy === 'number 8')}>
                                <Text style={styles.btnFilterTxt}>NUMBER 8</Text>
                           </ButtonFeedback>
                       </View>
                   </View>
                   <View>
                       <Text style={styles.filterSubTitle}>BACKS</Text>
                       <View style={styles.filterBtnsGroup}>
                          <ButtonFeedback onPress={()=>this.props.getFilteredPosition('scrum half')}  style={this._setStyle(this.props.filterBy === 'scrum half')}>
                              <Text style={styles.btnFilterTxt}>SCRUM-HALF</Text>
                          </ButtonFeedback>
                          <ButtonFeedback onPress={()=>this.props.getFilteredPosition('fly half')}  style={this._setStyle(this.props.filterBy === 'fly half')}>
                              <Text style={styles.btnFilterTxt}>FLY-HALF</Text>
                          </ButtonFeedback>
                          <ButtonFeedback onPress={()=>this.props.getFilteredPosition('wing')}  style={this._setStyle(this.props.filterBy === 'wing')}>
                              <Text style={styles.btnFilterTxt}>WING</Text>
                          </ButtonFeedback>
                          <ButtonFeedback onPress={()=>this.props.getFilteredPosition('centre')}  style={this._setStyle(this.props.filterBy === 'centre')}>
                               <Text style={styles.btnFilterTxt}>CENTRE</Text>
                          </ButtonFeedback>
                          <ButtonFeedback onPress={()=>this.props.getFilteredPosition('full back')}  style={this._setStyle(this.props.filterBy === 'full back')}>
                               <Text style={styles.btnFilterTxt}>FULL-BACK</Text>
                          </ButtonFeedback>
                       </View>
                   </View>
               </View>
           </View>
        )
    }
}
function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect((state) => {
    return {
        route: state.route,
    }
},  bindAction)(MyLionsPlayerListFilter)