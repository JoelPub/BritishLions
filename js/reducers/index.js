'use strict'

import {combineReducers} from 'redux'

import drawer from './drawer'
import route from './route'
import content from './content'
import timer from './timer'
import token from './token'
import player from './player'
import network from './network'

export default combineReducers({
	drawer,
  	route,
	content,
	timer,
	token,
	player,
	network
})
