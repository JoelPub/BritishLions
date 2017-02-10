'use strict'

import type { Action } from './types'

export const SET_SQUAD_TOSHOW = 'SET_SQUAD_TOSHOW'
export const SET_SQUAD_DATA = 'SET_SQUAD_DATA'

export function setSquadToShow(squadToShow):Action {
    return {
        type: SET_SQUAD_TOSHOW,
        squadToShow
    }
}
export function setSquadData(squadData):Action {
	console.log('action squadData',squadData)
    return {
        type: SET_SQUAD_DATA,
        squadData
    }
}
