
'use strict'

import { styleSheetCreate } from '../../../../../../themes/lions-stylesheet'
import styleVar from '../../../../../../themes/variable'

module.exports = styleSheetCreate({
  container: {
    flex: 1,
    width: null,
    backgroundColor: styleVar.colorGrey,
    borderColor: 'rgb(216,217,218)',
    height:207

  },
  titleView:{
    flexDirection:'column',
    alignItems:'center',
    paddingVertical: 10,
    height:60
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
    height:207-66
  },
  contentContainerWithBox:{
    flexDirection:'row',
    marginTop: 8,

  },
  scoreboardContentTitle: {
    fontFamily: styleVar.fontCondensed,
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'center',
    color: styleVar.colorText,
    marginLeft:10
  },
  proportionTextView:{
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proportionText:{
    fontFamily: styleVar.fontCondensed,
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
    color: styleVar.colorText,
    paddingTop: 4
  },
  ratioTestView:{
    width: 50,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(216,217,218)',
    borderWidth: 1
  },
  ratioTest:{
    fontFamily: styleVar.fontCondensed,
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'center',
    color: styleVar.colorText,
    paddingTop: 6
  }
})
