'use strict'

const EYC3_BASE_URL = 'http://bilwebapp.azurewebsites.net'
const GODDFORM_BASE_URL = 'https://www.api-ukchanges2.co.uk/api'
const SOTIC_BASE_URL = 'https://f3k8a7j4.ssl.hwcdn.net'

const SOTIC_GET_PLAYER_URL = '/tools/feeds?id=403'
const SOTIC_GET_PLAYER_URL_NAME = 'SoticFullPlayers'

const EYC3_AUTO_POPULATED_SQUAD_URL = '/getAutoPopulatedSquad'
const EYC3_AUTO_POPULATED_SQUAD_URL_NAME = 'EYC3AutoPopulatedSquad'
const EYC3_GET_MY_SQUAD_RATING_URL = '/getMySquadRating'
const EYC3_GET_MY_SQUAD_RATING_URL_NAME = 'EYC3GetMySquadRating'
const EYC3_GET_PLAYER_PROFILE_URL = '/getPlayersProfile'
const EYC3_GET_PLAYER_PROFILE_URL_NAME = 'EYC3GetPlayersProfile'
const EYC3_GET_PLAYER_URL = '/getPlayersList'
const EYC3_GET_PLAYER_URL_NAME = 'EYC3FullPlayers'
const EYC3_GET_EXPERTS_URL = '/tools/feeds?id=403'
const EYC3_GET_EXPERTS_URL_NAME = 'EYC3ExpertsSquads'

const GOODFORM_GET_FAVORITE_PLAYER_URL = '/protected/mylionsfavourit?_=1480039224954'
const GOODFORM_GET_FAVORITE_PLAYER_URL_NAME = 'GoodFormFavoritePlayers'
const GOODFORM_ADD_FAVORITE_PLAYER_URL = '/protected/player/add'
const GOODFORM_ADD_FAVORITE_PLAYER_URL_NAME = 'AddGoodFormFavoritePlayers'
const GOODFORM_REMOVE_FAVORITE_PLAYER_URL = '/protected/player/remove'
const GOODFORM_REMOVE_FAVORITE_PLAYER_URL_NAME = 'RemoveGoodFormFavoritePlayers'
const GOODFORM_GET_USER_CUSROMIZED_SQUAD_URL = '/protected/squad/get?_=1483928168053'
const GOODFORM_GET_USER_CUSROMIZED_SQUAD_URL_NAME = 'GoodFormUserCustomizedSquad'
const GOODFORM_SAVE_USER_CUSROMIZED_SQUAD_URL = '/protected/squad/save'
const GOODFORM_SAVE_USER_CUSROMIZED_SQUAD_URL_NAME = 'SaveGoodFormUserCustomizedSquad'
const GOODFORM_REFRESH_TOKEN_URL = '/sessions/create'
const GOODFORM_USERS_URL = '/users'

export function getAssembledUrl(urlName) {
    switch (urlName) {
        case SOTIC_GET_PLAYER_URL_NAME:
            return SOTIC_BASE_URL + SOTIC_GET_PLAYER_URL
        case EYC3_AUTO_POPULATED_SQUAD_URL_NAME:
            return EYC3_BASE_URL + EYC3_AUTO_POPULATED_SQUAD_URL
        case EYC3_GET_MY_SQUAD_RATING_URL_NAME:
            return EYC3_BASE_URL + EYC3_GET_MY_SQUAD_RATING_URL
        case EYC3_GET_PLAYER_PROFILE_URL_NAME:
            return EYC3_BASE_URL + EYC3_GET_PLAYER_PROFILE_URL
        case EYC3_GET_PLAYER_URL_NAME:
            return EYC3_BASE_URL + EYC3_GET_PLAYER_URL
        case EYC3_GET_EXPERTS_URL_NAME:
            return EYC3_BASE_URL + EYC3_GET_EXPERTS_URL
        case GOODFORM_GET_FAVORITE_PLAYER_URL_NAME:
            return GODDFORM_BASE_URL + GOODFORM_GET_FAVORITE_PLAYER_URL
        case GOODFORM_ADD_FAVORITE_PLAYER_URL_NAME:
            return GODDFORM_BASE_URL + GOODFORM_ADD_FAVORITE_PLAYER_URL
        case GOODFORM_REMOVE_FAVORITE_PLAYER_URL_NAME:
            return GODDFORM_BASE_URL + GOODFORM_REMOVE_FAVORITE_PLAYER_URL
        case GOODFORM_GET_USER_CUSROMIZED_SQUAD_URL_NAME:
            return GODDFORM_BASE_URL + GOODFORM_GET_USER_CUSROMIZED_SQUAD_URL
        case GOODFORM_SAVE_USER_CUSROMIZED_SQUAD_URL_NAME:
            return GODDFORM_BASE_URL + GOODFORM_SAVE_USER_CUSROMIZED_SQUAD_URL
        case GOODFORM_REFRESH_TOKEN_URL:
            return GODDFORM_BASE_URL + GOODFORM_REFRESH_TOKEN_URL
        case GOODFORM_USERS_URL:
            return GODDFORM_BASE_URL + GOODFORM_USERS_URL
    }
}
export const actionsApi = {
    soticGetPlayer: getAssembledUrl(SOTIC_GET_PLAYER_URL_NAME),
    eyc3AutoPopulatedSquad: getAssembledUrl(EYC3_AUTO_POPULATED_SQUAD_URL_NAME),
    eyc3GetMySquadRating: getAssembledUrl(EYC3_GET_MY_SQUAD_RATING_URL_NAME),
    eyc3GetPlayersProfile: getAssembledUrl(EYC3_GET_PLAYER_PROFILE_URL_NAME),
    eyc3GetPlayer: getAssembledUrl(EYC3_GET_PLAYER_URL_NAME),
    eyc3GetExperts: getAssembledUrl(EYC3_GET_EXPERTS_URL_NAME),
    goodformGetFavoritePlayer: getAssembledUrl(GOODFORM_GET_FAVORITE_PLAYER_URL_NAME),
    goodformAddFavoritePlayer: getAssembledUrl(GOODFORM_ADD_FAVORITE_PLAYER_URL_NAME),
    goodformRemoveFavoritePlayer: getAssembledUrl(GOODFORM_REMOVE_FAVORITE_PLAYER_URL_NAME),
    goodFormGetUserCusromizedSquad: getAssembledUrl(GOODFORM_GET_USER_CUSROMIZED_SQUAD_URL_NAME),
    goodFormSaveUserCusromizedSquad: getAssembledUrl(GOODFORM_SAVE_USER_CUSROMIZED_SQUAD_URL_NAME),
    goodFormRefreshToken: getAssembledUrl(GOODFORM_REFRESH_TOKEN_URL),
    goodFormUsers: getAssembledUrl(GOODFORM_USERS_URL)
}