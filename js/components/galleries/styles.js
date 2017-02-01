'use strict'

import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

module.exports = styleSheetCreate({
    background: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#fff'
    },
    entryShow:{
        opacity:1
    },
    entryHide:{
        opacity:0,
        height:0
    },
    btn: {
      backgroundColor: '#FFF'
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 26,
        paddingBottom: 5,
        android: {
            fontFamily: styleVar.fontCondensed
        },
        ios: {
            paddingTop: 10
        }
    },
    galleriesImage: {
        width: null,
        height: 420 * (styleVar.deviceWidth/750)
    },
    galleriesContent: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: -2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ce1030'
    },
    galleriesHeader: {
        fontSize: 24,
        lineHeight: 22,
        paddingTop: 15,
        paddingBottom: 2,
        fontFamily: styleVar.fontCondensed,
        textAlign: 'center',
        android: {
            lineHeight: 30,
            paddingTop: 9,
            paddingBottom: 12,
        }
    },
    galleryDetailHeader: {
        backgroundColor: styleVar.colorGrey,
        borderBottomColor: styleVar.colorGrey2,
        borderBottomWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 3,
        android: {
            paddingTop: 10,
            paddingBottom: 7,
        }
    },
    galleryDetailHeaderText: {
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 24,
        fontFamily: styleVar.fontCondensed,
        color: styleVar.colorScarlet,
        android: {
            lineHeight: 30,
        },
    },
    imageBanner: {
        height: 270,
        width: styleVar.deviceWidth
    },
    shareWrapper: {
        backgroundColor: styleVar.colorGrey,
        flexDirection: 'row',
        paddingRight: 20,
        paddingLeft: 20,
        height: 45,
        alignItems: 'center',
        borderBottomColor: styleVar.colorGrey2,
        borderBottomWidth: 1,
        justifyContent: 'flex-end',
        android: {
            borderBottomWidth: 1
        }
    },
    shareLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareLinkText: {
        color: styleVar.colorScarlet,
        fontFamily: styleVar.fontCondensed,
        fontSize: 21,
        marginTop: 10,
        marginRight: 5,
        android: {
            marginTop: 0
        }
    },
    shareLinkIcon: {
        color: styleVar.colorScarlet,
        fontSize: 21
    },
    description: {
        padding: 20
    },
    paragraph: {
        fontFamily: styleVar.fontGeorgia,
        color: styleVar.colorText,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight
    },
    triangle: {
        marginTop: -11
    },
    galleryPoster: {
        backgroundColor: styleVar.colorGrey2
    },
    galleryPosterCaption:{
        color:'white',
        textAlign:'center',
        fontSize:20
    },
    swiperNumber: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,.5)',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        borderRadius: 10,
    },
    swiperNumberText: { 
        color: 'white' , 
        fontSize: 16
    }
})
