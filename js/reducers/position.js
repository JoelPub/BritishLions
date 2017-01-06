'use strict'

import type { Action } from '../actions/types'
import { SET_POSITION_TOADD } from '../actions/position'

export type State = {
    positionToAdd: string
}

const initialState = {
    positionToAdd: null
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_POSITION_TOADD) {
        return {
            ...state,
            positionToAdd: action.positionToAdd.toUpperCase()
        }
    }

    return state
}
