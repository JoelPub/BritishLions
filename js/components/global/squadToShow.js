'use strict'

import SquadShowModel from  'modes/Squad/SquadShowModel'
import { strToUpper } from '../utility/helper'
export function convertSquadToShow(squad,fullPlayerList,isPop,uniondata) {
    let tempFeed=new SquadShowModel()
    tempFeed.forEach((value,index)=>{
            if(index==='backs'||index==='forwards') {
                value.map((v,i)=>{
                    if(squad.get(index).get(i)!==undefined) {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i]=searchPlayer(fullPlayerList,squad.get(index).get(i),uniondata)
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
                    let p=isPop?v.position:v.position==='wildcard'?'widecard':v.position
                    if(squad.get(p)&&squad.get(p).trim()!=='') {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].info=searchPlayer(fullPlayerList,squad.get(p),uniondata)
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

function  searchPlayer(player,id,uniondata) {
        let result=null
        for(let union in player) {
            result=player[union].find((item)=>item.id===id.toString())
            if(result !== undefined) {
                let unionInfo = uniondata.find((n)=> n.id===union)
                Object.assign(result, {
                    logo: unionInfo.image, 
                    country: unionInfo.displayname.toUpperCase(),
                    countryid: unionInfo.id
                })

                if(typeof result.image==='string') {
                   if (result.image.indexOf('125.gif') > 0) {
                        result.image = require(`../../../contents/unions/nations/125.png`)
                    } else if (result.image.indexOf('126.gif') > 0) {
                        result.image = require(`../../../contents/unions/nations/126.png`)
                    } else if (result.image.indexOf('127.gif') > 0) {
                        result.image = require(`../../../contents/unions/nations/127.png`)
                    } else if (result.image.indexOf('128.gif') > 0) {
                        result.image = require(`../../../contents/unions/nations/128.png`)
                    } else {
                        result.image = {uri:result.image}
                    } 
                }
                if(strToUpper(result.position)==='FLANKER'||strToUpper(result.position)==='NO. 8') result.position='back row'
                if(strToUpper(result.position)==='UTILITY BACK') result.position='full back'
                return result
            }
        }
        return result===undefined?null:result
    }