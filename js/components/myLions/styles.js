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
            paddingTop: 12,
            marginBottom: 15,
        }
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
        lineHeight: 18,
        marginBottom: 8,
        android: {
            marginTop: 0,
            marginBottom: 13
        }
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 25
    },
    button: {
        height: 50,
        backgroundColor: styleVar.brandLightColor,
        marginTop: 19,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    btnonBoardSquard: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 0,
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
        paddingHorizontal: 1,
        android: {
            paddingTop: 12,
            paddingBottom: 6
        }
    },
    gridBoxTitleRight: {
        borderRightWidth: 1,
        borderRightColor: gridBorderColor,
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
        padding: 0,
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
    btnsLanding: {
        paddingBottom: 45,
        paddingTop: 45
    },
    btnMysquad: {
        height:100,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    btnMysquadIcon: {
        width:34,
        height:52
    },
    btnMysquadLabel: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 44,
        lineHeight: 44,
        marginTop: 21,
        marginLeft: 14,
        android: {
            marginTop: 11,
        }
    },
    btnExpert: {
        height:50,
        backgroundColor:'rgb(38,38,38)',
        flexDirection:'row',
        paddingTop:5,
        marginTop: 0
    },
    btnExpertIcon: {
        marginBottom: 3,
        color: 'rgb(208,7,42)',
        fontSize: 24,
        backgroundColor:'transparent',
        android:{
            marginBottom: 4,
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
    btnFavourites: {
        backgroundColor:'rgb(128,127,131)',
        flexDirection:'row',
        marginTop: 0,
        marginBottom: 0,
        paddingTop:5,
        android:{
            paddingTop: 0,
        }
    },
    btnFavouritesIcon: {
        marginBottom: 5,
        color: 'rgb(255,204,40)',
        fontSize:24,
        android:{
            marginBottom: 1,
        }
    },
    btnFavouritesLabel: {
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop:5,
        marginLeft: 5
    },
    onboarding: {
        flex:1
    },
    onboardingContent:{
        marginTop: 0
    },
    btnClose: {
        backgroundColor:'rgba(38, 38, 38, 0.20)',
        width:50,
        height:49,
        position:'absolute',
        right: 0,
        top: 20,
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
        marginTop: 71,
        textAlign: 'center',
        fontSize: 28,
        lineHeight: 28,
        marginBottom: 4,
        fontFamily: styleVar.fontCondensed,
        backgroundColor: 'transparent',
    },
    onboardingPage: {
        paddingLeft: 28,
        paddingRight: 27,
    },
    onboardingPageBtns: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 15
    },
    onboardingPageText: {
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 18
    },
    btnSkipLeft: {
        height: 50,
        width:styleVar.deviceWidth*0.38,
        backgroundColor: 'rgb(38,38,38)',
    },
    btnBack: {
        height: 50,
        width:styleVar.deviceWidth*0.38,
        backgroundColor: 'rgb(175,0,30)',
    },
    btnSkipRight: {
        height: 50,
        width:styleVar.deviceWidth*0.38,
        backgroundColor: 'rgb(38,38,38)',
    },
    btnNext: {
        height: 50,
        width:styleVar.deviceWidth*0.38,
        backgroundColor: styleVar.brandLightColor
    },
    gridBoxCol:{
        backgroundColor: '#000',
        width: styleVar.deviceWidth/2,
        alignSelf: 'flex-start',
        //height: styleVar.deviceWidth/2,
        android: {
            //height: styleVar.deviceWidth/2 + 64,
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
        justifyContent: 'center',
        flexDirection: 'row'
    },
    unionsPlayerListingSearchButton: {
        width: styleVar.deviceWidth*0.38,
        height: 50,
        backgroundColor: 'rgb(208, 7, 41)',
        marginTop:14,
        borderRadius:25,
        marginRight: 15
    },
    unionsPlayerListingFilterByBar:{
        height: 50,
        paddingTop: 10,
        width:styleVar.deviceWidth,
        alignSelf: 'center',
        alignItems: 'center',
        borderBottomColor: 'rgb(216, 217, 218)',
        borderBottomWidth: 1,
        flexDirection: 'row',
        android: {
            paddingTop: 0
        }
    },
    unionsPlayerListingFilterByCancelButton:{
        marginLeft: 7,
        marginTop: -4,
        android: {
            marginTop: 0
        }
    },
    btnFilterCancelIcon:{
        fontSize:24,
        textAlign:'center',
        alignSelf: 'center',
        color:'rgb(208, 7, 42)',
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
        height:25,
        width:styleVar.deviceWidth
    },
    unionsPlayerListingFilterByText:{
        fontFamily: styleVar.fontGeorgia,
        textAlign: 'center',
        color:'rgb(38, 38, 38)',
        fontSize: 18,
        height:30
    },
    unionsPlayerListingFilterButton:{
        width: styleVar.deviceWidth*0.38,
        height:50,
        backgroundColor: 'rgb(95, 96, 98)',
        marginTop:14,
        borderRadius:25,
        marginLeft: 15

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
        width: styleVar.deviceWidth*0.38,
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
    scoreCardNoBottomW:{
        marginVertical:2,
        borderTopWidth:1,
        borderBottomWidth:0,
        borderColor:'rgb(216,217,218)',
        padding:20,
        paddingBottom:25,
    },
    performanceText:{
        fontFamily: styleVar.fontCondensed,
        fontSize:18,
        textAlign:'center',
        lineHeight:18,
        flex:1,
        marginBottom:10,
    },
    expertRatingWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'rgb(216,217,218)',
        marginTop:5,
        paddingVertical:16
    },
    individaulPositionRow:{
        flexDirection:'row'
    },
    indivPosition:{
        width:styleVar.deviceWidth/3+1,
        backgroundColor:'rgb(255,255,255)',
        marginLeft:-1
    },
    indivPosTitle:{
        borderTopWidth:1,
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderColor:'rgb(216,217,218)',
        height:50,
        paddingTop:17,
        backgroundColor:'rgb(239,239,240)',
        borderRightWidth:1
    },
    indivPosTitleText:{
        color:'rgb(175,0,30)',
        textAlign:'center',
        fontFamily: styleVar.fontCondensed,
        fontSize:24,
        lineHeight:24,
    },
    addPlayerIcon:{
        fontSize:60,
        color:'rgb(255,255,255)'
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
    },
    posTitle:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:styleVar.deviceWidth,
        borderWidth:1,
        borderColor:'rgb(216,217,218)',
        height:50,
        paddingHorizontal:12,
        paddingTop:15,
        backgroundColor:'rgb(239,239,240)',
    },
    posExpertTitle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:styleVar.deviceWidth,
        borderWidth:1,
        borderColor:'rgb(216,217,218)',
        height:50,
        paddingTop:12,
        backgroundColor:'rgb(239,239,240)'
    },
    posTitleLeft:{
        color:'rgb(175,0,30)',
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize:24,
        lineHeight:24,
    },
    posTitleCenter:{
        color:'rgb(175,0,30)',
        textAlign:'center',
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
        width:styleVar.deviceWidth/3+1,
        marginLeft:-1
    },
    posBtn:{
        borderLeftWidth:1,
        borderColor:'rgb(255,255,255)'
    },
    posAddWrapper:{
        width:styleVar.deviceWidth / 3,
        height:styleVar.deviceWidth / 3,
        backgroundColor:'rgb(175,0,30)',
        justifyContent:'center',
        alignItems:'center',
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
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(216,217,218,1)',
        height: 136,
    },
    cellExpertHeader: {
        height: 135,
        width: 135,
    },
    cellExpertInfo: {
        marginTop: 0,
        backgroundColor: '#D00729',
        paddingLeft: 20,
        flex: 1,
        height: 135,
    },
    textName: {
        fontSize: 24,
        color: 'white',
        width: 187,
        lineHeight: 24,
        marginTop: 20,
        fontFamily: styleVar.fontCondensed,
    },
    textDescription: {
        fontSize: 18,
        fontFamily: styleVar.fontGeorgia,
        color: 'white',
        width: 181,
        lineHeight: 20,
        marginTop: 0,
    },
    textRating: {
        fontSize: 18,
        color: 'white',
        fontFamily: styleVar.fontCondensed,
        marginTop: 8,
    },
    viewExpertHeader: {
        height: 229,
        width: null,
        alignItems: 'center'
    },
    viewExpertHeaderImage: {
        marginTop: 20,
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
            paddingTop: 14
        }
    },
    viewExpertProfileDescription: {
        fontFamily: styleVar.fontGeorgia,
        fontSize: 18,
        width: 226,
        lineHeight:20,
        textAlign:'center',
        android: {
            marginTop: 0,
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
    playerFigureWrapper:{
        paddingVertical:25,
        paddingHorizontal:20,
    },
    titleBox: {
        position: 'relative',
        backgroundColor: styleVar.brandLightColor,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 14,
        height:styleVar.deviceWidth*0.16,
        paddingHorizontal:20,
        android: {
            paddingTop: 12,
            paddingBottom: 6
        }
    },
})
