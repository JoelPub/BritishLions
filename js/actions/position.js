'use strict'

import type { Action } from './types'

export const SET_POSITION_TOADD = 'SET_POSITION_TOADD'
export const SET_POSITION_TOREMOVE = 'SET_POSITION_TOREMOVE'

export function setPositionToAdd(positionToAdd):Action {
    return {
        type: SET_POSITION_TOADD,
        positionToAdd
    }
}
export function setPositionToRemove(positionToRemove):Action {
    return {
        type: SET_POSITION_TOREMOVE,
        positionToRemove
    }
}
