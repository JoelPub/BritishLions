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
		if (opt.onAuthorization) {
			opt.onAuthorization(error)
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
	let isInternetConnected = false

	// use for loading, initial state
	if (opt.onAxiosStart) {
		opt.onAxiosStart()
	}

	axios.post(
	    opt.url,
	    qs.stringify(opt.data)
	).then(function(res) {
		isInternetConnected = true

		// use for loading, after state
		if (opt.onAxiosEnd) {
			opt.onAxiosEnd()
		}

		if (opt.onSuccess) {
			opt.onSuccess(res)
		}
	}).catch(function(error) {
		// console.log('errorHandler: ', error.response)
		isInternetConnected = true

		// use for loading, after state
		if (opt.onAxiosEnd) {
			opt.onAxiosEnd()
		}

		if (opt.onError) {
			opt.onError(error)
		}
		
		// no need to prompt a message if the request is from 
		// appNavigator.js and its about refreshing of token
		if (!opt.isRefreshToken) {
			errorHandler(error, opt)
		}
	})


	// This will be an alternative solution for checking if device is
	// connected to the internet or not, while react native have a bug 
	// in netInfo.isConnected
	setTimeout(() => {
		if (isInternetConnected === false) {
			// if this flag is still false 
			// it means that we dont received any response from axios
			// maybe it due of internet connectivity issues

			// use for loading, after state
			if (opt.onAxiosEnd) {
				opt.onAxiosEnd()
			}

			if (opt.onError) {
				opt.onError('No Internet Connection')
			}

			Alert.alert(
			  'An Error Occured',
			  'Please make sure the network is connected.',
			  'Dismiss'
			)
		}
	}, 60000)

}

export function service(options) {
	let defaults = {
		url: '',
		data: {},
		onSuccess: null,
		onError: null,
		onAuthorization: null, 
		onAxiosStart: null,
		onAxiosEnd: null,
		isRequiredToken: false, 
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
				if (opt.onError) {
					opt.onError('Invalid Access Token')
				}

				Alert.alert(
				    'Messages',
				    'Please sign in your account.',
				    [{text: 'DISMISS'}]
				)
			}
		}).catch((error) => {
			if (opt.onError) {
				opt.onError('No Access Token')
			}

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



