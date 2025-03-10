'use strict'

export type Action =
    { type: 'PUSH_NEW_ROUTE', route: string }
    | { type: 'POP_ROUTE' }
    | { type: 'RESET_ROUTE' }
    | { type: 'POP_TO_ROUTE', route: string }
    | { type: 'REPLACE_ROUTE', route: string }
    | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
    | { type: 'OPEN_DRAWER' }
    | { type: 'CLOSE_DRAWER' }
    | { type: 'SET_CONTENT' }
    | { type: 'SET_USER_PROFILE' }
    | { type: 'SET_SQUAD_TOSHOW' }
    | { type: 'SET_SQUAD_DATA' }
    | { type: 'SET_TEAM_TOSHOW' }
    | { type: 'SET_TEAM_STATUS' }
    | { type: 'SET_TEAM_DATA' }
    | { type: 'SET_TEAM_DATA_TEMP' }
    | { type: 'SET_OFFICIAL_SQUAD_TOSHOW' }
    | { type: 'SET_OPPOSITION_SQUAD_TOSHOW' }
    | { type: 'PUSH_CONTENT_ITEM'}
    | { type: 'PUSH_CONTENT_ITEM_SUB'}
    | { type: 'REPLACE_CONTENT_ITEM'}
    | { type: 'SET_COUNTDOWN_TIMER_END'}
    | { type: 'SET_ACCESS_GRANTED'}
    | { type: 'SET_NETWORK_STATUS' }
    | { type: 'SET_POSITION_TOADD' }
    | { type: 'SET_POSITION_TOREMOVE' }
    | { type: 'SET_VIEWDETAIL_FROM' }
    | { type: 'SET_PRIVATE_LEAGUES' }
    | { type: 'SET_TACTICS_TOREMOVE' }
    | { type: 'SET_TACTICS_TOSAVE' }
    | { type: 'SET_VISITED_ONBOARDING' }
    | { type: 'JUMP_TO' }

export type Dispatch = (action:Action | ThunkAction | PromiseAction | Array<Action>) => any
export type GetState = () => Object
export type ThunkAction = (dispatch:Dispatch, getState:GetState) => any
export type PromiseAction = Promise<Action>
