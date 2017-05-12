'use strict'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import { Platform } from 'react-native'
import styleVar from '../../../../themes/variable'

let timelineWrapperHeightMinus = Platform.OS === 'android'?  280 : 260

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
    	height: styleVar.deviceHeight -  timelineWrapperHeightMinus,
    	paddingHorizontal:10,
    	backgroundColor:'rgb(255,255,255)',
		//backgroundColor: 'green'
    },
    descripton:{
    	color:'rgb(38,38,38)',
		minHeight: 60,
		backgroundColor: 'transparent',
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
