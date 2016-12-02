'use strict'

import { Alert, NetInfo } from 'react-native'
import { getAccessToken } from './asyncStorageServices'
import axios from 'axios'
import qs from 'qs'


function errorSlice(errObj) {
	let msgs = ''
	let errors = []

	Object.keys(errObj).forEach((key) => {
		errors.push.apply(errors, errObj[key])
	})

	errors.map((msg) => {
		msgs += msg + '\n'
	})

	return msgs
}

function errorHandler(error, opt) {
	let statusCode = error.response.status
	let errorType = error.response.data.error
	let errorDescription = error.response.data.error_description || ''
	let modelState = error.response.data.ModelState || null
	let alertTitle = 'An error occured'
	let alertButton = {text: 'DISMISS'}
	
	switch(statusCode) {
		case 500: // Internal Server Error (server error)
		case 403: // Forbidden (SSL required)
			errorDescription = 'Something went wrong with your request. Please try again later.'
			break 
		case 409: 
			alertTitle = 'Messages'
			errorDescription = 'The email you entered is already in use by another account. Please specify a different email address.'
			alertButton = {text: 'OK'}
			break
		case 400: // Bad Request (invalid data submitted)
			alertTitle = 'Messages'
			alertButton = {text: 'OK'}
			if (modelState) {
				errorDescription = errorSlice(modelState)
			}
			break
	}

	if(statusCode === 401) {
		// if Authorization has been denied.
		if (opt.authorizationCallback) {
			opt.authorizationCallback(error)
		}
	} else {
		Alert.alert(
			alertTitle,
			errorDescription,
			[alertButton]
		)
	}
}


function callApi(opt) {
	axios.post(
	    opt.url,
	    qs.stringify(opt.data)
	).then(function(res) {
		if (opt.successCallback) {
			opt.successCallback(res)
		}
	}).catch(function(error) {
		// console.log('errorHandler: ', error.response)
		// no need to prompt a message if the request is from 
		// appNavigator.js and its about refreshing of token
		if (!opt.isRefreshToken) {
			errorHandler(error, opt)
		}

		if (opt.errorCallback) {
			opt.errorCallback(error)
		}
	})
}

export function service(options) {
	let defaults = {
		url: '',
		data: {},
		successCallback: null,
		errorCallback: null,
		authorizationCallback: null, 
		isRequiredToken: false, 
		enableErrorPrompt: false, 
		isRefreshToken: false
	}

	let opt = Object.assign(defaults, options)

	// TODO: Add a condition that will handle the network problem
	// if (NetInfo.isConnected) {}
	if (opt.isRequiredToken) {
		getAccessToken().then((accessToken) => {
			if (accessToken) {
				axios.defaults.headers.common['Authorization'] = `bearer ${accessToken}`
				callApi(opt)
			} else {
				Alert.alert(
				    'Messages',
				    'Please sign in your account.',
				    [{text: 'DISMISS'}]
				)
			}
		}).catch((error) => {
            Alert.alert(
                'An error occured',
                '' + error,
                [{text: 'DISMISS'}]
            )
    	})
	} else {
		callApi(opt)
	}
}



