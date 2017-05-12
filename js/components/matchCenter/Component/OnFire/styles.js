'use strict'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import styleVar from '../../../../themes/variable'

module.exports = styleSheetCreate({
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#fff',
  },
  tabBarContent: {
    paddingHorizontal: 20, 
    paddingVertical: 5
  },
  modalContent: {
      paddingHorizontal: 28,
      marginTop: 60
  },
  modalContentTitleText: {
      fontFamily: styleVar.fontCondensed,
      fontSize: 28,
      lineHeight: 28,
      color: '#FFF'
  },
  modalContentText: {
      fontFamily: 'Helvetica Neue',
      fontSize: 16,
      lineHeight: 22,
      color: '#FFF',
      marginBottom: 20,
      android: {
          lineHeight: 26
      }
  },
})
