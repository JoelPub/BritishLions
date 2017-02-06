'use strict'

import type { Action } from '../actions/types'
import { SET_POSITION_TOADD,SET_POSITION_TOREMOVE } from '../actions/position'

export type State = {
    positionToAdd: string,
    positionToRemove: string,
}

const initialState = {
    positionToAdd: null,
    positionToRemove: null,
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_POSITION_TOADD) {
        return {
            ...state,
            positionToAdd: action.positionToAdd.toUpperCase()
        }
    }
    if (action.type === SET_POSITION_TOREMOVE) {
        return {
            ...state,
            positionToRemove: action.positionToRemove.toUpperCase()
        }
    }

    return state
}
