'use strict'

import { NetInfo } from 'react-native'
import type { Action } from './types'
import { pushNewRoute, replaceRoute} from './route'
import { alertBox } from './../components/utility/alertBox'

import axios from 'axios'

export const SET_CONTENT = 'SET_CONTENT'
export const PUSH_CONTENT_ITEM = 'PUSH_CONTENT_ITEM'
export const PUSH_CONTENT_ITEM_SUB = 'PUSH_CONTENT_ITEM_SUB'
export const REPLACE_CONTENT_ITEM = 'REPLACE_CONTENT_ITEM'
export const REPLACE_CONTENT_SHARE = 'REPLACE_CONTENT_SHARE'

export function fetchContent(url):Action {
    return (dispatch, getState) => {
        return (
            NetInfo.fetch().done((connectionInfo) => {
                let netInfos = connectionInfo.toLowerCase()
                
                if(netInfos === 'unknown' || netInfos === 'none') {
                    dispatch(setContent({
                        payload: []
                    }))

                    alertBox(
                      'An Error Occured',
                      'Please make sure that you\'re connected to the network.',
                      'Dismiss'
                    )
                } else {
                    axios({
                        method: 'get',
                        url
                    })
                    // Passing resquest's response to dispacher
                    .then(function(response) {
                        dispatch(setContent({
                            payload: response.data
                        }))
                    })
                    // Handling error (status > 300) -> default
                    .catch(function(error) {
                        alertBox(
                          'An Error Occured',
                          'Something went wrong with your request. Please check your internet and try again later.',
                          'Dismiss'
                        )
                    })
                }
            })
        )
    }
}


export function setContent({payload}):Action {
    return {
        type: SET_CONTENT,
        payload
    }
}

export function saveContent(payload):Action {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(setContent({
                payload
            }))
        }, 400)
    }
}

export function pushContentItem({item}):Action {
    return {
        type: PUSH_CONTENT_ITEM,
        item
    }
}

export function pushContentItemSub({item}):Action {
    return {
        type: PUSH_CONTENT_ITEM_SUB,
        item
    }
}
export function share({item}):Action {
    return {
        type: REPLACE_CONTENT_SHARE,
        item
    }
}

export function drillDown(item, route:string):Action {
    return (dispatch, getState) => {
        dispatch(pushContentItem({item}))
        dispatch(pushNewRoute(route))
    }
}

export function drillReplace(item, route:string, isSub, isPushNewRoute: false,rtl:false):Action {
    // if (__DEV__)console.log('action drillReplace',rtl)
    return (dispatch, getState) => {
        if (isSub)
            dispatch(pushContentItem({item}))
        else 
            dispatch(pushContentItemSub({item}))
        

        if (isPushNewRoute) 
            dispatch(pushNewRoute(route))
        else 
            dispatch(replaceRoute(route,rtl))
    }
}

export function shareReplace(item, route:string, isSub, isPushNewRoute: false):Action {
    return (dispatch, getState) => {
            dispatch(share({item}))
        if (isPushNewRoute)
            dispatch(pushNewRoute(route))
        else
            dispatch(replaceRoute(route))
    }
}