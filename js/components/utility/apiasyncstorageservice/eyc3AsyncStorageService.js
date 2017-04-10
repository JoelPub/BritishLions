'use strict'

import { Alert, AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'
import { getAssembledUrl , actionsApi} from '../urlStorage'

import { getAccessToken, getUserId } from '../asyncStorageServices'
const EYC3_FULL_PLAYERS = 'EYC3FullPlayers' // Note: Do not use underscore("_") in key!// 注意:请不要在key中使用_下划线符号!
const EYC3_EXPERTS_SQUADS = 'EYC3ExpertsSquads'

export function removeEYC3FullPlayerList(){
    //console.log('list cleanup')
    storage.remove({
        key: EYC3_FULL_PLAYERS,
        id: '1001'
    })
}
export function removeEYC3ExpertsSquads(){
    storage.remove({
        key: EYC3_EXPERTS_SQUADS,
        id: '1101'
    })
}
export function removeEYC3OfficialSquad(){
    storage.remove({
      key: 'EYC3OfficialSquad',
      id: '1201'
    })
}
export async function getEYC3OfficialSquad() {
  // console.log('getEYC3OfficialSquad')
  storage.sync = {
    EYC3OfficialSquad(params) {
      let {id,resolve,reject}=params
      fetch(actionsApi.eyc3GetOfficalSquad,{
        method:'POST',
        headers: {"content-Type":"application/json;charset=utf-8"},
        body: JSON.stringify({})
      })
      .then(response=>{
        // console.log('response',response)
        return response.json()
      })
      .then(json=>{
        console.log('json',json)
        if(json) {
          storage.save({
            key:'EYC3OfficialSquad',
            expires:1000*3600,
            id,
            rawData:json
          })
          resolve&&resolve(json)
        }
        else {
          reject&&reject(new Error('data parse error'))
        }
      })
      .catch(err=>reject&&reject(err))
    }
  }

  return await storage.load({
    key: 'EYC3OfficialSquad',
    autoSync:true,
    id:'1201',
    syncInBackground:true
  })
  .then(ret=>{
    // console.log('ret',ret)
    return ret
  })
  .catch(err=>{
    switch(err.name){
      case 'NotFoundError':
        return 0
        case 'ExpiredError':
        return -1
    }
  })
}

export async function getEYC3FullPlayerList() {
    // The name of the sync method must be the same of the data's key
    // And the passed params will be an all-in-one object.
    // You can use promise here.
    // Or plain callback function with resolve/reject, like:
    // sync方法的名字必须和所存数据的key完全相同
    // 方法接受的参数为一整个object，所有参数从object中解构取出
    // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
    storage.sync = {
        EYC3FullPlayers(params){
          //console.log('start........................')
          getAccessToken().then((accessToken) => {
              getUserId().then((userID) =>{
                  //console.log('accessToken: ',accessToken)
                  //console.log('userID: ',userID)
                  let {id, resolve, reject } = params
                  fetch(getAssembledUrl(EYC3_FULL_PLAYERS), {
                    method: 'POST',
                    headers: {
                              "Content-Type": "application/json; charset=utf-8"
                            },
                    body: JSON.stringify({
                      'access_token':accessToken,
                      'id':userID
                    })
                  }).then(response => {
                    return response.json()
                  }).then(json => {
                    if(json){
                      //console.log('Fresh uncached eyc3 Data: ',JSON.stringify(json))
                      storage.save({
                        key: EYC3_FULL_PLAYERS,
                        expires: 1000 * 3600,
                        id,
                        rawData: json[0]
                      });
                      resolve && resolve(json[0])
                    }
                    else{
                      reject && reject(new Error('data parse error'))
                    }
                  }).catch(err => {
                    //console.log('Warning error: ',err)
                    reject && reject(err)
                  })
              })
          })
        }
    }
    return await storage.load({
          key: EYC3_FULL_PLAYERS,
          autoSync: true,
          id:'1001',
          syncInBackground: true
        }).then(ret => {
          //console.log('Cached eyc3 Data: ',JSON.stringify(ret))
          return ret
        }).catch(err => {
          //console.log(err.message);
          switch (err.name) {
              case 'NotFoundError':
                 return 0
              case 'ExpiredError':
                 return -1
          }
    })
}


export async function getEYC3ExpertsSquads() {
    storage.sync = {
        EYC3ExpertsSquads(params){
            getAccessToken().then((accessToken) => {
                getUserId().then((userID) =>{
                    //console.log('accessToken: ', accessToken)
                    //console.log('userID: ', userID)
                    let {id, resolve, reject } = params
                    fetch(getAssembledUrl(EYC3_EXPERTS_SQUADS), {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        body: JSON.stringify({
                            'access_token':accessToken,
                            'id':userID
                        })
                    }).then(response => {
                        return response.json()
                    }).then(json => {
                        if (json) {
                            //console.log('Fresh uncached eyc3 experts squads Data: ', json)
                            storage.save({
                                key: EYC3_EXPERTS_SQUADS,
                                expires: 1000 * 3600,
                                id,
                                rawData: json
                            });
                            resolve && resolve(json)
                        } else {
                            reject && reject(new Error('data parse error'))
                        }
                    }).catch(err => {
                        //console.log('Warning error: ',err)
                        reject && reject(err)
                    }) 
                })
            })
        }
    }

    return  await storage.load({
          key: EYC3_EXPERTS_SQUADS,
          autoSync: true,
          id:'1101',
          syncInBackground: true
        }).then(ret => {
          //console.log('Cached eyc3 experts squads Data: ', ret)
          return ret
        }).catch(err => {
          //console.warn(err.message)
          switch (err.name) {
              case 'NotFoundError':
                 return 0
              case 'ExpiredError':
                 return -1
          }
        })
}



