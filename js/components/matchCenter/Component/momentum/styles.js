'use strict'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import styleVar from '../../../../themes/variable'

module.exports = styleSheetCreate({
    subjectText: {
    	fontFamily: styleVar.fontCondensed,
    	color:'rgb(132,136,139)',
    	fontSize:16,
    	lineHeight:18,
    	marginTop:6,
    	marginLeft:5,
    	android: {
            marginTop:2
        }
    },
})
