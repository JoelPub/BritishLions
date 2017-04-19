
'use strict'

import { styleSheetCreate } from '../../../../../../themes/lions-stylesheet'
import styleVar from '../../../../../../themes/variable'

module.exports = styleSheetCreate({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: styleVar.colorGrey,
    paddingHorizontal:10
  },
  titleView:{
    flexDirection:'column',
    alignItems:'center'
  },
  scoreboardTitle: {
    fontFamily: styleVar.fontCondensed,
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'center',
    color: styleVar.colorText,
    paddingTop:15,
  },
  contentContainer:{
    flexDirection:'column',
    alignItems:'center',
    marginTop: 5,
    backgroundColor:'#FFF',
    borderRadius:10,
  },
  contentContainerWithBox:{
    flexDirection:'row',
    marginTop: 10,

  },
  scoreboardContentTitle: {
    fontFamily: styleVar.fontCondensed,
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
    color: styleVar.colorText,
    marginLeft:10
  },
  proportionTextView:{
    height: styleVar.deviceWidth * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proportionText:{
    fontFamily: styleVar.fontCondensed,
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'center',
    color: styleVar.colorText,
  },
  ratioTestView:{

    width: styleVar.deviceWidth * 0.12,
    height: styleVar.deviceWidth * 0.12,
    backgroundColor: styleVar.colorGrey,
    borderRadius: styleVar.deviceWidth * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratioTest:{
    fontFamily: styleVar.fontCondensed,
    fontSize: 12,
    lineHeight: 12,
    textAlign: 'center',
    color: styleVar.colorText,
  }

})
