'use strict'

import type { Action } from '../actions/types'
import { SET_NETWORK_STATUS } from '../actions/network'

export type State = {
    connectionInfo: string
}

const initialState = {
    connectionInfo: null
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_NETWORK_STATUS) {
        return {
            ...state,
            connectionInfo: action.connectionInfo.toUpperCase()
        }
    }

    return state
}
