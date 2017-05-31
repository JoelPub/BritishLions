'use strict'

import type { Action } from './types'

export const SET_ACCESS_GRANTED = 'SET_ACCESS_GRANTED'

export function setAccessGranted(isAccessGranted):Action {
    return {
        type: SET_ACCESS_GRANTED,
        isAccessGranted
    }
}
