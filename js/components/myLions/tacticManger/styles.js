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

})
