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

export function removePlayer(teamToShow,position,playerid) {
    if(playerid) {
        teamToShow[position].splice([teamToShow[position].findIndex((value)=>value&&value.id===playerid)],1)
        teamToShow[position].push(null)
    }
    else {
        teamToShow['indivPos'].find((value)=>strToUpper(position)===strToUpper(value.position==='wildcard'?'widecard':value.position)).info=null
    }
    return teamToShow
}
export function addPlayer(teamToShow,position,detail,playerid) {
    if(playerid) {
        teamToShow[position][teamToShow[position].findIndex((value)=>value===null)]=detail
    }
    else {
        teamToShow['indivPos'].find((value)=>strToUpper(position)===strToUpper(value.position==='wildcard'?'widecard':value.position)).info=detail
    }
    
    return teamToShow
}
export function replacePlayer(teamToShow,position,detail,playerid,sequence) {
    if(playerid) {
        teamToShow[position][sequence]=detail
    }
    else {
        teamToShow['indivPos'].find((value)=>strToUpper(position)===strToUpper(value.position)).info=detail
    }
    
    console.log('teamToShow',teamToShow)
    return teamToShow
}