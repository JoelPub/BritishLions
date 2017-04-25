'use strict'

import { styleSheetCreate } from '../../../../../../themes/lions-stylesheet'
import styleVar from '../../../../../../themes/variable'

module.exports = styleSheetCreate({

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 70,
    flexDirection: 'row',
    paddingTop: 0,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    android:{
      height: 80,
    }
  },
  tabContainer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText:{
    fontFamily: styleVar.fontCondensed,
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
    color: 'white',
  },
  tabTextView:{
    backgroundColor: styleVar.brandPrimary,
    height:50,
    borderRadius:25,
    paddingHorizontal:20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10,

  },
})

