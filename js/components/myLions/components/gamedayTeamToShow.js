'use strict'

import GamedayTeamShowModel from  '../../../modes/Squad/gamedayTeamShowModel'
import { strToUpper,strToLower } from '../../utility/helper'
import { searchPlayer } from './searchPlayer'
import Immutable, { Record, List} from 'immutable'
export function convertSquadToShow(squad,fullPlayerList,uniondata) {
    console.log('squad',squad.toJS())
    let tempFeed=new GamedayTeamShowModel()
    tempFeed.forEach((value,index)=>{
        console.log('index',index)
            if(index==='captain') {
                tempFeed=tempFeed.update(index,val=>{
                        return searchPlayer(fullPlayerList,squad.get(index),uniondata)
                    })
               
            }
            else {
                tempFeed=tempFeed.set(index,new List())
                squad.get(index).map((v,i)=>{
                    if(searchPlayer(fullPlayerList,v,uniondata)!==null) tempFeed=tempFeed.update(index,val=>{return val.push({name:v.name,info:searchPlayer(fullPlayerList,v,uniondata)})})
                })     
            }
        })
        return tempFeed    
}