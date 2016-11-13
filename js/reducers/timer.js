'use strict'

import type { Action } from '../actions/types'
import { SET_COUNTDOWN_TIMER_END } from '../actions/timer'

export type State = {
    isCountDownTimerEnd: Bool
}

const initialState = {
    isCountDownTimerEnd: false
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_COUNTDOWN_TIMER_END) {
        return {
            ...state,
            isCountDownTimerEnd: action.isEnd
        }
    }

    return state
}
