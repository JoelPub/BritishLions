'use strict'

import type { Action } from './types'

export const SET_SQUAD_TOSHOW = 'SET_SQUAD_TOSHOW'

export function setSquadToShow(squadToShow):Action {
    return {
        type: SET_SQUAD_TOSHOW,
        squadToShow
    }
}
