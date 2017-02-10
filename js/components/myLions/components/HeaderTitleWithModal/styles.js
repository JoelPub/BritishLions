'use strict'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import styleVar from '../../../../themes/variable'

const gridBorderColor = 'rgb(216, 217, 218)'
module.exports = styleSheetCreate({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#fff'
  },
  groupTitle:{
    color:'rgb(175,0,30)',
    fontFamily: styleVar.fontCondensed,
    backgroundColor: 'transparent',
    fontSize:28,
    height: 60,
    textAlign:'center',
    paddingTop: 25,
  },
  headerIcon: {
    color: styleVar.colorIcon,
    android: {
      marginTop: 13
    },
    position: 'absolute',
    right: 8,
    top: 16,
    width: 28,
    height: 28,
    fontSize:28
  }
})
