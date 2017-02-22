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
    header: {
        backgroundColor: styleVar.brandPrimary,
        height: null,
        width: null,
    },
    playerPic: {
        width: 100,
        height: 100,
        backgroundColor: 'transparent',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 5,
        borderRadius:50,
        android: {
            marginBottom: 15,
            borderRadius:100,
        }
    },
    playerPicImg: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 0,
        left: 0
    },
    playerPicCover: {
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        position: 'absolute',
    },
    headerPlayerDetails: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 5,
        android: {
            marginTop: 5,
        }
    },
    headerPlayerName: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop: 15,
        android: {
            paddingTop: 0
        }
    },
    headerPlayerPosition: {
        fontFamily: styleVar.fontGeorgia,
        fontSize: 18,
        lineHeight: 22,
        marginBottom: 8,
        android: {
            marginTop: 0,
            marginBottom: 13
        }
    },
    detailsGridCol: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        borderRightWidth: 1,
        borderRightColor: gridBorderColor,
        borderTopWidth: 1,
        borderTopColor: gridBorderColor
    },
    detailsLabel: {
        fontFamily: styleVar.fontCondensed,
        color: styleVar.colorScarlet,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight
    },
    detail: {
        fontFamily: styleVar.fontGeorgia,
        color: styleVar.colorText,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        marginTop: -5,
        textAlign: 'center',
        android: {
            marginTop: 0
        }
    },
    detailsGridColFull: {
        borderWidth: 1,
        borderColor: gridBorderColor,
    },
    detailsGridGreyBackground: {
        backgroundColor: '#efeff0'
    },
    
})
