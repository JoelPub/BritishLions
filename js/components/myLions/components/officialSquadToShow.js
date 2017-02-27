'use strict'

import OfficialSquadShowModel from  '../../../modes/Squad/OfficialSquadShowModel'
import { strToUpper } from '../../utility/helper'
import Coach from '../../../../contents/my-lions/official/coach'
import { searchPlayer } from './searchPlayer'
export function convertSquadToShow(squad,fullPlayerList,uniondata) {
    console.log('squad',squad.toJS())
    let tempFeed=new OfficialSquadShowModel()
    tempFeed.forEach((value,index)=>{
        console.log('index',index)
            if(index==='backs'||index==='forwards') {
                value.map((v,i)=>{
                    if(squad.get(index)[i]!==undefined) {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i]=searchPlayer(fullPlayerList,squad.get(index)[i],uniondata)
                            return val
                        })
                    }
                    else {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i]=null
                            return val
                        })
                    }
                })
            }
            else {
                value.map((v,i)=>{
                    console.log('v',v)
                    let p=v.position
                    console.log('squad.get(p)',squad.get(p))
                    if(squad.get(p)&&squad.get(p).toString().trim()!=='') {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].info=searchPlayer(fullPlayerList,squad.get(p),uniondata)
                            console.log('val[i].info',val[i].info)
                            return val
                        })
                    }
                    else {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].info=Coach
                            return val
                        })
                    }
                })
            }
        })
        return tempFeed
}

