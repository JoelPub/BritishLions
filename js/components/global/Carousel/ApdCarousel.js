import React, { Component } from 'react';
import { View, ScrollView, Text, StatusBar } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles from './styles/index.style';
import { ENTRIES1, ENTRIES2 } from './static/entries';

import ButtonFeedback from '../../utility/buttonFeedback'
import { Icon } from 'native-base'

export default class example extends Component {

  getSlides (entries) {
    if (!entries) {
      return false;
    }

    return entries.map((entry, index) => {
      return (
        <SliderEntry
          key={`carousel-entry-${index}`}
          even={(index + 1) % 2 === 0}
          {...entry}
        />
      );
    });
  }

  get example1 () {
    return (
      <Carousel
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        firstItem={1}
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
        { this.getSlides(ENTRIES1) }
      </Carousel>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.colorsContainer}>
          <View style={styles.color1} />
          <View style={styles.color2} />
        </View>
        <ScrollView
          style={styles.scrollview}
          indicatorStyle={'white'}
          scrollEventThrottle={200}
        >
          { this.example1 }
          <ButtonFeedback rounded style={[styles.matchButtonView]} >
            <Icon name='md-analytics' style={styles.matchIcon} />
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.matchText} >
              COMPETITION CENTRE
            </Text>
          </ButtonFeedback>
        </ScrollView>
      </View>
    );
  }
}