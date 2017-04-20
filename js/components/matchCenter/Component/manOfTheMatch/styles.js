'use strict'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import styleVar from '../../../../themes/variable'

module.exports = styleSheetCreate({
    wrapper: {
        backgroundColor:'rgb(255,255,255)',
        marginTop: 20,
    },
    title: {
        backgroundColor: 'transparent',
        paddingTop: 20,
        paddingBottom: 6,
    },
    titleText: {
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
    desc: {
        borderWidth: 1,
        borderBottomColor: styleVar.colorGrey2,
        borderTopColor: styleVar.colorGrey2,
        padding: 20
    },
    descText: {
        fontFamily: styleVar.fontGeorgia,
        fontSize: 18,
        lineHeight: 20,
        textAlign: 'center',
        color: styleVar.colorText,
    },

    note: {
        padding: 20
    },
    noteText: {
        fontFamily: styleVar.fontGeorgia,
        fontSize: 14,
        lineHeight: 16,
        textAlign: 'center',
        color: styleVar.colorGrey3,
    },

    roundButtonBg: {
        backgroundColor: 'rgb(4, 79, 38)',
        paddingTop: 15,
        paddingBottom: 20,
    },
    roundButton: {
        alignSelf: 'center',
        height: 50,
        width: 140,
        backgroundColor: 'rgb(9, 127, 64)',
        flexDirection:'row',
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
        color: '#FFF',
    }
})
