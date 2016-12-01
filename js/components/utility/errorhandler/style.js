'use strict'

import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'

module.exports = styleSheetCreate({
    container: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 25,
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    entryShow: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        marginRight:5
    },
    entryHide:{
        opacity: 0
    },
    msgIcon:{
        color: styleVar.colorIcon,
        fontSize: 20,
        marginRight: 7,
        marginTop: 1
    },
    msgText:{
        fontSize: styleVar.fontSize,
        lineHeight: styleVar.lineHeight,
    }
})
