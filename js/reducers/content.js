'use strict'

import type { Action } from '../actions/types'
import { PUSH_CONTENT_ITEM, PUSH_CONTENT_ITEM_SUB, SET_CONTENT } from '../actions/content'
// import { REHYDRATE } from 'redux-persist/constants'

export type State = {
    contentState: Array<string>,
    isLoaded: Bool,
    isRefreshing: Bool,
    contentItem: number,
}

const initialState = {
    contentState: [],
    isLoaded: false,
    isRefreshing: false,
    contentItem: {}
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_CONTENT) {
        return {
            ...state,
            contentState: action.payload,
            isLoaded: true,
            isRefreshing: false
        }
    }


    if (action.type === PUSH_CONTENT_ITEM) {
        return {
            ...state,
            drillDownItem: action.item
        }
    }

    if (action.type === PUSH_CONTENT_ITEM_SUB) {
        return {
            ...state,
            drillDownItemSub: action.item
        }
    }

    // if (action.type === REHYDRATE) {
    //   const savedData = action['payload']['content'] || state
    //   return {
    //     ...savedData
    //   }
    // }
    return state
}
