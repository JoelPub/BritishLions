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
        alignItems:'center',
        paddingBottom:15,
    },
    subWrapper:{
        flex:3,
        flexDirection:'row',
        alignItems:'center',
    },
    iconWrapper:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:10
    },
    scoreSign:{
        height:styleVar.deviceWidth*0.01,
        width:styleVar.deviceWidth*0.01,
        borderRadius:styleVar.deviceWidth*0.005,
        backgroundColor:'rgb(255,204,40)',
        marginLeft:styleVar.deviceWidth*0.005
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
    },
    logoWrapper:{
        height:styleVar.deviceWidth*0.13,
        width:styleVar.deviceWidth*0.13,
        borderWidth:1,
        borderColor:'rgb(216,217,218)'
    },
    textWrapper:{
        height:styleVar.deviceWidth*0.13,
        width:styleVar.deviceWidth*0.26,
        justifyContent:'center',
        ios:{
            paddingTop:5
        }
    },
    redBgc:{backgroundColor:'rgb(175,0,30)'},
    blackBgc:{backgroundColor:'rgb(0,0,0)'},
    logoText:{
        fontSize:18,
        lineHeight:20,
        fontFamily:styleVar.fontCondensed,
        textAlign:'center'
    },
    logoImg:{
        width:styleVar.deviceWidth*0.1,
        height:styleVar.deviceWidth*0.1,
        margin:5
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
      marginBottom: 20,
      android: {
          lineHeight: 26
      }
    },
    momentumWrapper:{
        paddingBottom:50
    },
    topLine:{
        borderBottomWidth:1,
        borderColor:'rgb(216,217,218)'
    },
    bottomLine: {
        borderTopWidth:1,
        borderColor:'rgb(216,217,218)'
    },
    momentumColorGrid: {
        height:25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    momentumColorText:{
        fontFamily:styleVar.fontCondensed,
        fontSize:14,
        color:'rgb(255,255,255)',
        textAlign:'center',
        ios:{
            paddingTop:4
        }
    }


})
