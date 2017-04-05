'use strict'

import type { Action } from './types'

export const SET_USER_PROFILE = 'SET_USER_PROFILE'
export const SET_SQUAD_TOSHOW = 'SET_SQUAD_TOSHOW'
export const SET_SQUAD_DATA = 'SET_SQUAD_DATA'
export const SET_TEAM_TOSHOW = 'SET_TEAM_TOSHOW'
export const SET_TEAM_STATUS = 'SET_TEAM_STATUS'
export const SET_TEAM_DATA = 'SET_TEAM_DATA'
export const SET_TEAM_DATA_TEMP = 'SET_TEAM_DATA_TEMP'
export const SET_OFFICIAL_SQUAD_TOSHOW = 'SET_OFFICIAL_SQUAD_TOSHOW'
export const SET_OPPOSITION_SQUAD_TOSHOW = 'SET_OPPOSITION_SQUAD_TOSHOW'
export const SET_PRIVATE_LEAGUES = 'SET_PRIVATE_LEAGUES'
export const SET_VISITED_ONBOARDING = 'SET_VISITED_ONBOARDING'
export const SET_COACH_AND_STAFF = 'SET_COACH_AND_STAFF'

export function setUserProfile(userProfile):Action {
    return {
        type: SET_USER_PROFILE,
        userProfile
    }
}
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
export function setTeamToShow(teamToShow={}):Action {
    return {
        type: SET_TEAM_TOSHOW,
        teamToShow
    }
}

export function setTeamStatus(teamStatus):Action {
    return {
        type: SET_TEAM_STATUS,
        teamStatus
    }
}
export function setTeamData(teamData={}):Action {
    return {
        type: SET_TEAM_DATA,
        teamData
    }
}
export function setTeamDataTemp(teamDataTemp={}):Action {
    console.log('action teamDataTemp')
    return {
        type: SET_TEAM_DATA_TEMP,
        teamDataTemp
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

export function setPrivateLeagues(privateLeagues):Action {
    return {
        type: SET_PRIVATE_LEAGUES,
        privateLeagues
    }
}


export function setVisitedOnboarding(visitedOnboarding={}):Action {
    return {
        type: SET_VISITED_ONBOARDING,
        visitedOnboarding
    }
}
export function setCoachAndStaff(cocahAndStaff):Action {
    return {
        type: SET_COACH_AND_STAFF,
        cocahAndStaff
    }
}
