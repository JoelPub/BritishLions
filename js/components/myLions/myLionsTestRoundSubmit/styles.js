'use strict'

import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'

const gridBorderColor = 'rgb(216, 217, 218)'

module.exports = styleSheetCreate({
    container: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#fff'
    },
    guther: {
        paddingHorizontal: 20
    },
    button: {
        height: 50,
        backgroundColor: styleVar.brandLightColor,
        marginTop: 19,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    pageTitle: {
        backgroundColor: 'transparent',
        paddingTop: 20,
        paddingBottom: 6,
        borderColor: styleVar.colorGrey2,
        borderBottomWidth: 1,
    },
    pageTitleText: {
        alignSelf: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: styleVar.colorScarlet,
        backgroundColor: 'transparent',
        textAlign:'center',
    },
    roundButton: {
        height: 50,
        backgroundColor: styleVar.colorScarlet,
        flexDirection:'row',
        marginTop: 0,
        marginBottom: 0,
        paddingTop:5,
        android:{
            paddingTop: 0,
        }
    },
    roundButtonIcon: {
        marginBottom: 5,
        color: 'rgb(255,204,40)',
        fontSize:24,
        android:{
            marginBottom: 1,
        }
    },
    roundButtonLabel: {
        backgroundColor: 'transparent',
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop:5,
        marginLeft: 5,
        color: '#FFF'
    },
  viewShareHeader: {
    backgroundColor: styleVar.brandPrimary,
    height: styleVar.deviceWidth*0.45,
    width: null,
    alignItems: 'center',
    paddingTop:34,
    paddingBottom:42,
    paddingLeft:39,
    paddingRight:48,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  headerText: {
    fontFamily: 'Helvetica Neue',
    fontSize:14,
    lineHeight:22,
    color:'rgb(255,255,255)',
    textAlign:'center'
    },
  headerTextBold: {
    fontFamily: 'Helvetica Neue',
    fontSize:16,
    lineHeight:22,
    color:'rgb(255,255,255)',
    textAlign:'center',
    fontWeight:'bold'
    },
  jobBoxContainer:{
    flexDirection: 'row',
  },
  footer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      backgroundColor: 'rgb(128, 128, 128)',
      height: 50,
      paddingBottom: 9,
      paddingRight: 11,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
  },
  footerText: {
      fontFamily: styleVar.fontGeorgia,
      fontSize:13,
      marginRight:5,
      color:'rgb(255, 255, 255)',
      marginBottom: -4
  },
  posWrapper:{
    width:(styleVar.deviceWidth-40)/2+1,
    marginLeft:-1,
  },
  indivPosTitle:{
    borderTopWidth:1,
    borderLeftWidth:1,
    borderColor:'rgb(128,127,131)',
    height:50,
    paddingTop:12,
    borderRightWidth:1
  },
  indivPosTitleText:{
    color:'rgb(255,230,0)',
    textAlign:'center',
    fontFamily: styleVar.fontCondensed,
    fontSize:24,
    lineHeight:24,
  },
  posBtn:{
    borderLeftWidth:0,
    borderColor:'rgb(255,255,255)'
  },
  playerNameTextWrapper:{
    marginTop:-12,
    borderColor: 'rgb(128,127,131)',
    borderBottomWidth: 1,
    borderLeftWidth:1,
    paddingTop: 0,
    paddingBottom: 13,
    android: {
      paddingTop: 10,
    }
  },
  titleBox: {
    position: 'relative',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    height:styleVar.deviceWidth*0.16,
    paddingHorizontal: 2,
    android: {
      paddingTop: 12,
      paddingBottom: 6
    }
  },
  playerNameText: {
    textAlign: 'center',
    fontFamily: styleVar.fontCondensed,
    fontSize: 21,
    lineHeight: 21,
    paddingBottom: 2,
    marginTop: -6,
    android: {
      marginTop: -2,
      paddingBottom: 3,
    },
    color: 'rgb(255,255,255)'
  },
  rankNubTextContainer:{
    flexDirection: 'row',
    paddingBottom:10,
  },
  rankNumber: {
    color:'rgb(254,227,10)',
    fontFamily: styleVar.fontCondensed,
    fontSize:18,
    lineHeight:22,
  },
  rankPlayerName: {
    fontFamily: styleVar.fontCondensed,
    fontSize: 20,
    lineHeight: 24,
    paddingBottom: 2,
    marginTop: 0,
    backgroundColor: 'transparent',
    android: {
      marginTop: -2,
      paddingBottom: 3,
    },
    color: 'rgb(255,255,255)'
  },
  rankTitleView: {
    height:60,
    paddingTop:20,
  },
  nubTextSupContainer:{
    width: (styleVar.deviceWidth-40)/2,
    paddingLeft: 15,
    paddingRight: 5,
    paddingTop: 20,
    paddingBottom: 10
  },
  smallContainer: {
    paddingHorizontal:20,
    paddingVertical: 30,
  },
  listContainer: {
    backgroundColor:'rgb(95,96,98)',
    borderRadius:4
  },
    summaryGuther: {
        paddingHorizontal: 27,
        paddingVertical:25,
    },

    summaryShare:{
        backgroundColor: 'rgb(255, 230, 0)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 24,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        marginTop:0
    },
    summaryShareText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        color: 'rgb(95,96,98)',
        paddingTop: 7,
        android: {
            paddingTop: 0
        }
    },
    summaryShareIcon:{
        marginLeft: 5,
        width: 34,
        color: 'rgb(95,96,98)',
        fontSize: 26,
        marginTop: -1,
        android: {
            marginTop: -4
        }
    },
    borderTop: {
        borderColor: styleVar.colorGrey2,
        borderTopWidth: 1,
        paddingTop: 40,
        paddingBottom: 15,
        marginTop:5
    }
})
