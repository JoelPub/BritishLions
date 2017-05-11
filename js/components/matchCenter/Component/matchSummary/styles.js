'use strict'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import styleVar from '../../../../themes/variable'

module.exports = styleSheetCreate({
    timeWrapper: {
    	width:50,
    	height:50,
    	backgroundColor: 'rgb(255,255,255)',
    	position:'absolute',
    	left: 1,
    	borderWidth:1,
    	borderColor:'rgb(216,217,218)',
    	borderRadius:25,
    	justifyContent:'center'
	},
    timeText:{
    	fontSize: 21,
		lineHeight: 21,
    	fontFamily:styleVar.fontCondensed,
		backgroundColor: 'transparent',
    	color:'rgb(175,0,30)',
    	textAlign: 'center',
		marginTop: 9,
		android: {
			marginTop: 3
		}
    },
    scroll:{marginTop:50},
    timelineWrapper:{
    	height:styleVar.deviceHeight-245,
    	paddingHorizontal:10,
    	backgroundColor:'rgb(255,255,255)'
    },
    descripton:{
    	color:'rgb(38,38,38)',
    	fontSize: 16,
    	lineHeight: 21,
    	fontFamily:styleVar.fontGeorgia,
    	marginLeft:20,
		marginTop: -11,
		android: {
			marginTop: -3
		}
    }

})
