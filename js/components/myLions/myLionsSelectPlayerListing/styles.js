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
    gridBoxTouchable: {
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    },
    gridBoxTouchableView: {
        alignSelf: 'stretch',
        backgroundColor: '#FFF'
    },
    gridBoxImgWrapper: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -12,
        width: styleVar.deviceWidth / 2,
        height: styleVar.deviceWidth / 2,
    },
    gridBoxImgWrapperRight: {
        borderRightWidth: 2,
        borderRightColor: gridBorderColor
    },
    gridBoxImg: {
        backgroundColor: '#FFF',
        width: styleVar.deviceWidth / 2,
        height: styleVar.deviceWidth / 2
    },
    gridBoxTitle: {
        position: 'relative',
        backgroundColor: styleVar.brandLightColor,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 14,
        //height:styleVar.deviceWidth*0.16,
        paddingHorizontal: 1,
        android: {
            paddingTop: 12,
            paddingBottom: 6
        }
    },
    gridBoxTitleRight: {
        borderRightWidth: 1,
        borderRightColor: gridBorderColor,
    },
    gridBoxTitleText: {
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop: 4,
        marginTop: -6,
        android: {
            paddingTop: 0,
            lineHeight: 30,
        }
    },
    gridBoxTitleSupportText: {
        fontSize: 14,
        lineHeight: 14,
        fontFamily: styleVar.fontGeorgia,
        paddingBottom: 10
    },
    emptyPlayer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        minHeight: styleVar.deviceHeight-400
    },
    emptyPlayerText: {
        fontFamily: styleVar.fontGeorgia,
        color: styleVar.colorText,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
    },
    gridBoxCol:{
        backgroundColor: '#000',
        width: styleVar.deviceWidth/2,
        alignSelf: 'flex-start',
        //height: styleVar.deviceWidth/2,
        android: {
            //height: styleVar.deviceWidth/2 + 64,
        }
    },
    myLionsSharedHeader:{
        height:60,
        backgroundColor:'white',
        borderBottomColor: 'rgb(216, 217, 218)',
        borderBottomWidth: 1,
    },
    myLionsSharedHeaderText:{
        width:styleVar.deviceWidth,
        color: 'rgb(175, 0, 30)',
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        textAlign:'center',
        paddingTop:25,
        android: {
            paddingTop:20
        }
    },
    loaderPos2: {
        alignSelf: 'center',
        marginTop: 20
    },
    gridList:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
})
