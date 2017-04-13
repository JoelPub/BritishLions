'use strict'

import type { Action } from './types'

export const JUMP_TO = 'JUMP_TO'

export function setJumpTo(jumpRoute=null):Action {
	// console.log('action jumpRoute',jumpRoute)
    return {
        type: JUMP_TO,
        jumpRoute
    }
}
