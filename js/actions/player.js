'use strict'

import type { Action } from './types'
import { alertBox } from './../components/utility/alertBox'
import axios from 'axios'
import qs from 'qs'
import { getAccessToken } from '../components/utility/asyncStorageServices'

export const GET_PLAYERLIST = 'GET_PLAYERLIST'
export const GET_PLAYERS_DETAIL = 'GET_PLAYERS_DETAIL'


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
                                dispatch(getPlayerlist({
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
                            'An Error Occured',
                            'Please login',
                            'Dismiss'
                        )
                    }
                }

                    )
                .catch(function(error) {
                            alertBox(
                            'An Error Occured',
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
                            dispatch(getPlayerlist({
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
                                    dispatch(getPlayersDetail({
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

export function getPlayerlist({payload}):Action {
    return {
        type: GET_PLAYERLIST,
        payload
    }
}

export function getPlayersDetail({payload}):Action {
    return {
        type: GET_PLAYERS_DETAIL,
        payload
    }
}

