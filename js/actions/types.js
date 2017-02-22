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
    | { type: 'SET_SQUAD_TOSHOW' }
    | { type: 'SET_SQUAD_DATA' }
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

export type Dispatch = (action:Action | ThunkAction | PromiseAction | Array<Action>) => any
export type GetState = () => Object
export type ThunkAction = (dispatch:Dispatch, getState:GetState) => any
export type PromiseAction = Promise<Action>
