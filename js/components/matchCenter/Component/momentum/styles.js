'use strict'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import styleVar from '../../../../themes/variable'

module.exports = styleSheetCreate({
    subjectText: {
    	fontFamily: styleVar.fontCondensed,
    	color:'rgb(132,136,139)',
    	fontSize:18,
    	lineHeight:20,
    	marginTop:6,
    	marginLeft:5,
    	android: {
            marginTop:2
        }
    },
    wrapper:{
        marginTop:50,
        backgroundColor:'rgb(255,255,255)'
    },
    container:{
        paddingVertical:10,
        borderColor:'rgb(216, 217, 218)',
        minHeight:styleVar.deviceHeight-270
    },
    subjectWrapper:{
        flexDirection:'row',
        paddingLeft:20,
        alignItems:'center',
        marginBottom:15,
    },
    subWrapper:{
        flex:2,
        flexDirection:'row',
        alignItems:'center'
    },
    iconWrapper:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:10
    },
    scoreSign:{
        height:styleVar.deviceWidth*0.038,
        width:styleVar.deviceWidth*0.038,
        borderRadius:styleVar.deviceWidth*0.019,
        backgroundColor:'rgb(9,127,64)'
    },
    momentumSign:{
        height:14,
        width:28,
        backgroundColor:styleVar.colorScarlet
    },
    icon:{
        color: 'rgb(208,7,42)',
        fontSize: 28,
        lineHeight: 30,
    }
})
