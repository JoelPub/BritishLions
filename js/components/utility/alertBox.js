'use strict'

import { Alert } from 'react-native'

export function alertBox(title = 'Error', content = '', btnText = 'OK') {
    Alert.alert(
      title,
      content,
      [{text: btnText}]
  	)
}
