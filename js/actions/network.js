'use strict'

import type { Action } from './types'

export const SET_NETWORK_STATUS = 'SET_NETWORK_STATUS'

export function setNetworkStatus(connectionInfo):Action {
    return {
        type: SET_NETWORK_STATUS,
        connectionInfo
    }
}
