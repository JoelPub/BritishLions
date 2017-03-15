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
    gridBoxTouchable: {
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    },
    gridBoxTouchableView: {
        alignSelf: 'stretch',
        backgroundColor: '#FFF'
    },
    gridBoxImg: {
        backgroundColor: '#FFF',
        width: styleVar.deviceWidth / 2,
        height: styleVar.deviceWidth / 2
    },
    gridBoxImgWrapper: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -12,
        width: styleVar.deviceWidth / 2,
        height: styleVar.deviceWidth / 2,
    },
    gridBoxImgWrapperRight: {
        borderRightWidth: 2,
        borderRightColor: gridBorderColor
    },
    gridBoxTitleRight: {
        borderRightWidth: 1,
        borderRightColor: gridBorderColor,
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
    modalContent: {
        paddingHorizontal: 28,
        marginTop: 60
    },
    modalContentTitleText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: '#FFF',
        textAlign:'center',
        marginTop:28
    },
    modalContentText: {
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        lineHeight: 22,
        color: '#FFF',
        textAlign:'center',
        marginVertical:10,
        android: {
            lineHeight: 26
        }
    },
    modalContentTitleTextLeft: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: '#FFF',
        marginTop:28
    },
    modalContentTextLeft: {
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        lineHeight: 22,
        color: '#FFF',
        marginVertical:0,
        android: {
            lineHeight: 26
        }
    },
    btns: {
        paddingHorizontal: 30,
        paddingBottom:24,
        backgroundColor: 'rgb(103, 3, 20)',
    },
    manageTeam: {
        paddingTop: 30,
    },
    greenBackground: {
        backgroundColor:'rgb(3,79,38)'
    },
    loadingGif: {
        width:75,
        height:75,
        alignSelf:'center',
    }
})
