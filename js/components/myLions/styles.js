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
    header: {
        backgroundColor: styleVar.brandPrimary,
        height: null,
        width: null,
    },
    headerBtn: {
        backgroundColor: styleVar.brandLightColor,
        marginTop: 10,
        marginBottom: 20,
        marginRight: 30,
        marginLeft: 30
    },
    headerBtnText: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        paddingTop: 14,
        android: {
            paddingTop: 6,
        }
    },
    headerContainer: {
        backgroundColor:'#af001e'
    },
    imageCircle: {
        alignSelf: 'center',
        marginTop: 10,
        android: {
            marginBottom: 10
        }
    },
    headerTitle: {
        alignSelf: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        paddingTop: 15,
        marginBottom: 5,
        backgroundColor: 'transparent',
        android: {
            paddingTop: 0,
            marginBottom: 10,
        }
    },

    headerPlayerDetails: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
        android: {
            marginBottom: 0,
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
        android: {
            marginTop: 5,
            marginBottom: 10
        }
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 25
    },
    button: {
        height: 45,
        backgroundColor: styleVar.brandLightColor,
        marginTop:19,
        marginBottom:20,
        marginLeft:30,
        marginRight:30,
    },
    btn: {
        backgroundColor: 'rgb(10, 127, 64)',
        height: 50,
        justifyContent: 'center'
    },
    btnGreen: {
        backgroundColor: 'rgb(10, 127, 64)',
    },
    btnRed: {
        backgroundColor: 'rgb(208, 7, 42)',
    },
    btnRedOff: {
        backgroundColor: styleVar.colorScarlet
    },
    btnLeft: {
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        paddingLeft: 25,
        paddingRight: 15
    },
    btnRight: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        paddingLeft: 15,
        paddingRight: 25
    },
    btnText: {
        marginTop: 10,
        fontSize: 24,
        lineHeight: 24,
        color: '#FFF',
        fontFamily: styleVar.fontCondensed,
        android: {
            marginTop: 0
        }
    },
    gridBox: {
        backgroundColor: '#FFF'
    },
    gridBoxTouchable: {
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    },
    gridBoxTouchableLeft: {
        borderRightWidth: 1,
        borderRightColor: gridBorderColor
    },
    gridBoxTouchableView: {
        alignSelf: 'stretch',
        backgroundColor: '#FFF'
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
    gridBoxDescWrapper: {        
        width: styleVar.deviceWidth / 2,
    },
    gridBoxTitle: {
        position: 'relative',
        backgroundColor: styleVar.brandLightColor,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16,
        android: {
            paddingTop: 12,
            paddingBottom: 4
        }
    },
    gridBoxTitleText: {
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop: 4,
        marginTop: -6,
        android: {
            paddingTop: 0,
            lineHeight: 30,
        }
    },
    gridBoxTitleSupportText: {
        fontSize: 16,
        fontFamily: styleVar.fontGeorgia,
        marginTop: -6,
        paddingBottom: 10,
        android: {
            marginTop: 0,
            paddingBottom: 4,
        }
    },
    playerDetails: {
        backgroundColor: '#FFFFFF'
    },
    detailsGridCol: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        borderRightWidth: 1,
        borderRightColor: gridBorderColor
    },
    detailsGridColFull: {
        borderWidth: 1,
        borderColor: gridBorderColor,
        backgroundColor: '#efeff0'
    },
    detailsNationLogo: {
        width: 80,
        height: 80
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
    playerDesc: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20
    },
    paragraph: {
        fontFamily: styleVar.fontGeorgia,
        color: styleVar.colorText,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        marginBottom: 20
    },
    btnSearchPlayer: {
        backgroundColor:'rgb(208,7,41)',
        height:50,
        width:50,
        borderRadius:50,
        position:'absolute',
        top:19,
        right:23,
        justifyContent:'center',
        alignItems:'center',
        padding:0,
        margin:0
    },
    resultRow: {
        width: styleVar.deviceWidth,
        height:135,
        marginTop:1
    },
    searchImg: {
        flex:9,
    },
    playerImg: {
        width: styleVar.deviceWidth*9/25,
    },
    resultDesc: {
        flex:16,
        backgroundColor:'rgb(208,7,41)',
        height:135
    },
    resultRowBtn: {
        flex:1,
        flexDirection:'row',
        width: styleVar.deviceWidth,
        height:135,
        marginTop:1
    },
    resultRowTitleText: {
        fontSize:24,
        lineHeight:24,
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        paddingLeft:22,
        marginTop:43,
    },
    resultRowSubtitleText: {
        fontSize:18,
        lineHeight:18,
        textAlign:'left',
        fontFamily: styleVar.fontGeorgia,
        paddingLeft:22,
        marginTop:4
    },
    searchIcon: {
        fontSize:36,
        color:'rgb(255,255,255)'
    },
    resultContainer: {
        flex:1,
        backgroundColor:'rgba(38,38,38,0.9)',
        paddingTop:20,
        android: {
            paddingTop:0
        }
    },
    searchContainer: {
        flexDirection:'row',
        height:50,
        backgroundColor:'rgb(38,38,38)'
    },
    searchBox: {
        flex:6,
        backgroundColor:'rgb(255,255,255)',
        marginBottom:5,
        marginTop:5,
        paddingBottom:0,
        marginLeft:5,
        height:40
    },
    searchInput: {
        fontSize:16,
        marginRight:5,
        color:'rgb(128,127,131)',
        paddingBottom:8,
        paddingLeft:13,
        android: {
            paddingBottom:17
        }
    },
    btnCancel: {
        paddingLeft:5,
        height:24,
        width:24,
        position:'absolute',
        right:12,
        top:12
    },
    rtnIcon: {
        fontSize:24
    },
})
