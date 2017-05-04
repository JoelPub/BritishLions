'use strict'
import _fetch from '../../utility/fetch'
import { service } from '../../utility/services'

export function getGameMomentum() {

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
export function getTimeLineLiveSummary () {

}

export const  actions = {
  getGameSetPlays,
  getGameOnFire,
}
