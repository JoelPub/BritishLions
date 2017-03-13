'use strict'

import SquadShowModel from  'modes/Squad/SquadShowModel'
import { strToUpper } from '../utility/helper'
export function compareShowSquad(rSquad,jSquad){
    if (JSON.stringify(jSquad)==='{}') return false
    let result=true
    rSquad.forEach((value,index)=>{
        if(index==='backs'||index==='forwards'){
            value.map((v,i)=>{
                if(v===null){
                    if(jSquad[index][i]!==null) result=false
                }
                else{
                    if(jSquad[index][i]===null||jSquad[index][i].id!==v.id) result=false
                }
            })
        }
        else {
            value.map((v,i)=>{
                if(v.info===null) {
                    if(jSquad[index][i].info!==null) result=false
                }
                else {
                    if(jSquad[index][i].info===null||jSquad[index][i].info.id!==v.info.id) result=false
                }
            })
        }
    })
    return result
}
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

export function checkFullSquad(squadShow) {
    let result=true
    console.log('squadShow',squadShow)
    for(let node in squadShow) {
            console.log('node',node)
        if(node==='backs'||node==='forwards') {
            squadShow[node].map((value,index)=>{
                if(value===null) result=false
            })
        }
        else {
            squadShow[node].map((value,index)=>{
                if(value.info===null) result=false
            })
        }
    }
    return result    
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
                if(strToUpper(result.position)==='FLANKER'||strToUpper(result.position)==='NO. 8') result.position='Back Row'
                if(strToUpper(result.position)==='UTILITY BACK') result.position='Full Back'
                return result
            }
        }
        return result===undefined?null:result
    }

export function removePlayer(squadToShow,position,playerid) {
    if(playerid) {
        squadToShow[position].splice([squadToShow[position].findIndex((value)=>value&&value.id===playerid)],1)
        squadToShow[position].push(null)
    }
    else {
        squadToShow['indivPos'].find((value)=>strToUpper(position)===strToUpper(value.position==='wildcard'?'widecard':value.position)).info=null
    }
    return squadToShow
}
export function addPlayer(squadToShow,position,detail,playerid) {
    if(playerid) {
        squadToShow[position][squadToShow[position].findIndex((value)=>value===null)]=detail
    }
    else {
        squadToShow['indivPos'].find((value)=>strToUpper(position)===strToUpper(value.position==='wildcard'?'widecard':value.position)).info=detail
    }
    
    return squadToShow
}
export function replacePlayer(squadToShow,position,detail,playerid,sequence) {
    if(playerid) {
        squadToShow[position][sequence]=detail
    }
    else {
        squadToShow['indivPos'].find((value)=>strToUpper(position)===strToUpper(value.position)).info=detail
    }
    
    console.log('squadToShow',squadToShow)
    return squadToShow
}