'use strict'

import { Alert, AsyncStorage } from 'react-native'
import {LOCAL_APP_VERSION} from './urlStorage'
const ACCESS_TOKEN = 'lionsOfficialAccessToken'
const REFRESH_TOKEN = 'lionsOfficialRefreshToken'


const RELOGIN = 'RELOGIN'


  export async function updateToken(accessTokenID='', refreshTokenID='', firstName='', lastName='', is_first_log_in = true, logged_in_email='') {
    let loginExpired = generateLoginExpiration().toString()
    is_first_log_in = is_first_log_in === 'true'? 'yes' : 'no'
    
    try {
        await AsyncStorage.setItem('ACCESS_TOKEN', accessTokenID)
        await AsyncStorage.setItem('REFRESH_TOKEN', refreshTokenID)
        await AsyncStorage.setItem('USER_FULLNAME', `${firstName} ${lastName}`)
        await AsyncStorage.setItem('IS_FIRST_LOGIN', is_first_log_in) // remember: only string are accepted
        if(logged_in_email  !== '') await AsyncStorage.setItem('LOGGED_IN_EMAIL', logged_in_email)


        if (loginExpired) {
            await AsyncStorage.setItem('LOGIN_EXPIRED', loginExpired)
        }
    } catch (err) {
        Alert.alert(
          'An error occured',
          'AsyncStorage error: ' + err.message,
          [{text: 'DISMISS'}]
        )
    }
}
export async function SaveUserNameAndPassword(  logged_in_email='', password='',loginWay ='password') {

    try {
        let reLoginInfo = {
            email:logged_in_email,
            password:password,
            loginWay:loginWay
        }
        await AsyncStorage.setItem(RELOGIN, JSON.stringify(reLoginInfo))

    } catch (err) {
        Alert.alert(
          'An error occured',
          'AsyncStorage error: ' + err.message,
          [{text: 'DISMISS'}]
        )
    }
}


export async function removeToken(isRelogin) {
    try {
        await AsyncStorage.removeItem('ACCESS_TOKEN')
        await AsyncStorage.removeItem('REFRESH_TOKEN')
        await AsyncStorage.removeItem('LOGIN_EXPIRED')
        await AsyncStorage.removeItem('USER_FULLNAME')
        await AsyncStorage.removeItem('IS_FIRST_LOGIN')
        await AsyncStorage.removeItem('LOGGED_IN_EMAIL')
        if(isRelogin){
            await AsyncStorage.removeItem(RELOGIN)
        }
    } catch (err) {
        Alert.alert(
          'An error occured',
          'AsyncStorage error: ' + err.message,
          [{text: 'DISMISS'}]
        )
    }
}


export async function getAccessToken() {
    return await AsyncStorage.getItem('ACCESS_TOKEN', (err, result) => {
        return result
    })
}

export async function getCurrentVersionNumber() {
    return await AsyncStorage.getItem('CURRENT_VERSION_NUMBER', (err, result) => {
        return result
    })
}

export async function setCurrentVersionNumber() {
    await AsyncStorage.setItem('CURRENT_VERSION_NUMBER', LOCAL_APP_VERSION)
}

export async function getMatchMan() {
    // if(__DEV__)console.log('getMatchMan')
    return await AsyncStorage.getItem('MAN_OF_MATCH', (err, result) => {
        // if(__DEV__)console.log('result',result)
        return result
    })
}

export async function setMatchMan(matchMan) {
    // if(__DEV__)console.log('setMatchMan',matchMan)
    await AsyncStorage.setItem('MAN_OF_MATCH', JSON.stringify(matchMan))
}
export async function getVote() {
    return await AsyncStorage.getItem('VOTE_RECORD', (err, result) => {
        return result
    })
}

export async function setVote(voteRecord) {
    await AsyncStorage.setItem('VOTE_RECORD', JSON.stringify(voteRecord))
}

export async function setAddedToCalanderCheck() {
    await AsyncStorage.setItem('ADDED_EVNETS_TO_CALENDAR', "added")
}

export async function getAddedToCalanderCheck() {
    return await AsyncStorage.getItem('ADDED_EVNETS_TO_CALENDAR', (err, result) => {
        return result
    })
}

export async function getRefreshToken() {
    return await AsyncStorage.getItem('REFRESH_TOKEN', (err, result) => {
        return result
    })
}

export async function getUserFullName() {
    return await AsyncStorage.getItem('USER_FULLNAME', (err, result) => {
        return result
    })
}

export async function isFirstLogIn() {
    return await AsyncStorage.getItem('IS_FIRST_LOGIN', (err, result) => {
        return result
    })
}


export async function getUserId() {
    return await AsyncStorage.getItem('LOGGED_IN_EMAIL', (err, result) => {
        return result
    })
}
export async function getReloginInfo() {
    return await AsyncStorage.getItem(RELOGIN, (err, result) => {
        if(err){
            return err
        }else {
            return result
        }
    })
}
function getDateNow() {
    let dateNow = new Date // current time and date
    //dateNow = 'Thu Jan 26 2017 19:08:40 GMT+0800 (PHT)'
    //if (__DEV__)console.log('dateNow: ', dateNow)
    return dateNow
}

function generateLoginExpiration() {
    let dateExpired = getDateNow()

    // add 3hours and 50minutes, it will return date parse, no need to parse again
    dateExpired = dateExpired.setHours(dateExpired.getHours() +6*24+ 23, dateExpired.getMinutes() + 50)
    // if (__DEV__)console.log('dateExpired: ', new Date(dateExpired))
    return dateExpired 
}

export async function checkIfLogin() {
    let dateNow = Date.parse(getDateNow())
    let distance = 0
    let dateExpired  = await AsyncStorage.getItem('LOGIN_EXPIRED')
    
    if (dateExpired) { // if have value and not null
        dateExpired = parseInt(dateExpired)
        distance = dateExpired - dateNow
        //if (__DEV__)console.log(dateExpired, dateNow, distance)
        if (distance > 0) {
            return true  // token still valid
        }
    }
    // the token was expired
    return false
}



