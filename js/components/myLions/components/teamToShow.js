'use strict'

import TeamShowModel from  '../../../modes/Team/TeamShowModel'
import TeamShowInitModel from  '../../../modes/Team/TeamShowInitModel'
import { strToUpper,strToLower } from '../../utility/helper'
import { searchPlayer } from './searchPlayer'
export function convertTeamToShow(team,fullPlayerList,uniondata) {
    let tempFeed=new TeamShowModel()
    tempFeed.forEach((value,index)=>{
            if(index==='backs'||index==='forwards') {
                value.map((v,i)=>{
                    // if (__DEV__)console.log('v.posotion',v.position)
                    // if (__DEV__)console.log('team.get(index)',team.get(index))
                    // if (__DEV__)console.log('find result',team.get(index).find(x=>x.get('name')===v.position))
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
export function convertInitTeamToShow(team,fullPlayerList,uniondata) {
    let tempFeed=new TeamShowInitModel()
    tempFeed.forEach((value,index)=>{
            if(index==='backs'||index==='forwards') {
                value.map((v,i)=>{
                    // if (__DEV__)console.log('v.posotion',v.position)
                    // if (__DEV__)console.log('team.get(index)',team.get(index))
                    // if (__DEV__)console.log('find result',team.get(index).find(x=>x.get('name')===v.position))
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

export function removePlayer(teamToShow,position,playerid,subPosition) {
    if(playerid) {
        teamToShow[position].find(value=>value.info&&value.info.id&&value.info.id.toString()===playerid&&value.position===subPosition).info=null
    }
    else {
        teamToShow['indivPos'].find(value=>strToUpper(position)===strToUpper(value.position)).info=null
    }
    if (__DEV__)console.log('removeplayer teamToShow',teamToShow)
    return teamToShow
}
export function addPlayer(teamToShow,position,detail,playerid,subPosition) {
    if (__DEV__)console.log('addplayer')
    if(playerid) {
        if (__DEV__)console.log('playerid',playerid)
        teamToShow[position].find(value=>value.position===subPosition).info=detail
    }
    else {
        teamToShow['indivPos'].find((value)=>strToUpper(position)===strToUpper(value.position)).info=detail
    }
    if (__DEV__)console.log('teamToShow',teamToShow[position])
    return teamToShow
}

export function map2Show(position) {
    switch(strToLower(position.trim())) {
        case 'loosehead_prop' :
            return 'loosehead prop'
            break
        case 'tighthead_prop' :
            return 'tighthead prop'
            break
        case 'lock_4' :
            return 'number-4 lock'
            break
        case 'lock_5' :
            return 'number-5 lock'
            break
        case 'blindside' :
            return 'blindside-flanker'
            break
        case 'openside' :
            return 'openside-flanker'
            break
        case 'number_8' :
            return 'number 8'
            break
        case 'scrum_half' :
            return 'scrum-half'
            break
        case 'fly_half' :
            return 'fly-half'
            break
        case 'left_wing' :
            return 'left-wing'
            break
        case 'inside' :
            return 'inside-centre'
            break
        case 'outside' :
            return 'outside-centre'
            break
        case 'right' :
            return 'right-wing'
            break
        default:
            return strToLower(position.trim())
    }
}

export function mapFShow(position) {
    switch(strToLower(position.trim())) {
        case 'loosehead prop' :
            return 'prop'
            break
        case 'hooker' :
            return 'hooker'
            break
        case 'tighthead prop' :
            return 'prop'
            break
        case 'number-4 lock' :
            return 'lock-flanker-back row-number 8'
            break
        case 'number-5 lock' :
            return 'lock-flanker-back row-number 8'
            break
        case 'blindside-flanker' :
            return 'lock-flanker-back row-number 8'
            break
        case 'openside-flanker' :
            return 'lock-flanker-back row-number 8'
            break
        case 'number-8' :
            return 'lock-flanker-back row-number 8'
            break
        case 'scrum-half' :
            return 'scrum half-utility back'
            break
        case 'fly-half' :
            return 'fly half-centre-utility back'
            break
        case 'left-wing' :
            return 'fly half-centre-winger-fullback-full back-utility back'
            break
        case 'inside-centre' :
            return 'fly half-centre-winger-fullback-full back-utility back'
            break
        case 'outside-centre' :
            return 'fly half-centre-winger-fullback-full back-utility back'
            break
        case 'right-wing' :
            return 'fly half-centre-winger-fullback-full back-utility back'
            break
        case 'fullback' :
            return 'fly half-centre-winger-fullback-full back-utility back'
            break
        default:
            return strToLower(position.trim())
    }
}