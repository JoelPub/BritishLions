import { StyleSheet } from 'react-native'

import  { styleSheetCreate } from '../../../../themes/lions-stylesheet'

import styleVar from '../../../../themes/variable'


export default styleSheetCreate({
  container: {
    flex: 1,
  },
  colorsContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row'
  },
  scrollview: {
    flex: 1,
    paddingTop: 50
  },
  title: {
    marginTop: 15,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  slider: {
    marginBottom: 30
  },
  sliderContainer: {
  },
  matchButtonView: {

    height: 50,
    marginBottom: 35,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor:'rgb(175,0,30)',
    flexDirection:'row',
    paddingTop:5,
    marginTop: 0

  },
  matchIcon: {

    marginBottom: 5,
    color: 'rgb(255,204,40)',
    fontSize: 25,
    android:{
      marginBottom: 5,
    }

  },
  matchText:{
    fontFamily: styleVar.fontCondensed,
    fontSize: 24,
    lineHeight: 24,
    paddingTop: 5,
    color:'white',
    backgroundColor:'transparent',
    marginLeft: 8,
    android:{
      marginTop: -7,
    }
  },
  backgroundImage: {
    opacity:0.5
  }
});