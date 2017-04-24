'use strict'

import OppositionSquadShowModel from  '../../../modes/Squad/OppositionSquadShowModel'
import { strToUpper,strToLower } from '../../utility/helper'
import { searchPlayer } from './searchPlayer'
import Immutable, { Record, List} from 'immutable'
export function convertSquadToShow(squad,fullPlayerList,uniondata) {
    if (__DEV__)console.log('squad',squad.toJS())
    let tempFeed=new OppositionSquadShowModel()
    tempFeed.forEach((value,index)=>{
        if (__DEV__)console.log('index',index)
            if(index==='backs'||index==='forwards') {
                tempFeed=tempFeed.set(index,new List())
                squad.get(index).map((v,i)=>{
                    if(searchPlayer(fullPlayerList,v.id,uniondata)!==null) tempFeed=tempFeed.update(index,val=>{return val.push({name:v.name,info:searchPlayer(fullPlayerList,v.id,uniondata)})})
                })
            }
            else {
                value.map((v,i)=>{
                    if (__DEV__)console.log('v',v)
                    let p=v.position
                    if (__DEV__)console.log('squad.get(p)',squad.get(p))
                    if(squad.get(p)&&squad.get(p).toString().trim()!=='') {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].info=searchPlayer(fullPlayerList,squad.get(p),uniondata)
                            if (__DEV__)console.log('val[i].info',val[i].info)
                            return val
                        })
                    }
                    else {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].info=null
                            return val
                        })
                    }
                })
            }
        })
        return tempFeed    
}