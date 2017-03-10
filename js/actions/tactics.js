
'use strict'

import type { Action } from './types'

export const SET_TACTICS_TOREMOVE = 'SET_TACTICS_TOREMOVE'
export const SET_TACTICS_TOSAVE = 'SET_TACTICS_TOSAVE'

export function setTacticsToSave(tacticsToSave):Action {
  return {
    type: SET_TACTICS_TOSAVE,
    tacticsToSave
  }
}
export function setTacticsToRemove(tacticsToRemove):Action {
  return {
    type: SET_TACTICS_TOREMOVE,
    tacticsToRemove
  }
}
