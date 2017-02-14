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
    pageTitle: {
        backgroundColor: 'transparent',
        paddingTop: 20,
        paddingBottom: 6,
    },
    pageTitleText: {
        alignSelf: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: styleVar.colorScarlet,
        backgroundColor: 'transparent',
        textAlign:'center',
    },
    mainBanner: {
        height: styleVar.deviceWidth,
        width: styleVar.deviceWidth,
        justifyContent: 'flex-end',
        backgroundColor: 'white'
    },
    btnWrapper: {
        backgroundColor: styleVar.colorGrey,
        padding: 30
    },
    roundButton: {
        height: 50,
        backgroundColor: styleVar.colorScarlet,
        flexDirection:'row',
        marginTop: 0,
        marginBottom: 0,
        paddingTop:5,
        android:{
            paddingTop: 0,
        }
    },
    roundButtonIcon: {
        marginBottom: 5,
        color: 'rgb(255,204,40)',
        fontSize:24,
        android:{
            marginBottom: 1,
        }
    },
    roundButtonLabel: {
        backgroundColor: 'transparent',
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop:5,
        marginLeft: 5,
        color: '#FFF'
    },
    btnMysquad: {
        backgroundColor: styleVar.brandLightColor,
        height:100,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    btnMysquadIcon: {
        width:34,
        height:52
    },
    btnMysquadLabel: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 44,
        lineHeight: 44,
        marginTop: 21,
        marginLeft: 14,
        color: '#FFF',
        android: {
            marginTop: 11,
        }
    },

    



    banner: {
        backgroundColor: '#fff'
    },
    bannerDetails: {
        paddingTop: 13,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: styleVar.brandLightColor
    },
    bannerTitle: {
        fontSize: 24,
        lineHeight: 24,
        fontFamily: styleVar.fontCondensed,
        textAlign: 'center',
        color: '#FFF',
        paddingBottom: 3
    },
    bannerDesc:{
        fontSize: 14,
        lineHeight: 18,
        fontFamily: styleVar.fontGeorgia,
        textAlign: 'center',
        color: '#FFF',
        paddingBottom: 11,
        marginTop: -5
    },
    bannerImg: {
        width: styleVar.deviceWidth,
        height: 200
    },

    swiperWrapper: {
        paddingBottom: 40,
        backgroundColor: styleVar.colorText,
    },
    swiperPaginationStyle: {
        bottom: -25
    },
    pagination: {
        backgroundColor: styleVar.colorText,
        height: 50
    }
})
