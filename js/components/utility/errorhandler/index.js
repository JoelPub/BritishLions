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
      	firstnameMsg: null,
      	lastnameMsg: null,
      	emailMsg: null,
      	passwordMsg: null,
      	confirmPasswordMsg: null,
      	termMsg: null,
      	show: false
      }
  }
	_renderContent() {
		
		if(this.state.show == true) {
			return (
		  		<View style={styles.container}>
		  			<Entry msg={this.state.firstnameMsg} />
		  			<Entry msg={this.state.lastnameMsg} />
		  			<Entry msg={this.state.emailMsg} />
		  			<Entry msg={this.state.passwordMsg} />
		  			<Entry msg={this.state.confirmPasswordMsg} />
		  			<Entry msg={this.state.termMsg} />
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
							firstnameMsg: null,
							lastnameMsg: null,
							emailMsg: null,
							passwordMsg: null,
							confirmPasswordMsg: null,
							termMsg: null,
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
		if(nextProps.errorCheck.submit===true&&this.state.continue===true) {
			if (nextProps.errorCheck.term===false||!blankCheck(nextProps.errorCheck.firstname)||!blankCheck(nextProps.errorCheck.lastname)||!blankCheck(nextProps.errorCheck.email)||!blankCheck(nextProps.errorCheck.password)||!blankCheck(nextProps.errorCheck.confirmPassword)||((nextProps.errorCheck.password!==nextProps.errorCheck.confirmPassword)&&(typeof nextProps.errorCheck.confirmPassword!=='undefined'))||!!(nextProps.errorCheck.email)&&(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(nextProps.errorCheck.email)===false)) {
	            if(nextProps.errorCheck.term===false) {
	                this.setState({
	                    termMsg: 'T&C is required'
	                })
	            }
	            if(!blankCheck(nextProps.errorCheck.firstname)) {
	                this.setState({
	                    firstnameMsg: 'First Name is required'
	                })
	            }
	            if(!blankCheck(nextProps.errorCheck.lastname)) {
	                this.setState({
	                    lastnameMsg: 'Last Name is required'
	                })
	            }
	            if(!blankCheck(nextProps.errorCheck.email)) {
	               this.setState({
	                    emailMsg: 'Email address is required'
	                })
	            }
	            else if (!!(nextProps.errorCheck.email)&&(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(nextProps.errorCheck.email)===false)) {
	                this.setState({
	                    emailMsg: 'Email address must be valid'
	                })
	            }
	            if(!blankCheck(nextProps.errorCheck.password)||!blankCheck(nextProps.errorCheck.confirmPassword)) {
	                this.setState({
	                    passwordMsg: 'Password is required'
	                })
	            }
	            else if((nextProps.errorCheck.password!==nextProps.errorCheck.confirmPassword)&&(typeof nextProps.errorCheck.confirmPassword!=='undefined')) {
	            	this.setState({
	                    confirmPasswordMsg: 'Confirm Password does not match the password '
	                })
	            }
	            this.setState({show:true})
	            setTimeout(()=> {
	            	this.props.callbackParent(false)
	            },100)
        	}
        	else {
        		this.props.callbackParent(true)
        	}
    	}

    	function blankCheck(parameter) {
    		if(parameter==null||(typeof parameter==='undefined')) {
    			return true
    		}
    		else if(parameter.replace(/(^\s+)|(\s+$)/g,'')==='') {
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
