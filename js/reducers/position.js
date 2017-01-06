'use strict'

import type { Action } from '../actions/types'
import { SET_POSITION_TOADD } from '../actions/network'

export type State = {
    position: string
}

const initialState = {
    position: null
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_POSITION_TOADD) {
        return {
            ...state,
            position: action.position.toUpperCase()
        }
    }

    return state
}
