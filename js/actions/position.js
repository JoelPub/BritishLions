'use strict'

import type { Action } from './types'

export const SET_POSITION_TOADD = 'SET_POSITION_TOADD'

export function setPositionToAdd(positionToAdd):Action {
    return {
        type: SET_POSITION_TOADD,
        positionToAdd
    }
}
