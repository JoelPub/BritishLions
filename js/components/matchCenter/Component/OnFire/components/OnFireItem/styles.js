'use strict'

import { styleSheetCreate } from '../../../../../../themes/lions-stylesheet'
import styleVar from '../../../../../../themes/variable'

module.exports = styleSheetCreate({

  guther: {
    padding: 20
  },
  box: {
    borderWidth: 1,
    borderColor: styleVar.colorGrey2,
    borderBottomWidth:0
  },
  tabText:{
    fontFamily: styleVar.fontCondensed,
    fontSize: 24,
    lineHeight: 24,
    color: 'rgb(175,0,30)',
    paddingTop:15,
    marginLeft:20,
  },
  headerView:{
    flexDirection: 'row',
    height:50,
    backgroundColor: styleVar.colorGrey,
    borderWidth: 0,
    borderColor: styleVar.colorGrey2,
  },
  whiteBk:{
    backgroundColor: 'white'
  },
  gameAndAvgText: {
    fontFamily: styleVar.fontCondensed,
    fontSize: 18,
    lineHeight: 18,
    color: 'rgb(132,136,139)',
    paddingTop:15,
    textAlign:'center',
    position: 'absolute',
  },
  blackContentText: {
    fontFamily: styleVar.fontCondensed,
    fontSize: 21,
    lineHeight: 21,
    color: 'black',
    paddingTop:15,
    textAlign:'center',
    position: 'absolute',
    top: 4
  },
  blackContentStarText: {
    right: 10,
    marginTop: -2,
    android: {
      marginTop: -4
    }
  },
  headerImage:{
    width: 49,
    height: 49
  },
  star: {
    color: styleVar.colorScarlet,
    fontSize: 25,
  }
})

