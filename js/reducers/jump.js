'use strict'

import type { Action } from '../actions/types'
import { JUMP_TO } from '../actions/jump'

export type State = {
    jumpRoute: string
}

const initialState = {
    jumpRoute: null
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === JUMP_TO) {
    	// if (__DEV__)console.log('reducers jumpRoute',action.jumpRoute)
        return {
            ...state,
            jumpRoute: action.jumpRoute
        }
    }

    return state
}
