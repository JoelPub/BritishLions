'use strict'

import TeamShowModel from  '../../../modes/Team/TeamShowModel'
import { strToUpper } from '../../utility/helper'
import { searchPlayer } from './searchPlayer'
export function convertTeamToShow(team,fullPlayerList,uniondata) {
    let tempFeed=new TeamShowModel()
    tempFeed.forEach((value,index)=>{
            if(index==='backs'||index==='forwards') {
                value.map((v,i)=>{
                    console.log('v.posotion',v.position)
                    console.log('team.get(index)',team.get(index).toJS())
                    console.log('find result',team.get(index).find(x=>x.get('name')===v.position).get('id'))
                    if(team.get(index).find(x=>x.get('name')===v.position)!==undefined) {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].info=searchPlayer(fullPlayerList,team.get(index).find(x=>x.get('name')===v.position).get('id'),uniondata)
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
            else {
                value.map((v,i)=>{
                    let p=v.position
                    if(team.get(p)) {
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