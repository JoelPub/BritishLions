'use strict'

import MatchManShowModel from  '../../../modes/Squad/matchManShowModel'
import { strToUpper,strToLower } from '../../utility/helper'
import { searchPlayer } from './searchPlayer'
import Immutable, { Record, List} from 'immutable'
export function convertSquadToShow(squad,fullPlayerList,uniondata) {
    if (__DEV__)console.log('squad',squad.toJS())
    let tempFeed=new MatchManShowModel()
    tempFeed.forEach((value,index)=>{
                tempFeed=tempFeed.set(index,new List())
                squad.get(index).map((v,i)=>{
                    if(searchPlayer(fullPlayerList,v,uniondata)!==null) tempFeed=tempFeed.update(index,val=>{return val.push({name:v.name,info:searchPlayer(fullPlayerList,v,uniondata)})})
                })
        })
        return tempFeed    
}