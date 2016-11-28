'use strict'

import type { Action } from '../actions/types'
import { SET_PLAYER } from '../actions/player'

export type State = {
    contentState: Array<string>,
    isLoaded: Bool,
    isRefreshing: Bool,
}

const initialState = {
    contentState: [],
    isLoaded: false,
    isRefreshing: false,
    contentItem: {}
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_PLAYER) {
        return {
            ...state,
            contentState: action.payload,
            isLoaded: true,
            isRefreshing: false
        }
    }

    return state
}
