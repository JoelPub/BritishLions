'use strict'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import { Platform } from 'react-native'
import styleVar from '../../../../themes/variable'

let timelineWrapperHeightMinus = Platform.OS === 'android'?  350 : 330

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
    minText:{
        fontSize: 14,
        lineHeight: 14,
        fontFamily:styleVar.fontCondensed,
        backgroundColor: 'transparent',
        color:'rgb(175,0,30)',
        textAlign: 'center',
    },
    scroll:{marginTop:50},
    timelineWrapper:{
    	height: styleVar.deviceHeight -  timelineWrapperHeightMinus,
    	paddingHorizontal:10,
    	backgroundColor:'rgb(255,255,255)',
        paddingBottom:20,
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
    },
    leftCol:{
        flex:1,
        color:'rgb(175,0,30)',
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:30,
        textAlign:'right'
    },
    midCol:{
        flex:2,
        color:'rgb(0,0,0)',
        fontFamily: styleVar.fontCondensed,
        fontSize:22,
        lineHeight:24,
        textAlign:'center'
    },
    rightCol:{
        flex:1,
        color:'rgb(175,0,30)',
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:30,
        textAlign:'left'
    },
    tabBtnWrapper:{
        flexDirection:'row',
        padding:10,
        backgroundColor:'rgb(255,255,255)',
        justifyContent:'space-between'
    },
    tabBtnPos:{
        alignItems:'center'
    },
    tabBtn:{
        width:styleVar.deviceWidth*0.44,
        height:styleVar.deviceWidth*0.133,
        borderRadius:styleVar.deviceWidth*0.08,
        justifyContent:'center'
    },
    activeBtn:{
        backgroundColor:'rgb(38,38,38)'
    },
    inactiveBtn:{
        backgroundColor:'rgb(208,7,41)'
    },
    btnText:{
        color:'rgb(255,255,255)',
        fontFamily: styleVar.fontCondensed,
        fontSize:22,
        lineHeight:24,
        textAlign:'center',
        backgroundColor:'transparent'
    },
    statWrapper:{
        paddingHorizontal:10
    },
    statEntry:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:5
    }

})
