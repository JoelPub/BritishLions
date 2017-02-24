'use strict'

import OppositionSquadShowModel from  '../../../modes/Squad/OppositionSquadShowModel'
import { searchPlayer } from './searchPlayer'
export function convertSquadToShow(squad,fullPlayerList,uniondata) {
    console.log('squad',squad.toJS())
    let tempFeed=new OppositionSquadShowModel()
    tempFeed.forEach((value,index)=>{
        console.log('index',index)
            if(index==='backs'||index==='forwards') {
                value.map((v,i)=>{
                    if(squad.get(index)[i]!==undefined) {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].position=squad.get(index)[i].name
                            val[i].info=searchPlayer(fullPlayerList,squad.get(index)[i].id,uniondata)
                            return val
                        })
                    }
                    else {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].position=''
                            val[i].info=null
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
                            val[i].info=null
                            return val
                        })
                    }
                })
            }
        })
        return tempFeed    
}