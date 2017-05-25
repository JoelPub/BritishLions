'use strict'

import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
const borderColor = 'rgb(216, 217, 218)'

module.exports = styleSheetCreate({
    background: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#fff'
    },
    btn: {
        backgroundColor: '#fff'
    },
    fixtureBanner: {
        paddingTop: 13,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: styleVar.brandLightColor,
        android: {
            paddingTop: 7,
        }
    },
    dateText: {
        fontSize: 24,
        lineHeight: 24,
        paddingTop: 5,
        fontFamily: styleVar.fontCondensed,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        android: {
            lineHeight: 28,
            marginBottom: 15
        }
    },
    teamText:{
        fontSize: 14,
        lineHeight: 14,
        fontFamily: styleVar.fontGeorgia,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        android: {
            marginTop: -15,
            lineHeight: 18
        }
    },
    fixtureImgAtList: {
        width: styleVar.deviceWidth,
        height: 170,
        alignSelf: 'center'
    },
    fixtureImgContainerAtList: {
        width: styleVar.deviceWidth,
        height: 170
    },

    fixtureImg: {
        width: styleVar.deviceWidth,
        height: 200,
        alignSelf: 'center'
    },
    fixtureImgContainer: {
        width: styleVar.deviceWidth,
        height: 200
    },
    fixtureBannerDetail: {
        backgroundColor:'rgb(239,239,240)',
        borderBottomColor: borderColor,
        borderBottomWidth: 1
    },
    dateTextDetail: {
        color:'rgb(175,0,30)',
    },
    teamTextDetail: {
        color: styleVar.colorText,
    },
    icon:{
        color: 'rgb(175,0,30)',
        fontSize: styleVar.textFontSize,
        android: {
            paddingRight: 5
        }
    },
    pageText:{
        color: styleVar.colorText,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        fontFamily: styleVar.fontGeorgia,
        margin: 20
    },
    titleBar: {
        backgroundColor: styleVar.colorText,
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 20,
        paddingLeft: 20,
    },
    titleBarText :{
        color: '#FFF',
        fontSize: 18,
        fontFamily: styleVar.fontGeorgia,
        lineHeight: 18,
        textAlign: 'center',
        android: {
            marginTop: -2,
            lineHeight: 23,
        }
    },
    titleBarText2: {
        marginTop: 3,
        paddingBottom: 2,
        android: {
            marginTop: -1
        }
    },
    titleBarLink: {
        backgroundColor: styleVar.colorGrey,
        height: 45,
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        borderTopColor: borderColor,
        borderTopWidth: 1,
        paddingRight: 20,
        paddingLeft: 20,
        justifyContent: 'center',
    },
    titleBarLinkText: {
        color: 'rgb(175,0,30)',
        fontSize: 18,
        lineHeight: 18,
        fontFamily: styleVar.fontCondensed,
        textAlign: 'center',
        paddingTop: 9,
        android: {
            paddingTop: 0
        }
    },
    imgSponsor: {
      width: null
    },
    activityIndicatorWrapper: {
        paddingVertical: 20
    },
    titleView: {
     backgroundColor: 'black',
     height:50,
     justifyContent: 'center'
    },
    titleText: {
        fontSize: 18,
        lineHeight: 18,
        paddingTop: 8,
        fontFamily: styleVar.fontCondensed,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        android: {
            lineHeight: 28,
            marginBottom: 15
        }
    }
})
