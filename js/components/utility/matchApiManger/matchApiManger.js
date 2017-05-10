'use strict'
import _fetch from '../../utility/fetch'
import { service } from '../../utility/services'
import Toast from 'react-native-root-toast'

export function getGameMomentum(type,onSuccess,OnError) {
    let optionsInfo = {
      url: 'http://bilprod-r4dummyapi.azurewebsites.net/getGameMomentum',
      data: {id:1},
      onAxiosStart: null,
      onAxiosEnd: null,
      method: 'post',
      onSuccess: (json)=>{
            if(json.data) {
                      if (__DEV__)console.log('json.data',json.data)
                      if(type==='momentum')json.data.momentum=processMomentumData(json.data.momentum)
                      if(__DEV__)console.log('json.data',json.data)
                      onSuccess(json.data)
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
export function getTimeLineLiveSummary (serviceData, type, summaryData, onSuccess, onError) {
  let optionsInfo = {
    url: 'http://bilprod-r4dummyapi.azurewebsites.net/getTimelineLiveSummary',
    data: serviceData,
    onAxiosStart: null,
    onAxiosEnd: null,
    method: 'post',
    onSuccess: (json)=>{
                if(json.data) {
                          if (__DEV__)console.log('json.data',json.data)
                          json.data=processSummaryData(type,json.data,summaryData)
                          if(__DEV__)console.log('json.data',json.data)
                          onSuccess(json.data)
                  }
              },
    onError: onError,
    isRequiredToken: false,
    channel: 'EYC3',
    isQsStringify:false
  }
  service(optionsInfo) 

}
function processSummaryData(type,data,summaryData){
  let result=[]
  data.map((value,index)=>{
    result.push({seq:index+1,time:value.gameTime,description:value.eventString})
  })
  if (type==='refresh'&&summaryData.timeline.length>0) {
    summaryData.timeline.map((value,index)=>{
      result.push({seq:data.length+index+1,time:value.time,description:value.description})
    })
    let toast = Toast.show('THERE ARE NEW MESSAGES', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    onShow: () => {
                        // calls on toast\`s appear animation start
                    },
                    onShown: () => {
                        // calls on toast\`s appear animation end.
                    },
                    onHide: () => {
                        // calls on toast\`s hide animation start.
                    },
                    onHidden: () => {
                        
                    }
                })
  }
  return result
}
function processMomentumData(data){
    if(__DEV__)console.log('processMomentumData',data)
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
            momentum.timeMark=i
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
