'use strict'

import type { Action } from '../actions/types'
import { SET_ACCESS_GRANTED } from '../actions/token'

export type State = {
    isAccessGranted: Bool
}

const initialState = {
    isAccessGranted: false
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_ACCESS_GRANTED) {
        return {
            ...state,
            isAccessGranted: action.isAccessGranted
        }
    }

    return state
}
