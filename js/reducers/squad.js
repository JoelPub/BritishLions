'use strict'

import type { Action } from '../actions/types'
import { SET_SQUAD_TOSHOW } from '../actions/squad'

export type State = {
    squadToShow: Object,
}

const initialState = {
    squadToShow: {},
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_SQUAD_TOSHOW) {
        return {
            ...state,
            squadToShow: action.squadToShow
        }
    }

    return state
}
