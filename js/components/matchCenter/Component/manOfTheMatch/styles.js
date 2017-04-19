'use strict'

import { styleSheetCreate } from '../../../../themes/lions-stylesheet'
import styleVar from '../../../../themes/variable'

module.exports = styleSheetCreate({
    wrapperBG: {
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'rgb(255,255,255)'
    },
    wrapper: {
        borderRadius: 5,
        backgroundColor:'rgb(255,255,255)',
        paddingTop: 5,
        paddingBottom: 15
    },
    guther: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10
    },
    title: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 21,
        lineHeight: 21,
        textAlign: 'center',
        color: styleVar.colorScarlet,
    },
    desc: {
        fontFamily: styleVar.fontGeorgia,
        fontSize: 17,
        lineHeight: 20,
        textAlign: 'center',
        color: styleVar.colorText,
    },
    noteText: {
        fontFamily: styleVar.fontGeorgia,
        fontSize: 14,
        lineHeight: 14,
        textAlign: 'center',
        color: styleVar.colorText,
    },

    roundButton: {
        height: 50,
        backgroundColor: styleVar.colorScarlet,
        flexDirection:'row',
        marginTop: 20,
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
    },
})
