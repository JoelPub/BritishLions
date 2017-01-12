'use strict'

import { Alert, AsyncStorage } from 'react-native'

const ACCESS_TOKEN = 'lionsOfficialAccessToken'
const REFRESH_TOKEN = 'lionsOfficialRefreshToken'

export async function updateToken(accessTokenID, refreshTokenID, firstName='', lastName='') {
    let loginExpired = generateLoginExpiration().toString()
    
    try {
        await AsyncStorage.setItem('ACCESS_TOKEN', accessTokenID)
        await AsyncStorage.setItem('REFRESH_TOKEN', refreshTokenID)
        await AsyncStorage.setItem('USER_FULLNAME', `${firstName} ${lastName}`)

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

export async function removeToken() {
    try {
        await AsyncStorage.removeItem('ACCESS_TOKEN')
        await AsyncStorage.removeItem('REFRESH_TOKEN')
        await AsyncStorage.removeItem('LOGIN_EXPIRED')
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


function getDateNow() {
    let dateNow = new Date // current time and date
    //dateNow = 'Tue Dec 21 2016 19:17:59 GMT+0800 (PHT)'
    //console.log('dateNow: ', dateNow)
    return Date.parse(dateNow)
}

function generateLoginExpiration() {
    let dateNow = getDateNow()
    let dateExpired = new Date

    // add 3hours and 50minutes
    dateExpired = dateExpired.setHours(dateExpired.getHours() + 3, dateExpired.getMinutes() + 50)
    //console.log('dateExpired: ', new Date(dateExpired))
    return dateExpired
}

export async function checkIfLogin() {
    let dateNow = getDateNow()
    let distance = 0
    let dateExpired  = await AsyncStorage.getItem('LOGIN_EXPIRED')
    
    if (dateExpired) { // if have value and not null
        dateExpired = parseInt(dateExpired)
        distance = dateExpired - dateNow
        if (distance > 0) {
            return true  // token still valid
        }
    }

    // the token was expired
    return false
}



