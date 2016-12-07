'use strict'

import type { Action } from './types'
import { alertBox } from './../components/utility/alertBox'
import axios from 'axios'
import qs from 'qs'
import { getAccessToken } from '../components/utility/asyncStorageServices'

export const SET_PLAYER = 'SET_PLAYER'


export function editFavList(favEditUrl,favUrl,playerid):Action {
    return (dispatch, getState) => {
        return(
            getAccessToken()
                .then((token)=> {
                    if(!!token&&token!=='') {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                        axios.post(
                            favEditUrl,
                            qs.stringify({
                                'playerId': playerid
                            })
                        )
                        .then(function(response){
                            axios.get(
                                favUrl
                            )
                            .then(function(response){
                                dispatch(setPlayer({
                                    payload: {playerList:response.data}
                                }))
                            })
                            .catch(function(error){
                                alertBox(
                                  'An Error Occured',
                                  'fetch data error',
                                  'Dismiss'
                                    )
                            })

                        })
                        .catch(function(error) {
                            alertBox(
                                'An Error Occured',
                                'Update player list error',
                                'Dismiss'
                            )
                        })

                    }
                    else {
                        alertBox(
                            'Warning',
                            'Please login',
                            'Dismiss'
                        )
                    }
                }

                    )
                .catch(function(error) {
                            alertBox(
                            'Warning',
                            'Please login',
                            'Dismiss'
                            )
                        })
            )
    }
}

export function getFavList(favUrl):Action {
    return (dispatch, getState) => {
        return(
            getAccessToken()
                .then((token)=> {
                    if(!!token&&token!=='') {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                        axios.get(
                            favUrl
                        )
                        .then(function(tokenresponse){
                            dispatch(setPlayer({
                                payload: {playerList:tokenresponse.data}
                            }))
                        })
                        .catch(function(error){
                        })
                    }

                })
                .catch((err) => {
                })
            )
    }
}

export function getFavDetail(favUrl,soticUrl,errorCallback):Action {
    return (dispatch, getState) => {
        return(
            getAccessToken()
                .then((token) => {
                    if(!!token&&token!=='') {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                        axios.get(
                            favUrl
                        )
                        .then(function(tokenresponse) {
                            if (tokenresponse.data) {
                                axios.get(
                                    soticUrl
                                )
                                .then(function(response){
                                    dispatch(setPlayer({
                                        payload: {tokenData:tokenresponse.data,soticData:response.data}
                                    }))
                                })
                                .catch(function(error){
                                    errorCallback()
                                })

                            } else {
                               errorCallback()
                            }
                        }.bind(this))
                        .catch(function(error) {
                           errorCallback()
                        })

                    }
                    else {
                        errorCallback()
                    }
                })
                .catch((err) => {
                   errorCallback()
                })
            )
    }
}

export function setPlayer({payload}):Action {
    return {
        type: SET_PLAYER,
        payload
    }
}
