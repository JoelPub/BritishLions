'use strict'

import type { Action } from '../actions/types'
import { SET_USER_PROFILE,SET_SQUAD_TOSHOW,SET_SQUAD_DATA,SET_TEAM_TOSHOW,SET_TEAM_DATA,SET_TEAM_DATA_TEMP,SET_OFFICIAL_SQUAD_TOSHOW,SET_OPPOSITION_SQUAD_TOSHOW } from '../actions/squad'

export type State = {
    userProfile: Object,
    squadToShow: Object,
    squadData: string,
    teamToShow: Object,
    teamData: string,
    teamDataTemp: string,
    officialSquadToShow: Object,
    oppositionSquadToShow: Object,
}

const initialState = {
    userProfile: {},
    squadToShow: {},
    squadData: null,
    teamToShow: {},
    teamData: null,
    teamDataTemp: null,
    officialSquadToShow: {},
    oppositionSquadToShow: {},
}

export default function (state:State = initialState, action:Action): State {
    
    if (action.type === SET_USER_PROFILE) {
        return {
            ...state,
            userProfile: action.userProfile
        }
    }
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
    if (action.type === SET_TEAM_TOSHOW) {
        return {
            ...state,
            teamToShow: action.teamToShow
        }
    }
    if (action.type === SET_TEAM_DATA) {
        return {
            ...state,
            teamData: action.teamData
        }
    }
    if (action.type === SET_TEAM_DATA_TEMP) {
        return {
            ...state,
            teamDataTemp: action.teamDataTemp
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
