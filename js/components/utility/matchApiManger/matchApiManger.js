'use strict'
import _fetch from '../../utility/fetch'
import { service } from '../../utility/services'
import Toast from 'react-native-root-toast'

export function getGameMomentum(type,gameID,handleSuccess,handleError) {
    let optionsInfo = {
      url: 'http://bilprod.azurewebsites.net/getGameMomentum',
      data: {id:gameID},
      onAxiosStart: null,
      onAxiosEnd: null,
      method: 'post',
      onSuccess: (json)=>{
              if (__DEV__)console.log('json',json)
              if (__DEV__)console.log('typeof json.data',typeof json.data)
              if(json.data&& (typeof json.data!=='string')) {
                if (__DEV__)console.log('json.data.is_full_time',json.data.is_full_time)
                if (__DEV__)console.log('json.data.game_time',json.data.game_time)
                if (__DEV__)console.log('json.data.statics',json.data.statics)
                if (__DEV__)console.log('json.data.momentum',json.data.momentum)
                if(type==='momentum')json.data.momentum=processMomentumData(json.data.momentum)
                // if(__DEV__)console.log('json.data',json.data)
                handleSuccess(json.data)
              }
              else {
                handleError(json)
              }
          },
      onError: handleError,
      isRequiredToken: false,
      channel: 'EYC3',
      isQsStringify:false
    }
    service(optionsInfo)
}
export function  getGameSetPlays(gameId , onSuccess,OnError) {
  let optionsInfo = {
    url: 'http://bilprod.azurewebsites.net/getGameSetPlays',
    data: {id:gameId},
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
    url: 'http://bilprod.azurewebsites.net/getGameOnFire',
    data: {id:gameId},
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
export function getTimeLineLiveSummary (options, type, summaryData, handleSuccess, handleError) {
  let optionsInfo = {
    url: 'http://bilprod.azurewebsites.net/getTimelineLiveSummary',
    data: options,
    onAxiosStart: null,
    onAxiosEnd: null,
    method: 'post',
    onSuccess: (json)=>{
              if (__DEV__)console.log('json',json)
              if (__DEV__)console.log('typeof json.data',typeof json.data)
                  if(json.data&& (typeof json.data!=='string')) {
                    // if (__DEV__)console.log('json.data',json.data)
                    json.data=processSummaryData(type,json.data,summaryData)
                    // if(__DEV__)console.log('json.data',json.data)
                    handleSuccess(json.data)
                  }
                  else {
                    handleError(json)
                  }
              },
    onError: handleError,
    isRequiredToken: false,
    channel: 'EYC3',
    isQsStringify:false
  }
  service(optionsInfo) 

}
function processSummaryData(type,data,summaryData){
  if (__DEV__)console.log('processSummaryData',type)
  if (__DEV__)console.log('data',data)
  if (__DEV__)console.log('summaryData.live',summaryData.live)
  if (__DEV__)console.log('summaryData.timeline',summaryData.timeline)
  let result=summaryData.timeline
  if (type==='init'&&data.length>0&&(result.length===0||(result.length>0&&data[0].sequenceId>result[0].seq))) {
    if(result.length===0) {
      data.map((value,index)=>{
        result.push({seq:value.sequenceId,time:value.gameTime,description:value.eventString})
      })
    }
    else {
        let i=0
        data.map((value,index)=>{
          // if (__DEV__)console.log('i',i)
          // if (__DEV__)console.log('value.sequenceId',value.sequenceId)
          // if (__DEV__)console.log('result[i].seq',result[i].seq)
          if(value.sequenceId>result[i].seq) {
            result.splice(i,0,{seq:value.sequenceId,time:value.gameTime,description:value.eventString})
            i++
          }
        })
    }
    if(summaryData.live!==undefined&&summaryData.live!==null) {
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
    

  }
  else if(type==='extend'){
    if(data.length>0) {      
      data.map((value,index)=>{
        result.push({seq:value.sequenceId,time:value.gameTime,description:value.eventString})
      })
    }
    else {
          let toast = Toast.show('NO MORE MESSAGES', {
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
  }
  // if (__DEV__)console.log('result',result)
  return result
}
function processMomentumData(data){
    if(__DEV__)console.log('@@@@processMomentumData',data)
    let result=[]
    let fullTime=160
    if(data&&data.team_momentum&&data.score_advantage) {
        for(let i=0;i<fullTime;i=i+10){
            let momentum={score_advantage:[],team_momentum:[],isFirst:false,finished:false,integrity:false,timeMark:0}
            // if(__DEV__)console.log('momentum',momentum)
            if(data.team_momentum.findIndex(x=>{
                return parseInt(x.time)>i&&parseInt(x.time)<=i+10
            })>-1) {
                momentum.team_momentum=data.team_momentum.filter(x=>{
                    return parseInt(x.time)>i&&parseInt(x.time)<=i+10&&(parseInt(x.time)%2===0)
                }).sort((a,b)=>parseInt(b.time)-parseInt(a.time))
                momentum.score_advantage=data.score_advantage.filter(x=>{
                    return parseInt(x.time)>=i&&parseInt(x.time)<=i+10&&(parseInt(x.time)%2===0)
                }).sort((a,b)=>parseInt(b.time)-parseInt(a.time))
                if (i===0) momentum.isFirst=true
                if((data.team_momentum.findIndex(x=>{return parseInt(x.time)>i+10})>-1&&momentum.team_momentum.length>0) ||(momentum.team_momentum.length>0&&parseInt(momentum.team_momentum[0].time)===i+10) ){
                  momentum.finished=true
                  if(momentum.score_advantage.findIndex(x=>{return parseInt(x.time)===i})>-1&&momentum.score_advantage.findIndex(x=>{return parseInt(x.time)===i+10})>-1) momentum.integrity=true
                }

                momentum.timeMark=i
                result.push(momentum)

            }
            else {
                result.push(null)
            }
        }      
    }


    if(__DEV__)console.log('@@@@result',result)
    return result.reverse()

}

export const  actions = {
  getGameSetPlays,
  getGameOnFire,
  getTimeLineLiveSummary,
  getGameMomentum
}
