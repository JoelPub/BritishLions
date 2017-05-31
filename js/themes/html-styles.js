'use strict'

import { styleSheetCreate } from './lions-stylesheet'
import styleVar from './variable'

module.exports = styleSheetCreate({
    body: {
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        fontFamily: styleVar.fontGeorgia,
        margin: 0,
        padding: 0
    },

    a: {
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        fontFamily: styleVar.fontGeorgia,
        color: styleVar.colorScarlet
    },

    strong: {
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        fontFamily: styleVar.fontGeorgia,
        color: styleVar.colorText
    },

    p: {
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        fontFamily: styleVar.fontGeorgia,
        margin: 0,
        marginBottom: 20,
        padding: 0,
        color: styleVar.colorText
    },

    blockquote: {
        padding: 20,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        fontFamily: styleVar.fontGeorgia,
        borderWidth: 10,
        borderColor: 'red',
        color: styleVar.colorText
    },

    ul: {
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight
    },

    li: {
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        fontFamily: styleVar.fontGeorgia,
        color: styleVar.colorText
    }

})
