'use strict'

import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import shapes from '../../../themes/shapes'

const gridBorderColor = 'rgb(216, 217, 218)'
module.exports = styleSheetCreate({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#fff',
    paddingHorizontal:20,
    paddingTop: 30,
  },
  smallContainer: {
    borderColor: 'rgb(216,217,218)',
    borderWidth: 1
  },
  viewShareHeader: {
    backgroundColor: styleVar.brandPrimary,
    height: 180,
    width: null,
    alignItems: 'center'
  },
  viewHeaderImage: {
    marginTop: 20,
    width: 130,
    height: 140,
  },
  wrapper:{
    borderTopWidth:0,
    backgroundColor: '#FFF',
    paddingHorizontal:5,
  },
  posWrapper:{
    width:(styleVar.deviceWidth-40)/2+1,
    marginLeft:-1
  },
  indivPosTitle:{
    borderTopWidth:1,
    borderLeftWidth:1,
    borderBottomWidth:1,
    borderColor:'rgb(216,217,218)',
    height:50,
    paddingTop:12,
    backgroundColor:'rgb(240,239,245)',
    borderRightWidth:1
  },
  indivPosTitleText:{
    color:'rgb(175,0,30)',
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
    borderColor: 'rgb(216,217,218)',
    borderWidth: 1,
    paddingTop: 0,
    paddingBottom: 13,
    android: {
      paddingTop: 10,
    }
  },
  titleBox: {
    position: 'relative',
    backgroundColor: 'white',
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
    backgroundColor: 'transparent',
    android: {
      marginTop: -2,
      paddingBottom: 3,
    },
    color: 'rgb(38,38,38)'
  },
  playerFNameText: {
    marginTop: 10,
    android: {
      marginTop: 12
    }
  },
  jobBoxContainer:{
    flexDirection: 'row'
  },
  rankTitleView: {
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'rgb(216,217,218)',
    height:60,
    paddingTop:20,
    backgroundColor:'rgb(240,239,245)',
  },
  nubTextSupContainer:{
    width: (styleVar.deviceWidth-40)/2,
    paddingLeft: 15,
    paddingRight: 5,
    paddingTop: 20,
    paddingBottom: 10
  },
  rankNubTextContainer:{
    flexDirection: 'row',
  },
  rankNubTextContainerCol:{
    width: 20
  },
  rankNumber: {
    color:'rgb(175,0,30)',
    fontFamily: styleVar.fontCondensed,
    fontSize:18,
    lineHeight:22,
  },
  rankPlayerName: {
    fontFamily: styleVar.fontCondensed,
    fontSize: 21,
    lineHeight: 25,
    paddingBottom: 2,
    marginTop: 0,
    backgroundColor: 'transparent',
    android: {
      marginTop: -2,
      paddingBottom: 3,
    },
    color: 'rgb(38,38,38)'
  },
  footer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      backgroundColor: 'rgb(128, 128, 128)',
      height: 50,
      paddingBottom: 9,
      paddingRight: 11,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
  },
  footerText: {
      fontFamily: styleVar.fontGeorgia,
      fontSize:13,
      marginRight:5,
      color:'rgb(255, 255, 255)',
      marginBottom: -4
  },
  result: {
      backgroundColor: styleVar.colorText,
      paddingHorizontal: 20,
      paddingTop: 25,
      paddingBottom: 10,
      android: {
          paddingBottom: 20
      }
  },
  resultWonBg: {
      backgroundColor: 'rgb(9, 127, 64)'
  },
  resultText: {
      color: '#FFF',
      fontSize: 36,
      lineHeight: 36,
      textAlign: 'center',
      fontFamily: styleVar.fontCondensed,
      ios: {
          marginBottom: -7
      }
  },
    summaryRow: {
        //backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 24,
        paddingBottom: 0,
        marginBottom: 1
    },

    summaryCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginHorizontal: 15,
        backgroundColor: 'rgb(175,0,30)',
    },
    summaryCircleText: {
        color: 'rgb(255,255,255)',
        fontSize: 36,
        lineHeight: 36,
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        marginTop: 4,
        android: {
            marginTop: -6
        }
    },
    summaryTitle: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: 'rgb(38,38,38)',
        marginTop: 10
    },
})