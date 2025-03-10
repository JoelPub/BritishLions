import React, { Component ,PropTypes } from 'react';
import { View, ScrollView, Text, StatusBar,Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles from './styles/index.style';
import { ENTRIES1, ENTRIES2 } from './static/entries';

import ButtonFeedback from '../../utility/buttonFeedback'
import { Icon } from 'native-base'

const img_arr = [require('./static/images/matchSummary.jpg'),
  require('./static/images/gameDayTeam.jpg'),
  require('./static/images/runOfPlay.jpg'),
  require('./static/images/setPlays.jpg'),
  require('./static/images/topLions.jpg'),
  require('./static/images/manOfTheMatch.jpg'),
]

export default class ApdCarousel extends Component {

  getSlides (entries , onPress) {
    if (!entries) {
      return false;
    }

    return entries.map((entry, index) => {
      return (
        <SliderEntry
          key={`carousel-entry-${index}`}
          even={(index + 1) % 2 === 0}
          page={index}
          itemPress = {onPress}
          {...entry}
          image = {img_arr[index]}

        />
      );
    });
  }

  get carousel () {
    return (
      <Carousel
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        firstItem={0}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.6}
        enableMomentum={true}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContainer}
        showsHorizontalScrollIndicator={false}
        snapOnAndroid={true}
        decelerationRate={'fast'}
        removeClippedSubviews={false}
      >
        { this.getSlides(ENTRIES1,this.itemPress) }
      </Carousel>
    );
  }
  itemPress = (page,title) => {

    this.props.centerClick (page)
  }
  onPress = () => {
    if(this.props.centerClick){
      this.props.centerClick (0)
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.colorsContainer}>
          <Image source={require('../../../../images/coachesBox/BIL_pitch.jpg')} style={styles.backgroundImage} />
        </View>
        <ScrollView
          style={styles.scrollview}
          indicatorStyle={'white'}
          scrollEventThrottle={200}
        >
          { this.carousel }
        </ScrollView>
      </View>
    );
  }
}
ApdCarousel.propTypes = {
  centerClick: PropTypes.func,
}
ApdCarousel.defaultProps = {
}