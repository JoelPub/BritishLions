'use strict'

import type { Action } from '../actions/types'
import { GET_PLAYERLIST,GET_PLAYERS_DETAIL,PUSH_UNION,PUSH_DETAIL } from '../actions/player'

export type State = {
    playerList: Array<string>,
    playerDetail: Array<string>,
    isLoaded: Bool,
    isRefreshing: Bool,
}

const initialState = {
    playerList: [],
    playerDetail: [],
    isLoaded: false,
    isRefreshing: false,
    contentItem: {}
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === GET_PLAYERLIST) {
        return {
            ...state,
            playerList: action.payload,
            isLoaded: true
        }
    }

    if (action.type === GET_PLAYERS_DETAIL) {
        return {
            ...state,
            playerList: action.payload.tokenData,
            playerDetail: action.payload.soticData,
            isLoaded: true,
            isRefreshing: false
        }
    }

    if (action.type === PUSH_UNION) {
        return {
            ...state,
            union: action.item
        }
    }

    if (action.type === PUSH_DETAIL) {
        return {
            ...state,
            detail: action.item
        }
    }
    return state
}
