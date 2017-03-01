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
    paddingBottom: 10
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: styleVar.fontGeorgia
  },
  smallBoxContent: {
    flex: 1,
    backgroundColor: 'rgb(239,239,240)',
    paddingHorizontal:26
  },
  dropDown: {
    height: 40,
    borderRadius:1,
    borderWidth: 1,
    borderColor: 'rgb(216, 217, 218)',
    backgroundColor: 'rgb(255,255,255)',
    marginTop: 30
  }
})
