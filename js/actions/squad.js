'use strict'

import type { Action } from './types'

export const SET_SQUAD_TOSHOW = 'SET_SQUAD_TOSHOW'
export const SET_SQUAD_DATA = 'SET_SQUAD_DATA'
export const SET_OFFICIAL_SQUAD_TOSHOW = 'SET_OFFICIAL_SQUAD_TOSHOW'
export const SET_OPPOSITION_SQUAD_TOSHOW = 'SET_OPPOSITION_SQUAD_TOSHOW'

export function setSquadToShow(squadToShow):Action {
    return {
        type: SET_SQUAD_TOSHOW,
        squadToShow
    }
}
export function setSquadData(squadData):Action {
    return {
        type: SET_SQUAD_DATA,
        squadData
    }
}
export function setOfficialSquadToShow(officialSquadToShow):Action {
    return {
        type: SET_OFFICIAL_SQUAD_TOSHOW,
        officialSquadToShow
    }
}
export function setOppositionSquadToShow(oppositionSquadToShow):Action {
    return {
        type: SET_OPPOSITION_SQUAD_TOSHOW,
        oppositionSquadToShow
    }
}
