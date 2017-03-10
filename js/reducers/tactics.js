'use strict'

import type { Action } from '../actions/types'
import { SET_TACTICS_TOREMOVE,SET_TACTICS_TOSAVE } from '../actions/tactics'

export type State = {
  tacticsToSave: string,
  tacticsToRemove: string,
}

const initialState = {
  tacticsData: null,
}

export default function (state:State = initialState, action:Action): State {

  if (action.type === SET_TACTICS_TOSAVE) {
    return {
      ...state,
      tacticsData: action.tacticsToSave
    }
  }
  if (action.type === SET_TACTICS_TOREMOVE) {
    return {
      ...state,
      tacticsData: null
    }
  }

  return state
}
