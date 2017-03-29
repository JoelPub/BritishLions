'use strict'

import type { Action } from '../actions/types'
import { SET_USER_PROFILE,SET_SQUAD_TOSHOW,SET_SQUAD_DATA,SET_TEAM_TOSHOW,SET_TEAM_DATA,SET_TEAM_DATA_TEMP,SET_OFFICIAL_SQUAD_TOSHOW,SET_OPPOSITION_SQUAD_TOSHOW,SET_PRIVATE_LEAGUES,SET_TEAM_STATUS,SET_VISITED_ONBOARDING,SET_COACH_AND_STAFF } from '../actions/squad'

export type State = {
    userProfile: Object,
    squadToShow: Object,
    squadData: string,
    teamToShow: Object,
    teamStatus: boolean,
    teamData: Object,
    teamDataTemp: Object,
    officialSquadToShow: Object,
    oppositionSquadToShow: Object,
    privateLeagues: boolean,
    visitedOnboarding: Object,
    coachData: Object
}

const initialState = {
    userProfile: {},
    squadToShow: {},
    squadData: null,
    teamToShow: {},
    teamStatus: false,
    teamData: {},
    teamDataTemp: {},
    officialSquadToShow: {},
    oppositionSquadToShow: {},
    privateLeagues: false,
    visitedOnboarding: {},
    coachData:{}
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
    if (action.type === SET_TEAM_STATUS) {
        return {
            ...state,
            teamStatus: action.teamStatus
        }
    }
    if (action.type === SET_TEAM_DATA) {
        return {
            ...state,
            teamData: action.teamData
        }
    }
    if (action.type === SET_TEAM_DATA_TEMP) {
        console.log('reducer teamDataTemp',action.teamDataTemp)
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
    if (action.type === SET_PRIVATE_LEAGUES) {
        return {
            ...state,
            privateLeagues: action.privateLeagues
        }
    }
    if (action.type === SET_VISITED_ONBOARDING) {
        return {
            ...state,
            visitedOnboarding: action.visitedOnboarding
        }
    }
    if (action.type === SET_COACH_AND_STAFF) {
        return {
            ...state,
            coachData: action.cocahAndStaff
        }
    }

    return state
}
