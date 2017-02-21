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
    squadTitle:{
        color:'rgb(175,0,30)',
        marginTop:10,
        fontSize:28,
        textAlign:'center',
    },
    button: {
        height: 50,
        backgroundColor: styleVar.brandLightColor,
        marginTop: 19,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    btnExpert: {
        height:50,
        backgroundColor:'rgb(175,0,30)',
        flexDirection:'row',
        paddingTop:5,
        marginTop: 20
    },
    btnFavouritesIcon: {
        marginBottom: 5,
        color: 'rgb(255,204,40)',
        fontSize:24,
        android:{
            marginBottom: 1,
        }
    },
    btnExpertLabel: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop: 5,
        backgroundColor:'transparent',
        marginLeft: 6,
        android:{
            marginTop: -7,
        }
    },
})
