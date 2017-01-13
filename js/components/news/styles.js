'use strict'

import StyleSheet from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

module.exports = styleSheetCreate({
    background: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#fff'
    },
    listLink: {
        flexDirection: 'row',
        position: 'relative'
    },
    newsImage: {
        width: (styleVar.deviceWidth / 3),
        height: (styleVar.deviceHeight / 3.7)
    },
    newsContent: {
        flexDirection: 'column',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#ddd'
    },
    newsHeader: {
        color: 'rgb(175,0,30)',
        fontFamily: styleVar.fontCondensed,
        fontSize: 25,
        paddingTop: 10,
        lineHeight: 20,
        flex: 1,
        android: {
            paddingTop: 0,
            lineHeight: 30
        }
    },
    newsDateWrapper: {
        flexDirection:'row',
        marginLeft: -20,
        marginBottom: 20,
        android: {
            marginBottom: 30,
        }
    },
    newsDateWrapperInverse: {
        marginBottom: 3,
    },
    timeIcon: {
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 5,
        marginTop: 5,
        color: '#666',
        android: {
            paddingLeft: 0,
            marginLeft: 20,
            marginRight: 16,
            marginTop: 13
        }
    },
    timeIconInverse: {
        marginLeft:20,
        marginBottom:15,
        android: {
            paddingLeft: 20,
            marginLeft: 20
        }
    },
    newsDateText: {
        fontFamily: 'Georgia',
        fontSize: 14,
        color: 'rgb(95,96,98)',
        android: {
            marginLeft: -15,
            marginTop: 3
        }
    },
    newsDateTextInverse: {
        color: '#fff'
    },

    nation: {
        position: 'absolute',
        left: 0,
        top: 13,
        height: 20,
        paddingLeft: 3,
        paddingRight: 3,
        backgroundColor: styleVar.brandLightColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nationText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 13,
        lineHeight: 16,
        android: {
            marginTop: -1
        }
    },
    nation2: {
        position: 'absolute',
        left: 0,
        top: 13,
        height: 26,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: styleVar.brandLightColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nationText2: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 16,
        lineHeight: 16,
        android: {
            marginTop: -3
        }
    },
    bannerWrapper: {
        height: 270,
        width: styleVar.deviceWidth
    },
    banner: {
        height: 270,
        justifyContent: 'flex-end'
    },
    newsPosterHeader: {
        fontFamily: styleVar.fontCondensed,
        color: 'rgb(175,0,30)',
        fontSize: 31,
        lineHeight: 25,
        paddingTop: 9,
        marginTop:15,
        marginBottom: -5,
        marginRight:20,
        marginLeft:20,
        backgroundColor: 'transparent',
        android: {
            marginBottom: 0,
            lineHeight: 38,
            paddingTop: 0
        }
    },
    newsPosterContent: {
        width: styleVar.deviceWidth,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingLeft: 20,
        paddingBottom: 15,
        paddingRight: 20,
        backgroundColor: 'transparent',
        android: {
            paddingBottom: 10
        }
    },
    shareWrapper: {
        backgroundColor: 'rgb(239, 239, 240)',
        flexDirection: 'row',
        paddingRight: 20,
        paddingLeft: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottomColor: 'rgb(216, 217, 218)',
        borderBottomWidth: 1,
        android: {
            borderBottomWidth: StyleSheet.hairlineWidth
        }
    },
    author: {
        color: styleVar.colorText,
        flex: 1,
        fontFamily: styleVar.fontGeorgia,
        fontSize: 18,
    },
    shareLink: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    shareLinkText: {
        color: styleVar.colorScarlet,
        fontFamily: styleVar.fontCondensed,
        fontSize: 21,
        marginTop: 10,
        android: {
            marginTop: 0
        }
    },
    shareLinkIcon: {
        color: styleVar.colorScarlet,
        fontSize: 21,
        marginLeft: 5
    },
    content: {
        padding: 20,
        paddingBottom: 40
    },
    paginateButton: {
        marginTop: 40
    }
})
