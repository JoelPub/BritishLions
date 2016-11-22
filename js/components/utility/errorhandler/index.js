'use strict'

import React, { Component } from 'react'
import { View} from 'native-base'
import styles from './style'
import Entry from './entry'

export default class ErrorHandler extends Component {
	constructor(props) {
      super(props)
      this.state = {
      	continue: true,
      	firstNameMsg: null,
      	lastNameMsg: null,
      	emailMsg: null,
      	passwordMsg: null,
      	confirmPasswordMsg: null,
      	tcMsg: null,
      	show: false
      }
  }
	_renderContent() {

		if(this.state.show == true) {
			return (
		  		<View style={styles.container}>
		  			<Entry msg={this.state.firstNameMsg} />
		  			<Entry msg={this.state.lastNameMsg} />
		  			<Entry msg={this.state.emailMsg} />
		  			<Entry msg={this.state.passwordMsg} />
		  			<Entry msg={this.state.confirmPasswordMsg} />
		  			<Entry msg={this.state.tcMsg} />
		      	</View>
  			)
		} else {
			return null
		}
	}
	shouldComponentUpdate(nextProps,nextState) {
			if(nextProps.errorCheck.submit) {
					this.setState({
							continue: true,
							firstNameMsg: null,
							lastNameMsg: null,
							emailMsg: null,
							passwordMsg: null,
							confirmPasswordMsg: null,
							tcMsg: null,
							show: false
					})
					this.validationCheck(nextProps,nextState)
			}
			return nextProps.errorCheck.submit === true
	}
	componentDidUpdate(){
			if(this.props.errorCheck.submit === true && this.state.continue === true) {
	    		this.setState({
	    				continue:false
					})
			}
	}

	validationCheck(nextProps,nextState) {
		if(nextProps.errorCheck.submit === true && this.state.continue === true) {
			if (nextProps.errorCheck.tc === false ||
					!blankCheck(nextProps.errorCheck.firstName) ||
					!blankCheck(nextProps.errorCheck.lastName) ||
					!blankCheck(nextProps.errorCheck.email) ||
					!blankCheck(nextProps.errorCheck.password) ||
					!blankCheck(nextProps.errorCheck.confirmPassword) ||
					((
						nextProps.errorCheck.password !== nextProps.errorCheck.confirmPassword) && ( typeof nextProps.errorCheck.confirmPassword !== 'undefined' )) ||
						!!(nextProps.errorCheck.email) && (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(nextProps.errorCheck.email) === false
					)) {
	            if(nextProps.errorCheck.tc === false) {
	                this.setState({
	                    tcMsg: 'T&C is required'
	                })
	            }
	            if(!blankCheck(nextProps.errorCheck.firstName)) {
	                this.setState({
	                    firstNameMsg: 'First Name is required'
	                })
	            }
	            if(!blankCheck(nextProps.errorCheck.lastName)) {
	                this.setState({
	                    lastNameMsg: 'Last Name is required'
	                })
	            }
	            if(!blankCheck(nextProps.errorCheck.email)) {
	               this.setState({
	                    emailMsg: 'Email address is required'
	                })
	            }
	            else if (!!(nextProps.errorCheck.email) && (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(nextProps.errorCheck.email) === false)) {
	                this.setState({
	                    emailMsg: 'Email address must be valid'
	                })
	            }
	            if(!blankCheck(nextProps.errorCheck.password) || !blankCheck(nextProps.errorCheck.confirmPassword)) {
	                this.setState({
	                    passwordMsg: 'Password is required'
	                })
	            }
	            else if((nextProps.errorCheck.password !== nextProps.errorCheck.confirmPassword) && (typeof nextProps.errorCheck.confirmPassword !== 'undefined')) {
	            	this.setState({
	                    confirmPasswordMsg: 'Confirm Password does not match the password '
	                })
	            }
	            this.setState({show:true})
	            setTimeout(() => {
	            	this.props.callbackParent(false)
	            },100)
        	}
        	else {
        		this.props.callbackParent(true)
        	}
    	}

    	function blankCheck(parameter) {
    		if(parameter == null || (typeof parameter === 'undefined')) {
    			return true
    		}
    		else if(parameter.replace(/(^\s+)|(\s+$)/g,'') === '') {
    			return false
    		}
    		else {
    			return true
    		}
		}
	}
  render(){
      return (
      	<View>
          	{this._renderContent()}
          </View>
      )
  }
}
