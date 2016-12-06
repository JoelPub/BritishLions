'use strict'

import type { Action } from './types'
import { pushNewRoute, replaceRoute} from './route'
import { alertBox } from '../components/utility/alertBox'
import axios from 'axios'
import qs from 'qs'
import { getAccessToken } from '../components/utility/asyncStorageServices'

export const GET_PLAYERLIST = 'GET_PLAYERLIST'
export const GET_PLAYERS_DETAIL = 'GET_PLAYERS_DETAIL'
export const PUSH_UNION = 'PUSH_UNION'
export const PUSH_DETAIL = 'PUSH_DETAIL'

export const INVALID_TOKEN = 'INVALID_TOKEN'

export function editFavList(favEditUrl,favUrl,playerid,errorCallback):Action {
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
                                    payload: response.data
                                }))
                            })
                            .catch(function(error){
                                errorCallback()
                            })
                            
                        })
                        .catch(function(error) {
                            errorCallback(error)
                        })

                    }
                    else {               
                        errorCallback()
                    }
                }

                    )
                .catch(function(error) {
                            errorCallback()
                        })
            )
    }
}

export function getUnionDetail(unionUrl,favUrl):Action {
    return (dispatch, getState) => {
        return (
            axios.get(
                unionUrl
            )
            .then(function(response) {
                if(response.data) {
                    getAccessToken()
                    .then((token)=> {
                        if(!!token&&token!=='') {
                            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                            axios.get(
                                favUrl
                            )
                            .then(function(tokenresponse){
                                dispatch(getPlayersDetail({
                                    payload: {tokenData:tokenresponse.data,soticData:response.data}
                                }))
                            })
                            .catch(function(error){
                                dispatch(getPlayersDetail({
                                    payload: {tokenData:null,soticData:response.data}
                                }))
                            })
                        }
                        else {
                            dispatch(getPlayersDetail({
                                payload: {tokenData:null,soticData:response.data}
                            }))
                        }
                        
                    })
                    .catch((err) => {
                        dispatch(getPlayersDetail({
                            payload: {tokenData:null,soticData:response.data}
                        }))
                    })
                }
                else {
                    alertBox(
                      'An Error Occured',
                      'Please make sure the network is connected and reload the app. ',
                      'Dismiss'
                    )
                }
            })
            .catch(function(error) {
                alertBox(
                  'An Error Occured',
                  'Please make sure the network is connected and reload the app. ',
                  'Dismiss'
                )
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
                           errorCallback(error)
                        })

                    }
                    else {
                        errorCallback(INVALID_TOKEN)
                    }
                })
                .catch((err) => {
                   errorCallback()
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
                                payload: tokenresponse.data
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

export function showList(item, route:string):Action {
    return (dispatch, getState) => {
        dispatch(pushUnion({item}))
        dispatch(pushNewRoute(route))
    }
}

export function showDetail(item, route:string):Action {
    return (dispatch, getState) => {
        dispatch(pushDetail({item}))
        dispatch(pushNewRoute(route))
    }
}

function getPlayerlist({payload}):Action {
    return {
        type: GET_PLAYERLIST,
        payload
    }
}

function getPlayersDetail({payload}):Action {
    return {
        type: GET_PLAYERS_DETAIL,
        payload
    }
}


function pushUnion({item}):Action {
    return {
        type: PUSH_UNION,
        item
    }
}

function pushDetail({item}):Action {
    return {
        type: PUSH_DETAIL,
        item
    }
}
