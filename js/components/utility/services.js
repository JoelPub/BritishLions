'use strict'

import { NetInfo, Alert } from 'react-native'
import { getAccessToken } from './asyncStorageServices'
import axios from 'axios'
import qs from 'qs'
import { strToUpper } from './helper'


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
	if (__DEV__)console.log('error-opt: ', opt)
	if (__DEV__)console.log('error-error: ', error)

    if(error.response != undefined){
        let statusCode = error.response.status
        let errorType = error.response.data.error
        let errorDescription = error.response.data.error_description || ''
        let modelState = error.response.data.ModelState || null

        switch(statusCode) {
            case 500: // Internal Server Error (server error)
                errorDescription = ''
                break
            case 403: // Forbidden (SSL required)
                //errorDescription = 'Something went wrong with your request. Please try again later.' + error.response.data.error
                errorDescription = ''
                break
            case 401:
                errorDescription = 'Authorization failed. Please try again later.'
                break
            case 409:
                errorDescription = opt.channel==='MyAccount'?'The email you entered is already in use. Please specify a different email address.':'The email you entered is already in use by another account. Please specify a different email address.'
                break
            case 400: // Bad Request (invalid data submitted)
            	if (errorType === 'invalid_grant') {
								errorDescription = 'The email and password do not match, Please verify and try again.' // refresh token failed
								if (__DEV__)console.log(error.response.data.error_description)
								if (error.response.data.error_description == 'Google access token invalid.') {
									errorDescription = 'Google access token invalid.'
								}
								if (error.response.data.error_description == 'Facebook access token invalid.') {
									errorDescription = 'Facebook access token invalid.'
								}
							} else {
	                if (modelState) {
	                    errorDescription = errorSlice(modelState)
	                }
	            }
            case 404:
                if (opt.url=='https://www.api-ukchanges2.co.uk/api/password/reset'){
                    errorDescription = 'You have not yet registered as a user, please join the pride first.'
                }
                break
        }

        if(statusCode === 401) {
            // if Authorization has been denied.
            if (opt.onAuthorization) {
                opt.onAuthorization(error)
            }
        } else {
            if (opt.onError) {
                opt.onError(errorDescription)
            }
        }
	}else{
	    //opt.onError('Something went wrong with your request. Please check your internet and try again later.')
	    if (__DEV__)console.log('!!!Something went wrong with the request...........', opt)
	}
}


export function callApi(opt, axiosInstance, tryTimes = 0) {
	let isInternetConnected = false
    tryTimes += 1
	// use for loading, initial state
	if (opt.onAxiosStart) {
		opt.onAxiosStart()
	}

	NetInfo.fetch().done((connectionInfo) => {
		let netInfos = strToUpper(connectionInfo)
		if(netInfos === 'UNKNOW' || netInfos === 'NONE') {
			// No internet connection

			if (opt.onAxiosEnd) {
				opt.onAxiosEnd()
			}

			if (opt.onError) {
				//
				if(tryTimes < 5){
				    setTimeout(() => callApi(opt, axiosInstance, tryTimes), 5000)
				}
				else
				{
				    opt.onError('Service is temporarily unavailable, please try again later')
				}
			}
		} else {
			// There's an internet connection

			// TODO: make method to dynamic (improve)
			if (opt.method === 'post') {
                if (__DEV__)console.log("qs.stringify(opt.data)", opt.data)
                if (__DEV__)console.log("opt.isQsStringify", opt.isQsStringify)
				axiosInstance.post(
				    opt.url,
				    opt.isQsStringify ? qs.stringify(opt.data) : opt.data
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
					isInternetConnected = true

					// use for loading, after state
					if (opt.onAxiosEnd) {
						opt.onAxiosEnd()
					}
					
					if (opt.isRefreshToken) {
						// if the request is from appNavigator.js 
						if (opt.onError) {
							opt.onError(error)
						}
					} else {
						errorHandler(error, opt)
					}
				})
			} else {
				axiosInstance.get(
				    opt.url,
				    opt.isQsStringify ? qs.stringify(opt.data) : opt.data
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
					isInternetConnected = true

					// use for loading, after state
					if (opt.onAxiosEnd) {
						opt.onAxiosEnd()
					}
					
					if (opt.isRefreshToken) {
						// if the request is from appNavigator.js 
						if (opt.onError) {
							opt.onError(error)
						}
					} else {
						errorHandler(error, opt)
					}
				})
			}

			// Sometimes android is not working properly in checking if the device is
			// connected to the network or not, let's add some trick to handle this problem:
			// and lets add a flag logic and wait for some time to make sure if the device
			// is connected to the network or not
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
						opt.onError('Service is temporarily unavailable, please try again later', )
					}
				}
			}, 60000)
		}
	})
}

export function service(options) {
	let defaults = {
		url: '',
		data: {},
		auth:{},
		method: 'post',
		onSuccess: null,
		onError: null,
		onAuthorization: null,
		onAxiosStart: null,
		onAxiosEnd: null,
		isRequiredToken: false,
		isRefreshToken: false,
		channel: '',
		isQsStringify:true
	}

	let opt = Object.assign(defaults, options)

	if (opt.isRequiredToken) {
		getAccessToken().then((accessToken) => {
			if (accessToken) {
				if(opt.channel === 'EYC3') {
					//axios.defaults.headers.common['Content-Type'] = 'application/json'
					opt.data = Object.assign(opt.data, {'access_token':accessToken})
				}

				const axiosInstance = axios.create()
				axiosInstance.interceptors.request.use((config) => {
					config.headers.common['Authorization'] = `bearer ${accessToken}`

					return config
				})
				//axiosInstance.defaults.headers.common['Authorization'] = `bearer ${accessToken}`	// THIS WILL CHANGE THE GLOBLE SETTINGS,PLEASE BE AWARED BEFORE USE IT
				callApi(opt, axiosInstance)
			} else {
				// Sign In is Required
				if (opt.onAuthorization) {
					opt.onAuthorization('Sign In is Required')
				}
			}
		}).catch((error) => {
			// Sign In is Required
			if (opt.onAuthorization) {
				opt.onAuthorization('Sign In is Required')
			}
    	})
	} else {
		axios.interceptors.request.use((config) => {
			return config
		})
		callApi(opt, axios)
	}
}
