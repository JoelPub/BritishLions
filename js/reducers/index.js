'use strict'

import {combineReducers} from 'redux'

import drawer from './drawer'
import route from './route'
import content from './content'
import timer from './timer'

export default combineReducers({
	drawer,
  	route,
	content,
	timer
})
