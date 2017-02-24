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
    btn: {
        backgroundColor: 'rgb(10, 127, 64)',
        height: 50,
        width:100,
        justifyContent: 'center'
    },
    btnGreen: {
        backgroundColor: 'rgb(10, 127, 64)',
        //paddingLeft: 40,
        //paddingRight: 30
    },
    btnText: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 24,
        lineHeight: 24,
        color: '#FFF',
        fontFamily: styleVar.fontCondensed,
        android: {
            marginTop: 4
        }
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
})