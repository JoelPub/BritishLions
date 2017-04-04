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
  button: {
    height: 50,
    backgroundColor: styleVar.brandLightColor,
    marginTop: 15,
    marginBottom: 35,
    marginLeft: 30,
    marginRight: 30,
    borderRadius:30
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
  prideContainer:{
    backgroundColor: 'rgb(239,239,240)',
    borderBottomWidth: 1,
    borderColor: 'rgb(216, 217, 218)',
  },
  prideTitleView:{
    flex: 1,
    width: null,
    height: 60,
    paddingTop: 20,
    android:{
      paddingTop: 20,
    },
  },
  prideTitleText:{
    color:'rgb(175,0,30)',
    fontFamily: styleVar.fontCondensed,
    backgroundColor: 'transparent',
    fontSize:28,
    textAlign:'center',
    lineHeight:28,

  },
  groupActionView:{
    backgroundColor: 'rgb(255,255,255)',
    height: 190
  },
  btnFavourites: {
    backgroundColor:'rgb(175,0,30)',
    flexDirection:'row',
    marginTop: 0,
    marginBottom: 0,
    paddingTop:5,
    android:{
      paddingTop: 0,
    }
  },
  btnFavouritesIcon: {
    marginBottom: 5,
    color: 'rgb(255,204,40)',
    fontSize:24,
    android:{
      marginBottom: 1,
    }
  },
  btnFavouritesLabel: {
    textAlign:'left',
    fontFamily: styleVar.fontCondensed,
    fontSize: 24,
    lineHeight: 24,
    paddingTop:5,
    marginLeft: 5
  },
  grayBackgroundColor:{
    backgroundColor: 'rgb(71,72,73)',
    marginTop: 30
  },
  groupList:{
    backgroundColor: 'rgb(239,239,240)',
    paddingBottom:35
  },
  groupName:{
    height: 60,
    backgroundColor: 'rgb(255,255,255)',
    marginTop: 35,
    marginLeft: 30,
    marginRight: 30,
    justifyContent:'center',
    borderRadius:5,
    borderWidth: 1,
    borderColor: 'rgb(216, 217, 218)',
  },
  groupNameText:{
    marginLeft: 12,
    fontFamily: styleVar.fontGeorgia,
    color:'black',
    fontSize: 18,
    lineHeight: 24,
    android:{
      paddingTop:-4
    }
  },
  playIcon:{
    color: 'rgb(208,7,42)',
    position: 'absolute',
    right: 8,
    top: 16,
    width: 24,
    height: 24,
    fontSize:24
  },
  CompetitionCenterView:{
    height: 150,
    backgroundColor: 'rgb(255,255,255)',
    paddingTop: 50
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

})