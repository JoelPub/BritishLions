'use strict'

import { Alert, AsyncStorage } from 'react-native'

const ACCESS_TOKEN = 'lionsOfficialAccessToken'
const REFRESH_TOKEN = 'lionsOfficialRefreshToken'

export async function updateToken(accessTokenID, refreshTokenID) {
    try {
        await AsyncStorage.setItem('ACCESS_TOKEN', accessTokenID)
        await AsyncStorage.setItem('REFRESH_TOKEN', refreshTokenID)
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
