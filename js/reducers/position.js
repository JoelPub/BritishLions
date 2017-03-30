'use strict'

import type { Action } from '../actions/types'
import { SET_POSITION_TOADD,SET_POSITION_TOREMOVE,SET_VIEWDETAIL_FROM } from '../actions/position'
import { strToUpper } from '../components/utility/helper'

export type State = {
    positionToAdd: string,
    positionToRemove: string,
    viewDetailFrom: string,
}

const initialState = {
    positionToAdd: null,
    positionToRemove: null,
    viewDetailFrom: null,
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_POSITION_TOADD) {
        return {
            ...state,
            positionToAdd: strToUpper(action.positionToAdd)
        }
    }
    if (action.type === SET_POSITION_TOREMOVE) {
        return {
            ...state,
            positionToRemove: strToUpper(action.positionToRemove)
        }
    }
    if (action.type === SET_VIEWDETAIL_FROM) {
        return {
            ...state,
            viewDetailFrom: action.viewDetailFrom
        }
    }

    return state
}
