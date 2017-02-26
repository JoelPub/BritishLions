'use strict'

import TeamShowModel from  '../../../modes/Team/TeamShowModel'
import { strToUpper } from '../../utility/helper'
import { searchPlayer } from './searchPlayer'
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
export function convertTeamToShow(team,fullPlayerList,uniondata) {
    let tempFeed=new TeamShowModel()
    tempFeed.forEach((value,index)=>{
            if(index==='backs'||index==='forwards') {
                value.map((v,i)=>{
                    if(team.get(index).get(i)!==undefined) {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i]=searchPlayer(fullPlayerList,team.get(index).get(i),uniondata)
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
                    let p=v.position
                    if(team.get(p)&&team.get(p).trim()!=='') {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].info=searchPlayer(fullPlayerList,team.get(p),uniondata)
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

export function checkFullTeam(teamShow) {
    let result=true
    console.log('teamShow',teamShow)
    for(let node in teamShow) {
            console.log('node',node)
        if(node==='backs'||node==='forwards') {
            teamShow[node].map((value,index)=>{
                if(value===null) result=false
            })
        }
        else {
            teamShow[node].map((value,index)=>{
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