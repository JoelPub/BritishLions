'use strict'

import React, { Component } from 'react'
import { View, Text, Icon} from 'native-base'
import styles from './style'

export default class Entry extends Component {

constructor(props) {
        super(props)
        this.state = {
        	validation: false,
        	continue: true,
        	emailMsg: null,
        	passwordMsg: null
        }
    }

    render(){
        if (this.props.msg !== null) {
            return (
                <View style={styles.entryShow}>
                    <Icon name='md-alert' style={styles.msgIcon}/>
                    <Text style={styles.msgText}>{this.props.msg}</Text>
                </View>
            )
        } else {
            return null
        }
    }
}
