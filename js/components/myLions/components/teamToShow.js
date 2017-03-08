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
                    console.log('team.get(index)',team.get(index))
                    console.log('find result',team.get(index).find(x=>x.name===v.position))
                    if(team.get(index).find(x=>x.name===v.position)!==undefined) {
                        tempFeed=tempFeed.update(index,val=>{
                            val[i].info=searchPlayer(fullPlayerList,team.get(index).find(x=>x.name===v.position).id,uniondata)
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
        teamToShow[position].find(value=>value.info&&value.info.id&&value.info.id.toString()===playerid).info=null
    }
    else {
        teamToShow['indivPos'].find(value=>strToUpper(position)===strToUpper(value.position)).info=null
    }
    console.log('removeplayer teamToShow',teamToShow)
    return teamToShow
}
export function addPlayer(teamToShow,position,detail,playerid) {
    console.log('addplayer')
    if(playerid) {
        console.log('playerid',playerid)
        console.log('val',teamToShow[position].find(value=>value.position==='loosehead_prop'))
        teamToShow[position].find(value=>value.position==='loosehead_prop').info=detail
    }
    else {
        teamToShow['indivPos'].find((value)=>strToUpper(position)===strToUpper(value.position==='wildcard'?'widecard':value.position)).info=detail
    }
    console.log('teamToShow',teamToShow[position])
    return teamToShow
}