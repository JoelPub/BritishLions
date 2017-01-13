'use strict'

import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from'../../themes/variable'

module.exports = styleSheetCreate({
    background: {
        flex: 1,
        width: null,
        height: null,
        position: 'relative',
        backgroundColor: styleVar.brandDarkColor
    },
    main: {
        flex: 1
    },
    content: {
        paddingBottom: 100
    },
    pageClose: {
        // backgroundColor: 'rgba(0,0,0,0.2)',
        backgroundColor: 'transparent',
        width: 49,
        height: 50,
        position: 'absolute',
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0
    },
    pageCloseIcon: {
        color: 'rgb(255, 255, 255)',
        textAlign: 'center',
        fontSize: 26,
        marginTop: -5
    },
    pageLogo: {
        marginTop: 50,
        marginBottom: 30,
        width: 240,
        height: 250,
        padding: 0,
        alignSelf: 'center'
    },
    pageTitle: {
        alignSelf: 'center',
        marginTop: 55,
        marginBottom: 10
    },
    pageTitleText: {
        fontSize: 28,
        padding: 10,
        lineHeight: 24,
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
        textAlign: 'center',
        android: {
            lineHeight: 36,
        }
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginBottom: 20,
        borderWidth: 0,
        paddingLeft: 22
    },
    googleAuthButtonView:{
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginBottom: 20,
        borderWidth: 0,
        height: 40,
        paddingTop:8
    },
    fbAuthButtonView:{
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginBottom: 20,
        borderWidth: 0,
        height: 40,
        paddingTop:8
    },
    googleAuthText:{
        alignItems: 'center',
        marginLeft:0,
        marginRight:0
    },
    fbAuthText:{
        alignItems: 'center',
        marginLeft:0,
        marginRight:0
    },
    inputIcon: {
        fontSize: 20,
        marginRight: 5
    },
    input: {
        fontSize: 16,
        padding: 0
    },
    textInputGroup: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 25,
        marginBottom: 15,
        paddingLeft: 20,
        paddingRight: 10
    },
    textInputIcon: {
        fontSize: 19,
        paddingRight: 8,
        paddingLeft: 4
    },
    textInput: {
        alignSelf: 'stretch',
        flex: 1,
        fontSize: styleVar.textFontSize,
        fontFamily: styleVar.fontGeorgia,
        height: 50,
        borderRadius: 25,
        color: '#FFF'
    },
    switchInputWrapper: {
        marginBottom: 30
    },
    switchInput: {
        alignSelf: 'flex-start',
        android: {
            marginRight: 10,
            marginTop: -1
        }
    },
    switchLabelText: {
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
        fontSize: 14,
        lineHeight: 16,
        marginTop: 6,
        android: {
            marginTop: 2,
            lineHeight: 20
        }
    },
    button: {
        height: 45,
        backgroundColor: styleVar.brandLightColor,
        marginTop: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 22,
        lineHeight: 22,
        paddingTop: 9,
        fontFamily: styleVar.fontCondensed,
        android: {
            paddingTop: 0,
        }
    },
    footer: {
        backgroundColor: styleVar.brandDarkColor,
        width: styleVar.deviceWidth,
        height: 75
    },
    footerBtn: {
        width: styleVar.deviceWidth / 2,
        height: 75,
        justifyContent: 'center',
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        android: {
            paddingTop: 0,
        }
    },
    footerBtnIcon: {
        fontSize: 24,
        color: styleVar.colorIcon,
        marginRight: 5,
        marginTop: -8,
        android: {
            marginTop: 0,
        }
    },
    footerBtnText: {
        fontSize: 18,
        lineHeight: 18,
        fontFamily: styleVar.fontCondensed
    },
    borderRight: {
        borderRightWidth: 1,
        borderRightColor: '#872f3c',
        flex: 1
    },
    closeButton: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: 49,
        height: 50,
        position: 'absolute',
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },


    // HELPER STYLES

    guther: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    textUnderline: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#FFF'
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 20
    },
    marginBottomOff: {
        marginBottom: 0
    },
    split: {
        height:1,
        borderBottomColor:'rgba(255,255,255,0.3)',
        borderBottomWidth: 1,
        marginTop:35,
        marginBottom:35,
        marginLeft:30,
        marginRight:30
    },
    tncLink: {
        paddingBottom:15,
        paddingRight:15
    }
})
