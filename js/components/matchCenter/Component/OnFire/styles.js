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
  tabBtnWrapper:{
      flexDirection:'row',
      paddingVertical:10,
      backgroundColor:'rgb(255,255,255)',
      justifyContent:'center'
  },
  tabBtnPos:{
      alignItems:'center',
      marginHorizontal:10,
  },
  tabBtn:{
      width:styleVar.deviceWidth*0.344,
      height:styleVar.deviceWidth*0.133,
      borderRadius:styleVar.deviceWidth*0.08,
      justifyContent:'center'
  },
  activeBtn:{
      backgroundColor:'rgb(38,38,38)'
  },
  inactiveBtn:{
      backgroundColor:'rgb(208,7,41)'
  },
  btnText:{
      color:'rgb(255,255,255)',
      fontFamily: styleVar.fontCondensed,
      fontSize:22,
      lineHeight:24,
      textAlign:'center',
      backgroundColor:'transparent',
      ios:{
        marginTop:10
      }
  },
})
