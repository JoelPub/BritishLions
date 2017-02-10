'use strict'

import type { Action } from '../actions/types'
import { SET_SQUAD_TOSHOW } from '../actions/squad'
import { SET_SQUAD_DATA } from '../actions/squad'

export type State = {
    squadToShow: Object,
    squadData: string,
}

const initialState = {
    squadToShow: {},
    squadData: null,
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_SQUAD_TOSHOW) {
        return {
            ...state,
            squadToShow: action.squadToShow
        }
    }
    if (action.type === SET_SQUAD_DATA) {
    	console.log('reducer squadData',action.squadData)
        return {
            ...state,
            squadData: action.squadData
        }
    }

    return state
}
