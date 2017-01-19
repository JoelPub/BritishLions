'use strict'

import { styleSheetCreate } from './lions-stylesheet'
import styleVar from './variable'


module.exports = styleSheetCreate({
    centered: {
		alignItems: 'center',
		justifyContent: 'center',
		height: styleVar.deviceHeight,
		marginTop: -50
    },
    scoreCard: {
    	height:50,
    },
    onboarding: {
    	position:'absolute',
    	top:150,
    	left:styleVar.deviceWidth/2,
    	opacity:1
    }
})
