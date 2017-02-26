'use strict'

import { strToUpper } from '../../utility/helper'

export function  searchPlayer(player,id,uniondata) {
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