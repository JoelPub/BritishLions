'use strict'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import styleVar from '../../../../themes/variable'

module.exports = styleSheetCreate({
  wrapper:{
    marginTop:50,
    paddingTop:10,
    marginHorizontal:10,
    borderRadius:0,
    backgroundColor:'rgb(255,255,255)',  
    flex: 1,
  },
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
    width:styleVar.deviceWidth-202-40,
    borderWidth:1,
    borderColor:'rgb(216,217,218)',
    borderLeftWidth:0
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
      padding:10,
      backgroundColor:'rgb(255,255,255)',
      justifyContent:'center'
  },
  tabBtnPos:{
      alignItems:'center',
      marginHorizontal:5,
  },
  tabBtn:{
      width:styleVar.deviceWidth*0.224,
      height:styleVar.deviceWidth*0.133,
      borderRadius:styleVar.deviceWidth*0.08,
      justifyContent:'center'
  },
  tabBtnWide:{
      width:styleVar.deviceWidth*0.27,
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
  headerWrapper: {
    flexDirection:'row',
    //paddingLeft:10,
    justifyContent:'flex-end',
    alignItems:'center',
  },
    indicatorWrapper: {
      flexDirection:'row',
      paddingLeft:(styleVar.deviceWidth-320)/15,
      paddingRight:styleVar.deviceWidth/13,
      justifyContent:'space-between',
      alignItems:'center',
      width:styleVar.deviceWidth - 80
    },
  rect:{
    width:14,
    height:14,
    backgroundColor:'rgb(132,136,139)',
    marginHorizontal:3
  },
  transRect:{
    width:14,
    height:14,
    borderWidth:1,
    backgroundColor:'transparent',
    borderColor:'rgb(132,136,139)',
    marginHorizontal:3
  },
  headerText:{
    fontFamily: styleVar.fontCondensed,
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    color:'rgb(132,136,139)',
    marginHorizontal:3
  }
})
