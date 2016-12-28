'use strict'

const EYC3_BASE_URL = 'https://f3k8a7j4.ssl.hwcdn.net'
const GODDFORM_BASE_URL = 'https://www.api-ukchanges2.co.uk/api'
const SOTIC_BASE_URL = 'https://f3k8a7j4.ssl.hwcdn.net'

const SOTIC_GET_PLAYER_URL = '/tools/feeds?id=403'
const SOTIC_GET_PLAYER_URL_NAME = 'SoticFullPlayers'

const EYC3_GET_PLAYER_URL = '/tools/feeds?id=403'
const EYC3_GET_PLAYER_URL_NAME = 'EYC3FullPlayers'

const GOODFORM_GET_FAVORITE_PLAYER_URL = '/protected/mylionsfavourit?_=1480039224954'
const GOODFORM_GET_FAVORITE_PLAYER_URL_NAME = 'GoodFormFavoritePlayers'

export function getAssembledUrl(urlName) {
    switch(urlName){
        case SOTIC_GET_PLAYER_URL_NAME:
            return SOTIC_BASE_URL + SOTIC_GET_PLAYER_URL
        case EYC3_GET_PLAYER_URL_NAME:
            return EYC3_BASE_URL + EYC3_GET_PLAYER_URL
        case GOODFORM_GET_FAVORITE_PLAYER_URL_NAME:
            return GODDFORM_BASE_URL + GOODFORM_GET_FAVORITE_PLAYER_URL
    }
}