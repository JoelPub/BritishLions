'use strict'

import type { Action } from './types'
export const SET_COUNTDOWN_TIMER_END = 'SET_COUNTDOWN_TIMER_END'


export function setCountDownTimerEnd(isEnd):Action {
    return (dispatch, getState) => {
        dispatch({
            type: SET_COUNTDOWN_TIMER_END,
            isEnd
        })
    }
}

