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
    guther: {
        padding: 20,
        paddingTop: 0,
        backgroundColor: styleVar.colorGrey,
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
        android: {
            paddingBottom: 5
        }
    },
    mainBanner: {
        height: styleVar.deviceWidth*0.645,
        width: styleVar.deviceWidth,
        justifyContent: 'flex-end',
        backgroundColor: 'white'
    },
    btnWrapper: {
        marginTop: 30,
        paddingBottom: 10
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
        paddingBottom: 3,
        android: {
            paddingBottom: 10
        }
    },
    bannerDesc:{
        fontSize: 14,
        lineHeight: 18,
        fontFamily: styleVar.fontGeorgia,
        textAlign: 'center',
        color: '#FFF',
        paddingBottom: 12,
        marginTop: -9
    },
    bannerImg: {
        width: styleVar.deviceWidth,
        height: 200
    },

    swiper: {
        backgroundColor: '#fff'
    },
    swiperWrapper: {
        paddingBottom: 40,
        backgroundColor: styleVar.colorText,
        android: {
           paddingBottom: 0,
        }
    },
    swiperWrapperEmpty: {
        backgroundColor: '#FFF'
    },
    swiperPaginationStyle: {
        bottom: -25,
        android: {
            bottom: 18
        }
    },


    padder: {
        padding: 20
    },
    squad: {
        paddingBottom: 0,
        marginBottom: -30,
        marginTop: 0,
    },
    squadCompleted: {
        padding: 20,
        paddingBottom: 5
    },
    squadTitleText: {
        fontSize: 25,
        lineHeight: 25,
        fontFamily: styleVar.fontCondensed,
        color: '#FFF',
        textAlign: 'center'
    },
    squadCountText: {
        color: styleVar.colorYellow,
        fontSize: 36,
        lineHeight: 36,
        fontFamily: styleVar.fontCondensed,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 0
    },
    squadText: {
        fontSize: 16,
        lineHeight: 20,
        fontFamily: styleVar.fontGeorgia,
        color: '#FFF',
        textAlign: 'center'
    },
    squadText2: {
        marginTop: -10,
        paddingBottom: 20,
        android: {
            marginTop: 0
        }
    },
    squadPercentage: {
        color: styleVar.colorYellow,
        fontSize: 45,
        lineHeight: 45,
        fontFamily: styleVar.fontCondensed,
        textAlign: 'center',
        marginTop: 15
    },
    squadRating: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgb(128, 127, 131)',
        padding: 20,
        paddingBottom: 20
    },
    squadRatingText: {
        color: '#FFF',
        fontSize: 28,
        lineHeight: 28,
        fontFamily: styleVar.fontCondensed,
        textAlign: 'center',
        marginTop: 11
    },
    squadCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginHorizontal: 15,
        backgroundColor: 'rgb(255, 230, 0)',
    },
    squadCircleText: {
        backgroundColor: 'transparent',
        color: 'rgb(95, 96, 98)',
        fontSize: 36,
        lineHeight: 36,
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        marginTop: 4,
        android: {
            marginTop: -6
        }
    },
    squadIndicator: {
        padding: 20,
        paddingBottom: 0,        
        alignItems: 'center'
    }
})
