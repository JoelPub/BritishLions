'use strict'
import _fetch from '../../utility/fetch'
import { service } from '../../utility/services'

export function getGameMomentum(onSuccess,OnError) {
    let optionsInfo = {
      url: 'http://bilprod-r4dummyapi.azurewebsites.net/getGameMomentum',
      data: {id:1},
      onAxiosStart: null,
      onAxiosEnd: null,
      method: 'post',
      onSuccess: (json)=>{
            if(json.data) {
                  if (__DEV__)console.log('json.data',json.data)
                      let tmp=processMomentumData(json.data.momentum)
                      if(__DEV__)console.log('tmp',tmp)
                      onSuccess(tmp)
              }
          },
      onError: OnError,
      isRequiredToken: false,
      channel: 'EYC3',
      isQsStringify:false
    }
    service(optionsInfo)
}
export function  getGameSetPlays(gameId , onSuccess,OnError) {
  let optionsInfo = {
    url: 'https://bilprod-r4dummyapi.azurewebsites.net/getGameSetPlays',
    data: {id:2},
    onAxiosStart: null,
    onAxiosEnd: null,
    method: 'post',
    onSuccess: onSuccess,
    onError: OnError,
    isRequiredToken: false,
    channel: 'EYC3',
    isQsStringify:false
  }
    service(optionsInfo)
}
export function GetManOfMatchInfo  () {

}
export function getGameOnFire  (gameId , onSuccess,OnError) {
  let optionsInfo = {
    url: 'https://bilprod-r4dummyapi.azurewebsites.net/getGameOnFire',
    data: {id:1},
    onAxiosStart: null,
    onAxiosEnd: null,
    method: 'post',
    onSuccess: onSuccess,
    onError: OnError,
    isRequiredToken: false,
    channel: 'EYC3',
    isQsStringify:false
  }
   service(optionsInfo)
}
export function getTimeLineLiveSummary (serviceData, onSuccess, onError) {
  let optionsInfo = {
    url: 'http://bilprod-r4dummyapi.azurewebsites.net/getTimelineLiveSummary',
    data: serviceData,
    onAxiosStart: null,
    onAxiosEnd: null,
    method: 'post',
    onSuccess: onSuccess,
    onError: onError,
    isRequiredToken: false,
    channel: 'EYC3',
    isQsStringify:false
  }
  service(optionsInfo) 

}

function processMomentumData(data){
    // if(__DEV__)console.log('processMomentumData')
    let result=[]
    let fullTime=80
    for(let i=0;i<fullTime;i=i+10){
        let momentum={score_advantage:[],team_momentum:[],isFirst:false,isLast:false,timeMark:0}
        // if(__DEV__)console.log('momentum',momentum)
        if(data.team_momentum.findIndex(x=>{
            return parseInt(x.time)>i&&parseInt(x.time)<=i+10
        })>-1) {
            momentum.team_momentum=data.team_momentum.filter(x=>{
                return parseInt(x.time)>i&&parseInt(x.time)<=i+10
            })
            momentum.score_advantage=data.score_advantage.filter(x=>{
                return parseInt(x.time)===i||parseInt(x.time)===i+10
            })
            if (i===0) momentum.isFirst=true
            if(data.team_momentum.findIndex(x=>{return parseInt(x.time)>i+10&&parseInt(x.time)<=i+20})===-1) momentum.isLast=true
            momentum.timeMark=i+10
            result.push(momentum)

        }
        else {
            result.push(null)
        }
    }

    // if(__DEV__)console.log('result',result)
    return result.reverse()

}

export const  actions = {
  getGameSetPlays,
  getGameOnFire,
  getTimeLineLiveSummary,
  getGameMomentum
}
