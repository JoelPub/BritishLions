'use strict'

import type { Action } from '../actions/types'
import { globalNav } from '../appNavigator'
import { PUSH_NEW_ROUTE, POP_ROUTE, RESET_ROUTE, POP_TO_ROUTE, REPLACE_ROUTE, REPLACE_OR_PUSH_ROUTE } from '../actions/route'
import { REHYDRATE } from 'redux-persist/constants'

export type State = {
  routes: Array<string>,
  rtl:Bool
}

const initialState = {
  routes: ['news'],
  rtl:false
}

export default function (state:State = initialState, action:Action): State {

  if (action.type === PUSH_NEW_ROUTE) {
    globalNav.navigator.push({id: action.route})
    return {
      routes: [...state.routes, action.route]
    }
  }

  if (action.type === RESET_ROUTE) {
        globalNav.navigator.resetTo({id: 'login'})
        return {
            routes: []
        }
    }

  if (action.type === REPLACE_ROUTE) {
    // console.log('reducers replace rout',action.rtl)
    globalNav.navigator.replaceWithAnimation({id: action.route},action.rtl)
    let routes = state.routes
    routes.pop()
    return {
      routes: [...routes, action.route]
    }
  }

  // For sidebar navigation
  if (action.type === REPLACE_OR_PUSH_ROUTE) {
    let routes = state.routes

    if(routes[routes.length - 1] == 'home') {
      // If top route is home and user navigates to a route other than home, then push
      if(action.route != 'home')
        globalNav.navigator.push({id: action.route})

      // If top route is home and user navigates to home, do nothing
      else
        routes = []
    }

    else {
      if(action.route == 'home') {
        globalNav.navigator.resetTo({id: 'home'})
        routes = []
      }
      else {
        globalNav.navigator.replaceWithAnimation({id: action.route})
        routes.pop()
      }

    }

    return {
      routes: [...routes, action.route]
    }
  }

  if (action.type === POP_ROUTE) {
    globalNav.navigator.pop()
    let routes = state.routes
    routes.pop()
    return {
      routes: routes
    }
  }

  if (action.type === POP_TO_ROUTE) {
    let r=globalNav.navigator.getCurrentRoutes()
    if(r.findIndex(x=>x.id===action.route)===-1) {
       globalNav.navigator.pop()
    }
    else {
      globalNav.navigator.popToRoute(r[r.findIndex(x=>x.id===action.route)])
    }
    
    let routes = state.routes
    return {
      routes: [...routes, action.route]
    }
  }

  if (action.type === REHYDRATE) {
    const savedData = action['payload']['route'] || state
    return {
      ...savedData
    }
  }

  return state
}
