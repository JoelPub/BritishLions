'use strict'

import { Alert, AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'
import { getAssembledUrl } from '../urlStorage'

const SOTIC_FULL_PLAYERS = 'SoticFullPlayers' // Note: Do not use underscore("_") in key!// 注意:请不要在key中使用_下划线符号!

export function removeSotiveFullPlayerList(){
    storage.remove({
        key: SOTIC_FULL_PLAYERS,
        id:'3001'
    })
}

export async function getSoticFullPlayerList() {
    // The name of the sync method must be the same of the data's key
    // And the passed params will be an all-in-one object.
    // You can use promise here.
    // Or plain callback function with resolve/reject, like:
    // sync方法的名字必须和所存数据的key完全相同
    // 方法接受的参数为一整个object，所有参数从object中解构取出
    // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
    storage.sync = {
        SoticFullPlayers(params){
          let { id, resolve, reject } = params
          fetch(getAssembledUrl(SOTIC_FULL_PLAYERS), {
            method: 'GET'
          }).then(response => {
            return response.json()
          }).then(json => {
            if(json){
              console.warn('Fresh Uncached Sotic Data: ',JSON.stringify(json))
              storage.save({
                key: SOTIC_FULL_PLAYERS,
                id,
                expires: 1000 * 3600,
                rawData: json
              });
              resolve && resolve(json)
            }
            else{
              reject && reject(new Error('data parse error'))
            }
          }).catch(err => {
            console.warn('Warning error: ',err)
            reject && reject(err)
          })
        }
      }

    return  await storage.load({
          key: SOTIC_FULL_PLAYERS,
          autoSync: true,
          id:'3001',
          syncInBackground: true
        }).then(ret => {
          console.warn('Cached Sotic Data: ',JSON.stringify(ret))
          return ret
        }).catch(err => {
          console.warn(err.message);
          switch (err.name) {
              case 'NotFoundError':
                 return 0
              case 'ExpiredError':
                 return -1
          }
        })
}



