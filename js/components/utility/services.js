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

function errorHandler(error) {
	console.log('errorHandler: ', error.response)

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
		case 401:
			errorDescription = 'Authorization has been denied. Please try again later.'
			break
		case 409:
			alertTitle = 'Email account already in use'
			errorDescription = 'The email you entered is already in use by another account. Please specify a different email address.'
			alertButton = {text: 'OK'}
			break
		case 400: // Bad Request (invalid data submitted)
			alertButton = {text: 'OK'}
			if (modelState) {
				errorDescription = errorSlice(modelState)
			}
			break
	}

	Alert.alert(
		alertTitle,
		errorDescription,
		[alertButton]
	)
}


function callApi(url, data, callback) {
	axios.post(
	    url,
	    qs.stringify(data)
	).then(function(res) {

		if (callback) {
			callback(res)
		}

	}).catch(function(error) {
	    errorHandler(error)
	})
}

export function service(url, data, callback, token = false) {
	// TODO: Add a condition that will handle the network problem
	// if (NetInfo.isConnected) {}
	if (token) {
		getAccessToken().then((accessToken) => {
			if (accessToken) {
				axios.defaults.headers.common['Authorization'] = `bearer ${accessToken}`
				callApi(url, data, callback)
			} else {
				Alert.alert(
				    'Login required',
				    'Please login with your account.',
				    [{text: 'DISMISS'}]
				)
			}
		}).catch((error) => {
            Alert.alert(
                'Warning',
                '' + error,
                [{text: 'DISMISS'}]
            )
    	})
	} else {
		callApi(url, data, callback)
	}

}
