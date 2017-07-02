'use strict'


const APP_VERSION_NO = '4' // release: 3
const LOCAL_APP_VERSION_NO = '5'

const EYC3_BASE_URL = 'http://bilwebapp.azurewebsites.net'
const EYC3_BASE_URL_DUMMY= 'http://bilprod.azurewebsites.net'
// const EYC3_BASE_URL_DUMMY= 'https://bitbucket.org/!api/2.0/snippets/JoelPub'
// const EYC3_BASE_URL_R4_DUMMY= 'http://bilprod.azurewebsites.net'
const EYC3_BASE_URL_R4_DUMMY= 'https://bitbucket.org/!api/2.0/snippets/JoelPub'

const GODDFORM_BASE_URL = 'https://www.api-ukchanges2.co.uk/api'
// const GODDFORM_BASE_URL = 'https://bitbucket.org/!api/2.0/snippets/JoelPub'
// const SOTIC_BASE_URL = 'https://f3k8a7j4.ssl.hwcdn.net'
const SOTIC_BASE_URL = 'https://bitbucket.org/!api/2.0/snippets/JoelPub'

// const SOTIC_GET_PLAYER_URL = '/tools/feeds?id=410'
const SOTIC_GET_PLAYER_URL = '/djb48/ee509e67fa11f90f86d8920dd40e78169f47ae9a/files/snippet.json'
const SOTIC_GET_PLAYER_URL_NAME = 'SoticFullPlayers'
// const SOTIC_GET_PLAYER_URL_R2 = '/tools/feeds?id=408'
const SOTIC_GET_PLAYER_URL_R2 = '/e9bBk/760cc37aedad4a1252f59794feb510281c16192c/files/snippet.json'
const SOTIC_GET_PLAYER_URL_R2_NAME = 'SoticFullPlayersR2'
// const SOTIC_GET_SUPPLIED_IMAGE_URL = '/feeds/app/graphics_json.php'
const SOTIC_GET_SUPPLIED_IMAGE_URL = '/6x8nL/11aeae2c743c61f5706ccae2a90479d967d89ac8/files/snippet.txt'
const SOTIC_GET_SUPPLIED_IMAGE_URL_NAME = 'SoticSuppliedImage'

const EYC3_AUTO_POPULATED_SQUAD_URL = '/getAutoPopulatedSquad'
// const EYC3_AUTO_POPULATED_SQUAD_URL = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/oa6M5/130fc8ad35a442fd9bbd754b0ece889c35412dec/files/snippet.json'
const EYC3_AUTO_POPULATED_SQUAD_URL_NAME = 'EYC3AutoPopulatedSquad'
const EYC3_GET_MY_SQUAD_RATING_URL = '/getMySquadRating'
// const EYC3_GET_MY_SQUAD_RATING_URL = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/7aKRe/fdd917ada669bc1efa73dd420817826757026b3e/files/snippet.json'
const EYC3_GET_MY_SQUAD_RATING_URL_NAME = 'EYC3GetMySquadRating'
const EYC3_GET_PLAYER_PROFILE_URL = '/getPlayersProfile'
const EYC3_GET_PLAYER_PROFILE_URL_NAME = 'EYC3GetPlayersProfile'
const EYC3_GET_PLAYER_URL = '/getPlayersList'
// const EYC3_GET_PLAYER_URL = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/ba6XK/29e777d8a1275dc8d54a4a66e31953dcd3849767/files/snippet.json'
const EYC3_GET_PLAYER_URL_NAME = 'EYC3FullPlayers'
const EYC3_GET_EXPERTS_URL = '/getExpertList'
// const EYC3_GET_EXPERTS_URL = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/rajKz/04da65a5c213693fed2a4732ff6227eabc5c8b3a/files/snippet.json'
const EYC3_GET_EXPERTS_URL_NAME = 'EYC3ExpertsSquads'
const EYC3_GET_COMPETTITION_LADDER = 'EYC3ExpertsSquads'


const GOODFORM_GET_FAVORITE_PLAYER_URL = '/protected/mylionsfavourit?_=1480039224954'
// const GOODFORM_GET_FAVORITE_PLAYER_URL = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/qaj49/0aa688af9bffda9804747d0d603b5cf23b1a7def/files/snippet.json'
const GOODFORM_GET_FAVORITE_PLAYER_URL_NAME = 'GoodFormFavoritePlayers'
const GOODFORM_ADD_FAVORITE_PLAYER_URL = '/protected/player/add'
const GOODFORM_ADD_FAVORITE_PLAYER_URL_NAME = 'AddGoodFormFavoritePlayers'
const GOODFORM_REMOVE_FAVORITE_PLAYER_URL = '/protected/player/remove'
const GOODFORM_REMOVE_FAVORITE_PLAYER_URL_NAME = 'RemoveGoodFormFavoritePlayers'
const GOODFORM_GET_USER_CUSROMIZED_SQUAD_URL = '/protected/squad/get?_=1483928168053'
// const GOODFORM_GET_USER_CUSROMIZED_SQUAD_URL = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/rMGRB/6d6aea96b69590fde3eeba7151db42be87736dfc/files/snippet.json'
const GOODFORM_GET_USER_CUSROMIZED_SQUAD_URL_NAME = 'GoodFormUserCustomizedSquad'
const GOODFORM_SAVE_USER_CUSROMIZED_SQUAD_URL = '/protected/squad/save'
// const GOODFORM_SAVE_USER_CUSROMIZED_SQUAD_URL = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/6aKz9/fc3bd6b2afc0061d3bc72c627bd441b95aa66288/files/snippet.json'
const GOODFORM_SAVE_USER_CUSROMIZED_SQUAD_URL_NAME = 'SaveGoodFormUserCustomizedSquad'
const GOODFORM_REFRESH_TOKEN_URL = '/sessions/create'
// const GOODFORM_REFRESH_TOKEN_URL = '/5xek4/267b9dbd83db380edc89dc12e855c61d9b349bfe/files/snippet.json'
const GOODFORM_USERS_URL = '/users'
// const GOODFORM_USERS_URL = '/5xek4/267b9dbd83db380edc89dc12e855c61d9b349bfe/files/snippet.json'

//R3
//Squad
const EYC3_GETOFFICALSQUAD_URL_NAME = 'EYC3GetOfficalSquad'
// const EYC3_GETOFFICALSQUAD_URL = '/GetOfficalSquad'
const EYC3_GETOFFICALSQUAD_URL = '/GKGKA/40af55787a82d805080c75aac27bdf67893c37a0/files/snippet.json'

const EYC3_GETCOMPETITIONCENTREINFO_URL_NAME = 'EYC3GetCompetitionCentreInfo'
const EYC3_GETCOMPETITIONCENTREINFO_URL = '/GetCompetitionCentreInfo'
// const EYC3_GETCOMPETITIONCENTREINFO_URL = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/janr5/1a629466bf1e0f6e746b3f8f5ccc891b5ab6c345/files/snippet.json'

const EYC3_GETHISTORICALGAMERESULT_URL_NAME = 'EYC3GetHistoricalGameResult'
const EYC3_GETHISTORICALGAMERESULT_URL = '/GetHistoricalGameResult'

const EYC3_GETUSERPROFILESUMMARY_URL_NAME = 'EYC3GetuserProfileSummary'
const EYC3_GETUSERPROFILESUMMARY_URL = '/GetuserProfileSummary'
// const EYC3_GETUSERPROFILESUMMARY_URL = '/odBgq/d6d67f497d6aa4c63d58f9be3bc81dbfe30afda1/files/snippet.txt'

const EYC3_GETONBOARDINGINFO_URL_NAME = 'EYC3GetOnBoardingInfo'
const EYC3_GETONBOARDINGINFO_URL = '/GetOnBoardingInfo'
// const EYC3_GETONBOARDINGINFO_URL = '/dG8EL/434934b91e097507aaefd2af5e3ffa1305b860f4/files/snippet.json'

const EYC3_GETUSERCUSTOMIZEDSQUAD_URL_NAME = 'EYC3GetUserCustomizedSquad'
const EYC3_GETUSERCUSTOMIZEDSQUAD_URL = '/GetUserCustomizedSquad'

const EYC3_SAVEUSERCUSTOMIZEDSQUAD_URL_NAME = 'EYC3SaveUserCustomizedSquad'
const EYC3_SAVEUSERCUSTOMIZEDSQUAD_URL = '/SaveUserCustomizedSquad'

// R4
const EYC3_GET_GAME_DAY_TEAM_URL_NAME = 'EYC3_GET_GAME_DAY_TEAM'
// const EYC3_GET_GAME_DAY_TEAM_URL = '/GetGameDayTeam'
const EYC3_GET_GAME_DAY_TEAM_URL = '/ybzqr/3b17986e18069b37c9ba6f67f988b9d7bed442f1/files/snippet.json'

const EYC3_GET_FIXTURE_INFO_URL_NAME = 'EYC3_GET_FIXTURE_INFO'
// const EYC3_GET_FIXTURE_INFO_URL = '/GetFixturesInfo'
const EYC3_GET_FIXTURE_INFO_URL = '/5bBdx/6d56f5a0e8496837f2c2432d02f6a1c9d82263d2/files/snippet.json'


export function getAssembledUrl(urlName) {
    switch (urlName) {
        case SOTIC_GET_PLAYER_URL_NAME:
            return SOTIC_BASE_URL + SOTIC_GET_PLAYER_URL
        case SOTIC_GET_PLAYER_URL_R2_NAME:
            return SOTIC_BASE_URL + SOTIC_GET_PLAYER_URL_R2
        case SOTIC_GET_SUPPLIED_IMAGE_URL_NAME:
            return SOTIC_BASE_URL + SOTIC_GET_SUPPLIED_IMAGE_URL
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
        case EYC3_GETOFFICALSQUAD_URL_NAME:
            return EYC3_BASE_URL_DUMMY + EYC3_GETOFFICALSQUAD_URL
        case EYC3_GETCOMPETITIONCENTREINFO_URL_NAME:
            return EYC3_BASE_URL_DUMMY + EYC3_GETCOMPETITIONCENTREINFO_URL
        case EYC3_GETHISTORICALGAMERESULT_URL_NAME:
            return EYC3_BASE_URL_DUMMY + EYC3_GETHISTORICALGAMERESULT_URL
        case EYC3_GETUSERPROFILESUMMARY_URL_NAME:
            return EYC3_BASE_URL_DUMMY + EYC3_GETUSERPROFILESUMMARY_URL
        case EYC3_GETONBOARDINGINFO_URL_NAME:
            return EYC3_BASE_URL_DUMMY + EYC3_GETONBOARDINGINFO_URL
        case EYC3_GETUSERCUSTOMIZEDSQUAD_URL_NAME:
            return EYC3_BASE_URL_DUMMY + EYC3_GETUSERCUSTOMIZEDSQUAD_URL
        case EYC3_SAVEUSERCUSTOMIZEDSQUAD_URL_NAME:
            return EYC3_BASE_URL_DUMMY + EYC3_SAVEUSERCUSTOMIZEDSQUAD_URL

        // R4
        case EYC3_GET_GAME_DAY_TEAM_URL_NAME:
            return EYC3_BASE_URL_R4_DUMMY + EYC3_GET_GAME_DAY_TEAM_URL
        case EYC3_GET_FIXTURE_INFO_URL_NAME:
            return EYC3_BASE_URL_R4_DUMMY + EYC3_GET_FIXTURE_INFO_URL
    }
}
/*R3*/

//GROUP
const EYC3_POST_COMPETITIONLADDER_NAME = 'GetCompetitionLadder'
const EYC3_POST_COMPETITIONLADDER = '/GetCompetitionLadder'
// const EYC3_POST_COMPETITIONLADDER = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/janGK/c90118cabd393827cd1f57e60c14c61190d7694d/files/snippet.json'

const EYC3_POST_GETGROUPINFO_NAME = 'GetGroupInfo'
// const EYC3_POST_GETGROUPINFO = '/GetGroupInfo'
const EYC3_POST_GETGROUPINFO = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/yarzL/fb350f75e3558f9d785db61277eccdedfcb276a9/files/snippet.json'

const EYC3_POST_CREATEAGROUP_NAME = 'CreateAGroup'
const EYC3_POST_CREATEAGROUP = '/CreateAGroup'
// const EYC3_POST_CREATEAGROUP = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/qar8e/badf731a86bad1f04015532268f6f8ea8353006f/files/snippet.json'

const EYC3_POST_LEAVEAGROUP_NAME = 'LeaveAGroup'
const EYC3_POST_LEAVEAGROUP = '/LeaveAGroup'
// const EYC3_POST_LEAVEAGROUP = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/narEL/65c414db18619e877b8c2a83d0996e98c4066472/files/snippet.json'

const EYC3_POST_JOINAGROUP_NAME = 'JoinAGroup'
const EYC3_POST_JOINAGROUP = '/JoinAGroup'
// const EYC3_POST_JOINAGROUP = 'https://bitbucket.org/!api/2.0/snippets/JoelPub/5arAp/c631edc0ec759ed4bd040a2528a5f3587725d281/files/snippet.json'

export function getGroupUrl (urlName) {
    switch (urlName) {
        case EYC3_POST_COMPETITIONLADDER_NAME:
            return EYC3_BASE_URL_DUMMY  + EYC3_POST_COMPETITIONLADDER
        case EYC3_POST_GETGROUPINFO_NAME:
            return EYC3_BASE_URL_DUMMY  + EYC3_POST_GETGROUPINFO
        case EYC3_POST_CREATEAGROUP_NAME:
            return EYC3_BASE_URL_DUMMY + EYC3_POST_CREATEAGROUP
        case EYC3_POST_LEAVEAGROUP_NAME:
            return EYC3_BASE_URL_DUMMY + EYC3_POST_LEAVEAGROUP
        case EYC3_POST_JOINAGROUP_NAME:
            return EYC3_BASE_URL_DUMMY + EYC3_POST_JOINAGROUP

    }
}
export const actionsApi = {
    soticGetPlayer: getAssembledUrl(SOTIC_GET_PLAYER_URL_NAME),
    soticGetSuppliedImage: getAssembledUrl(SOTIC_GET_SUPPLIED_IMAGE_URL_NAME),
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
    goodFormUsers: getAssembledUrl(GOODFORM_USERS_URL),
    eyc3CompetitionLadder: getGroupUrl(EYC3_POST_COMPETITIONLADDER_NAME),
    eyc3GroupInfo: getGroupUrl(EYC3_POST_GETGROUPINFO_NAME),
    eyc3CreateGroup: getGroupUrl(EYC3_POST_CREATEAGROUP_NAME),
    eyc3JoinGroup:getGroupUrl(EYC3_POST_JOINAGROUP_NAME),
    eyc3LeaveGroup: getGroupUrl(EYC3_POST_LEAVEAGROUP_NAME),
    eyc3GetOfficalSquad: getAssembledUrl(EYC3_GETOFFICALSQUAD_URL_NAME),
    eyc3GetCompetitionCentreInfo: getAssembledUrl(EYC3_GETCOMPETITIONCENTREINFO_URL_NAME),
    eyc3GetHistoricalGameResult: getAssembledUrl(EYC3_GETHISTORICALGAMERESULT_URL_NAME),
    eyc3GetuserProfileSummary: getAssembledUrl(EYC3_GETUSERPROFILESUMMARY_URL_NAME),
    eyc3GetOnBoardingInfo: getAssembledUrl(EYC3_GETONBOARDINGINFO_URL_NAME),
    eyc3GetUserCustomizedSquad: getAssembledUrl(EYC3_GETUSERCUSTOMIZEDSQUAD_URL_NAME),
    eyc3SaveUserCustomizedSquad: getAssembledUrl(EYC3_SAVEUSERCUSTOMIZEDSQUAD_URL_NAME),

    // R4
    eyc3GetGameDayTeam: getAssembledUrl(EYC3_GET_GAME_DAY_TEAM_URL_NAME),
    eyc3GetFixtureInfo: getAssembledUrl(EYC3_GET_FIXTURE_INFO_URL_NAME),
}
export const APP_VERSION = APP_VERSION_NO
export const LOCAL_APP_VERSION = LOCAL_APP_VERSION_NO
