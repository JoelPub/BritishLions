'use strict'

import { Alert, AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'
import { getAssembledUrl ,actionsApi} from '../urlStorage'



import { getAccessToken, getUserId } from '../asyncStorageServices'

const EYC3_GET_GROUP_INFO = 'EYC3GetGroupInfo'
const EYC3_CREATE_A_GROUP = 'EYC3CreateAGroup'
const EYC3_JOIN_A_GROUP = 'EYC3JoinAGroup'
const EYC3_LEAVE_A_GROUP = 'EYC3LeaveAGroup'
export async function getGroupInfo (accessToken,group_id,userID) {
  // The name of the sync method must be the same of the data's key
  // And the passed params will be an all-in-one object.
  // You can use promise here.
  // Or plain callback function with resolve/reject, like:
  // sync方法的名字必须和所存数据的key完全相同
  // 方法接受的参数为一整个object，所有参数从object中解构取出
  // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
  storage.sync = {
    EYC3GetGroupInfo(){
          fetch((actionsApi.eyc3GroupInfo), {
            method: 'POST',
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
              'access_token':accessToken,
              'id':userID,
              'group_id':group_id
            })
          }).then(response => {
            return response.json()
          }).then(json => {
            if(json){
              //console.log('Fresh uncached eyc3 Data: ',JSON.stringify(json))
              storage.save({
                key: EYC3_GET_GROUP_INFO,
                expires: 1000 * 3600,
                id,
                rawData: json[0]
              })
              resolve && resolve(json[0])
            }
            else{
              reject && reject(new Error('data parse error'))
            }
          }).catch(err => {
            //console.log('Warning error: ',err)
            reject && reject(err)
          })
    }
  }
  return await storage.load({
    key: EYC3_GET_GROUP_INFO,
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
export async function createGroup (accessToken,group_name,userID) {
  // The name of the sync method must be the same of the data's key
  // And the passed params will be an all-in-one object.
  // You can use promise here.
  // Or plain callback function with resolve/reject, like:
  // sync方法的名字必须和所存数据的key完全相同
  // 方法接受的参数为一整个object，所有参数从object中解构取出
  // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
  storage.sync = {
    EYC3GetGroupInfo(){
      fetch(getAssembledUrl(EYC3_CREATE_A_GROUP), {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          'access_token':accessToken,
          'id':userID,
          'group_name':group_name
        })
      }).then(response => {
        return response.json()
      }).then(json => {
        if(json){
          //console.log('Fresh uncached eyc3 Data: ',JSON.stringify(json))
          storage.save({
            key: EYC3_CREATE_A_GROUP,
            expires: 1000 * 3600,
            id,
            rawData: json[0]
          })
          resolve && resolve(json[0])
        }
        else{
          reject && reject(new Error('data parse error'))
        }
      }).catch(err => {
        //console.log('Warning error: ',err)
        reject && reject(err)
      })
    }
  }
  return await storage.load({
    key: EYC3_CREATE_A_GROUP,
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
export async function joinGroup (accessToken,group_name,userID) {
  // The name of the sync method must be the same of the data's key
  // And the passed params will be an all-in-one object.
  // You can use promise here.
  // Or plain callback function with resolve/reject, like:
  // sync方法的名字必须和所存数据的key完全相同
  // 方法接受的参数为一整个object，所有参数从object中解构取出
  // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
  storage.sync = {
    EYC3GetGroupInfo(){
      fetch(getAssembledUrl(EYC3_JOIN_A_GROUP), {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          'access_token':accessToken,
          'id':userID,
          'invitation_code':group_name
        })
      }).then(response => {
        return response.json()
      }).then(json => {
        if(json){
          //console.log('Fresh uncached eyc3 Data: ',JSON.stringify(json))
          storage.save({
            key: EYC3_JOIN_A_GROUP,
            expires: 1000 * 3600,
            id,
            rawData: json[0]
          })
          resolve && resolve(json[0])
        }
        else{
          reject && reject(new Error('data parse error'))
        }
      }).catch(err => {
        //console.log('Warning error: ',err)
        reject && reject(err)
      })
    }
  }
  return await storage.load({
    key: EYC3_JOIN_A_GROUP,
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
export async function leaveGroup (accessToken,group_id,userID) {
  // The name of the sync method must be the same of the data's key
  // And the passed params will be an all-in-one object.
  // You can use promise here.
  // Or plain callback function with resolve/reject, like:
  // sync方法的名字必须和所存数据的key完全相同
  // 方法接受的参数为一整个object，所有参数从object中解构取出
  // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
  storage.sync = {
    EYC3GetGroupInfo(){
      fetch(getAssembledUrl(EYC3_LEAVE_A_GROUP), {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          'access_token':accessToken,
          'id':userID,
          'group_id':group_name
        })
      }).then(response => {
        return response.json()
      }).then(json => {
        if(json){
          //console.log('Fresh uncached eyc3 Data: ',JSON.stringify(json))
          storage.save({
            key: EYC3_LEAVE_A_GROUP,
            expires: 1000 * 3600,
            id,
            rawData: json[0]
          })
          resolve && resolve(json[0])
        }
        else{
          reject && reject(new Error('data parse error'))
        }
      }).catch(err => {
        //console.log('Warning error: ',err)
        reject && reject(err)
      })
    }
  }
  return await storage.load({
    key: EYC3_LEAVE_A_GROUP,
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