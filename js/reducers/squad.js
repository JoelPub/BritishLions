'use strict'

import type { Action } from '../actions/types'
import { SET_SQUAD_TOSHOW,SET_SQUAD_DATA,SET_OFFICIAL_SQUAD_TOSHOW,SET_OPPOSITION_SQUAD_TOSHOW } from '../actions/squad'

export type State = {
    squadToShow: Object,
    squadData: string,
    officialSquadToShow: Object,
    oppositionSquadToShow: Object,
}

const initialState = {
    squadToShow: {},
    squadData: null,
    officialSquadToShow: {},
    oppositionSquadToShow: {},
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_SQUAD_TOSHOW) {
        return {
            ...state,
            squadToShow: action.squadToShow
        }
    }
    if (action.type === SET_SQUAD_DATA) {
        return {
            ...state,
            squadData: action.squadData
        }
    }
    if (action.type === SET_OFFICIAL_SQUAD_TOSHOW) {
        return {
            ...state,
            officialSquadToShow: action.officialSquadToShow
        }
    }
    if (action.type === SET_OPPOSITION_SQUAD_TOSHOW) {
        return {
            ...state,
            oppositionSquadToShow: action.oppositionSquadToShow
        }
    }

    return state
}
