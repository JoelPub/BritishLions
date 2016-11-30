'use strict'

import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

module.exports = styleSheetCreate({
    background: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#fff'
    },
    btn: {
        backgroundColor: '#fff'
    },
    lionsTvGalleryImage: {
        width: null,
        height: 211
    },
    placeholderImage: {
        width: null,
        height: 211
    },
    lionsTvIconVid:{
        position: 'absolute',
        alignItems:'center'
    },
    lionsTvGalleryContent: {
        marginTop: -2,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 4,
        alignItems:'center',
        backgroundColor: styleVar.brandLightColor,
        android: {
            paddingBottom: 6,
            paddingTop: 0
        }
    },
    lionsTvGalleryContentDetail: {
        backgroundColor: styleVar.colorGrey
    },
    headline: {
        paddingTop: 21,
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 20,
        color: '#fff',
        android: {
            lineHeight: 30,
            paddingTop: 16
        }
    },
    headlineDetail: {
        color: styleVar.colorScarlet
    },
    lionsTVDateWrapper: {
        flexDirection:'row',
        marginBottom: 15,
        android: {
            marginBottom: 10,
        }
    },
    lionsTVDateText:{
        fontFamily: 'Georgia',
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    lionsTVDateTextDetail: {
        color: styleVar.colorText
    },
    timeIcon:{
        fontSize: 16,
        marginTop: 5,
        color: '#fff',
        textAlign: 'center',
        android: {
            marginTop: 10
        }
    },
    timeIconDetail: {
        color: styleVar.colorText
    },
    videoIcon:{
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginTop: 30
    },
    paragraph: {
        fontFamily: styleVar.fontGeorgia,
        color: styleVar.colorText,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight
    },
    description: {
        padding: 20
    },
    playerWrapper:{
        flex:1,
        height:211
    },
    youtubePlayerView: {
        flex:1,
        alignSelf: 'stretch',
        height: 211,
        backgroundColor: 'black'
    },
    posterWrapper:{
        flex:1,
        height:211,
        marginTop:-211
    },
    poster:{
        height:211
    },
    shareWrapper: {
        backgroundColor: styleVar.colorGrey,
        flexDirection: 'row',
        paddingRight: 20,
        paddingLeft: 20,
        height: 45,
        alignItems: 'center',
        borderBottomColor: styleVar.colorGrey2,
        borderBottomWidth: 1,
        justifyContent: 'flex-end',
        android: {
            borderBottomWidth: 1
        }
    },
    shareLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareLinkText: {
        color: styleVar.colorScarlet,
        fontFamily: styleVar.fontCondensed,
        fontSize: 21,
        marginTop: 10,
        android: {
            marginTop: 0
        }
    },
    shareLinkIcon: {
        color: styleVar.colorScarlet,
        fontSize: 21,
        marginLeft: 5
    }
})
