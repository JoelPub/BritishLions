import { Platform } from 'react-native'
import { Dimensions } from 'react-native'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const fontCondensed =  Platform.OS === 'android'? 'DIN_Condensed_Bold' : 'DIN Condensed'

module.exports = {
	brandPrimary : '#af001e',
	brandSecondary: '#af001e',
	brandDarkColor: '#710b1a',
	brandLightColor: '#ce1030',

	colorScarlet: 'rgb(175, 0, 30)',
	colorScarletLight: 'rgb(208, 7, 41)',
	colorText: 'rgb(38, 38, 38)',
	colorTextDarkGrey: 'rgb(95,96,98)',
	colorGrey: 'rgb(239, 239, 240)',
	colorGrey2: 'rgb(216, 217, 218)',
	colorGrey3: 'rgb(132, 136, 139)',
	colorIcon: 'rgba(208, 7, 42, 0.9)',
	colorYellow: 'rgb(255, 230, 0)',
	colorGreen: 'rgb(9, 127, 64)',

	textFontSize: 18,
	textLineHeight: 24,

	// Fonts
	fontGeorgia: 'Georgia',
	fontCondensed,


	// Dimensions
	deviceWidth,
	deviceHeight
}
