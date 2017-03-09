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
  groupAction:{
    paddingBottom:30,
    backgroundColor:'rgb(255,255,255)',
    borderTopWidth:1,
    borderTopColor:'rgb(216,217,218)'
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
  btnFavouritesIcon: {
    marginBottom: 5,
    color: 'rgb(255,204,40)',
    fontSize:24,
    android:{
      marginBottom: 1,
    }
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
    android: {
      lineHeight: 26
    }
  },
  modlaBtnConfirm: {
    backgroundColor:'rgb(38,38,38)'
  },
  btnConfirmRed: {
    backgroundColor:'rgb(208,7,41)',
  }
})