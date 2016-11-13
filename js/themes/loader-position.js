'use strict'

import { Dimensions } from 'react-native'
import { styleSheetCreate } from './lions-stylesheet'

var deviceHeight = Dimensions.get('window').height

module.exports = styleSheetCreate({
    centered: {
      alignItems: 'center',
      justifyContent: 'center',
      height: deviceHeight,
      marginTop: -50
    }

})
