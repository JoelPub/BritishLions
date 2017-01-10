'use strict'

import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

const gridBorderColor = 'rgb(216, 217, 218)'

module.exports = styleSheetCreate({
    container: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#fff'
    },
    content: {
        paddingBottom: 40
    },
    gridBoxTouchable: {
        alignSelf: 'stretch',
        width: styleVar.deviceWidth / 2
    },
    gridBoxTouchableLeft: {
        borderRightWidth: 1,
        borderRightColor: gridBorderColor
    },
    gridBoxTouchableView: {
        alignSelf: 'stretch'
    },
    gridBoxImgWrapper: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -12,
        width: styleVar.deviceWidth / 2,
        height: styleVar.deviceWidth / 2
    },
    gridBoxImg: {
        width: styleVar.deviceWidth / 2 - 1,
        height: styleVar.deviceWidth / 2,
    },
    gridBoxImgWithPadding: {
        width: 80,
        height: 80,
    },
    tier: {
        backgroundColor: styleVar.colorGrey,
        paddingTop: 15,
        paddingBottom: 5,
        android: {
            paddingTop: 10,
            paddingBottom: 10
        }
    },
    tierTitle: {
        color: styleVar.colorScarlet,
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        textAlign: 'center',
        android: {
            lineHeight: 30
        }
    },
    gridBoxTitle: {
        position: 'relative',
        backgroundColor: styleVar.brandLightColor,
        justifyContent: 'center',
        paddingTop: 16,
        android: {
            paddingTop: 8,
            paddingBottom: 4
        }
    },
    gridBoxTitleText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 16,
        lineHeight: 16,
        textAlign: 'center',
        paddingTop: 4,
        marginTop: -6,
        paddingBottom: 4,
        android: {
            lineHeight: 22
        }
    },
    gridBoxTitleSupportText: {
        fontSize: 16,
        fontFamily: styleVar.fontGeorgia,
        marginTop: -6,
        paddingBottom: 10,
        android: {
            marginTop: 0,
            paddingBottom: 0,
        }
    },
    wrapper: {
        backgroundColor: 'rgb(239, 239, 240)',
        paddingTop: 15,
        paddingBottom: 4,
        paddingLeft: 20,
        paddingRight: 20,
        borderTopWidth: 1,
        borderTopColor: gridBorderColor,
        borderBottomWidth: 1,
        borderBottomColor: gridBorderColor,
        android: {
            paddingTop: 8,
            paddingBottom: 8
        }
    },
    wrapperTitle: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        color: styleVar.colorScarlet,
        textAlign: 'center',
        android: {
            lineHeight: 30
        }
    },
    wrapperPartner: {
        fontSize: 14,
        lineHeight: 14,
        fontFamily: styleVar.fontGeorgia,
        color: styleVar.colorText,
        textAlign: 'center',
        paddingBottom: 10,
        android: {
            paddingBottom: 3,
            marginTop: 2
        }
    },
    wrapperIcon: {
        fontSize: 24,
        lineHeight: 24,
        color: styleVar.colorScarlet,
        textAlign: 'center'
    },
    shareLinkWrapper: {
        backgroundColor: 'rgb(239, 239, 240)',
        padding: 5,
        borderTopWidth: 1,
        borderTopColor: gridBorderColor,
        borderBottomWidth: 1,
        borderBottomColor: gridBorderColor,
        android: {
            paddingBottom: 8
        }
    },
    shareLink: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    shareLinkText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 20,
        lineHeight: 20,
        color: styleVar.colorScarlet,
        marginTop: 11,
        textAlign: 'center',
        android: {
            marginTop: 5,
            lineHeight: 28
        }
    },
    shareLinkIcon: {
        fontSize: 17,
        lineHeight: 17,
        color: styleVar.colorScarlet,
        marginTop: 3
    },
    banner: {
        height: 187,
        alignSelf: 'center'
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
    paginateButton: {
        marginTop: 40
    }
})
