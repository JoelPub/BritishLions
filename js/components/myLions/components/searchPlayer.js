'use strict'

import { strToUpper } from '../../utility/helper'

export function  searchPlayer(player,id,uniondata) {
    // if (__DEV__)console.log('searchPlayer')
        let result=null
        for(let union in player) {
            result=player[union].find((item)=>item.id===id.toString())
            if(result !== undefined) {
                let unionInfo = uniondata.find((n)=> strToUpper(n.displayname)===strToUpper(result.honours.split('(')[0]).trim())
                Object.assign(result, {
                    logo: unionInfo!==undefined?unionInfo.image:"https:\/\/cdn.soticservers.net\/tools\/images\/teams\/logos\/250x250\/117.png", 
                    country: unionInfo!==undefined?unionInfo.displayname.toUpperCase():''
                })
                if(strToUpper(result.position)==='FLANKER'||strToUpper(result.position)==='NO. 8') result.position='Back Row'
                if(strToUpper(result.position)==='UTILITY BACK') result.position='Full Back'
                return result
            }
        }
        return result===undefined?null:result
    }