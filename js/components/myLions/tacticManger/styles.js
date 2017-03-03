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
    backgroundColor: styleVar.colorText,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    height: 50,
  },
  headerText: {
    color: '#FFF',
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: styleVar.fontCondensed,
    marginTop:4
  },
  smallBoxContent: {
    flex: 1,
    backgroundColor: 'rgb(239,239,240)',
    paddingHorizontal:26
  },
  dropDown: {
    height: 60,
    borderRadius:1,
    borderWidth: 1,
    borderColor: 'rgb(216, 217, 218)',
    backgroundColor: 'rgb(255,255,255)',
    marginTop: 30,
    paddingHorizontal: 15,
    justifyContent: 'center',

  },
  dropDownSub: {
    flexDirection:'row',
  },
  dropDownText: {
    color: 'rgb(38, 38, 38)',
    fontSize: 18,
    lineHeight: 20,
    fontFamily: styleVar.fontGeorgia
  },
  dropDownIcon: {
    color: 'rgb(38, 38, 38)',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 24,
    height: 24,
    fontSize:24,
  },
  ValueText: {
    color: 'rgb(38, 38, 38)',
    fontSize: 24,
    lineHeight: 26,
    fontFamily: styleVar.fontCondensed,
    marginTop:30,
    textAlign:'center'
  },
  saveContainer: {
    backgroundColor: 'rgb(4,79,38)',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtn:{
    backgroundColor: 'rgb(9,127,64)',
    borderRadius:25,
    width:135,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 24,
    lineHeight: 24,
    fontFamily: styleVar.fontCondensed,
    textAlign:'center',
    width:80,
    paddingTop:15
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

})
