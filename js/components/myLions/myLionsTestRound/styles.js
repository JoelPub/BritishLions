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
    headerTitle: {
        alignSelf: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        paddingTop: 15,
        marginBottom: 5,
        backgroundColor: 'transparent',
        android: {
            paddingTop: 12,
            marginBottom: 15,
        }
    },
    btn: {
        backgroundColor: 'rgb(10, 127, 64)',
        height: 50,
        justifyContent: 'center'
    },
    btnGreen: {
        backgroundColor: 'rgb(10, 127, 64)',
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
    squadTitle:{
        color:'rgb(175,0,30)',
        marginTop:10,
        fontSize:28,
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
    wrapper:{
        backgroundColor: 'rgb(4, 79, 38)',
        paddingVertical:styleVar.deviceWidth*0.06,
    }, 
    btnSave: {
        backgroundColor: 'rgb(10, 127, 64)',
        height: styleVar.deviceWidth*0.13,
        width: styleVar.deviceWidth*0.5,
        marginHorizontal: styleVar.deviceWidth*0.25,
        justifyContent: 'center'
    },
})
