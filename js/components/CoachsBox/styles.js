
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
  banner: {
    backgroundColor: '#fff'
  },
  fixtureImgContainer: {
    width: styleVar.deviceWidth,
    height: 200
  },
  bannerImg: {
    width: styleVar.deviceWidth,
    height: 200,
    alignSelf: 'center'
  },

  infoBox: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: styleVar.colorText,
  },
  infoBoxText: {
    marginBottom: 20,
    fontFamily: styleVar.fontGeorgia,
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    color: '#FFF',
  },
  logoIcon: {
    width: 21,
    height: 32,
    backgroundColor: 'transparent',
    marginTop: -5,
    android: {
      marginTop: 0
    }
  },
  bannerDetails: {
    paddingTop: 13,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: styleVar.brandLightColor
  },
  bannerDesc:{
    fontSize: 14,
    lineHeight: 18,
    fontFamily: styleVar.fontGeorgia,
    textAlign: 'center',
    color: '#FFF',
    paddingBottom: 12,
    marginTop: -9
  },
})