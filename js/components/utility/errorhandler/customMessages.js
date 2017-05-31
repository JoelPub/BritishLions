'use strict'

import React, { Component } from 'react'
import { View, Text, Icon} from 'native-base'
import styles from './style'

export default class CustomMessages extends Component {
	constructor(props) {
		super(props)
	}

	renderErrorType(type) {
		if (type === 'success') {
			return (
				<View style={styles.entryShow}>
				    <Text style={styles.msgText}>{this.props.messages}</Text>
				</View>
			)
		} 

		return (
			<View style={styles.entryShow}>
			    <Icon name='md-alert' style={styles.msgIcon}/>
			    <Text style={styles.msgText}>{this.props.messages}</Text>
			</View>
		)
	}

	render() {
		let errorType = this.props.errorType || 'success'
		
		return (
			this.props.messages !== ''?
				<View style={styles.container}>
					{this.renderErrorType(errorType)}
		    	</View>
		    :
		    	null
		)
	}
}
