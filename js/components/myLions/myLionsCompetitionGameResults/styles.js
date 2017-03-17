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
    guther: {
        paddingHorizontal: 20
    },
    button: {
        height: 50,
        backgroundColor: styleVar.brandLightColor,
        marginTop: 19,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    pageTitle: {
        backgroundColor: 'transparent',
        paddingTop: 20,
        paddingBottom: 6,
        borderColor: styleVar.colorGrey2,
        borderBottomWidth: 1,
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
    pageTitleBtnIconRight: {
        position: 'absolute',
        right: 12,
        top: 16
    },
    pageTitleBtnIcon: {
        color: styleVar.colorScarlet,
        fontSize: 28,
        lineHeight: 28
    },
    backRound:{
        backgroundColor: 'rgb(38,38,38)',
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
    roundButtonImage: {
        marginBottom: 5,
        android:{
            marginBottom: 1,
        },
        width:20,
        height:31
    },
    roundButtonLabel: {
        backgroundColor: 'transparent',
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop:5,
        marginLeft: 10,
        color: '#FFF'
    },
    modalContent: {
        paddingHorizontal: 28,
        marginTop: 60
    },
    modalContentTitleText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: '#FFF'
    },
    modalContentText: {
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        lineHeight: 22,
        color: '#FFF',
        android: {
            lineHeight: 26
        }
    },
})
