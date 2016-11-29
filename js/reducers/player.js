'use strict'

import type { Action } from '../actions/types'
import { GET_PLAYERLIST } from '../actions/player'
import { GET_PLAYERS_DETAIL } from '../actions/player'

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
            playerDetail: action.payload,
            isLoaded: true,
            isRefreshing: false
        }
    }

    return state
}
