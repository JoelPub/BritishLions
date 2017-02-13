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
  header: {
    backgroundColor: styleVar.brandPrimary,
    height: null,
    width: null,
  },
  headerTitle: {
    alignSelf: 'center',
    fontFamily: styleVar.fontCondensed,
    paddingTop: 15,
    marginBottom: 5,
    backgroundColor: 'transparent',
    android: {
      paddingTop: 12,
      marginBottom: 15,
    }
  },
  groupTitle:{
    color:'rgb(175,0,30)',
    fontFamily: styleVar.fontCondensed,
    backgroundColor: 'transparent',
    fontSize:28,
    height: 60,
    textAlign:'center',
    paddingTop: 25,
  },
  headerIcon: {
    color: styleVar.colorIcon,
    android: {
      marginTop: 13
    },
    position: 'absolute',
    right: 8,
    top: 16,
    width: 28,
    height: 28,
    fontSize:28
  },
  viewShareHeader: {
    backgroundColor: styleVar.brandPrimary,
    height: 229,
    width: null,
    alignItems: 'center'
  },
  viewHeaderImage: {
    marginTop: 20,
    width: 150,
    height: 150,
  },
  scoreCard:{
    marginVertical:2,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'rgb(216,217,218)',
    padding:20,
  },
  scoreCardExpert:{
    marginVertical:0,
    borderTopWidth:0,
    borderBottomWidth:1,
    borderColor:'rgb(216,217,218)',
    padding:20,
  },
  semiCard:{
    paddingTop:29,
    marginBottom:10,
    backgroundColor:'rgb(95,96,98)',
    borderRadius:5,
  },
  semiCardText:{
    fontFamily: styleVar.fontGeorgia,
    fontSize:18,
    lineHeight:24,
    paddingHorizontal:20,
    marginBottom:24,
    textAlign:'center',
    color:'rgb(255,255,255)',
  },
  semiCardFooter:{
    flexDirection: 'row',
    alignItems:'flex-end',
    justifyContent:'flex-end',
    backgroundColor:'rgb(128,128,128)',
    height:50,
    paddingBottom:9,
    paddingRight:11,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
  },
  semiCardFooterText:{
    fontFamily: styleVar.fontGeorgia,
    fontSize:13,
    marginRight:5,
    color:'rgb(255,255,255)',
  },
  fullCard:{
    marginTop:3,
    backgroundColor:'rgb(95,96,98)',
    borderRadius:5,
  },
  btnCardInfoWrapper:{
    height: 48,
    width: 48,
    backgroundColor:'transparent',
    position:'absolute',
    right: 6,
    top: 6
  },
  btnCardInfoWrapper2: {
    right: 4,
    top: 8
  },
  btnCardInfo:{
    height:24,
    width:24,
    borderRadius:12,
    backgroundColor:'rgb(255,255,255)',
    position:'absolute',
    right: 0,
    top: 0
  },
  cardInfoIcon:{
    fontSize:24,
    textAlign:'center',
    color:'rgb(95,96,98)',
    backgroundColor:'transparent'
  },
  summaryWrapper: {
    paddingHorizontal: 20,
    paddingTop: 30
  },
  summaryText:{
    fontFamily: styleVar.fontGeorgia,
    fontSize:18,
    textAlign:'center',
    lineHeight:22,
    flex:1,
    marginBottom: 10,
    color:'black',
  },
  summaryTextHighLight:{
    fontFamily: styleVar.fontCondensed,
    fontSize: 44,
    lineHeight: 44,
    textAlign:'center',
    color:styleVar.brandPrimary,
    marginTop: 1,
  },
  ratingWrapper:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderTopWidth:1,
    borderColor:'rgb(128,127,131)',
    marginTop: 10,
    paddingVertical:19,
    backgroundColor: 'rgb(128,127,131)',
  },
  ratingWrapperExpert:{
    borderTopWidth:0,
    marginTop:0,
  },
  ratingTitle:{
    fontFamily: styleVar.fontCondensed,
    fontSize:28,
    lineHeight:32,
    paddingTop: 12,
    color:'rgb(255,255,255)',
    android: {
      paddingTop: 0
    }
  },
  ratingScore:{
    marginLeft:10,
    height:70,
    width:70,
    borderRadius:35,
    backgroundColor:styleVar.brandPrimary,
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 15,
    android: {
      paddingTop: 6
    }
  },
  ratingScorePoint:{
    fontFamily: styleVar.fontCondensed,
    fontSize:28,
    lineHeight:28,
    color:'white',
    backgroundColor:'transparent'
  },
  barGraphWrapper:{
    height: 105,
    borderTopWidth:1,
    borderColor: 'rgb(128, 127, 131)',
    paddingHorizontal:25,
    paddingTop:15
  },
  barGraphText:{
    fontFamily: styleVar.fontCondensed,
    fontSize:18,
    textAlign:'left',
    marginTop: 12,
    color:'black',
    android: {
      marginTop: 8,
    }
  },
  barSliderWrapper:{
    height: 112,
    borderTopWidth:1,
    borderColor:'rgb(128,127,131)'
  },
  barSliderTextWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal: 25,
  },
  barSliderText:{
    fontFamily: styleVar.fontCondensed,
    fontSize:18,
    marginTop: 25,
    color:'black',
  },
  scoreCardShareWrapper:{
    borderTopWidth:1,
    borderColor:'rgb(128,127,131)',
    marginTop: 0,
    paddingVertical: 5
  },
  scoreCardShare:{
    backgroundColor:'rgb(255,230,0)',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 24
  },
  scoreCardShareText:{
    fontFamily: styleVar.fontCondensed,
    fontSize: 24,
    lineHeight: 24,
    color: 'rgb(95,96,98)',
    paddingTop:5
  },
  scoreCardShareIcon:{
    marginLeft: 5,
    width: 34,
    color: 'rgb(95,96,98)',
    fontSize: 26,
    marginTop: -3
  },
  scoreCardFooter:{
    backgroundColor:'rgb(128,128,128)',
    height:50,
    alignItems:'flex-end',
    padding:10
  },
  scoreCardFooterImg:{
    height:30,
    width:29
  },
  btnExpertSquad: {
    height:50,
    backgroundColor:'rgb(38,38,38)',
    flexDirection:'row',
    marginTop:20,
    marginBottom:0,
    marginLeft:10,
    marginRight:10,
    paddingTop: 5,
    android: {
      paddingTop: 9
    }
  },
  btnExpertIcon: {
    marginBottom: 3,
    color: 'rgb(208,7,42)',
    fontSize: 24,
    backgroundColor:'transparent',
    android:{
      marginBottom: 4,
    }
  },
  btnExpertLabel: {
    fontFamily: styleVar.fontCondensed,
    fontSize: 24,
    lineHeight: 24,
    paddingTop: 5,
    color:'rgb(255,255,255)',
    backgroundColor:'transparent',
    marginLeft: 6,
    android:{
      marginTop: -7,
    }
  },
  button: {
    height: 50,
    backgroundColor: styleVar.brandLightColor,
    marginTop: 19,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  modalViewWrapper:{
    paddingHorizontal:28,
    marginVertical:54,
    backgroundColor:'transparent',
  },
  modalTitleText:{
    fontFamily: styleVar.fontCondensed,
    fontSize:28,
    lineHeight:28,
    marginTop:28,
    color: '#FFF'
  },
  modalText:{
    fontFamily: 'Helvetica Neue',
    fontSize:16,
    color: '#FFF'
  },
})