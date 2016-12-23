'use strict'

const EYC3_BASE_URL = 'http://EYC3'
const GODDFORM_BASE_URL = 'http://GOODFORM'
const SOTIC_BASE_URL = 'https://f3k8a7j4.ssl.hwcdn.net'

const SOTIC_GET_PLAYER_URL = '/tools/feeds?id=403'
const SOTIC_GET_PLAYER_URL_NAME = 'SoticFullPlayers'



export function getAssembledUrl(urlName) {
    switch(urlName){
        case SOTIC_GET_PLAYER_URL_NAME:
            return SOTIC_BASE_URL + SOTIC_GET_PLAYER_URL
    }
}