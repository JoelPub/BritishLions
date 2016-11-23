'use strict'

import React, { Component } from 'react'
import { View} from 'native-base'
import styles from './style'
import Entry from './entry'
var firstNameMsg=null,
	lastNameMsg=null,
	emailMsg=null,
	passwordMsg=null,
	confirmPasswordMsg=null,
	tcMsg=null,
	show=false
	
export default class ErrorHandler extends Component {
	_renderContent() {
		if(show == true) {
			return (
		  		<View style={styles.container}>
		  			<Entry msg={firstNameMsg} />
		  			<Entry msg={lastNameMsg} />
		  			<Entry msg={emailMsg} />
		  			<Entry msg={passwordMsg} />
		  			<Entry msg={confirmPasswordMsg} />
		  			<Entry msg={tcMsg} />
		      	</View>
  			)
		} else {
			return null
		}
	}
	shouldComponentUpdate(nextProps,nextState) {
			if(nextProps.errorCheck.submit) {				
				this.validationCheck(nextProps,nextState)
			}
			return nextProps.errorCheck.submit === true
	}

	validationCheck(nextProps,nextState) {
			firstNameMsg=null
			lastNameMsg=null
			emailMsg=null
			passwordMsg=null
			confirmPasswordMsg=null
			tcMsg=null
			show=false

			if (nextProps.errorCheck.tc === false ||
					!blankCheck(nextProps.errorCheck.firstName) ||
					!!(nextProps.errorCheck.firstName) && nextProps.errorCheck.firstName.length>50 ||
					!blankCheck(nextProps.errorCheck.lastName) ||
					!!(nextProps.errorCheck.lastName) && nextProps.errorCheck.lastName.length>50 ||
					!blankCheck(nextProps.errorCheck.email) ||
					!!(nextProps.errorCheck.email) && nextProps.errorCheck.email.length>256 ||
					!blankCheck(nextProps.errorCheck.password) ||
					!!(nextProps.errorCheck.password) && nextProps.errorCheck.password.length<8 ||
					!!(nextProps.errorCheck.password) && nextProps.errorCheck.password.length>50 ||
					!!(nextProps.errorCheck.password) && (/^(?![a-zA-Z]+$)(?![a-z\d]+$)(?![A-Z\d]+$)[a-zA-Z\d]{8,}$/.test(nextProps.errorCheck.password) === false) ||
					!blankCheck(nextProps.errorCheck.confirmPassword) ||
					((
						nextProps.errorCheck.password !== nextProps.errorCheck.confirmPassword) && ( typeof nextProps.errorCheck.confirmPassword !== 'undefined' )) ||
						!!(nextProps.errorCheck.email) && (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(nextProps.errorCheck.email) === false
					)) {
	            if(nextProps.errorCheck.tc === false) {	                
	                    tcMsg= 'T&C is required'	                
	            }
	            if(!blankCheck(nextProps.errorCheck.firstName)) {	                
	                    firstNameMsg= 'First Name is required'	               
	            }
	            else if(!!(nextProps.errorCheck.firstName) && nextProps.errorCheck.firstName.length>50) {	            	
	                    firstNameMsg= 'First Name is too long'	                
	            }
	            if(!blankCheck(nextProps.errorCheck.lastName)) {	                
	                    lastNameMsg= 'Last Name is required'	                
	            }
	            else if(!!(nextProps.errorCheck.lastName) && nextProps.errorCheck.lastName.length>50) {	            	
	                    lastNameMsg= 'Last Name is too long'	                
	            }
	            if(!blankCheck(nextProps.errorCheck.email)) {	              
	                    emailMsg= 'Email address is required'	                
	            }
	            else if(!!(nextProps.errorCheck.email) && nextProps.errorCheck.email.length>256) {	            	
	                    emailMsg= 'Email address is too long'	                
	            }
	            else if (!!(nextProps.errorCheck.email) && (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(nextProps.errorCheck.email) === false)) {	                
	                    emailMsg= 'Email address must be valid'	                
	            }
	            if(!blankCheck(nextProps.errorCheck.password) || !blankCheck(nextProps.errorCheck.confirmPassword)) {	                
	                    passwordMsg= 'Password is required'	                
	            }
	            else if(!!(nextProps.errorCheck.password) && nextProps.errorCheck.password.length>50) {	            	
	                    passwordMsg= 'Password is too long'	                
	            }
	            else if(!!(nextProps.errorCheck.password) && nextProps.errorCheck.password.length<8) {	            	
	                    passwordMsg= 'Password is too short'	                
	            }
	            else if(!!(nextProps.errorCheck.password) && (/^(?![a-zA-Z]+$)(?![a-z\d]+$)(?![A-Z\d]+$)[a-zA-Z\d]{8,}$/.test(nextProps.errorCheck.password) === false)) {
	            		passwordMsg= 'Password must contain a digit, an upper and a lower case letter'	                
	            }
	            else if((nextProps.errorCheck.password !== nextProps.errorCheck.confirmPassword) && (typeof nextProps.errorCheck.confirmPassword !== 'undefined')) {	            	
	                    confirmPasswordMsg= 'Confirm Password does not match the password '	                
	            }
	            show=true
	            this.props.callbackParent(false)
        	}
        	else {
        		this.props.callbackParent(true)
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
