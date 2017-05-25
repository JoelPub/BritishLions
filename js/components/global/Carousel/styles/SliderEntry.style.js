import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index.style';
import styleVar from '../../../../themes/variable'


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);

export const sliderWidth = viewportWidth;
export const itemHorizontalMargin = wp(2);
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight + 80,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
  },
  imageContainer: {
    flex: 1,
    //backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  imageContainerEven: {
    //backgroundColor: colors.black
  },
  image: {
    ...StyleSheet.absoluteFillObject,

    width: itemWidth- itemHorizontalMargin * 2,
    height: (itemWidth- itemHorizontalMargin * 2)*427/640,
    borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on ios; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    //backgroundColor: 'white'
  },
  radiusMaskEven: {
    //backgroundColor: colors.black
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'rgb(175,0,30)',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    //backgroundColor: colors.black
  },
  title: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: styleVar.fontCondensed,
    paddingTop:8
  },
  titleEven: {
    color: 'white'
  },
  subtitle: {
    marginTop: 6,
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    minHeight:60,
    textAlign: 'center',
    fontFamily: styleVar.fontGeorgia,
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)'
  },


});