'use strict'

import { StyleSheet } from 'react-native'
import { styleSheetCreate } from './lions-stylesheet'
import styleVar from './variable'

module.exports = styleSheetCreate({
    container: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#fff'
    },
    pagePoster: {
        height: (styleVar.deviceHeight / 3.4),
        width: null,
        position: 'relative'
    },
    linkWrapper: {
        backgroundColor: styleVar.colorGrey,
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 13,
        paddingBottom: 2,
        alignItems: 'center',
        borderBottomColor: styleVar.colorGrey2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopColor: styleVar.colorGrey2,
        borderTopWidth: StyleSheet.hairlineWidth,
        android: {
            paddingTop: 10,
            paddingBottom: 8,
        }
    },
    pageLinkText: {
        color: styleVar.colorScarlet,
        fontSize: 21,
        lineHeight: 23,
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        android: {
            lineHeight: 25,
        }
    },
    pageLinkIcon: {
        color: 'rgb(175,0,30)',
        fontSize: 21,
        android: {
            paddingRight: 5
        }
    },
    pageContent: {
        flexDirection: 'column',
        padding: 20,
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#ddd'
    },
    pageText: {
        fontSize: styleVar.textFontSize,
        fontFamily: styleVar.fontGeorgia,
        color: styleVar.colorText,
        lineHeight: styleVar.textLineHeight,
        marginBottom: 20
    },

    // Contact
    gridWrapper: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    label: {
        fontFamily: styleVar.fontGeorgia,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        color: styleVar.colorText
    },
    labelValue: {
        fontFamily: styleVar.fontGeorgia,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        color: styleVar.colorText,
        paddingLeft: 10
    },
    labelValueLink: {
        paddingLeft: 10
    },
    labelValueLinkText: {
        fontFamily: styleVar.fontGeorgia,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        color: styleVar.colorScarlet,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid'
    }
})
