'use strict'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import styleVar from '../../../../themes/variable'

module.exports = styleSheetCreate({
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#fff'
  },
  tabBarUnderlineStyle:{
    backgroundColor: 'red'
  },
  tabBarActiveTextColor:{
    backgroundColor: 'red'
  },
  itemContainer:{
    flexDirection:'row',
    backgroundColor: styleVar.colorGrey,
    paddingLeft:10
  }


})
