'use strict'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import styleVar from '../../../../themes/variable'

module.exports = styleSheetCreate({
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#fff',
    overflow:'hidden'
  },
  tabBarUnderlineStyle:{
    backgroundColor: 'red'
  },
  tabBarActiveTextColor:{
    backgroundColor: 'red'
  },
  itemContainer:{
    flexDirection:'row',
    backgroundColor: 'white',
    marginTop:5,
    paddingHorizontal:10,
    android:{
      paddingHorizontal:5,

    }
  },
  rightContainer: {
    width:styleVar.deviceWidth-202-30,
    borderWidth:1,
    borderColor:'rgb(216,217,218)',
    borderLeftWidth:0
  }
})
