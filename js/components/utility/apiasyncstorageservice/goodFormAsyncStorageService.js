'use strict'

import { Alert, AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'
import { getAssembledUrl } from '../urlStorage'
import {callApi} from '../services'
import { getAccessToken } from '../asyncStorageServices'
import axios from 'axios'

const GOODFORM_FAVORITE_PLAYERS = 'GoodFormFavoritePlayers' // Note: Do not use underscore("_") in key!// 注意:请不要在key中使用_下划线符号!

export function removeGoodFormFavoritePlayerList(){
    storage.remove({
        key: GOODFORM_FAVORITE_PLAYERS,
        id: '2001'
    });
}

export async function getGoodFormFavoritePlayerList() {
    // The name of the sync method must be the same of the data's key
    // And the passed params will be an all-in-one object.
    // You can use promise here.
    // Or plain callback function with resolve/reject, like:
    // sync方法的名字必须和所存数据的key完全相同
    // 方法接受的参数为一整个object，所有参数从object中解构取出
    // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
    storage.sync = {
        GoodFormFavoritePlayers(params){
          let {id, resolve, reject } = params
          let opt = {
          		url: getAssembledUrl(GOODFORM_FAVORITE_PLAYERS),
          		data: {},
          		method: 'get',
          		onSuccess: (res) => {
          		     if(res){
                         console.warn('Fresh uncached Goodform Data: ',JSON.stringify(res))
                         storage.save({
                           key: GOODFORM_FAVORITE_PLAYERS,
                           id,
                           expires: 1000 * 3600,
                           rawData: res
                         });
                         resolve && resolve(res)
                     }else{
                         reject && reject(new Error('data parse error'))
                     }
          		},
          		onError: (error) =>{
          		    console.warn('Warning error: ',error)
          		    let errData = {
                        error:error,
                        auth:null
                    }
                    reject && reject(errData)
          		},
          		onAuthorization: (msg) => {
          		    console.warn('msg', msg)
          		    let errData = {
                        error:null,
                        auth:msg
                    }
          		    reject && reject(errData)
                },
          		onAxiosStart: null,
          		onAxiosEnd: null,
          		isRequiredToken: true,
          		isRefreshToken: false
          	}
          	if (opt.isRequiredToken) {
                getAccessToken().then((accessToken) => {
                    if (accessToken) {
                        axios.defaults.headers.common['Authorization'] = `bearer ${accessToken}`
                        callApi(opt)
                    } else {
                        // Sign In is Required
                        if (opt.onAuthorization) {
                            opt.onAuthorization('Sign In is Required')
                        }
                    }
                }).catch((error) => {
                    // Sign In is Required
                    if (opt.onAuthorization) {
                        opt.onAuthorization('Sign In is Required')
                    }
                })
            } else {
                callApi(opt)
            }
        }
      }

    return  await storage.load({
          key: GOODFORM_FAVORITE_PLAYERS,
          id: '2001',
          autoSync: true,
          syncInBackground: true
        }).then(ret => {
          console.warn('Cached Goodform Data: ',JSON.stringify(ret))
          return ret
        }).catch(errData => {
          console.warn('error:', errData)
          return errData
        })
}



