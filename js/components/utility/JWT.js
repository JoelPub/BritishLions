'use strict'

import { Alert, AsyncStorage } from 'react-native'

export async function updateToken(item, selectedValue) {
    try {
        await AsyncStorage.setItem(item, selectedValue)
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
        await AsyncStorage.removeItem('LIONS_2017_ACCESS_TOKEN')
        await AsyncStorage.removeItem('LIONS_2017_REFRESH_TOKEN')
    } catch (err) {
        Alert.alert(
          'An error occured',
          'AsyncStorage error: ' + err.message,
          [{text: 'DISMISS'}]
        )
    }
}

export async function getAccessToken() {
    await AsyncStorage.getItem('LIONS_2017_ACCESS_TOKEN', (err, result) => {
      return result
    })
}

export async function getRefreshToken() {
    await AsyncStorage.getItem('LIONS_2017_REFRESH_TOKEN', (err, result) => {
      return result
    })
}
