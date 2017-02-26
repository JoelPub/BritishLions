'use strict'

import OfficialSquadShowModel from  '../../../modes/Squad/OfficialSquadShowModel'
import { strToUpper } from '../../utility/helper'
import Coach from '../../../../contents/my-lions/official/coach'
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

function  searchPlayer(player,id,uniondata) {
    console.log('searchPlayer')
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
                        result.image = require(`../../../../contents/unions/nations/125.png`)
                    } else if (result.image.indexOf('126.gif') > 0) {
                        result.image = require(`../../../../contents/unions/nations/126.png`)
                    } else if (result.image.indexOf('127.gif') > 0) {
                        result.image = require(`../../../../contents/unions/nations/127.png`)
                    } else if (result.image.indexOf('128.gif') > 0) {
                        result.image = require(`../../../../contents/unions/nations/128.png`)
                    } else {
                        result.image = {uri:result.image}
                    }
                }
                if(strToUpper(result.position)==='FLANKER'||strToUpper(result.position)==='NO. 8') result.position='Back Row'
                if(strToUpper(result.position)==='UTILITY BACK') result.position='Full Back'
                return result
            }
        }
        return result===undefined?null:result
    }