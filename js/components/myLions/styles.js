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
    guther: {
        paddingHorizontal: 20
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
        lineHeight: 22,
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
        //paddingLeft: 40,
        //paddingRight: 30
    },
    btnLeftRed: {
        backgroundColor: 'rgb(154, 2, 28)',
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
        paddingLeft: 0,
        paddingRight: 0,
        width: 120,
    },
    btnRight: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        paddingLeft: 20,
        paddingRight: 30
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
    emptyPlayer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        minHeight: styleVar.deviceHeight-400
    },
    squadListView: {
        minHeight: styleVar.deviceHeight-400
    },
    emptyPlayerText: {
        fontFamily: styleVar.fontGeorgia,
        color: styleVar.colorText,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
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
        height:styleVar.deviceWidth*9/25,
        justifyContent: 'center'
    },
    resultDescDetail: {
        width: null
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
        lineHeight: 24,
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        paddingLeft:22,
        //marginTop: 20,
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
        fontSize: 36,
        lineHeight: 36,
        marginTop: 21,
        marginLeft: 14,
        android: {
            marginTop: 11,
        }
    },
    btnExpert: {
        height:50,
        backgroundColor:'rgb(175,0,30)',
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
    btnInformation: {
        marginTop: 20
    },
    btnFavourites: {
        backgroundColor:'rgb(175,0,30)',
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
        marginTop: 71
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
        textAlign: 'center',
        fontSize: 28,
        lineHeight: 28,
        marginBottom: 10,
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
        lineHeight:24,
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
        paddingTop: 31,
        paddingBottom: 40,
        flexDirection: 'row',
        android: {
            paddingBottom: 70
        }
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
        height: 50,
        width: styleVar.deviceWidth*0.38,
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
        fontSize:28,
        textAlign:'center',
    },
    scoreCardNoBottomW:{
        marginVertical:2,
        borderTopWidth:1,
        borderBottomWidth:0,
        borderColor:'rgb(216,217,218)',
        padding:20,
        paddingBottom:25,
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
    playerNameText: {
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 18,
        lineHeight: 18,
        paddingBottom: 2,
        marginTop: -6,
        backgroundColor: 'transparent',
        android: {
            marginTop: -2,
            paddingBottom: 3,
        }
    },
    playerImage:{
        backgroundColor: '#FFF',
        width: styleVar.deviceWidth / 3,
        height: styleVar.deviceWidth / 3
    },
    playerNameTextWrapper:{
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
    modalSquadView:{
        marginTop:49
    },
    modalTitleText:{
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        marginTop: 28,
        color: '#FFF'
    },
    modalText:{
        fontFamily: 'Helvetica Neue',
        fontSize:16,
        color: '#FFF'
    },
    modalTextMTop: {
        marginTop: 28
    },
    modalTextHN:{
        fontFamily: 'Helvetica Neue',
        fontSize:16,
    },
    modalUpdateView:{
        height:styleVar.deviceHeight-200,
    },
    modalGropp:{
        height:styleVar.deviceHeight,
    },
    modalTitleTextCenter:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:28,
        marginTop:28,
        textAlign:'center',
        android: {
            marginBottom: 10
        }
    },
    modalTitleTextCenterReplacePlayer: {
        android: {
            marginBottom: 10
        }
    },
    modalCreateGroupTitle:{
        fontFamily: styleVar.fontCondensed,
        fontSize:36,
        lineHeight:36,
        marginTop:28,
        textAlign:'center'
    },
    modalCreateGroupContent:{
        fontSize:16,
        lineHeight:22,
        marginTop:10,
        textAlign:'center'
    },
    modalCreateGroupSubTitle:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:28,
        marginTop:50,
        textAlign:'center'
    },
    modalErrorGroupSubTitle:{
        fontFamily: styleVar.fontCondensed,
        fontSize:28,
        lineHeight:28,
        marginTop:30,
        textAlign:'center'
    },
    modalCreateGroupInput:{
        fontSize: 32,
        backgroundColor: 'white',
        marginTop:20,
        borderRadius:4,
        color: 'black',
        height: 60,
        paddingLeft: 5
    },
    createGroupFooter:{
        marginTop: 24,
        alignItems: 'center',
    },
    footerBtn:{
        width: 280,
        height: 50,
        borderRadius:25,
        justifyContent: 'center',
        paddingTop: 15,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:'rgb(9,127,64)',
    },
    footerCloseBtn:{
        width: 280,
        height: 50,
        borderRadius:25,
        justifyContent: 'center',
        paddingTop: 12,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:'rgb(208,7,41)',
        marginTop: 20,
        android: {
            paddingTop: 8,
        }
    },
    footerBtnIcon: {
        fontSize: 24,
        color: styleVar.colorIcon,
        marginTop: -8,
        marginLeft: 5,
        android: {
            marginTop: 0,
        }
    },
    footerErrorBtn:{
        width: 280,
        height: 50,
        borderRadius:25,
        justifyContent: 'center',
        paddingTop: 12,
        alignItems: 'center',
        flexDirection: 'row',
        android: {
            paddingTop: 0,
        },
        backgroundColor:'rgb(208,7,41)',
    },
    footerShareBtn:{
        width: 280,
        height: 50,
        borderRadius:25,
        justifyContent: 'center',
        paddingTop: 12,
        alignItems: 'center',
        flexDirection: 'row',
        android: {
            paddingTop: 0,
        },
        backgroundColor:'rgb(255,255,255)',
        marginTop: 5
    },
    footerShareText:{
        fontSize: 24,
        lineHeight: 24,
        fontFamily: styleVar.fontCondensed,
        color: 'rgb(170,0,30)',
    },
    footerBtnText:{
        fontSize: 24,
        lineHeight: 24,
        paddingTop: 0,
        fontFamily: styleVar.fontCondensed
    },
    modalTitle:{
        fontFamily: styleVar.fontCondensed,
        fontSize:36,
        lineHeight:36,
        marginTop:28,
        textAlign:'center'
    },
    modalTextCenter:{
        fontFamily: 'Helvetica Neue',
        fontSize:16,
        textAlign:'center'
    },
    modalTextCenterUppCase: {
        lineHeight: 20,
        android: {
            lineHeight: 23
        }
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
    btnConfirmGreen:{
        backgroundColor: 'rgb(9,127,64)',
    },
    btnCancelBlack:{
        backgroundColor: 'rgb(0,0,0)',
    },
    imgExpertHeader: {
        width: (styleVar.deviceWidth / 3),
        height: (styleVar.deviceHeight / 3.7)
    },
    cellExpert: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(216,217,218,1)',
        width: styleVar.deviceWidth,
        height:styleVar.deviceWidth*9/25,
    },
    cellExpertHeader: {
        backgroundColor: '#FFF',
        width: styleVar.deviceWidth*9/25,
        height: styleVar.deviceWidth*9/25,
    },
    cellExpertInfo: {
        flex:16,
        marginTop: 0,
        backgroundColor: '#D00729',
        paddingLeft: 20,
        height:styleVar.deviceWidth*9/25
    },
    textName: {
        fontSize: 24,
        color: 'white',
        width: 187,
        lineHeight: 24,
        marginTop: styleVar.deviceWidth*1/25,
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
        marginTop: styleVar.deviceWidth*1/50,
    },
    viewExpertHeader: {
        backgroundColor: styleVar.brandPrimary,
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
        textAlign:'center',
        paddingTop: 15,
        paddingHorizontal: 20,
        android: {
            paddingTop: 14
        }
    },
    viewExpertProfileDescription: {
        fontFamily: styleVar.fontGeorgia,
        paddingHorizontal: 20,
        fontSize: 18,
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
    modalConfirmBtnBlack: {
         backgroundColor: 'rgb(0,0,0)'
    },
    btnFavIcon:{
        color:'rgb(255,204,40)'
    },
    titleBox: {
        position: 'relative',
        backgroundColor: styleVar.brandLightColor,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 14,
        height:styleVar.deviceWidth*0.16,
        paddingHorizontal: 2,
        android: {
            paddingTop: 12,
            paddingBottom: 6
        }
    },
    loaderPos: {
        alignSelf: 'center'
    },
    loaderPos2: {
        alignSelf: 'center',
        marginTop: 20
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


    // R3 
    guther: {
        paddingHorizontal: 20
    },
    pageTitle: {
        backgroundColor: 'transparent',
        paddingTop: 20,
        paddingBottom: 6,
        borderColor: styleVar.colorGrey2,
        borderBottomWidth: 1,
    },
    pageTitleText: {
        alignSelf: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: styleVar.colorScarlet,
        backgroundColor: 'transparent',
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
    roundButton: {
        height: 50,
        backgroundColor: styleVar.colorScarlet,
        flexDirection:'row',
        marginTop: 0,
        marginBottom: 0,
        paddingTop:5,
        android:{
            paddingTop: 0,
        }
    },
    roundButtonAlt: {
        backgroundColor: '#FFF'
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
        color: '#FFF'
    },
    roundButtonLabelAlt: {
        color: styleVar.colorScarlet
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
})
