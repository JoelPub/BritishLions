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
    viewCircle: {
        alignSelf: 'center',
        marginTop: 10,
        width:100,
        height:100,
        borderRadius:50,
        backgroundColor: '#fff',
        android: {
            marginBottom: 10,
            borderRadius:100,
        }
    },
    imageTitle: {
        alignSelf: 'center',
        width:46,
        height:69,
        marginTop: 17,
    },
    imageCircle: {
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 5,
        width:100,
        height:100,
        borderRadius:50,
        android: {
            marginBottom: 15,
            borderRadius:100,
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
        marginBottom: 15,
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
            marginTop: 0,
            marginBottom: 15
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
    btnonBoardSquard:{
        marginTop:29,
        marginBottom:0,
    },
    btn: {
        backgroundColor: 'rgb(10, 127, 64)',
        height: 50,
        justifyContent: 'center'
    },
    btnGreen: {
        backgroundColor: 'rgb(10, 127, 64)',
    },
    btnLeftRed: {
        backgroundColor: 'rgb(175, 0, 30)',
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
        height: styleVar.deviceWidth / 2,
    },
    gridBoxImgWrapperRight: {
        borderRightWidth: 2,
        borderRightColor: gridBorderColor
    },
    gridBoxImg: {
        backgroundColor: '#FFF',
        width: styleVar.deviceWidth / 2,
        height: styleVar.deviceWidth / 2
    },
    gridBoxImgWithPadding: {
        width: 80,
        height: 80,
    },
    gridBoxDesc: {
        width: styleVar.deviceWidth / 2,
        marginTop:-12
    },
    gridBoxDescWrapper: {
        width: styleVar.deviceWidth / 2
    },
    gridBoxTitle: {
        position: 'relative',
        backgroundColor: styleVar.brandLightColor,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 14,
        //height:styleVar.deviceWidth*0.16,
        android: {
            paddingTop: 12,
            paddingBottom: 6
        }
    },
    gridBoxTitleRight: {
        borderRightWidth: 1,
        borderRightColor: gridBorderColor
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
        fontSize: 14,
        lineHeight: 14,
        fontFamily: styleVar.fontGeorgia,
        paddingBottom: 10
    },
    playerDetails: {
        backgroundColor: '#FFFFFF'
    },
    detailsGridCol: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        borderRightWidth: 1,
        borderRightColor: gridBorderColor,
        borderTopWidth: 1,
        borderTopColor: gridBorderColor
    },
    detailsGridColFull: {
        borderWidth: 1,
        borderColor: gridBorderColor,
    },
    detailsGridGreyBackground: {
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
        paddingBottom: 20,
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
        top:15,
        right:23,
        justifyContent:'center',
        alignItems:'center',
        padding:0,
        margin:0
    },
    resultRow: {
        width: styleVar.deviceWidth,
        height:styleVar.deviceWidth*9/25,
        marginTop:1
    },
    searchImg: {
        flex:9,
    },
    playerImg: {
        backgroundColor: '#FFF',
        width: styleVar.deviceWidth*9/25,
        height: styleVar.deviceWidth*9/25,
    },
    resultDesc: {
        flex:16,
        backgroundColor:'rgb(208,7,41)',
        height:styleVar.deviceWidth*9/25
    },
    resultRowBtn: {
        flex:1,
        flexDirection:'row',
        width: styleVar.deviceWidth,
        height:styleVar.deviceWidth*9/25,
        marginTop:1
    },
    resultRowTitleText: {
        fontSize:24,
        lineHeight:26,
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        paddingLeft:22,
        marginTop:43,
    },
    resultRowSubtitleText: {
        fontSize:18,
        lineHeight:21,
        textAlign:'left',
        fontFamily: styleVar.fontGeorgia,
        paddingLeft:22,
        marginTop:4
    },
    searchIcon: {
        fontSize:36,
        color:'rgb(255,255,255)',
        android:{
            marginBottom:3,
        }
    },
    resultContainer: {
        flex: 1,
        backgroundColor:'rgba(38,38,38,0.9)'
    },
    resultHeader: {
        height: 68,
        android:{
            height: 48,
        }
    },
    resultContent: {
        flex: 1
    },
    searchContainer: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: 'rgb(38,38,38)'
        //backgroundColor: '#CCC'
    },
    searchBox: {
        flex: 1
    },
    searchBtnBox: {
        width: 45
    },
    searchInput: {
        fontSize:16,
        height: 40,
        margin: 5,
        marginBottom: 3,
        marginRight: 0,
        color:'rgb(128,127,131)',
        backgroundColor:'rgb(255,255,255)',   
    },
    btnCancel: {
        height: 48,
        width: 45,
        justifyContent: 'center'
    },
    rtnIcon: {
        fontSize: 24,
        alignSelf: 'center'
    },
    mylionsBanner: {
        height: styleVar.deviceWidth,
        width:styleVar.deviceWidth,
        justifyContent: 'flex-end',
        backgroundColor:'white'
    },
    btnMysquad: {
        height:100,
        flexDirection:'row',
        marginTop:40,
        paddingTop:5,
    },
    btnMysquadIcon: {
        justifyContent:'flex-start',
        width:34,
        height:52
    },
    btnMysquadLabel: {
        textAlign:'left',
        marginLeft:14,
        fontFamily: styleVar.fontCondensed,
        fontSize: 44,
        lineHeight: 44,
        paddingTop:10
    },
    btnExpert: {
        backgroundColor:'rgb(38,38,38)',
        flexDirection:'row',
        marginTop:10,
        paddingTop:5,
    },
    btnExpertSquad: {
        backgroundColor:'rgb(38,38,38)',
        flexDirection:'row',
        marginTop:20,
        marginBottom:0,
        marginLeft:10,
        marginRight:10
    },
    btnExpertIcon: {
        marginBottom: 5,
        width: 24,
        color: 'rgb(175,0,30)',
        fontSize:24,
        android:{
            marginBottom: 2,
        }
    },
    btnExpertLabel: {
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop:5
    },
    btnFavourites: {
        backgroundColor:'rgb(128,127,131)',
        flexDirection:'row',
        marginTop:10,
        marginBottom:40,
        paddingTop:5,
    },
    btnFavouritesIcon: {
        marginBottom: 5,
        width: 24,
        color: 'rgb(255,204,40)',
        fontSize:24,
        android:{
            marginBottom: 2,
        }
    },
    btnFavouritesLabel: {
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop:5,
    },
    onboarding: {
        flex:1,
        marginTop:20,
        android: {
            marginTop:0
        }
    },
    onboardingContent:{
        marginTop:50
    },
    btnClose: {
        backgroundColor:'rgb(130,4,23)',
        width:50,
        height:49,
        position:'absolute',
        right: 0,
        top: 0,
        paddingTop:10,
        android: {
            top:0
        }
    },
    btnCloseIcon: {
        fontSize:24,
        textAlign:'center'
    },
    onboardingTitle: {
        marginTop:21,
        textAlign:'center',
        fontSize:28,
        fontFamily: styleVar.fontCondensed,
        backgroundColor:'transparent',
        lineHeight:28,
    },
    onboardingPage: {
        paddingLeft:28,
        paddingRight:27,
    },
    onboardingPageText: {
        fontFamily: 'Helvetica Neue',
        fontSize:16,
        paddingTop:14,
        textAlign:'center'
    },
    btnSkipLeft: {
        height: 50,
        width:styleVar.deviceWidth*0.35,
        backgroundColor: 'rgb(38,38,38)',
    },
    btnBack: {
        height: 50,
        width:styleVar.deviceWidth*0.35,
        backgroundColor: 'rgb(175,0,30)',
    },
    btnSkipRight: {
        height: 50,
        width:styleVar.deviceWidth*0.35,
        backgroundColor: 'rgb(38,38,38)',
    },
    btnNext: {
        height: 50,
        width:styleVar.deviceWidth*0.35,
        backgroundColor: styleVar.brandLightColor,
    },
    gridBoxCol:{
        width: styleVar.deviceWidth/2,
        height: styleVar.deviceWidth/2 + 65,
        android: {
            height: styleVar.deviceWidth/2 + 64,
        }
    },
    gridList:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    myLionsSharedHeader:{
        height:60,
        backgroundColor:'white',
        borderBottomColor: 'rgb(216, 217, 218)',
        borderBottomWidth: 1,
    },
    myLionsSharedHeaderText:{
        width:styleVar.deviceWidth,
        color: 'rgb(175, 0, 30)',
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        textAlign:'center',
        paddingTop:25,
        android: {
            paddingTop:20
        }
    },

    unionsPlayerListingBar:{
        height:80,
        backgroundColor:'white',
        borderBottomColor: 'rgb(216, 217, 218)',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    unionsPlayerListingSearchButton:{
        left:43,
        width:132,
        height:50,
        backgroundColor: 'rgb(208, 7, 41)',
        marginTop:14,
        borderRadius:25,
    },
    unionsPlayerListingFilterByBar:{
        height:80,
        width:styleVar.deviceWidth,
        alignSelf: 'center',
        alignItems: 'center',
        borderBottomColor: 'rgb(216, 217, 218)',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    unionsPlayerListingFilterByCancelButton:{
        width:28,
        height:28,
        alignSelf: 'center',
        android:{
            paddingTop:2,
        }
    },
    btnFilterCancelIcon:{
        fontSize:20,
        width:20,
        height:20,
        textAlign:'center',
        alignSelf: 'center',
        color:'rgb(208, 7, 41)',
    },
    unionsPlayerListingSearchText:{
        alignSelf: 'center',
        color:'white',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        paddingTop: 17,
        android:{
            paddingTop: 13,
        }
    },
    unionsPlayerListingFilterTextView:{
        alignSelf:'center',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'center',
        height:30,
        width:styleVar.deviceWidth
    },
    unionsPlayerListingFilterByText:{
        textAlign: 'center',
        color:'rgb(38, 38, 38)',
        fontFamily: 'Helvetica Neue',
        fontSize: 18,
        height:30
    },
    unionsPlayerListingFilterButton:{
        right:43,
        width:132,
        height:50,
        backgroundColor: 'rgb(95, 96, 98)',
        marginTop:14,
        borderRadius:25,

    },
    unionsPlayerListingFilterText:{
        alignSelf: 'center',
        color:'white',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        paddingTop: 17,
        android:{
            paddingTop: 13,
        }
    },
    unionsPlayerEmptySearchTitle:{
        paddingTop:37,
        fontSize: 28,
        textAlign:'center',
        fontFamily: styleVar.fontCondensed,
        width:styleVar.deviceWidth,
        backgroundColor: 'transparent',
        color:'white'
    },
    unionsPlayerEmptySearchSubTitle:{
        fontSize: 16,
        paddingTop:14,
        fontFamily: 'Helvetica Neue',
        textAlign:'center',
        width:styleVar.deviceWidth,
        backgroundColor: 'transparent',
        color:'white'
    },
    unionsPlayerEmptySearchMsg:{
        height:100,
        backgroundColor: 'transparent'
    },
    filterContainer: {
        backgroundColor: styleVar.brandPrimary,
        width: null,
        height: styleVar.deviceHeight
    },
    filterResultContainer:{
        flex:1,
        backgroundColor:'transparent',
    },
    filterContent: {
        flex:1,
    },
    filterTitle: {
        marginTop: 35,
        paddingTop:40,
        fontSize: 28,
        textAlign:'center',
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
        color:'white'
    },
     filterSubTitle:{
        fontSize: 21,
        alignSelf:'center',
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
        color:'white'
    },
    filterSubTitleLeft: {
        marginRight: -20
    },
    filterSubTitleRight: {
        marginLeft: -30
    },
    filterBtns:{
        paddingTop:31,
        flexDirection: 'row'
    },
    filterBtnsGroup:{
        width:styleVar.deviceWidth/2,
    },
    btnFilter:{
        width:142,
        height:50,
        backgroundColor: 'rgb(208, 7, 42)',
        paddingTop:14,
        borderRadius:25,
        marginTop:20
    },
    btnFilterActive:{
        width: 142,
        height: 50,
        backgroundColor: 'rgba(208, 7, 42, 0.5)',
        paddingTop:14,
        borderRadius:25,
        marginTop:20
    },
    btnFilterLeft: {
        alignSelf: 'flex-end',
        marginRight: 10
    },
    btnFilterRight: {
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    btnFilterTxt:{
        alignSelf: 'center',
        color:'white',
        fontFamily: styleVar.fontCondensed,
        fontSize: 21,
        paddingTop: 3,
        android:{
            marginTop: -4
        }
    },
    squadTitle:{
        color:'rgb(175,0,30)',
        marginTop:10,
        fontSize:28
    },
    scoreCard:{
        marginVertical:2,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'rgb(216,217,218)',
        padding:20,
    },
    semiCard:{
        paddingTop:29,
        marginBottom:10,
        backgroundColor:'rgb(95,96,98)',
        borderRadius:5,
    },
    semiCardText:{
        fontFamily: styleVar.fontGeorgia,
        fontSize:18,
        lineHeight:24,
        paddingHorizontal:20,
        marginBottom:24,
        textAlign:'center'
    },
    semiCardFooter:{
        flexDirection: 'row',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        backgroundColor:'rgb(128,128,128)',
        height:50,
        paddingBottom:9,
        paddingRight:11,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
    },
    semiCardFooterText:{
        fontFamily: styleVar.fontGeorgia,
        fontSize:13,
        marginRight:5
    },
    fullCard:{
        marginTop:3,
        backgroundColor:'rgb(95,96,98)',
        borderRadius:5,
    },
    btnCardInfo:{
        height:24,
        width:24,
        borderRadius:12,
        backgroundColor:'rgb(255,255,255)',
        position:'absolute',
        right:5,
        top:5
    },
    cardInfoIcon:{
        fontSize:24,
        textAlign:'center',
        color:'rgb(95,96,98)',
        backgroundColor:'transparent'
    },
    summaryWrapper:{
        paddingHorizontal:30,
        marginVertical:30,
    },
    summaryText:{
        fontFamily: styleVar.fontGeorgia,
        fontSize:18,
        textAlign:'center',
        lineHeight:18,
        flex:1,
        marginBottom:10,
    },
    performanceText:{
        fontFamily: styleVar.fontCondensed,
        fontSize:18,
        textAlign:'center',
        lineHeight:18,
        flex:1,
        marginBottom:10,
    },
    summaryTextHighLight:{
        fontFamily: styleVar.fontCondensed,
        fontSize:44,
        lineHeight:44,
        textAlign:'center',
        color:'rgb(255,230,0)',
        flex:1,
    },
    ratingWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderTopWidth:1,
        borderColor:'rgb(128,127,131)',
        marginTop:20,
        paddingVertical:19
    },
    expertRatingWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'rgb(216,217,218)',
        marginTop:5,
        paddingVertical:19
    },
    ratingTitle:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:32,
        paddingTop:10,
    },
    ratingScore:{
        marginLeft:10,
        height:70,
        width:70,
        borderRadius:35,
        backgroundColor:'rgb(255,230,0)',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
    },
    ratingScorePoint:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:28,
        color:'rgb(95,96,98)'
    },
    barGraphWrapper:{
        height:105,
        borderTopWidth:1,
        borderColor:'rgb(128,127,131)',
        paddingHorizontal:25,
        paddingTop:15
    },
    barGraphText:{
        fontFamily: styleVar.fontCondensed,
        fontSize:18,
        textAlign:'left'
    },
    barSliderWrapper:{
        height:90
    },
    barSliderTextWrapper:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between',
        borderTopWidth:1,
        borderColor:'rgb(128,127,131)',
        paddingHorizontal:25,
        alignItems:'flex-end',
    },
    barSliderText:{
        fontFamily: styleVar.fontCondensed,
        fontSize:18,
        lineHeight:18,
    },
    scoreCardShareWrapper:{
        borderTopWidth:1,
        borderColor:'rgb(216,217,218)',
        marginTop:30,
        paddingVertical:5
    },
    scoreCardShare:{
        backgroundColor:'rgb(255,230,0)',
        flexDirection:'row',
        paddingLeft:20
    },
    scoreCardShareText:{
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        color: 'rgb(95,96,98)',
        paddingTop:5
    },
    scoreCardShareIcon:{
        marginLeft: 5,
        width: 34,
        color: 'rgb(95,96,98)',
        fontSize:24
    },
    scoreCardFooter:{
        backgroundColor:'rgb(128,128,128)',
        height:50,
        alignItems:'flex-end',
        padding:10
    },
    scoreCardFooterImg:{
        height:30,
        width:29
    },
    individaulPositionRow:{
        flexDirection:'row'
    },
    indivPosition:{
        width:styleVar.deviceWidth/3,
        backgroundColor:'rgb(255,255,255)',
        paddingLeft:1
    },
    indivPosTitle:{
        borderTopWidth:1,
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderColor:'rgb(216,217,218)',
        height:50,
        paddingTop:17,
        backgroundColor:'rgb(239,239,240)'
    },
    indivPosTitleText:{
        color:'rgb(175,0,30)',
        textAlign:'center',
        fontFamily: styleVar.fontCondensed,
        fontSize:24,
        lineHeight:24,
    },
    addIndivPlayerWrapper:{
        width:styleVar.deviceWidth / 3,
        height:styleVar.deviceWidth / 3,
        backgroundColor:'rgb(175,0,30)',
        justifyContent:'center',
        alignItems:'center'
    },
    addPlayerIcon:{
        fontSize:60,
        color:'rgb(255,255,255)'
    },
    indivPlayerNameWrapper:{
        width: styleVar.deviceWidth / 3,
        marginTop:-12
    },
    playerNameText:{
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 18,
        lineHeight: 18,
        paddingTop: 4,
        marginTop: -6
    },
    playerImage:{
        backgroundColor: '#FFF',
        width: styleVar.deviceWidth / 3,
        height: styleVar.deviceWidth / 3
    },
    playerNameTextWrapper:{
        width: styleVar.deviceWidth / 3,
        marginTop:-12,
        borderLeftWidth:1,
        borderColor:'rgb(255,255,255)'
    },
    posTitle:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:styleVar.deviceWidth,
        borderWidth:1,
        borderColor:'rgb(216,217,218)',
        height:50,
        padding:12,
        backgroundColor:'rgb(239,239,240)'
    },
    posTitleLeft:{
        color:'rgb(175,0,30)',
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize:24,
        lineHeight:24,
    },
    posTitleRight:{
        color:'rgb(175,0,30)',
        textAlign:'right',
        fontFamily: styleVar.fontCondensed,
        fontSize:24,
        lineHeight:24,
    },
    posSwiperRow:{
        flexDirection:'row',
        backgroundColor:'black',
        height:styleVar.deviceWidth*0.63
    },
    posWrapper:{
        width:styleVar.deviceWidth/3
    },
    posAddWrapper:{
        width:styleVar.deviceWidth / 3,
        height:styleVar.deviceWidth / 3,
        backgroundColor:'rgb(175,0,30)',
        justifyContent:'center',
        alignItems:'center',
        borderLeftWidth:1,
        borderColor:'rgb(255,255,255)'
    },
    posAddTextWrapper:{
        width: styleVar.deviceWidth / 3,
        marginTop:-12,
        borderLeftWidth:1,
        borderColor:'rgb(255,255,255)'
    },
    modalViewWrapper:{
        paddingHorizontal:28,
        marginVertical:54,
        backgroundColor:'transparent',
    },
    modalTitleText:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:28,
        marginTop:28
    },
    modalText:{
        fontFamily: styleVar.fontGeorgia,
        fontSize:16,
    },
    modalTextHN:{
        fontFamily: 'Helvetica Neue',
        fontSize:16,
    },
    modalUpdateView:{
        height:styleVar.deviceHeight-200,
    },
    modalTitleTextCenter:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:28,
        marginTop:28,
        textAlign:'center'
    },
    modalTextCenter:{
        fontFamily: 'Helvetica Neue',
        fontSize:16,
        textAlign:'center'
    },
    modalBtnWrapper:{
        marginTop:15,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    modlaBtnCancel:{
        height: 50,
        width: styleVar.deviceWidth / 3,
        backgroundColor: 'rgb(38,38,38)',
    },
    modlaBtnConfirm:{
        height: 50,
        width: styleVar.deviceWidth / 3,
        backgroundColor: styleVar.brandLightColor,
    },
    imgExpertHeader: {
        width: (styleVar.deviceWidth / 3),
        height: (styleVar.deviceHeight / 3.7)
    },
    cellExpert: {
        flexDirection: 'row'
    },
    cellExpertInfo: {
        backgroundColor: '#D00729',
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
    },
    textName: {
        fontSize: 24,
        color: 'white',
        width: 187,
        lineHeight: 24,
        paddingTop: 4,
        marginTop: 10,
        fontFamily: styleVar.fontCondensed,
    },
    textDescription: {
        fontSize: 18,
        fontFamily: styleVar.fontGeorgia,
        color: 'white',
        width: 50,
        lineHeight: 42,
        marginTop: 15,
    },
    textRating: {
        fontSize: 18,
        color: 'white',
        fontFamily: styleVar.fontCondensed,
        marginTop: 15,
    },
    viewExpertHeader: {
        height: null,
        width: null,
        alignItems: 'center'
    },
    viewExpertHeaderImage: {
        marginTop: 15,
        width: 100,
        height: 100,
        borderRadius:50,
        overflow: 'hidden',
    },
    viewExpertProfileName: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop: 15,
        width: 121,
        android: {
            paddingTop: 0
        }
    },
    viewExpertProfileDescription: {
        fontFamily: styleVar.fontGeorgia,
        fontSize: 18,
        width: 226,
        textAlign:'center',
        android: {
            marginTop: 5,
            marginBottom: 10
        }
    },
    modalBtnPosition:{
        height: 45,
        backgroundColor: 'transparent',
        marginTop:19,
        marginBottom:0,
        flexDirection:'row',
        flex:1
    },
    modalBtnPositionLeft:{
        height:45,
        backgroundColor: 'rgba(38,38,38,0.2)',
        borderTopLeftRadius:22.5,
        borderBottomLeftRadius:22.5,
        flex:3,
        justifyContent:'center',
        alignItems:'center'
    },
    modalBtnPosLeftText:{
        fontFamily: styleVar.fontCondensed,
        fontSize:24,
        lineHeight:24,
        marginTop:5,
    },
    modalBtnPosRight:{
        height:45,
        backgroundColor:styleVar.brandLightColor,
        borderTopRightRadius:22.5,
        borderBottomRightRadius:22.5,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    modalBtnTitle:{
        fontFamily: styleVar.fontCondensed,
        fontSize:44,
        lineHeight:44,
        marginTop:28,
        textAlign:'center'
    },
    modalConfirmBtn:{
        height: 45,
        backgroundColor: styleVar.brandLightColor,
        marginTop:19,
        marginBottom:20
    },
    btnFavIcon:{
        color:'rgb(255,204,40)'
    },
    playerCardWrapper:{
        padding:20
    },
    playerOverallRating:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:20,
        marginTop:20,
    },
    playerPerfromanceWrapper:{
        flexDirection:'row',
    },
    playerPerfromance:{
        flex:1,
        justifyContent:'flex-start',
        borderTopWidth:1,
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderColor:'rgb(128,127,131)',
        paddingTop:18,
        paddingHorizontal:16,
        paddingBottom:1,
        alignItems:'center',
        android:{
            paddingBottom:5,
        }
    },
    playerPerformanceTrend:{
        fontSize:44,
        lineHeight:44,
        textAlign:'center',
        color:'rgb(255,230,0)',
        flex:1,
    },
    playerFigureWrapper:{
        paddingVertical:25,
        paddingHorizontal:20,
    },
})