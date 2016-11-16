'use strict'

import { styleSheetCreate } from './lions-stylesheet'
import styleVar from './variable'


module.exports = styleSheetCreate({
    centered: {
		alignItems: 'center',
		justifyContent: 'center',
		height: styleVar.deviceHeight,
		marginTop: -50
    }
})
